/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  build: {
    outDir: 'lib',
    lib: {
      entry: 'src/index.js',
      name: 'SemanticReleaseWordpressReadme',
    },
  },
};
