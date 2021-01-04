const store = require('./../store')
const api = require('./api')
const ui = require('./ui')

let cells, turn, winner, winningCells, won, tie, waitRequest

const start = (data) => {
  won = false
  tie = false

  store.game = data.game
  cells = new Array(9)
  turn = 'x'

  ui.game.updateElements(true)
  ui.game.resetBoard()

  gameEventListener(true)
  gameUpdateText(true)

  ui.game.updateGameCount(++store.gamesPlayed)
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

  if (!waitRequest || waitRequest === undefined) {
    if (!$(element).hasClass('x') && !$(element).hasClass('o')) {
      $(element).addClass(turn)
      waitRequest = true

      // Updating the local cells array as well as the game cells array that will
      // be sent to the server.
      cells[$(element).attr('id') - 1] = turn
      store.game.cells[$(element).attr('id') - 1] = turn
      gameCheckWon($(element).attr('id') - 1, turn)

      if (!won) {
        turn === 'x' ? turn = 'o' : turn = 'x'
        gameUpdateText(true)
      }
    } else {
      console.log('can\'t place here!')
    }
  }
}

// I could've implemented better winning logic but I have had little time these
// few days to work on it, plus I am super tired and exhausted as I write this.
const gameCheckWon = (index, value) => {
  won = false
  tie = false
  winningCells = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ]

  // This is kind of, uh, funky looking huh?
  for (const j in winningCells) {
    if ((cells[winningCells[j][0] - 1]) === 'x' && (cells[winningCells[j][1] - 1]) === 'x' && (cells[winningCells[j][2] - 1]) === 'x') {
      won = true
      winner = 'x'
    } else if ((cells[winningCells[j][0] - 1]) === 'o' && (cells[winningCells[j][1] - 1]) === 'o' && (cells[winningCells[j][2] - 1]) === 'o') {
      won = true
      winner = 'o'
    }
  }

  if (!won && !cells.includes(undefined)) {
    tie = true
    gameEnd()
  } else if (won && winner) {
    gameEnd()
  }

  api.updateGame(store.user.token, store.game._id, { game: { cell: { index: index, value: value }, over: won || tie } })
    .then(data => console.log(data.game))
    .then(() => { waitRequest = false })
    .catch(console.error)
}

const gameEnd = () => {
  ui.game.updateElements(false)
  gameEventListener(false)
  gameUpdateText(true)
}

const gameCount = (data) => {
  store.gamesPlayed = data.games.length
  ui.game.updateGameCount(store.gamesPlayed)
}

const gameUpdateText = (key) => {
  if (key) {
    if (!won && !tie) {
      $('#game-updates').text('Turn: ' + turn)
    } else if (won) {
      $('#game-updates').text('Player ' + winner + ' won!')
    } else if (tie) {
      $('#game-updates').text('The players have tied!')
    }
  } else {
    $('#game-updates').html('')
  }
}

module.exports = {
  start,
  gameCount,
  gameEnd,
  gameUpdateText
}
