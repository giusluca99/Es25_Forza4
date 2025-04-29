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

    for (let i = 0; i < RIGHE; i++) {
        for (let j = 0; j < COLONNE; j++) {
            const div = document.createElement("div");
            div.classList.add("pedina");
            div.id = `div-${i}-${j}`;
            wrapper.appendChild(div);

            if (i == RIGHE - 1) {
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

    // Gestione vittoria
    const vittoria = checkVittoria(this);

    if (vittoria) {
        /*let colore;
        if(turno == "G"){
            colore = "giallo";
        }
        else {
            colore = "rosso";
        }*/
        const colore = turno == "G" ? "giallo" : "rosso";

        alert("Ha vinto il giocatore " + colore);
        disabilitaPedine();
    }
    else {
        // Aggiorno turno
        const nextPlayer = document.getElementById("nextPlayer");
        if (turno == "G") {
            nextPlayer.style.backgroundColor = RED;
        }
        else {
            nextPlayer.style.backgroundColor = YELLOW;
        }
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

function checkVittoria(pedina) {
    // Check verticale
    let cont = 1;
    for (let i = 1; i < 4; i++) {
        const rInf = parseInt(pedina.id.split("-")[1]) + i;
        const cInf = parseInt(pedina.id.split("-")[2]);

        if (rInf < RIGHE) {
            const cellaInf = document.getElementById(`div-${rInf}-${cInf}`);

            // Controllo se la cella inferiore continua la sequenza
            if (cellaInf.style.backgroundColor
                == pedina.style.backgroundColor) {
                cont++;
            }
            else {
                break;
            }
        }
        else {
            break;
        }

        if (cont >= 4) {
            return true;
        }
    }

    // Check orizzontale
    let i = 1;
    cont = 1;
    let stopSx = false; // Variabile che gestisce lo stop a sx
    let stopDx = false; // Variabile che gestisce lo stop a dx
    do {
        const r = parseInt(pedina.id.split("-")[1]);

        // Sequenza di sinistra. Se stopSx == true mi fermo
        if (!stopSx) {
            const cSx = parseInt(pedina.id.split("-")[2]) - i;

            // Controllo che la cella a sinistra esista
            if (cSx >= 0) {
                const cellaSx = document.getElementById(`div-${r}-${cSx}`);
                if (cellaSx.style.backgroundColor
                    == pedina.style.backgroundColor) {
                    cont++;
                }
                else {
                    stopSx = true;
                }
            }
            else {
                stopSx = true;
            }
        }

        // Sequenza di destra. Se stopDx == true mi fermo
        if (!stopDx) {
            const cDx = parseInt(pedina.id.split("-")[2]) + i;

            // Controllo che la cella a destra esista
            if (cDx < COLONNE) {
                const cellaDx = document.getElementById(`div-${r}-${cDx}`);
                if (cellaDx.style.backgroundColor
                    == pedina.style.backgroundColor) {
                    cont++;
                }
                else {
                    stopDx = true;
                }
            }
            else {
                stopDx = true;
            }
        }

        i++;
    } while ((!stopDx || !stopSx) && cont < 4);

    if (cont >= 4) {
        return true;
    }

    return false;
}

function disabilitaPedine() {
    const pedine = document.querySelectorAll(".pedina");
    for (const pedina of pedine) {
        pedina.removeEventListener("click", pedinaClick);
    }
}