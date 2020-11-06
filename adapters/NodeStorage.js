const path = require('path')
const FileSync = require('../utils/FileSync')
const FileCtrl = new FileSync(path.resolve('LOCALDATA.json'))
class NodeStorage {

  /**
   * 构造器
   * @param {String} cusPath 存储文件地址
   */
  constructor (cusPath) {
    this.data = {}
    this.path = cusPath ? cusPath : 
    this.data = FileCtrl.read()
  }

  /**
   * 存储键值
   * @param {String} key 键
   * @param {String} value 值
   */
  setItem (key, value) {
    this.data[key] = value
    FileCtrl.write(this.data)
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
    FileCtrl.write(this.data)
  }

  /**
   * 清空键
   */
  clear () {
    this.data = {}
    FileCtrl.write(this.data)
  }
}

module.exports = NodeStorage
