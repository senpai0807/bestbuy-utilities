import forge from 'node-forge';
import { 
    paymentKey,
    xGridKey,
    emailKey,
    activityKey,
    xGridKeyId,
    emailKeyId,
    activityKeyId
} from './constants.js';

// ------ Payment Encryption ------ \\
function payment() {
    const data = JSON.stringify({
        number: "5555555555554444"
    });

    const encryptor = forge.pki.publicKeyFromPem(paymentKey);
    const encryptedData = encryptor.encrypt(data, "RSA-OAEP", {
        md: forge.md.sha1.create(),
        mgf1: {
            md: forge.md.sha1.create()
        }
    });

    const base64EncodedData = forge.util.encode64(encryptedData);
    return [base64EncodedData, "3", "735818052", "5555555555554444"].join(":");
};

// ------ X-Grid Header Encryption ------ \\
function xGrid() {
    const data = JSON.stringify({
        "bP": "7ba1187f02e78f4acbf1b9063a077077ee9d9d2a", // Plugins Navigator Hash
        "cH": "287241f51c65ab75f41aa78f59dc5b59a112e5e6", // Canvas Navigator Hash
        "wH": "d19be91054db6bf5eb5d8676d6e16971c2362852", // WebGL Navigator Hash
        "p": "Win32", // Platform
        "os": "Windows", // Operating System
        "cD": 24, // Color Depth
        "nC": Math.floor(Math.random() * 24) + 1, // Hardware Concurrency
        "tS": false // Touchscreen
    });

    const encryptor = forge.pki.publicKeyFromPem(xGridKey);
    const encryptedData = encryptor.encrypt(data, "RSA-OAEP", {
        md: forge.md.sha1.create(),
        mgf1: {
            md: forge.md.sha1.create()
        }
    });

    const base64EncodedData = forge.util.encode64(encryptedData);
    return ["1", xGridKeyId, base64EncodedData].join(":");
};

// ------ Email Encryption ------ \\
function email() {
    const data = JSON.stringify({
        "email": "johndoe@gmail.com"
    });

    const encryptor = forge.pki.publicKeyFromPem(emailKey);
    const encryptedData = encryptor.encrypt(data, "RSA-OAEP", {
        md: forge.md.sha1.create(),
        mgf1: {
            md: forge.md.sha1.create()
        }
    });

    const base64EncodedData = forge.util.encode64(encryptedData);
    return ["1", emailKeyId, base64EncodedData].join(":");
};

// ------ Activity Encryption ------ \\
function activity() {
    const data = JSON.stringify({
        "mouseMoved": true,
        "keyboardUsed": true,
        "fieldReceivedInput": true,
        "fieldReceivedFocus": true,
        "timestamp": (new Date).toISOString(),
        "email": "johndoe@gmail.com"
    });

    const encryptor = forge.pki.publicKeyFromPem(activityKey);
    const encryptedData = encryptor.encrypt(data, "RSA-OAEP", {
        md: forge.md.sha1.create(),
        mgf1: {
            md: forge.md.sha1.create()
        }
    });

    const base64EncodedData = forge.util.encode64(encryptedData);
    return ["1", activityKeyId, base64EncodedData].join(":")
};

// ------ Info Encryption ------ \\
function info() {
    const data = JSON.stringify({
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
    });

    const encryptor = forge.pki.publicKeyFromPem(activityKey);
    const encryptedData = encryptor.encrypt(data, "RSA-OAEP", {
        md: forge.md.sha1.create(),
        mgf1: {
            md: forge.md.sha1.create()
        }
    });

    const base64EncodedData = forge.util.encode64(encryptedData);
    return ["1", activityKeyId, base64EncodedData].join(":")
};