// Receives list of fonts urls together with its destination and then run WGET to download each font..
const { exec, execFile } = require("child_process");
const shell = require("shelljs");

// TODO: Show download progress and percentage...
const DownloadFonts = (
  fontUrl,
  destPath,
  fontId,
  fontWeight,
  fontStyle,
  fileExt,
  callback
) => {
  shell.exec(
    `wget --no-check-certificate -O ${destPath} ${fontUrl} -t 8`,
    (err, stdout, stderr) => {
      callback(err, stdout);
    }
  );
};

// Export function as module
module.exports = DownloadFonts;
