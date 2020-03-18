/**
 * @file Tests the availability of the module named "lib/constants" by loading
 * it w/ the default Node.js ES module loader via its self-reference specifier.
 *
 * Assumptions we can reasonably make about the `lib/constants` convention:
 * 1. is a file named `constants.mjs`
 * 2. is in a directory named `lib`
 * 3. is in a subdirectory one level below the project root
 *
 * @module {EsModule} test/test-constants
 */

import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath as fileUrl2Path } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const tasksUtil = require('../tasks/util.js');
const colors = tasksUtil.rootNpmRequire('ansicolors');
const __filename = fileUrl2Path(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = dirname(__dirname);

// Importing a module with a self-reference specifier w/o throwing is evidence
// covering a true-positive case of self-referential modules being enabled. We
// dynamically build the "lib/constants" module's self-reference specifier.
//------------------------------------------------------------------------------
let pjsonPath = join(projectRoot, 'package.json');
if(!existsSync(pjsonPath)) {
  throw new Error(colors.red('× ' + 'a package.json should exist in the project root dir'));
} else {
  console.error(
    colors.green('○ ' + 'a package.json exists in the project root dir')
  );
}
const pjsonObj = require(pjsonPath);
if (!Object.prototype.hasOwnProperty.call(pjsonObj, 'name')) {
  throw new Error(colors.red('× ' + 'it should have a `name` field'));
} else {
  console.error(
    colors.green('○ ' + 'it has a name field')
  );
}
// Runtime feature detection testing for self resolve (the platform feature).
const selfReferenceSpecifier = pjsonObj.name + '/' + 'constants';
if(!(async () => await import(selfReferenceSpecifier))()) {
  throw new Error(colors.red('× ' + 'importing a module by its self-reference specifier should not throw'));
} else {
  console.error(
    colors.green('○ ' + 'importing a module by its self-reference specifier does not throw')
  );
}
//------------------------------------------------------------------------------
// We _could_ determine if it confirms our assumption about `projectRoot`, but
// that will be changing in the future and is beyond the scope of this test.
