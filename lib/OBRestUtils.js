"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * RSQL Utilities
 *
 * @author androettop
 */
var OBRestUtils = /** @class */ (function () {
    function OBRestUtils() {
    }
    OBRestUtils.criteriaToRsql = function (criteria) {
        //for and/or operators
        if (criteria.criteria && (criteria.operator === "and" || criteria.operator === "or")) {
            return criteria.criteria.map(function (c) {
                var critRsql = OBRestUtils.criteriaToRsql(c);
                if (c.operator === "and" || c.operator === "or") {
                    return "(" + critRsql + ")";
                }
                else {
                    return critRsql;
                }
            }).join(" " + criteria.operator + " ");
        }
        else { //for comparison operators
            if (!criteria.value) {
                //error
                throw new Error("Value is required in criterias with comparison operator");
            }
            var args = typeof criteria.value === "string" ? "'" + criteria.value + "'" : "(" + criteria.value.map(function (e) { return "'" + e + "'"; }).join(",") + ")";
            var operator = OBRestUtils.operators.find(function (e) { return e.name === criteria.operator; });
            var symbol = !!operator ? operator.symbol : criteria.operator;
            return criteria.fieldName + " " + symbol + " " + args;
        }
    };
    OBRestUtils.operators = [
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
    return OBRestUtils;
}());
exports.default = OBRestUtils;
