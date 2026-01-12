
import { GoogleGenAI, Chat } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export class GeminiService {
  private chat: Chat;

  constructor() {
    this.chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are 'Sunny', a friendly and energetic English teacher for preschool children (3-6 years old). 
        Always use very simple words, emojis, and a warm tone. 
        Encourage the child to repeat simple words. 
        If they speak Chinese, gently translate it to English. 
        Keep responses under 3 sentences. 
        Example: "Hello! I am Sunny! ☀️ Can you say 'Apple'? 🍎 It is red and yummy!"`,
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const response = await this.chat.sendMessage({ message });
      return response.text || "Oh! I didn't catch that. Let's try again! 🌈";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Oops! My magic wand is resting. Can we talk later? 🪄";
    }
  }
}

export const geminiService = new GeminiService();
