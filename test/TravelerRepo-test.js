import chai from 'chai';
const expect = chai.expect;
import sampleTraveler from '../src/data/sampleTraveler'
import TravelerRepository from '../src/TravelerRepository';

describe('Traveler Repository Class', function () {
    let allTravelers, travelerRepo
    beforeEach(()=> {
        allTravelers = sampleTraveler
        travelerRepo = new TravelerRepository(allTravelers)
    })
    it('Should be a function', function() {
        expect(TravelerRepository).to.be.a('Function')
    })
    it('Should make an instance', function() {
        expect(travelerRepo).to.be.an.instanceOf(TravelerRepository)

    })
    it('Should hold on to all Traveler data', function() {

        expect(travelerRepo.allTravelData).to.eql(allTravelers)
    })
    it('Should be able to find a traveler by ID number', function() {
       const currentUser = { id: 1, name: 'Ham Leadbeater', travelerType: 'relaxer' }
        expect(travelerRepo.filterById(1)).to.eql(currentUser)
    })

})  
    


