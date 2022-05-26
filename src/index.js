import "./css/styles.css";
import { postInputToOpenAI } from "./js/ApiData.js";
import ChatlogItem from "./js/ChatlogItem.js";
import { sidebarFill, showHistory, buddyCountUpdater, removePopup, addPopupDoneBtn } from "./js/SidebarComponent.js";

function scopingFunc() {
  //user input storage for POST requests.
  let userInput = {
    prompt: "",
    temperature: 0.5,
    max_tokens: 32,
    top_p: 0.3,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
  let chatlogHistory = [];
  let promptID = 0;

  //get screenname values
  function getScreenName() {
    let sn = document.getElementById("screenName").value;
    let year = document.getElementById("year").value;
    let screenNameCombo = sn + year;
    return screenNameCombo;
  }

  //Form submit on click, POST and response.
  const submitEvent = async (userInput) => {
    await postInputToOpenAI(userInput)
      .then(returnedData => {
        sessionStorage.setItem("officialResponse", returnedData.choices[0].text);
        return returnedData;
      })
      .catch((error) => {
        const getView = document.querySelector(".container");
        let modal = document.createElement("div");
        modal.classList.add("popup");
        const listError = document.createElement("li");
        listError.innerHTML = `
          <h4>Sorry, you've encountered an error!</h4>
          <h4>${error.message}</h4>
          <h4>Please check that your internet connection is strong, or that your key is correct.</h4>
        `;
        getView.appendChild(modal);
        modal.appendChild(listError);
      })
      .finally(() =>  openAiResponseWorkflow());
  };

  const openAiResponseWorkflow = () => {
    const getResponseFromSessionStorage = sessionStorage.getItem("officialResponse");
    const coolStuffNewTextConversion = coolStuffCheckboxHandler(getResponseFromSessionStorage);

    //instaniate form in new object, update display
    let chatlogObj = new ChatlogItem(promptID, userInput.prompt, coolStuffNewTextConversion);
    chatlogHistory.push(chatlogObj);
    buddyCountUpdater(chatlogHistory);
    chatlogObj.user = getScreenName();

    document.getElementById("isTypingStatus").style.display = "none";
    prependToPage(chatlogObj.response, "blue");
    sendDisable(false);

    // Select node list of sidebar elements, for each item add modal functionality on click. 
    let listItems = document.querySelectorAll('.chatlogItems');
    listItems.forEach((item) => {
      item.addEventListener('click', (event) => {
        let targetResponse = chatlogHistory[event.currentTarget.id].response;
        let targetUsername = chatlogHistory[event.currentTarget.id].user;
        showHistory(event, targetResponse, targetUsername);
        const getModal = document.querySelectorAll(".popup");
        addPopupDoneBtn(getModal, chatlogHistory);
      });
    });
  };

  //Form submit event workflow.
  const submitButton = document.getElementById("submitBtn");
  submitButton.addEventListener("click", (event) =>{
    let timestamp = new Date().toLocaleTimeString();
    event.preventDefault();
    sendDisable(true);
    removePopup();
    userInput.prompt = document.getElementById("formInput").value;
    prependToPage(userInput.prompt, "red");
    buddyCountUpdater(chatlogHistory);
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

  const sendDisable = (toggle) => {
    const getSendBtn = document.getElementById("submitBtn");
    if (toggle === true){
      getSendBtn.setAttribute("disabled", "");
    } else {
      getSendBtn.removeAttribute("disabled");
    }
  };

  //Main chat display
  const prependToPage = (textToPrepend, side) => {
    //Create new div for each new post, attach ID.
    const output = document.querySelector(".output");
    const chatBubbleDiv = document.createElement("div");
    chatBubbleDiv.setAttribute(`id`, `post${promptID}`);
    chatBubbleDiv.classList.add(`chatBubble`);
    chatBubbleDiv.style.justifyContent = "left";
    output.appendChild(chatBubbleDiv);
    //chat content
    let chatline = document.createElement("p");  
    const chatBuilder = (name) => {
      if (name.length <= 0) {
        name = "Xx_YourPrompt_xX";
      } 
      chatBubbleDiv.prepend(chatline);
      chatline.innerHTML = `
        <span id="${side}"><strong>${name}</strong>:</span> ${textToPrepend}
      `;
    };
    let smarterChild = "Not-So-SmarterChild";
    let targetResponse = getScreenName();
    let screenNameCombo;
    const coolStuff = document.getElementById("checkyboi");
    if (coolStuff.checked === true){
      screenNameCombo = sillySpelling(targetResponse);
    } else {
      screenNameCombo = targetResponse;
    } 
    if (side === "blue") {
      chatBuilder(smarterChild);
    } else if (side === "red") {
      chatBuilder(screenNameCombo);
    }
  };

  const sillySpelling = (string) => {
    return string.split('').map((a,i) => i % 2 ? a.toLowerCase(): a.toUpperCase()).join('');
  };

  //Clear Display
  const clearDisplayBtn = document.getElementById("clearDisplay");
  const displaySelect = document.querySelector(".output");
  clearDisplayBtn.addEventListener("click", () =>{
    clearArea(displaySelect);
  });

  //Clear All
  const clearAllBtn = document.getElementById("clearAll");
  const sideoutputSelect = document.querySelector(".side-output");
  clearAllBtn.addEventListener("click", () =>{
    clearArea(displaySelect);
    clearArea(sideoutputSelect);
    chatlogHistory.splice(0);
    buddyCountUpdater(chatlogHistory);
  });

  const clearArea = (element) => {
    removePopup();
    while (element.hasChildNodes()){
      element.removeChild(element.firstChild);
    }
  };

  const coolStuffCheckboxHandler = (textToMakeCool) => {
    const coolBoi = document.getElementById("checkyboi");
    let textToMakeCoolConversion;
    if (coolBoi.checked === true){
      textToMakeCoolConversion = sillySpelling(textToMakeCool);
    } else {
      textToMakeCoolConversion = textToMakeCool;
    }
    return textToMakeCoolConversion;
  };
}
scopingFunc();