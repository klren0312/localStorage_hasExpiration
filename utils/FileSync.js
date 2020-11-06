// It's inspired by Lowdb

const fs = require('fs')

const readFile = fs.readFileSync
const writeFile = fs.writeFileSync

class FileSync {
  constructor(filePath) {
    this.defaultValue = {}
    this.path = filePath
  }
  read() {
    // fs.exists is deprecated but not fs.existsSync
    if (fs.existsSync(this.path)) {
      // Read database
      try {
        const data = readFile(this.path, 'utf-8').trim()
        // Handle blank file
        return data ? JSON.parse(data) : this.defaultValue
      } catch (e) {
        if (e instanceof SyntaxError) {
          e.message = `Malformed JSON in file: ${this.path}\n${e.message}`
        }
        throw e
      }
    } else {
      // Initialize
      writeFile(this.path, JSON.stringify(this.defaultValue))
      return this.defaultValue
    }
  }

  write(data) {
    return writeFile(this.path, JSON.stringify(data))
  }
}

module.exports = FileSync