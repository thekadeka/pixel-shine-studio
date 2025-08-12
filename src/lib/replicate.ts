import Replicate from 'replicate'

const replicate = new Replicate({
  auth: import.meta.env.VITE_REPLICATE_API_TOKEN!,
})

export interface EnhancementOptions {
  scale: number // 2, 4, 8, 16
  model: 'basic' | 'premium' | 'ultra'
}

export const enhanceImage = async (imageUrl: string, options: EnhancementOptions) => {
  try {
    // Choose model based on plan
    const modelVersion = getModelVersion(options.model)
    
    const output = await replicate.run(modelVersion, {
      input: {
        image: imageUrl,
        scale: options.scale,
      }
    })

    return {
      success: true,
      enhancedUrl: output as string,
      originalUrl: imageUrl
    }
  } catch (error) {
    console.error('Replicate enhancement failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

function getModelVersion(model: string): string {
  switch (model) {
    case 'premium':
      return 'nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc972b8d1e8c38eb9d8b9c6b4'
    case 'ultra':
      return 'xinntao/realesrgan:1f94cf24571d33eff56cacaa0e74f12a74e3f0ae03d7af22c7d5f72b6d0f5937'
    default: // basic
      return 'nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc972b8d1e8c38eb9d8b9c6b4'
  }
}

export default replicate