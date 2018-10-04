from flask import Flask
from flask import request
from flask import make_response
from flask import jsonify
from flask_cors import CORS
import mysql.connector
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import json
import sys

app = Flask(__name__)
CORS(app)

# check if in production or development
if app.config['ENV'] == 'development':
	from db_dev import *
else:
	from db_prod import *

@app.route('/')
def index():
    return "Hello, World!"

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/authenticate', methods=['POST'])
def authenticate_user():
	try:
		db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
		username = request.get_json(force=True)['username']
		password = request.get_json(force=True)['password']
		cur = db.cursor()
		cur.execute("select * from users where UserName = %s", (username,))
		for row in cur.fetchall():
			if row[2] == password:
				return make_response(jsonify({'UserId': row[0]}), 200)
			return make_response(jsonify({'error': 'bad password', 'user_id': row[0]}), 400)
		return make_response(jsonify({'error': 'bad username'}), 400)

	except KeyError as e:
		abort(500)

@app.route('/user', methods=['POST'])
def create_user():
	try:
		db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
		username = request.get_json(force=True)['username']
		password = request.get_json(force=True)['password']
		email = request.get_json(force=True)['email']
		# check if email/username are taken
		cur = db.cursor()
		cur.execute('select * from Users where UserName = %s', (username,))
		for row in cur:
			cur.close()
			db.close()
			return make_response(jsonify({'error': 'username is already taken'}), 500)

		cur.execute('select * from Users where UserEmail = %s', (email,))
		for row in cur:
			cur.close()
			db.close()
			return make_response(jsonify({'error': 'email is already taken'}), 500)

		# if neither are there..
		cur.execute('insert into Users (UserName, UserPassword, UserEmail) values (%s, %s, %s)', (username, password, email))
		db.commit()
		# get row and return
		cur.execute('select * from Users where UserName = %s', (username,))
		for row in cur:
			cur.close()
			db.close()
			return make_response(jsonify(row), 200)
	except KeyError as e:
		abort(500)

