const sidebarFill = (newPrompt, chatlogHistory, timestamp) => {
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

const buddyCountUpdater = (chatlogHistory) => {
  const sideDisplay = document.querySelector(".onlineNum");
  let buddyCount = chatlogHistory.length;
  sideDisplay.innerHTML = `🞃 Buddies (${buddyCount}/${buddyCount})`;
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
const addPopupDoneBtn = (getModalList, chatlogHistory) => {
  getModalList.forEach((item) => {
    const doneBtn = document.createElement("button");
    doneBtn.setAttribute(`id`, `doneBtn`);
    item.append(doneBtn);
    doneBtn.innerText = `Close`;
    doneBtn.addEventListener(`click`, ()=> {
      console.log("clicky boi", chatlogHistory);
      removePopup();
    });
  });
};

export { sidebarFill, showHistory, buddyCountUpdater, removePopup, addPopupDoneBtn };