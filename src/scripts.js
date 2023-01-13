
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
let userChosenDate;
let destinationId
let daysTraveled;
let peopleTraveling;  

 

// global Const Variables
const todayDate = "2022/10/06";
yearAgo = "2021/10/06";
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
const travelerInput =  document.querySelector('.traveler-count');
const formSubBtn = document.querySelector('.book-input-sub');
const estCostDisplay = document.querySelector('.show-cost-display');
const firstName = document.querySelector(".welcome-person");
const displayToday = document.querySelector(".today-Input");
const annualSpent =  document.querySelector('.annual-Spent');
const upcomingTripArea = document.querySelector('.trip-info-card-upcom');
const pendingTripArea = document.querySelector('.trip-info-card-pend');
const pastTripArea = document.querySelector('.trip-info-card-past'); 
















// Event Listeners
window.addEventListener('load', gatherDatasets)
 formSubBtn.addEventListener('click',function(e) {
	
	createPostTrip(e);
	displayEstimatedCost()
 })






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
    displayUpComingTrips();
	displayPendingTrips();
	displayPastTrips();
	restrictDateRange();
	displayDestinations();
}

function createCurrentUser() {
	const getUser = travelerRepo.findById(25);
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
 const yrSpend = tripsRepo.showAnnualSpent(destinationRepo.allDestination,yearAgo,todayDate,currentUserId);
 annualSpent.innerHTML = yrSpend
 return yrSpend	
}

function displayUpComingTrips() {
	const futureTrips = tripsRepo.showFutureTrips(todayDate,currentUserId)

	upcomingTripArea.innerHTML = ''
	if(futureTrips.length) {
		futureTrips.forEach((trip) => {
			 upcomingTripArea.innerHTML += `
			 <section class="book-card"> 
				<img src="${destinationRepo.getDestImgInfo(trip.destinationID,'image')}." alt=${destinationRepo.getDestImgInfo(trip.destinationID,'alt')}>
				   <h2>Destination name: <span> ${destinationRepo.findLocationById(trip.destinationID).destination} </span> </h2>
				  <h2>How many Travelers: <span> ${trip.travelers}</span> </h2>
				  <h2>Date of Trip: <span> ${trip.date} </span></h2>
				  <h2> Duration of Trip: <span> ${trip.duration}</span></h2>
				<h2> Status: <span> ${trip.status} </span></h2>
			   </section>`
		})
	}else{
		upcomingTripArea.innerHTML += `<p>There are no upcoming trips booked!</p>`
	}
 

}	

function displayPendingTrips() {
 const pendingTrips =  tripsRepo.showPending(currentUserId);
	pendingTripArea.innerHTML += ''
 	
	if(pendingTrips.length) {
		pendingTrips.forEach((trip) => {
		pendingTripArea.innerHTML += `
		<section class="book-card"> 
			<img src="${destinationRepo.getDestImgInfo(trip.destinationID,'image')}." alt=${destinationRepo.getDestImgInfo(trip.destinationID,'alt')}>
				<h2>Destination name: <span> ${destinationRepo.findLocationById(trip.destinationID).destination} </span> </h2>
				<h2>How many Travelers: <span> ${trip.travelers}</span> </h2>
				<h2>Date of Trip: <span> ${trip.date} </span></h2>
				<h2> Duration of Trip: <span> ${trip.duration}</span></h2>
				<h2> Status: <span> ${trip.status} </span></h2>
		</section>`
	})
 	} else {
	 pendingTripArea.innerHTML += `<p> No Pending Trips! </p>`
 }
  	

}

function displayPastTrips() {
 const pastTrips = tripsRepo.showPastTrips(todayDate,currentUserId)
 
 if(pastTrips.length) {
	pastTrips.forEach((trip) => {
		
		pastTripArea.innerHTML += `
		<section class="book-card"> 
			<img src="${destinationRepo.getDestImgInfo(trip.destinationID,'image')}." alt=${destinationRepo.getDestImgInfo(trip.destinationID,'alt')}>
				<h2>Destination name: <span> ${destinationRepo.findLocationById(trip.destinationID).destination} </span> </h2>
				<h2>How many Travelers: <span> ${trip.travelers}</span> </h2>
				<h2>Date of Trip: <span> ${trip.date} </span></h2>
				<h2> Duration of Trip: <span> ${trip.duration}</span></h2>
				<h2> Status: <span> ${trip.status} </span></h2>
		</section>`
	})
 
}else{
pastTripArea.innerHTML += `<p> No Past Trips! </p>`

 }
}
function restrictDateRange() {
	const calendarMin = todayDate.replaceAll("/","-")
	const calendarMax = '2023-10-06'

 inputBookDate.setAttribute("min",`${calendarMin}`)
 inputBookDate.setAttribute("max",`${calendarMax}`)
	
}
function displayDestinations() {
	destinationSelect.innerHTML += ``
	
	const allDestinations = destinationRepo.getAllDest()
	 
	allDestinations.forEach((destination)=> {
	destinationSelect.innerHTML += `
	<option id="${destination.id}" value=${destination.id}> ${destination.destination}</option>`
})

	
}

function createPostTrip(e) {
	e.preventDefault()
userChosenDate = inputBookDate.value.replaceAll("-","/");
const postId = tripsRepo.getCompanyId();
destinationId =  destinationSelect.value;
daysTraveled = durationInput.value; 
peopleTraveling = travelerInput.value; 
const postTrip = {id:postId, userID:currentUserId, destinationID:Number(destinationId), travelers:Number(peopleTraveling), date:userChosenDate, duration: Number(daysTraveled), status:"pending", suggestedActivities:[]}
const endPoint = 'trips';

triggerPost(endPoint,postTrip);

}

function displayEstimatedCost() {
	estCostDisplay.innerHTML = ''
	const matchedDestination = destinationRepo.findLocationById(Number(destinationId))
	estCostDisplay.innerHTML =`$ ${destinationRepo.getTotalCost(daysTraveled,peopleTraveling)}`	
}

function triggerPost(endPoint,newPostedTrip) {
	fetch(`http://localhost:3001/api/v1/${endPoint}`,{
		method:'POST',
		body: JSON.stringify(newPostedTrip),
		headers:{
			'Content-Type':'application/json'
		}
	})
		.then((response) => {
			if(!response.ok) {
				throw new Error('Whoops')
			}else{
				return response.json()
			}
		})
		.then(data => {
			gatherDatasets()
		})
		.catch((err) => console.log(err.message))

	
}