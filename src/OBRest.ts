import Axios, { AxiosInstance, Method } from 'axios';
import { OBObject, OBCriteria, OBContext } from '.';
/**
 * OBRest class, equivalent to the OBDal class in Openbravo
 * 
 * @author androettop
 */
export default class OBRest {
    /** The OBRest instance contains the axios instance and the context */
    private static instance: OBRest;

    /** The Axios instance, contains the jwtToken */
    private axios: AxiosInstance;

    /** The context, contains all jwtToken variables */
    private context: OBContext | undefined;
    private eventCallback: (status: number) => void;

    private constructor(url: URL, jwtToken?: string) {
        // create axios instance, if token provided, login.
        this.axios = Axios.create({
            baseURL: url.href + "/sws/",
            headers: jwtToken ? {
                'Authorization': `Bearer ${jwtToken}`
            } : {},
        });

        if (jwtToken) {
            this.context = OBContext.byJwtToken(jwtToken);
        }

        // create dummy event handler
        this.eventCallback = (status) => {
            console.warn(`request failed (error ${status})`)
        };

        //interceptor for server errors.
        this.axios.interceptors.response.use((response) => response, (error) => {
            const { status } = error.response;
            this.eventCallback(error);
        })
    }

    /** Create a criteria with the enviroment configuration */
    public createCriteria(entityName: string): OBCriteria {
        return new OBCriteria(this.axios, "com.smf.securewebservices.obRest", entityName);
    }

    /** Save a single record */
    public async save(object: OBObject): Promise<OBObject | undefined> {
        if (object._entityName) {
            let result = await this._save(object._entityName, [object]);
            return !!result ? result[0] : undefined;
        }
    }

    /** Save an array of records */
    public async saveList(objects: Array<OBObject>): Promise<Array<OBObject> | undefined> {
        if (objects.length > 0 && objects[0]._entityName) {
            return this._save(objects[0]._entityName, objects);
        }
    }

    private async _save(entityName: string, data: Array<OBObject>): Promise<Array<OBObject> | undefined> {
        const response = (await this.axios.request({
            method: 'POST',
            url: `com.smf.securewebservices.obRest/${entityName}`,
            data: { data }
        }));
        if (response.data) {
            if (response.status >= 200 && response.status < 300) {
                return response.data.data;
            } else if (response.status < 200 || response.status >= 300) {
                throw new Error(response.data.message);
            }
        }
        return undefined;
    }
    /** Remove a single record */
    public async remove(object: OBObject): Promise<OBObject | undefined> {
        if (object._entityName && object.id) {
            let result = await this._remove(object._entityName, [object]);
            return result != undefined ? result[0] : undefined;
        }
    }

    /** Remove an array of records */
    public async removeList(object: Array<OBObject>): Promise<Array<OBObject> | OBObject | undefined> {
        if (object.length > 0 && object[0]._entityName) {
            return this._remove(object[0]._entityName, object);
        }
    }

    private async _remove(entityName: string, data: Array<OBObject>): Promise<Array<OBObject> | undefined> {
        const response = (await this.axios.request({
            method: 'DELETE',
            url: `com.smf.securewebservices.obRest/${entityName}`,
            data: {
                data: data.map(obj => obj.id)
            }
        }));
        if (response.data) {
            if (response.status >= 200 && response.status < 300) {
                return response.data.data;
            } else if (response.status < 200 || response.status >= 300) {
                throw new Error(response.data.message);
            }
        }
        return undefined;
    }

    /** Return the axios instance */
    public getAxios(): AxiosInstance {
        return this.axios;
    }
    /** Return the current context */
    public getOBContext(): OBContext | undefined {
        return this.context;
    }

    /** Async function to set the context and refreshg the token */
    public async setOBContext(context: OBContext) {
        this.context = context;
        // refresh token to change context (role, org, warehouse, etc)
        let response = await OBRest.getInstance().getAxios().post("login", {
            role: context.getRoleId(),
            organization: context.getOrganizationId(),
            warehouse: context.getWarehouseId(),
        });
        let jwtToken = response.data?.token;
        OBRest.loginWithToken(jwtToken);
    }

    /** set the events callback to use it with mobx/redux */
    public setEventCallback(callback: (status: number) => void) {
        this.eventCallback = callback;
    }

    public async callWebService(name: string, method: Method, params: Array<any>, data: object): Promise<any> {
        const response = (await this.axios.request({
            method,
            url:name,
            data
        }));
        return response.data
    }
    /** Initializes the conection with rest api */
    static init(url: URL, jwtToken?: string) {
        OBRest.instance = new OBRest(url, jwtToken);
    }

    /** User login with username and password */
    static async loginWithUserAndPassword(username: string, password: string) {
        let response = await OBRest.getInstance().getAxios().post("login", {
            username: username,
            password: password,
        });
        let jwtToken = response.data?.token;
        OBRest.loginWithToken(jwtToken);
    }

    /** Build the axios instance headers with the provided token */
    static loginWithToken(jwtToken: string) {
        OBRest.getInstance().getAxios().defaults.headers = {
            'Authorization': `Bearer ${jwtToken}`
        }
        OBRest.getInstance().context = OBContext.byJwtToken(jwtToken);
    }

    /** Return the initialized instance */
    static getInstance(): OBRest {
        if (!OBRest.instance) {
            throw new Error("OBRest instance not initialized");
        }
        return OBRest.instance;
    }

}
