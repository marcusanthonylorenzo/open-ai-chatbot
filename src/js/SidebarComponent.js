const sidebarFill = (newPrompt, chatlogHistory, timestamp) => {
  if (newPrompt.length <= 0) {
    newPrompt = "(Empty prompt)";
  }
  const sideOutput = document.querySelector(".side-output");
  const chatlogUl = document.createElement("li");
  chatlogUl.classList.add("chatlogItems");
  sideOutput.prepend(chatlogUl);
  chatlogUl.setAttribute(`id`, `${chatlogHistory.length}`);
  chatlogUl.textContent = newPrompt + ` ` + timestamp;
};

//Prompt History click handler
const showHistory = (event, responses, username) => {
  removePopup();
  const getView = document.querySelector(".container");
  let modal = document.createElement("div");
  modal.classList.add("popup");
  const listUser = document.createElement("li");
  const listPrompt = document.createElement("li");
  const listReply = document.createElement("li");
  if (username.length < 1) {
    username = "(No username provided.)";
  }
  listUser.innerHTML = `<h4>User: ${username}</h4>`;
  listPrompt.innerHTML = `<h4>Prompt: ${event.currentTarget.innerHTML}</h4>`;
  listReply.innerHTML = `<h4>Response: ${responses}</h4>`;
  getView.appendChild(modal);
  modal.appendChild(listUser);
  modal.appendChild(listPrompt);
  modal.appendChild(listReply);
};

const buddyCountUpdater = (chatlogHistory) => {
  const sideDisplay = document.getElementById('buddies');
  let buddyCount = chatlogHistory.length;
  if (buddyCount === 0) {
    sideDisplay.setAttribute(`class`, `offline`);
    sideDisplay.innerHTML = `🞃 Buddies (${buddyCount}/${buddyCount})`;
  } else {
    sideDisplay.setAttribute(`class`, `onlineNum`);
    sideDisplay.innerHTML = ` ▸ Buddies (${buddyCount}/${buddyCount})`;
  }
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

export { sidebarFill, showHistory, buddyCountUpdater, removePopup, addPopupDoneBtn };