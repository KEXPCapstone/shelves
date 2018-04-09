// Release class represents a single release in the KEXP library
export class Release {
  id: string; // currently 'KEXPMBID', but required by in memory test API to be named 'id'
  KEXPReleaseGroupMBID: string;
  KEXPPrimaryGenre: string;
  KEXPCountryCode: string;
  KEXPDateReleased: string; // may end up being date (if reformatted)
  KEXPReleaseArtistCredit: string;
  KEXPArtist_KEXPSortName: string;
  KEXPFirstReleaseDate: string; // or Date
  KEXPTitle: string;
  // title: string;
  // artistName: string;
  // labelName: string;
  // kexpCategory: string;
  // trackList: string[]; // what do we need to store tracks as?
  // releaseDate: Date;
  // imageUrl: string;
  // releaseMBID: string;
  // daletLibraryCategoryID: string; // the 'id' of the primary category under which this release is filed in dalet
  // releaseLength: Date; // hh:mm:ss
  // more fields ...
}

