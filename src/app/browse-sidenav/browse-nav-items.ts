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
        id: 'labels',
        name: 'Labels',
        groups: setAlphabeticalGroups()
    },
    {
        id: 'decades',
        name: 'Decades',
        groups: [
        ]
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
