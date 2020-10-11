//dom elements
const domElements = {
nameOne: document.querySelector(".name-one"),
nameTwo: document.querySelector(".name-two"),
start: document.querySelector(".start-button"),
playAgain: document.querySelector(".play-again"),
newGame: document.querySelector(".new-game"),
headerWrapperOne: document.querySelector(".header-wrapper-one"),
headerWrapperTwo: document.querySelector(".header-wrapper-two"),
headerWrapperThree: document.querySelector(".header-wrapper-three"),
boardWrapper: document.querySelector(".board-wrapper"),
playerOneTitle: document.querySelector(".player-one-title"),
playerTwoTitle: document.querySelector(".player-two-title"),
displayWinner: document.querySelector(".display-winner"),
squares: document.querySelectorAll(".square")
}

//dom elements EVENT LISTENERS
domElements.start.addEventListener('click', function () {
    //function
    submitNames();
    hideWrapper(domElements.headerWrapperOne)
    showWrapper(domElements.headerWrapperTwo, 'flex')
    showWrapper(domElements.boardWrapper, 'grid');
    domElements.newGame.style.display = 'inline';
})
domElements.playAgain.addEventListener('click', function (){
    gameBoard.toggle();
    reset();
})
domElements.newGame.addEventListener('click', function (){
    window.location.reload();
})

//player factory function
const Player = (name, marker) => {
    var playerName = name;
    const getMarker = () => marker;
    //const placeMarker = *****need to move function to put it here
    const winGame = () => {
        alert(name + ' is the winner!');
    };
    const boxChecked = {
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false,
        eight: false,
        nine: false,
    };
    const resetChecked = () => {
        Object.keys(boxChecked).forEach(function(key) { 
            boxChecked[key] = false
        })
    }
    return {winGame, getMarker, boxChecked, playerName, resetChecked} //object with same names
}

//game controller defaults
const control = {
    player1: Player('Player 1', 'X'),
    player2: Player('Player 2', 'O'),
    playerOneTurn: true,
    turns: 0,
    listenActive: true,
    };
    

//show/hide panels
function hideWrapper(constName) {
    constName.style.display = 'none';
}

function showWrapper(constName, display) {
    constName.style.display = display;
}

//assign names
function submitNames () {
    if (domElements.nameOne.value !== '' && domElements.nameTwo.value !== '') {
    var playerOneInput = domElements.nameOne.value;
    var playerTwoInput = domElements.nameTwo.value;
    control.player1.playerName = playerOneInput;
    control.player2.playerName = playerTwoInput;
    domElements.playerOneTitle.innerHTML = control.player1.playerName;
    domElements.playerTwoTitle.innerHTML = control.player2.playerName;
    return true;
    } else {
        domElements.playerOneTitle.innerHTML = 'player 1';
        domElements.playerTwoTitle.innerHTML = 'player 2';
        return false;
    }
}
//gameboard and functions
var gameBoard = {
    squaresArray: ['.one', '.two', '.three', '.four', '.five','.six', '.seven','.eight', '.nine'],
    assignListeners: function () {
        gameBoard.squaresArray.forEach(function(element) {
            var key = element.substring(1);
             document.querySelector(element).addEventListener('click',function () {
                 if (control.listenActive == true) {
                    var box = document.querySelector(element);
                    if (control.playerOneTurn == true) {
                        control.player1.boxChecked[key] = true;
                    } else {
                        control.player2.boxChecked[key] = true;
                    }
                    placeMarkers(box);
                    control.turns++;
                    getChecked();
                 }
            })
        })
    },
    clearBoard: function () {
        gameBoard.squaresArray.forEach(function(element) {
            let box = document.querySelector(element);
            box.innerHTML = '';
            document.querySelector(element).style.color = 'black';
            control.player1.resetChecked();
            control.player2.resetChecked();
        })
    },
    highlight: function (a, b, c) {
        gameBoard.squaresArray.forEach(function(element) {
            if (element == a || element == b || element == c) {
                document.querySelector(element).style.color = 'pink';
            }
        })
    },
    toggle: function () {
        if (control.listenActive == true) {
            control.listenActive = false;
            domElements.squares.forEach(function(element) {
                element.classList.remove("hover");
            })
        } else if (control.listenActive == false) {
            control.listenActive = true;
            domElements.squares.forEach(function(element) {
                element.classList.add("hover");
            })
        }

    }
}
gameBoard.assignListeners()


function getChecked() {
    let player = control.player1
    if (control.playerOneTurn == true) {
        player = control.player2;
    }
    if (player.boxChecked.one == true && player.boxChecked.two == true && player.boxChecked.three == true) {
        gameBoard.highlight('.one', '.two', '.three');
        showWinner(player)
    }
    else if (player.boxChecked.one == true && player.boxChecked.five == true && player.boxChecked.nine == true) {
        gameBoard.highlight('.one', '.five', '.nine');
        showWinner(player)
    }
    else if(player.boxChecked.one == true && player.boxChecked.four == true && player.boxChecked.seven == true) {
        gameBoard.highlight('.one', '.four', '.seven');
        showWinner(player)
    }
    else if (player.boxChecked.two == true && player.boxChecked.five == true && player.boxChecked.eight == true) {
        gameBoard.highlight('.two', '.five', '.eight');
        showWinner(player)
    }
    else if (player.boxChecked.three == true && player.boxChecked.five == true && player.boxChecked.seven == true) {
        gameBoard.highlight('.three', '.five', '.seven');
        showWinner(player)
    }
    else if (player.boxChecked.three == true && player.boxChecked.six == true && player.boxChecked.nine == true) {
        gameBoard.highlight('.three', '.six', '.nine');
        showWinner(player)
    }
    else if (player.boxChecked.four == true && player.boxChecked.five == true && player.boxChecked.six == true) {
        gameBoard.highlight('.four', '.five', '.six');
        showWinner(player)
    }
    else if (player.boxChecked.seven == true && player.boxChecked.eight == true && player.boxChecked.nine == true) {
        gameBoard.highlight('.seven', '.eight', '.nine');
        showWinner()
    } else if (control.turns >= 9) {
        domElements.displayWinner.innerHTML = 'nobody wins!';
        showResults();
    }
}

function placeMarkers(item) {
    if (item.innerHTML == '' && control.playerOneTurn == true) {
        item.innerHTML = control.player1.getMarker();
        control.playerOneTurn = false;
    } else if (item.innerHTML == '' && control.playerOneTurn == false) {
        item.innerHTML = control.player2.getMarker();
        control.playerOneTurn = true;
    }
}
function showWinner(player) {
    let winner = player;
    domElements.displayWinner.innerHTML = winner.playerName + ' wins!';
    showResults();
}

function showResults() {
    hideWrapper(domElements.headerWrapperTwo);
    showWrapper(domElements.headerWrapperThree, 'flex');
    gameBoard.toggle();
}

function reset () {
    gameBoard.clearBoard();
    hideWrapper(domElements.headerWrapperThree);
    showWrapper(domElements.headerWrapperTwo, 'flex');
    control.turns = 0;
    control.playerOneTurn = true;
}