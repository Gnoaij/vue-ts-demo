import CryptoJS from 'crypto-js'

class Secret {
  private key: string

  constructor(key?: string) {
    this.key = key ?? ''
  }

  encrypt(message: string) {
    return CryptoJS.AES.encrypt(message, this.key).toString()
  }

  decrypt(ciphertext: string) {
    return CryptoJS.AES.decrypt(ciphertext, this.key).toString(CryptoJS.enc.Utf8)
  }
}

export default new Secret('secret key')
