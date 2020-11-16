const path = require('path')
const FileSync = require('../utils/FileSync')

class NodeStorage {

  /**
   * 构造器
   * @param {String} cusPath 存储文件地址
   */
  constructor (cusPath) {
    this.data = {}
    this.dpath = cusPath ? cusPath : path.resolve('LOCALDATA.json')
    this.FileCtrl = new FileSync(this.dpath)
    this.data = this.FileCtrl.read()
  }

  /**
   * 存储键值
   * @param {String} key 键
   * @param {String} value 值
   */
  setItem (key, value) {
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
