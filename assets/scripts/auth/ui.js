const store = require('./../store')

const onSignUp = (data) => {
  alert('Successfully created your account!', 'success', false)
}

const onSignIn = (data) => {
  console.log(data)
}

const alert = (message, type = 'success', authenticated) => {
  authenticated ? authenticated = 'authenticated' : authenticated = 'unauthenticated'
  $('.' + authenticated + ' .alert-container').html('<div class="alert alert-' + type + '" role="alert">' + message + '</div>')
}

module.exports = {
  onSignUp,
  alert
}
