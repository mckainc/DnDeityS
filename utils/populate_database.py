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
try:
    print('\nTruncating Monsters table...')
    cursor.execute('TRUNCATE TABLE Monsters')
    print('Done.')
except Exception, e:
    print('Error truncating monsters table: {0}'.format(e))
    sys.exit(-1)

# Populate database with data from API
print('\nInserting rows into Monsters table from API data...')
num_rows = 0
for monster in data['results']:
    # Get monster data
    print monster['url']
    try:
        m_resp = requests.get(url=monster['url'])
        m_data = m_resp.json()
    except Exception, e:
        print('Error retrieving monster data: {0}'.format(e))
        sys.exit(-1)

    # Insert monster data into table
    try:
        query = 'INSERT INTO Monsters(MonsterName, MonsterData) values(%s, %s);'
        rows = cursor.execute(query, (monster['name'], m_data))
        num_rows += rows
    except Exception, e:
        print('Error inserting data into Monsters table: {0}'.format(e))
        sys.exit(-1)

# Commit changes
try:
    db.commit()
    print('Done. {0} rows inserted into Monsters table.\n'.format(num_rows))
except Exception, e:
    print('Error committing inserts to Monsters table: {0}'.format(e))
    print('Rolling back.\n')
    db.rollback()

# Close database connection
db.close()

