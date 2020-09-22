import { AxiosInstance, Method } from 'axios';
import { OBObject, OBCriteria, OBContext } from '.';
/**
 * OBRest class, equivalent to the OBDal class in Openbravo
 *
 * @author androettop
 */
export default class OBRest {
    /** The OBRest instance contains the axios instance and the context */
    private static instance;
    /** The Axios instance, contains the jwtToken */
    private axios;
    /** The data web service name */
    private wsName;
    /** The context, contains all jwtToken variables */
    private context;
    private eventCallback;
    private constructor();
    /** Create a criteria with the enviroment configuration */
    createCriteria(entityName: string): OBCriteria;
    /** Save a single record */
    save(object: OBObject): Promise<OBObject | undefined>;
    /** Save an array of records */
    saveList(objects: Array<OBObject>): Promise<Array<OBObject> | undefined>;
    private _save;
    /** Remove a single record */
    remove(object: OBObject): Promise<OBObject | undefined>;
    /** Remove an array of records */
    removeList(object: Array<OBObject>): Promise<Array<OBObject> | OBObject | undefined>;
    private _remove;
    /** Return the axios instance */
    getAxios(): AxiosInstance;
    /** Return the current context */
    getOBContext(): OBContext | undefined;
    /** Async function to set the context and refreshg the token */
    setOBContext(context: OBContext): Promise<void>;
    /** set the events callback to use it with mobx/redux */
    setEventCallback(callback: (status: number) => void): void;
    callWebService(name: string, method: Method, params: Array<any>, data: object): Promise<any>;
    /** Initializes the conection with rest api */
    static init(url: URL, jwtToken?: string): void;
    /** User login with username and password */
    static loginWithUserAndPassword(username: string, password: string): Promise<void>;
    /** Build the axios instance headers with the provided token */
    static loginWithToken(jwtToken: string): void;
    /** Return the initialized instance */
    static getInstance(): OBRest;
}
