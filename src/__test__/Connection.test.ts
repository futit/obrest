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
            Restrictions.equals("organization", context.getOrganizationId()),
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



