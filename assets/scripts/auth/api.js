const url = 'https://tic-tac-toe-api-development.herokuapp.com'

const signUp = (credentials) => {
  return $.ajax({
    url: url + '/sign-up',
    method: 'POST',
    data: credentials
  })
}

const signIn = (credentials) => {
  return $.ajax({
    url: url + '/sign-in',
    method: 'POST',
    data: credentials
  })
}

const changePassword = (credentials, token) => {
  return $.ajax({
    url: url + '/change-password',
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: credentials
  })
}

const logout = (token) => {
  return $.ajax({
    url: url + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  logout
}
