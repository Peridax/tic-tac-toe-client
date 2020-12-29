const api = require('./api')
const ui = require('./ui')
const errorHandler = require('./error-handler.js')

const getFormFields = require('./../../../lib/get-form-fields')

const signUp = (event) => {
  event.preventDefault()

  const credentials = getFormFields(event.target)
  event.target.reset()

  api.signUp(credentials)
    .then(ui.onSignUp)
    .catch((error) => errorHandler.signUp(error, credentials))
}

const signIn = (event) => {
  event.preventDefault()

  const credentials = getFormFields(event.target)
  event.target.reset()

  api.signIn(credentials)
    .then(ui.onSignIn)
    .catch((error) => error.Handler.signIn(error, credentials))
}

module.exports = {
  signUp,
  signIn
}
