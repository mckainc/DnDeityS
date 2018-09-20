from flask import Flask
from flask import request
from flask import make_response
from flask import jsonify
# check if in production or development
app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)