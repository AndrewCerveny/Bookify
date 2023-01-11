import chai from 'chai';
const expect = chai.expect;
import sampleTraveler from '../src/data/sampleTraveler'
import Traveler from '../src/Traveler';

describe('Traveler Class', function() {
    let travelerData, currentTraveler,traveler1
  beforeEach(()=> {
    travelerData = sampleTraveler
    currentTraveler = sampleTraveler[0]
    traveler1 = new Traveler(currentTraveler)
  })
  
  it('Should be a function', function() {
    expect(Traveler).to.be.a("function");
  });
  it('Should make an instance of Traveler', function() {
    expect(traveler1).to.be.an.instanceOf(Traveler)
  })
  it('Should hold an i.d', function() {
    expect(traveler1.id).to.equal(1)
  })
  it('Should hold a name',function(){
    expect(traveler1.name).to.equal('Ham Leadbeater')
  })
  it('Should hold a travelerType', function (){
   expect(traveler1.travelerType).to.equal('relaxer') 
  })
  it('Should be able to return their firstName',function(){
    expect(traveler1.showFirstName()).to.equal('Ham')
  })
});
