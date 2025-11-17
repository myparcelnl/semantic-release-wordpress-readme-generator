# semantic-release-wordpress-readme-generator

Generates a readme.txt for WordPress plugin releases.

## Installation

### With Yarn

```shell
yarn add -D @myparcel-dev/semantic-release-wordpress-readme-generator
```

### With PNPM

```shell
pnpm add -D @myparcel-dev/semantic-release-wordpress-readme-generator
```

### With NPM

```shell
npm install --save-dev @myparcel-dev/semantic-release-wordpress-readme-generator
```

## Usage

Add the following to your `release.config.js`, below the `@semantic-release/changelog` plugin:

```js
const wordpressReadme = require('@myparcel-dev/semantic-release-wordpress-readme-generator');

module.exports = {
  plugins: [
    // ...
    '@myparcel-dev/semantic-release-wordpress-readme-generator',
  ],
};
```

### Options

By default, this is the configuration that will be used. This defines which commits will be included in the readme, and the order in which the entries will be written.

| Type     | Prefix                      |
|----------|-----------------------------|
| `feat`   | `New: `                     |
| `fix`    | `Fixed bug: `               |
| `perf`   | `Performance improvement: ` |
| `revert` | `Reverted: `                |

To customize this, pass an object to the plugin and override the `types` property:

```js
const wordpressReadme = require('@myparcel-dev/semantic-release-wordpress-readme-generator');

module.exports = {
  plugins: [
    // ...
    [
      '@myparcel-dev/semantic-release-wordpress-readme-generator',
      {
        types: [
          {
            type: 'feat',
            prefix: 'Feature: ',
          },
          {
            type: 'fix',
            prefix: 'Fix: ',
          },
        ]
      }
    ],
  ],
};
```
