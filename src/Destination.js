class Destination {
    constructor(place) {
    this.id = place.id;
    this.destination = place.destination;
    this.estimatedLodgingCostPerDay = place.estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = place.estimatedFlightCostPerPerson;
    this.image = place.image;
    this.altImageTxt = place.alt;
    }
}
export default Destination