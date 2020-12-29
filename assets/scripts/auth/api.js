const url = 'https://tic-tac-toe-api-development.herokuapp.com'

const signUp = (credentials) => {
  return $.ajax({
    url: url + '/sign-up',
    type: 'post',
    data: credentials
  })
}

module.exports = {
  signUp
}
