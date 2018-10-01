# API Documentation
### User Endpoints
#### "/user"
##### Method: POST
##### Request-Type: application/json
##### Parameters
"username": the username to be added
"password": the password of the user
"email": the email of the user
##### Return types
"200": json containing the newly created "UserId", "UserName", "UserPassword", and "Email"
"500": json describing that the email or username passed already exists