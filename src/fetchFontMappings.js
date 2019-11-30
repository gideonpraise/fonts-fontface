// Accept request to get specific font-weights. E.g: 200, 300, 400-italic, 500...
// Download only requested font-weight files and write out css to import them..
const request = require("then-request");
const fs = require("fs");
// const DownloadFonts = require("./downloadFonts");

console.log("Dev started..");

const url = "https://google-webfonts-helper.herokuapp.com/api/fonts/";

const fetchFontJson = async url => {
  try {
    let response = await request("GET", url);
    let data = await response.getBody("UTF-8");
    //   Converts response JSOn data to object
    let jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error("Error from fetching fontsJson...");
    throw Error(err);
  }
};

// Get list of font Ids..
const getFontsList = async () => {
  try {
    const fontObject = await fetchFontJson(url);
    const fontVarObj = fontObject.map(font => {
      return {
        id: font.id,
        fontFamily: font.family,
        fontVariants: {
          variants: (newVariants = font.variants.map(variant => {
            if (variant === "regular") {
              return (variant = "400");
            }
            if (variant === "italic") {
              return (variant = "400italic");
            } else {
              return variant;
            }
          })),
          total: font.variants.length
        }
      };
    });

    // fontVarObj will be in form of {
    //   id: string,
    //   fontFamily: string,
    //   fontVariants: {
    //     variants: [],
    //     total: number
    //   }
    // }

    return fontVarObj;
  } catch (err) {
    console.error("Error from mapping FontIds...");
    console.error(err);
  }
};

// getFontsList();

// Get Total Number of Font-Variants
const getTotalFontVariants = async () => {
  const fontsList = await getFontsList();
  const listOfVariants = fontsList.map(font => {
    return font.fontVariants.total;
  });
  const getTotalVariants = listOfVariants.reduce((total, amount) => {
    return total + amount;
  });
  //  Total number of font-variants
  console.log(`${getTotalVariants} font-variants..`);
};

// getTotalFontVariants();

// Map each font to its font-weight variations
// Usiing 2^n to get the max number of font-weight variations.. where n is the number of font variants..

// const getTotalFontPackages = async () => {
//   obj = await getFontsList();
//   obj.forEach(i => console.log(i.fontVariants));
// };

// getTotalFontPackages();

// Download Packages..
// DownloadFonts();

// Export Functions
exports.getFontsList = getFontsList;
exports.getTotalFontVariants = getTotalFontVariants;
