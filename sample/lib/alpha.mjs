/**
 * @fileoverview The alpha module.
 * @flag --harmony-top-level-await
 * @flag --experimental-loader=./sample/load-sample.mjs
 * @module {EsModule} sample/lib/alpha
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Module, createRequire } from 'module';
import { spawn } from 'child_process';

let { default: beta } = await import('./beta.mjs');
const require = createRequire(import.meta.url);
const cliTruncate = require('cli-truncate');

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * @param {object} object
 * @return {object}
 */
function maybeUnwrap(object) {
  return object && object.exports ? object.exports.default : object;
}

//------------------------------------------------------------------------------
// Main
//------------------------------------------------------------------------------

beta = await beta; // Dubbing this "lazy loading" while reengineering.

const selfVar = 100;
console.log(`\n ↓ addself(${selfVar})`);
console.log(await maybeUnwrap(beta).addself(selfVar));

// eslint-disable-next-line no-prototype-builtins
if (beta.hasOwnProperty('_cache')) {
  const abbreviatedModuleMap = {};

  // eslint-disable-next-line no-unused-vars
  Object.keys(beta._cache).forEach((v, i, a) => {
    const newKey = cliTruncate(v, 63, { position: 'middle', space: false });

    const blankModuleRecord = new Module(import.meta.url);
    blankModuleRecord.loaded = true;
    const moduleRecord = Object.assign(blankModuleRecord, {
      ...beta._cache[v],
    });
    /** @type {Module} */ abbreviatedModuleMap[newKey] = { moduleRecord };
  });

  console.log('\n ↓ BETA MODULE MAP ↓');
  console.table(abbreviatedModuleMap);
}

// eslint-disable-next-line no-prototype-builtins
if (beta.hasOwnProperty('context')) {
  console.log('\n ↓ BETA MODULE CONTEXT ↓');
  console.table(beta.context);
}

console.log('\n ↓ INSTALLED PACKAGES ↓');
spawn('npm', ['list', '-depth', '0'], { stdio: 'inherit' });

// Entry module using top-level await that *also* exports.
export default maybeUnwrap;
