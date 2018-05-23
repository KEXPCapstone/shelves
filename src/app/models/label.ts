export class Label {
    id: string;
    name: string;
    sortName: string;
    disambiguation: string;
    releases: LabelRelease[];
}

export class LabelRelease {
    catalogNumber: string;
    releaseGroupID: string;
    releaseID: string;
    title: string;
    artistID: string;
    artistName: string;
    asin: string;
    coverArtArchive: any;
}
