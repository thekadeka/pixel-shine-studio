import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { EnhpixLogo } from '@/components/ui/enhpix-logo';
import { useToast } from '@/hooks/use-toast';
import { useSmartAuth } from '@/hooks/useSmartAuth';
import { shouldUseAuth } from '@/utils/environment';
import { Check, Shield, AlertCircle } from 'lucide-react';

// Conditional import for Stripe
let createCheckoutSession: any = null;
if (shouldUseAuth()) {
  try {
    const stripeModule = require('@/lib/stripe');
    createCheckoutSession = stripeModule.createCheckoutSession;
  } catch (error) {
    console.log('Stripe module not available, using demo mode');
  }
}

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { user, isAuthenticated, loading: authLoading } = useSmartAuth();
  const [isLoading, setIsLoading] = useState(false);

  const planId = searchParams.get('plan') || 'basic';
  const isYearly = searchParams.get('billing') === 'yearly';

  const plans = {
    basic: {
      name: 'Basic',
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: ['150 images/month', 'Basic quality', '4x upscaling', 'Email support', 'Fast processing']
    },
    pro: {
      name: 'Pro',
      monthlyPrice: 37,
      yearlyPrice: 370,
      features: ['400 images/month', 'Premium quality', 'Priority support', '8x upscaling', 'Batch processing']
    },
    premium: {
      name: 'Premium',
      monthlyPrice: 90,
      yearlyPrice: 900,
      features: ['1,300 images/month', 'Ultra quality', '24/7 support', '16x upscaling', 'API access']
    }
  };

  const selectedPlan = plans[planId as keyof typeof plans] || plans.basic;
  const price = isYearly ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice;
  const pricePerMonth = isYearly ? (selectedPlan.yearlyPrice / 12).toFixed(2) : selectedPlan.monthlyPrice;

  useEffect(() => {
    if (!planId || !selectedPlan) {
      navigate('/pricing');
    }
    
    // Redirect to login if not authenticated
    if (!authLoading && !isAuthenticated) {
      navigate(`/login?redirect=checkout&plan=${planId}&billing=${isYearly ? 'yearly' : 'monthly'}`);
    }
  }, [planId, selectedPlan, navigate, authLoading, isAuthenticated, isYearly]);

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to continue with checkout.',
        variant: 'destructive'
      });
      navigate(`/login?redirect=checkout&plan=${planId}&billing=${isYearly ? 'yearly' : 'monthly'}`);
      return;
    }

    if (!shouldUseAuth() || !createCheckoutSession) {
      // Demo mode
      toast({
        title: 'Demo Checkout',
        description: 'In production, this would redirect to live Stripe checkout!',
      });
      navigate('/success?demo=true');
      return;
    }

    setIsLoading(true);
    
    try {
      await createCheckoutSession({
        planName: planId,
        billing: isYearly ? 'yearly' : 'monthly',
        userId: user.id,
        userEmail: user.email,
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/pricing`
      });
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Checkout Error',
        description: 'Failed to start checkout. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show authentication required message
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Authentication Required
            </CardTitle>
            <CardDescription>
              Please sign in to continue with your subscription
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate(`/login?redirect=checkout&plan=${planId}&billing=${isYearly ? 'yearly' : 'monthly'}`)}
              className="w-full"
            >
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!selectedPlan) {
    return null;
  }

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
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Secure Checkout</span>
          </div>
        </nav>
      </header>

      <div className="px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Complete Your Purchase</h1>
            <p className="text-muted-foreground">
              You're about to subscribe to the {selectedPlan.name} plan
            </p>
          </div>

          {/* Plan Summary */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{selectedPlan.name} Plan</h3>
                  <p className="text-muted-foreground">{selectedPlan.features[0]}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">
                    ${price}
                    <span className="text-base font-normal text-muted-foreground">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                  {isYearly && (
                    <div className="text-sm text-muted-foreground">
                      (${pricePerMonth}/month)
                    </div>
                  )}
                </div>
              </div>
              
              {isYearly && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4">
                  <p className="text-sm text-primary font-medium">
                    💰 Save 17% with yearly billing
                  </p>
                </div>
              )}

              <Separator className="my-4" />

              <div className="space-y-2">
                <h4 className="font-medium text-foreground">What's included:</h4>
                <ul className="space-y-1">
                  {selectedPlan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Checkout Button */}
          <div className="text-center">
            <Button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full max-w-md mx-auto text-lg py-6"
              size="lg"
            >
              {isLoading ? 'Processing...' : `Subscribe for $${price}/${isYearly ? 'year' : 'month'}`}
            </Button>
            
            <p className="text-xs text-muted-foreground mt-4">
              Secure payment powered by Stripe. Cancel anytime.
            </p>
            
            <p className="text-xs text-muted-foreground text-center mt-2">
              By completing this purchase, you agree to our{' '}
              <button 
                type="button"
                onClick={() => navigate('/terms')}
                className="text-primary hover:underline"
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button 
                type="button"
                onClick={() => navigate('/privacy')}
                className="text-primary hover:underline"
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;