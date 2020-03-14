import { pjsonKeyOrder } from 'loader339/config';

export default {
  extends: [
    'npm-package-json-lint-config-default',
    '@wordpress/npm-package-json-lint-config',
  ],
  rules: {
    'prefer-property-order': ['error', pjsonKeyOrder],
    'scripts-type': 'error',
    'valid-values-license': ['error', ['0BSD']],
  },
};
