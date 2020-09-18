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
    _query: string;
    constructor(axios: AxiosInstance, restWsName: string, entityName: string);
    /** Sets the max results */
    setMaxResults(maxResults: number): void;
    /** WARNING: This method empties the _restrictions object */
    setQuery(rsqlQuery: string): void;
    /** Sets the first result */
    setFirstResult(firstResult: number): void;
    /**
     * Add a restriction to the criteria, you must use the Restrictions methods,
     * WARNING: This method reset the _query object
     */
    add(restriction: Criterion): void;
    /** Add order by to the criteria */
    addOrderBy(property: string, ascending: boolean): void;
    list(): Promise<Array<OBObject>>;
    uniqueResult(): Promise<OBObject | undefined>;
}
