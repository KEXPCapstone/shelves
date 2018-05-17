export class Artist {
    id: string;
    name: string;
    sortName: string;
    disambiguation: string;
    releaseGroups: ArtistReleaseGroup[];
}

export class ArtistReleaseGroup {
    releaseGroupId: string;
    releases: any[];
    title: string;
}
