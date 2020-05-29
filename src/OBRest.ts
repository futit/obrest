import Axios, { AxiosInstance } from 'axios';
import OBContext from './OBContext';
import OBCriteria from './OBCriteria';
/**
 * OBRest class, equivalent to the OBDal class in Openbravo
 */
export default class OBRest {
    private static instance: OBRest;
    private axios: AxiosInstance;
    private context: OBContext;

    private constructor(url:URL,jwtToken:string){
        this.axios = Axios.create({
            baseURL: url.host,
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
        this.context = OBContext.byJwtToken(jwtToken);
    }
    
    public createCriteria(entityName: string):OBCriteria {
        return new OBCriteria(this.axios,"com.smf.securewebservices.jsonDal",entityName);
    }

    public getAxios(): AxiosInstance {
        return this.axios;
    }

    static init(url: URL, jwtToken: string) {
        OBRest.instance = new OBRest(url,jwtToken);
    }
    
    static getInstance(): OBRest {
        if (!OBRest.instance) {
            throw new Error("OBRest instance not initialized");
        }
        return OBRest.instance;
    }
}
