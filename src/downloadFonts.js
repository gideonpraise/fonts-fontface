// Receives list of fonts urls together with its destination and then run WGET to download each font..
const { exec, execFile } = require("child_process");

const DownloadFonts = (fontUrl, destPath, callback) => {
  url = "http://qnimate.com/wp-content/uploads/2014/03/images2.jpg";
  exec(`wget ${url}`, (err, stdout, stderr) => {
    // if (error) {
    //   // console.log(err);
    //   callback(error);
    // } else {
    //   console.log(stdout);
    // }

    if (!err) {
      console.log(`Downloading fonts`);
    }

    callback(err, stdout);
  });
};

// Export function as module
module.exports = DownloadFonts;
