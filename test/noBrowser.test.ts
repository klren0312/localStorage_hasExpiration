/**
 * @jest-environment node
 */
import Storage from '../src'
test('not support localStorage', () => {
  expect(Storage._isSupport).toBe(false)
  expect(Storage.set('test', 'test test value', 2)).toBeNull()
  expect(Storage.get('test')).toBeNull()
  expect(Storage.remove('test')).toBeNull()
  expect(Storage.clear()).toBeNull()
})
