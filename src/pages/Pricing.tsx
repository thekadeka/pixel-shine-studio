import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-4xl mx-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Simple Pricing</h1>
          <p className="text-muted-foreground mb-8">Choose the plan that's right for you</p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button 
              variant={!isYearly ? "default" : "outline"}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </Button>
            <Button 
              variant={isYearly ? "default" : "outline"}
              onClick={() => setIsYearly(true)}
            >
              Yearly (Save 17%)
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-2">Basic</h3>
            <div className="text-3xl font-bold mb-4">
              ${isYearly ? '190' : '19'}
              <span className="text-sm font-normal text-muted-foreground">
                /{isYearly ? 'year' : 'month'}
              </span>
            </div>
            <ul className="space-y-2 mb-6 text-sm">
              <li>• 150 images/month</li>
              <li>• Basic quality</li>
              <li>• 4x upscaling</li>
              <li>• Email support</li>
            </ul>
            <Button 
              className="w-full"
              onClick={() => navigate('/login')}
            >
              Get Started
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-card p-6 rounded-lg border-2 border-primary relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                Most Popular
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Pro</h3>
            <div className="text-3xl font-bold mb-4">
              ${isYearly ? '370' : '37'}
              <span className="text-sm font-normal text-muted-foreground">
                /{isYearly ? 'year' : 'month'}
              </span>
            </div>
            <ul className="space-y-2 mb-6 text-sm">
              <li>• 400 images/month</li>
              <li>• Premium quality</li>
              <li>• 8x upscaling</li>
              <li>• Priority support</li>
              <li>• Batch processing</li>
            </ul>
            <Button 
              className="w-full"
              onClick={() => navigate('/login')}
            >
              Get Started
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-2">Premium</h3>
            <div className="text-3xl font-bold mb-4">
              ${isYearly ? '900' : '90'}
              <span className="text-sm font-normal text-muted-foreground">
                /{isYearly ? 'year' : 'month'}
              </span>
            </div>
            <ul className="space-y-2 mb-6 text-sm">
              <li>• 1,300 images/month</li>
              <li>• Ultra quality</li>
              <li>• 16x upscaling</li>
              <li>• 24/7 support</li>
              <li>• API access</li>
            </ul>
            <Button 
              className="w-full"
              onClick={() => navigate('/login')}
            >
              Get Started
            </Button>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;