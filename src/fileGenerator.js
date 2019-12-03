// This module will contain functions to create files for each font package.
// They will be accepting parameters..

const cssFile = (fontFamily, fontStyle, fontWeight, fontVersion) => {
  `
    /* ${fontFamily}-${fontStyle} - latin */
    @font-face {
      font-family: ${fontFamily};
      font-style: ${fontStyle};
      font-display: swap;
      font-weight: ${fontWeight};
      src: url('../fonts/roboto-v20-latin-${fontStyle}.eot'); /* IE9 Compat Modes */
      src: local('Roboto '), local('Roboto-${fontStyle}'),
          url('../fonts/roboto-v20-latin-${fontStyle}.woff2') format('woff2'), /* Super Modern Browsers */
          url('../fonts/roboto-v20-latin-${fontStyle}.woff') format('woff'), /* Modern Browsers */
          url('../fonts/roboto-v20-latin-${fontStyle}.ttf') format('truetype'), /* Safari, Android, iOS */
          url('../fonts/roboto-v20-latin-${fontStyle}.svg#Roboto') format('svg'); /* Legacy iOS */
    }
`;
};
