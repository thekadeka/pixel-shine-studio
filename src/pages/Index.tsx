import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2, Zap, Menu, X } from 'lucide-react';

type AppState = 'upload' | 'processing' | 'results';

const Index = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleNavigation = (path: string) => {
    try {
      console.log(`Navigating to: ${path}`);
      navigate(path);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Enhpix AI</h1>
        <p className="text-muted-foreground mb-8">Transform your images with AI-powered enhancement</p>
        
        <div className="flex gap-4 justify-center">
          <Button onClick={() => handleNavigation('/pricing')}>
            View Pricing
          </Button>
          <Button variant="outline" onClick={() => handleNavigation('/login')}>
            Sign In
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>AI-Powered</span>
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
  );
};

export default Index;
