import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Sparkles, Building2 } from 'lucide-react';
import { EnhpixLogo } from '@/components/ui/enhpix-logo';

const Pricing = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Basic',
      icon: Sparkles,
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: ['150 images/month', 'Basic quality', '4x upscaling', 'Email support'],
      popular: false,
      isEnterprise: false
    },
    {
      name: 'Pro',
      icon: Zap,
      monthlyPrice: 37,
      yearlyPrice: 370,
      features: ['400 images/month', 'Premium quality', 'Priority support', '8x upscaling', 'Batch processing'],
      popular: true,
      isEnterprise: false
    },
    {
      name: 'Premium',
      icon: Crown,
      monthlyPrice: 90,
      yearlyPrice: 900,
      features: ['1,300 images/month', 'Ultra quality', '24/7 support', '16x upscaling', 'API access'],
      popular: false,
      isEnterprise: false
    },
    {
      name: 'Enterprise',
      icon: Building2,
      monthlyPrice: null,
      yearlyPrice: null,
      features: ['Unlimited images', 'Custom solutions', 'Dedicated account manager', 'Priority processing', 'Custom integrations', 'White label options'],
      popular: false,
      isEnterprise: true
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden max-w-full">
      {/* Header */}
      <header className="p-4 md:p-6 border-b border-border">
        <nav className="max-w-7xl mx-auto flex items-center justify-between overflow-x-hidden w-full">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="p-2 bg-white rounded-lg">
              <EnhpixLogo className="w-8 h-8" />
            </div>
            <span className="text-xl font-bold text-white">Enhpix</span>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              Home
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/about')}>
              About
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => navigate('/pricing')}
              className="bg-primary text-primary-foreground"
            >
              Pricing
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>

          {/* Mobile Back Button */}
          <div className="md:hidden">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                console.log('Mobile back button clicked - Pricing');
                navigate('/');
              }}
              className="text-foreground bg-background hover:bg-muted min-h-[44px] px-4"
            >
              ← Back
            </Button>
          </div>
        </nav>
      </header>

      {/* Pricing Content */}
      <div className="px-2 sm:px-3 md:px-6 py-4 sm:py-6 md:py-20">
        <div className="max-w-7xl mx-auto overflow-x-hidden w-full">
          <div className="text-center mb-4 sm:mb-6 md:mb-16">
            <h1 className="text-base sm:text-lg md:text-3xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-foreground px-1 sm:px-2 break-words overflow-wrap-anywhere max-w-full">
              Choose Your <span className="text-primary">AI Enhancement Plan</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-muted-foreground mb-3 sm:mb-4 md:mb-8 max-w-3xl mx-auto px-1 sm:px-2 break-words overflow-wrap-anywhere">
              Unlock professional-grade image enhancement with our AI-powered upscaling technology. Start with a free trial, then choose the plan that fits your needs.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-4 mb-3 sm:mb-4 md:mb-8 px-1 sm:px-2">
              <span className={`text-xs ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-8 h-4 sm:w-10 sm:h-5 md:w-14 md:h-7 rounded-full transition-colors ${isYearly ? 'bg-primary' : 'bg-muted'}`}
              >
                <div
                  className={`absolute w-2 h-2 sm:w-3 sm:h-3 md:w-5 md:h-5 bg-white rounded-full top-1 transition-transform ${
                    isYearly ? 'translate-x-5 sm:translate-x-6 md:translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-xs ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Yearly <span className="text-xs text-accent ml-1">Save 17%</span>
              </span>
            </div>
          </div>

          {/* Plans */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-1 sm:px-2">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl transition-all hover:scale-105 ${
                    plan.popular
                      ? 'bg-card border-2 border-accent shadow-2xl shadow-accent/30 ring-2 ring-accent/50'
                      : 'bg-card border border-border hover:border-accent/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-2 sm:-top-3 md:-top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary text-primary-foreground px-2 sm:px-3 md:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-3 sm:mb-4 md:mb-6">
                    <div className={`w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center ${
                      plan.popular ? 'bg-primary-foreground' : 'bg-muted'
                    }`}>
                      <IconComponent className={`w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <h3 className="text-sm sm:text-lg md:text-2xl font-bold text-foreground mb-1 sm:mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      {plan.isEnterprise ? (
                        <div>
                          <span className="text-3xl font-bold text-foreground">Custom</span>
                          <p className="text-muted-foreground text-sm">Contact for pricing</p>
                        </div>
                      ) : (
                        <>
                          <span className="text-4xl font-bold text-foreground">
                            ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                          </span>
                          <span className="text-muted-foreground">/{isYearly ? 'year' : 'month'}</span>
                          {isYearly && (
                            <div className="text-sm text-muted-foreground mt-1">
                              (${(plan.yearlyPrice / 12).toFixed(2)}/month)
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    {isYearly && !plan.isEnterprise && (
                      <p className="text-sm text-muted-foreground">
                        Billed annually
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => {
                      if (plan.isEnterprise) {
                        // Open email or contact form for Enterprise
                        window.open('mailto:contact@enhpix.com?subject=Enterprise Plan Inquiry', '_blank');
                      } else {
                        // Navigate to checkout with plan details
                        const planKey = plan.name.toLowerCase();
                        navigate(`/checkout?plan=${planKey}&billing=${isYearly ? 'yearly' : 'monthly'}`);
                      }
                    }}
                  >
                    {plan.isEnterprise ? 'Contact Us' : 'Get Started'}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Free Trial */}
          <div className="text-center mt-4 sm:mt-6 md:mt-12 px-1 sm:px-2">
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-3 sm:mb-4 break-words overflow-wrap-anywhere max-w-full">
              Try Enhpix free with 3 image enhancements
            </p>
            <Button 
              variant="outline"
              size="sm"
              className="sm:size-default"
              onClick={() => navigate('/login?tab=signup')}
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;