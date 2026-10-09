"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: DITT NAMN
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */

function validateForm() {
    errors = [];

    if (fullnameInput.value.trim() === "") {
        errors.push("Du måste ange ditt namn.");
    }

    if (emailInput.value.trim() === "") {
        errors.push("Du måste ange din e-postadress.");
    }

    if (phoneInput.value.trim() === "") {
        errors.push("Du måste ange ditt telefonnummer.");
    }

    displayErrors();

    return errors.length === 0;
}



/**
 * Visar felmeddelanden på sidan.
 */

function displayErrors() {
    errorList.innerHTML = "";

    errors.forEach(function (error) {
        const listItem = document.createElement("li");
        listItem.textContent = error;
        errorList.appendChild(listItem);
    });
}



/**
 * Skapar ett studentkort och visar det på sidan.
 */

function createStudentCard() {
    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const font = fontSelect.value;

    previewFullname.textContent = fullname;
    previewEmail.textContent = email;
    previewPhone.textContent = phone;

    
    previewFullname.style.fontFamily = font;
    previewEmail.style.fontFamily = font;
    previewPhone.style.fontFamily = font;

    const student = {
        fullname: fullname,
        email: email,
        phone: phone,
        font: font
    };

    history.unshift(student);
    saveHistory();
    renderHistory();
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    localStorage.setItem("studentHistory", JSON.stringify(history));
}



/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    const savedHistory = localStorage.getItem("studentHistory");

    if (savedHistory !== null) {
        history = JSON.parse(savedHistory);
    }

    renderHistory();
}




/**
 * Visar historiken på sidan.
 */

function renderHistory() {
    historySection.innerHTML = "";

    history.forEach(function (student) {
        const item = document.createElement("div");

        const name = document.createElement("p");
        name.textContent = student.fullname;

        const email = document.createElement("p");
        email.textContent = student.email;

        const phone = document.createElement("p");
        phone.textContent = student.phone;

        item.appendChild(name);
        item.appendChild(email);
        item.appendChild(phone);

        historySection.appendChild(item);
    });
}



/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */

function clearForm() {
    form.reset();

    previewFullname.textContent = "";
    previewEmail.textContent = "";
    previewPhone.textContent = "";

    errors = [];
    displayErrors();
}




/**
 * Raderar hela historiken.
 */

function deleteHistory() {
    history = [];
    localStorage.removeItem("studentHistory");
    renderHistory();
}



// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas


// När användaren klickar på "Rensa"

clearButton.addEventListener("click", clearForm);


// När användaren klickar på "Radera historik"

deleteHistoryButton.addEventListener("click", deleteHistory);


// När sidan laddas:
// - läs in och visa eventuell tidigare historik

loadHistory();

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    createStudentCard();
})