export class Label {
    id: string;
    name: string;
    sortName: string;
    disambiguation: string;
    releases: LabelRelease[];
}

export class LabelRelease {
    catalogNumber: string;
    releaseGroupId: string;
    releaseId: string;
    title: string;
    artistId: string;
    artistName: string;
}
