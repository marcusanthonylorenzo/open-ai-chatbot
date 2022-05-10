import "./css/styles.css";
import {postInputToOpenAI} from "./../src/js/apiData.js";

function dataWrapper() {
  
  //user input storage for POST requests.
  let userInput = {
    prompt: "Write a poem about a dog wearing skis", //document.getElementById("textInput").value;
    temperature: 0.5,
    max_tokens: 20,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
  let responseObjects = [];

  //Form submit on click event.
  const submitEvent = (userInput) => {
    postInputToOpenAI(userInput)
      .then(returnedData => {
        const returnedDataText = returnedData.choices[0].text;
        responseObjects.unshift(returnedDataText);
        console.log(responseObjects);
        prependToPage(returnedDataText);
      });
  };

  const submitButton = document.getElementById("submitBtn");
  submitButton.addEventListener("click", (event) =>{
    event.preventDefault();
    submitEvent(userInput);
  });


  //UI
  const prependToPage = (textToPrepend) => {
    const output = document.querySelector(".container");
    const p = document.createElement("p");
    output.prepend(p);
    p.textContent = textToPrepend;
  };

}
dataWrapper();
