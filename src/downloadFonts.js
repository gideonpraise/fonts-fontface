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
    `curl -# -k ${fontUrl} --output ${destPath}`,
    (err, stdout, stderr) => {
      callback(err, stdout);
    }
  );
};

// Export function as module
module.exports = DownloadFonts;
