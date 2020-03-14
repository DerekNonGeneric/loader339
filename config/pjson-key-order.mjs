/**
 * @file Package manifest key order config.
 *
 * Much of the order of these keys follow the order of appearance seen in
 * npm's `man` page. Additionally found [here].
 *
 * [here]: https://docs.npmjs.com/files/package.json
 *
 * @author Derek Lewis <DerekNonGeneric@inf.is>
 * @license 0BSD
 * @module {EsModule} config/pjson-key-order
 */
export default [
  /**
   * Details
   */
  '$schema',
  'name',
  'version',
  'description',
  'keywords',
  'homepage',
  'bugs',
  'license',
  'author',
  'maintainers',
  'contributors',

  /**
   * Yarn specific
   */
  'workspaces',

  /**
   * Configuration
   */

  'files',
  'main',
  'module',
  'type',
  'exports',
  'browser',
  'bin',
  'man',
  'directories',
  'repository',
  'scripts',
  'config',
  'sideEffects',
  'types',
  'typings',

  /**
   * Dependencies
   */
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'bundleDependencies',
  'bundledDependencies',
  'optionalDependencies',

  /**
   * Constraints
   */
  'engines',
  'engine-strict',
  'engineStrict',
  'os',
  'cpu',

  /**
   * Miscellaneous
   */
  'preferGlobal',
  'private',

  /**
   * Package publishing configuration
   */
  'publishConfig',
];
