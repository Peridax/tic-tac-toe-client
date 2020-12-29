curl "https://tic-tac-toe-api-development.herokuapp.com/sign-up" \
  --include \
  --request POST \
  --headers "Content-type: application/json" \
  --data '{
    "credentials": {
      "email": "e@"
    }
  }'
