import chai from 'chai';
const expect = chai.expect;
import destinationData from '../src/data/sampleDestinations';
import DestinationRepository from '../src/DestinationRepository';

describe('Destination Repository Class', function() {
    let allDestinations, destinationRepo
  beforeEach(()=> {
    allDestinations = destinationData
    destinationRepo = new DestinationRepository(allDestinations)
  })
  it('Should be a function', function() {
    expect(DestinationRepository).to.be.a("Function")
  })
  it("Should make an instance of Destination Repository", function() {
    expect(destinationRepo).to.be.an.instanceOf(DestinationRepository);
  })
  it("Should hold on to all the destination data", function() {
    expect(destinationRepo.allDestinations).to.eql(allDestinations)
  })
  it("Should default a userSelected destination to null", function(){
    expect(destinationRepo.userSelectedDestination).to.eql(null)
  })
  it("Should store a user selected Destination by ID", function(){
    const selectedPlace =  {
  id: 1,
  destination: 'Lima, Peru',
  estimatedLodgingCostPerDay: 70,
  estimatedFlightCostPerPerson: 400,
  image: 'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
  alt: 'overview of city buildings with a clear sky'
    } 
    destinationRepo.findLocationById(1)
    expect(destinationRepo.userSelectedDestination).to.eql(selectedPlace)
  })
  it("Should tell the user to pick a destination when there is no match", function() {
    expect(destinationRepo.findLocationById(null)).to.eql('Please, pick a destination!')
  })
  it("Should calculate estimated cost for lodging per day", function() {
    destinationRepo.findLocationById(1)
    expect(destinationRepo.estCostPerLodge(4)).to.eql(280)
  })
  it("Should calculate estimated cost per traveler" , function() {
    destinationRepo.findLocationById(1)
    expect(destinationRepo.estCostPerTraveler(6)).to.eql(2400)
  })
  it("Should give a total cost include a 10% travel fee", function() {
    destinationRepo.findLocationById(1)
    expect(destinationRepo.getTotalCost(4,5)).to.eql(2508)
  })
  it("Should return all of the location names", function(){
    const destinationNames = [
    'Lima, Peru',
    'Stockholm, Sweden',
    'Sydney, Austrailia',
    'Cartagena, Colombia',
    'Madrid, Spain',
    'Jakarta, Indonesia']
    expect(destinationRepo.getAllDest()).to.eql(destinationNames)
  })
  it("Should be able to return a destination img by id reference", function() {
    
    const matchedImage = 'https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
    const matchedAlt = 'boats at a dock during the day time'
    
    expect(destinationRepo.getDestImgInfo(4,'image')).to.eql(matchedImage)
    expect(destinationRepo.getDestImgInfo(4,'alt')).to.eql(matchedAlt)
  })

})