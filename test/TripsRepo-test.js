import chai from 'chai';
import tripsData from '../src/data/sampleTrips';
const expect = chai.expect;
import sampleTrips from '../src/data/sampleTrips'
import TripsRepository from '../src/TripsRepository';


describe('Trips Repository Class ', function() {
    let tripRepo;
    let destinations; 
  beforeEach(() => {
  tripRepo = new TripsRepository(sampleTrips);
    destinations = [{
    "id": 1,
    "destination": "Lima, Peru",
    "estimatedLodgingCostPerDay": 70,
    "estimatedFlightCostPerPerson": 400,
    "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    "alt": "overview of city buildings with a clear sky"
    },
    {
    "id": 2,
    "destination": "Stockholm, Sweden",
    "estimatedLodgingCostPerDay": 100,
    "estimatedFlightCostPerPerson": 780,
    "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "city with boats on the water during the day time"
    },
    {
    "id": 3,
    "destination": "Sydney, Austrailia",
    "estimatedLodgingCostPerDay": 130,
    "estimatedFlightCostPerPerson": 950,
    "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "opera house and city buildings on the water with boats"
    },
    {
    "id": 4,
    "destination": "Cartagena, Colombia",
    "estimatedLodgingCostPerDay": 65,
    "estimatedFlightCostPerPerson": 350,
    "image": "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    "alt": "boats at a dock during the day time"
    },
    {
    "id": 5,
    "destination": "Madrid, Spain",
    "estimatedLodgingCostPerDay": 150,
    "estimatedFlightCostPerPerson": 650,
    "image": "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "city with clear skys and a road in the day time"}
    ]
  })

  it('Should be a function',function() {
    expect(TripsRepository).to.be.a('Function');
  })
  it("Should make an instance", function(){
    expect(tripRepo).to.be.an.instanceOf(TripsRepository);
  })
  it("Should contain all trips", function() {
    expect(tripRepo.allTrips).to.eql(sampleTrips)
  })
  it("Should default a current Users Trips to null", function() {
    expect(tripRepo.currentUserTrips).to.eql(null);
  })
  it('Should default annual trips to null', function() {
    expect(tripRepo.usersAnnualTrips).to.eql(null);
  })
  it("Should contain a current users trips by id", function() {
  const userTrips = [
  {
    id: 1,
    userID: 1,
    destinationID: 1,
    travelers: 1,
    date: '2022/09/16',
    duration: 8,
    status: 'approved',
    suggestedActivities: []
  },
  {
    id: 2,
    userID: 1,
    destinationID: 2,
    travelers: 5,
    date: '2022/10/04',
    duration: 18,
    status: 'pending',
    suggestedActivities: []
  },
  {
    id: 5,
    userID: 1,
    destinationID: 4,
    travelers: 3,
    date: '2021/10/07',
    duration: 18,
    status: 'pending',
    suggestedActivities: []
  },
  {
    id: 6,
    userID: 1,
    destinationID: 35,
    travelers: 3,
    date: '2021/11/19',
    duration: 9,
    status: 'approved',
    suggestedActivities: []
  },
  {
    id: 7,
    userID: 1,
    destinationID: 17,
    travelers: 5,
    date: '2022/5/28',
    duration: 20,
    status: 'pending',
    suggestedActivities: []
  },
  {
    id: 8,
    userID: 1,
    destinationID: 4,
    travelers: 6,
    date: '2022/10/12',
    duration: 4,
    status: 'pending',
    suggestedActivities: []
  }
    ]
    expect(tripRepo.filterById(1)).to.eql(userTrips)
  })
  it("Should store all of the users trips", function() {
     const userTrips = [
  {
    id: 1,
    userID: 1,
    destinationID: 1,
    travelers: 1,
    date: '2022/09/16',
    duration: 8,
    status: 'approved',
    suggestedActivities: []
  },
  {
    id: 2,
    userID: 1,
    destinationID: 2,
    travelers: 5,
    date: '2022/10/04',
    duration: 18,
    status: 'pending',
    suggestedActivities: []
  },
  {
    id: 5,
    userID: 1,
    destinationID: 4,
    travelers: 3,
    date: '2021/10/07',
    duration: 18,
    status: 'pending',
    suggestedActivities: []
  },
  {
    id: 6,
    userID: 1,
    destinationID: 35,
    travelers: 3,
    date: '2021/11/19',
    duration: 9,
    status: 'approved',
    suggestedActivities: []
  },
  {
    id: 7,
    userID: 1,
    destinationID: 17,
    travelers: 5,
    date: '2022/5/28',
    duration: 20,
    status: 'pending',
    suggestedActivities: []
  },
  {
    id: 8,
    userID: 1,
    destinationID: 4,
    travelers: 6,
    date: '2022/10/12',
    duration: 4,
    status: 'pending',
    suggestedActivities: []
  }]
    tripRepo.filterById(1)
    expect(tripRepo.currentUserTrips).to.eql(userTrips)
  })
  it("Should store a users annual trips", function() {
     tripRepo.filterById(1)
     const annualTrips = 
     [{
    id: 1,
    userID: 1,
    destinationID: 1,
    travelers: 1,
    date: '2022/09/16',
    duration: 8,
    status: 'approved',
    suggestedActivities: []
  },
  {
    id: 6,
    userID: 1,
    destinationID: 35,
    travelers: 3,
    date: '2021/11/19',
    duration: 9,
    status: 'approved',
    suggestedActivities: []
  }
    ]
      tripRepo.filterById(1)
    expect(tripRepo.showAnnualTrips('2021/10/06','2022/10/06')).to.eql(annualTrips)
    expect(tripRepo.usersAnnualTrips).to.eql(annualTrips)
  })
  it("Should show past trip", function() {
    tripRepo.filterById(1)
    const pastTrips = [{
    id: 1,
    userID: 1,
    destinationID: 1,
    travelers: 1,
    date: '2022/09/16',
    duration: 8,
    status: 'approved',
    suggestedActivities: []
  },
  {
    id: 2,
    userID: 1,
    destinationID: 2,
    travelers: 5,
    date: '2022/10/04',
    duration: 18,
    status: 'pending',
    suggestedActivities: []
  },
  {
    id: 5,
    userID: 1,
    destinationID: 4,
    travelers: 3,
    date: '2021/10/07',
    duration: 18,
    status: 'pending',
    suggestedActivities: []
  },
  {
    id: 6,
    userID: 1,
    destinationID: 35,
    travelers: 3,
    date: '2021/11/19',
    duration: 9,
    status: 'approved',
    suggestedActivities: []
  },
  {
    id: 7,
    userID: 1,
    destinationID: 17,
    travelers: 5,
    date: '2022/5/28',
    duration: 20,
    status: 'pending',
    suggestedActivities: []
    }]
  
  tripRepo.filterById(1)
  expect(tripRepo.showPastTrips("2022/10/06")).to.eql(pastTrips)
  })

  it('Should show future trips',function() {
    tripRepo.filterById(1)
    const nextTrip = [
  {
    id: 8,
    userID: 1,
    destinationID: 4,
    travelers: 6,
    date: '2022/10/12',
    duration: 4,
    status: 'pending',
    suggestedActivities: []
  }
]
    expect(tripRepo.showFutureTrips("2022/10/06")).to.eql(nextTrip)
  })
  it('Should show the annual spending on trips',function() {
    tripRepo.filterById(1)
    tripRepo.showAnnualTrips('2021/10/06','2022/10/06')
    expect(tripRepo.showAnnualSpent(destinations)).to.eql('1056.00')
  })
  it('Should filter pending trips', function() {
    const tripsPending = [{
    id: 2,
    userID: 1,
    destinationID: 2,
    travelers: 5,
    date: '2022/10/04',
    duration: 18,
    status: 'pending',
    suggestedActivities: []
  },
  {
    id: 5,
    userID: 1,
    destinationID: 4,
    travelers: 3,
    date: '2021/10/07',
    duration: 18,
    status: 'pending',
    suggestedActivities: []
  },
  {
    id: 7,
    userID: 1,
    destinationID: 17,
    travelers: 5,
    date: '2022/5/28',
    duration: 20,
    status: 'pending',
    suggestedActivities: []
  },
  {
    id: 8,
    userID: 1,
    destinationID: 4,
    travelers: 6,
    date: '2022/10/12',
    duration: 4,
    status: 'pending',
    suggestedActivities: []
  }]
    
    tripRepo.filterById(1)
    expect(tripRepo.showPending(1)).to.eql(tripsPending)
  })

})