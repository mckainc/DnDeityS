from flask import Flask
from flask import request
from flask import make_response
from flask import jsonify
import mysql.connector

app = Flask(__name__)

# check if in production or development
if app.config['DEBUG']:
	from db_dev import *
else:
	from db_prod import *

db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)

@app.route('/')
def index():
    return "Hello, World!"

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/user', methods=['POST'])
def create_user():
	try:
		username = request.get_json(force=True)['username']
		password = request.get_json(force=True)['password']
		email = request.get_json(force=True)['email']
		# check if email/username are taken
		cur = db.cursor()
		cur.execute('select * from users where UserName = %s', (username,))
		for row in cur:
			cur.close()
			return make_response(jsonify({'error': 'username is already taken'}), 500)

		cur.execute('select * from users where Email = %s', (email,))
		for row in cur:
			cur.close()
			return make_response(jsonify({'error': 'email is already taken'}), 500)

		# if neither are there..
		cur.execute('insert into users (UserName, UserPassword, Email) values (%s, %s, %s)', (username, password, email))
		db.commit()
		for row in cur:
			cur.close()
			return make_response(jsonify(row), 200)
	except KeyError as e:
		abort(400)

@app.route('/user/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
	try:
		username = request.get_json(force=True)['username']
		password = request.get_json(force=True)['password']
		email = request.get_json(force=True)['email']
		# update user using user_id


	except KeyError as e:
		abort(400)

@app.route('/user/<string:username>', methods=['GET'])
def get_user(username):
	cur = db.cursor()
	cur.execute('select * from users where UserName = %s', (username,))
	for row in cur:
		cur.close()
		return make_response(jsonify(row), 200)
	cur.close()
	return make_response(jsonify({'error': 'No User'}), 500)

@app.route('/characters/<int:user_id>', methods=['GET'])
def get_characters(user_id):
	cur = db.cursor()
	cur.execute('select * from characters where UserId = %s', (user_id,))

@app.route('/character', methods=['POST'])
def create_character():
	try:
		name = request.get_json()['name']
		race = request.get_json()['race']
		description = request.get_json()['description']
		
	except KeyError as e:
		abort(400)

@app.route('/character/<int:character_id>', methods=['GET'])
def get_character_by_id(character_id):
	cur = db.cursor()
	cur.execute('select * from characters where CharacterId = %s', (character_id,))
	
if __name__ == '__main__':
    app.run(debug=True)