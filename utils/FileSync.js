// It's inspired by Lowdb

const fs = require('fs')
const AesTool = require('./aes')

// 兼容Electron
try {
  if(!('undefined' === typeof window)) {
    fs = window.require('fs')
  }
} catch (error) {}

const readFile = fs.readFileSync // 同步读取文件
const writeFile = fs.writeFileSync // 同步写入文件

class FileSync {
  /**
   * 构造器
   * @param {string} filePath 文件路径
   * @param {string} key aes的key
   * @param {string} iv aes的iv
   */
  constructor(filePath, key, iv) {
    this.defaultValue = {} // 设置默认值, 当文件不存在的时候, 创建文件并填入
    this.path = filePath // 文件存放目录地址
    this.aes = new AesTool(key, iv)
  }

  /**
   * 读取
   * @return {String} 文件内容
   */
  read() {
    // fs.exists() 是弃用的，但 fs.existsSync() 不是弃用的 
    // http://nodejs.cn/api/fs.html#fs_fs_existssync_path
    if (fs.existsSync(this.path)) {
      try {
        // 按照utf8读取文件内容, 并去除前后空格
        const data = readFile(this.path, 'utf-8').trim()
        // 如果文件内容为空, 则返回默认值
        const decryptionData = this.aes.decryption(data)
        return decryptionData ? JSON.parse(decryptionData) : this.defaultValue
      } catch (e) {
        // 内容不是JSON
        if (e instanceof SyntaxError) {
          e.message = `Malformed JSON in file: ${this.path}\n${e.message}`
        }
        throw e
      }
    } else {
      // 没有文件, 就创建文件, 并且写入默认值
      const encryptionData = this.aes.encryption(JSON.stringify(this.defaultValue))
      writeFile(this.path, encryptionData)
      return this.defaultValue
    }
  }

  /**
   * 写入
   * @param {String} data 文件值
   */
  write(data) {
    const encryptionData = this.aes.encryption(JSON.stringify(data))
    return writeFile(this.path, encryptionData)
  }
}

module.exports = FileSync