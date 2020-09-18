import { Criterion } from ".";
/**
 * RSQL Utilities
 *
 * @author androettop
 */
export default class OBRestUtils {
    static operators: {
        symbol: string;
        name: string;
    }[];
    static criteriaToRsql(criteria: Criterion): string;
}
