const request = require("then-request");

const url = "https://google-webfonts-helper.herokuapp.com/api/fonts/";

const getFontsObj = async fontId => {
  let queryUrl = url + fontId;
  try {
    let response = await request("GET", queryUrl);
    let data = await response.getBody("UTF-8");
    //   Converts response JSON data to object
    let jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error("Error from fetching fontsObj...");
    throw Error(err);
  }
};

// Export Function as module
module.exports = getFontsObj;
