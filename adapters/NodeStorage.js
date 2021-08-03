const path = require('path')
const FileSync = require('../utils/FileSync')

class NodeStorage {

  /**
   * 构造器
   * @param {String} cusPath 存储文件地址
   * @param {String} key aes的key
   * @param {String} iv aes的iv
   */
  constructor (cusPath, key, iv) {
    this.data = {}
    this.dpath = cusPath ? cusPath : path.resolve('LOCALDATA.json')
    this.FileCtrl = new FileSync(this.dpath, key, iv)
    this.data = this.FileCtrl.read()
  }

  /**
   * 存储键值
   * @param {String} key 键
   * @param {String} value 值
   */
  setItem (key, value) {
    this.data = this.FileCtrl.read()
    this.data[key] = value
    this.FileCtrl.write(this.data)
  }

  /**
   * 获取指定键的值
   * @param {String} key 键
   */
  getItem (key) {
    return this.data[key]
  }

  /**
   * 移除指定键的值
   * @param {String} key 键
   */
  removeItem (key) {
    this.data = this.FileCtrl.read()
    delete this.data[key]
    this.FileCtrl.write(this.data)
  }

  /**
   * 清空键
   */
  clear () {
    this.data = {}
    this.FileCtrl.write(this.data)
  }
}

module.exports = NodeStorage
