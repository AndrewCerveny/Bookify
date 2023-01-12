class TravelerRepository {
    constructor(travelDataSet) {
        this.allTravelData = travelDataSet    
    }
    filterById(id) {
    const match = this.allTravelData.find(person => person.id === id)
    return match
    }
}
export default TravelerRepository