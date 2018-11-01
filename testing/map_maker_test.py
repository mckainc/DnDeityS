import unittest
import time
import random
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

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


class MapMakerTest(unittest.TestCase):
	def setUp(self):
		self.driver = webdriver.Chrome(executable_path='drivers/chromedriver.exe')

	def test_random_map(self):
		driver = self.driver
		driver.get("localhost:3000/")
		self.assertIn("React App", driver.title)
		elem = driver.find_element_by_id('username')
		elem.send_keys("username")
		elem = driver.find_element_by_id('password')
		elem.send_keys("password")
		elem.submit()

		# test that the page properly loaded
		time.sleep(3)
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
		x = random.randint(10, 25)
		y = random.randint(10, 25)
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
		try:
			inputs = driver.find_elements_by_tag_name('input')
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

		# write tile types
		# select writer
		elem = driver.find_element_by_tag_name("button")
		elem.click()
		elem = driver.find_element_by_xpath("//div[@class='MapMaker']/div[@class='MapEditor']")
		for i in range(x):
			for j in range(y):
				if test_map[i][j]:



	def tearDown(self):
		self.driver.close()

if __name__ == "__main__":
	unittest.main()