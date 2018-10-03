from flask import Flask
from flask import request
from flask import make_response
from flask import jsonify
import mysql.connector
import smtplib

app = Flask(__name__)

# check if in production or development
if app.config['ENV'] == 'development':
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
		cur.execute('select * from Users where UserName = %s', (username,))
		for row in cur:
			cur.close()
			return make_response(jsonify({'error': 'username is already taken'}), 500)

		cur.execute('select * from Users where Email = %s', (email,))
		for row in cur:
			cur.close()
			return make_response(jsonify({'error': 'email is already taken'}), 500)

		# if neither are there..
		cur.execute('insert into Users (UserName, UserPassword, UserEmail) values (%s, %s, %s)', (username, password, email))
		db.commit()
		# get row and return
		cur.execute('select * from Users where UserName = %s', (username,))
		for row in cur:
			cur.close()
			return make_response(jsonify(row), 200)
	except KeyError as e:
		abort(500)

# TODO!!!!
@app.route('/user/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
	try:
		username = request.get_json(force=True)['username']
		password = request.get_json(force=True)['password']
		email = request.get_json(force=True)['email']
		# update user using user_id

	except KeyError as e:
		abort(500)

@app.route('/user/<string:username>', methods=['GET'])
def get_user(username):
	cur = db.cursor()
	cur.execute('select * from Users where UserName = %s', (username,))
	for row in cur:
		cur.close()
		return make_response(jsonify(row), 200)
	cur.close()
	return make_response(jsonify({'error': 'No User'}), 500)

@app.route('/user/<int:user_id>/resetpassword', methods=['POST'])
def reset_password(user_id):
	server = smtplib.SMTP('smtp.gmail.com', 587)
	server.login(email_username, email_password)
	message = '''
	This is the link for you to reset your password: &&
	
	If you did not request a password reset, please ignore this message
	'''
	cur = db.cursor()
	cur.execute('select UserEmail from Users where UserId = %s', (user_id,))
	server.send_message(message)

@app.route('/characters/<int:user_id>', methods=['GET'])
def get_characters(user_id):
	cur = db.cursor()
	cur.execute('select (class, level, background, alignment, race, experience) from Characters where UserId = %s', (user_id,))
	returned = []
	for row in cur:
		returned.append(row)
	cur.close()
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Characters'}), 500)
	else:
		return make_response(jsonify(returned), 200)

@app.route('/character', methods=['POST'])
def create_character():
	try:
		name = request.get_json(force=True)['name']
		race = request.get_json(force=True)['race']
		description = request.get_json(force=True)['description']
		dnd_class = request.get_json(force=True)['class']
		traits = request.get_json(force=True)['traits']
		alignment = request.get_json(force=True)['alignment']
		background = request.get_json(force=True)['background']

	except KeyError as e:
		abort(500)

@app.route('/character/<int:character_id>', methods=['GET'])
def get_character_by_id(character_id):
	cur = db.cursor()
	cur.execute('select * from characters where CharacterId = %s', (character_id,))

@app.route('/spells', methods=['GET'])
def get_spells():
	cur = db.cursor()
	cur.execute('select * from Spells')
	returned = []
	for row in cur:
		returned.append(row)
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Spells'}), 500)
	else:
		return make_response(jsonify(returned))

@app.route('/equipment', methods=['GET'])
def get_equipment():
	cur = db.cursor()
	cur.execute('select * from Equipments')
	returned = []
	for row in cur:
		returned.append(row)
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Equipment'}), 500)
	else:
		return make_response(jsonify(returned))

@app.route('/classes', methods=['GET'])
def get_classes():
	cur = db.cursor()
	cur.execute('select * from Classes')
	returned = []
	for row in cur:
		returned.append(row)
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Classes'}), 500)
	else:
		return make_response(jsonify(returned))

@app.route('/races', methods=['GET'])
def get_races():
	cur = db.cursor()
	cur.execute('select * from Races')
	returned = []
	for row in cur:
		returned.append(row)
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Races'}), 500)
	else:
		return make_response(jsonify(returned))

@app.route('/monsters', methods=['GET'])
def get_monsters():
	cur = db.cursor()
	cur.execute('select * from Monsters')
	returned = []
	for row in cur:
		returned.append(row)
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Monsters'}), 500)
	else:
		return make_response(jsonify(returned))
	
if __name__ == '__main__':
    app.run(debug=True)