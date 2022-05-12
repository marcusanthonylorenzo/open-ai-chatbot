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
  let chatlogHistory = [];
  let timestamp = new Date().toLocaleTimeString();
  let postID = 0;
  let promptID = 1;

  //Form submit on click event.
  const submitEvent = async (userInput) => {
    await postInputToOpenAI(userInput)
      .then(returnedData => {
        const returnedDataText = returnedData.choices[0].text;
        let chatlogObj = createObj(promptID, returnedDataText);
        chatlogHistory.push(chatlogObj);
        prependToPage(returnedDataText, "blue");

        //Select node list of sidebar elements, for each item add modal functionality on click.
        let listItems = document.querySelectorAll('.chatlogItems');
        listItems.forEach((item) => {
          item.addEventListener('click', (event) => {
            //tie nodeListId to promptID/object key.
            let nodeID = event.currentTarget.id;
            nodeID++;
            let targetResponse = chatlogHistory[event.currentTarget.id][nodeID];
            showHistory(event, targetResponse);
            const getModal = document.querySelectorAll(".popup");
            addPopupDoneBtn(getModal);
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
    //Add "...AI is typing text?"
    userInput.prompt = document.getElementById("formInput").value;
    prependToPage(userInput.prompt, "red");
    submitEvent(userInput);
    sidebarFill(userInput.prompt);
    const clearTextboxForm = document.getElementById("formInput");
    clearTextboxForm.value = ``;
  });

  //Sidebar components
  const sidebarFill = (newPrompt) => {
    if (newPrompt.length <= 0) {
      newPrompt = "(Empty prompt)";
    }
    const sideOutput = document.querySelector(".side-output");
    const chatlogUl = document.createElement("li");
    chatlogUl.classList.add("chatlogItems");
    sideOutput.append(chatlogUl);
    chatlogUl.setAttribute(`id`, `${chatlogHistory.length}`);
    chatlogUl.textContent = newPrompt + ` ` + timestamp;
  };

  //Prompt History click handler
  const showHistory = (event, responses) => {
    const getView = document.querySelector(".container");
    let modal = document.createElement("div");
    modal.classList.add("popup");
    const listPrompt = document.createElement("li");
    const listReply = document.createElement("li");
    listPrompt.innerHTML = `<h4>Prompt: ${event.currentTarget.innerHTML}</h4>`;
    listReply.innerHTML = `<h4>Response: ${responses}</h4>`;
    getView.appendChild(modal);
    modal.appendChild(listPrompt);
    modal.appendChild(listReply);
  };

  //Remove popup
  const removePopup = () => {
    const getPopups = document.querySelectorAll('.popup');
    if (getPopups.length > 0){
      getPopups.forEach((popup) => {
        popup.remove();
      });
    }
  };

  //Exit popup
  const addPopupDoneBtn = (getModalList) => {
    getModalList.forEach((item) => {
      const doneBtn = document.createElement("button");
      doneBtn.setAttribute(`id`, `doneBtn`);
      item.append(doneBtn);
      doneBtn.innerText = `Close`;
      doneBtn.addEventListener(`click`, ()=> {
        console.log("clicky boi");
        removePopup();
      });
    });
  };

  //Main chat display
  const prependToPage = (textToPrepend, side) => {
    //General Selectors
    const sideDisplay = document.querySelector(".onlineNum");
    const output = document.querySelector(".output");
    //Individual counters/IDs
    let newPostID = postID ++;
    let buddyCount = chatlogHistory.length - 1;
    if (chatlogHistory.length > 0) {
      sideDisplay.innerHTML = `🞃 Buddies (${buddyCount}/${buddyCount})`;
    }

    //Create new div for each new post, attach ID.
    const chatBubbleDiv = document.createElement("div");
    chatBubbleDiv.classList.add(`chatBubble`);
    chatBubbleDiv.setAttribute(`id`, `post${newPostID}`);
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

  //non UI logic
  const createObj = (keyProp, val) => {
    let newObj = Object.create({});
    newObj[keyProp] = val;
    return newObj;
  };
}
scopingFunc();
