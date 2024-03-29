## scryptwrap

[![Build Status](https://travis-ci.com/julyskies/scryptwrap.svg?branch=release)](https://travis-ci.com/julyskies/scryptwrap)

A wrapper for the [`crypto.scrypt()`](https://nodejs.org/dist/latest-v14.x/docs/api/crypto.html#crypto_crypto_scrypt_password_salt_keylen_options_callback), that can be used as a replacement for [argon2](https://www.npmjs.com/package/argon2) or [bcrypt](https://www.npmjs.com/package/bcrypt)

It does not have any additional dependencies

Minimal required Node version is **10.5.0**

### Installation

```shell script
npm i scryptwrap
```

### Usage

Load the module:

```javascript
import { compare, hash } from 'scryptwrap';
```

Create a hash:

```javascript
const hashed = await hash('plaintext');
```

Compare hash with a plaintext string:

```javascript
const isValid = await compare(hashed, 'plaintext');
if (isValid) {
  // plaintext string is valid
}
```

### Testing

Deploy the project locally:

```shell script
git clone https://github.com/julyskies/scryptwrap
cd ./scryptwrap
nvm use 16
npm i
```

Run tests:

```shell script
npm run test
```

Tests are done with [Jest](https://jestjs.io)

### Linting

After deploying the project and installing the modules you can do the linting:

```shell script
npm run lint
```

Using [ESLint](https://www.npmjs.com/package/eslint)

### License

[MIT](./LICENSE.md)
