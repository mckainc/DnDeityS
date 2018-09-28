from flask import Flask
from flask import request
from flask import make_response
from flask import jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)

# check if in production or development
if app.config['DEBUG']:
	from db_dev import *
else:
	from db_prod import *

@app.route('/')
def index():
    return "Hello, World!"

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/user', methods=['POST'])
def create_user():
	try:
		username = request.json()['username']
		password = request.json()['password']
		email = request.json()['email']
		# check if email/username are taken
		# connect to database
		app['MYSQL_HOST'] = db_dnd_host
		app['MYSQL_USER'] = db_dnd_user
		app['MYSQL_PASSWORD'] = db_dnd_passsword
		app['MYSQL_DB'] = db_dnd
		db = MySQL(app)
		cur = db.connection.cursor()
		cur.execute('''select * from users where UserName = %s''' % username)
		print(cur.fetchall())
	except KeyError as e:
		abort(400)

@app.route('/user/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
	try:
		username = request.json()['username']
		password = request.json()['password']
		email = request.json()['email']
		# update user using user_id
	except KeyError as e:
		abort(400)

@app.route('/user/<username>', methods=['GET'])
def get_user(username):
	abort(400)
	# return user_id

@app.route('/character', methods=['POST'])
def create_character():
	
if __name__ == '__main__':
    app.run(debug=True)