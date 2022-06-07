//Informações iniciais
let square = {
  a1: '', a2: '', a3: '',
  b1: '', b2: '', b3: '',
  c1: '', c2: '', c3: '',
}

let player = ''
let warning = ''
let playing = false

//Eventos

document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', itemClick)
})

//Funções
function itemClick(event) {
  let item = event.target.getAttribute('data-item')
  if (playing && square[item] === '') {
    square[item] = player
    renderSquare()
    tooglePlayer()
  }
  
}

function reset() {
  warning = '--'
  //let random irá escolher qual jogador irá começar aleatoriamente
  let random = Math.floor(Math.random() * 2)
  // if (random === 0) {
    // player = 'x' 
  // } else {
    // player = 'o'
  // } simplificando
  player = (random === 0) ? 'x' : 'o'
  //Agora irá limpar as casas do jogo
  for(let i in square) {
    square[i] = ''
  }
  playing = true
  renderSquare()
  renderInfo()
}

function renderSquare() {
  for(let i in square) {
    let item = document.querySelector(`div[data-item=${i}]`)
    item.innerHTML = square[i]
  }
  
  checkGame()
}
function renderInfo() {
  document.querySelector('.player').innerHTML = player
  document.querySelector('.res-winner').innerHTML = warning
}
//trocar de jogador
function tooglePlayer() {
  // if (player === 'x') {
  //   player = 'o'
  // } else {
  //   player = 'x'
  // }
  player = (player === 'x') ? 'o' : 'x'
  renderInfo()
}
function checkGame() {
  if(checkWinnerfor('x')) {
    warning = 'O "x" venceu'
    playing = false
  } else if(checkWinnerfor('o')) {
    warning = 'O "o" venceu'
    playing = false
  } else if(isFull()){
    warning = 'Deu empate'
    playing = false
  }
}

function checkWinnerfor(player) {
  //array com as possibilidades de vitória
  let pos = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'a3,b2,c1',
  ]
  for(let i in pos) {
    let pArray = pos[i].split(',');
    // pArray.every((option) => {
    //   if (square.option === player) {
    //     retun = true;
    //   } else {
    //     retun = false;
    //   }
    // }) SIMPLIFICANDO
    let hasWon = pArray.every(option => square[option] === player)
    if(hasWon) {
      return true
    }  
  }
  return false
}

function isFull() {
  for (let i in square) {
    if(square[i] === '') {
      return false;
    }
  }
  return true
}