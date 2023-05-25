import CryptoJS from 'crypto-js';

export const getPasswordHashResponse = (password) => {
  var enc = CryptoJS.AES.encrypt(password, 'secretpassphrase');
  return enc.toString();
};

export const validatePassword = (enc, password) => {
  var decryptedPassword = CryptoJS.AES.decrypt(
    enc,
    'secretpassphrase'
  ).toString(CryptoJS.enc.Utf8);

  if (decryptedPassword === password) {
    return true;
  }
  return false;
};
