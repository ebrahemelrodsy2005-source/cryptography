async function generateHash() {

    let text = document.getElementById("inputText").value;

    if (!text) {
        document.getElementById("result").innerText =
            "Please enter text";
        return;
    }

    try {
        let encoder = new TextEncoder();
        let data = encoder.encode(text);

        let hashBuffer = await crypto.subtle.digest("SHA-256", data);

        let hashArray = Array.from(new Uint8Array(hashBuffer));

        let hashHex = hashArray
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");

        document.getElementById("result").innerText =
            "🔐 SHA-256 Hash:\n" + hashHex;

    } catch (e) {
        document.getElementById("result").innerText =
            "Error generating hash";
    }
}