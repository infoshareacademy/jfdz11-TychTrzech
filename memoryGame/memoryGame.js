const pornStarTiles = ['star1', 'star1', 'star2', 'star2', 'star3', 'star3', 'star4', 'star4', 'star5', 'star5', 'star6', 'star6', 'star7', 'star7', 'star8', 'star8'];
//const pornStarTiles = ['star1', 'star1', 'star2', 'star2'];
let cards = document.querySelectorAll(".content div");
cards = [...cards];

let scoreboardArray = JSON.parse(localStorage.getItem('scoreboardArray'));
if (scoreboardArray === null){
    scoreboardArray = [];
}

/*
***************************************************timer stop/start****************************************
*/
const scoreboardElement = document.getElementById('scoreboard');
let sortedScoreboard  = scoreboardArray.sort((a, b) => a - b);
scoreboardElement.innerHTML = sortedScoreboard.map(function (item,index) {
    return (index + 1) + ':' + ' ' + item +'<br />';
}).join("");

const buttonStart = document.getElementById('button__start');
const buttonStop = document.getElementById('button__stop');
let gameTime = 0;
let timerIntervalTimer;

buttonStart.addEventListener('click', start);
buttonStart.addEventListener('click', memoryGame);
buttonStop.addEventListener('click', stop);


function start() {
    buttonStart.removeEventListener('click', start);
    timerIntervalTimer = setInterval(function timer() {
        gameTime += 0.01;
        document.getElementById("info").textContent = gameTime.toFixed(2);
    },10);
}

function stop() {
    clearInterval(timerIntervalTimer);
    buttonStart.addEventListener('click', start);
}
/********************************************************************************************************/

function memoryGame() {
    buttonStart.removeEventListener('click', memoryGame);
    let activeCard = "";
    const activeCards = [];
    const gameFinishScore = cards.length / 2;
    let gameResult = 0;

    const clickCard = function () {
            activeCard = this;
            if (activeCard === activeCards[0])
                return;
            activeCard.classList.remove("hidden");
            if (activeCards.length === 0) {
                activeCards[0] = activeCard;
            } else {
                cards.forEach(card => card.removeEventListener("click", clickCard));
                activeCards[1] = activeCard;

                setTimeout(function () {

                    if (activeCards[0].className === activeCards[1].className) {
                        activeCards.forEach(card => card.classList.add("victory"));
                        gameResult++;
                        cards = cards.filter(card => !card.classList.contains("victory"));
                        if (gameResult === gameFinishScore){
                            win();
                        }
                    } else {
                        activeCards.forEach(card => card.classList.add("hidden"))
                    }
                    activeCard = "";
                    activeCards.length = 0;
                    cards.forEach(card => card.addEventListener("click", clickCard))
                }, 800)
        }
    };

    function refreshScoreboard(newFinishTime) {
        console.log(scoreboardArray);
        scoreboardArray.push(newFinishTime);
        let sortedScoreboard =  scoreboardArray.sort((a, b) => a - b);
        scoreboardElement.innerHTML = sortedScoreboard.map(function (item,index) {
            return (index + 1) + ':' + ' ' + item +'<br />';
        }).join("");
        localStorage.setItem('scoreboardArray', JSON.stringify(sortedScoreboard));
    }

    function win() {
        clearInterval(timerIntervalTimer);
        let finishTime = gameTime.toFixed(2);
        document.getElementById("info").textContent = 'YOUR TIME: ' + finishTime + 's';
        refreshScoreboard(finishTime);
        buttonStart.addEventListener('click', () => {location.reload();});
        buttonStart.textContent = 'Reload';
    }


    const init = function () {
        cards.forEach(card => {
            const position = Math.floor(Math.random() * pornStarTiles.length);
            card.classList.add(pornStarTiles[position]);
            pornStarTiles.splice(position, 1);
        });
        cards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard)
        })
    };

    init();
}