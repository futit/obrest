/**
 * Equivalent to OBContext in openbravo
 *
 * @author androettop
 */
export default class OBContext {
    private userId;
    private organizationId;
    private roleId;
    private clientId;
    private warehouseId;
    constructor(userId: string, organizationId: string, roleId: string, clientId: string, warehouseId: string);
    /** Creates a context with the jwtToken information */
    static byJwtToken(jwtToken: string): OBContext;
    setOrganizationId(value: string): void;
    setRoleId(value: string): void;
    setWarehouseId(value: string): void;
    getUserId(): string;
    getOrganizationId(): string;
    getRoleId(): string;
    getClientId(): string;
    getWarehouseId(): string;
}
