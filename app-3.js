/*
Change the game to follow rules:

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.
(Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out :)
*/

var scores, diceScore, activePlayer, roundScore, gamePlaying, lastDice, winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        diceScore = generateRandomNumber();

        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + diceScore + '.png';

        // A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
        if (diceScore === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else if (diceScore !== 1) {
            lastDice = diceScore;
            roundScore += diceScore;
            document.getElementById('current-' + activePlayer).innerHTML = roundScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;

        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        winningScore = document.querySelector('.winningScore').value ? document.querySelector('.winningScore').value : 100;

        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
            lastDice = 0;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    hideDice();

    document.getElementById('score-0').innerHTML = '0';
    document.getElementById('score-1').innerHTML = '0';
    document.getElementById('current-0').innerHTML = '0';
    document.getElementById('current-1').innerHTML = '0';
    document.getElementById('name-0').innerHTML = 'Player 1';
    document.getElementById('name-1').innerHTML = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
    roundScore = 0;
    lastDice = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.getElementById('current-0').innerHTML = '0';
    document.getElementById('current-1').innerHTML = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    hideDice();
}

function generateRandomNumber() {
    return Math.floor((Math.random() * 6) + 1);
}

function hideDice() {
    document.querySelector('.dice').style.display = 'none'
}
