function caesarEncrypt() {
            const text = document.getElementById('inputText').value;
            const shift = parseInt(document.getElementById('shift').value);
            const result = caesarCipher(text, shift, true);
            document.getElementById('result').textContent = result;
        }

function caesarDecrypt() {
    const text = document.getElementById('inputText').value;
    const shift = parseInt(document.getElementById('shift').value);
    const result = caesarCipher(text, -shift, false);
    document.getElementById('result').textContent = result;
}

function caesarCipher(text, shift, isEncrypt) {
    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const start = char.toUpperCase() === char ? 65 : 97;
            const code = ((char.charCodeAt(0) - start + shift + 26) % 26) + start;
            return String.fromCharCode(code);
        }
        return char;
    }).join('');
}
