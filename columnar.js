function encrypt() {
    let text = document.getElementById("inputText").value;
    let key = document.getElementById("key").value.toUpperCase();

    let cols = key.length;
    let rows = Math.ceil(text.length / cols);

    let totalLen = rows * cols;

    if (text.length < totalLen) {
        text = text.padEnd(totalLen, "X");
    }

    let grid = [];
    let index = 0;

    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i][j] = text[index++];
        }
    }

    let order = [...key]
        .map((c, i) => ({ c, i }))
        .sort((a, b) => a.c.localeCompare(b.c));

    let result = "";

    for (let k of order) {
        for (let i = 0; i < rows; i++) {
            result += grid[i][k.i];
        }
    }

    document.getElementById("result").innerText =
        "Ciphertext: " + result;
}
function decrypt() {
    let text = document.getElementById("inputText").value;
    let key = document.getElementById("key").value.toUpperCase();

    let cols = key.length;
    let rows = Math.ceil(text.length / cols);

    let grid = Array.from({ length: rows }, () =>
        Array(cols).fill("")
    );

    let order = [...key]
        .map((c, i) => ({ c, i }))
        .sort((a, b) => a.c.localeCompare(b.c));

    let index = 0;

    for (let k of order) {
        for (let i = 0; i < rows; i++) {
            grid[i][k.i] = text[index++];
        }
    }

    let result = "";

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result += grid[i][j];
        }
    }

    //remove padding x 
    while (result.length > 0 && result.endsWith("X")) {
        result = result.slice(0, -1);
    }

    document.getElementById("result").innerText =
        "Plaintext: " + result;
}