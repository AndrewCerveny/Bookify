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
  it("Should hold on to all the location data", function() {
    expect(destinationRepo.allDestinations).to.eql(allDestinations)
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
    expect(destinationRepo.findLocationById(1)).to.eql(selectedPlace)
  })
  it("Should tell the user to pick a location when there is no match", function() {
    expect(destinationRepo.findLocationById(null)).to.eql('Please, pick a destination!')
  })
  it("Should calculate estimated cost for lodging per day", function() {
    destinationRepo.findLocationById(1)
    expect(destinationRepo.estCostPerLodge(4,1 )).to.eql(280)
  })
  it("Should calculate estimated cost per traveler" , function() {
    expect(destinationRepo.estCostPerTraveler(6,1)).to.eql(2400)
  })
  it("Should give a total cost include a 10% travel fee", function() {
    expect(destinationRepo.getTotalCost(6,3,1)).to.eql('1782.00')
  })
  it("Should return all of the location names", function(){
    const destinationNames = [
    { id: 1, destination: 'Lima, Peru' },
    { id: 2, destination: 'Stockholm, Sweden' },
    { id: 3, destination: 'Sydney, Austrailia' },
    { id: 4, destination: 'Cartagena, Colombia' },
    { id: 5, destination: 'Madrid, Spain' },
    { id: 6, destination: 'Jakarta, Indonesia' }
    ]
    expect(destinationRepo.getAllDest()).to.eql(destinationNames)
  })
  it("Should be able to return a location img by id reference", function() {
    
    const matchedImage = 'https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
    const matchedAlt = 'boats at a dock during the day time'
    
    expect(destinationRepo.getDestImgInfo(4,'image')).to.eql(matchedImage)
    expect(destinationRepo.getDestImgInfo(4,'alt')).to.eql(matchedAlt)
  })

})