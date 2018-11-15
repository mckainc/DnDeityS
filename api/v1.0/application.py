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

application = Flask(__name__)
CORS(application)

# check if in production or development
if application.config['ENV'] == 'development':
	from db_dev import *
else:
	from db_prod import *

@application.route('/')
def index():
    return "Hello, World!"

@application.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@application.route('/authenticate', methods=['POST'])
def authenticate_user():
	try:
		db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
		username = request.get_json(force=True)['username']
		password = request.get_json(force=True)['password']
		cur = db.cursor()
		cur.execute("select * from users where UserName = %s", (username,))
		for row in cur.fetchall():
			if row[2] == password:
				cur.close()
				db.close()
				return make_response(jsonify({'UserId': row[0]}), 200)
			cur.close()
			db.close()
			return make_response(jsonify({'error': 'bad password', 'user_id': row[0]}), 400)
		cur.close()
		db.close()
		return make_response(jsonify({'error': 'bad username'}), 400)

	except KeyError as e:
		cur.close()
		db.close()
		abort(500)

@application.route('/user', methods=['POST'])
def create_user():
	try:
		db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
		username = request.get_json(force=True)['username']
		password = request.get_json(force=True)['password']
		email = request.get_json(force=True)['email']
		userhash = hash(username)
		# check if email/username are taken
		cur = db.cursor()
		cur.execute('select * from users where UserName = %s', (username,))
		for row in cur:
			cur.close()
			db.close()
			return make_response(jsonify({'error': 'username is already taken'}), 500)

		cur.execute('select * from users where UserEmail = %s', (email,))
		for row in cur:
			cur.close()
			db.close()
			return make_response(jsonify({'error': 'email is already taken'}), 500)

		# if neither are there..
		cur.execute('insert into users (UserName, UserPassword, UserEmail, UserHash) values (%s, %s, %s, %s)', (username, password, email, userhash))
		db.commit()
		# get row and return
		#cur.execute('select * from users where UserName = %s', (username,))
		#for row in cur:
		#	cur.close()
		#	db.close()
		#	return make_response(jsonify(row), 200)
	#except KeyError as e:
	cur.close()
	db.close()
	return make_response(jsonify(userhash), 200)

@application.route('/user/<int:user_id>', methods=['PATCH'])
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
	cur.close()
	db.close()
	return make_response(jsonify({'UserId': user_id}), 200)


@application.route('/user/<string:username>', methods=['GET'])
def get_user(username):
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	cur.execute('select * from users where UserName = %s', (username,))
	for row in cur:
		cur.close()
		db.close()
		return make_response(jsonify(row), 200)
	cur.close()
	db.close()
	return make_response(jsonify({'error': 'No User'}), 500)

@application.route('/user/<int:user_id>/resetpassword', methods=['POST'])
def reset_password(user_id):
	try:
		db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
		cur = db.cursor()

		server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
		server.login(email_username, email_password)
		message = '\nClick this link in order to reset your password: http://localhost:3000/ChangePassword/' + str(user_id)
		message += '\n\nIf you did not request a password reset, please ignore this message\n'
		cur.execute('select UserEmail from users where UserId = %s', (user_id,))
		# print(cur.fetchall(), file=sys.stderr)
		msg = MIMEMultipart()
		msg['To'] = cur.fetchall()[0][0]
		msg['From'] = 'dnddeityteam@gmail.com'
		msg['Subject'] = 'DnDeity Password Reset'
		msg.attach(MIMEText(message, 'plain'))

		server.send_message(msg)
		cur.close()
		db.close()
		return make_response(jsonify({'email_sent': 'true'}), 200)
	except Exception as e:
		cur.close()
		db.close()
		return make_response(jsonify({'error_sending_email': str(e)}), 500)

@application.route('/characters/<int:user_id>', methods=['GET'])
def get_characters(user_id):
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	query = 'select characters.CharacterId as CharacterId, characters.CharacterName as CharacterName, races.RaceName as RaceName, classes.ClassName as ClassName, characters.CharacterExperience as Experience '
	query += 'from characters inner join classes on characters.ClassId=classes.ClassId inner join races on characters.RaceId=races.RaceId where characters.UserId = %s'
	cur.execute(query, (user_id,))
	returned = []
	for row in cur.fetchall():
		returned.append(row)
	cur.close()
	db.close()
	return make_response(jsonify(returned), 200)
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Characters'}), 500)
	else:
		return make_response(jsonify(returned), 200)

