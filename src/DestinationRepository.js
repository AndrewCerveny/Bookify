class DestinationRepository {
    constructor(destinationData) {
        this.allDestinations = destinationData;
        
    }
    findLocationById(destinationID) {
      if(destinationID) {
          const selectedDest = this.allDestinations.find((place) => place.id === destinationID)
          return selectedDest
        } else{
        return 'Please, pick a destination!'
      }
    }
    estCostPerLodge(num,id) {
        const matchedLocation = this.findLocationById(id)
       const totalLodgeCost = matchedLocation.estimatedLodgingCostPerDay * num
       return totalLodgeCost  
    }
    estCostPerTraveler(num,id) {
        const matchedLocation = this.findLocationById(id)
        const flightCost = matchedLocation.estimatedFlightCostPerPerson * num
        return flightCost
    }
    getTotalCost(duration,travelers,id) {
       const lodgingCost = this.estCostPerLodge(duration,id)
        const flightCost = this.estCostPerTraveler(travelers,id)
        const total = lodgingCost + flightCost
        const fee = total * .1 
        const est = total + fee 
        const billFormat = est.toFixed(2)
        return billFormat
    }
    getAllDest() {
       const allNames = this.allDestinations.map(place => { 
        const locationFacts = {}
        locationFacts.id = place.id
        locationFacts.destination = place.destination
        return locationFacts
       })
       return allNames
    }
    getDestImgInfo(num,trait) {
        const match = this.allDestinations.find(place => place.id === num)
        return match[trait]
    }
    
}
export default DestinationRepository; 