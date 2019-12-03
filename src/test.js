// const App = require("./app");
// const Download = require("./downloadFonts");
// const Zet = require('')

const testFunc = () => {
  let directory = `${__dirname}/../packages`;
  // console.log(path.normalize(directory));
  // console.log(__dirname);

  // Calling App
  //   App();

  //   let fontDir = `${__dirname}/../packages/abel`;
  //   fs.mkdir(fontDir, {}, err => {
  //     if (err) throw err;
  //     console.log("FOlder Created...");
  //   });

  //   exec(`ls ${directory}`, (err, stdout, stderr) => {
  //     if (err) {
  //       console.error(err + " error");
  //     } else {
  //       console.log(stdout);
  //     }
  //   });

  let total = [1, 2, 3, 4];
  total.forEach(i => {
    first = i;
  });
};

// testFunc();

let num = [1, 2, 3, 4];
let num2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let data = [
  "asd",
  "hale",
  "hsdiaw",
  "sdkawu",
  "saduwda",
  "ospajdw",
  "yueda",
  "kiysw",
  "oiuywa",
  "ploaw"
];

const getAllSubsets = theArray =>
  theArray.reduce(
    (subsets, value) => subsets.concat(subsets.map(set => [...set, value])),
    [[]]
  );

// console.log(getAllSubsets(num));

// const generateSubSet = araySet => {
//   araySet.reduce((subsets, value) => {
//     console.log(subsets + value);
//   });
// };

// generateSubSet(num);

let newArr = num.map((val, index, arr) => {
  console.log(index);
  console.log(arr);
  return val;
});

console.log(newArr);

function getCombinations(array) {
  function fork(i, t) {
    if (i === array.length) {
      result.push(t);
      return;
    }
    fork(i + 1, t.concat([array[i]]));
    fork(i + 1, t);
  }

  var result = [];
  fork(0, []);
  return result;
}

// result = getCombinations(data);

// console.log(result);

// Download();
