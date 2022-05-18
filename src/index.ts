interface Entity {
  timestamp: number
  expired_second: number
  key: string
  value: string
}
class ZStorage {
  _isSupport: boolean
  /**
   * 构造器
   * constructor
   */
  constructor () {
    this._isSupport = true
    try {
      const test = 'localStorage support test'
      window.localStorage.setItem('test', test)
      window.localStorage.removeItem('test')
    } catch (e) {
      this._isSupport = false
    }
  }

  /**
   * 获取时间戳
   */
  static get timestamp(): number {
    return new Date().getTime() / 1000
  }
  /**
   * 判断是否失效
   * @param {Entity} entity 存储实例
   */
  static __isExpired(entity: Entity) {
    /* istanbul ignore next */
    if(!entity) return true // 无实例, 即失效
    return ZStorage.timestamp - (entity.timestamp + entity.expired_second) >= 0
  }

  /**
   * 存入
   * @param {String} key 键
   * @param {String} value 值
   * @param {Number} expired_second 过期时间 单位秒
   */
  set (key?: string | null, value?: string | null, expired_second?: number | null) {
    if (!this._isSupport) {
      return null
    }
    if (!key) {
      console.error('missing key')
      return null
    } else if (!value) {
      console.error('missing value')
      return null
    }
    // 存储实例
    const entity = {
      timestamp: ZStorage.timestamp,
      expired_second,
      key,
      value
    }
    window.localStorage.setItem(key, JSON.stringify(entity))
    return true
  }
  
  /**
   * 读取
   * @param {String} key 键
   */
  get (key?: string) {
    if (!this._isSupport) {
      return null
    }

    if (!key) {
      console.error('missing key')
      return null
    }

    const entityString: string | null = window.localStorage.getItem(key)
    let entity: Entity
    if (entityString) {
      entity = JSON.parse(entityString)
    } else {
      return null
    }
    //没有设置过期时间, 直接返回值
    if (!entity.expired_second) return entity.value

    // 过期, 删除存储, 返回 null
    if (ZStorage.__isExpired(entity)) {
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
  remove (key?: string) {
    if (!this._isSupport) {
      return null
    }
    if (!key) {
      console.error('missing key')
      return null
    }
    window.localStorage.removeItem(key)
    return true
  }

  /**
   * 清空存储
   */
  clear () {
    if (!this._isSupport) {
      return null
    }
    window.localStorage.clear() 
    return true
  }
}

export default new ZStorage()