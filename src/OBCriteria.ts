import OBRest from './OBRest';
import { AxiosInstance } from 'axios';
import { OBObject, Criterion, OBContext, Restrictions } from '.';
import OBRestUtils from './OBRestUtils';

/**
 * OBCriteria class, equivalent to the criteria class in Openbravo.
 * 
 * @author androettop
 */
export default class OBCriteria {
    /** The rest web service name */
    private _restWsName: string;

    /** The axios instance to use*/
    private _axios: AxiosInstance;

    /** The name of the entity in openbravo */
    private _entityName: string;

    /** The array of criterias created with Restrictions */
    private _restrictions: Array<Criterion>;

    /** Maximum number of results */
    private _maxResults: Number;

    /** First result number */
    private _firstResult: Number;

    /** Order by string parameter */
    private _orderBy: string;

    /** Rsql query */
    private _query: string;

    /** Show identifiers */
    private _showIdentifiers: boolean;

    /** Show identifiers */
    private _fields: Array<string>;

    constructor(axios: AxiosInstance, restWsName: string, entityName: string) {
        this._axios = axios;
        this._restWsName = restWsName;
        this._entityName = entityName;
        this._restrictions = new Array<Criterion>();
        this._maxResults = 1000000;
        this._firstResult = 0;
        this._orderBy = "";
        this._query = "";
        this._showIdentifiers = false;
        this._fields = [];
    }

    setShowIdentifiers(value:boolean){
        this._showIdentifiers = value;
    }

    setFields(value:Array<string>){
        this._fields = value;
    }

    /** Sets the max results */
    setMaxResults(maxResults: number) {
        this._maxResults = maxResults;
    }

    /** WARNING: This method empties the _restrictions object */
    setQuery(rsqlQuery: string) {
        this._query = rsqlQuery;
        this._restrictions = new Array<Criterion>();
    }

    /** Sets the first result */
    setFirstResult(firstResult: number) {
        this._firstResult = firstResult;
    }

    /** 
     * Add a restriction to the criteria, you must use the Restrictions methods,
     * WARNING: This method reset the _query object 
     */
    add(restriction: Criterion) {
        this._restrictions.push(restriction);
        this._query = OBRestUtils.criteriaToRsql(Restrictions.and(this._restrictions));
    }

    /** Add order by to the criteria */
    addOrderBy(property: string, ascending: boolean) {
        if (this._orderBy.length > 0) {
            this._orderBy += ", ";
        }
        if (!ascending) {
            this._orderBy += "-";
        }
        this._orderBy += property;
    }



    async list(): Promise<Array<OBObject>> {
        const request = (await OBRest.getInstance().getAxios().request({
            url: `${this._restWsName}/${this._entityName}`,
            method: 'GET',
            //TODO: add support for this params in java... in a new correct ws?
            params: {
                sortBy: this._orderBy,
                firstResult: this._firstResult,
                maxResults: this._maxResults,
                q: this._query,
                identifiers:this._showIdentifiers,
                ...(this._fields.length > 0 ? {fields:this._fields.join(",")} : {}),
            }
        }));

        if (request.data && request.data.data) {
            return request.data.data;
        } else {
            //TODO: error?
            return new Array<OBObject>();
        }
        /*
        Execute request and add results if exists.
        */
    }

    async uniqueResult(): Promise<OBObject | undefined> {
        this.setMaxResults(1);
        let resultLst = await this.list();
        if (resultLst.length > 0) {
            return resultLst[0];
        } else {
            return undefined;
        }
    }
}