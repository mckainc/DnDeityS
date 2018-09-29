import requests
import sys
import json
import MySQLdb


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
# Call API for classes

api_url = 'http://www.dnd5eapi.co/api/classes'

try:
    resp = requests.get(url=api_url)
    data = resp.json()
except Exception, e:
    print('Error retrieving data: {0}'.format(e))
    sys.exit(-1)

# Truncate (empty) table
try:
    print('\nTruncating Classess table...')
    cursor.execute('TRUNCATE TABLE Classes')
    print('Done.')
except Exception, e:
    print('Error truncating classes table: {0}'.format(e))
    sys.exit(-1)

# Populate database with data from API
print('\nInserting rows into Classes table from API data...')
num_rows = 0
for _class in data['results']:
    # Get class data
    print _class['url']
    try:
        c_resp = requests.get(url=_class['url'])
        c_data = c_resp.json()
    except Exception, e:
        print('Error retrieving class data: {0}'.format(e))
        sys.exit(-1)

    # Insert monster data into table
    try:
        query = 'INSERT INTO Classes(ClassName, ClassData) values(%s, %s);'
        rows = cursor.execute(query, (_class['name'], c_data))
        num_rows += rows
    except Exception, e:
        print('Error inserting data into Classs table: {0}'.format(e))
        sys.exit(-1)

# Commit changes
try:
    db.commit()
    print('Done. {0} rows inserted into Classes table.\n'.format(num_rows))
except Exception, e:
    print('Error committing inserts to Classes table: {0}'.format(e))
    print('Rolling back.\n')
    db.rollback()


# Call API for races

api_url = 'http://www.dnd5eapi.co/api/races'
try:
    resp = requests.get(url=api_url)
    data = resp.json()
except Exception, e:
    print('Error retrieving data: {0}'.format(e))
    sys.exit(-1)

# Truncate (empty) table
try:
    print('\nTruncating Races table...')
    cursor.execute('TRUNCATE TABLE Races')
    print('Done.')
except Exception, e:
    print('Error truncating races table: {0}'.format(e))
    sys.exit(-1)

# Populate database with data from API
print('\nInserting rows into Races table from API data...')
num_rows = 0
for race in data['results']:
    # Get  data
    print race['url']
    try:
        r_resp = requests.get(url=race['url'])
        r_data = r_resp.json()
    except Exception, e:
        print('Error retrieving race data: {0}'.format(e))
        sys.exit(-1)

    # Insert race data into table
    try:
        query = 'INSERT INTO Races(RaceName, RaceData) values(%s, %s);'
        rows = cursor.execute(query, (race['name'], r_data))
        num_rows += rows
    except Exception, e:
        print('Error inserting data into Races table: {0}'.format(e))
        sys.exit(-1)

# Commit changes
try:
    db.commit()
    print('Done. {0} rows inserted into Races table.\n'.format(num_rows))
except Exception, e:
    print('Error committing inserts to Races table: {0}'.format(e))
    print('Rolling back.\n')
    db.rollback()




# Call API for spells


api_url = 'http://www.dnd5eapi.co/api/spells'
try:
    resp = requests.get(url=api_url)
    data = resp.json()
except Exception, e:
    print('Error retrieving data: {0}'.format(e))
    sys.exit(-1)

# Truncate (empty) table
try:
    print('\nTruncating Spells table...')
    cursor.execute('TRUNCATE TABLE Spells')
    print('Done.')
except Exception, e:
    print('Error truncating spells table: {0}'.format(e))
    sys.exit(-1)

# Populate database with data from API
print('\nInserting rows into Spells table from API data...')
num_rows = 0
for spell in data['results']:
    # Get spell data
    print spell['url']
    try:
        s_resp = requests.get(url=spell['url'])
        s_data = s_resp.json()
    except Exception, e:
        print('Error retrieving spell data: {0}'.format(e))
        sys.exit(-1)

    # Insert spell data into table
    try:
        query = 'INSERT INTO Spells(SpellName, SpellData) values(%s, %s);'
        rows = cursor.execute(query, (spell['name'], s_data))
        num_rows += rows
    except Exception, e:
        print('Error inserting data into Spells table: {0}'.format(e))
        sys.exit(-1)

# Commit changes
try:
    db.commit()
    print('Done. {0} rows inserted into Spell table.\n'.format(num_rows))
except Exception, e:
    print('Error committing inserts to Spells table: {0}'.format(e))
    print('Rolling back.\n')
    db.rollback()


api_url =  'http://www.dnd5eapi.co/api/monsters'

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

