import { InMemoryDbService, RequestInfo, ParsedRequestUrl, RequestInfoUtilities,
  ResponseOptions, getStatusText, STATUS } from 'angular-in-memory-web-api';

const fieldMap = {
    'rock-pop': 'Rock/Pop',
    'local': 'Local',
    'world': 'World',
    'hip-hop': 'Hip Hop',
    'roots': 'Roots',
    'holiday': 'Holiday',
    'reggae': 'Reggae',
    'jazz': 'Jazz',
    'soundtrack': 'Soundtrack',
    'electronic': 'Electronic',
    'experimental': 'Experimental'
};

export class InMemoryDataService implements InMemoryDbService {
  release_json: any;
  shelves_json: any;

  constructor() {
    // pull in json
    this.release_json = require('./dalet_releases_3000.json');
    this.shelves_json = require('./test_shelves.json');
  }

  createDb() {
    const library = this.release_json;
    const shelves = this.shelves_json;
    return {shelves, library};
  }

  // HTTP GET interceptor
  get(reqInfo: RequestInfo) {
    const collectionName = reqInfo.collectionName;
    const url = reqInfo.url;
    const parsedUrl = reqInfo.utils.parseRequestUrl(url);
    // console.log('collection: ' + collectionName);
    // console.log('url: ' + reqInfo.url);
    // console.log(parsedUrl.id);
    if (url.startsWith('api/library/releases/categories')) {
      const category = url.split('/')[4];
      // console.log('category: ' + category);
      return this.getCategoryReleases(reqInfo, category);
    }
    return undefined; // let the default GET handle all others
  }

  private getCategoryReleases(reqInfo: RequestInfo, category: string) {
      return reqInfo.utils.createResponse$(() => {
        console.log('HTTP GET override');
        const data = this.release_json.filter(release => release.KEXPPrimaryGenre === fieldMap[category]);
        const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
        const options: ResponseOptions = {
          body: dataEncapsulation ? { data } : data,
          status: STATUS.OK
        };
        return this.finishOptions(options, reqInfo);
      });
  }

  private finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }
}
