import Storage from '../src'

test('set value and get value in valid time', () => {
  Storage.set('test', 'test value', 5)
  const data = Storage.get('test')
  expect(data).toBe('test value')
});

test('test remove storage key', () => {
  Storage.set('test', 'test value')
  expect(Storage.get('test')).toBe('test value')
  expect(Storage.remove('test')).toBe(true)
  expect(Storage.get('test')).toBeNull()
})

test('test clean the storage', () => {
  Storage.set('test1', 'test value1')
  Storage.set('test2', 'test value2')
  expect(Storage.get('test1')).toBe('test value1')
  expect(Storage.get('test2')).toBe('test value2')
  Storage.clear()
  expect(Storage.get('test1')).toBeNull()
  expect(Storage.get('test2')).toBeNull()
})

test('set, get, remove error', () => {
  expect(Storage.set()).toBeNull()
  expect(Storage.get()).toBeNull()
  expect(Storage.remove()).toBeNull()
})

/**
 * 睡眠函数
 * @param {Number} s 秒
 */
function sleep(s) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, s * 1000);
  });
}
// 需要设置测试的超时时间, 不然会报错
// Timeout - Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout.
// issue: https://github.com/facebook/jest/issues/5055
test('get value in invalid time', async () => {
  expect(Storage.clear()).toBe(true)
  Storage.set('test', 'test test value', 2)
  await sleep(3)
  const data = Storage.get('test')
  expect(data).toBeNull()
}, 5000);
