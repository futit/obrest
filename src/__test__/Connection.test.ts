import { OBRest, Restrictions, Criterion, OBCriteria, OBObject, OBContext } from '../index';
import OBRestUtils from '../OBRestUtils';

/**
 * TODO: hacer tests con todas las operaciones y restricciones de criteria.
 * Si se lanza una nueva version del modulo de securewebservices se deben
 * correr los tests para saber si la libería sigue siendo compatible con
 * el modulo o si deben hacerse correcciones.
 */

async function getDataWithCriteria(): Promise<Number> {
    // initialize api connector
    OBRest.init(new URL("http://localhost:8080/openbravo/"));
    await OBRest.loginWithUserAndPassword("Openbravo", "openbravo");

    const context = OBRest.getInstance().getOBContext();

    //Si hay un contexto...
    if (context) {
        let criteria = OBRest.getInstance().createCriteria("Product");
        criteria.setMaxResults(10); //limit
        criteria.setFirstResult(2); //offset
        criteria.addOrderBy("name", false);
        criteria.add(Restrictions.or([
            Restrictions.iContains("name", "cerveza"),
        ]));
        let productList = await criteria.list();
        return productList.length;
    } else {
        throw new Error("Auth error.")
    }
}

async function getDataWithQuery(): Promise<OBObject | undefined> {
    // initialize api connector
    OBRest.init(new URL("http://localhost:8080/openbravo/"));
    await OBRest.loginWithUserAndPassword("Openbravo", "openbravo");

    const context = OBRest.getInstance().getOBContext();

    //Si hay un contexto...
    if (context) {
        let criteria = OBRest.getInstance().createCriteria("Product");
        criteria.setMaxResults(1); //limit
        criteria.addOrderBy("name", false);
        criteria.setQuery(`organization == '${context.getOrganizationId()}' or name =ic= 'cerveza'`);
        let productList = await criteria.uniqueResult();
        return productList;
    } else {
        throw new Error("Auth error.")
    }
}


function parseTest(): string {
    let restriction = Restrictions.and([
        Restrictions.equals("name", "Openbravo test"),
        Restrictions.or([
            Restrictions.greaterOrEqual("age", "15"),
            Restrictions.lessOrEqual("created", "2020-02-03")
        ])
    ]);
    let query = OBRestUtils.criteriaToRsql(restriction);
    return query;
}

async function changeContext(): Promise<OBContext | undefined> {
    // initialize api connector
    OBRest.init(new URL("http://localhost:8080/openbravo/"));
    await OBRest.loginWithUserAndPassword("Openbravo", "openbravo");

    const context = OBRest.getInstance().getOBContext();

    //Si hay un contexto...
    if (context) {
        context.setOrganizationId("0");
        context.setRoleId("0");
        await OBRest.getInstance().setOBContext(context);
        return OBRest.getInstance().getOBContext();
    } else {
        throw new Error("Auth error.")
    }
}

async function createSingleProduct(): Promise<OBObject | undefined> {
    // initialize api connector
    OBRest.init(new URL("http://localhost:8080/openbravo/"));
    await OBRest.loginWithUserAndPassword("Openbravo", "openbravo");

    const context = OBRest.getInstance().getOBContext();

    //Si hay un contexto...
    if (context) {
        let myProduct = {
            "_entityName": "Product", // this field is required.
            "searchKey": `Random value ${Math.random()}`,
            "name": "Test product with OBRest.js",
            "description": "This is a test product created using OBRest.js",
            "uOM": "100",
            "salesRepresentative": "100",
            "summaryLevel": false,
            "stocked": true,
            "purchase": true,
            "sale": true,
            "productCategory": "DC7F246D248B4C54BFC5744D5C27704F",
            "volume": 0,
            "weight": 0,
            "taxCategory": "E020A69A1E784DC39BE57C41D6D5DB4E"
        }

        return await OBRest.getInstance().save(myProduct);
    } else {
        throw new Error("Auth error.")
    }
}

async function createProductList(): Promise<Array<OBObject> | undefined> {
    // initialize api connector
    OBRest.init(new URL("http://localhost:8080/openbravo/"));
    await OBRest.loginWithUserAndPassword("Openbravo", "openbravo");

    const context = OBRest.getInstance().getOBContext();

    //Si hay un contexto...
    if (context) {
        let myProduct = {
            "_entityName": "Product", // this field is required.
            "searchKey": `Random value ${Math.random()}`,
            "name": "Test product with OBRest.js",
            "description": "This is a test product created using OBRest.js",
            "uOM": "100",
            "salesRepresentative": "100",
            "summaryLevel": false,
            "stocked": true,
            "purchase": true,
            "sale": true,
            "productCategory": "DC7F246D248B4C54BFC5744D5C27704F",
            "volume": 0,
            "weight": 0,
            "taxCategory": "E020A69A1E784DC39BE57C41D6D5DB4E"
        }

        return await OBRest.getInstance().saveList([
            myProduct
        ]);
    } else {
        throw new Error("Auth error.")
    }
}

async function removeSingleProduct(): Promise<OBObject | undefined> {
    // initialize api connector
    OBRest.init(new URL("http://localhost:8080/openbravo/"));
    await OBRest.loginWithUserAndPassword("Openbravo", "openbravo");

    const context = OBRest.getInstance().getOBContext();

    //Si hay un contexto...
    if (context) {
        //get products to delete
        let criteria = OBRest.getInstance().createCriteria("Product");
        criteria.add(Restrictions.startsWith("searchKey", "Random value"));
        criteria.setMaxResults(1);
        let myProduct;
        let resultLst = await criteria.list();
        if (resultLst.length > 0) {
            myProduct = resultLst[0];
        } else {
            myProduct = undefined;
        }
        if (!myProduct) throw new Error("Cannot get product");
        return await OBRest.getInstance().remove(myProduct);
    } else {
        throw new Error("Auth error.")
    }
}

test('parser', () => {
    expect(parseTest()).toBe("name == 'Openbravo test' and (age >= '15' or created <= '2020-02-03')");
});

test('getdatacriteria', async () => {
    expect(await getDataWithCriteria()).toBeGreaterThan(0);
});

test('changecontext', async () => {
    expect(await changeContext()).toBeTruthy();
});

test('getobcontext', async () => {
    expect(await getDataWithQuery()).toBeTruthy();
});

test('createsingleproduct', async () => {
    let product = await createSingleProduct();
    expect(product).toBeTruthy();
    if (product)
        expect(product.id).toBeTruthy();
});

test('createproductlist', async () => {
    let theList = await createProductList();
    expect(theList).toBeTruthy();
    if (theList) {
        expect(theList.length).toBeGreaterThan(0);
        expect(theList[0].id).toBeTruthy();
    }
});

test('removesingleproduct', async () => {
    let removedProduct = await removeSingleProduct();

    expect(removedProduct).toBeTruthy();
    if (removedProduct) expect(removedProduct?.id).toBeTruthy();

});