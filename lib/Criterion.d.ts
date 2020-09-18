/**
 * Equivalent to Criterion in hibernate
 *
 * @author androettop
 */
export default interface Criterion {
    fieldName?: string;
    operator: string;
    value?: string | Array<string>;
    criteria?: Array<Criterion>;
}
