 export interface BrowseCategory {
    id: string;
    name: string;
    groups: any[];
}

export const BROWSE_NAV_ITEMS: BrowseCategory[] = [
    {
        id: 'shelves',
        name: 'Shelves',
        groups: [
            {
                id: 'mine',
                name: 'My shelves'
            },
            {
                id: 'all',
                name: 'All'
            },
            {
                id: 'featured',
                name: 'Featured'
            }
        ]
    },
    {
        id: 'artists',
        name: 'Artists',
        groups: setAlphabeticalGroups()
    },
    {
        id: 'genres',
        name: 'Genres',
        groups: [
            {id: 'electronic', name: 'Electronic'},
            {id: 'hip-hop', name: 'Hip Hop'},
            {id: 'holiday', name: 'Holiday'},
            {id: 'jazz', name: 'Jazz'},
            {id: 'local', name: 'Local'},
            {id: 'none', name: 'None'},
            {id: 'rock-pop', name: 'Rock/Pop'},
            {id: 'roots', name: 'Roots'},
            {id: 'world', name: 'World'}
        ]
    },
    {
        id: 'labels',
        name: 'Labels',
        groups: setAlphabeticalGroups()
    }
];

function setAlphabeticalGroups(): any[] {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('').slice();
    const groups = [];
    alphabet.forEach(element => {
        groups.push(
            {
                id: element,
                name: element
            }
        );
    });
    // add misc group
    groups.push(
        {
            id: 'misc',
            name: 'misc (0-9 etc)'
        }
    );
    return groups;
}
