/**
 * Since we are running with babel-register AND in a mono-repo, we set
 * rootMode to upward to use the config in the root. In addition, since
 * the default behavior of babel-register is to ignore files outside the
 * current cwd, we set ignore to node_modules to only ignore those files,
 * not shared test helpers
 */
// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register')({rootMode: 'upward', ignore: [/node_modules/]});
