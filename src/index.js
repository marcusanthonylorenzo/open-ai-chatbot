import "./css/styles.css";
import {postInputToOpenAI} from "./../src/js/apiData.js";

function dataWrapper() {
  
  //user input storage for POST requests.
  // let userName = document.getElementById("userName").value;
  let userInput = {
    prompt: "Write a poem about a dog wearing skis", //document.getElementById("textInput").value;
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
    prependToPage(userInput.prompt, "left");
    //Add "...AI is typing text?"
    setTimeout(submitEvent(userInput), 900);
  });


  /* MAIN UI */
  let postID = 0;
  const prependToPage = (textToPrepend, side) => {
    //General selectors
    const output = document.querySelector(".output");
    const chatBubbleDiv = document.createElement("div");
    let newPostID = postID ++;
    let postIndex = responseArray.length - 1;
    
    //Time
    const timestamp = new Date().toLocaleTimeString();

    //create new div for each new post, attach ID to length.
    chatBubbleDiv.classList.add(`chatBubble-${side}`);
    chatBubbleDiv.setAttribute(`id`, `post${newPostID}`);
    chatBubbleDiv.style.justifyContent = side;
    output.appendChild(chatBubbleDiv);

    // for each new post, add a delete button
    const deleteButton = document.createElement("button");
    const thisDiv = document.getElementById(`post${newPostID}`);
    thisDiv.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
      thisDiv.remove();
      responseArray.splice(postIndex, 1);
      console.log(responseArray, postIndex);
    });

    //DOM selectors for User

    //DOM selectors for Reponse
    const p = document.createElement("p");
    const length = document.createElement("p");
    p.textContent = textToPrepend;
    length.textContent =  `Message ID: ${newPostID}    Sent at ${timestamp}`;
    chatBubbleDiv.prepend(p);
    p.appendChild(length);

  };

  // const clearAll = () =>{
  //   //write (Message Unsent) like IG.
  //   while (responseArray.hasChildNodes()){
  //     responseArray.removeChild(responseArray.firstChild);
  //   }
  // };

}
dataWrapper();
