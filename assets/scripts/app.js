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

== Application Requirements ==
- Signed in user user must be able to start a tic tac toe game
- When playing game, user must start as X and then rotate between X and O
- When playing game, user must only select available spaces on the board
- When playing game, user must be notified when win, loss or tie occurs
- Once a game is over, user must not be able to add to that board
- Once a game is over, user must be able to play again
- Signed in user must be able to view number of games played

== API Requirements ==
- New game POST /games
- Update game PATCH /games/:id
- View number of games played GET /games



SCHEDULE:
== Friday ==
- Complete the entire game aspect/logic of the application

== Saturday ==
- Finish the landing page panel
- Finish the instructions panel when logged in
- Begin the README.md

== Sunday ==
- Complete all the documentation requirements
- Deploy the project on Github Pages
- Polish anything if needed, refactor code if needed, make sure everything is clean

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
})
