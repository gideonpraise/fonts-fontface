// Accept request to get specific font-weights. E.g: 200, 300, 400-italic, 500...
// Download only requested font-weight files and write out css to import them..
const request = require("then-request");
const fs = require("fs");

console.log("Dev started..");

const url = "https://google-webfonts-helper.herokuapp.com/api/fonts/";

const fetchFontJson = async url => {
  try {
    let response = await request("GET", url);
    let data = await response.getBody("UTF-8");
    //   Converts response JSOn data to object
    let jsonData = await JSON.parse(data);
    console.log(jsonData.length);
    return jsonData;
  } catch (err) {
    throw new Error("Error from fetching fontJson...");
  }
};

// Call fetchFontJson
const initTest = async () => {
  const fontObject = await fetchFontJson(url);

  const fontId = fontObject.map(font => {
    return font;
  });
  console.log(fontId);
};

initTest();

// console.log(fontObject);
