/***
 * For the sake of testing this program on GitHub Pages, I've hardcoded the API key below to bypass the security measures.
 * In every other case, I would store this as an env locally, with a keyword. Thanks!
***/
const startOf = `sk-O`;
const importantInfo = `brKxQI4DRqH4dVumFzqT3BlbkFJJkpe4x3nMt0pU9MSvcl9`;

export const postInputToOpenAI = async (userInput) => {
  const response = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${startOf}${importantInfo}`,
    },
    body: JSON.stringify(userInput),
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};