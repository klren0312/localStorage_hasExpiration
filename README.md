# zstorage-node
the localStorage that has expired time, you can use it in NodeJS

[![NPM version][npm-image]][npm-url]
[![npm](https://img.shields.io/npm/dt/zstorage-node.svg)](https://www.npmjs.com/package/zstorage-node)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fklren0312%2FlocalStorage_hasExpiration.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fklren0312%2FlocalStorage_hasExpiration?ref=badge_shield)
[![codecov](https://codecov.io/gh/klren0312/localStorage_hasExpiration/branch/master/graph/badge.svg)](https://codecov.io/gh/klren0312/localStorage_hasExpiration)

[npm-image]: https://img.shields.io/badge/npm-v1.0.10-blue.svg
[npm-url]: https://www.npmjs.com/package/zstorage-node



## Install
```bash
$ npm install zstorage-node --save
```

## Test
```bash
$ git clone https://github.com/klren0312/localStorage_hasExpiration.git
$ cd localStorage_hasExpiration
$ git checkout feature/node
$ npm install
$ npm run test
```
## Use
> you can see example in `storage.test.js`

```javascript
const Storage = require('zstorage')
Storage.set('test', {t:1,b:2}, 5)
console.log('current,', Storage.get('test'))
setTimeout(() => console.log('after 5s,', Storage.get('test')), 5000)
```

## Api

**get (key)**
>get the value by key from localStorage

```
param: 
  key
return:
  null (expired)
  value (not expired)
```
**set (key, value, expired_second)**
> set the localStorage, with key, value and expired_second(unit: s)

**Tips**: You'll not use `JSON.stringify()` to stringify Object or Array

```
param:
  key
  value
  expired_second
return
```
**remove (key)**
> remove the value by key from localStorage

```
param:
  key
return
```
**clear ()**
> clear all values from localStorage

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fklren0312%2FlocalStorage_hasExpiration.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fklren0312%2FlocalStorage_hasExpiration?ref=badge_large)
