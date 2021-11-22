import cryptoJs from "crypto-js";
import SecureStorage from "secure-web-storage";

 
let SECRET_KEY = process.env.EWS_KEY;


let _initSecSore = (localStorage, SCK) => new SecureStorage(localStorage, {
    hash: function hash(key) {
        
        key = cryptoJs.SHA256(key, SCK);
 
        return key.toString();
    },
    encrypt: function encrypt(data) {
        data = cryptoJs.AES.encrypt(data, SCK);
 
        data = data.toString();
 
        return data;
    },
    decrypt: function decrypt(data) {
        data = cryptoJs.AES.decrypt(data, SCK);
 
        data = data.toString(cryptoJs.enc.Utf8);
 
        return data;
    }
});
 
export default _initSecSore