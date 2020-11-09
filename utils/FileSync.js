// It's inspired by Lowdb

const fs = require('fs')

const readFile = fs.readFileSync // 同步读取文件
const writeFile = fs.writeFileSync // 同步写入文件

class FileSync {
  constructor(filePath) {
    this.defaultValue = {} // 设置默认值, 当文件不存在的时候, 创建文件并填入
    this.path = filePath // 文件存放目录地址
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
        return data ? JSON.parse(data) : this.defaultValue
      } catch (e) {
        // 内容不是JSON
        if (e instanceof SyntaxError) {
          e.message = `Malformed JSON in file: ${this.path}\n${e.message}`
        }
        throw e
      }
    } else {
      // 没有文件, 就创建文件, 并且写入默认值
      writeFile(this.path, JSON.stringify(this.defaultValue))
      return this.defaultValue
    }
  }

  /**
   * 写入
   * @param {String} data 文件值
   */
  write(data) {
    return writeFile(this.path, JSON.stringify(data))
  }
}

module.exports = FileSync