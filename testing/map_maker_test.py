import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class MapMakerTest(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome(executable_path='drivers/chromedriver.exe')

    def test_website_loads_and_logs_in(self):
        driver = self.driver
        driver.get("localhost:3000/")
        self.assertIn("React App", driver.title)
        elem = driver.find_element_by_id('username')
        elem.send_keys("username")
        elem = driver.find_element_by_id('password')
        elem.send_keys("password" + Keys.RETURN)

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()