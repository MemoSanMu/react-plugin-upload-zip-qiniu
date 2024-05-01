"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadZip = void 0;
var qiNiu = require('qiNiu');
/**
 * 上传zip到七牛
 * @returns
 */
function uploadZip(props) {
    try {
        return new Promise(function (resolve, reject) {
            var accessKey = 'VXx5qAms81PB5Iv1lociP3m5SxNzlEkw5mKz_4s-';
            var secretKey = 'kfkG4PGLPHrWTh8ZbcZsHauMYVmYmZ9Iaru8IEBS';
            var bucket = '3mu-space';
            // 本地文件路径
            // const localFile = '/path/to/your/file.txt';
            // 上传的文件名，可以自定义
            // const key = 'your/custom/key';
            var localFile = props.localFile, key = props.key;
            // 初始化配置
            var mac = new qiNiu.auth.digest.Mac(accessKey, secretKey);
            var putPolicy = new qiNiu.rs.PutPolicy({
                scope: "".concat(bucket, ":").concat(key),
            });
            var uploadToken = putPolicy.uploadToken(mac);
            // 上传文件
            var formUploader = new qiNiu.form_up.FormUploader();
            formUploader.putFile(uploadToken, key, localFile, null, function (err, res) {
                if (!err) {
                    resolve(res);
                }
                else {
                    reject(err);
                }
            });
        });
    }
    catch (err) {
        return Promise.reject(err);
    }
}
exports.uploadZip = uploadZip;
