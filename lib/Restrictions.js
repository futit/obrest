"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Equivalent to Hibernate restrictions
 *
 * @author androettop
 */
var Restrictions = /** @class */ (function () {
    function Restrictions() {
    }
    /** And operator */
    Restrictions.and = function (criterias) {
        return {
            operator: 'and',
            criteria: criterias
        };
    };
    /** Or operator */
    Restrictions.or = function (criterias) {
        return {
            operator: 'or',
            criteria: criterias
        };
    };
    //Comparison operators
    Restrictions.notEqual = function (property, value) {
        return {
            fieldName: property,
            operator: 'notEqual',
            value: value
        };
    };
    Restrictions.lessThan = function (property, value) {
        return {
            fieldName: property,
            operator: 'lessThan',
            value: value
        };
    };
    Restrictions.lessOrEqual = function (property, value) {
        return {
            fieldName: property,
            operator: 'lessOrEqual',
            value: value
        };
    };
    Restrictions.contains = function (property, value) {
        return {
            fieldName: property,
            operator: 'contains',
            value: value
        };
    };
    Restrictions.containsField = function (property, value) {
        return {
            fieldName: property,
            operator: 'containsField',
            value: value
        };
    };
    Restrictions.equalsField = function (property, value) {
        return {
            fieldName: property,
            operator: 'equalsField',
            value: value
        };
    };
    Restrictions.endsWith = function (property, value) {
        return {
            fieldName: property,
            operator: 'endsWith',
            value: value
        };
    };
    Restrictions.endsWithField = function (property, value) {
        return {
            fieldName: property,
            operator: 'endsWithField',
            value: value
        };
    };
    Restrictions.exists = function (property, value) {
        throw new Error("Unimplemented method");
        return {
            fieldName: property,
            operator: 'exists',
            value: value
        };
    };
    Restrictions.greaterOrEqualField = function (property, value) {
        return {
            fieldName: property,
            operator: 'greaterOrEqualField',
            value: value
        };
    };
    Restrictions.greaterThanField = function (property, value) {
        return {
            fieldName: property,
            operator: 'greaterThanField',
            value: value
        };
    };
    Restrictions.iContains = function (property, value) {
        return {
            fieldName: property,
            operator: 'iContains',
            value: value
        };
    };
    Restrictions.iEquals = function (property, value) {
        return {
            fieldName: property,
            operator: 'iEquals',
            value: value
        };
    };
    Restrictions.iEndsWith = function (property, value) {
        return {
            fieldName: property,
            operator: 'iEndsWith',
            value: value
        };
    };
    Restrictions.iGreaterOrEqual = function (property, value) {
        return {
            fieldName: property,
            operator: 'iGreaterOrEqual',
            value: value
        };
    };
    Restrictions.iGreaterThan = function (property, value) {
        return {
            fieldName: property,
            operator: 'iGreaterThan',
            value: value
        };
    };
    Restrictions.iLessOrEqual = function (property, value) {
        return {
            fieldName: property,
            operator: 'iLessOrEqual',
            value: value
        };
    };
    Restrictions.iLessThan = function (property, value) {
        return {
            fieldName: property,
            operator: 'iLessThan',
            value: value
        };
    };
    Restrictions.iNotContains = function (property, value) {
        return {
            fieldName: property,
            operator: 'iNotContains',
            value: value
        };
    };
    Restrictions.iNotEqual = function (property, value) {
        return {
            fieldName: property,
            operator: 'iNotEqual',
            value: value
        };
    };
    Restrictions.iNotEndsWith = function (property, value) {
        return {
            fieldName: property,
            operator: 'iNotEndsWith',
            value: value
        };
    };
    Restrictions.iNotStartsWith = function (property, value) {
        return {
            fieldName: property,
            operator: 'iNotStartsWith',
            value: value
        };
    };
    Restrictions.inSet = function (property, value) {
        return {
            fieldName: property,
            operator: 'inSet',
            value: value
        };
    };
    Restrictions.iStartsWith = function (property, value) {
        return {
            fieldName: property,
            operator: 'iStartsWith',
            value: value
        };
    };
    Restrictions.lessThanField = function (property, value) {
        return {
            fieldName: property,
            operator: 'lessThanField',
            value: value
        };
    };
    Restrictions.notContains = function (property, value) {
        return {
            fieldName: property,
            operator: 'notContains',
            value: value
        };
    };
    Restrictions.notEqualField = function (property, value) {
        return {
            fieldName: property,
            operator: 'notEqualField',
            value: value
        };
    };
    Restrictions.notEndsWith = function (property, value) {
        return {
            fieldName: property,
            operator: 'notEndsWith',
            value: value
        };
    };
    Restrictions.notInSet = function (property, value) {
        return {
            fieldName: property,
            operator: 'notInSet',
            value: value
        };
    };
    Restrictions.notStartsWith = function (property, value) {
        return {
            fieldName: property,
            operator: 'notStartsWith',
            value: value
        };
    };
    Restrictions.startsWith = function (property, value) {
        return {
            fieldName: property,
            operator: 'startsWith',
            value: value
        };
    };
    Restrictions.startsWithField = function (property, value) {
        return {
            fieldName: property,
            operator: 'startsWithField',
            value: value
        };
    };
    Restrictions.greaterThan = function (property, value) {
        return {
            fieldName: property,
            operator: 'greaterThan',
            value: value
        };
    };
    Restrictions.greaterOrEqual = function (property, value) {
        return {
            fieldName: property,
            operator: 'greaterOrEqual',
            value: value
        };
    };
    Restrictions.equals = function (property, value) {
        return {
            fieldName: property,
            operator: 'equals',
            value: value
        };
    };
    Restrictions.isNull = function (property) {
        return {
            fieldName: property,
            operator: 'isNull',
            value: "null"
        };
    };
    Restrictions.isNotNull = function (property) {
        return {
            fieldName: property,
            operator: 'notNull',
            value: "null"
        };
    };
    return Restrictions;
}());
exports.default = Restrictions;
