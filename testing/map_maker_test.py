import unittest
import time
import random
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

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
		self.assertTrue(True)

		# does map maker exist?
		try:
			elem = driver.find_element_by_link_text('Create a new map!')
		except Exception as e:
			self.assertTrue(False)
			return
		self.assertTrue(True)
		elem.click()

		# in map maker now
		# generate random map to create
		tile_types = ['dirt', 'grass', 'stone', 'wood']
		x = random.randint(1, 25)
		y = random.randint(1, 25)
		x = 4
		y = 5
		test_map = [[dict() for i in range(y)] for j in range(x)]
		for i in range((x * y) // 2): # fill <= half the map
			x_temp = random.randint(0, x - 1)
			y_temp = random.randint(0, y - 1)
			tile_type = random.randint(0, 3) # random tile
			monster = random.randint(0, 1)
			event = random.randint(0, 1)
			test_map[x_temp][y_temp]['tile'] = tile_type
			test_map[x_temp][y_temp]['monster'] = monster
			test_map[x_temp][y_temp]['event'] = event

		# print the map
		for i in range(x):
			for j in range(y):
				print("+-------", end='')
			print("+")
			for j in range(y):
				if test_map[i][j]:
					print(test_map[i][j]['tile'])
					print("|{7:}".format(tile_types[test_map[i][j]['tile']]), end='')
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
				if test_map:
					if test_map[i][j]['event'] == 1:
						print("|  event", end='')
					else:
						print("|       ", end='')
				else:
					print("|       ", end='')
			print("|")
		for j in range(y):
			print("+-------", end='')
		print("+")

	def tearDown(self):
		self.driver.close()

if __name__ == "__main__":
	unittest.main()