import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, FileText } from 'lucide-react';
import { EnhpixLogo } from '@/components/ui/enhpix-logo';

const Support = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-6 border-b border-border">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="p-2 bg-white rounded-lg">
              <EnhpixLogo className="w-8 h-8" />
            </div>
            <span className="text-xl font-bold text-foreground">Enhpix</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              Home
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/about')}>
              About
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/pricing')}>
              Pricing
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
        </nav>
      </header>

      {/* Support Content */}
      <div className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Support Center
            </h1>
            <p className="text-xl text-muted-foreground">
              We're here to help you get the most out of Enhpix
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Email Support</h3>
              <p className="text-muted-foreground mb-4">
                Get personalized help from our support team
              </p>
              <Button 
                onClick={() => window.open('mailto:support@enhpix.com?subject=Support Request', '_blank')}
                className="w-full"
              >
                Contact Support
              </Button>
            </div>

            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Live Chat</h3>
              <p className="text-muted-foreground mb-4">
                Chat with us in real-time during business hours
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  // In a real app, this would open a chat widget
                  alert('Live chat coming soon! Please use email support for now.');
                }}
                className="w-full"
              >
                Start Chat
              </Button>
            </div>

            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Documentation</h3>
              <p className="text-muted-foreground mb-4">
                Browse our comprehensive guides and tutorials
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  // In a real app, this would go to docs
                  alert('Documentation coming soon!');
                }}
                className="w-full"
              >
                View Docs
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  How does AI image enhancement work?
                </h3>
                <p className="text-muted-foreground">
                  Our AI uses advanced neural networks to analyze your images and intelligently 
                  upscale them while preserving and enhancing details, colors, and textures.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  What image formats do you support?
                </h3>
                <p className="text-muted-foreground">
                  We support all common image formats including JPEG, PNG, WebP, and TIFF. 
                  Maximum file size is 50MB per image.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  How long does processing take?
                </h3>
                <p className="text-muted-foreground">
                  Most images are processed within 30 seconds. Larger images or higher enhancement 
                  levels may take up to 2-3 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;