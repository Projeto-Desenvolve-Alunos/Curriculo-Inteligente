export const generateResume = async (prompt: string, apiKey: string) => {
  const iaList = {
    gemini: {
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      models: ["gemini-pro"],
      body: {
        contents: [
          {
            parts: [
              {
                text: "",
              },
            ],
          },
        ],
      },
    },
  };

  const ia = "gemini";
  const model = "gemini-pro";
  const iaURL = iaList[ia].url;
  const iaModel = iaList[ia].models.find((i) => i === model);

  if (!iaModel) {
    throw new Error(`Modelo "${model}" não existe para a IA "${ia}"`);
  }

  const iaBodyRequest = JSON.parse(JSON.stringify(iaList[ia].body));
  iaBodyRequest.contents[0].parts[0].text = prompt;

  const headers = {
    "Content-Type": "application/json",
    "X-goog-api-key":
      apiKey
  };

  const response = await fetch(iaURL, {
    method: "POST",
    headers,
    body: JSON.stringify(iaBodyRequest),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Erro na requisição à API do Gemini: ${
        response.status
      } - ${JSON.stringify(errorData)}`
    );
  }

  const data = await response.json();
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sem resposta da IA."
  );
};
