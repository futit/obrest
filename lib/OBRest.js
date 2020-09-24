"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var _1 = require(".");
/**
 * OBRest class, equivalent to the OBDal class in Openbravo
 *
 * @author androettop
 */
var OBRest = /** @class */ (function () {
    function OBRest(url, jwtToken) {
        this.wsName = "com.smf.securewebservices.obRest";
        // create axios instance, if token provided, login.
        this.axios = axios_1.default.create({
            baseURL: url.href + "/sws/",
            headers: jwtToken ? {
                'Authorization': "Bearer " + jwtToken
            } : {},
        });
        if (jwtToken) {
            this.context = _1.OBContext.byJwtToken(jwtToken);
        }
    }
    /** Create a criteria with the enviroment configuration */
    OBRest.prototype.createCriteria = function (entityName) {
        return new _1.OBCriteria(this.axios, this.wsName, entityName);
    };
    /** Save a single record */
    OBRest.prototype.save = function (object) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!object._entityName) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._save(object._entityName, [object])];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, !!result ? result[0] : undefined];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /** Save an array of records */
    OBRest.prototype.saveList = function (objects) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (objects.length > 0 && objects[0]._entityName) {
                    return [2 /*return*/, this._save(objects[0]._entityName, objects)];
                }
                return [2 /*return*/];
            });
        });
    };
    OBRest.prototype._save = function (entityName, data) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.axios.request({
                                method: 'POST',
                                url: this.wsName + "/" + entityName,
                                data: { data: data }
                            })];
                    case 1:
                        response = _c.sent();
                        if (response === null || response === void 0 ? void 0 : response.data) {
                            return [2 /*return*/, response.data.data];
                        }
                        return [2 /*return*/, undefined];
                    case 2:
                        error_1 = _c.sent();
                        if ((_b = (_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) {
                            throw new Error(error_1.response.data.message);
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** Remove a single record */
    OBRest.prototype.remove = function (object) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(object._entityName && object.id)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._remove(object._entityName, [object])];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result != undefined ? result[0] : undefined];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /** Remove an array of records */
    OBRest.prototype.removeList = function (object) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (object.length > 0 && object[0]._entityName) {
                    return [2 /*return*/, this._remove(object[0]._entityName, object)];
                }
                return [2 /*return*/];
            });
        });
    };
    OBRest.prototype._remove = function (entityName, data) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.axios.request({
                                method: 'DELETE',
                                url: this.wsName + "/" + entityName,
                                data: {
                                    data: data.map(function (obj) { return obj.id; })
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        if (response === null || response === void 0 ? void 0 : response.data) {
                            return [2 /*return*/, response.data.data];
                        }
                        return [2 /*return*/, undefined];
                    case 2:
                        error_2 = _c.sent();
                        if ((_b = (_a = error_2 === null || error_2 === void 0 ? void 0 : error_2.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) {
                            throw new Error(error_2.response.data.message);
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** Return the axios instance */
    OBRest.prototype.getAxios = function () {
        return this.axios;
    };
    /** Return the current context */
    OBRest.prototype.getOBContext = function () {
        return this.context;
    };
    /** Async function to set the context and refreshg the token */
    OBRest.prototype.setOBContext = function (context) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var response, jwtToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.context = context;
                        return [4 /*yield*/, OBRest.getInstance().getAxios().post("login", {
                                role: context.getRoleId(),
                                organization: context.getOrganizationId(),
                                warehouse: context.getWarehouseId(),
                            })];
                    case 1:
                        response = _b.sent();
                        jwtToken = (_a = response.data) === null || _a === void 0 ? void 0 : _a.token;
                        OBRest.loginWithToken(jwtToken);
                        return [2 /*return*/];
                }
            });
        });
    };
    OBRest.prototype.callWebService = function (name, method, params, data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.request({
                            method: method,
                            url: name,
                            data: data
                        })];
                    case 1:
                        response = (_a.sent());
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /** Initializes the conection with rest api */
    OBRest.init = function (url, jwtToken) {
        OBRest.instance = new OBRest(url, jwtToken);
    };
    /** User login with username and password */
    OBRest.loginWithUserAndPassword = function (username, password) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var response, jwtToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, OBRest.getInstance().getAxios().post("login", {
                            username: username,
                            password: password,
                        })];
                    case 1:
                        response = _b.sent();
                        if (response.data.status === "error") {
                            throw new Error(response.data.message);
                        }
                        jwtToken = (_a = response.data) === null || _a === void 0 ? void 0 : _a.token;
                        OBRest.loginWithToken(jwtToken);
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Build the axios instance headers with the provided token */
    OBRest.loginWithToken = function (jwtToken) {
        OBRest.getInstance().getAxios().defaults.headers = {
            'Authorization': "Bearer " + jwtToken
        };
        OBRest.getInstance().context = _1.OBContext.byJwtToken(jwtToken);
    };
    /** Return the initialized instance */
    OBRest.getInstance = function () {
        if (!OBRest.instance) {
            throw new Error("OBRest instance not initialized");
        }
        return OBRest.instance;
    };
    return OBRest;
}());
exports.default = OBRest;
