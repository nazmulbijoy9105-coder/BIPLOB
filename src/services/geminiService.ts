import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function chatWithWorkerAssistant(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `You are Biplob, an empathetic AI assistant for Bangladeshi migrant and local workers. 
        Your goal is to provide accurate information about jobs, salaries, country guides, legal rights, and worker safety.
        Use simple, clear language. Use both English and Bangla characters when appropriate (especially for translations or key terms).
        If the user is asking about migration, emphasize following legal channels.
        If they report fraud, guide them to the safety list and suggest reporting to authorities.
        You are supportive, protective, and empowering.`,
      },
    });

    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না। অনুগ্রহ করে আবার চেষ্টা করুন। (Sorry, I cannot answer right now. Please try again.)";
  }
}