@app.route('/user/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	query = 'update users set '
	values_list = []
	try:
		username = request.get_json(force=True)['username']
		query += "UserName = %s, "
		values_list.append(username)
	except KeyError as e:
		username = ''
	try:
		password = request.get_json(force=True)['password']
		query += "UserPassword = %s, "
		values_list.append(password)
	except KeyError as e:
		password = ''
	try:
		email = request.get_json(force=True)['email']
		query += "UserEmail = %s, "
		values_list.append(email)
	except KeyError as e:
		email = ''
	query = query[:-2] + " where UserId = %s"
	values_list.append(user_id)

	cur.execute(query, tuple(values_list))
	db.commit()
	return make_response(jsonify({'UserId': user_id}), 200)


@app.route('/user/<string:username>', methods=['GET'])
def get_user(username):
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	cur.execute('select * from Users where UserName = %s', (username,))
	for row in cur:
		cur.close()
		db.close()
		return make_response(jsonify(row), 200)
	cur.close()
	db.close()
	return make_response(jsonify({'error': 'No User'}), 500)

@app.route('/user/<int:user_id>/resetpassword', methods=['POST'])
def reset_password(user_id):
	try:
		db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
		server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
		server.login(email_username, email_password)
		message = '\nClick this link in order to reset your password: http://localhost:3000/ChangePassword/' + str(user_id)
		message += '\n\nIf you did not request a password reset, please ignore this message\n'

		cur = db.cursor()
		cur.execute('select UserEmail from users where UserId = %s', (user_id,))
		# print(cur.fetchall(), file=sys.stderr)
		msg = MIMEMultipart()
		msg['To'] = cur.fetchall()[0][0]
		msg['From'] = 'dnddeityteam@gmail.com'
		msg['Subject'] = 'DnDeity Password Reset'
		msg.attach(MIMEText(message, 'plain'))

		server.send_message(msg)
		return make_response(jsonify({'email_sent': 'true'}), 200)
	except Exception as e:
		return make_response(jsonify({'error_sending_email': str(e)}), 500)

@app.route('/characters/<int:user_id>', methods=['GET'])
def get_characters(user_id):
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	cur.execute('select (CharacterId, CharacterName, CharacterRace, CharacterClass, CharacterExperience) from characters where UserId = %s', (user_id,))
	returned = []
	for row in cur.fetchall():
		returned.append(row)
	cur.close()
	db.close()
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Characters'}), 500)
	else:
		return make_response(jsonify(returned), 200)

@app.route('/character', methods=['POST'])
def create_character():
	try:
		name = request.get_json(force=True)['name']
		race = request.get_json(force=True)['race']
		dnd_class = request.get_json(force=True)['class']
		ability_scores = request.get_json(force=True)['ability_scores']
		equipment = request.get_json(force=True)['inventory']
		spells = request.get_json(force=True)['spells']
		choices = dict()
		choices['race'] = dict()
		choices['race']['language'] = request.get_json(force=True)['race_language_choice']
		choices['race']['proficiency'] = request.get_json(force=True)['race_proficiency_choice']
		choices['race']['trait'] = request.get_json(force=True)['race_trait_choice']
		choices['class'] = request.get_json(force=True)['class_proficiency_choices']
		description = request.get_json(force=True)['description']

		db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
		cur = db.cursor()
		cur.execute("select RaceId from races where RaceName = %s", (race,))
		race_id = cur.fetchall()[0][0]
		cur.execute("select ClassId from classes where ClassName = %s", (dnd_class,))
		class_id = cur.fetchall()[0][0]
		query = "insert into characters "
		query += "(RaceId, ClassId, CharacterName, CharacterExperience, CharacterHp, CharacterMaxHp, CharacterAbilityScores, CharacterGold, CharacterEquipment, CharacterChoices, CharacterSpells, CharacterDescription) "
		query += "values (%s, %s, %s, 0, 0, 0, %s, '0', %s, %s, %s, %s)"
		cur.execute(query, (race_id, class_id, name, json.dumps(ability_scores), json.dumps(equipment), json.dumps(choices), json.dumps(spells), json.dumps(description)))
		db.commit()
		cur.execute("select CharacterId from characters where CharacterName = %s", (name,))
		return make_response(jsonify({'CharacterId': cur.fetchall()[0][0]}), 200)

	except KeyError as e:
		abort(500)

@app.route('/character/<int:character_id>', methods=['GET', 'PATCH', 'DELETE'])
def get_update_delete_character(character_id):
	if request.method == 'GET':
		db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
		cur = db.cursor()
		cur.execute('select * from characters where CharacterId = %s', (character_id,))
		for row in cur.fetchall():
			return make_response(jsonify(row), 200)
		return make_response(jsonify({'error': 'no character with that id'}), 500)
	if request.method == 'DELETE':
		try:
			db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
			cur = db.cursor()
			cur.execute('delete from characters where CharacterId = %s', (character_id,))
			db.commit()
			return make_response(jsonify({'deleted_character': character_id}), 200)
		except Exception as e:
			return make_response(jsonify({'error': str(e)}), 500)
	if request.method == 'PATCH':
		db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
		cur = db.cursor()
		query = 'update characters set '
		values_list = []
		try:
			name = request.get_json(force=True)['name']
			query += "CharacterName = %s, "
			values_list.append(name)
		except KeyError as e:
			name = ''
		try:
			race = request.get_json(force=True)['race']
			cur.execute("select RaceId from races where RaceName = %s", (race,))
			race_id = cur.fetchall()[0][0]
			query += "RaceId = %s, "
			values_list.append(race_id)
		except KeyError as e:
			race = ''
		try:
			dnd_class = request.get_json(force=True)['class']
			cur.execute("select ClassId from classes where ClassName = %s", (dnd_class,))
			class_id = cur.fetchall()[0][0]
			query += "ClassId = %s, "
			values_list.append(class_id)
		except KeyError as e:
			dnd_class = ''
		try:
			ability_scores = request.get_json(force=True)['ability_scores']
			query += "CharacterAbilityScores = %s, "
			values_list.append(json.dumps(ability_scores))
		except KeyError as e:
			ability_scores = ''
		try:
			equipment = request.get_json(force=True)['inventory']
			query += "CharacterEquipment = %s, "
			values_list.append(json.dumps(equipment))
		except KeyError as e:
			equipment = ''
		try:
			spells = request.get_json(force=True)['spells']
			query += "CharacterSpells = %s, "
			values_list.append(json.dumps(spells))
		except KeyError as e:
			spells = ''
		try:
			choices = dict()
			choices['race'] = dict()
			choices['race']['language'] = request.get_json(force=True)['race_language_choice']
			choices['race']['proficiency'] = request.get_json(force=True)['race_proficiency_choice']
			choices['race']['trait'] = request.get_json(force=True)['race_trait_choice']
			choices['class'] = request.get_json(force=True)['class_proficiency_choices']
			query += "CharacterChoices = %s, "
			values_list.append(json.dumps(choices))
		except KeyError as e:
			choices = ''
		try:
			description = request.get_json(force=True)['description']
			query += "CharacterDescription = %s, "
			values_list.append(json.dumps(description))
		except KeyError as e:
			description = ''
		try:
			gold = request.get_json(force=True)['gold']
			query += "CharacterGold = %s, "
			values_list.append(json.dumps(gold))
		except KeyError as e:
			gold = ''
		try:
			hp = request.get_json(force=True)['hp']
			query += "CharacterHp = %s, "
			values_list.append(json.dumps(hp))
		except KeyError as e:
			hp = ''
		try:
			maxhp = request.get_json(force=True)['max_hp']
			query += "CharacterMaxHp = %s, "
			values_list.append(json.dumps(maxhp))
		except KeyError as e:
			maxhp = ''
		query = query[:-2] + " where CharacterId = %s"
		values_list.append(character_id)

		cur.execute(query, tuple(values_list))
		db.commit()
		return make_response(jsonify({'CharacterId': character_id}), 200)

@app.route('/spells', methods=['GET'])
def get_spells():
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	cur.execute('select * from Spells')
	returned = []
	for row in cur:
		returned.append(row)
	cur.close()
	db.close()
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Spells'}), 500)
	else:
		return make_response(jsonify(returned))

@app.route('/equipment', methods=['GET'])
def get_equipment():
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	cur.execute('select * from Equipments')
	returned = []
	for row in cur:
		returned.append(row)
	cur.close()
	db.close()
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Equipment'}), 500)
	else:
		return make_response(jsonify(returned))

@app.route('/classes', methods=['GET'])
def get_classes():
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	cur.execute('select * from Classes')
	returned = []
	for row in cur:
		returned.append(row)
	cur.close()
	db.close()
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Classes'}), 500)
	else:
		return make_response(jsonify(returned))

@app.route('/races', methods=['GET'])
def get_races():
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	cur.execute('select * from Races')
	returned = []
	for row in cur:
		returned.append(row)
	cur.close()
	db.close()
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Races'}), 500)
	else:
		return make_response(jsonify(returned))

@app.route('/monsters', methods=['GET'])
def get_monsters():
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	cur.execute('select * from Monsters')
	returned = []
	for row in cur:
		returned.append(row)
	cur.close()
	db.close()
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Monsters'}), 500)
	else:
		return make_response(jsonify(returned))
	
if __name__ == '__main__':
    app.run(debug=True)