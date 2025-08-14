import Replicate from 'replicate';
import { getCurrentPlanLimits } from './subscriptionManager';

// Initialize Replicate client
// Use environment variable with Vite prefix for frontend
const replicate = new Replicate({
  auth: import.meta.env.VITE_REPLICATE_API_TOKEN || 'r8_demo_key',
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

// Get appropriate model based on quality level
const getModelForQuality = (quality: 'basic' | 'premium' | 'ultra'): string => {
  switch (quality) {
    case 'ultra':
      return 'tencentarc/gfpgan:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3';
    case 'premium':
      return 'cjwbw/waifu2x:25c54b7f1eed87a1e5e8ae7d4eaae73a49ec0fafebdab0a8a3ecb4f0b97bd78a';
    case 'basic':
    default:
      return 'nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc972f1a6c68ad1d9f7a55dc2';
  }
};

// Simulate API call for demo purposes (when no real API key)
const simulateEnhancement = async (
  file: File,
  onProgress: (progress: EnhancementProgress) => void,
  planLimits?: any
): Promise<string> => {
  // Simulate processing stages with plan-specific messaging
  const quality = planLimits?.quality || 'basic';
  const scale = planLimits?.maxScale || 4;
  
  onProgress({ status: 'starting', progress: 0, message: `Initializing ${quality} AI model...` });
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  onProgress({ status: 'processing', progress: 25, message: 'Analyzing image structure...' });
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  onProgress({ status: 'processing', progress: 50, message: `Applying ${scale}x ${quality} enhancement...` });
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  onProgress({ status: 'processing', progress: 75, message: `Processing with ${quality} quality AI...` });
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
    
    // Get user's plan limits for processing options
    const planLimits = getCurrentPlanLimits();
    
    // Check if we have a real API key
    const hasRealKey = import.meta.env.VITE_REPLICATE_API_TOKEN && 
                      import.meta.env.VITE_REPLICATE_API_TOKEN !== 'r8_demo_key';
    
    let enhancedUrl: string;
    
    if (hasRealKey) {
      // Real Replicate API implementation
      const imageDataUrl = await fileToDataURL(file);
      
      onProgress({ status: 'processing', progress: 25, message: 'Uploading to AI model...' });
      
      // Choose model and scale based on plan
      const modelVersion = getModelForQuality(planLimits.quality);
      const scale = Math.min(4, planLimits.maxScale); // Cap at 4x for Real-ESRGAN
      
      onProgress({ status: 'processing', progress: 50, message: `Applying ${planLimits.quality} quality enhancement...` });
      
      const output = await replicate.run(modelVersion, {
        input: {
          image: imageDataUrl,
          scale: scale,
        }
      }) as string;
      
      enhancedUrl = output;
      onProgress({ status: 'processing', progress: 90, message: 'Finalizing...' });
      
    } else {
      // Demo mode - simulate the process with plan-specific messaging
      console.log(`Running in demo mode - ${planLimits.quality} quality simulation`);
      enhancedUrl = await simulateEnhancement(file, onProgress, planLimits);
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