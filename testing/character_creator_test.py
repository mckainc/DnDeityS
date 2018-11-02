import unittest
import time
import random
import json
import string
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.action_chains import ActionChains
import mysql.connector

class MapMakerTest(unittest.TestCase):
	def setUp(self):
		# self.driver = webdriver.Chrome(executable_path='drivers/chromedriver.exe')
		self.driver = webdriver.Edge(executable_path='drivers/MicrosoftWebDriver.exe')

	def test_random_character_write_and_save(self):
		driver = self.driver
		driver.get("http://localhost:3000/")
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

		# does character creator exist?
		try:
			elem = driver.find_element_by_link_text('Create a new character!')
		except Exception as e:
			self.assertTrue(False)
			return
		elem.click()

		# in character creator now
		# generate random character to create
		
		# name
		character = dict()
		elem = driver.find_element_by_xpath("//input")
		letters = string.ascii_lowercase
		name = ''.join(random.choice(letters) for i in range(10))
		elem.send_keys(name)
		character['name'] = name

		# race
		race_buttons = driver.find_elements_by_xpath("//div[@class='RaceSection']//label")
		# print("Buttons:", len(race_buttons))
		race = random.choice(race_buttons)
		character['race'] = race.text
		race.click()
		# TODO: deal with dropdowns

		# class
		class_buttons = driver.find_elements_by_xpath("//div[@class='ClassSection']//label")
		# print("Buttons:", len(race_buttons))
		race = random.choice(class_buttons)
		character['race'] = race.text
		race.click()
		# TODO: deal with dropdowns

		# ability scores (kinda works)
		scores = driver.find_elements_by_xpath("//div[@class='ScoreSection']//input")
		score_array = [8, 8, 8, 8, 8, 8]
		for i in range(27):
			selection = random.randint(0, len(score_array) - 1)
			while score_array[selection] >= 15:
				selection = random.randint(0, 5)
			score_array[selection] += 1

		# for i in range(len(score_array)):
		# 	score_array[i] = str(score_array[i])
		# 	scores[i].clear()
		# 	scores[i].send_keys(score_array[i])
		
		character['scores'] = score_array


		# equipment
		character_equipment = []
		inventory = driver.find_element_by_xpath("//b[contains(text(), \"Character's Inventory:\")]//parent::div[@class='well']")	
		for i in range(5):
			equipment = driver.find_elements_by_xpath("//div[@class='list-group']//div[@class='EquipmentList']")
			equipment_choice = random.choice(equipment)
			character_equipment.append(equipment_choice.find_element_by_xpath("./span").text)
			ActionChains(driver).drag_and_drop(equipment_choice, inventory).perform()
		character["equipment"] = character_equipment

		# spells

		# background
		background_buttons = driver.find_elements_by_xpath("//div[@class='BackgroundSection']//label")
		# print("Buttons:", len(race_buttons))
		background = random.choice(background_buttons)
		character['background'] = background.text
		background.click()

		# description
		description = dict()
		description_fields = driver.find_elements_by_xpath("//div[@class='DescriptionSection']//input")
		for field in description_fields:
			if field.get_attribute("name") == "age":
				description['age'] = str(random.randint(1, 100))
				field.send_keys(description['age'])
			elif field.get_attribute("name") == "gender":
				if random.randint(0, 1) == 1:
					description["gender"] = "male"
				else:
					description["gender"] = "female"
				field.send_keys(description["gender"])
			else:
				typed = ''.join(random.choice(letters) for i in range(10))
				description[field.get_attribute("name")] = typed
				field.send_keys(typed)

		description_fields = driver.find_elements_by_xpath("//div[@class='DescriptionSection']//textarea")
		for field in description_fields:
			typed = ''.join(random.choice(letters) for i in range(25))
			description_field_name = field.find_element_by_xpath(".//parent::div/label").text
			description[description_field_name] = typed
			field.send_keys(typed)
		alignment_button = driver.find_element_by_xpath("//div[@class='DescriptionSection']//div[@class='dropdown btn-group']")
		alignment_button.find_element_by_xpath("./button").click()
		alignment_buttons = alignment_button.find_elements_by_xpath(".//li")
		alignment_button = random.choice(alignment_buttons)
		character['alignment'] = alignment_button.find_element_by_xpath("./a").get_attribute("id")
		alignment_button.click()
		character['description'] = description

		print(character)

		# save
		elem = driver.find_element_by_class_name("save")
		elem.click()
		time.sleep(2)

	def tearDown(self):
		self.driver.close()

if __name__ == "__main__":
	unittest.main()