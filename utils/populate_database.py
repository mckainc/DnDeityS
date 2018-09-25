import requests
import sys
import json
import MySQLdb

api_url = 'http://www.dnd5eapi.co/api/monsters'

# Get database info
db_name = 'dnd'
db_host = raw_input('Database hostname [localhost]: ')
if db_host == '':
    db_host = 'localhost'
db_username = raw_input('Database username [root]: ')
if db_username == '':
    db_username = 'root'
db_password = raw_input('Database password []: ')

# Connect to database
try:
    db = MySQLdb.connect(db_host, db_username, db_password, db_name)
    cursor = db.cursor()
except Exception, e:
    print('Error connecting to database: {0}'.format(e))
    sys.exit(-1)

# Call API
try:
    resp = requests.get(url=api_url)
    data = resp.json()
except Exception, e:
    print('Error retrieving data: {0}'.format(e))
    sys.exit(-1)

# Truncate (empty) table
print('\nTruncating Monsters table...')
cursor.execute('TRUNCATE TABLE Monsters')
print('Done.')

# Populate database with data from API
print('\nInserting rows into Monsters table from API data...')
num_rows = 0
for monster in data['results']:
    try:
        rows = cursor.execute('INSERT INTO Monsters(MonsterName, MonsterUrl) values("{0}", "{1}")'.format(monster['name'], monster['url']))
        num_rows += rows
    except Exception, e:
        print('Error inserting data into Monsters table: {0}'.format(e))
        sys.exit(-1)
try:
    db.commit()
    print('Done. {0} rows inserted into Monsters table.\n'.format(num_rows))
except Exception, e:
    print('Error committing inserts to Monsters table: {0}'.format(e))
    print('Rolling back.\n')
    db.rollback()

# Close database connection
db.close()

