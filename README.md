# Shopify Front End Developer Intern Challenge
#### By _**Marcus Lorenzo**_
---

![image](https://cdn.shopify.com/s/files/1/0611/1605/5788/t/2/assets/shopify-internships-logo.svg?v=54099945611246839601638917488)


| **_Overview_:** |
|---|

**The theme has shifted from a "text conversation" to AOL Instant Messenger's "Smarter Child"...but my version. This brings back the nostalgia of talking to an AI chat bot in 1999/2001. (Even though the background is Windows XP :rofl: :rofl: )**

**Notes:**
- Done in Vanilla JS, no frameworks.
- I tried my best to use Async/Await for the request. It is my current focus of improvement.
- I also believe had I known React, my code would be 30% of the size and much more "portable". It is actually my primary topic of focus right now, along with Ajax.


#### Technologies Used:
![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![image](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white) ![image](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)  ![image](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![image](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
---


| **_Description_:** |
|---|

##### **My primary objectives** were:
- To practice the best coding conventions **to my knowledge**...having only learnt for the last 6 months.
- Practice TDD on business logic.
- ~To store JSON response objects into a variable, to save API call limits.~ Calls must be made each time for a more dynamic user experience.
- To account for the possibility of this project scaling to a high-volume (many people start to code without considering the trail of data that gets tangled up over time).
- To keep variables tightly scoped, writing the cleanest code I can.

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
 Next, clone `https://github.com/marcusanthonylorenzo/shopify-intern-challenge` | Go to specified extraction folder, and follow the following steps to the left column.
 Once completed, open this new directory in your text editor | 
 In the CLI, install node_modules directory via `npm install` or `yarn install`, then bundle and start dev server via `npm run start` or `yarn run start` to run project. |


#### Running Tests:
- ~To view tests via Jest, in your CLI type `npm run test`.~ (I do use Jest every so often. However, in this project I will exclude tests.)

#### Known Bugs:
* new line errors with API response.text (Proposed solution: pending)
* resizing scaling can be unresponsive to window size. (Proposed solution: set media queries)
* scroll delay not matching output if click event in rapid succession (Proposed solution: disable button until response has been parsed)

---

| **_Design Plan_ (Specs):** |
|---|
#### Initial Ideas:
- UI: Card-catalogue displaying previous requests.
- Chatbox style UI.
- Use another API to generate a prompt, or translate (if time).
- AIM! + Windows 95?

#### Objects, Properties:
- `const userInput = {}` used as a data storage, similar to a "Dictionary" but in Javascript.
- Response from API call.
- Prompt/Response assigned to Key/Value in `let chatlogHistory[index]`;

#### Collections/Groupings:
- `let chatlogHistory`, Array accessed by the "Sidebar" component.

#### Behaviours/Interactivity
- Submit/Click event to gather and POST user input text.
- `responseObjects.unshift(returnedDataText);` to index all activity from 0 onward, with the lowest index being the most recent activity.

---
| **_License_:** |
|---|

[MIT]()

Copyright (c) 2022 _Marcus Lorenzo_


#### Thanks for viewing!
