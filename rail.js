function encrypt() {
    const text = document.getElementById("inputText").value;
    const key = parseInt(document.getElementById("key").value);

    if (!text || !key) return;

    let rails = Array.from({ length: key }, () => "");

    let row = 0;
    let direction = 1;

    for (let char of text) {

        rails[row] += char; 

        row += direction;

        if (row === 0 || row === key - 1) {
            direction *= -1;
        }
    }

    document.getElementById("result").innerText =
        "Ciphertext: " + rails.join("");
}

function decrypt() {
    const text = document.getElementById("inputText").value;
    const key = parseInt(document.getElementById("key").value);

    if (!text || !key) return;

    let rail = Array.from({ length: key }, () =>
        Array(text.length).fill(null)
    );

    let row = 0;
    let direction = 1;

    for (let i = 0; i < text.length; i++) {
        rail[row][i] = "*";

        row += direction;

        if (row === 0 || row === key - 1) {
            direction *= -1;
        }
    }

    let index = 0;
    for (let i = 0; i < key; i++) {
        for (let j = 0; j < text.length; j++) {
            if (rail[i][j] === "*") {
                rail[i][j] = text[index++];
            }
        }
    }

    // read
    let result = "";
    row = 0;
    direction = 1;

    for (let i = 0; i < text.length; i++) {
        result += rail[row][i];

        row += direction;

        if (row === 0 || row === key - 1) {
            direction *= -1;
        }
    }

    document.getElementById("result").innerText =
        "Plaintext: " + result;
}