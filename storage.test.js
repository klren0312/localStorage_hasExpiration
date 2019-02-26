import Storage from '.'

test('set value and get value in valid time', () => {
  Storage.set('test', 'test value', 5)
  const data = Storage.get('test')
  expect(data).toBe('test value')
});

/**
 * 睡眠函数
 * @param {Number} s 秒
 */
function sleep(s) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, s * 1000);
  });
}
// 需要设置测试的超时时间, 不然会报错
// Timeout - Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout.
// issue: https://github.com/facebook/jest/issues/5055
test('get value in invalid time', async () => {
  Storage.clear()
  Storage.set('test', 'test test value', 2)
  await sleep(3)
  const data = Storage.get('test')
  expect(data).toBeNull()
}, 5000);

test('not support localStorage', () => {
  Storage._isSupport = false
  expect(Storage.set('test', 'test test value', 2)).toBeNull()
})