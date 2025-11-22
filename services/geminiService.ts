import { GoogleGenAI } from "@google/genai";
import { AspectRatio, ReferenceImage } from "../types";

// Using the mapped model name for "Nano banana" / Gemini 2.5 Flash Image
const MODEL_NAME = 'gemini-2.5-flash-image';

export const generateImage = async (
  prompt: string,
  aspectRatio: AspectRatio,
  referenceImages: ReferenceImage[] = []
): Promise<string> => {
  // Always create a new instance to capture the latest process.env.API_KEY
  // which might have been set by the user via window.aistudio.openSelectKey()
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please login/select a key first.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Prepare contents
  const parts: any[] = [];

  // Add reference images first
  for (const img of referenceImages) {
     // Strip the data URL prefix if present (e.g., "data:image/png;base64,")
    const base64Data = img.data.split(',')[1] || img.data;
    
    parts.push({
      inlineData: {
        data: base64Data,
        mimeType: img.mimeType
      }
    });
  }

  // Add the text prompt
  parts.push({
    text: prompt
  });

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: parts
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          // Gemini 2.5 Flash Image usually doesn't support 'imageSize' param
        },
        // Add permissive safety settings to reduce chance of 'IMAGE_OTHER' or block errors
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        ]
      }
    });

    // Parse the response to find the image
    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No candidates returned from Gemini.");
    }

    const candidate = candidates[0];
    const content = candidate.content;
    
    // Check if we have valid parts
    const hasContent = content && content.parts && content.parts.length > 0;

    // Check if generation was stopped due to safety or other reasons
    // We only throw if there is NO content. If the model returned content despite a non-STOP reason, we try to use it.
    if (!hasContent && candidate.finishReason && candidate.finishReason !== 'STOP') {
      let errorMsg = `Generation stopped. Reason: ${candidate.finishReason}`;
      
      // Special handling for IMAGE_OTHER which is generic
      if (candidate.finishReason === 'IMAGE_OTHER') {
        errorMsg += ". The model refused to generate the image. This can happen if the prompt violates safety policies or the input image is difficult to process.";
      }

      // Check safety ratings if available
      if (candidate.safetyRatings) {
        const blocked = candidate.safetyRatings.filter(r => r.probability !== 'NEGLIGIBLE');
        if (blocked.length > 0) {
          errorMsg += `. Safety flags: ${blocked.map(r => r.category).join(', ')}`;
        }
      }
      throw new Error(errorMsg);
    }

    if (!hasContent) {
      throw new Error("Gemini returned success status but no content parts were found.");
    }

    // Iterate to find the image part
    for (const part of content!.parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }

    // If we have parts but no image, it might be a text refusal
    const textPart = content!.parts.find(p => p.text);
    if (textPart) {
      throw new Error(`Model returned text instead of an image: "${textPart.text}"`);
    }

    throw new Error("No image data found in response.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};