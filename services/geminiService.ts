import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";
import { Paper, Source } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const getChatResponseStream = async (
  history: { role: string, parts: { text: string }[] }[],
  message: string,
  file?: File
) => {
  const model = 'gemini-2.5-flash';

  const userMessageParts: Part[] = [{ text: message }];

  if (file) {
    const filePart = await fileToGenerativePart(file);
    // Add the file part to the beginning of the current message's parts
    userMessageParts.unshift(filePart);
  }

  // The history from the client only has text parts.
  // The role needs to be 'user' or 'model'. The history from ChatInterface already provides this.
  const contents = [...history, { role: 'user', parts: userMessageParts }];

  return ai.models.generateContentStream({
    model: model,
    contents: contents,
  });
};


export const findRelatedPapers = async (topic: string): Promise<{ papers: Paper[], sources: Source[] }> => {
  const model = 'gemini-2.5-flash';
  const prompt = `Find 5 recent and highly-cited academic papers related to "${topic}". For each paper, provide the title, all authors, publication year, a one-sentence summary, and a valid public URL. Format the response as a numbered list. Example: 1. Title: ...\nAuthors: ...\nYear: ...\nSummary: ...\nURL: ...`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    const papers = parsePapersFromText(text);
    
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: Source[] = groundingChunks
      .map((chunk: any) => ({
        uri: chunk.web?.uri,
        title: chunk.web?.title,
      }))
      .filter((source: Source) => source.uri && source.title);

    return { papers, sources };
  } catch (error) {
    console.error("Error finding related papers:", error);
    return { papers: [], sources: [] };
  }
};

const parsePapersFromText = (text: string): Paper[] => {
  const papers: Paper[] = [];
  const paperBlocks = text.split(/\n\s*\d+\.\s*Title:/).slice(1);

  paperBlocks.forEach(block => {
    const titleMatch = block.match(/(.*?)\n/);
    const authorsMatch = block.match(/Authors:\s*(.*?)\n/);
    const yearMatch = block.match(/Year:\s*(.*?)\n/);
    const summaryMatch = block.match(/Summary:\s*(.*?)\n/);
    const urlMatch = block.match(/URL:\s*(.*?)(?:\n|$)/);

    if (titleMatch && authorsMatch && yearMatch && summaryMatch && urlMatch) {
      papers.push({
        title: titleMatch[1].trim(),
        authors: authorsMatch[1].trim(),
        year: yearMatch[1].trim(),
        summary: summaryMatch[1].trim(),
        url: urlMatch[1].trim(),
      });
    }
  });

  return papers;
};