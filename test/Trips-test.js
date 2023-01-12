import chai from 'chai';
const expect = chai.expect;
import sampleTrips from '../src/data/sampleTrips'
import Trip from '../src/Trips';


describe('Trips Class', function() {
    let tripsData, currentTrip,trip1
  beforeEach(() => {
    tripsData = sampleTrips
    currentTrip = sampleTrips[0]
    trip1 = new Trip(currentTrip)
  })
  it("Should be a function",function() {
    expect(Trip).to.be.a("Function")
  })
  it("Should make an instance", function() {
    expect(trip1).to.be.an.instanceOf(Trip)
  })
  it("Should have a tripId" , function() {
    expect(trip1.tripId).to.eql(1)
  })
  it("Should have a userID", function() {
    expect(trip1.userId).to.eql(1)
  })
  it("Should have a destinationID", function() {
    expect(trip1.destinationId).to.equal(1)
  })
  it("Should hold amount of travelers for trip", function() {
    expect(trip1.travelers).to.eql(1)
  })
  it("Should have a date", function() {
    expect(trip1.date).to.equal('2022/09/16')
  })
  it('Should have a length of stay', function() {
    expect(trip1.duration).to.eql(8)
  })
  it("Should have a status", function() {
    expect(trip1.status).to.eql('approved')
  })
  it("Should hold suggested Activities", function() {
    expect(trip1.suggestedActivities).to.eql([])
  })
})