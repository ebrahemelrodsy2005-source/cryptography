let currentSize = 2;
function updateMatrixInputs() {
    let currentSize = parseInt(document.getElementById('matrixSize').value);
    const container = document.getElementById('matrixInputs');

    container.innerHTML = '';
    container.style.display = "grid";
    container.style.gridTemplateColumns = `repeat(${currentSize}, 70px)`;
    container.style.gap = "10px";

    for (let i = 0; i < currentSize; i++) {
        for (let j = 0; j < currentSize; j++) {

            const input = document.createElement('input');
            input.type = 'number';
            input.min = '0';
            input.max = '25';
            input.id = `k${i+1}${j+1}`;
            input.value = Math.floor(Math.random() * 26);

            container.appendChild(input);
        }
    }
}
function getMatrix() {
    let matrix = [];
    for (let i = 0; i < currentSize; i++) {
        matrix[i] = [];
        for (let j = 0; j < currentSize; j++) {
            matrix[i][j] = parseInt(document.getElementById(`k${i+1}${j+1}`).value);
        }
    }
    return matrix;
}
function hillEncrypt() {
    const text = cleanText();
    const n = currentSize;

    if (text.length % n !== 0) {
        alert(`Text length must be multiple of ${n}`);
        return;
    }

    const result = hillCipher(text, getMatrix());
    document.getElementById('result').textContent = result;
}
function hillDecrypt() {
    const text = cleanText();
    const key = getMatrix();

    const inv = invertMatrix(key);
    if (!inv) {
        alert("Matrix not invertible!");
        return;
    }

    const result = hillCipher(text, inv);
    document.getElementById('result').textContent = result;
    showMatrix(inv);
}
function cleanText() {
    return document.getElementById('inputText')
        .value.toUpperCase().replace(/[^A-Z]/g, '');
}
function hillCipher(text, key) {
    const n = key.length;
    let nums = text.split('').map(c => c.charCodeAt(0) - 65);

    while (nums.length % n !== 0) nums.push(0);
    let result = [];
    for (let i = 0; i < nums.length; i += n) {
        let block = nums.slice(i, i + n);

        for (let r = 0; r < n; r++) {
            let sum = 0;
            for (let c = 0; c < n; c++) {
                sum += key[r][c] * block[c];
            }
            result.push(sum % 26);
        }
    }
    return result.map(x => String.fromCharCode(x + 65)).join('');
}
function modInverse(a, m) {
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    return null;
}
function determinant(m) {
    if (m.length === 2)
        return (m[0][0]*m[1][1] - m[0][1]*m[1][0]) % 26;
    let det = 0;
    for (let i = 0; i < 3; i++) {
        let sub = [];
        for (let r = 1; r < 3; r++) {
            let row = [];
            for (let c = 0; c < 3; c++) {
                if (c !== i) row.push(m[r][c]);
            }
            sub.push(row);
        }
        det += m[0][i] * determinant(sub) * (i % 2 === 0 ? 1 : -1);
    }
    return ((det % 26) + 26) % 26;
}
function invertMatrix(m) {
    const n = m.length;
    const det = determinant(m);
    const detInv = modInverse(det, 26);

    if (detInv === null) return null;
    let adj = [];
    if (n === 2) {
        adj = [
            [m[1][1], -m[0][1]],
            [-m[1][0], m[0][0]]
        ];
    } else {
        adj = Array(3).fill().map(() => Array(3).fill(0));
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                let sub = [];
                for (let r = 0; r < 3; r++) {
                    if (r === i) continue;
                    let row = [];
                    for (let c = 0; c < 3; c++) {
                        if (c === j) continue;
                        row.push(m[r][c]);
                    }
                    sub.push(row);
                }
                let sign = ((i + j) % 2 === 0) ? 1 : -1;
                adj[j][i] = sign * determinant(sub); 
            }
        }
    }
    let inv = [];
    for (let i = 0; i < n; i++) {
        inv[i] = [];
        for (let j = 0; j < n; j++) {
            inv[i][j] = ((adj[i][j] * detInv) % 26 + 26) % 26;
        }
    }
    return inv;
}
function showMatrix(m) {
    let txt = "Inverse Matrix:\n";
    m.forEach(row => {
        txt += row.join(" ") + "\n";
    });
    document.getElementById('matrixDet').innerText = txt;
    document.getElementById('matrixDet').style.display = "block";

}
updateMatrixInputs();