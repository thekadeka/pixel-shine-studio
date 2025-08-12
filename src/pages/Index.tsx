import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Wand2, Zap, Menu, X } from 'lucide-react';
import { EnhpixLogo } from '@/components/ui/enhpix-logo';
import { ImageUploader } from '@/components/ImageUploader';
import { ProcessingStatus } from '@/components/ProcessingStatus';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-bg.jpg';

type AppState = 'upload' | 'processing' | 'results';

const Index = () => {
  const navigate = useNavigate();
  const [appState, setAppState] = useState<AppState>('upload');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleNavigation = (path: string) => {
    try {
      console.log(`Navigating to: ${path}`);
      navigate(path);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [enhancedUrl, setEnhancedUrl] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    // Redirect to signup instead of processing
    navigate('/login?tab=signup');
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
          <header className="p-6 relative z-50">
            <nav className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigation('/')}>
                <div className="p-2 bg-white rounded-lg">
                  <EnhpixLogo className="w-8 h-8" />
                </div>
                <span className="text-xl font-bold text-foreground">Enhpix</span>
              </div>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-3 relative z-50">
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => handleNavigation('/')}
                  className="bg-primary text-primary-foreground"
                >
                  Home
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleNavigation('/about')}
                  className="text-foreground hover:text-primary"
                >
                  About
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleNavigation('/pricing')}
                  className="text-foreground hover:text-primary"
                >
                  Pricing
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleNavigation('/login')}>
                  Sign In
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden relative z-50">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-foreground"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-40">
                <div className="flex flex-col p-4 space-y-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={() => {
                      handleNavigation('/');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start bg-primary text-primary-foreground"
                  >
                    Home
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      handleNavigation('/about');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-foreground hover:text-primary"
                  >
                    About
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      handleNavigation('/pricing');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-foreground hover:text-primary"
                  >
                    Pricing
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      handleNavigation('/login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            )}
          </header>

          {/* Hero Content */}
          {appState === 'upload' && (
            <div className="px-6 pb-20 pt-12">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                    Enhance Your Images with{' '}
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                      Enhpix AI
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
                Why Choose Enhpix?
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
            <div className="p-1 bg-white rounded">
              <EnhpixLogo className="w-4 h-4" />
            </div>
            <span className="font-medium text-foreground">Enhpix</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <button 
              onClick={() => handleNavigation('/privacy')} 
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button 
              onClick={() => handleNavigation('/terms')} 
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Terms
            </button>
            <button 
              onClick={() => handleNavigation('/support')} 
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Support
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
