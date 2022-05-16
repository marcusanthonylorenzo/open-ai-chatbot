export const postInputToOpenAI = async (userInput) => {
  const response = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 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`,
    },
    body: JSON.stringify(userInput),
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};