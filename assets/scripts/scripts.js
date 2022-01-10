const FRONT = 'card_front'
const BACK = 'card_back'
const CARD = 'card'
const ICON = 'icon'

let techs = [
  'bootstrap',
  'css',
  'electron',
  'firebase',
  'html',
  'javascript',
  'jquery',
  'mongo',
  'node',
  'react'
]

let cards = null

startGame()

function startGame() {
  cards = createCardsFromTechs(techs)
  shuffleCards(cards)
  initializeCards(cards)
}

function initializeCards(cards) {
  let gameBoard = document.getElementById('gameBoard')

  cards.forEach(card => {
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

function shuffleCards(cards) {
  let currentIndex = cards.length
  let randomIndex = 0

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[cards[randomIndex], cards[currentIndex]] = [
      cards[currentIndex],
      cards[randomIndex]
    ]
  }
}

createCardsFromTechs(techs)
function createCardsFromTechs(techs) {
  let cards = []

  techs.forEach(tech => {
    cards.push(createPairFromTech(tech))
  })

  return cards.flatMap(pair => pair)
}

function createPairFromTech(tech) {
  return [
    {
      id: createIdWithTech(tech),
      icon: tech,
      flipped: false
    },
    {
      id: createIdWithTech(tech),
      icon: tech,
      flipped: false
    }
  ]
}

function createIdWithTech(tech) {
  return tech + parseInt(Math.random() * 1000)
}

function flipCard() {}

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
