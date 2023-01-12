class TripsRepository {
    constructor(tripsDataset) {
        this.allTrips = tripsDataset;
        this.currentUserTrips = null;
        this.usersAnnualTrips = null;

    }
    filterById(id) {
   const userTrips = this.allTrips.filter((trip) => trip.userID === id)
   this.currentUserTrips = userTrips
   return userTrips
   
    }
   
    showAnnualTrips(yrAgo,currentDate) {
     const yearAgo = new Date(yrAgo)
     const today = new Date (currentDate)
     const approvedDates = this.currentUserTrips.filter((trip) => trip.status = 'approved')
     const annualVacations = approvedDates.filter((trip) => new Date(trip.date) >= yearAgo && new Date(trip.date) <= today)
     this.usersAnnualTrips = annualVacations
      return annualVacations 
    }
    showPastTrips(today) {
     const todayDate =  new Date(today)
     const pastTrips = this.currentUserTrips.filter((trip) => new Date(trip.date) < todayDate )
     return pastTrips
    }
    showFutureTrips(today) {
        const todayDate = new Date(today) 
        const futureTrips = this.currentUserTrips.filter((trip) => new Date(trip.date) > todayDate)
        // console.log('INFUT', futureTrips)
    }
    showPendingTrips() {
        const pendingTrips = this.currentUserTrips.filter(trip => trip.status === 'pending')   
     
    }
    
}
export default TripsRepository; 