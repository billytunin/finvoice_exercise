## Setup
Clone the repo wherever you want.<br />
Issue a `npm install` (or `yarn` if you prefer) command at project's root directory.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Livereload is turned on, meaning that the page will reload if you make any edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
Aswell as `yarn start`, this command also has a livereload feature turned on. Meaning it will automatically reload whenever you make changes to the unit test files. Unit test files are any files within the `src` directory that have the naming convention `***.test.js`.<br />
The first time you issue this command on the terminal it will run all tests and present you an interactive mode to proceed. From this point on, anytime you change a unit test file, it will livereload only that... meaning it won't run all tests again. If you want to do so press the key "a", just as the interactive dialog says.

## How does it work?

When app is up and running, you will see a simple site in which you have 2 big text areas.<br />
You may type in your JSON objects in these 2 fields and click the "Compare" button to get a "similarity score" from 0 to 1.<br /><br />
"Similarity score" does take into consideration the order in which the keys or indexes are set in each object.<br />
This means that comparing:<br />
`{ "a": [1, 2, 3, 4, 5] }`<br />
`{ "a": [1, 4, 3, 5, 2] }`<br />
Will hold a lower score number than:<br />
`{ "a": [1, 2, 3, 4, 5] }`<br />
`{ "a": [1, 2, 3, 5, 4] }`<br />
Even though the arrays contain the same values.<br /><br />
"Compare" button will be disabled if any of your JSON objects is invalid (that is, something's wrong with your JSON annotation).<br />

## Notes

I did not include any CSS preprocessor, such as SASS. Because it's not a recommended practice when using `Create React App`, [as stated in the official docs](https://create-react-app.dev/docs/adding-a-sass-stylesheet/).<br />
If we are worried about CSS scoping (we would like to keep CSS classes only scoped within each component) we could try paradigms like "Styled Components", or use a tool like [Emotion](https://emotion.sh/docs/introduction) . We would probably need to `eject` from `Create React App` for this intent.
