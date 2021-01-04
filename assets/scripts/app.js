'use strict'

/*

TODO:
== Deployment Requirements ==
- Deploy the project on Github pages

== Documentation Requirements ==
- Pin Repository as a Popular Repository
- Complete repository website and description field with a meaningful description and a live link to the website
- Create a README.md
- List technologies used in the README.md
- Include my planning and story about the develoment process, as well as my problem solving strategies
- Include a section of unadded features
- Include wireframes and user stories

*/

const events = require('./auth/events')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // Unauthenticated section
  $('#sign-up').on('submit', events.signUp)
  $('#sign-in').on('submit', events.signIn)

  // Both authenticated and Unauthenticated
  $('#home-link').on('click', events.home)

  // Authenticated section
  $('#logout-link').on('click', events.logout)
  $('#change-password').on('submit', events.changePassword)
  $('#new-game').on('click', events.newGame)
})
