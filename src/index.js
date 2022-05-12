import "./css/styles.css";
import {postInputToOpenAI} from "./js/ApiData.js";
import ChatlogItem from "./js/ChatlogItem.js";
import { sidebarFill, showHistory, removePopup, addPopupDoneBtn } from "./js/SidebarComponent.js";

function scopingFunc() {

  //user input storage for POST requests.
  let userInput = {
    prompt: "",
    temperature: 0.5,
    max_tokens: 36,
    top_p: 0.3,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  let chatlogHistory = [];
  let timestamp = new Date().toLocaleTimeString();
  let promptID = 1;
  
  //Form submit on click event.
  const submitEvent = async (userInput) => {
    await postInputToOpenAI(userInput)
      .then(returnedData => {
        const returnedDataText = returnedData.choices[0].text;
        let chatlogObj = new ChatlogItem(promptID, userInput.prompt, returnedDataText);
        chatlogHistory.push(chatlogObj);
        document.getElementById("isTypingStatus").style.display = "none";
        prependToPage(returnedDataText, "blue");

        //Select node list of sidebar elements, for each item add modal functionality on click.
        let listItems = document.querySelectorAll('.chatlogItems');
        listItems.forEach((item) => {
          item.addEventListener('click', (event) => {
            let targetResponse = chatlogHistory[event.currentTarget.id].response;
            showHistory(event, targetResponse);
            const getModal = document.querySelectorAll(".popup");
            addPopupDoneBtn(getModal, chatlogHistory);
          });
        });
      });
    promptID++;
  };

  //Form submit event workflow
  const submitButton = document.getElementById("submitBtn");
  submitButton.addEventListener("click", (event) =>{
    event.preventDefault();
    removePopup();
    userInput.prompt = document.getElementById("formInput").value;
    prependToPage(userInput.prompt, "red");
    cpuIsTyping();
    submitEvent(userInput);
    sidebarFill(userInput.prompt, chatlogHistory, timestamp); 
    document.getElementById("formInput").value = ``;
  });

  const cpuIsTyping = () => {
    const isTypingStatusDiv = document.getElementById("isTypingStatus");
    isTypingStatusDiv.style.display = "flex";
    isTypingStatusDiv.textContent = "Open AI is typing...";
  };

  //Main chat display
  const prependToPage = (textToPrepend, side) => {
    const sideDisplay = document.querySelector(".onlineNum");
    let buddyCount = chatlogHistory.length;
    if (chatlogHistory.length > 0) {
      sideDisplay.innerHTML = `🞃 Buddies (${buddyCount}/${buddyCount})`;
    }
    //Create new div for each new post, attach ID.
    const output = document.querySelector(".output");
    const chatBubbleDiv = document.createElement("div");
    chatBubbleDiv.classList.add(`chatBubble`);
    chatBubbleDiv.setAttribute(`id`, `post${promptID}`);
    chatBubbleDiv.style.justifyContent = "left";
    output.appendChild(chatBubbleDiv);

    //Chat content.
    const chatBuilder = (name) => {
      chatBubbleDiv.prepend(chatline);
      chatline.innerHTML = `
        <span id="${side}"><strong>${name} (${timestamp})</strong>:</span> ${textToPrepend}
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
}
scopingFunc();
