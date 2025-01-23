// Function to remove background using canvas
export const removeBackground = (file) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the image on canvas
      ctx.drawImage(img, 0, 0);
      
      // Get image data from canvas
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;

      // Threshold values for background removal (tune as needed)
      const threshold = 200; // Choose a threshold to filter background color
      for (let i = 0; i < data.length; i += 4) {
        // Simple background removal by thresholding the color
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If pixel color is close to white, make it transparent
        if (r > threshold && g > threshold && b > threshold) {
          data[i + 3] = 0; // Set alpha to 0 (transparent)
        }
      }

      // Put the modified image data back into the canvas
      ctx.putImageData(imageData, 0, 0);
      
      // Create a new image URL with background removed
      const newImage = canvas.toDataURL();
      return newImage
    };
  };