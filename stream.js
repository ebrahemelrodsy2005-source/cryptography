function xorToBinary(text, key) {
    let result = "";
    key = key.toUpperCase();
    text = text.toUpperCase();

    for (let i = 0; i < text.length; i++) {

        let t = text.charCodeAt(i);
        let k = key.charCodeAt(i % key.length);

        let x = t ^ k;

        // تحويل ل Binary (8-bit)
        result += x.toString(2).padStart(8, "0") + " ";
    }

    return result.trim();
}
function binaryToXor(binaryText, key) {
    let result = "";
    key = key.toUpperCase();

    let parts = binaryText.trim().split(" ");

    for (let i = 0; i < parts.length; i++) {

        let byte = parseInt(parts[i], 2);  // Binary → number
        let k = key.charCodeAt(i % key.length);

        result += String.fromCharCode(byte ^ k);
    }

    return result;
}
function streamEncrypt() {
    let text = document.getElementById("inputText").value;
    let key = document.getElementById("key").value;

    if (!text || !key) {
        alert("Enter text and key!");
        return;
    }

    let encrypted = xorToBinary(text, key);

    document.getElementById("result").innerText =
        "Ciphertext (Binary): " + encrypted;
}
function streamDecrypt() {
    let text = document.getElementById("inputText").value;
    let key = document.getElementById("key").value;

    if (!text || !key) {
        alert("Enter ciphertext and key!");
        return;
    }

    let decrypted = binaryToXor(text, key);

    document.getElementById("result").innerText =
        "Plaintext: " + decrypted;
}