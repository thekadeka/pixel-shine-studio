import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Sparkles, Building2, Menu, X } from 'lucide-react';
import { EnhpixLogo } from '@/components/ui/enhpix-logo';

const Pricing = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const plans = [
    {
      name: 'Starter',
      icon: Sparkles,
      monthlyPrice: 9,
      yearlyPrice: 90,
      features: ['50 images/month', 'Basic quality', '4x upscaling', 'Email support'],
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
      features: ['1,500 images/month', 'Ultra quality', '24/7 support', '16x upscaling', 'API access'],
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-4 md:p-6 border-b border-border">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
            <div className="flex flex-col p-4 space-y-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  navigate('/');
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start text-foreground hover:text-primary"
              >
                Home
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  navigate('/about');
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start text-foreground hover:text-primary"
              >
                About
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => {
                  navigate('/pricing');
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start bg-primary text-primary-foreground"
              >
                Pricing
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  navigate('/login');
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

      {/* Pricing Content */}
      <div className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 text-foreground">
              Choose Your <span className="text-primary">AI Enhancement Plan</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Unlock professional-grade image enhancement with our AI-powered upscaling technology. Start with a free trial, then choose the plan that fits your needs.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-lg ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? 'bg-primary' : 'bg-muted'}`}
              >
                <div
                  className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${
                    isYearly ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Yearly <span className="text-sm text-accent ml-1">Save 17%</span>
              </span>
            </div>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative p-6 rounded-2xl transition-all hover:scale-105 ${
                    plan.popular
                      ? 'bg-card border-2 border-accent shadow-2xl shadow-accent/30 ring-2 ring-accent/50'
                      : 'bg-card border border-border hover:border-accent/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      plan.popular ? 'bg-primary-foreground' : 'bg-muted'
                    }`}>
                      <IconComponent className={`w-8 h-8 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      {plan.isEnterprise ? (
                        <div>
                          <span className="text-3xl font-bold text-foreground">Custom</span>
                          <p className="text-muted-foreground text-sm">Contact for pricing</p>
                        </div>
                      ) : (
                        <>
                          <span className="text-4xl font-bold text-foreground">
                            ${isYearly ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice}
                          </span>
                          <span className="text-muted-foreground">/month</span>
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
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Try Enhpix free with 1 image enhancement
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
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