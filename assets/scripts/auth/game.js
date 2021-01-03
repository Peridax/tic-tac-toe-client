const store = require('./../store')
const ui = require('./ui')

let cells, turn

const start = (data) => {
  store.game = data.game
  cells = new Array(9)
  turn = 'x'

  ui.game.updateElements(true)
  gameEventListener(true)
}

const gameEventListener = (key) => {
  if (key) {
    $('#game-table td')
      .on('click', gameUserClick)
      .hover(function () {
        if (!$(this).hasClass('x') && !$(this).hasClass('o')) {
          $(this).addClass('temp-' + turn)
        }
      }, function () {
        if (!$(this).hasClass('x') && !$(this).hasClass('o')) {
          $(this).removeClass('temp-' + turn)
        }
      })
  } else {
    $('#game-table td').off('click mouseenter mouseleave')
  }
}

const gameUserClick = (data) => {
  const element = data.currentTarget

  if (!$(element).hasClass('x') && !$(element).hasClass('o')) {
    $(element).addClass(turn)

    cells[$(element).attr('id') - 1] = turn
    gameCheckWon()

    turn === 'x' ? turn = 'o' : turn = 'x'
  } else {
    console.log('can\'t place here!')
  }
}

const gameCheckWon = () => {
  console.log(cells)
}

module.exports = {
  start
}
