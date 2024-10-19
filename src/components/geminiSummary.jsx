import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const geminiSummary = async (text1) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  var prompt = `
        "${text1}" 을 한 문단으로 요약해줘
    `;
  console.log(prompt);
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
  return text;
};

export default geminiSummary;
