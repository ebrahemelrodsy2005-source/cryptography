function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}
function mod_inverse(a, m) {
    for (let i = 1; i < m; i++) {
        if ((a * i) % m === 1) return i;
    }
    return null;
}
function affineCipher(text, a, b, encrypt = true) {

    if (gcd(a, 26) !== 1) {
        return "Error: 'a' must be coprime with 26";
    }
    let result = "";
    let aInv = mod_inverse(a, 26);
    if (!encrypt && aInv === null) {
        return "Error: no inverse for a";
    }
    for (let char of text) {
        if (/[a-zA-Z]/.test(char)) {

            let isUpper = char === char.toUpperCase();
            let x = char.toUpperCase().charCodeAt(0) - 65;

            let y = encrypt
                ? (a * x + b) % 26
                : (aInv * (x - b + 26)) % 26;

            let newChar = String.fromCharCode(y + 65);

            result += isUpper ? newChar : newChar.toLowerCase();

        } else {
            result += char;
        }
   }
    return result;
}
function affineEncrypt() {
    const text = document.getElementById("inputText").value;
    const a = parseInt(document.getElementById("a").value);
    const b = parseInt(document.getElementById("b").value);

    document.getElementById("result").textContent =
        affineCipher(text, a, b, true);
}
function affineDecrypt() {
    const text = document.getElementById("inputText").value;
    const a = parseInt(document.getElementById("a").value);
    const b = parseInt(document.getElementById("b").value);

    document.getElementById("result").textContent =
        affineCipher(text, a, b, false);}