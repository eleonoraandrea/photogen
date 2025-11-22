export interface Template {
  id: string;
  name: string;
  category: 'Photorealistic' | 'Fashion' | 'Food' | 'Art' | 'Architecture' | 'Editing' | 'Character' | 'Remix' | 'Logo';
  description: string;
  promptModifier: string; // The style prompt to append
  thumbnail: string;
  mode: 'CREATE' | 'EDIT'; // Determines if this is for generation or editing
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
  aspectRatio: string;
}

export interface ReferenceImage {
  id: string;
  data: string; // Base64 string
  mimeType: string;
}

export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';

export interface GenerationConfig {
  prompt: string;
  aspectRatio: AspectRatio;
  referenceImages: ReferenceImage[];
}

export enum AppMode {
  TEMPLATES = 'TEMPLATES',
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  HISTORY = 'HISTORY'
}