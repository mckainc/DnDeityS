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

#Insert feats
#Feats.JSON
rows = 0
try:
	print('\nTruncating Feats table...')
	cursor.execute('TRUNCATE TABLE feats')
	print('Done.')
except Exception, e:
	print('Error truncating feats table: {0}'.format(e))
	sys.exit(-1)
with open('Feats.JSON') as f:
	data = json.load(f)
	for feat in data['feats']:
		try:
			jsonout = json.dumps(feat)
			jsonout = jsonout.replace("'", "\\'")
			query = 'INSERT INTO feats(FeatData) values(\'%s\');' % jsonout
			rows =1
			print(feat["id"]) 
			cursor.execute(query)
		except Exception, e:
			print('Error insterting data into feats table: {0}'.format(e))
	try:
		db.commit()
		print('Done. {0} rows inserted into feats table.\n'.format(rows))
	except Exception, e:
		print('Error committing data into feats table: {0}\n'.format(e))
		db.rollback()
#Call API for equipment

api_url = 'http://www.dnd5eapi.co/api/equipment'

try:
    resp = requests.get(url=api_url)
    data = resp.json()
except Exception, e:
    print('Error retrieving data: {0}'.format(e))
    sys.exit(-1)

# Truncate (empty) table
try:
    print('\nTruncating Equipments table...')
    cursor.execute('TRUNCATE TABLE equipments')
    print('Done.')
except Exception, e:
    print('Error truncating Equipments table: {0}'.format(e))
    sys.exit(-1)

# Populate database with data from API
print('\nInserting rows into Equipments table from API data...')
num_rows = 0
for equipment in data['results']:
    # Get equipment data
    print equipment['url']
    try:
        e_resp = requests.get(url=equipment['url'])
        e_data = e_resp.json()
    except Exception, e:
        print('Error retrieving equipment data: {0}'.format(e))
        sys.exit(-1)
    # Insert equipment data into table
    try:
        query = 'INSERT INTO equipments(EquipmentName, EquipmentData) values(%s, %s);'
        rows = cursor.execute(query, (equipment['name'], json.dumps(e_data)))
        num_rows += rows
    except Exception, e:
        print('Error inserting data into Equipments table: {0}'.format(e))

# Commit changes
try:
    db.commit()
    print('Done. {0} rows inserted into Equipment table.\n'.format(num_rows))
except Exception, e:
    print('Error committing inserts to Equipments table: {0}'.format(e))
    print('Rolling back.\n')
    db.rollback()

#call API for subclasses
api_url = 'http://www.dnd5eapi.co/api/subclasses'
try:
	resp = requests.get(url=api_url)
	data = resp.json()
except Exception, e:
	print('Error retrieving data: {0}'.format(e))
	sys.exit(-1)
try:
	print('\nTruncating subclasses table...')
	cursor.execute('TRUNCATE TABLE subclasses')
	print('Done.')
except Exception, e:
	print('Error truncating subclasses table: {0}'.format(e))
	sys.exit(-1)
print('\nInserting rows into subclasses from API data...')
num_rows=0
for subclass in data['results']:
	print subclass['url']
	try:
		s_resp = requests.get(url=subclass['url'])
		s_data = s_resp.json()
	except Exception, e:
		print('Error retrieving subclass data: {0}'.format(e))
		sys.exit(-1)
	try:
		query = 'INSERT INTO subclasses(ClassName, SubclassData) values(%s, %s);'
		rows = cursor.execute(query, (s_data['class']['name'], json.dumps(s_data)))
		num_rows += rows
	except Exception, e:
		print('Error inserting data into subclasses table: {0}'.format(e))
try:
	db.commit()
	print('Done. {0} rows inserted into subclasses table.\n'.format(num_rows))
except Exception, e:
	print('Error commiting inserts into subclasses table: {0}'.format(e))
	print('Rolling back...\n')
	db.rollback()

#Call API for features
api_url = 'http://www.dnd5eapi.co/api/features'



try:
	resp = requests.get(url=api_url)
	data = resp.json()
except Exception, e:
	print('Error retrieving data: {0}'.format(e))
	sys.exit(-1)
#truncate table
try:
	print('\nTruncating classes table...')
	cursor.execute('TRUNCATE TABLE features')
	print('Done.')
except Exception, e:
	print('Error truncating features table: {0}'.format(e))
	sys.exit(-1)

print('\nInserting rows into features table from API data...')
num_rows=0
for feature in data['results']:
	print feature['url']
	try:
		f_resp = requests.get(url=feature['url'])
		f_data = f_resp.json()
	except Exception, e:
		print('Error retrieving feature data: {0}'.format(e))
		sys.exit(-1)
	try:
		query = 'INSERT INTO features(FeatureName, ClassName, FeatureLevel, FeatureData) values(%s, %s, %s, %s);'
		rows = cursor.execute(query, (feature['name'], f_data['class']['name'], f_data['level'], json.dumps(f_data)))
		num_rows += rows
	except Exception, e:
		print('Error inserting data into features table: {0}'.format(e))
try:
	db.commit()
	print('Done. {0} rows inserted into features table.\n'.format(num_rows))
except Exception, e:
	print('Error committing inserts to features table: {0}'.format(e))
	print('Rolling back.\n')
	db.rollback()

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
    print('\nTruncating Classes table...')
    cursor.execute('TRUNCATE TABLE classes')
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
        query = 'INSERT INTO classes(ClassName, ClassData) values(%s, %s);'
        rows = cursor.execute(query, (_class['name'], json.dumps(c_data)))
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
    cursor.execute('TRUNCATE TABLE races')
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
        query = 'INSERT INTO races(RaceName, RaceData) values(%s, %s);'
        rows = cursor.execute(query, (race['name'], json.dumps(r_data)))
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
    cursor.execute('TRUNCATE TABLE spells')
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
        query = 'INSERT INTO spells(SpellName, SpellData) values(%s, %s);'
        rows = cursor.execute(query, (spell['name'], json.dumps(s_data)))
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
    print('\nTruncating monsters table...')
    cursor.execute('TRUNCATE TABLE monsters')
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
        query = 'INSERT INTO monsters(MonsterName, MonsterData) values(%s, %s);'
        rows = cursor.execute(query, (monster['name'], json.dumps(m_data)))
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

