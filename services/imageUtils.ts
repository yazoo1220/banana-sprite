/**
 * Processes an uploaded file:
 * 1. Reads it as base64.
 * 2. Draws it onto a white square canvas (padding if necessary) to ensure 1:1 ratio.
 */
export const processInputImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Determine square size (use the larger dimension)
        const size = Math.max(img.width, img.height);
        
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Fill with white background (Absolute Requirement)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, size, size);

        // Calculate position to center the image
        const x = (size - img.width) / 2;
        const y = (size - img.height) / 2;

        ctx.drawImage(img, x, y);

        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = event.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Slices a 4x4 sprite sheet into 16 individual base64 images.
 */
export const sliceSpriteSheet = (spriteSheetBase64: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const frameWidth = img.width / 4;
      const frameHeight = img.height / 4;
      const frames: string[] = [];

      // Order: Left to Right, Top to Bottom
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          const canvas = document.createElement('canvas');
          canvas.width = frameWidth;
          canvas.height = frameHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) continue;

          // Draw specific frame
          ctx.drawImage(
            img,
            col * frameWidth, row * frameHeight, frameWidth, frameHeight, // Source
            0, 0, frameWidth, frameHeight // Destination
          );

          frames.push(canvas.toDataURL('image/png'));
        }
      }
      resolve(frames);
    };
    img.onerror = reject;
    img.src = spriteSheetBase64;
  });
};

/**
 * Generates a GIF blob URL from an array of base64 images using gifshot.
 */
export const generateGifBlob = (frames: string[], width: number, height: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!window.gifshot) {
      reject(new Error('Gifshot library not loaded'));
      return;
    }

    window.gifshot.createGIF({
      images: frames,
      gifWidth: width,
      gifHeight: height,
      interval: 0.1, // 100ms per frame = 10fps
      numFrames: 16
    }, (obj) => {
      if (!obj.error) {
        resolve(obj.image);
      } else {
        reject(new Error(obj.errorMsg));
      }
    });
  });
};