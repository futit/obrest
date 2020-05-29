import Criterion from "./Criterion"

export default class Restrictions{

    static eq(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'equals',
            value
        }
    }

    static ne(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'iNotEqual',
            value
        }
    }
    
    static ge(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'greaterOrEqual',
            value
        }
    }

    static le(property: string, value: string):Criterion{
        return {
            fieldName: property,
            operator: 'lessOrEqual',
            value
        }
    }

    static isNotNull(property: string):Criterion{
        return {
            fieldName: property,
            operator: 'notNull',
        }
    }
    static isNull(property: string):Criterion{
        return {
            fieldName: property,
            operator: 'isNull',
        }
    }
}