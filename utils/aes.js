const crypto = require('crypto')

class AesTool {
  constructor (key, iv) {
    this.key = key ? key : 'localstorage1234'
    this.iv = iv ? iv : '1012132343363708'
  }

  /**
   * AES_128_CBC 加密 
   * 128位 
   * return base64
   */
  encryption(data) {
    var cipherChunks = [];
    var cipher = crypto.createCipheriv('aes-128-cbc', this.key, this.iv);
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(data, 'utf8', 'base64'));
    cipherChunks.push(cipher.final('base64'));
    return cipherChunks.join('');
  }


  /**
  * 解密
  * return utf8
  */
  decryption(data){
    var cipherChunks = [];
    var decipher = crypto.createDecipheriv('aes-128-cbc', this.key, this.iv);
    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(data, 'base64', 'utf8'));
    cipherChunks.push(decipher.final('utf8'));
    return cipherChunks.join('');
  }
}

module.exports = AesTool