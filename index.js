const NodeStorage = require('./adapters/NodeStorage')
class Storage {
  /**
   * 构造器
   * @param {string} path 文件路径
   * @param {string} key aes的key
   * @param {string} iv aes的iv
   */
  constructor (path = '', key = 'localstorage1234', iv = '1012132343363708') {
    this.StorageInstance = new NodeStorage(path, key, iv)
  }

  /**
   * 获取时间戳
   */
  static get timestamp() {
    return new Date() / 1000
  }
  /**
   * 判断是否失效
   * @param {Object} entity 存储实例
   */
  static __isExpired(entity) {
    /* istanbul ignore next */
    if(!entity) return true // 无实例, 即失效
    return Storage.timestamp - (entity.timestamp + entity.expired_second) >= 0
  }

  /**
   * 存入
   * @param {String} key 键
   * @param {String} value 值
   * @param {Number} expired_second 过期时间 单位秒
   */
  set (key, value, expired_second) {
    if (!key && !value && !expired_second) {
      console.error('missing parameter')
      return null
    }
    // 存储实例
    const entity = {
      timestamp: Storage.timestamp,
      expired_second,
      key,
      value
    }
    this.StorageInstance.setItem(key, JSON.stringify(entity))
    return this
  }
  
  /**
   * 读取
   * @param {String} key 键
   */
  get (key) {
    let entity
    entity = this.StorageInstance.getItem(key)
    if (entity) {
      entity = JSON.parse(entity)
    } else {
      return null
    }
    //没有设置过期时间, 直接返回值
    if (!entity.expired_second) return entity.value

    // 过期, 删除存储, 返回 null
    if (Storage.__isExpired(entity)) {
      this.remove(key)
      return null
    } else {
      return entity.value
    }
  }

  /**
   * 删除存储
   * @param {String} key 键
   */
  remove (key) {
    if (!key) {
      console.error('missing parameter')
      return null
    }
    this.StorageInstance.removeItem(key)
    return this
  }

  /**
   * 清空存储
   */
  clear () {
    this.StorageInstance.clear() 
    return this
  }
}

module.exports = Storage
