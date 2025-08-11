import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { EnhpixLogo } from '@/components/ui/enhpix-logo';

const Pricing = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Basic',
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: ['150 images per month', 'Up to 4x upscaling', 'Standard quality', 'Email support']
    },
    {
      name: 'Pro',
      monthlyPrice: 37,
      yearlyPrice: 370,
      features: ['500 images per month', 'Up to 8x upscaling', 'Premium quality', 'Priority support', 'Batch processing']
    },
    {
      name: 'Enterprise',
      monthlyPrice: 90,
      yearlyPrice: 900,
      features: ['Unlimited images', 'Up to 16x upscaling', 'Ultra quality', '24/7 support', 'API access', 'Custom integrations']
    }
  ];

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
          <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
            Sign In
          </Button>
        </nav>
      </header>

      {/* Pricing Content */}
      <div className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Upgrade your images with our AI-powered enhancement technology
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-12 h-6 rounded-full transition-colors ${isYearly ? 'bg-primary' : 'bg-border'}`}
              >
                <div
                  className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                    isYearly ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Yearly <span className="text-xs text-primary">(Save 17%)</span>
              </span>
            </div>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-2xl border ${
                  index === 1
                    ? 'border-primary bg-gradient-to-b from-primary/5 to-background'
                    : 'border-border bg-card'
                } shadow-card`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-background px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">
                      ${isYearly ? plan.yearlyPrice / 12 : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  {isYearly && (
                    <p className="text-sm text-muted-foreground">
                      Billed annually (${plan.yearlyPrice}/year)
                    </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={index === 1 ? 'default' : 'outline'}
                  onClick={() => {
                    // Navigate to checkout or login
                    navigate('/login');
                  }}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>

          {/* Free Trial */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Try Enhpix free with 1 image enhancement
            </p>
            <Button variant="outline" onClick={() => navigate('/')}>
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;