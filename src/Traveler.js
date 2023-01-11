class Traveler {
    constructor(person) {
        this.id = person.id;
        this.name = person.name;
        this.travelerType = person.travelerType;
    }
    showFirstName() {
        return this.name.split(' ')[0]
    }

}
export default Traveler