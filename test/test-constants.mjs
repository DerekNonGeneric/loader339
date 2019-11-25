import tap from 'tap';
import { resolve } from 'path';

import { projectRoot } from 'lorem/constants'

const root = '/'

tap.test(t => {
  t.ok(projectRoot.includes('lorem-demo'), 'path should include lorem-demo');
  t.ok(!projectRoot.includes('lib'), 'it should not include lib');
  t.done();
});
