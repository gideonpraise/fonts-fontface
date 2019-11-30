const App = require("./app");
const Download = require("./downloadFonts");

const testFunc = () => {
  let directory = `${__dirname}/../packages`;
  // console.log(path.normalize(directory));
  // console.log(__dirname);

  // Calling App
  App();

  let fontDir = `${__dirname}/../packages/abel`;
  fs.mkdir(fontDir, {}, err => {
    if (err) throw err;
    console.log("FOlder Created...");
  });

  exec(`ls ${directory}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(stdout);
    }
  });
};

testFunc();

Download();
