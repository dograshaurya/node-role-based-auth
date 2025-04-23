const dotenv = require("dotenv");
dotenv.config();

// utils/encryptionUtils.js
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// Define a secret key for encryption. This should be stored securely.
const SECRET_KEY = (process.env.SECRET_KEY || 'your-secret-key').padEnd(32, '0').slice(0, 32);// Replace this with a secure key.
const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16; // For AES, this is typically 16 bytes.

const FIXED_IV = crypto.createHash('sha256').update('fixed-iv').digest().slice(0, 16); // Fixed IV

const encode = (data) => {
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), FIXED_IV);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
};

const decode = (encryptedData) => {
    const encryptedText = Buffer.from(encryptedData, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), FIXED_IV);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

// Hash password using bcrypt
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

module.exports = { encode, decode, hashPassword };
