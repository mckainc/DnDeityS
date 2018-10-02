# API Documentation
## User Endpoints
### "/user"
#####    Method: POST
#####    Request-Type: application/json
#####    Parameters
     "username": the username to be added
     "password": the password of the user
     "email": the email of the user
#####    Return types
     "200": json containing the newly created "UserId", "UserName", "UserPassword", and "Email"
     "500": json describing that the email or username passed already exists
### "user/[user_id] !!!NOT FINISHED!!!"
#####    Method: PATCH
#####    Request-Type: application/json
#####    Parameters
     "username": the username to be updated
     "password": the password of the user to be updated
     "email": the email of the user to be updated
#####    Return types
     "200": json containing the newly created "UserId", "UserName", "UserPassword", and "Email"
### "user/[username]"
#####    Method: GET
#####    Request-Type: application/json
#####    Parameters
     None
#####    Return types
     "200": json containing the "UserId", "UserName", "UserPassword", and "Email" that matches the username in the uri
     "500": there is not user with the given username

## Character Endpoints
### "/character" !!!Not Finished!!!
#####    Method: POST
#####    Request-Type: application/json
#####    Parameters
     JSON TBD
#####    Return types
     "200": new created character
### "characters/[user_id]" !!!Untested!!!
#####    Method: GET
#####    Request-Type: application/json
#####    Parameters
     None
#####    Return types
     "200": json containing an array of characters for a particular user_id
### "character/[character_id]" !!!Not Finished!!!
#####    Method: GET
#####    Request-Type: application/json
#####    Parameters
     None
#####    Return types
     "200": json containing the character specified by the character_id

## DnD API data
### "/spells" !!!Untested!!!
#####    Method: GET
#####    Request-Type: application/json
#####    Parameters
     None
#####    Return types
     "200": list of all spells from the DnD API
### "/equipment" !!!Untested!!!
#####    Method: GET
#####    Request-Type: application/json
#####    Parameters
     None
#####    Return types
     "200": list of all equipment from the DnD API
### "/classes" !!!Untested!!!
#####    Method: GET
#####    Request-Type: application/json
#####    Parameters
     None
#####    Return types
     "200": list of all classes from the DnD API
### "/races" !!!Untested!!!
#####    Method: GET
#####    Request-Type: application/json
#####    Parameters
     None
#####    Return types
     "200": list of all races from the DnD API
### "/monsters" !!!Untested!!!
#####    Method: GET
#####    Request-Type: application/json
#####    Parameters
     None
#####    Return types
     "200": list of all monsters from the DnD API