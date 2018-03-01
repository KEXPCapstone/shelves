import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let library = [
      {
        id: 3243252,
        title: 'American Dream',
        artistName: 'LCD Soundsystem',
        labelName: 'DFA Records',
        kexpCategory: 'Rock/Pop'
      },
      {
        id: 720343,
        title: 'Magnolia Electric Co.',
        artistName: 'Songs:Ohia',
        labelName: 'Secretly Canadian',
        kexpCategory: 'Rock/Pop'
      },
      {
        id: 6899852,
        title: 'Lese Majesty',
        artistName: 'Shabazz Palaces',
        labelName: 'Sub Pop',
        kexpCategory: 'Local'
      },
      {
        id: 1099082,
        title: 'Station to Station',
        artistName: 'David Bowie',
        labelName: 'RCA Records',
        kexpCategory: 'Rock/Pop'
      },
      {
        id: 289922,
        title: 'Run the Jewels 2',
        artistName: 'Run the Jewels',
        labelName: 'Mass Appeal Records',
        kexpCategory: 'Hip Hop'
      }
    ];
    let shelves = [
      {
        id: 1,
        name: 'International Clash Day',
        ownerName: 'John Richards',
        ownerId: 1,
        create_date: '02/16/2018',
        releases: [
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
        create_date: '02/16/2018',
        releases: [
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
        create_date: '02/16/2018',
        releases: [
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
        create_date: '02/16/2018',
        releases: [
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
        create_date: '02/16/2018',
        releases: [
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
        create_date: '02/16/2018',
        releases: [
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
        create_date: '02/16/2018',
        releases: [
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
        create_date: '02/16/2018',
        releases: [
          'moreMBID'
        ]
      },
      {
        id: 9,
        name: 'Songs in the Key of E',
        ownerName: 'John',
        ownerId: 7,
        create_date: '02/16/2018',
        releases: [
          'someMBID',
          'anotherMBID'
        ]
      },
      {
        id: 10,
        name: 'Protest Songs',
        ownerName: 'DJ Morgan',
        ownerId: 8,
        create_date: '02/16/2018',
        releases: [
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
        create_date: '02/16/2018',
        releases: [
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
        create_date: '02/16/2018',
        releases: [
          'someMBID',
          'anotherMBID',
          'moreMBID'
        ]
      }
    ];
    return {shelves, library};
  }
}