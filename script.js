
// Assignment 3: Interactive Blacksmith

// Select page elements

const forge = document.querySelector("#forge");
const forgeImage = document.querySelector("#forge-image");
const forgeStatus = document.querySelector("#forge-status");
const heatValue = document.querySelector("#heat-value");
const swordCount = document.querySelector("#sword-count");
const actionMessage = document.querySelector("#action-message");

const heatInput = document.querySelector("#heat-input");
const inputFeedback = document.querySelector("#input-feedback");

const addHeatButton = document.querySelector("#add-heat");
const makeSwordButton = document.querySelector("#make-sword");
const resetButton = document.querySelector("#reset-forge");

// State variables

let heat = 20;
let swordsMade = 0;

// Get forge status

function getForgeStatus(heatValue) {
    if (heatValue < 30) {
        return "Too cold";
    } else if (heatValue < 70) {
        return "Ready to forge";
    } else {
        return "Roaring fire";
    }
}

// Update the forge display

function updateForge() {

    const status = getForgeStatus(heat);

    heatValue.textContent = heat;
    swordCount.textContent = swordsMade;
    forgeStatus.textContent = status;

    forge.classList.remove("is-cold", "is-ready", "is-roaring");

    if (status === "Too cold") {

        forge.classList.add("is-cold");
        forgeImage.src = "assets/forge-cold.svg";
        forgeImage.alt = "A stone forge with dark coals and no flames";

    } else if (status === "Ready to forge") {

        forge.classList.add("is-ready");
        forgeImage.src = "assets/forge-ready.svg";
        forgeImage.alt = "A stone forge with a small orange fire";

    } else {

        forge.classList.add("is-roaring");
        forgeImage.src = "assets/forge-roaring.svg";
        forgeImage.alt = "A stone forge with tall bright flames and sparks";

    }
}

// Add heat to the forge

function heatForge(amount) {

    if (!Number.isInteger(amount) || amount <= 0) {
        return false;
    }

    heat += amount;

    if (heat > 100) {
        heat = 100;
    }

    actionMessage.textContent =
        `Heating complete. The forge is at ${heat} heat.`;

    updateForge();

    return true;
}

// Make a sword

function makeSword() {

    if (heat >= 30) {

        heat -= 30;
        swordsMade += 1;

        actionMessage.textContent = "You made a sword!";

    } else {

        actionMessage.textContent =
            "The forge is too cold. You need more heat.";

    }

    updateForge();
}

// Reset the forge

function resetForge() {

    heat = 20;
    swordsMade = 0;

    heatInput.value = "";
    inputFeedback.textContent = "";
    actionMessage.textContent = "";

    updateForge();
}

// Add heat button event listener

addHeatButton.addEventListener("click", function() {

    const amount = heatInput.value.trim();
    const number = Number(amount);

    if (
        amount === "" ||
        !Number.isInteger(number) ||
        number <= 0 ||
        number > 100
    ) {

        inputFeedback.textContent =
            "Please enter a positive whole number from 1 to 100.";

        return;
    }

    inputFeedback.textContent = "";

    heatForge(number);

    heatInput.value = "";

});

// Make sword button event listener

makeSwordButton.addEventListener("click", function() {

    inputFeedback.textContent = "";

    makeSword();

});

// Reset button event listener

resetButton.addEventListener("click", function() {

    resetForge();

});

// Initial display

updateForge();
