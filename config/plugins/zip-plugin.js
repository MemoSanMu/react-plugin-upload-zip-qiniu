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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var utils_1 = require("./utils");
var AdmZip = require('adm-zip');
var md5 = require('md5');
var fs = require('fs');
var ZipPlugin = /** @class */ (function () {
    function ZipPlugin(options) {
        this.options = {
            env: 'dev',
        };
        this.options = options || this.options;
    }
    ZipPlugin.prototype.apply = function (compiler) {
        var _this = this;
        compiler.hooks.done.tapAsync('ZipPlugin', function (compilation, callback) {
            return _this.handleZipPlugin(compiler, compilation, callback);
        });
    };
    ZipPlugin.prototype.handleZipPlugin = function (compiler, compilation, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var outputPath, zipPath, admZip, contentMd5, localFile, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        outputPath = compiler.options.output.path;
                        zipPath = "".concat(outputPath, "/").concat(compilation.hash, ".zip");
                        admZip = new AdmZip();
                        admZip.addLocalFolder(outputPath, 'dist');
                        admZip.writeZip(zipPath);
                        contentMd5 = md5(Array.from(fs.readFileSync(zipPath)));
                        localFile = "offlinePackage/".concat(this.options.env, "/").concat(contentMd5, ".zip");
                        return [4 /*yield*/, (0, utils_1.uploadZip)({ localFile: zipPath, key: localFile })];
                    case 1:
                        res = _a.sent();
                        // {
                        //   hash: 'FgUrb3Gd4kJYfE1oUmAIFoX5KyFT',
                        //   key: 'offlinePackage/production/4eecf5668897a721f3e0074457a37dcb.zip' // 把这个地址拼接上自域名即可
                        // } uploadZip res
                        // 然后考验调用业务接口把key和其他信息传到后台
                        console.log(res, 'uploadZip res');
                        callback();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ZipPlugin;
}());
module.exports = ZipPlugin;
