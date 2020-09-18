"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Equivalent to OBContext in openbravo
 *
 * @author androettop
 */
var OBContext = /** @class */ (function () {
    function OBContext(userId, organizationId, roleId, clientId, warehouseId) {
        this.userId = userId;
        this.organizationId = organizationId;
        this.roleId = roleId;
        this.clientId = clientId;
        this.warehouseId = warehouseId;
    }
    /** Creates a context with the jwtToken information */
    OBContext.byJwtToken = function (jwtToken) {
        //TODO: mejorar esto
        var jwtData = JSON.parse(atob(jwtToken.split(".")[1]));
        return new OBContext(jwtData.user, jwtData.organization, jwtData.role, jwtData.client, jwtData.warehouse);
    };
    OBContext.prototype.setOrganizationId = function (value) {
        this.organizationId = value;
    };
    OBContext.prototype.setRoleId = function (value) {
        this.roleId = value;
    };
    OBContext.prototype.setWarehouseId = function (value) {
        this.warehouseId = value;
    };
    OBContext.prototype.getUserId = function () {
        return this.userId;
    };
    OBContext.prototype.getOrganizationId = function () {
        return this.organizationId;
    };
    OBContext.prototype.getRoleId = function () {
        return this.roleId;
    };
    OBContext.prototype.getClientId = function () {
        return this.clientId;
    };
    OBContext.prototype.getWarehouseId = function () {
        return this.warehouseId;
    };
    return OBContext;
}());
exports.default = OBContext;
