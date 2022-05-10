// import {postInputToOpenAI} from "./../src/js/apiData.js";

// describe(`submitEvent()`, () => {
//   test(`It should take the API response using user input and unshift strings into each index of array.`, () => {
//     //inside submit event:
//     let userInput = "Test Input.";
//     let responseObjects = [];

//     postInputToOpenAI(userInput)
//       .then(returnedData => {
//         const returnedDataText = returnedData.choices[0].text;
//         responseObjects.unshift(returnedDataText);
//       });
//     expect(responseObjects.length).toEqual(1);
//   });
// });