import { useState } from 'react';
import { Sparkles, Wand2, Zap } from 'lucide-react';
import { ImageUploader } from '@/components/ImageUploader';
import { ProcessingStatus } from '@/components/ProcessingStatus';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-bg.jpg';

type AppState = 'upload' | 'processing' | 'results';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [enhancedUrl, setEnhancedUrl] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Start processing simulation
    setAppState('processing');
    
    // Simulate AI processing (3 seconds)
    setTimeout(() => {
      setEnhancedUrl(url); // In real app, this would be the enhanced image
      setAppState('results');
    }, 3000);
  };

  const handleStartOver = () => {
    setAppState('upload');
    setUploadedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (enhancedUrl && enhancedUrl !== previewUrl) {
      URL.revokeObjectURL(enhancedUrl);
      setEnhancedUrl(null);
    }
  };

  const handleCancelProcessing = () => {
    setAppState('upload');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-background/90" />
        <div className="relative z-10">
          {/* Header */}
          <header className="p-6">
            <nav className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <Wand2 className="w-6 h-6 text-background" />
                </div>
                <span className="text-xl font-bold text-foreground">AI Upscaler</span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <Button variant="ghost" size="sm">About</Button>
                <Button variant="ghost" size="sm">Pricing</Button>
                <Button variant="outline" size="sm">Sign In</Button>
              </div>
            </nav>
          </header>

          {/* Hero Content */}
          {appState === 'upload' && (
            <div className="px-6 pb-20 pt-12">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                    Enhance Your Images with{' '}
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                      AI Power
                    </span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Transform low-resolution images into stunning high-quality masterpieces. 
                    Our advanced AI upscales your photos up to 4x while preserving every detail.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>AI-Powered Enhancement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>Lightning Fast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-primary" />
                    <span>Professional Quality</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {appState === 'upload' && (
            <ImageUploader onImageUpload={handleImageUpload} />
          )}

          {appState === 'processing' && (
            <ProcessingStatus 
              isProcessing={true} 
              onCancel={handleCancelProcessing}
            />
          )}

          {appState === 'results' && previewUrl && enhancedUrl && uploadedFile && (
            <ResultsDisplay
              originalImage={previewUrl}
              enhancedImage={enhancedUrl}
              originalFile={uploadedFile}
              onStartOver={handleStartOver}
            />
          )}
        </div>
      </div>

      {/* Features Section */}
      {appState === 'upload' && (
        <div className="px-6 py-20 bg-gradient-subtle">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Choose AI Upscaler?
              </h2>
              <p className="text-lg text-muted-foreground">
                Advanced technology meets simple, intuitive design
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-card rounded-xl shadow-card border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">AI Enhancement</h3>
                <p className="text-muted-foreground">
                  State-of-the-art neural networks analyze and enhance every pixel for maximum quality.
                </p>
              </div>

              <div className="text-center p-6 bg-card rounded-xl shadow-card border border-border">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Process your images in seconds, not minutes. Optimized for speed without compromising quality.
                </p>
              </div>

              <div className="text-center p-6 bg-card rounded-xl shadow-card border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wand2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Professional Results</h3>
                <p className="text-muted-foreground">
                  Get print-ready, high-resolution images suitable for professional use and large displays.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-gradient-primary rounded">
              <Wand2 className="w-4 h-4 text-background" />
            </div>
            <span className="font-medium text-foreground">AI Upscaler</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
