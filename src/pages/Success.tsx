import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhpixLogo } from '@/components/ui/enhpix-logo';
import { Check, Sparkles } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Countdown to auto-redirect
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-4 md:p-6 border-b border-border">
        <nav className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg">
              <EnhpixLogo className="w-8 h-8" />
            </div>
            <span className="text-xl font-bold text-white">Enhpix</span>
          </div>
        </nav>
      </header>

      {/* Success Content */}
      <div className="px-4 md:px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Payment Successful! 🎉</h1>
            <p className="text-lg text-muted-foreground">
              Welcome to Enhpix! Your subscription is now active and ready to use.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                What's Next?
              </CardTitle>
              <CardDescription>
                You now have access to all the features in your plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  <span>AI-powered image enhancement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  <span>High-quality upscaling</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  <span>Fast processing speeds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  <span>Priority support</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Button
              onClick={() => navigate('/dashboard')}
              className="w-full max-w-md mx-auto text-lg py-6"
              size="lg"
            >
              Start Enhancing Images →
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Redirecting automatically in {countdown} seconds...
            </p>
          </div>

          {sessionId && (
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong>Session ID:</strong> {sessionId}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Keep this for your records. You can cancel your subscription anytime from your dashboard.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Success;