 export interface BrowseCategory {
    id: string;
    name: string;
    groups: string[];
}

export const BROWSE_NAV_ITEMS: BrowseCategory[] = [
    {
        id: 'artists',
        name: 'Artists',
        groups: getAlphabeticalGroups()
    },
    {
        id: 'labels',
        name: 'Labels',
        groups: getAlphabeticalGroups()
    },
    {
        id: 'decades',
        name: 'Decades',
        groups: [
        ]
    }
];

function getAlphabeticalGroups(): string[] {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet.split('').slice().concat(['misc']);
}
