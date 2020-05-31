import Axios, { AxiosInstance } from 'axios';
import OBContext from './OBContext';
import OBCriteria from './OBCriteria';
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

    private constructor(url:URL,jwtToken:string){
        this.axios = Axios.create({
            baseURL: url.href,
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
        this.context = OBContext.byJwtToken(jwtToken);
    }
    
    /** Create a criteria with the enviroment configuration */
    public createCriteria(entityName: string):OBCriteria {
        return new OBCriteria(this.axios,"com.smf.securewebservices.jsonDal",entityName);
    }

    /** Return the axios instance */
    public getAxios(): AxiosInstance {
        return this.axios;
    }

    /** Initializes the conection with rest api */
    static init(url: URL, jwtToken: string) {
        OBRest.instance = new OBRest(url,jwtToken);
    }
    
    /** Return the initialized instance */
    static getInstance(): OBRest {
        if (!OBRest.instance) {
            throw new Error("OBRest instance not initialized");
        }
        return OBRest.instance;
    }
}
