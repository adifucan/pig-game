/*
Change the game to follow rules:

3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, dice1Score, dice2Score, activePlayer, roundScore, gamePlaying, winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        dice1Score = generateRandomNumber();
        dice2Score = generateRandomNumber();

        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1Score + '.png';

        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-2').src = 'dice-' + dice2Score + '.png';

        if (dice1Score !== 1 && dice2Score !== 1) {
            roundScore += dice1Score + dice2Score;
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
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}
