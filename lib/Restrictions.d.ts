import Criterion from "./Criterion";
/**
 * Equivalent to Hibernate restrictions
 *
 * @author androettop
 */
export default class Restrictions {
    /** And operator */
    static and(criterias: Array<Criterion>): Criterion;
    /** Or operator */
    static or(criterias: Array<Criterion>): Criterion;
    static notEqual(property: string, value: string): Criterion;
    static lessThan(property: string, value: string): Criterion;
    static lessOrEqual(property: string, value: string): Criterion;
    static contains(property: string, value: string): Criterion;
    static containsField(property: string, value: string): Criterion;
    static equalsField(property: string, value: string): Criterion;
    static endsWith(property: string, value: string): Criterion;
    static endsWithField(property: string, value: string): Criterion;
    static exists(property: string, value: string): Criterion;
    static greaterOrEqualField(property: string, value: string): Criterion;
    static greaterThanField(property: string, value: string): Criterion;
    static iContains(property: string, value: string): Criterion;
    static iEquals(property: string, value: string): Criterion;
    static iEndsWith(property: string, value: string): Criterion;
    static iGreaterOrEqual(property: string, value: string): Criterion;
    static iGreaterThan(property: string, value: string): Criterion;
    static iLessOrEqual(property: string, value: string): Criterion;
    static iLessThan(property: string, value: string): Criterion;
    static iNotContains(property: string, value: string): Criterion;
    static iNotEqual(property: string, value: string): Criterion;
    static iNotEndsWith(property: string, value: string): Criterion;
    static iNotStartsWith(property: string, value: string): Criterion;
    static inSet(property: string, value: string): Criterion;
    static iStartsWith(property: string, value: string): Criterion;
    static lessThanField(property: string, value: string): Criterion;
    static notContains(property: string, value: string): Criterion;
    static notEqualField(property: string, value: string): Criterion;
    static notEndsWith(property: string, value: string): Criterion;
    static notInSet(property: string, value: string): Criterion;
    static notStartsWith(property: string, value: string): Criterion;
    static startsWith(property: string, value: string): Criterion;
    static startsWithField(property: string, value: string): Criterion;
    static greaterThan(property: string, value: string): Criterion;
    static greaterOrEqual(property: string, value: string): Criterion;
    static equals(property: string, value: string): Criterion;
}
