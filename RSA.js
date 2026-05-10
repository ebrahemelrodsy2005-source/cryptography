function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

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

function modInverse(e, phi) {
    for (let d = 1; d < phi; d++) {
        if ((d * e) % phi === 1) {
            return d;
        }
    }
    return null;
}
function isPrime(num) {
    if (num < 2) return false;

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
}

function rsaEncrypt() {

    let input = document.getElementById("inputText").value.trim();
    let p = parseInt(document.getElementById("p").value);
    let q = parseInt(document.getElementById("q").value);
    let e = parseInt(document.getElementById("e").value);

    if (!input) {
        showResult("Enter input");
        return;
    }
    if (isNaN(p) || isNaN(q) || isNaN(e)) {
        showResult("Fill all fields");
        return;
    }
    if (!isPrime(p)) {
        showResult("p must be prime");
        return;
    }
    if (!isPrime(q)) {
        showResult("q must be prime");
        return;
    }
    if (p === q) {
        showResult("p and q must be different");
        return;
    }
    let n = p * q;
    let phi = (p - 1) * (q - 1);
    if (e <= 1 || e >= phi) {
        showResult("e must be between 1 and φ(n)");
        return;
    }
    if (gcd(e, phi) !== 1) {
        showResult("e must be coprime with φ(n)");
        return;
    }
    let d = modInverse(e, phi);
    if (d === null) {
        showResult("Cannot calculate d");
        return;
    }
    if (!isNaN(input) && !input.includes(" ")) {
        let m = parseInt(input);
        if (m >= n) {
            showResult("Message must be smaller than n");
            return;
        }
        let c = modPow(m, e, n);
        showResult(
            "Cipher: " + c +
            "\n\nn = " + n +
            "\nφ(n) = " + phi +
            "\nd = " + d
        );
        return;
    }
    input = input.toUpperCase();
    let result = [];
    for (let char of input) {
        if (char >= 'A' && char <= 'Z') {
            let m = char.charCodeAt(0) - 65;
            if (m >= n) {
                showResult("n is too small for letters");
                return;
            }
            let c = modPow(m, e, n);
            result.push(c);
        } else {
            result.push(char);
        }
    }
    showResult(
        "Cipher: " + result.join(" ") +
        "\n\nn = " + n +
        "\nφ(n) = " + phi +
        "\nd = " + d
    );
}
function rsaDecrypt() {
    let input = document.getElementById("inputText").value.trim();
    let p = parseInt(document.getElementById("p").value);
    let q = parseInt(document.getElementById("q").value);
    let e = parseInt(document.getElementById("e").value);
    if (!isPrime(p) || !isPrime(q)) {
        showResult("p and q must be prime");
        return;
    }
    let n = p * q;
    let phi = (p - 1) * (q - 1);
    if (gcd(e, phi) !== 1) {
        showResult("e must be coprime with φ(n)");
        return;
    }
    let d = modInverse(e, phi);
    if (!input) {
        showResult("Enter cipher text");
        return;
    }
    if (!input.includes(" ")) {
        let c = parseInt(input);
        let m = modPow(c, d, n);
        showResult(
            "Plaintext: " + m +
            "\n\nd = " + d
        );
        return;
    }
    let parts = input.split(" ");
    let result = "";
    for (let p of parts) {
        if (!isNaN(p)) {
            let m = modPow(parseInt(p), d, n);
            result += String.fromCharCode(m + 65);
        } else {

            result += p;
        }
    }
    showResult(
        "Plaintext: " + result +
        "\n\nd = " + d
    );
}
function showResult(text) {
    document.getElementById("result").innerText = text;
}