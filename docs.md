# API Documentation
## User Endpoints
### "/authenticate"
#####    Method: POST
#####    Request-Type: application/json
#####    Parameters
     "username": the username to be added
     "password": the password of the user
#####    Return types
     "200": json containing the "UserId"
     "400": json containing the error, either bad password or bad username
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
### "user/[user_id] !!!UNTESTED!!!"
#####    Method: PATCH
#####    Request-Type: application/json
#####    Parameters
     "username": the username to be updated
     "password": the password of the user to be updated
     "email": the email of the user to be updated
#####    Return types
     "200": the id of the user
### "user/[username]"
#####    Method: GET
#####    Request-Type: application/json
#####    Parameters
     None
#####    Return types
     "200": json containing the "UserId", "UserName", "UserPassword", and "Email" that matches the username in the uri
     "500": there is not user with the given username
### "/user/[user_id]/resetpassword"
#####    Method: POST
#####    Request-Type: application/json
#####    Parameters
     None
#####    Return types
     "200": confirming the sent email
     "500": there was an error sending the email

## Character Endpoints
### "/character"
#####    Method: POST
#####    Request-Type: application/json
#####    Parameters
     FORMAT "[field_name]": [field_type]
     ===================================
     "name": STRING,
     "race": STRING,
     "race_language_choice": STRING,
     "race_proficiency_choice": STRING,
     "race_trait_choice": STRING,
     "class": STRING,
     "class_proficiency_choices": JSON_ARRAY,
     "ability_scores": JSON_ARRAY
     "inventory": JSON_ARRAY
     "spells": JSON_ARRAY
     "description": JSON_ARRAY/JSON_OBJECT
#####    Return types
     "200": new created CharacterId
### "characters/[user_id]" !!!Untested!!!
#####    Method: GET
#####    Request-Type: application/json
#####    Parameters
     None
#####    Return types
     "200": json containing an array of characters for a particular user_id
### "character/[character_id]" !!!UNTESTED!!!
#####    Method: GET
#####    Request-Type: application/json
#####    Parameters
     None
#####    Return types
     "200": json containing the character specified by the character_id
### "character/[character_id]"
#####    Method: PATCH
#####    Request-Type: application/json
#####    Parameters
     Any (doesn't have to be all) of the character fields
     FORMAT "[field_name]": [field_type]
     ===================================
     "name": STRING,
     "race": STRING,
     "race_language_choice": STRING,
     "race_proficiency_choice": STRING,
     "race_trait_choice": STRING,
     "class": STRING,
     "class_proficiency_choices": JSON_ARRAY,
     "ability_scores": JSON_ARRAY
     "inventory": JSON_ARRAY
     "spells": JSON_ARRAY
     "description": JSON_ARRAY/JSON_OBJECT
     "gold": JSON_ARRAY?,
     "hp": INT?,
     "max_hp": INT?

#####    Return types
     "200": json containing the character specified by the character_id
### "character/[character_id]"
#####    Method: DELETE
#####    Request-Type: application/json
#####    Parameters
     None
#####    Return types
     "200": the id deleted

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