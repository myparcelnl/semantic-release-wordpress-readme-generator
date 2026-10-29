/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  build: {
    outDir: 'lib',
    lib: {
      entry: 'src/index.js',
      // A semantic-release plugin runs in Node only, so CommonJS is the only format needed.
      formats: ['cjs'],
      fileName: () => 'semantic-release-wordpress-readme-generator.js',
    },
  },
};