@application.route('/character', methods=['POST'])
def create_character():
	try:
		db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
		cur = db.cursor()
		query = 'insert into characters'
		values = '('
		fields = '('
		values_list = []
		try:
			userId = request.get_json(force=True)['user_id']
			fields += "UserId, "
			values += "%s, "
			values_list.append(userId)
		except KeyError as e:
			userId = ''
		try:
			name = request.get_json(force=True)['name']
			fields += "CharacterName, "
			values += "%s, "
			values_list.append(name)
		except KeyError as e:
			name = ''
		try:
			race = request.get_json(force=True)['race']
			cur.execute("select RaceId from races where RaceName = %s", (race,))
			race_id = cur.fetchall()[0][0]
			fields += "RaceId, "
			values += "%s, "
			values_list.append(race_id)
		except KeyError as e:
			race = ''
		try:
			dnd_class = request.get_json(force=True)['class']
			cur.execute("select ClassId from classes where ClassName = %s", (dnd_class,))
			class_id = cur.fetchall()[0][0]
			fields += "ClassId, "
			values += "%s, "
			values_list.append(class_id)
		except KeyError as e:
			dnd_class = ''
		try:
			ability_scores = request.get_json(force=True)['ability_scores']
			fields += "CharacterAbilityScores, "
			values += "%s, "
			values_list.append(json.dumps(ability_scores))
		except KeyError as e:
			ability_scores = ''
		try:
			equipment = request.get_json(force=True)['inventory']
			fields += "CharacterEquipment, "
			values += "%s, "
			values_list.append(json.dumps(equipment))
		except KeyError as e:
			equipment = ''
		try:
			spells = request.get_json(force=True)['spells']
			fields += "CharacterSpells, "
			values += "%s, "
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
			fields += "CharacterChoices, "
			values += "%s, "
			values_list.append(json.dumps(choices))
		except KeyError as e:
			choices = ''
		try:
			description = request.get_json(force=True)['description']
			fields += "CharacterDescription, "
			values += "%s, "
			values_list.append(json.dumps(description))
		except KeyError as e:
			description = ''
		try:
			gold = request.get_json(force=True)['gold']
			fields += "CharacterGold, "
			values += "%s, "
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
		query += " " + fields[:-2] + ") values " + values[:-2] + ")"
		#print(query, file=sys.stderr)

		cur.execute(query, tuple(values_list))
		db.commit()
		cur.close()
		db.close()
		return make_response(jsonify({'CharacterId': cur.lastrowid}), 200)

	except Exception as e:
		cur.close()
		db.close()
		return make_response(jsonify({'error': str(e)}), 500)

@application.route('/character/<int:character_id>', methods=['GET', 'PATCH', 'DELETE'])
def get_update_delete_character(character_id):
	if request.method == 'GET':
		db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
		cur = db.cursor()
		cur.execute('select CharacterId, UserId, races.RaceName, classes.ClassName, CharacterName, CharacterExperience, CharacterHp, CharacterMaxHp, CharacterAbilityScores, CharacterGold, CharacterEquipment, CharacterChoices, CharacterChoices, CharacterSpells, CharacterDescription from characters inner join classes on classes.ClassId=characters.ClassId inner join races on races.RaceId=characters.RaceId where CharacterId = %s', (character_id,))
		for row in cur.fetchall():
			cur.close()
			db.close()
			return make_response(jsonify(row), 200)
		cur.close()
		db.close()
		return make_response(jsonify({'error': 'no character with that id'}), 500)
	if request.method == 'DELETE':
		try:
			db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
			cur = db.cursor()
			cur.execute('delete from characters where CharacterId = %s', (character_id,))
			db.commit()
			cur.close()
			db.close()
			return make_response(jsonify({'deleted_character': character_id}), 200)
		except Exception as e:
			cur.close()
			db.close()
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
		cur.close()
		db.close()
		return make_response(jsonify({'CharacterId': character_id}), 200)

@application.route('/spells', methods=['GET'])
def get_spells():
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	cur.execute('select * from spells')
	returned = []
	for row in cur:
		returned.append(row)
	cur.close()
	db.close()
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Spells'}), 500)
	else:
		return make_response(jsonify(returned))

@application.route('/feats', methods=['GET'])
def get_feats():
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	cur.execute('select * from feats')
	returned = []
	for row in cur:
		returned.append(row)
	cur.close()
	db.close()
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Feats'}), 400)
	else:
		return make_response(jsonify(returned))


@application.route('/equipment', methods=['GET'])
def get_equipment():
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	cur.execute('select * from equipments')
	returned = []
	for row in cur:
		returned.append(row)
	cur.close()
	db.close()
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Equipment'}), 500)
	else:
		return make_response(jsonify(returned))

@application.route('/classes', methods=['GET'])
def get_classes():
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	cur.execute('select * from classes')
	returned = []
	for row in cur:
		returned.append(row)
	cur.close()
	db.close()
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Classes'}), 500)
	else:
		return make_response(jsonify(returned))

@application.route('/races', methods=['GET'])
def get_races():
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	cur.execute('select * from races')
	returned = []
	for row in cur:
		returned.append(row)
	cur.close()
	db.close()
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Races'}), 500)
	else:
		return make_response(jsonify(returned))
@application.route ('/backgrounds', methods=['GET'])
def get_backgrounds():
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	cur.execute('select * from backgrounds')
	returned = []
	for row in cur:
		returned.append(row)
	cur.close()
	db.close()
	if len(returned)==0:
		return make_response(jsonify({'error' : 'No Backgrounds'}), 500)
	else:
		return make_response(jsonify(returned))

