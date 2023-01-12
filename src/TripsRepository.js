class TripsRepository {
    constructor(tripsDataset) {
        this.allTrips = tripsDataset;
        

    }
    filterById(id) {
        const userTrips = this.allTrips.filter((trip) => trip.userID === id)
        return userTrips
   
    }
   
    showAnnualTrips(yrAgo,currentDate,id) {
     const yearAgo = new Date(yrAgo)
     const today = new Date (currentDate)
     const usersTrips = this.filterById(id)
     const approvedDates = usersTrips.filter((trip) => trip.status === 'approved')
     const annualVacations = approvedDates.filter((trip) => new Date(trip.date) >= yearAgo && new Date(trip.date) <= today)
     return annualVacations 
    }
    showPastTrips(today,id) {
     const todayDate =  new Date(today)
     const usersTrips = this.filterById(id)
     const pastTrips = usersTrips.filter((trip) => new Date(trip.date) < todayDate )
     return pastTrips
    }
    showFutureTrips(today,id) {
        const todayDate = new Date(today) 
         const usersTrips = this.filterById(id)
        const futureTrips = usersTrips.filter((trip) => new Date(trip.date) > todayDate)
        return futureTrips
    }
    showAnnualSpent(destination,yrAgo,currentDate,id) {
         const userYearTrips = this.showAnnualTrips(yrAgo,currentDate,id)
         const spentMoney = userYearTrips.reduce((num,trip) => {
            destination.forEach((destination) => {
            
                if(destination.id === trip.destinationID) {
                    const flights = trip.travelers * destination.estimatedFlightCostPerPerson
                    const stay = trip.duration * destination.estimatedLodgingCostPerDay
                    const estimate = flights + stay
                    num += estimate
                }
            })
          return num
        },0)
        const fee = spentMoney * .1
        const bill = spentMoney + fee
        const dollars = bill.toFixed(2)
        return dollars
    
    }
    showPending(id) {
        const usersTrips = this.filterById(id)
        const pendingTrips = usersTrips.filter(trip => trip.status === 'pending')
        return pendingTrips
    }
    getCompanyId() {
        const getHighest = this.allTrips.sort((a,b) => b.id - a.id)
        const topId = getHighest[0].id
        const givenNumber = topId + 1;
        return givenNumber
    }
}
export default TripsRepository; 