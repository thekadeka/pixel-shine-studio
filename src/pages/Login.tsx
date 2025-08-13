import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to Enhpix</h1>
          <p className="text-muted-foreground">Sign in to your account or create a new one</p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsLogin(true)}
              variant={isLogin ? "default" : "outline"}
              className="flex-1"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => setIsLogin(false)}
              variant={!isLogin ? "default" : "outline"} 
              className="flex-1"
            >
              Sign Up
            </Button>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            {isLogin ? (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Demo Login</h2>
                <p className="text-sm text-muted-foreground">
                  This is a demo. Click below to simulate login.
                </p>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full"
                >
                  Demo Sign In
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Demo Signup</h2>
                <p className="text-sm text-muted-foreground">
                  This is a demo. Click below to simulate account creation.
                </p>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full"
                >
                  Create Demo Account
                </Button>
              </div>
            )}
          </div>

          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-sm"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;