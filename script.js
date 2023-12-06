// INCLEMENTADO 

let vetJogo = [];
let levelCont;
let intCont;
let jogoInt;
let limparInt;
let jogo, jogoVeloc;

let corGrupo = ["red", "blue", "green", "yellow"];
let yellow, green, blue, red;
let startBtn;
let levelDisplay, levelDiv, levelTitulo, overTitulo;

document.addEventListener("DOMContentLoaded", function () {

    jogo = document.querySelector('#svg');
    jogo.addEventListener("load", function () {

        startBtn = jogo.getElementById("startBtn");
        levelDiv = jogo.getElementById("level");
        levelTitulo = jogo.getElementById("levelTitulo");
        levelDisplay = jogo.querySelector(".lvlCount");
        overTitulo = jogo.getElementById("gameOver");
        yellow = jogo.getElementById("yellow");
        green = jogo.getElementById("green");
        red = jogo.getElementById("red");
        blue = jogo.getElementById("blue");

        startBtn.addEventListener("click", NewGame);

    });
});


function NewGame() {

    startBtn.classList.add("hidden");
    levelDisplay.textContent = "1";
    levelTitulo.classList.remove("hidden");
    levelDiv.classList.remove("hidden");

    intCont = 0;
    levelCont = 1;
    jogoVeloc = 1000;

    for (let i = 0; i <= 50; i++) {

        let rnd = Math.floor((Math.random() * 4) + 1);
        vetJogo[i] = corGrupo[rnd - 1];
    }
  console.log(vetJogo);
    startJogoInterval(jogoVeloc, 1000);
}


function startJogoInterval(speed, delay) {

    setTimeout(function () {
        jogoInt = setInterval(GamePlay, speed);
    }, delay);
}

function GamePlay() {

    let selected = jogo.getElementById(vetJogo[intCont]);
    selected.classList.add("active");

    setTimeout(function () {
        selected.classList.remove("active");
    }, jogoVeloc/2);

    if (intCont === (levelCont + 2)) {
        clearInterval(jogoInt);
        intCont = 0;
        GameStart();
    } else {
        intCont++;
    }
}

function GameStart() {

    yellow.addEventListener("click", checkGuess);
    green.addEventListener("click", checkGuess);
    red.addEventListener("click", checkGuess);
    blue.addEventListener("click", checkGuess);

}

function GameOver() {

    yellow.removeEventListener("click", checkGuess);
    green.removeEventListener("click", checkGuess);
    red.removeEventListener("click", checkGuess);
    blue.removeEventListener("click", checkGuess);

}

function checkGuess(ev) {

    let guess = ev.target.id;

    if (vetJogo[intCont] == guess) {

        ev.target.classList.add("active");
        setTimeout(function () {
            ev.target.classList.remove("active");
        }, 500);
        
        intCont++;

        if (intCont === (levelCont + 3)) {

            intCont = 0;
            levelCont++;
            levelDisplay.innerHTML = levelCont;
            

            GameOver();
            jogoVeloc = jogoVeloc * 0.93;
            startJogoInterval(jogoVeloc, 2500);
        }

    } else {

        let rightGuess = jogo.getElementById(vetJogo[intCont]);
        rightGuess.classList.add("active");

        setTimeout(function () {
            rightGuess.classList.remove("active");
        }, 500);

        GameOver();

        levelTitulo.classList.add("hidden");
        overTitulo.classList.remove("hidden");

        setTimeout(function () {
            overTitulo.classList.add("hidden");
            levelDiv.classList.add("hidden");
            startBtn.classList.remove("hidden");
        }, 2500);
    }
}