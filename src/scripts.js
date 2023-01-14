
// Do not delete or rename this file ********
// Imports Below 
// An example of how you tell webpack to use a CSS (SCSS) file
//  Imported Images
import './css/styles.css';
import './images/turing-logo.png'
import './images/nextTravel.jpg'
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
		.catch((err) => showAreaMessage(fetchErrDisplay))
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
const messageForm =  document.querySelector('.error-message');
const messageWrapper =  document.querySelector('.error-wrapper');
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
const upcomingTripArea = document.querySelector('.trip-info-card-upcoming');
const pendingTripArea = document.querySelector('.trip-info-card-pend');
const pastTripArea = document.querySelector('.trip-info-card-past'); 
const postErrDisplay =  document.querySelector('.post-Fail');
const fetchErrDisplay = document.querySelector('.fetch-Fail');
const estimatedCostBtn = document.querySelector('.show-est-cost');
const wantToBook = document.querySelector('.form-intro');
const entireBookForm = document.querySelector('.booking-form-container');
const estimatedCostArea = document.querySelector('.estimated-cost-display');



// Event Listeners
window.addEventListener('load', gatherDatasets)
 formSubBtn.addEventListener('click',function(e) {
 createPostTrip(e);
 resetInputs(destinationSelect,durationInput,inputBookDate,travelerInput)
 disableButton(formSubBtn)
 })
 estimatedCostBtn.addEventListener('click', function(e) {
	 displayEstimatedCost(e)
 } )
 wantToBook.addEventListener('click', function(e) {
	createBookForm(e)
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
				   <h2>Destination: <span> ${destinationRepo.findLocationById(trip.destinationID).destination} </span> </h2>
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
				<h2>Destination: <span> ${destinationRepo.findLocationById(trip.destinationID).destination} </span> </h2>
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
				<h2>Destination: <span> ${destinationRepo.findLocationById(trip.destinationID).destination} </span> </h2>
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
	userChosenDate = inputBookDate.value.replaceAll("-","/");
	const validate = checkBookingDate(userChosenDate)	
	if(validate) {
		e.preventDefault()
			const postId = tripsRepo.getCompanyId();
			destinationId =  Number(destinationSelect.value);
			daysTraveled = Number(durationInput.value); 
			peopleTraveling = Number(travelerInput.value); 
			const postTrip = {
			id: postId, 
			userID: currentUserId, 
			destinationID: destinationId, 
			travelers: peopleTraveling, 
			date: userChosenDate, 
			duration: daysTraveled, 
			status:"pending", 
			suggestedActivities:[]
			}
			const endPoint = 'trips';
		triggerPost(endPoint,postTrip);

	}else {
		showAreaMessage(messageWrapper)
		messageForm.innerHTML = 'Date already Book 💻! Click Want to Book a trip to restart!'
	}
	entireBookForm.reset()

}

function displayEstimatedCost(e) {
	e.preventDefault()
	makeRequired(inputBookDate,destinationSelect,durationInput,travelerInput);
	destinationId = Number(destinationSelect.value);
	daysTraveled = Number(durationInput.value); 
	peopleTraveling = Number(travelerInput.value); 
	userChosenDate = inputBookDate.value.replaceAll("-","/")
	const provedChosen = Number(userChosenDate.split("/").join(""))

	if(destinationId > 0 && daysTraveled > 0  && peopleTraveling > 0 && provedChosen > 0 ) {
		disableButton(estimatedCostBtn)	
		estCostDisplay.innerHTML =`$ ${destinationRepo.getTotalCost(daysTraveled,peopleTraveling,destinationId)}`	
			disableButton(estimatedCostBtn);
			enableButton(formSubBtn);
		
	}else {
		showFillFormMessage()
		disableButton(estimatedCostBtn)
	}


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
			showAreaMessage(messageWrapper)
			messageForm.innerHTML = 'Congrats,your trip has been booked 🛫'  
			entireBookForm.reset()
		})
		.catch((err) => {
			showAreaMessage(postErrDisplay)
			setTimeout(() => {
				hideMessage(postErrDisplay)
			}, 4000);
		})
		
		
}

function checkBookingDate(datePicked) {
	const usersTrips = tripsRepo.filterById(currentUserId);
	const match = usersTrips.find((trip) => trip.date === datePicked)	
	
	if(match) {
	return false
	} else {
	return true
	}
}
	
function createBookForm(e) {
	e.preventDefault()
	showFormAreas(estimatedCostArea, entireBookForm)
	makeRequired(inputBookDate,destinationSelect,durationInput,travelerInput)
	disableButton(formSubBtn);
	entireBookForm.reset()
	hideMessage(messageWrapper);
	enableButton(estimatedCostBtn);
}



//  helper Functions
function disableButton(button){
	button.disabled = true; 
}
function enableButton(button) {
	button.disabled = false; 
}
function showAreaMessage(area) {
	area.classList.remove("hidden");
}
function showFormAreas(area1,area2) {
	area1.classList.remove('hidden');
	area2.classList.remove('hidden');
	
}
function makeRequired(input1,input2,input3, input4) {
	input1.required = true;
	input2.required = true;
	input3.required = true;
	input4.required = true; 
}
function resetInputs(input1,input2,input3,input4){
	input1.value = '';
	input2.value = '';
	input3.value = '';
	input4.value = '';
}
function hideMessage(area1){
	area1.classList.add('hidden')
}
function showFillFormMessage() {
	showAreaMessage(messageWrapper)
	messageForm.innerHTML = 'Please fill out all the form inputs then click Want to Book a trip to restart! 📝'
}