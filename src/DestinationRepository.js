class DestinationRepository {
    constructor(destinationData) {
        this.allDestinations = destinationData;
        this.userSelectedDestination = null;
    }
    findLocationById(destinationID) {
      if(destinationID) {
          const selectedDest = this.allDestinations.find((place) => place.id === destinationID)
        return this.userSelectedDestination = selectedDest
        } else{
        return 'Please, pick a destination!'
      }
    }
    estCostPerLodge(num) {
       const totalLodgeCost = this.userSelectedDestination.estimatedLodgingCostPerDay * num
       return totalLodgeCost  
    }
    estCostPerTraveler(num) {
    
        const flightCost = this.userSelectedDestination.estimatedFlightCostPerPerson * num
        return flightCost
    }
    getTotalCost(duration,travelers) {
       const lodgingCost = this.estCostPerLodge(duration)
        const flightCost = this.estCostPerTraveler(travelers)
        const total = lodgingCost + flightCost
        const fee = total * .1 
        const theBill = total + fee 
        return theBill
    }
    getAllDest() {
       const allNames = this.allDestinations.map(place => place.destination)
       return allNames
    }
    getDestImgInfo(num,trait) {
        const match = this.allDestinations.find(place => place.id === num)
        return match[trait]
    }
    
}
export default DestinationRepository; 