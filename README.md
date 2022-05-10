# Shopify Front End Developer Intern Challenge
#### By _**Marcus Lorenzo**_
---


| **_Overview_:** |
|---|

**Summary goes here**

#### Technologies Used:
![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![image](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white) ![image](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)  ![image](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![image](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
---


| **_Description_:** |
|---|

##### **My primary objectives** were:
- To practice the best coding conventions to my knowledge...having only learnt for the last 6 months.
- To keep variables tightly scoped, writing the cleanest code I can.
- To store JSON response objects into a variable, to save API call limits.
- To account for the possibility of this project scaling to a high-volume (many people start to code without considering the trail of data that get tangled up over time).

---

| **_Setup & Installation_:** |
|---|
#### :warning: **Please make sure** that in order to run the project correctly:

##### 	:exclamation: This project includes an API key :old_key: (required for this project to work). Alternatively, you can retrieve a personal one [HERE](https://beta.openai.com/signup).
- Typically, I would store this key in a .env file, accessed via `process.env.API_KEY`; however, this is not necessary for this project.

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
- To view tests via Jest, in your CLI type `npm run test`.

#### Known Bugs:
* None at present time.

---

| **_Design Plan_ (Specs):** |
|---|
#### Initial Ideas:
- UI: Card-catalogue displaying previous requests.
- Chatbox style UI.
- Use another API to generate a prompt, or translate (if time).

#### Objects, Properties:
- `const userInput = {}` used as a data storage, similar to a "Dictionary" but in Javascript.
- `Response from API call.

#### Collections/Groupings:
- `let responseObjects`, Array to save access to previous requests rather than make extra API calls.

#### Behaviours/Interactivity
- Submit/Click event to gather and POST user input text.
- `responseObjects.unshift(returnedDataText);` to index all activity from 0 onward, with the lowest index being the most recent activity.

---
| **_License_:** |
|---|

[MIT]()

Copyright (c) 2022 _Marcus Lorenzo_


#### Thanks for viewing!
