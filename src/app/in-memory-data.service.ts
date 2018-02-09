import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let shelves = [
      {
        id: 1,
        name: 'International Clash Day',
        ownerName: 'John Richards',
        ownerId: 1,
        tracklist: [
          'someMBID',
          'anotherMBID',
          'moreMBID',
          'someMBID',
          'anotherMBID',
          'moreMBID'
        ]
      },
      {
        id: 2,
        name: 'Morning Show 2/16/18',
        ownerName: 'John Richards',
        ownerId: 1,
        tracklist: [
          'someMBID',
          'anotherMBID',
          'moreMBID'
        ]
      },
      {
        id: 3,
        name: 'Audioasis 2/17/18',
        ownerName: 'Sharlese',
        ownerId: 2,
        tracklist: [
          'someMBID',
          'anotherMBID',
          'moreMBID'
        ]
      },
      {
        id: 4,
        name: 'El Sonido 2/12/18',
        ownerName: 'DJ Chilly',
        ownerId: 3,
        tracklist: [
          'someMBID',
          'anotherMBID',
          'moreMBID'
        ]
      },
      {
        id: 5,
        name: 'Upstream Day 1',
        ownerName: 'Kevin Cole',
        ownerId: 4,
        tracklist: [
          'someMBID',
          'anotherMBID',
          'moreMBID'
        ]
      },
      {
        id: 6,
        name: 'Upstream Day 2',
        ownerName: 'Cheryl Waters',
        ownerId: 5,
        tracklist: [
          'someMBID',
          'anotherMBID',
          'moreMBID'
        ]
      },
      {
        id: 7,
        name: 'Afternoon Show 2/16/18',
        ownerName: 'Kevin Cole',
        ownerId: 4,
        tracklist: [
          'someMBID',
          'anotherMBID',
          'moreMBID',
          'someMBID',
          'anotherMBID',
          'moreMBID',
          'someMBID',
          'anotherMBID',
          'moreMBID',
          'someMBID',
          'anotherMBID',
          'moreMBID'
        ]
      },
      {
        id: 8,
        name: 'RIP Mark E. Smith',
        ownerName: 'Owen',
        ownerId: 6,
        tracklist: [
          'moreMBID'
        ]
      },
      {
        id: 9,
        name: 'Songs in the Key of E',
        ownerName: 'John',
        ownerId: 7,
        tracklist: [
          'someMBID',
          'anotherMBID'
        ]
      },
      {
        id: 10,
        name: 'Protest Songs',
        ownerName: 'DJ Morgan',
        ownerId: 8,
        tracklist: [
          'someMBID',
          'anotherMBID',
          'moreMBID'
        ]
      },
      {
        id: 11,
        name: 'Under A Minute',
        ownerName: 'Larry Rose',
        ownerId: 9,
        tracklist: [
          'someMBID',
          'anotherMBID',
          'moreMBID'
        ]
      },
      {
        id: 12,
        name: 'Upstream Day 3',
        ownerName: 'Troy Nelson',
        ownerId: 10,
        tracklist: [
          'someMBID',
          'anotherMBID',
          'moreMBID'
        ]
      },
    ];
    return {shelves};
  }
}