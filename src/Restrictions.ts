import Criterion from "./Criterion"
/**
 * Equivalent to Hibernate restrictions
 * 
 * @author androettop
 */
export default class Restrictions{

    /** And operator */
    public static and(criterias: Array<Criterion>):Criterion{
        return {
            operator: 'and',
            criteria:criterias
        }
    }

    /** Or operator */
    public static or(criterias: Array<Criterion>):Criterion{
        return {
            operator: 'or',
            criteria:criterias
        }
    }

    //Comparison operators
    
    public static notEqual(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'notEqual',
            value
        }
    }

    public static lessThan(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'lessThan',
            value
        }
    }

    public static lessOrEqual(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'lessOrEqual',
            value
        }
    }

    public static contains(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'contains',
            value
        }
    }
    
    public static containsField(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'containsField',
            value
        }
    }
    
    public static equalsField(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'equalsField',
            value
        }
    }
    
    public static endsWith(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'endsWith',
            value
        }
    }
    
    public static endsWithField(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'endsWithField',
            value
        }
    }
    
    public static exists(property: string, value: string):Criterion{
        throw new Error("Unimplemented method");
        return {
            fieldName: property,
            operator: 'exists',
            value
        }
    }
    
    public static greaterOrEqualField(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'greaterOrEqualField',
            value
        }
    }
    
    public static greaterThanField(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'greaterThanField',
            value
        }
    }
    
    public static iContains(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'iContains',
            value
        }
    }
    
    public static iEquals(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'iEquals',
            value
        }
    }
    
    public static iEndsWith(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'iEndsWith',
            value
        }
    }
    
    public static iGreaterOrEqual(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'iGreaterOrEqual',
            value
        }
    }
       
    public static iGreaterThan(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'iGreaterThan',
            value
        }
    }
       
    public static iLessOrEqual(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'iLessOrEqual',
            value
        }
    }
       
    public static iLessThan(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'iLessThan',
            value
        }
    }
       
    public static iNotContains(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'iNotContains',
            value
        }
    }
       
    public static iNotEqual(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'iNotEqual',
            value
        }
    }
       
    public static iNotEndsWith(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'iNotEndsWith',
            value
        }
    }
       
    public static iNotStartsWith(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'iNotStartsWith',
            value
        }
    }
       
    public static inSet(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'inSet',
            value
        }
    }
       
    public static iStartsWith(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'iStartsWith',
            value
        }
    }
       
    public static lessThanField(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'lessThanField',
            value
        }
    }
       
    public static notContains(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'notContains',
            value
        }
    }
       
    public static notEqualField(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'notEqualField',
            value
        }
    }
       
    public static notEndsWith(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'notEndsWith',
            value
        }
    }
       
    public static notInSet(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'notInSet',
            value
        }
    }
       
    public static notStartsWith(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'notStartsWith',
            value
        }
    }
       
    public static startsWith(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'startsWith',
            value
        }
    }
       
    public static startsWithField(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'startsWithField',
            value
        }
    }
       
    public static greaterThan(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'greaterThan',
            value
        }
    }
       
    public static greaterOrEqual(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'greaterOrEqual',
            value
        }
    }
       
    public static equals(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'equals',
            value
        }
    }        

    public static isNull(property: string):Criterion{
        return {
            fieldName: property,
            operator: 'isNull',
            value:"null"
        }
    }       

    public static isNotNull(property: string):Criterion{
        return {
            fieldName: property,
            operator: 'notNull',
            value:"null"
        }
    }    
}