// classNames
const FRONT = 'card_front'
const BACK = 'card_back'
const CARD = 'card'
const ICON = 'icon'

startGame()

function startGame() {
  initializeCards(game.createCardsFromTechs())
}

function initializeCards(cards) {
  let gameBoard = document.getElementById('gameBoard')
  gameBoard.innerHTML = ''

  game.cards.forEach(card => {
    let cardElement = document.createElement('div')
    cardElement.id = card.id
    cardElement.classList.add(CARD)
    cardElement.dataset.icon = card.icon

    createCardContent(card, cardElement)

    cardElement.addEventListener('click', flipCard)
    gameBoard.appendChild(cardElement)
  })
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement)
  createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement('div')
  cardElementFace.classList.add(face)

  if (face === FRONT) {
    let iconElement = document.createElement('img')
    iconElement.classList.add(ICON)
    iconElement.src = './assets/images/' + card.icon + '.png'
    cardElementFace.appendChild(iconElement)
  } else {
    cardElementFace.innerHTML = '&lt/&gt'
  }

  element.appendChild(cardElementFace)
}

function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add('flip')
    if (game.secondCard) {
      if (game.checkMatch()) {
        game.clearCards()
        if (game.checkGameOver()) {
          let gameOverLayer = document.getElementById('gameOver')
          gameOverLayer.style.display = 'flex'
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id)
          let secondCardView = document.getElementById(game.secondCard.id)

          firstCardView.classList.remove('flip')
          secondCardView.classList.remove('flip')
          game.unflipCards()
        }, 1000)
      }
    }
  }
}

function restart() {
  game.clearCards()
  startGame()
  let gameOverLayer = document.getElementById('gameOver')
  gameOverLayer.style.display = 'none'
}
// {
//   "editor.fontSize": 16,
//   "terminal.integrated.fontSize": 16,
//   "workbench.colorTheme": "Omni",
//   "workbench.iconTheme": "material-icon-theme",
//   "editor.bracketPairColorization.enabled": true,
//   "editor.minimap.enabled": false,
//   "editor.wordWrap": "on",
//   "workbench.editor.tabSizing": "shrink",
//   "explorer.compactFolders": false,

//   // formatter
//   "prettier.tabWidth": 2,
//   "prettier.semi": false,
//   "prettier.singleQuote": true,
//   "prettier.trailingComma": "none",
//   "prettier.arrowParens": "avoid",
//   "prettier.endOfLine": "auto",
//   "editor.tabSize": 2,
//   "editor.formatOnSave": true,
//   "[javascript]": {
//       "editor.defaultFormatter": "esbenp.prettier-vscode"
//   },
//   "[html]": {
//       "editor.defaultFormatter": "esbenp.prettier-vscode"
//   },
//   "liveServer.settings.donotShowInfoMsg": true,
//   "liveServer.settings.donotVerifyTags": true,
// }
