import Axios, { AxiosInstance } from 'axios';
import { OBObject, OBCriteria, OBContext } from '.';
/**
 * OBRest class, equivalent to the OBDal class in Openbravo
 */
export default class OBRest {
    /** The OBRest instance contains the axios instance and the context */
    private static instance: OBRest;

    /** The Axios instance, contains the jwtToken */
    private axios: AxiosInstance;

    /** The context, contains all jwtToken variables */
    private context: OBContext;

    private constructor(url: URL, jwtToken: string) {
        this.axios = Axios.create({
            baseURL: url.href,
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
        this.context = OBContext.byJwtToken(jwtToken);
    }

    /** Create a criteria with the enviroment configuration */
    public createCriteria(entityName: string): OBCriteria {
        return new OBCriteria(this.axios, "com.smf.securewebservices.jsonDal", entityName);
    }

    /** Save a single record */
    public async save(object: OBObject):Promise<Array<OBObject> | OBObject | undefined> {
        if(object._entityName){
            return this._save(object._entityName,object);
        }
    }

    /** Save an array of records */
    public async saveList(object: Array<OBObject>):Promise<Array<OBObject> | OBObject | undefined> {
        if(object.length > 0 && object[0]._entityName){
            return this._save(object[0]._entityName,object);
        }
    }

    private async _save(entityName:string,data:object):Promise<Array<OBObject> | OBObject | undefined> {
        const response = (await this.axios.request({
            method:'POST',
            url: `"com.smf.securewebservices.jsonDal/${entityName}`,
            data            
        })).data;
        if(response.data){
            if(response.data.response.status === 0){
                return response.data.response.data;
            }else if(response.data.response.status === -1){
                throw new Error(response.data.response.error.message);
            }
        }
        return undefined;
    }

    /** Return the axios instance */
    public getAxios(): AxiosInstance {
        return this.axios;
    }

    /** Initializes the conection with rest api */
    static init(url: URL, jwtToken: string) {
        OBRest.instance = new OBRest(url, jwtToken);
    }

    /** Return the initialized instance */
    static getInstance(): OBRest {
        if (!OBRest.instance) {
            throw new Error("OBRest instance not initialized");
        }
        return OBRest.instance;
    }
}
