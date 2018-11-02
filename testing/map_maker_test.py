import unittest
import time
import random
import json
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
import mysql.connector

def generate_map(x, y):
	test_map = [[dict() for i in range(y)] for j in range(x)]
	for i in range((x * y) // 2): # fill <= half the map
		x_temp = random.randint(0, x - 1)
		y_temp = random.randint(0, y - 1)
		tile_type = random.randint(0, 3) # random tile
		monster = random.randint(0, 1)
		event = random.randint(0, 1)
		if monster == 1 and event == 1:
			if random.randint(0, 1) == 1:
				monster = 0
			else:
				event = 0
		test_map[x_temp][y_temp]['tile'] = tile_type
		test_map[x_temp][y_temp]['monster'] = monster
		test_map[x_temp][y_temp]['event'] = event
	return test_map

def print_map(test_map, x, y):
	tile_types = ('dirt', 'grass', 'stone', 'wood')
	for i in range(x):
		for j in range(y):
			print("+-------", end='')
		print("+")
		for j in range(y):
			if test_map[i][j]:
				print("|{:7}".format(tile_types[test_map[i][j]['tile']]), end='')
			else:
				print("|       ", end='')
		print("|")
		for j in range(y):
			if test_map[i][j]:
				if test_map[i][j]['monster'] == 1:
					print("|monster", end='')
				else:
					print("|       ", end='')
			else:
				print("|       ", end='')
		print("|")
		for j in range(y):
			if test_map[i][j]:
				if test_map[i][j]['event'] == 1:
					print("|event  ", end='')
				else:
					print("|       ", end='')
			else:
				print("|       ", end='')
		print("|")
	for j in range(y):
		print("+-------", end='')
	print("+")

def convert_to_db_map(test_map, x, y):
	returned = []
	tile_types = ('dirt', 'grass', 'stone', 'wood')
	for i in range(x):
		for j in range(y):
			if test_map[i][j]:
				added = dict()
				added['tile'] = tile_types[test_map[i][j]['tile']]
				if test_map[i][j]['event'] == 1:
					added['event'] = {'name':'', 'description':''}
				if test_map[i][j]['monster'] == 1:
					added['monster'] = {'name':'', 'description':'', 'type':''}
				added['x'] = i
				added['y'] = j
				returned.append(added)
	return returned

class MapMakerTest(unittest.TestCase):
	def setUp(self):
		self.driver = webdriver.Chrome(executable_path='drivers/chromedriver.exe')

	def test_random_map_write_and_save(self):
		driver = self.driver
		driver.get("localhost:3000/")
		self.assertIn("React App", driver.title)
		elem = driver.find_element_by_id('username')
		elem.send_keys("username")
		elem = driver.find_element_by_id('password')
		elem.send_keys("password")
		elem.submit()

		# test that the page properly loaded
		time.sleep(1)
		try:
			elem = driver.find_element(By.TAG_NAME, 'h2')
		except Exception as e:
			self.assertTrue(False)
			return

		# does map maker exist?
		try:
			elem = driver.find_element_by_link_text('Create a new map!')
		except Exception as e:
			self.assertTrue(False)
			return
		elem.click()

		# in map maker now
		# generate random map to create
		x = random.randint(1, 20)
		y = random.randint(1, 20)
		test_map = generate_map(x, y)

		# print the map
		print_map(test_map, x, y)

		# write the map to the map maker
		# change settings
		try:
			elem = driver.find_element_by_class_name('settings')
		except Exception as e:
			self.assertTrue(False)
			return
		elem.click()
		time.sleep(1)
		try:
			inputs = driver.find_elements_by_tag_name('input')
			inputs[0].clear()
			inputs[0].send_keys('test_map_1') # name
			inputs[1].clear()
			inputs[1].send_keys(str(y)) # width
			inputs[2].clear()
			inputs[2].send_keys(str(x)) # height
			elem = driver.find_element_by_class_name("close")
			elem.click()
		except Exception as e:
			self.assertTrue(False)
			return
		time.sleep(1)

		# write tile types
		elem = driver.find_elements_by_xpath("//div[@class='MapEditor']//button")
		elem[0].click() # select writer
		tile_but = elem[3]
		tile_but.click() # select tiles
		tiles = driver.find_elements_by_class_name("MapTile")
		select_tiles = driver.find_elements_by_xpath("//div[@class='TileSelector']//div[@class='tile']")
		for i in range(x):
			for j in range(y):
				if test_map[i][j]:
					# select the tile type
					select_tiles[test_map[i][j]['tile']].click()
					tiles[(y * i) + j].click()

		# write monsters
		elem = driver.find_elements_by_xpath("//div[@class='MapEditor']//button")
		elem[0].click() # select writer
		tile_but = elem[4]
		tile_but.click() # select monsters
		tiles = driver.find_elements_by_class_name("MapTile")
		for i in range(x):
			for j in range(y):
				if test_map[i][j]:
					if test_map[i][j]['monster'] == 1:
						tiles[(y * i) + j].click()

		# write events
		elem = driver.find_elements_by_xpath("//div[@class='MapEditor']//button")
		elem[0].click() # select writer
		tile_but = elem[5]
		tile_but.click() # select events
		tiles = driver.find_elements_by_class_name("MapTile")
		for i in range(x):
			for j in range(y):
				if test_map[i][j]:
					if test_map[i][j]['event'] == 1:
						tiles[(y * i) + j].click()

		# save
		elem = driver.find_element_by_class_name("save")
		elem.click()
		time.sleep(2)

		# check for correct saving
		# convert my map to db structure
		my_map = convert_to_db_map(test_map, x, y)

		# get the actual value from the database
		db_dnd_host = '127.0.0.1'
		db_dnd_user = 'root'
		db_dnd_password = 'password'
		db_dnd = 'dnd'
		db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
		cur = db.cursor()
		cur.execute("select MapTiles from Maps where MapName = 'test_map_1'")
		for row in cur.fetchall():
			db_map = json.loads(row[0])
		self.assertEqual(my_map, db_map)
		cur.execute("delete from Maps where MapName = 'test_map_1'")
		db.commit()
		cur.close()
		db.close()

	def test_map_is_loaded_correctly(self):
		driver = self.driver
		driver.get("localhost:3000/")
		self.assertIn("React App", driver.title)
		elem = driver.find_element_by_id('username')
		elem.send_keys("username")
		elem = driver.find_element_by_id('password')
		elem.send_keys("password")
		elem.submit()

		# test that the page properly loaded
		time.sleep(1)
		try:
			elem = driver.find_element(By.TAG_NAME, 'h2')
		except Exception as e:
			self.assertTrue(False)
			return

		# generate map to test against
		x = random.randint(1, 20)
		y = random.randint(1, 20)
		test_map = generate_map(x, y)
		print_map(test_map, x, y)
		my_map = convert_to_db_map(test_map, x, y)

		# insert into database
		db_dnd_host = '127.0.0.1'
		db_dnd_user = 'root'
		db_dnd_password = 'password'
		db_dnd = 'dnd'
		db = mysql.connector.connect(host=db_dnd_host, user=db_dnd_user, password=db_dnd_password, database=db_dnd)
		cur = db.cursor()
		cur.execute("insert into Maps (UserId, MapName, MapHeight, MapWidth, MapTiles) values (4, 'test_map_2', " + str(x) + ", " + str(y) + ", '" + str(json.dumps(my_map)) + "')")
		db.commit()

		# does map selector exist?
		try:
			elem = driver.find_element_by_link_text('Maps')
		except Exception as e:
			self.assertTrue(False)
			return
		elem.click()
		time.sleep(2)

		elem = driver.find_element_by_xpath("//div[contains(text(), 'test_map_2')]//parent::div//button")
		elem.click()
		time.sleep(2)

		# check for equality
		display_map = []
		tiles = driver.find_elements_by_class_name("MapTile")
		for i in range(x):
			for j in range(y):
				added = dict()
				try:
					tile = tiles[(y * i) + j].find_element_by_xpath(".//img")
					ttype = tile.get_attribute("src")
					if "grass" in ttype:
						added['tile'] = 'grass'
					elif "stone" in ttype:
						added['tile'] = 'stone'
					elif "dirt" in ttype:
						added['tile'] = 'dirt'
					elif "wood" in ttype:
						added['tile'] = 'wood'
					if tile.get_attribute("class") == "monster":
						added['monster'] = {'name':'', 'description':'', 'type':''}
					elif tile.get_attribute("class") == "event":
						added['event'] = {'name':'', 'description':''}
					added['x'] = i
					added['y'] = j
					display_map.append(added)
				except NoSuchElementException as e:
					pass
		# print(display_map)
		# print(my_map)
		self.assertEqual(display_map, my_map)
		cur.execute("delete from Maps where MapName = 'test_map_2'")
		db.commit()
		cur.close()
		db.close()

	def tearDown(self):
		self.driver.close()

if __name__ == "__main__":
	unittest.main()