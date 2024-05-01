import { uploadZip } from './utils';

const AdmZip = require('adm-zip');
const md5 = require('md5');
const fs = require('fs');

type Options = {
  env: string;
};

class ZipPlugin {
  private options = {
    env: 'dev',
  };
  constructor(options: Options) {
    this.options = options || this.options;
  }
  apply(compiler) {
    compiler.hooks.done.tapAsync('ZipPlugin', (compilation, callback) =>
      this.handleZipPlugin(compiler, compilation, callback)
    );
  }
  async handleZipPlugin(compiler, compilation, callback) {
    const outputPath = compiler.options.output.path;
    const zipPath = `${outputPath}/${compilation.hash}.zip`;

    const admZip = new AdmZip();
    admZip.addLocalFolder(outputPath, 'dist');
    admZip.writeZip(zipPath);

    const contentMd5 = md5(Array.from(fs.readFileSync(zipPath)));
    const localFile = `offlinePackage/${this.options.env}/${contentMd5}.zip`;

    const res = await uploadZip({ localFile: zipPath, key: localFile });

    // {
    //   hash: 'FgUrb3Gd4kJYfE1oUmAIFoX5KyFT',
    //   key: 'offlinePackage/production/4eecf5668897a721f3e0074457a37dcb.zip' // 把这个地址拼接上自域名即可
    // } uploadZip res
    // 然后考验调用业务接口把key和其他信息传到后台
    console.log(res, 'uploadZip res');

    callback();
  }
}

module.exports = ZipPlugin;
