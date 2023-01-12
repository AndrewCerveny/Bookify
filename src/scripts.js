
// Do not delete or rename this file ********
// Imports Below 
// An example of how you tell webpack to use a CSS (SCSS) file
//  Imported Images
import './css/styles.css';
import './images/turing-logo.png'
// imported Files

import Destination from './Destination';
import DestinationRepository from './DestinationRepository';
import Traveler from './Traveler';
import TravelerRepository from './TravelerRepository';
import Trips from './Trips';
import TripsRepository from './TripsRepository';
import Trip from './Trips';

// global Variables
let allDestinations;
let destinationRepo;
let allTravelers;
let travelerRepo;
let allTrips;
let tripsRepo;
let yearAgo; 
let currentUser;
let currentUserId;

// global Const Variables
const todayDate = "2022/10/06";
const travelerUrl = 'http://localhost:3001/api/v1/travelers';
const tripsUrl = 'http://localhost:3001/api/v1/trips';
const destinationsUrl = 'http://localhost:3001/api/v1/destinations';

//  Api Fetch Area 
function snagApiData(url) {
    return fetch(url)
				.then((response) => {
			if(!response.ok) {
				throw new Error('Whoops')
			}else {
			return response.json()
			}
		})
		.catch((err) => console.log(err.message))
};

function gatherDatasets() {
	Promise.all([
		snagApiData(travelerUrl),
		snagApiData(tripsUrl),
		snagApiData(destinationsUrl)
	])
	.then((data) => {
		allTravelers = data[0].travelers
		allTrips =  data[1].trips
		allDestinations = data[2].destinations
		createInstances(allTravelers, allTrips,allDestinations)
		loadPage()
	})
}

// QuerySelectors
const errorMessageForm =  document.querySelector('.error-message');
const logOutBtn = document.querySelector('.logout');
const inputBookDate = document.getElementById('userChosenDate');
const destinationSelect = document.getElementById('chosenDestination');
const durationInput = document.querySelector('.duration');
const travelerInput =  document.querySelector('traveler-count');
const formSubBtn = document.querySelector('.book-input-sub');
const estCostDisplay = document.querySelector('.estimated-cost-display');
const firstName = document.querySelector(".welcome-person");
const displayToday = document.querySelector(".today-Input");
const displayAnnualSpent =  document.querySelector('annualSpentDisplay');
const upcomingTripArea = document.querySelector('trip-info-card-upcom');
const pendingTripArea = document.querySelector('trip-info-card-pend');
const pastTripArea = document.querySelector('trip-info-card-past'); 
















// Event Listeners
window.addEventListener('load', gatherDatasets)






// function area
function createInstances(dataSet1, dataSet2, dataSet3) {
	allTravelers = dataSet1.map(person => new Traveler(person));
	travelerRepo = new TravelerRepository(allTravelers);
	allTrips = dataSet2.map(trip => new Trip(trip));
	tripsRepo = new TripsRepository(allTrips);
	allDestinations = dataSet3.map(place => new Destination(place));
	destinationRepo = new DestinationRepository(allDestinations);
}

function loadPage() {
	createCurrentUser();
	welcomeUser();
	showTodayDate()
	showYearSpending();
}

function createCurrentUser() {
	const getUser = travelerRepo.findById(1);
	currentUser = getUser;
	currentUserId = getUser.id
	tripsRepo.filterById(currentUserId)
	return getUser

}

function welcomeUser() {
	const personName = currentUser.showFirstName()
	firstName.innerHTML = personName
	return personName
}

function showTodayDate() {
const userToday = formatDate(todayDate);
 displayToday.innerHTML = userToday
 return userToday

}

function formatDate(date) {
	const day = new Date(date);
	const sentence = day.toDateString();
	const structuredDate = sentence.split(" ").splice(0, 4).join(' ');
	return structuredDate
}
function showYearSpending() {
 console.log();

 
}




