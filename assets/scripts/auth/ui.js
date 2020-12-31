const store = require('./../store')

const pages = ['authenticated', 'unauthenticated', 'settings']

const show = (page) => {
  for (const i in pages) {
    if (page === pages[i]) {
      $(`.${page}`).show()
      console.log('showing ' + page)
    } else {
      $(`.${pages[i]}`).hide()
      console.log('hiding ' + pages[i])
    }
  }
}

const onSignUp = (data) => {
  alert('Successfully created your account!', 'success', false)
}

const onSignIn = (data) => {
  store.email = data.user.email
  store.token = data.user.token

  authenticated(true)
  alert('Successfully signed into <strong>' + store.email + '</strong>', 'success', true)
}

const alert = (message, type = 'success', authenticated) => {
  authenticated ? authenticated = 'authenticated' : authenticated = 'unauthenticated'
  $('.' + authenticated + ' .alert-container').html('<div class="alert alert-' + type + ' fade show" role="alert">' + message + '</div>')
  setTimeout(() => { $('.alert').alert('close') }, 8000) // Make alerts go away after 10 seconds
}

const authenticated = (yesno) => {
  if (yesno) {
    show('authenticated')
    $('.nav-link-authenticated').show()
  } else {
    show('unauthenticated')
    $('.nav-link-authenticated').hide()
  }
}

module.exports = {
  onSignUp,
  onSignIn,
  show,
  alert
}
