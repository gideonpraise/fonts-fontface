# fonts-fontface

Load and Import Specific CSS Open Source Fonts into your projects using Node Package Manager...

Importing Fonts now made easier...
Import and load only the needed fonts varaitions for your fonts.

## What does this package do?

- Load and import only the Fonts needed.
- Enhance app speed, performance and offline use.

As an example: my CSS theme works with Roboto font with variations 300,400,500,700. All I have to do is import that specific font and it's variations.

This package does just that for you.

## History

This service was inspired by _[Kyle Mathews's Typefaces project ](https://github.com/KyleAMathews/typefaces)_ in which all the fonts variations were all loaded together which caused reduction in performance due to large downloaded fonts.

## Usage

Just the way you can do the below with Google Fonts:.

```
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500italic,700&display=swap" />
```

You can now do the same with npm:

```
npm install --save font-face-roboto
```

Each font-fontface come bundled with all necessary font files.

To use in your project, add and import it in your entry-point:

```
import "typeface-roboto/300-400-500i-700.css";
```

Doing the above will import Roboto font with variations of 300normal, 400normal, 500italic and 700normal only.

Typeface assumes you’re using webpack with loaders setup for loading css
and font files (you can use Typeface with other setups but webpack makes
things really really simple). Assuming your webpack configuration is
setup correctly you then just need to require the typeface in the entry
file for your project.

## Note

Use together with webpack in order to bundle and inject the necessary files into the the project.

Tools like Create-React-App and Gatsby works out-of-the box together with this.

Feel free to use in your react projects.

## Contributions

Supports and contributions to this project are highly appreciated!!!
