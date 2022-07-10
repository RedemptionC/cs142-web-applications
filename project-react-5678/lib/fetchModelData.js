var Promise = require("Promise");
import axios from "axios";
/**
 * FetchModel - Fetch a model from the web server.
 *     url - string - The URL to issue the GET request.
 * Returns: a Promise that should be filled
 * with the response of the GET request parsed
 * as a JSON object and returned in the property
 * named "data" of an object.
 * If the requests has an error the promise should be
 * rejected with an object contain the properties:
 *    status:  The HTTP response status
 *    statusText:  The statusText from the xhr request
 *
 */

function fetchModel(url) {
  return axios.get(url);
  // return new Promise(function (resolve, reject) {
  //   console.log(`fetchModel called with ${url}`);
  //   let xhr = new XMLHttpRequest();
  //   xhr.onreadystatechange = function (e) {
  //     if (this.readyState === 4) {
  //       if (this.status === 200) {
  //         resolve(this.responseText);
  //       } else {
  //         reject(new Error(`fail to get ${url}`));
  //       }
  //     }
  //   };
  //   xhr.open("GET", url);
  //   xhr.send();
  // });
}

export default fetchModel;
