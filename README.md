# OpenAI Windows Themed Chatbot
#### By _**Marcus Lorenzo**_
---


| **_Overview_:** |
|---|

### The theme has shifted from what was originally a "text msg conversation" to a "conversation with AOL Instant Messenger's 'Smarter Child'", but my low-budget version.
### This brings back the nostalgia of talking to an AI chat bot in 1999/2001. (Even though the background is Windows XP :rofl:)


.
### [Live link via GitHub Pages]()




| **_Description_:** |
|---|

#### Features:
- A user **text input prompt** and subsequent **response with Open AI's `“text-curie-001”` engine**. (Blank entries are allowed, as they were with AOL's Smarter Child. A simple `required` attribute can be added if needed. )
- Max-tokens are set at 32, to offset exceeding limits. **Response wording will be cut off depending on the limit**
- A list of your prompt history, with a timestamp. Modeled after AIM's "Buddy List". **It goes top-to-bottom, newest-to-oldest.**
- The Buddies counter represents the total of prompts you've sent, modeled after AIM's "who's online" friends list. 
- A button to clear the main chat box, and another to reset both the list and your previous prompts entirely.
- A status update which waits for the AI data to fetch. ("Open AI is typing...").

**Notes:**
- Done in Vanilla JS and custom CSS, no frameworks or editors. Responsiveness could be improved - a current topic of my learning journey.
- In time, I would use local or web storage to maintain prompt history.
- I also believe upon improving my React skills, the code would be 30% of the size and much more "portable". It is actually my primary topic of focus right now, along with Ajax.
- My code for handling the API response in `index.js` needs to DRY up more, but it works for the MVP!
- I've left some items in the README crossed out; I want to show my thought processes/changes/ideas so that Shopify can get to know me as a programmer. In a professional setting, I would endeavor to work in a cleaner, more succinct manner.


#### Technologies Used:
![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![image](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white) ![image](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)  ![image](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![image](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)

---

| **_Setup & Installation_:** |
|---|
#### :warning: **Please make sure** that in order to run the project correctly:

##### 	:exclamation: This project includes an API key :old_key: (required for this project to work). Alternatively, you can retrieve a personal one [HERE](https://beta.openai.com/signup).
- Typically, I would store this key in a .env file, accessed via `process.env.API_KEY`; however, this is not necessary for this project.
- If you do use a personal key, please be sure to follow the directions in [Open AI's documentation](https://beta.openai.com/docs/api-reference/authentication).

##### 	:exclamation: Once you've received this repo on your computer:
- Install the node_modules directory (node: `npm install` or yarn: `yarn install`).
- ~Install package to load environment variables from .env with `npm install dotenv-webpack@2.0.0 --save-dev`.~
- Bundle the code, and run. (node: `npm run start` or yarn: `yarn run start`).

####   More detailed instructions provided below.

|   via CLI   |  via Download  |
|---|---|
| Download install Git Bash (Windows), use the terminal in your text editor, or open Terminal(Mac) | Simply download the ZIP via the green "Code" button to right of the "Add file" button at the main repo page. 
 Open Git Bash or Terminal and type: `cd desktop` | Go to your zip file and extract to desired location on computer. 
 Next, clone `https://github.com/marcusanthonylorenzo/open-ai-chatbot` | Go to specified extraction folder, and follow the following steps to the left column.
 Once completed, open this new directory in your text editor | 
 In the CLI, install node_modules directory via `npm install` or `yarn install`, then bundle and start dev server via `npm run start` or `yarn run start` to run project. |


#### Running Tests:
- ~To view tests via Jest, in your CLI type `npm run test`.~ (I do use Jest every so often. However, in this project I will exclude tests.)

#### Known Bugs:
* Landscape resizing on mobile phones do not allow for functionality. (Was not a priority for the MVP of this project.)
* buttons work but UI does not animate to signify button click.

---

| **_Design Plan_ (Specs):** |
|---|
#### Initial Ideas:
[x] UI: Card-catalogue displaying previous requests.
[x] Chatbox style UI.
- Use another API to generate a prompt, or translate (if time).
[x] AIM! + Windows 95?

#### Objects, Properties:
- `const userInput = {}` used as a data storage, similar to a "Dictionary" but in Javascript. Can change keys to reflect changes in parameters in http request.
- Response from API call.
- Instantiate from `class ChatlogItem` with Prompt/Response stored as keys.
- Each `new ChatlogItem` has a unique id despite `clearAll()`.

#### Collections/Groupings:
- `let chatlogHistory`, Array accessed by the "Sidebar" component.

#### Behaviours/Interactivity
- I purposefully did not add a scroll bar as I wanted the display to be dominated by the current prompt/response.

- `index.js`
  - Submit/Click event to gather and POST user input text.
  - `submitEvent()` waits for OpenAI to fetch, before updating the UI
  - `submitButton` click handler synchronises general UI workflow
  - `prependToPage()` with `chatBuilder()` updates UI as a throwback to AIM (AOL Instant Messenger)

- `ApiData.js`
  - `postInputToOpenAI` deals with requests

- `ChatlogItem.js`
  - `class ChatlogItem` allows objects to be instantiated and subsequently pushed into `let chatlogHistory`(`index.js, line 18`)

- `SidebarComponent.js`
  - `sidebarFill()` handles the creation and updates for the "Prompt History > Buddies" list
  - `showHistory()` creates a modal with prompt/response history including time of API request
  - `removePopup()` clears the UI of all potential modals "popups" populating the viewport
  - `addPopupDoneBtn()` adds a "done" button for each element in the sidebar list, using `removePopup*()`

---
| **_License_:** |
|---|

[MIT]()

Copyright (c) 2022 _Marcus Lorenzo_


#### Thanks for viewing!
