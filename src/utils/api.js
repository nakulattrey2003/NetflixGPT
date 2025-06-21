import { useState } from "react";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const useGeminiAPI = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResponse = async (gptQuery, inputAPIValue) => {
    setLoading(true);
    setError(null);

    try {
      // const apiKey = inputAPIValue;
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(gptQuery);
      const response = await result.response;
      const text = await response.text();

      setResponse(text);
      return text;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, fetchResponse };
};

export default useGeminiAPI;