@application.route('/monsters', methods=['GET'])
def get_monsters():
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	cur.execute('select * from monsters')
	returned = []
	for row in cur:
		returned.append(row)
	cur.close()
	db.close()
	if len(returned) == 0:
		return make_response(jsonify({'error': 'No Monsters'}), 500)
	else:
		return make_response(jsonify(returned))
@application.route('/features', methods=['POST'])
def get_feature():
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	classname = request.get_json(force=True)['charClass']
	level = request.get_json(force=True)['level']
	query = 'select * from features where FeatureLevel='
	query += str(level)
	query += ' and ClassName=\''
	query += classname
	query += '\';'
	cur.execute(query)
	returned = []
	for row in cur.fetchall():
		returned.append(row)
	cur.close()
	db.close()
	return make_response(jsonify(returned), 200)

@application.route('/subclass/<int:class_id>', methods=['GET'])
def get_subclass(class_id):
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	cur.execute('select classes.ClassName from classes where classes.ClassId=%s', (class_id,))
	class_name = cur.fetchone()[0]
	cur.execute('select subclasses.SubclassData from subclasses where subclasses.ClassName=%s', (class_name,))
	returned= cur.fetchone()
#	for row in cur.fetchall():
#		returned.append(row)
	cur.close()
	db.close()
	return make_response(jsonify(returned), 200)

@application.route('/map', methods=['POST'])
def create_map():
	try:
		db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
		cur = db.cursor()
		query = 'insert into maps'
		values = '('
		fields = '('
		values_list = []
		try:
			userId = request.get_json(force=True)['user_id']
			fields += "UserId, "
			values += "%s, "
			values_list.append(userId)
		except KeyError as e:
			userId = ''
		try:
			name = request.get_json(force=True)['name']
			fields += "MapName, "
			values += "%s, "
			values_list.append(name)
		except KeyError as e:
			name = ''
		try: 
			height = request.get_json(force=True)['height']
			fields += "MapHeight, "
			values += "%s, "
			values_list.append(height)
		except KeyError as e:
			height = ''
		try:
			width = request.get_json(force=True)['width']
			fields += "MapWidth, "
			values += "%s, "
			values_list.append(width)
		except KeyError as e:
			width = ''
		try:
			tiles = request.get_json(force=True)['tiles']
			fields += "MapTiles, "
			values += "%s, "
			values_list.append(json.dumps(tiles, separators=(',',':')))
		except KeyError as e:
			tiles=''
		query += " " + fields[:-2] + ") values " + values[:-2] + ")"
		#print(query, file-sys.stderr)

		cur.execute(query, tuple(values_list))
		db.commit()
		cur.close()
		db.close()
		return make_response(jsonify({'CharacterId': cur.lastrowid}), 200)
	except Exception as e:
		cur.close()
		db.close()
		return make_response(jsonify({'error': str(e)}), 400)
@application.route('/map/<int:map_id>', methods=['GET', 'PATCH', 'DELETE'])
def get_update_delete_map(map_id):
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	if request.method == 'GET':
		cur.execute('select * from maps where MapId = %s', (map_id,))
		for row in cur.fetchall():
			cur.close()
			db.close()
		return make_response(jsonify(row), 200)
		cur.close()
		db.close()
		return make_response(jsonify({'error': 'no character with that id'}), 400)
	if request.method == 'DELETE':
		try:
			cur.execute('delete from maps where MapId = %s', (map_id,))
			db.commit()
			cur.close()
			db.close()
			return make_response(jsonify({'deleted_map' : map_id}), 200)
		except Exception as e:
			cur.close()
			db.close()
			return make_response(jsonify({'no_map': str(e)}), 400) 
	if request.method == 'PATCH':
		query = 'update maps set '
		values = '('
		fields = '('
		values_list = []
		try:
			userId = request.get_json(force=True)['user_id']
			query += "UserId = %s, "
			values_list.append(userId)
		except KeyError as e:
			userId = ''
		try:
			name = request.get_json(force=True)['name']
			query += "MapName = %s, "
			values_list.append(name)
		except KeyError as e:
			name = ''
		try:
			height = request.get_json(force=True)['height']
			query += "MapHeight = %s, "
			values_list.append(height)
		except KeyError as e:
			height = ''		
		try:
			width = request.get_json(force=True)['width']
			query += "MapWidth = %s, "
			values_list.append(width)
		except KeyError as e:
			width = ''
		try:
			tiles = request.get_json(force=True)['tiles']
			query += "MapTiles = %s, "
			values_list.append(json.dumps(tiles, separators=(',',':')))
		except KeyError as e:
			tiles=''
		query = query[:-2] + " where MapId = %s"
		values_list.append(map_id)
		cur.execute(query, tuple(values_list))
		db.commit()
		cur.close()
		db.close()
		return make_response(jsonify({'MapId_updated': map_id}), 200)
@application.route('/maps/<int:user_id>', methods=['GET'])
def get_maps(user_id):
	db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
	cur = db.cursor()
	query = 'select * from maps where UserId = %s;'
	cur.execute(query, (user_id,))
	returned = []
	for row in cur.fetchall():
		returned.append(row)
	cur.close()
	db.close()
	return make_response(jsonify(returned), 200)

if __name__ == '__main__':
    application.run(debug=True)
