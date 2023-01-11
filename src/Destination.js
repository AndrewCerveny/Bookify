class Destination {
    constructor(place) {
    this.id = place.id;
    this.location = place.destination;
    this.estCostPerLodge = place.estimatedLodgingCostPerDay;
    this.estFlightCostPerPerson = place.estimatedFlightCostPerPerson;
    this.image = place.image;
    this.altImageTxt = place.alt;
    }
}
export default Destination