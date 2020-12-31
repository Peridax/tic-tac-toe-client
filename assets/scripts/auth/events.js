const api = require('./api')
const ui = require('./ui')
const errorHandler = require('./error-handler.js')

const getFormFields = require('./../../../lib/get-form-fields')

const signUp = (event) => {
  event.preventDefault()

  const credentials = getFormFields(event.target)

  api.signUp(credentials)
    .then(ui.onSignUp)
    .then(() => { event.target.reset() })
    .catch((error) => errorHandler.signUp(error, credentials))
}

const signIn = (event) => {
  event.preventDefault()

  const credentials = getFormFields(event.target)

  api.signIn(credentials)
    .then(ui.onSignIn)
    .then(() => { event.target.reset() })
    .catch((error) => errorHandler.signIn(error, credentials))
    .finally(() => console.log('test'))
}

const settings = () => {
  ui.show('settings')
}

const logout = () => {
  console.log('Logged out')
}

module.exports = {
  signUp,
  signIn,
  settings,
  logout
}
