        function vigenereEncrypt() {
            const text = document.getElementById('inputText').value;
            const keyword = document.getElementById('keyword').value;
            const result = vigenereCipher(text, keyword, true);
            document.getElementById('result').textContent = result;
        }

        function vigenereDecrypt() {
            const text = document.getElementById('inputText').value;
            const keyword = document.getElementById('keyword').value;
            const result = vigenereCipher(text, keyword, false);
            document.getElementById('result').textContent = result;
        }

        function vigenereCipher(text, keyword, encrypt) {
            text = text.toUpperCase();
            keyword = keyword.toUpperCase().replace(/[^A-Z]/g, '');
            if (!keyword) return text;
            
            let keyStream = '';
            let j = 0;
            for (let i = 0; i < text.length; i++) {
                if (text[i].match(/[A-Z]/)) {
                    keyStream += keyword[j % keyword.length];
                    j++;
                } else {
                    keyStream += ' ';
                }
            }
            
            return text.split('').map((char, i) => {
                if (char.match(/[A-Z]/)) {
                    const p = char.charCodeAt(0) - 65;
                    const k = keyStream.charCodeAt(i) - 65;
                    const shift = encrypt ? k : -k;
                    return String.fromCharCode(((p + shift + 26) % 26) + 65);
                }
                return char;
            }).join('');
        }