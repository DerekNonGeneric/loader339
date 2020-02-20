import { projectRoot } from 'loader339/constants';
import tap from 'tap';

tap.test(t => {
  t.ok(projectRoot.includes('loader339'), 'path should include loader339');
  t.ok(!projectRoot.includes('lib'), 'it should not include lib');
  t.done();
});
