# zstorage
the localStorage that has expired time

[![NPM version][npm-image]][npm-url]
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fklren0312%2FlocalStorage_hasExpiration.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fklren0312%2FlocalStorage_hasExpiration?ref=badge_shield)
[![codecov](https://codecov.io/gh/klren0312/localStorage_hasExpiration/branch/master/graph/badge.svg)](https://codecov.io/gh/klren0312/localStorage_hasExpiration)

[npm-image]: https://img.shields.io/badge/npm-v1.0.4-blue.svg
[npm-url]: https://www.npmjs.com/package/zstorage



## Install
```bash
$ npm install zstorage --save
```

## Test
```
$ npm install
$ npm run test
```
## Use
> you can see example in ./index.html

```javascript
import Storage from 'zstorage'
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
