/**
 * @module {EsModule} test/node-version
 */

import { createRequire } from 'module';
import { PATHS } from 'loader339/constants';

const require = createRequire(import.meta.url);
const pjsonObj = require(PATHS.manifest);
const tasksUtil = require('../tasks/util.js');
const semver = tasksUtil.rootNpmRequire('semver');

// Accommodate for labels and build metadata appearing as SemVer extensions.
const NODE_VERSION = process.version.split('-')[0];

if(!semver.satisfies(NODE_VERSION, pjsonObj.engines.node)) {
  throw new Error(`current \`node\`, ${NODE_VERSION}, must satisfy ${pjsonObj.engines.node}`);
}
