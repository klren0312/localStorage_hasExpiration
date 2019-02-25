# zstorage
the localStorage that has expired time

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
>get the value  by key from localStorage

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