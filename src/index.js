import "./css/styles.css";
import {postInputToOpenAI} from "./../src/js/apiData.js";

function scopingFunc() {
  //user input storage for POST requests.
  let userInput = {
    prompt: "",
    temperature: 0.5,
    max_tokens: 20,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
  //length -1 is the most recent prompt/response
  let chatlogHistory = [];

  //Form submit on click event.
  const submitEvent = async (userInput) => {
    await postInputToOpenAI(userInput)
      .then(returnedData => {
        const returnedDataText = returnedData.choices[0].text;
        let chatlogObj = createObj(userInput.prompt, returnedDataText);
        chatlogHistory.push(chatlogObj);
        console.log(chatlogHistory);
        prependToPage(returnedDataText, "blue");
      });
  };

  const submitButton = document.getElementById("submitBtn");
  submitButton.addEventListener("click", (event) =>{
    event.preventDefault();
    //Add "...AI is typing text?"
    userInput.prompt = document.getElementById("formInput").value;
    prependToPage(userInput.prompt, "red");
    submitEvent(userInput);
    if (chatlogHistory.length > 0){
      sidebarFill(userInput.prompt);
    }
  });

  /* MAIN UI */
  let timestamp = new Date().toLocaleTimeString();
  let postID = 1;

  const prependToPage = (textToPrepend, side) => {
    //General
    const sideDisplay = document.querySelector(".onlineNum");
    const output = document.querySelector(".output");
    let newPostID = postID ++;
    let buddyCount = chatlogHistory.length - 1;
    if (chatlogHistory.length > 0) {
      sideDisplay.innerHTML = `🞃 Buddies (${buddyCount}/${buddyCount})`;
    }
    // let timestamp = new Date().toLocaleTimeString();

    //Create new div for each new post, attach ID.
    const chatBubbleDiv = document.createElement("div");
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
      chatlogHistory.splice(buddyCount, 1);
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
    let screenName = "Xx You xX 1992";
    if (side === "blue") {
      chatBuilder(smarterChild);
    } else if (side === "red") {
      chatBuilder(screenName);
    }
  };


  //Sidebar components
  const sidebarFill = (newPrompt) => {
    if (newPrompt.length <= 0) {
      newPrompt = "(Empty prompt provided.)";
    }
    const sideOutput = document.querySelector(".side-output");
    const chatlogUl = document.createElement("li");
    chatlogUl.classList.add("chatlogItems");
    sideOutput.append(chatlogUl);
    chatlogUl.setAttribute(`id`, `${chatlogHistory.length}`);

    // const li = document.createElement("li");
    chatlogUl.textContent = newPrompt + ` ` + timestamp;
  };


  //non UI logic
  const createObj = (keyProp, val) => {
    let newObj = Object.create({});
    newObj[keyProp] = val;
    return newObj;
  };
}
scopingFunc();
