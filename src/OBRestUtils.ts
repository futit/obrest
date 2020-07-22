import { Criterion } from ".";
/** 
 * RSQL Utilities 
 * 
 * @author androettop
 */
export default class OBRestUtils {
    public static operators = [
        { "symbol": "!=", "name": "notEqual" },
        { "symbol": "<", "name": "lessThan" },
        { "symbol": "<=", "name": "lessOrEqual" },
        { "symbol": "=c=", "name": "contains" },
        { "symbol": "=cf=", "name": "containsField" },
        { "symbol": "=ef=", "name": "equalsField" },
        { "symbol": "=ew=", "name": "endsWith" },
        { "symbol": "=ewf=", "name": "endsWithField" },
        { "symbol": "=exists=", "name": "exists" },
        { "symbol": "=gef=", "name": "greaterOrEqualField" },
        { "symbol": "=gtf=", "name": "greaterThanField" },
        { "symbol": "=ic=", "name": "iContains" },
        { "symbol": "=ie=", "name": "iEquals" },
        { "symbol": "=iew=", "name": "iEndsWith" },
        { "symbol": "=ige=", "name": "iGreaterOrEqual" },
        { "symbol": "=igt=", "name": "iGreaterThan" },
        { "symbol": "=ile=", "name": "iLessOrEqual" },
        { "symbol": "=ilt=", "name": "iLessThan" },
        { "symbol": "=inc=", "name": "iNotContains" },
        { "symbol": "=ine=", "name": "iNotEqual" },
        { "symbol": "=inew=", "name": "iNotEndsWith" },
        { "symbol": "=insw=", "name": "iNotStartsWith" },
        { "symbol": "=ins=", "name": "inSet" },
        { "symbol": "=isw=", "name": "iStartsWith" },
        { "symbol": "=ltf=", "name": "lessThanField" },
        { "symbol": "=nc=", "name": "notContains" },
        { "symbol": "=nef=", "name": "notEqualField" },
        { "symbol": "=new=", "name": "notEndsWith" },
        { "symbol": "=nis=", "name": "notInSet" },
        //{ "symbol": "=nnull=", "name": "notNull" }, UNINPLEMENTED se podría usar un operador =is= null o  =isnot= null
        { "symbol": "=nsw=", "name": "notStartsWith" },
        //{ "symbol": "=null=", "name": "isNull" }, UNINPLEMENTED
        { "symbol": "=sw=", "name": "startsWith" },
        { "symbol": "=swf=", "name": "startsWithField" },
        { "symbol": ">", "name": "greaterThan" },
        { "symbol": ">=", "name": "greaterOrEqual" },
        { "symbol": "==", "name": "equals" }
    ];
    public static criteriaToRsql(criteria: Criterion): string {
        //for and/or operators
        if (criteria.criteria && (criteria.operator === "and" || criteria.operator === "or")) {
            return criteria.criteria.map(c => {
                const critRsql = OBRestUtils.criteriaToRsql(c);
                if(c.operator === "and" || c.operator === "or") {
                    return `(${critRsql})`;
                }else{
                    return critRsql;
                }
            }).join(` ${criteria.operator} `);
        } else {//for comparison operators
            if (!criteria.value) {
                //error
                throw new Error("Value is required in criterias with comparison operator");
            }
            const args = typeof criteria.value === "string" ? `'${criteria.value}'` : `(${criteria.value.map(e => `'${e}'`).join(",")})`;
            const operator = OBRestUtils.operators.find(e => e.name === criteria.operator);
            let symbol = !!operator ? operator.symbol : criteria.operator;
            return `${criteria.fieldName} ${symbol} ${args}`;
        }
    }
}
