import chai from 'chai';
const expect = chai.expect;
import destinationData from '../src/data/sampleDestinations';
import Destination from '../src/Destination'; 

describe('Destination Class', function() {
    let allDestinations, currentDestination, destination1
  beforeEach(()=> {
    allDestinations = destinationData
    currentDestination = allDestinations[0]
    destination1 = new Destination(currentDestination)
  })
  it("Should be a function", function() {
    expect(Destination).to.be.a("Function")
  })
  it("Should make an instance of Destination", function() {
    expect(destination1).to.be.an.instanceOf(Destination)
  })
  it("Should be able to have an id to reference location", function(){
    expect(destination1.id).to.eql(1)
  })
  it("Should have a destination name" ,function() {
    expect(destination1.location).to.eql('Lima, Peru')
  })
  it("Should have an estimated cost for lodging", function() {
    expect(destination1.estCostPerLodge).to.eql(70)
  })
  it("Should have an estimated cost for Flights per person",function(){
    expect(destination1.estFlightCostPerPerson).to.eql(400)
  })
  it("Should hold an image", function() {
const imageUrl = 'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80'
    expect(destination1.image).to.eql(imageUrl)
  })
  it('Should hold an alt image text', function() {
    const altText = 'overview of city buildings with a clear sky'
    expect(destination1.altImageTxt).to.eql(altText)
  })

})