export interface ProcessedImage {
  base64: string; // Data URL
  width: number;
  height: number;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  PROCESSING_IMAGE = 'PROCESSING_IMAGE',
  GENERATING_SPRITE = 'GENERATING_SPRITE',
  GENERATING_GIF = 'GENERATING_GIF',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

export type Language = 'ja' | 'en';

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    gifshot: {
      createGIF: (
        options: {
          images: string[];
          gifWidth?: number;
          gifHeight?: number;
          interval?: number; // seconds
          numFrames?: number;
        },
        callback: (obj: { error: boolean; errorCode: string; errorMsg: string; image: string }) => void
      ) => void;
    };
  }
}