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
