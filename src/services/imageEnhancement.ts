import Replicate from 'replicate';

// Initialize Replicate client
// For development, we'll use a placeholder API key
// In production, this should be set via environment variables
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || 'r8_demo_key', // Will work in demo mode without real key
});

export interface EnhancementProgress {
  status: 'starting' | 'processing' | 'completed' | 'failed';
  progress?: number;
  message?: string;
}

export interface EnhancementResult {
  originalUrl: string;
  enhancedUrl: string;
  originalFile: File;
}

// Convert File to base64 data URL for Replicate API
const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Simulate API call for demo purposes (when no real API key)
const simulateEnhancement = async (
  file: File,
  onProgress: (progress: EnhancementProgress) => void
): Promise<string> => {
  // Simulate processing stages
  onProgress({ status: 'starting', progress: 0, message: 'Initializing AI model...' });
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  onProgress({ status: 'processing', progress: 25, message: 'Analyzing image structure...' });
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  onProgress({ status: 'processing', progress: 50, message: 'Enhancing details...' });
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  onProgress({ status: 'processing', progress: 75, message: 'Applying AI upscaling...' });
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  onProgress({ status: 'processing', progress: 90, message: 'Finalizing enhancement...' });
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return the original image for demo (in real implementation, this would be the enhanced image)
  const originalUrl = URL.createObjectURL(file);
  return originalUrl;
};

export const enhanceImage = async (
  file: File,
  onProgress: (progress: EnhancementProgress) => void
): Promise<EnhancementResult> => {
  try {
    onProgress({ status: 'starting', progress: 0, message: 'Starting enhancement...' });
    
    // Check if we have a real API key
    const hasRealKey = process.env.REPLICATE_API_TOKEN && 
                      process.env.REPLICATE_API_TOKEN !== 'r8_demo_key';
    
    let enhancedUrl: string;
    
    if (hasRealKey) {
      // Real Replicate API implementation
      const imageDataUrl = await fileToDataURL(file);
      
      onProgress({ status: 'processing', progress: 25, message: 'Uploading to AI model...' });
      
      // Use Real-ESRGAN model for upscaling
      const output = await replicate.run(
        "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc972b45e742b2e545d53c5e", 
        {
          input: {
            image: imageDataUrl,
            scale: 4, // 4x upscaling
          }
        }
      ) as string;
      
      enhancedUrl = output;
      onProgress({ status: 'processing', progress: 90, message: 'Finalizing...' });
      
    } else {
      // Demo mode - simulate the process
      console.log('Running in demo mode - no real API key provided');
      enhancedUrl = await simulateEnhancement(file, onProgress);
    }
    
    onProgress({ status: 'completed', progress: 100, message: 'Enhancement completed!' });
    
    return {
      originalUrl: URL.createObjectURL(file),
      enhancedUrl,
      originalFile: file,
    };
    
  } catch (error) {
    console.error('Enhancement failed:', error);
    onProgress({ 
      status: 'failed', 
      message: `Enhancement failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    });
    throw error;
  }
};

export const getEnhancementModels = () => {
  return [
    {
      id: 'real-esrgan',
      name: 'Real-ESRGAN',
      description: 'General purpose image upscaling with excellent quality',
      maxScale: 4,
    },
    {
      id: 'esrgan',
      name: 'ESRGAN',
      description: 'High-quality super-resolution for photorealistic images',
      maxScale: 4,
    },
  ];
};