let currentMode = "quick";
let clearTimer; // for safe auto-clear


function setMode(mode) {
    currentMode = mode;

    document.getElementById("quickBtn").classList.remove("active");
    document.getElementById("realBtn").classList.remove("active");

    if (mode === "quick") {
        document.getElementById("quickBtn").classList.add("active");
        document.getElementById("modeInfo").innerText =
            "Fun Mode: What most people believe";
    } else {
        document.getElementById("realBtn").classList.add("active");
        document.getElementById("modeInfo").innerText =
            "True Mode: Deep Compatibility";
    }
}

function calculateFlames() {
    let name1 = document.getElementById("name1").value
        .toLowerCase()
        .replace(/[^a-z]/g, "");

    let name2 = document.getElementById("name2").value
        .toLowerCase()
        .replace(/[^a-z]/g, "");

    if (!name1 || !name2) {
        showResult("Enter valid names");
        return;
    }

    let count = getRemainingCount(name1, name2);

    if (count === 0) {
        showResult("Same names 😄");
        return;
    }

    let resultLetter =
        currentMode === "quick"
            ? quickMode(count)
            : realMode(count);

    showResult(getMeaning(resultLetter), name1, name2);
}

function getRemainingCount(name1, name2) {
    let arr1 = name1.split("");
    let arr2 = name2.split("");

    for (let i = 0; i < arr1.length; i++) {
        let index = arr2.indexOf(arr1[i]);
        if (index !== -1) {
            arr1[i] = null;
            arr2[index] = null;
        }
    }

    return (
        arr1.filter(x => x !== null).length +
        arr2.filter(x => x !== null).length
    );
}

function quickMode(count) {
    let flames = "FLAMES";
    let repeated = flames.repeat(Math.ceil(count / flames.length));
    return repeated[count - 1];
}

function realMode(count) {
    let flames = ["F", "L", "A", "M", "E", "S"];
    let index = 0;

    while (flames.length > 1) {
        index = (index + count - 1) % flames.length;
        flames.splice(index, 1);
    }

    return flames[0];
}
function getMeaning(letter) {
    const meanings = {
        F: {
            title: "Friendship 🤝",
            sub: (n1, n2) => `${n1} and ${n2} are better as friends 😬`
        },
        L: {
            title: "Love ❤️",
            sub: (n1, n2) => `${n1}… this could actually go somewhere with ${n2} 👀`
        },
        A: {
            title: "Affection 💖",
            sub: (n1, n2) => `${n1} has a soft corner for ${n2} 💖`
        },
        M: {
            title: "Marriage 💍",
            sub: (n1, n2) => `${n1} and ${n2}… this is dangerously real 😳`
        },
        E: {
            title: "Enemy 😈",
            sub: (n1, n2) => `${n1} and ${n2} should seriously stay away from each other 😈`
        },
        S: {
            title: "Sibling 👨‍👩‍👧",
            sub: (n1, n2) => `${n1} and ${n2}… this is just wrong 😂`
        }
    };
    return meanings[letter];
}

function showResult(data, name1 = "", name2 = "") {
    const result = document.getElementById("shareCard");

    // Handle error cases
if (typeof data === "string") {
    const result = document.getElementById("result");

    if (result) {
        result.innerText = data;
    }

    // 🔥 CLEAR + UNBLOCK USER
    clearTimeout(clearTimer);

    clearTimer = setTimeout(() => {
        const input1 = document.getElementById("name1");
        const input2 = document.getElementById("name2");

        input1.value = "";
        input2.value = "";

        input1.disabled = false;
        input2.disabled = false;

        input1.focus();
    }, 1500);

    return;
}

    // Capitalize names
    const formatName = (name) =>
        name.charAt(0).toUpperCase() + name.slice(1);

    const n1 = formatName(name1);
    const n2 = formatName(name2);

    document.getElementById("shareNames").innerText = `${n1} and ${n2}`;
    document.getElementById("shareResult").innerText = data.title;
    document.getElementById("shareSub").innerText = data.sub(n1, n2);


 //   result.innerHTML = `
  //      <div class="result-title">${data.title}</div>
   //     <div class="result-sub">
   //         ${data.sub(n1, n2)}
   //     </div>
   //     <div class="result-hook">Send this to them and see their reaction 🫨</div>
 //   `;

    // Animation
    result.classList.add("pulse");
    setTimeout(() => result.classList.remove("pulse"), 500);

    // Safe auto-clear
    clearTimeout(clearTimer);

    clearTimer = setTimeout(() => {
        const input1 = document.getElementById("name1");
        const input2 = document.getElementById("name2");

        input1.value = "";
        input2.value = "";

        input1.focus();
    }, 2500);
}

function shareWhatsApp() {
    const card = document.getElementById("shareCard");

    html2canvas(card).then(canvas => {
        // Download image first
        const link = document.createElement("a");
        link.download = "flames-result.png";
        link.href = canvas.toDataURL();
        link.click();

        // Then open WhatsApp
        const message = "I got this result on FLAMES for us. Try it yourself and see what you get!\n\nhttps://sumitarp.github.io/Flames-app/";
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
    });
}

function downloadResultImage() {
    const card = document.getElementById("shareCard");

    html2canvas(card).then(canvas => {
        const link = document.createElement("a");
        link.download = "flames-result.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}
