import Storage from './storage'
const storage = new Storage()
 

test('set value and get value in valid time', () => {
  storage.set('test', 'test value', 5000)
  const data = storage.get('test')
  expect(data).toBe('test value')
});