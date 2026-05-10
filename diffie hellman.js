function modPow(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }

    return result;
}
function caesar(text, shift, isEncrypt) {
    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const start = char.toUpperCase() === char ? 65 : 97;
            const code = ((char.charCodeAt(0) - start + shift + 26) % 26) + start;
            return String.fromCharCode(code);
        }
        return char;
    }).join('');
}
let sharedKey = 0;

function railFenceEncrypt(text, rails) {
    if (rails <= 1) return text;
    let fence = Array.from({ length: rails }, () => []);
    let rail = 0;
    let dir = 1;

    for (let char of text) {
        fence[rail].push(char);
        rail += dir;
        if (rail === rails - 1 || rail === 0) {
            dir *= -1;
        }
    }
    return fence.flat().join('');
}
function railFenceDecrypt(cipher, rails) {

    if (rails <= 1) return cipher;
    let pattern = [];
    let rail = 0;
    let dir = 1;
    for (let i = 0; i < cipher.length; i++) {
        pattern.push(rail);
        rail += dir;
        if (rail === rails - 1 || rail === 0) {
            dir *= -1;
        }
    }
    let fence = Array.from({ length: rails }, () => []);
    let index = 0;
    for (let r = 0; r < rails; r++) {
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] === r) {
                fence[r].push(cipher[index++]);
            }
        }
    }
    let result = "";
    let railIndexes = Array(rails).fill(0);

    for (let r of pattern) {
        result += fence[r][railIndexes[r]++];
    }
    return result;
}
function generateDH() {
    let p = parseInt(document.getElementById("p").value);
    let g = parseInt(document.getElementById("g").value);
    let a = parseInt(document.getElementById("a").value);
    let b = parseInt(document.getElementById("b").value);
    let A = modPow(g, a, p);
    let B = modPow(g, b, p);
    let keyAlice = modPow(B, a, p);
    let keyBob = modPow(A, b, p);
    sharedKey = keyAlice; 
    document.getElementById("result").innerText =
        "Alice Public (A): " + A + "\n" +
        "Bob Public (B): " + B + "\n\n" +
        "Shared Key: " + sharedKey;
}

function encryptWithKey() {

    if (!sharedKey) {
        alert("Generate key first!");
        return;
    }
    let msg = document.getElementById("message").value;
    let type = document.getElementById("cipherType").value;
    let result = "";
    if (type === "rail" && sharedKey < 2) {
    alert("Shared key must be at least 2 for Rail Fence");
    return;
}
    if (type === "caesar") {
        result = caesar(msg, sharedKey, true);
    } else if (type === "rail") {
        let rails = sharedKey;
        result = railFenceEncrypt(msg, rails);
    }
    document.getElementById("msgResult").innerText =
        "Encrypted: " + result;
}
function decryptWithKey() {

    if (!sharedKey) {
        alert("Generate key first!");
        return;
    }
    let msg = document.getElementById("message").value;
    let type = document.getElementById("cipherType").value;
    let result = "";
    if (type === "rail" && sharedKey < 2) {
    alert("Shared key must be at least 2 for Rail Fence");
    return;
}
    if (type === "caesar") {
        result = caesar(msg, -sharedKey, false);
    } else if (type === "rail") {
        let rails = sharedKey;
        result = railFenceDecrypt(msg, rails);
    }
    document.getElementById("msgResult").innerText =
        "Decrypted: " + result;
}