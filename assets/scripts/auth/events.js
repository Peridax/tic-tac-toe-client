const store = require('./../store')
const api = require('./api')
const ui = require('./ui')
const errorHandler = require('./error-handler.js')
const game = require('./game')

const getFormFields = require('./../../../lib/get-form-fields')

const signUp = (event) => {
  event.preventDefault()
  ui.toggleForm('sign-up', false)

  const credentials = getFormFields(event.target)

  api.signUp(credentials)
    .then(ui.onSignUp)
    .then(() => { event.target.reset() })
    .catch((error) => errorHandler.signUp(error, credentials))
    .then(() => { ui.toggleForm('sign-up', true) })
}

const signIn = (event) => {
  event.preventDefault()
  ui.toggleForm('sign-in', false)

  const credentials = getFormFields(event.target)

  api.signIn(credentials)
    .then(data => { store.user = data.user; return data })
    .then(data => api.getGames(data.user.token))
    .then(game.gameCount)
    .then(ui.onSignIn)
    .then(() => { event.target.reset() })
    .catch((error) => errorHandler.signIn(error, credentials))
    .then(() => { ui.toggleForm('sign-in', true) })
}

const logout = () => {
  api.logout(store.user.token)
    .then(ui.onLogout)
    .then(game.gameEnd)
    .then(ui.game.resetBoard)
    .catch(console.error)
}

const changePassword = (event) => {
  event.preventDefault()
  ui.toggleForm('change-password', false)

  const credentials = getFormFields(event.target)

  api.changePassword(credentials, store.user.token)
    .then(() => { ui.onChangePassword(event.target) })
    .then(() => { event.target.reset() })
    .catch(console.error)
    .then(() => { ui.toggleForm('change-password', true) })
}

const home = () => {
  if (store.usertoken) {
    ui.show('authenticated')
    ui.navUpdate('home-link')
  } else {
    ui.show('unauthenticated')
    ui.navUpdate('home-link')
  }
}

const settings = () => {
  ui.show('settings-link')
  ui.navUpdate('settings-link')
}

const newGame = () => {
  api.newGame(store.user.token)
    .then(game.start)
    .catch(console.error)
}

module.exports = {
  signUp,
  signIn,
  settings,
  home,
  changePassword,
  newGame,
  logout
}
