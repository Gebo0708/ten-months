const gift = document.getElementById("image1");
const flowerWrapper = document.getElementById("flower-wrapper");
const flower = document.getElementById("flower");
const folder = document.getElementById("letter-folder");
const actualLetter = document.getElementById("actual-letter");
const flowerText = document.getElementById("flower-text");
const catchText = document.getElementById("catch-text");
const ripple = document.getElementById("ripple-bg");

const instruction = document.getElementById("instruction");
const questionGroup = document.getElementById("question-container");
const btnContainer = document.getElementById("btn-wrapper");
const btnYes = document.getElementById("btn-yes");
const btnNo = document.getElementById("btn-no");

let sizeMultiplier = 1;

// Trigger Question after Gift explodes
gift.addEventListener("click", () => {
    gift.classList.add("clicked");
    gift.style.pointerEvents = "none";
    instruction.style.display = "none";

    gift.addEventListener("animationend", () => {
        gift.style.display = "none";
        questionGroup.style.display = "flex";
        btnContainer.style.display = "flex";
    }, { once: true });
});

// "No" button makes "Yes" button grow
btnNo.addEventListener("click", () => {
    const screenWidth = window.innerWidth;
    if (btnYes.offsetWidth < screenWidth * 0.8) {
        sizeMultiplier += 0.3;
        btnYes.style.fontSize = (24 + (sizeMultiplier * 10)) + "px";
        btnYes.style.padding = `${12 + (sizeMultiplier * 8)}px ${30 + (sizeMultiplier * 15)}px`;
    }
});

// "Yes" button triggers flower appearance
btnYes.addEventListener("click", () => {
    questionGroup.style.display = "none";
    btnContainer.style.display = "none";
    flowerWrapper.classList.add("giving-effect");
    setInterval(createHeart, 200); 
});

// Folder logic for catching it and opening letter
folder.addEventListener("click", (e) => {
    if (!folder.classList.contains("focused")) {
        flowerText.style.display = "none";
        catchText.style.display = "block";
        folder.classList.add("focused");
        flower.classList.add("flower-aside");
    } else {
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.classList.add("ripple-active");

        folder.style.animation = "explode 0.5s forwards";
        catchText.style.display = "none";
        
        setTimeout(() => {
            folder.style.display = "none";
            flower.style.display = "none";
            actualLetter.style.display = "block";
            actualLetter.style.animation = "giveFlower 0.8s ease-out forwards";
            ripple.classList.remove("ripple-active");
        }, 400);
    }
});

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s"; 
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}