class Trip {
    constructor(vacation) {
        this.tripId = vacation.id;
        this.userId = vacation.userID;
        this.destinationId = vacation.destinationID;
        this.travelers = vacation.travelers;
        this.date = vacation.date;
        this.duration = vacation.duration;
        this.status =  vacation.status;
        this.suggestedActivities = vacation.suggestedActivities;
    }
}
export default Trip;