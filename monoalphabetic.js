    function monoEncrypt() {
        const text = document.getElementById('inputText').value;
        const keyStr = document.getElementById('substKey').value;
        let substTable;
        try {
            substTable = JSON.parse(keyStr);
        } catch(e) {
            alert('Invalid JSON key!');
            return;
        }
        const result = monoCipher(text, substTable, true);
        document.getElementById('result').textContent = result;
    }

    function monoDecrypt() {
        const text = document.getElementById('inputText').value;
        const keyStr = document.getElementById('substKey').value;
        let substTable;
        try {
            substTable = JSON.parse(keyStr);
            const invTable = {};
            for (let [k, v] of Object.entries(substTable)) {
                invTable[v] = k;
            }
            const result = monoCipher(text, invTable, true);
            document.getElementById('result').textContent = result;
        } catch(e) {
            alert('Invalid JSON key!');
        }
    }

    function monoCipher(text, table, encrypt) {
        return text.toUpperCase().split('').map(char => {
            if (char.match(/[A-Z]/)) {
                return table[char] || char;
            }
            return char;
        }).join('');
    }