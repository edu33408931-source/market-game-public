
import { GoogleGenAI, Type } from "@google/genai";
import { GameType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateDescription = async (game: GameType, rank: string, level: number, skinsCount: number): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é um especialista em vendas de contas de jogos. Crie uma descrição atraente e profissional para uma conta de ${game}. 
      Detalhes:
      - Rank: ${rank}
      - Nível: ${level}
      - Quantidade de Skins: ${skinsCount}
      
      A descrição deve destacar o valor da conta, ser persuasiva e estar em Português do Brasil. Use bullet points para os destaques.`,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "Erro ao gerar descrição.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Não foi possível gerar a descrição automaticamente. Por favor, escreva manualmente.";
  }
};
