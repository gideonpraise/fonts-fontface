// Components of the app are imported here and executed..
const FetchFontMappings = require("./fetchFontMappings");
const Download = require("./downloadFonts");

const testApp = async () => {
  const results = await FetchFontMappings.getFontsList();
  console.log(results);
};

testApp();

const testList = ["app", "here", "test", "go"];

const DownloadAction = testList => {
  // Testlist here will be the urls (source and destination)
  Download.now(testList, err => {
    if (err) {
      throw Error(err + " ===> Error from app.js with error code: " + err.code);
    } else {
      console.log("Download is working!");
    }
  });
};

// DownloadAction(testList);
// Download.testFunc();
