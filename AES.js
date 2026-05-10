function textToBytes(text) {
    return new TextEncoder().encode(text);
}

function bytesToText(bytes) {
    return new TextDecoder().decode(bytes);
}


function toHex(bytes) {
    return Array.from(bytes)
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

function fromHex(hex) {
    if (hex.length % 2 !== 0) throw "Invalid HEX";

    let bytes = new Uint8Array(hex.length / 2);

    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }

    return bytes;
}


async function getKey(password) {
    let keyMaterial = await crypto.subtle.importKey(
        "raw",
        textToBytes(password),
        "PBKDF2",
        false,
        ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: textToBytes("salt123"),
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        {
            name: "AES-GCM",
            length: 256
        },
        false,
        ["encrypt", "decrypt"]
    );
}


async function aesEncrypt() {
    let text = document.getElementById("inputText").value;
    let password = document.getElementById("key").value;

    let iv = crypto.getRandomValues(new Uint8Array(12));
    let key = await getKey(password);

    let encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        textToBytes(text)
    );

    let result = new Uint8Array(iv.length + encrypted.byteLength);
    result.set(iv);
    result.set(new Uint8Array(encrypted), iv.length);

    document.getElementById("result").innerText =
        "HEX:\n" + toHex(result);
}

async function aesDecrypt() {
    let input = document.getElementById("inputText").value.trim();
    let password = document.getElementById("key").value;

    try {
        let data = fromHex(input);

        let iv = data.slice(0, 12);
        let encrypted = data.slice(12);

        let key = await getKey(password);

        let decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv },
            key,
            encrypted
        );

        document.getElementById("result").innerText =
            "Text:\n" + bytesToText(decrypted);

    } catch (e) {
        document.getElementById("result").innerText =
            "Error: wrong password or invalid HEX";
    }
}
