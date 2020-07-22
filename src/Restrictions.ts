import Criterion from "./Criterion"

export default class Restrictions{

    public static and(criterias: Array<Criterion>):Criterion{
        return {
            operator: 'and',
            criteria:criterias
        }
    }
    public static or(criterias: Array<Criterion>):Criterion{
        return {
            operator: 'or',
            criteria:criterias
        }
    }
    public static eq(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'equals',
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

    
    public static iContains(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'iContains',
            value
        }
    }

    public static ne(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'iNotEqual',
            value
        }
    }
    
    public static ge(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'greaterOrEqual',
            value
        }
    }

    public static le(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'lessOrEqual',
            value
        }
    }
}