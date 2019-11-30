// Components of the app are imported here and executed..
const fs = require("fs");
const path = require("path");
const { exec, execFile } = require("child_process");
const FetchFontMappings = require("./fetchFontMappings");
const Download = require("./downloadFonts");
const GetFontObj = require("./getFontsObj");

const ListOfFontsIds = async () => {
  const fontsList = await FetchFontMappings.getFontsList();
  return fontsList.map(font => font.id);
};

const DownloadAction = listofFontsUrl => {
  // listofFontsUrl here will be the urls (source and destination)
  listofFontsUrl.forEach(fontItem => {
    let { fontUrl, destPath } = fontItem;
    Download(fontUrl, destPath, (err, output) => {
      if (err) {
        throw Error(
          err + " ===> Error from app.js with error code: " + err.code
        );
      } else {
        console.log("Download is working!");
      }
    });
  });
};

// APp
const App = async () => {
  const fontIds = await ListOfFontsIds();
  // This is going to be a large function heh eh!
  // TODO: Abstract all these functions into modules..
  fontIds.forEach(async id => {
    const fontObj = await GetFontObj(id);
    // console.log(fontObj);

    // Time to start creating folders and all....

    // Folder Structure

    // FOLDER: packages/${id} where id => fontId...

    // Before creating a folder, check if the folder is already existing....
    const createPackageDir = () => {
      let packageDir = path.normalize(`${__dirname}/../packages/${id}`);
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
    const createFontDir = () => {
      let fontDir = path.normalize(`${__dirname}/../packages/${id}/fonts`);
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
  });
};

App();

const testFunc = () => {
  let directory = `${__dirname}/../packages`;
  // console.log(path.normalize(directory));
  // console.log(__dirname);

  // Calling App
  //   App();

  let packageDir = path.normalize(`${__dirname}/../packages/abel`);
  let fontDir = path.normalize(`${__dirname}/../packages/abel/fonts`);
  // fs.mkdir(fontDir, {}, err => {
  //   if (err) throw err;
  //   console.log("FOlder Created...");
  // });

  // exec(`ls ${directory}`, (err, stdout, stderr) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log(stdout);
  //   }
  // });

  fs.exists(fontDir, check => {
    if (check) {
      throw new Error(`abel/fonts folder is already existing...`);
    } else {
      fs.mkdir(fontDir, {}, err => {
        if (err) throw new Error(err);
        console.log(`abel/fonts FOlder Created...`);
      });
    }
  });

  // let packageDir = path.normalize(`${__dirname}/../packages/abel`);
  // console.log(packageDir);
};

// testFunc();
