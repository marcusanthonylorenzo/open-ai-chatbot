import "./css/styles.css";
import {postInputToOpenAI} from "./../src/js/apiData.js";

function dataWrapper() {
  //user input storage for POST requests.
  let userInput = {
    prompt: "",
    temperature: 0.5,
    max_tokens: 20,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
  let responseArray = [];

  //Form submit on click event.
  const submitEvent = async (userInput) => {
    await postInputToOpenAI(userInput)
      .then(returnedData => {
        const returnedDataText = returnedData.choices[0].text;
        responseArray.push(returnedDataText);
        console.log(responseArray);
        prependToPage(returnedDataText, "right");
      });
  };

  const submitButton = document.getElementById("submitBtn");
  submitButton.addEventListener("click", (event) =>{
    event.preventDefault();
    //Add "...AI is typing text?"
    userInput.prompt = document.getElementById("formInput").value;
    prependToPage(userInput.prompt, "left");
    submitEvent(userInput);
  });


  /* MAIN UI */
  let postID = 1;
  const prependToPage = (textToPrepend, side) => {
    //General selectors
    const output = document.querySelector(".output");
    const chatBubbleDiv = document.createElement("div");
    let newPostID = postID ++;
    let postIndex = responseArray.length - 1;
    const timestamp = new Date().toLocaleTimeString();

    //Create new div for each new post, attach ID.
    chatBubbleDiv.classList.add(`chatBubble`);
    chatBubbleDiv.setAttribute(`id`, `post${newPostID}`);
    chatBubbleDiv.style.justifyContent = "left";
    output.appendChild(chatBubbleDiv);

    //For each new post, add a delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add(`deleteBtns`);
    const thisDiv = document.getElementById(`post${newPostID}`);
    thisDiv.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
      thisDiv.remove();
      responseArray.splice(postIndex, 1);
      console.log(responseArray, postIndex);
    });

    //Chat content.
    const chatBuilder = (name) => {
      chatBubbleDiv.prepend(chatline);
      chatline.innerHTML = `
        <span id="${side}">(${timestamp}) <strong>${name}</strong></span>: ${textToPrepend}
      `;
    };
    let chatline = document.createElement("p");
    let smarterChild = "Not-So-SmarterChild";
    let screenName = "You";
    if (side === "right") {
      chatBuilder(smarterChild);
    } else if (side === "left") {
      chatBuilder(screenName);
    }
  };
}
dataWrapper();
