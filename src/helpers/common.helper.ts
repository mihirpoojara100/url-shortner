// const md5 = require('md5');
import * as md5 from 'md5';
let counter = 1;
export default class Helper {
  getSmallUrlAndHash(long_url: string) {
    let md5Hash = md5(long_url);

    md5Hash = md5Hash + counter;

    const short_url = btoa(md5Hash).slice(0, 8); // converts into base64

    counter++;

    return [short_url, md5Hash];
  }
}
