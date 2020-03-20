/* eslint-disable func-names, no-void, max-len, no-console, no-empty */
import * as util from 'util';
import * as childProcess from 'child_process';
import { name, version } from '../package.json';

const exec = util.promisify(childProcess.exec);

/**
 * Packs the module, cd's into the example directory and installs it
 */
void (async function () {

  try {
    console.log('removing all tgz');
    await exec('rm *.tgz');
  } catch (e) {}

  console.log('packing');
  await exec('npm pack');

  try {
    console.log('removing previous package');
    await exec(`cd example && yarn remove ${name}`);
  } catch (e) {}

  console.log('installing new package');
  await exec(`cd example && yarn add ../${name}-${version}.tgz`);

  process.exit(0);
}());
