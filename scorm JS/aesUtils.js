var AesUtils = {
    encrypt: function (plainText, passphrase) {
        var key = CryptoJS.lib.WordArray.random(256 / 8);
        var iv = CryptoJS.lib.WordArray.random(256 / 16);
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), passphrase, key,
        {
            keySize: 256,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    },
    decrypt: function (encrypted, passphrase) {
        var decrypted = CryptoJS.AES.decrypt(encrypted, passphrase);
        return decrypted.toString(CryptoJS.enc.Utf8)
    }
}