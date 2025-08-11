import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { EnhpixLogo } from '@/components/ui/enhpix-logo';

const Login = () => {
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
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => navigate('/login')}
              className="bg-primary text-primary-foreground"
            >
              Sign In
            </Button>
          </div>
        </nav>
      </header>

      {/* Login Content */}
      <div className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <div className="space-y-4">
            <div className="text-center p-8 border border-border rounded-lg">
              <p className="text-muted-foreground mb-4">Authentication coming soon</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => navigate('/')} variant="outline">
                  Back to Home
                </Button>
                <Button onClick={() => navigate('/pricing')} variant="default">
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;