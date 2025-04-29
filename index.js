"use strict";

const RIGHE = 6;
const COLONNE = 7;

const GREY = "rgb(127, 127, 127)";
const YELLOW = "rgb(255, 255, 0)";
const RED = "rgb(255, 0, 0)";


window.onload = function () {
    caricaWrapper();

    const nextPlayer = document.getElementById("nextPlayer");
    nextPlayer.classList.add("pedina");
    nextPlayer.style.backgroundColor = YELLOW;
}

function caricaWrapper() {
    const wrapper = document.querySelector("#wrapper");

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            const div = document.createElement("div");
            div.classList.add("pedina");
            div.id = `div-${i}-${j}`;
            wrapper.appendChild(div);

            if (i == 5) {
                div.addEventListener("click", pedinaClick);
            }
        }
    }
}

function pedinaClick() {
    const turno = recuperaTurno();

    if (turno == "G") {
        this.style.backgroundColor = YELLOW;
    }
    else {
        this.style.backgroundColor = RED;
    }

    this.removeEventListener("click", pedinaClick);

    const rSup = parseInt(this.id.split("-")[1]) - 1;
    const cSup = parseInt(this.id.split("-")[2]);

    // Se esiste la cella superiore la "sblocco"
    if (rSup >= 0) {
        const cellaSup = document.getElementById(`div-${rSup}-${cSup}`);
        cellaSup.addEventListener("click", pedinaClick);
    }

    // Aggiorno turno
    const nextPlayer = document.getElementById("nextPlayer");
    if (turno == "G") {
        nextPlayer.style.backgroundColor = RED;
    }
    else {
        nextPlayer.style.backgroundColor = YELLOW;
    }
}

function recuperaTurno() {
    const nextPlayer = document.getElementById("nextPlayer");

    if (nextPlayer.style.backgroundColor == YELLOW) {
        return "G";
    }
    else {
        return "R";
    }
}