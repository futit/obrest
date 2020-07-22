import { OBRest, Restrictions, Criterion, OBCriteria, OBObject } from '../index';
import OBRestUtils from '../OBRestUtils';

async function getDataWithCriteria(): Promise<Number> {
    // initialize api connector
    OBRest.init(new URL("http://localhost:8080/openbravo/"));
    OBRest.loginWithUserAndPassword("Openbravo", "openbravo");

    const context = OBRest.getInstance().getOBContext();

    //Si hay un contexto...
    if (context) {
        let criteria = OBRest.getInstance().createCriteria("Product");
        criteria.setMaxResults(10); //limit
        criteria.setFirstResult(2); //offset
        criteria.addOrderBy("name", false);
        criteria.add(Restrictions.or([
            Restrictions.eq("organization", context.getOrganizationId()),
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
    OBRest.loginWithUserAndPassword("Openbravo", "openbravo");

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
        Restrictions.eq("name", "Openbravo test"),
        Restrictions.or([
            Restrictions.ge("age", "15"),
            Restrictions.le("created", "2020-02-03")
        ])
    ]);
    let query = OBRestUtils.criteriaToRsql(restriction);
    return query;
}

test('parser', () => {
    expect(parseTest()).toBe("name == 'Openbravo test' and (age >= '15' or created <= '2020-02-03')");
});

test('getdatacriteria', async () => {
    expect(await getDataWithCriteria()).toBeGreaterThan(0);
});

test('getdataquery', async () => {
    expect(await getDataWithQuery()).toBeTruthy();
});