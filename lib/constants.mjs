/**
 * @module {EsModule} lib/constants
 */

import { dirname as pathDirname, resolve as pathResolve } from 'path';
import { fileURLToPath as pathFromFileUrl } from 'url';

const __filename = pathFromFileUrl(import.meta.url);
const __dirname = pathDirname(__filename);

/**
 * Helper to make it possible to use absolute project paths.
 * @param  {string} relativePath A path relative to the project root
 * @return {string} An absolute ready-to-use path
 */
function absolute(relativePath) {
  return pathResolve(pathDirname(__dirname), relativePath);
}

/**
 * Various paths that are critical to the project and used throughout.
 * @type {Object}
 */
export const PATHS = {
  projectRoot: absolute('.'),
  manifest: absolute('./package.json'),
};
