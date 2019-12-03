// Components of the app are imported here and executed..
const fs = require("graceful-fs");
const path = require("path");
// const { exec, execFile } = require("child_process");
const FetchFontMappings = require("./fetchFontMappings");
const Download = require("./downloadFonts");
const GetFontObj = require("./getFontsObj");

//TODO: Create a log file to log all errors and warnings...

const ListOfFontsIds = async () => {
  const fontsList = await FetchFontMappings.getFontsList();
  return fontsList.map(font => font.id);
};

const DownloadAction = listofFontsUrl => {
  // listofFontsUrl here will be the urls (source and destination)
  listofFontsUrl.forEach(fontItem => {
    let {
      fontUrl,
      destPath,
      fontId,
      fontWeight,
      fontStyle,
      fileExt
    } = fontItem;
    Download(
      fontUrl,
      destPath,
      fontId,
      fontWeight,
      fontStyle,
      fileExt,
      (err, output) => {
        if (err) {
          console.error(
            Error(
              `${err} \n===> Error while downloading font ==> ${fontId}-${fontWeight}-${fontStyle}--${fileExt}`
            )
          );
        } else {
          console.log(`${fontId} FOnt Downloading!`);
        }
      }
    );
  });
};

// APp
const App = async () => {
  const fontIds = await ListOfFontsIds();
  // This is going to be a large function heh eh!
  // TODO: Abstract all these functions into modules..
  fontIds.forEach(async id => {
    // Time to start creating folders and all....

    // FOLDER: packages/${id} where id => fontId...
    // Before creating a folder, check if the folder is already existing....
    let packageDir = path.normalize(`${__dirname}/../packages/${id}`);

    const createPackageDir = () => {
      fs.exists(packageDir, check => {
        if (!check) {
          fs.mkdir(packageDir, {}, err => {
            if (err) {
              throw new Error(err);
            } else {
              console.log(`${id} FOlder Created...`);
              createFontDir();
            }
          });
        } else {
          throw new Error(`${id} folder is already existing...`);
        }
      });
    };

    // // FOLDER: packages/${id}/fonts
    let fontDir = path.normalize(`${__dirname}/../packages/${id}/fonts`);

    const createFontDir = () => {
      fs.exists(fontDir, check => {
        if (check) {
          throw new Error(`${id}/fonts folder is already existing...`);
        } else {
          fs.mkdir(fontDir, {}, err => {
            if (err) {
              createPackageDir();
            } else {
              console.log(`${id}/fonts folder Created...`);
            }
          });
        }
      });
    };

    // Check if packages/${id} is created and then fire the createFontDir..
    // fs.exists(packageDir, check => {
    //   if (!check) {
    //     createPackageDir();
    //   } else {
    //     createFontDir();
    //   }
    // });

    createPackageDir();

    const createDestFile = (
      fontDir,
      fontId,
      fontVersion,
      defSubset,
      fontWeight,
      fontStyle,
      fileExt
    ) => {
      let newStyle = "";
      if (fontStyle !== "normal") {
        newStyle = fontStyle;
      }

      const fontFile = `${fontId}-${fontVersion}-${defSubset}-${fontWeight}${newStyle}.${fileExt}`;

      return path.join(fontDir, fontFile);
    };

    const createlistofFontsUrl = (
      fontUrl,
      destPath,
      fontId,
      fontWeight,
      fontStyle,
      fileExt
    ) => {
      const listOfFonts = [];
      listOfFonts.push({
        fontUrl,
        destPath,
        fontId,
        fontWeight,
        fontStyle,
        fileExt
      });
      DownloadAction(listOfFonts);
    };

    const __getfontObj = async () => {
      const fontObj = await GetFontObj(id);

      // TODO: Add support for other font charset (subsets) e.g { "greek", "cyrillic", "latin-ext", "greek-ext", "vietnamese" }
      const fontVersion = fontObj.version;
      const defSubset = fontObj.defSubset;

      fontObj.variants.forEach(variant => {
        // TODO: add support for other font types later e.g { svg, eot, ttf }
        const tempArr = [];
        const { woff2: woff2, woff: woff } = variant;
        const { fontStyle, fontWeight } = variant;

        tempArr.push({ woff2, woff });
        tempArr.forEach(ff => {
          Object.keys(ff).forEach(ext => {
            if (ext === "woff2") {
              createlistofFontsUrl(
                ff.woff2,
                createDestFile(
                  fontDir,
                  id,
                  fontVersion,
                  defSubset,
                  fontWeight,
                  fontStyle,
                  ext
                ),
                id,
                fontWeight,
                fontStyle,
                ext
              );
            } else {
              createlistofFontsUrl(
                ff.woff,
                createDestFile(
                  fontDir,
                  id,
                  fontVersion,
                  defSubset,
                  fontWeight,
                  fontStyle,
                  ext
                ),
                id,
                fontWeight,
                fontStyle
              );
            }
          });
        });
      });
    };

    __getfontObj();
  });
};

App();
