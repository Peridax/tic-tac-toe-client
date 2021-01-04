const store = require('./../store')

const pages = ['authenticated', 'unauthenticated']

let globalTimeout

const toggleForm = (form, state) => {
  if (state === true) {
    $(`#${form}`).find('button').removeClass('disabled')
  } else {
    $(`#${form}`).find('button').addClass('disabled')
  }
}

const show = (page) => {
  for (const i in pages) {
    if (page === pages[i]) {
      $(`.${page}`).show()
    } else {
      $(`.${pages[i]}`).hide()
    }
  }
}

const navUpdate = (page) => {
  if (store.token) {
    $('nav').find('.active').removeClass('active')
    $(`.${page}`).addClass('active')
  } else {
    $('.nav-link-authenticated').hide()
  }
}

const onSignUp = (data) => {
  alert('Successfully created your account!', 'success', false)
}

const onSignIn = () => {
  authenticated(true)
  alert('Successfully signed into <strong>' + store.user.email + '</strong>', 'success', true)
}

const onLogout = () => {
  authenticated(false)
  alert('Successfully signed out', 'success', false)
  store.user = null
  store.game = null
}

const onChangePassword = () => {
  alert('Successfully changed your password', 'success', true)
}

const alert = (message, type = 'success', authenticated) => {
  if (globalTimeout) { clearTimeout(globalTimeout) }
  authenticated ? authenticated = 'authenticated' : authenticated = 'unauthenticated'
  $('.' + authenticated + ' .alert-container').html('<div class="alert alert-' + type + ' fade show" role="alert">' + message + '</div>')
  globalTimeout = setTimeout(() => { $('.alert').alert('close') }, 8000) // Make alerts go away after 10 seconds
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

const game = {
  updateElements: (key) => {
    if (key) {
      $('#new-game').attr('disabled', true)
      $('table').addClass('active-game')
    } else {
      $('#new-game').removeAttr('disabled')
      $('table').removeClass('active-game')
    }
  },
  resetBoard: () => {
    $('table td').removeClass('x o temp-x temp-o')
  },
  updateGameCount: (number) => {
    $('#games-played').text(number)
  }
}

module.exports = {
  onSignUp,
  onSignIn,
  show,
  toggleForm,
  navUpdate,
  onLogout,
  onChangePassword,
  game,
  alert
}
