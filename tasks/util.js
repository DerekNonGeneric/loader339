// * The contents of this file should work on as many versions of Node.js as
// * possible. Hence, it _cannot_ use any >ES5 syntax or features. Other files,
// * which may use >=ES2015 syntax, should only be loaded asynchronously _after_
// * successful completion of this version check.
//------------------------------------------------------------------------------
'use strict';

/**
 * @file Task Utilities.
 * @author Derek Lewis <DerekNonGeneric@inf.is>
 * @license MIT
 * @module {CjsModule} tasks/util
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
// * Since this module supports a pre-installation task, neither dependencies
// * nor devDependencies specified in our package manifest are installed yet.
// * Therefore, realistically, only the following modules would be available.
// * - core modules built into the currently active version (?) of Node.js
// * - dependencies of the globally-installed version (?) of the `npm` package
//------------------------------------------------------------------------------

var childProcess = require('child_process');
var fs = require('fs');
var assert = require('assert');
var pathResolve = require('path').resolve;
var pathDirname = require('path').dirname;

var fmt = require('util').format;

var shellCmd = process.platform === 'win32' ? 'cmd' : '/bin/bash';

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/* @const */
const hasOwn_ = Object.prototype.hasOwnProperty;

/**
 * Checks if the given key is a property in the map.
 * @param {T} obj a map like property.
 * @param {!string} key
 * @return {!boolean}
 * @template T
 */
var hasOwn = (exports.hasOwn = function(obj, key) {
  return hasOwn_.call(obj, key);
});

/**
 * Returns obj[key] iff key is obj's own property (is not inherited).
 * Otherwise, returns undefined.
 * @param {!Object} obj
 * @param {!string} key
 * @return {*}
 */
var ownProperty = (exports.ownProperty = function(obj, key) {
  if (hasOwn(obj, key)) {
    return obj[key];
  } else {
    return undefined;
  }
});

/**
 * Executes the provided command, returning its trimmed stdout.
 * @param {string} cmd
 * @param {?Object} options
 * @return {string}
 */
var getTrimmedStdout = (exports.getTrimmedStdout = function(cmd, options = {}) {
  var spawnSyncOptions = {
    shell: shellCmd,
    cwd: options.cwd || process.cwd(),
    env: options.env || process.env,
    stdio: options.stdio || 'pipe',
    encoding: options.encoding || 'utf-8',
  };
  Object.assign(spawnSyncOptions, options);
  var p = childProcess.spawnSync(cmd, spawnSyncOptions);
  return p.stdout.trim();
});

/**
 * Loads a dependency of the globally-installed npm package.
 *
 * Since we're unable to safely use npm to install any modules yet, some
 * acrobatics are necessary to avail a few standard-issue third-party modules
 * to pre-installation tasks. We will be retrieving them from the dependencies
 * of the `npm` package located in the _global npm root_, which _should_ already
 * be present on every system with an installation of Node.js. Although
 * extremely rare, the possibility exists for this package to be absent if, say
 * for example, a brilliant human thought to purge disc space resulting in its
 * inadvertent deletion.
 *
 * ! Note: These dependencies are a moving target between npm versions.
 *
 * @param {string} specifier
 * @return {Module}
 */
var rootNpmRequire = (exports.rootNpmRequire = function(specifier) {
  var globalNpmRootLoc;
  try {
    globalNpmRootLoc = getTrimmedStdout('npm root -g');
  } catch (err) {
    // TODO: Verify accuracy.
    assert(false, err);
  }
  var rootNpmDepsLoc = pathResolve(globalNpmRootLoc, 'npm', 'node_modules');
  var moduleLocation = pathResolve(rootNpmDepsLoc, specifier);
  return require(moduleLocation);
});

/**
 * @param {!string} packageFilePath
 * @return {!Object}
 */
var getPackageDevEngines = (exports.getPackageDevEngines = function(packageFilePath) {
  var colors = rootNpmRequire('ansicolors');
  var packageFileAbsPath = pathResolve(pathDirname(__dirname), packageFilePath);
  var packageFile;
  var packageData;
  try {
    packageFile = fs.readFileSync(packageFileAbsPath, { encoding: 'utf-8' });
    packageData = JSON.parse(packageFile);
  } catch (e) {
    assert(
      false,
      fmt(
        colors.red('ERROR: %s must be parsable JSON, yet resulted in error: %s'),
        packageFileAbsPath,
        e
      )
    );
  }
  if (!ownProperty(packageData, 'devEngines')) {
    assert(
      false,
      colors.red('ERROR: package manifest didn\'t contain a "devEngines" key')
    );
  }
  return packageData.devEngines;
});

exports.default = { hasOwn, ownProperty, getPackageDevEngines, getTrimmedStdout, rootNpmRequire };
