import { createRequire } from 'module';
import { PATHS } from 'loader339/constants';

const require = createRequire(import.meta.url);
const pjsonObj = require(PATHS.manifest);
const semver = require('semver');
const tap = require('tap');

// Accommodate for labels and build metadata appearing as SemVer extensions.
const NODE_VERSION = process.version.split('-')[0];

tap.test((t) => {
  t.ok(
    semver.satisfies(NODE_VERSION, pjsonObj.engines.node),
    `current \`node\`, ${NODE_VERSION}, must satisfy ${pjsonObj.engines.node}`
  );
  t.done();
});
