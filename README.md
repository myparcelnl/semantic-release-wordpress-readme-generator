# semantic-release-wordpress-readme-generator

Generates a readme.txt for WordPress plugin releases.

## Installation

### With Yarn

```shell
yarn add -D @myparcel/semantic-release-wordpress-readme-generator
```

### With PNPM

```shell
pnpm add -D @myparcel/semantic-release-wordpress-readme-generator
```

### With NPM

```shell
npm install --save-dev @myparcel/semantic-release-wordpress-readme-generator
```

## Usage

Add the following to your `release.config.js`, below the `@semantic-release/changelog` plugin:

```js
const wordpressReadme = require('@myparcel/semantic-release-wordpress-readme-generator');

module.exports = {
  plugins: [
    // ...
    '@myparcel/semantic-release-wordpress-readme-generator',
  ],
};
```
