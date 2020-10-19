import { AxiosInstance } from 'axios';
import { OBObject, Criterion } from '.';
/**
 * OBCriteria class, equivalent to the criteria class in Openbravo.
 *
 * @author androettop
 */
export default class OBCriteria {
    /** The rest web service name */
    private _restWsName;
    /** The axios instance to use*/
    private _axios;
    /** The name of the entity in openbravo */
    private _entityName;
    /** The array of criterias created with Restrictions */
    private _restrictions;
    /** Maximum number of results */
    private _maxResults;
    /** First result number */
    private _firstResult;
    /** Order by string parameter */
    private _orderBy;
    /** Rsql query */
    private _query;
    /** Distinct parameter */
    private _distinct;
    /** Show identifiers */
    private _showIdentifiers;
    /** Show identifiers */
    private _fields;
    constructor(axios: AxiosInstance, restWsName: string, entityName: string);
    setShowIdentifiers(value: boolean): OBCriteria;
    setFields(value: Array<string>): OBCriteria;
    /** Sets the max results */
    setMaxResults(maxResults: number): OBCriteria;
    /** WARNING: This method empties the _restrictions object */
    setQuery(rsqlQuery: string): OBCriteria;
    /** Sets the first result */
    setFirstResult(firstResult: number): OBCriteria;
    /** Sets the first result */
    setDistinct(distinct: string): OBCriteria;
    /**
     * Add a restriction to the criteria, you must use the Restrictions methods,
     * WARNING: This method reset the _query object
     */
    add(restriction: Criterion): OBCriteria;
    /** Add order by to the criteria */
    addOrderBy(property: string, ascending: boolean): OBCriteria;
    list(): Promise<Array<OBObject>>;
    uniqueResult(): Promise<OBObject | undefined>;
}
