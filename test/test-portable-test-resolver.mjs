import tap from 'tap';

import { PATHS } from 'loader339/constants';
import { fileURLToPath as fileUrl2Path } from 'url';
import { join as pathJoin, dirname as pathDirname } from 'path';

import RESOLUTIONS from './fixtures/portable-test-resolver/RESOLUTIONS.json';

const __filename = fileUrl2Path(import.meta.url);
const __dirname = pathDirname(__filename);

tap.test((t) => {
  t.ok(
    RESOLUTIONS.fixturesDir === './test/fixtures/',
    'RESOLUTIONS.fixturesDir should be `./test/fixtures/`'
  );
  t.ok(
    pathJoin(PATHS.projectRoot, RESOLUTIONS.fixturesDir) ===
      pathJoin(PATHS.projectRoot, './test/fixtures/'),
    'joining `PATHS.projectRoot` and `RESOLUTIONS.fixturesDir` should resolve to the same path as joining `PATHS.projectRoot` and `./test/fixtures/`'
  );
  t.ok(
    pathJoin(PATHS.projectRoot, RESOLUTIONS.fixturesDir) ===
      pathJoin(__dirname, 'fixtures/'),
    'joining `PATHS.projectRoot` and `RESOLUTIONS.fixturesDir` should resolve to the same path as joining `__dirname` and `fixtures/`'
  );
  t.done();
});
