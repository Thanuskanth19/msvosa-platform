import { GoogleGenAI } from "@google/genai";
import { GenerationRequest } from "../types";

// Initialize Gemini API client
// Ideally, in a production app, these calls might go through a backend to protect the key, 
// but for this frontend-only demo, we use the env var directly as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMarketingContent = async (request: GenerationRequest): Promise<string> => {
  const modelId = "gemini-2.5-flash"; // Efficient for text generation
  
  const prompt = `
    You are the Communications Director for MSVOSA (The Old Students Association).
    Task: Write a ${request.type}.
    Topic: ${request.topic}.
    Tone: ${request.tone}.
    
    Requirements:
    - Keep it engaging and relevant to former students.
    - Highlight the values of unity, pride, and contribution.
    - Use the association name 'MSVOSA' where appropriate.
    - If it's an event, mention networking opportunities.
    - If it's fundraising, mention the scholarship fund.
    - Format with clear paragraphs. Do not use Markdown headings like ##.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        temperature: 0.7, // Creativity balance
      }
    });
    
    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please check your API key or try again later.";
  }
};