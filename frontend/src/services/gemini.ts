import { GoogleGenAI } from "@google/genai";
// Access the environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI({ apiKey: API_KEY});

export const getGeminiResponse = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("VITE_GEMINI_API_KEY is not defined in your .env file");
  }
    try {
    const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });
    if (!result.text) throw new Error('ai response undefined');
    // console.log(result);
    // console.log(result.text);
    return result.text;
    // const response = await result.response;
    // return response.text();
  } catch (error) {
    console.error('Gemini Service Error:', error);
    throw error;
  }
};
