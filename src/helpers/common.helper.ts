// const md5 = require('md5');
import * as md5 from 'md5';
let counter = 1;
export default class Helper {
  getSmallUrlAndHash(long_url: string) {
    const md5Hash = md5(long_url);

    const md5HashUpdated = counter + md5Hash.slice(0, 8); // converts into base64

    const short_url = btoa(md5HashUpdated);

    counter++;

    return [short_url, md5Hash];
  }
}
