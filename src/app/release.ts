// Release class represents a single release in the KEXP library
export class Release {
  id: string;
  artistCredit: any[];
  releaseEvents: any[];
  KEXPReleaseGroupMBID: string;
  KEXPReleaseArtistCredit: string;
  labelInfo: any[];
  media: any[];
  status: string;
  disambiguation: string;
  barcode: string;
  packaging: string;
  date: string; // parse into datetime
  asin: string;
  title: string;
  countryCode: string;
  yellows: number[];
  reds: number[];
  KEXPPrimaryGenre: string;
  KEXPArtist_KEXPSortName: string;
  KEXPFirstReleaseDate: string;
  KEXPTitle: string;
}

