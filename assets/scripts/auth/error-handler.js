/*
Why create this? The reason is because the API lacks proper
responses, which left me wondering why I couldn't sign up when
in reality the user was already created. I then decided to create
an error handler to avoid paining myself in the future with this
or anyone else that uses this.
*/

const ui = require('./ui')

const signUp = (error, credentials) => {
  console.log(credentials)
  if (error.status === 422) {
    const passInput = credentials.credentials.password
    const passInputConfirm = credentials.credentials.password_confirmation
    if (passInput.length && passInputConfirm.length) {
      if (passInput === passInputConfirm) {
        ui.alert('That email is already in use!', 'danger', false)
      } else {
        ui.alert('Both passwords have to match', 'danger', false)
      }
    } else {
      ui.alert('Password fields cannot be empty', 'danger', false)
    }
  } else {
    ui.alert('Error status: ' + error.status, 'danger', false)
  }
}

const signIn = (error, credentials) => {
  console.log(error, credentials)
}

module.exports = {
  signUp,
  signIn
}
