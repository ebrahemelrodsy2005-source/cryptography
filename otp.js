        function otpEncrypt() {
            const text = document.getElementById('inputText').value.toUpperCase().replace(/[^A-Z]/g, '');
            const key = document.getElementById('key').value.toUpperCase().replace(/[^A-Z]/g, '');
            if (text.length !== key.length) {
                alert('Text and key must be same length!');
                return;
            }
            const result = otpCipher(text, key, true);
            document.getElementById('result').textContent = result;
        }
        function otpDecrypt() {
            const text = document.getElementById('inputText').value.toUpperCase().replace(/[^A-Z]/g, '');
            const key = document.getElementById('key').value.toUpperCase().replace(/[^A-Z]/g, '');
            if (text.length !== key.length) {
                alert('Text and key must be same length!');
                return;
            }
            const result = otpCipher(text, key, false);
            document.getElementById('result').textContent = result;
        }
        function otpCipher(text, key, encrypt) {
            return text.split('').map((char, i) => {
                const p = char.charCodeAt(0) - 65;
                const k = key.charCodeAt(i) - 65;
                const shift = encrypt ? k : -k;
                return String.fromCharCode(((p + shift + 26) % 26) + 65);
            }).join('');
        }
        function generateKey() {
            const text = document.getElementById('inputText').value.replace(/[^A-Z]/g, '').toUpperCase();
            let key = '';
            for (let i = 0; i < text.length; i++) {
                key += String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
            document.getElementById('key').value = key;
        }