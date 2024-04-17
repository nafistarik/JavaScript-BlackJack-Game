let player = {
    name: "You have",
    chips: 200,
    bet: 0
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""

let messageEl = document.getElementById("message-el")
let cardsEl = document.getElementById("cards-el")
let sumEl = document.getElementById("sum-el")
let betEl = document.getElementById("bet-el")
let playerEl = document.getElementById("player-el")

betEl.textContent = "Bet: $" + player.bet
playerEl.textContent = player.name + ": $" + player.chips

function setName() {
    let playerName = document.getElementById("name-input").value;
    if (playerName !== "") {
        player.name = playerName;
        playerEl.textContent = player.name + ": $" + player.chips;
    }
}

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function placeBet() {
    if (player.chips > 0) {
        player.bet = 10  // seting bet amount 
        player.chips -= player.bet //Decrease of chips after bet
        playerEl.textContent = player.name + ": $" + player.chips // customizing chips
        betEl.textContent = "Bet: $" + player.bet //showing bet amount
        startGame() //starting game by clicking bet
    } else {
        messageEl.textContent = "You don't have enough chips to place a bet!" //no chips, no bet
    }
}

function startGame() {
    isAlive = true
    hasBlackJack = false // Resetting the Blackjack flag
    cards = []
    sum = 0
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        player.chips += player.bet * 5  // 5x the bet for winning
        playerEl.textContent = player.name + ": $" + player.chips
        betEl.textContent = "Bet: $" + player.bet
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message // This shows what will be in the text in the top!
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}
function restartGame() {
    player.chips = 200;
    player.bet = 0;
    playerEl.textContent = player.name + ": $" + player.chips;
    betEl.textContent = "Bet: $" + player.bet;
    messageEl.textContent = "Place your bet and start the game!";
    cardsEl.textContent = "Cards:";
    sumEl.textContent = "Sum:";
    cards = [];
    sum = 0;
    hasBlackJack = false;
    isAlive = false;
}