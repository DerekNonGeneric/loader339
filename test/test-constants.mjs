import { PATHS } from 'loader339/constants';
import tap from 'tap';

tap.test(t => {
  t.ok(PATHS.projectRoot.includes('loader339'), 'path should include loader339');
  t.ok(!PATHS.projectRoot.includes('lib'), 'it should not include lib');
  t.done();
});
