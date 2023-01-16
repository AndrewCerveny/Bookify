## Project title
- Project Spec: https://frontend.turing.edu/projects/travel-tracker.html
- Bookify: Bookify is a travel booking app, made to hold a record of a user's travel history. 

Bookify offers a user the abiliities of:
- Seeing how much money a user has spent in a given year
- A record of a users past bookings depending on date given 10/06/2022 this can be altered
- A display of a users upcoming trips 
- A form for a user to book a new trip
- Area to show esitmated cost of that trip 
- A logging with creditals allowing a user to log into their personal pages. 



## About the project...

- This project is a mod2 Turing school final solo project. 
- This project is made out of vanilla JavaScript and test  the abilities to:

1. Create a wireframe design
2. create Archutecture based on demands and api data
3. TDD development and builing out the logic
4. Using Async javaScript with Fetch and post request
5. Error handling for users to understand website expectations
6. Accessibility: is the website useable for all... 
7. Manipulating api Data with the user of iterator methods. 

## Motivation
As a consumer, I would be able to have the ability to book a trip for the future and see trips from the past. I could also see how much these ticket cost before buying them. It's a much needed vacation tracker. 
 
## Screenshots / deployment link if applicable
https://www.loom.com/share/9094420d183041dbb7eb7c69df884727



## Tech/framework used

- JavaScript
- Mocha, Chai
- Html,CSS
- Api: fetch & post
- Wave 
- light house 
- WebPack
- gitHub projects

## Features
 
 As a user I am provided:
- a dashboard page and login to see perosnal information
- total amound of money spent on trips within a year ( 365 day count) 
- Make a trip request
- see that cost of said trip request before purchase
- I will be given many error handling messages along the way. 

## Installation

step1: clone repo
step2: cd into repo
step3: run `npm start`
step4: You will be given a server site. `http://localhost:8080/` copy and past into browser
step4 : go to api server site
step5: clone down that repo
step6 cd into api repo
step7: npm start
step8: The browser should be running*
** keep both running terminal open. 

## API Reference
- api server : https://github.com/turingschool-examples/travel-tracker-api
- allTravelers: http://localhost:3001/api/v1/travelers
- allTrips: http://localhost:3001/api/v1/trips
- allDestinations: http://localhost:3001/api/v1/destinations


## Tests
- Describe and show how to run the tests with code examples.
- To run test: go into terminal and type ` npm test` 

## Contribute, background with expeirence timeframe 
- github: https://github.com/AndrewCerveny
- Solo Project - 6 days 33 hours invested
- Mod 2 student cooding for 5 months 14 days from Aug1/22 - today 1/15/23

## Future extension
- sad path testing.. more of it
- error message customized per input field
- focus ring manipulation: make thicker maybe alter colors etc
- revist UI make it look more professional grade. 


## Challenges 

1) I changed the api properties in my class building. But my class methods were built using api data samples. When cross referencing to the api-- my logic broke. I needed to rehaul all my test and class structures.
2) I tried to error handle each input field that was left blank, this led to nest fialing logic that took hours to undue
3) I had a property in one of my classes being reassigned when a function was invoked.I ended up calling that function more than once and so the
4) property value kept getting reassigned.. that was not the original intent. I had to resturcture. 


