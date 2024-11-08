import CryptoJS from 'crypto-js';

const key = 'kYp3s6v9y$BH@MbQeThWmZq4t7w!z';

export class CryptUtil {
  private static _instance: CryptUtil;
  public static getInstance = (): CryptUtil => {
    if (this._instance === undefined) this._instance = new CryptUtil();
    return this._instance;
  };
  private constructor() {}

  getEncryptedData = (msg: string) => {
    try {
      const encryptedText = CryptoJS.AES.encrypt(
        JSON.stringify(msg),
        key,
      ).toString();
      return encryptedText;
    } catch (error) {
      return msg;
    }
  };

  getDecryptedData = (msg: string) => {
    try {
      const plainText = CryptoJS.AES.decrypt(msg, key);
      const decryptedText = JSON.parse(plainText.toString(CryptoJS.enc.Utf8));
      return decryptedText;
    } catch (error) {
      return msg;
    }
  };
}
