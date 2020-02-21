/**
 * @fileoverview The sample ES module loader.
 * * Monkey patch a module at import time.
 * * Have more than one active APM/transformer within a single app.
 * * Keep track of which modules have been imported.
 * @flag --harmony-top-level-await
 * @module {EsModule} sample/load-sample
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { inspect } from 'util';

//------------------------------------------------------------------------------
// APMs/Transformers
//------------------------------------------------------------------------------

/**
 * Transformer for cross-platform process spawning when shelling out.
 * @param {string} source
 * @return {string}
 */
function tranSpawn(source) {
  // Replace a builtin module with custom module.
  return source.replace(
    /import { spawn } from 'child_process';/g,
    "import spawn from 'cross-spawn';"
  );
}

/**
 * APM for analytics.
 *
 * @param {string} source
 * @param {Object} context
 * @return {string}
 */
function apmAnalytics(source, context) {
  // * Monkey patch a module at import time
  //   by patching `export default ...` w/ an IIFE wrapper [IIFExport].
  //
  // This IIFExport is invoked, in its own context, at the last possible moment
  // before being imported. Anything can take place in this IIFExport (e.g.,
  // alerting, timing, logging, etc.) In this example, we are wrapping our
  // default export in a module record-like wrapper & retrofitting its exports.
  const regexp = /(export default )(.*)/g;
  const wrapper = `export default (async function () {
    const { Module } = await import('module');
    let module = new Module(import.meta.url);
    module = {...module, ...Module};
    module.context = ${inspect(context)};
    const original = $2

    if (typeof original === 'function') {
      module.exports.default = function() {
        return original.apply(this, arguments);
      };
    } else {
      module.exports.default = original;
    }
    return module;
  })();`;
  return source.replace(regexp, wrapper);
}

//------------------------------------------------------------------------------
// Hooks
//------------------------------------------------------------------------------

/**
 * @param {!(string|Buffer)} source
 * @param {!({url: !(string), format: !(string)})} context
 * @param {!(Function)} defaultTransformSource
 * @return {Promise<{source: !(string|Buffer)}>} response or response.source
 */
export async function transformSource(source, context, defaultTransformSource) {
  if (typeof source === 'string') {
    // For some or all URLs, do some custom logic for modifying the source.
    // Always return an object of the form {source: (string|Buffer)}.
    return {
      source: apmAnalytics(tranSpawn(source), context),
    };
  }
  // Defer to Node.js for all other sources.
  return defaultTransformSource(source, context, defaultTransformSource);
}
