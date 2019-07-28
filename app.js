var scores, diceScore, activePlayer, roundScore, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        diceScore = generateRandomNumber();

        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + diceScore + '.png';

        if (diceScore !== 1) {
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

        if (scores[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
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
