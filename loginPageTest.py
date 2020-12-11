# Automated test using selenium for login page of the user
# @author Kinshuk
# kindly change the path of the driver
# kindly make sure the server is listening on port 3000
# import all of the the modules required
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

PATH = "C:\Program Files (x86)\chromedriver"
driver = webdriver.Chrome(PATH)

# load the website
driver.get("http://localhost:3000/register")

# variables used for testing
personName = "Tester"
personEmail = "tester@test.com"
personPassword = "password123"
homePage = "http://localhost:3000/"
loginPage = "http://localhost:3000/login"
registerPage = "http://localhost:3000/register"
title = "Email System"

# try:
#------register screen---------

#fill in the name field first wait for the elements to be loaded
element = WebDriverWait(driver, 20).until(
    EC.presence_of_element_located((By.ID, "name"))
)
# make sure theres nothing in the element by clearing it
element.clear()
# simulate typing the name into the field
element.send_keys(personName)
#hit enter after having the string typed in
element.send_keys(Keys.RETURN)
# wait 2 seconds
time.sleep(2)

#fill in the email field
element = driver.find_element_by_id("email")
element.clear()
element.send_keys(personEmail)
element.send_keys(Keys.RETURN)
time.sleep(2)

#fill in the Password field
element = driver.find_element_by_id("password")
element.clear()
element.send_keys(personPassword)
element.send_keys(Keys.RETURN)
time.sleep(2)

#hit the register button
element = driver.find_element_by_tag_name("button")
element.click()  
#implicit wait
driver.implicitly_wait(5)
#------TEST 1-----------------
#assert: check if clicking register button redirects user to login screen
assert loginPage == driver.current_url, "flow to login page was not successful!"

#---login screen---------
#fill in the correct email but first wait for the elements to be loaded
element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, "email"))
)
element.clear()
element.send_keys(personEmail)
element.send_keys(Keys.RETURN)
time.sleep(2)

#fill in correct password to login
element = driver.find_element_by_id("password")
element.clear()
element.send_keys(personPassword)
element.send_keys(Keys.RETURN)
time.sleep(2)

#hit the login button
element = driver.find_element_by_tag_name("button")
element.click()
time.sleep(2)

#------logging out----------
element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.LINK_TEXT, "Log Out"))
)

#------TEST 2-----------------
# ASSERT: correct title is being displayed (1)
assert title == driver.title, "Email System title is not being displayed!"

element.click()
time.sleep(2)

#------TEST 3-----------------
#assert: check if clicking logout button logs user out or not
assert loginPage == driver.current_url, "flow to Home page was not successful due to login error"

#-----TEST 4----------------
#try to cheat and go into persons account
driver.forward()
time.sleep(2)
assert homePage != driver.current_url, "You breached and went into the system without loggin"

#close the driver
driver.quit()
