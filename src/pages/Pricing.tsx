import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Sparkles, Star } from 'lucide-react';
import { EnhpixLogo } from '@/components/ui/enhpix-logo';

const Pricing = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Starter',
      icon: Sparkles,
      monthlyPrice: 9,
      yearlyPrice: 90,
      features: ['50 images/month', 'Basic quality', '4x upscaling', 'Email support'],
      popular: false
    },
    {
      name: 'Pro',
      icon: Zap,
      monthlyPrice: 37,
      yearlyPrice: 370,
      features: ['400 images/month', 'Premium quality', 'Priority support', '8x upscaling', 'Batch processing'],
      popular: true
    },
    {
      name: 'Premium',
      icon: Crown,
      monthlyPrice: 90,
      yearlyPrice: 900,
      features: ['1,500 images/month', 'Ultra quality', '24/7 support', '16x upscaling', 'API access'],
      popular: false
    },
    {
      name: 'Enterprise',
      icon: Star,
      monthlyPrice: 200,
      yearlyPrice: 2000,
      features: ['Unlimited images', 'Custom quality', 'Dedicated support', '32x upscaling', 'White label'],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="p-6 border-b border-gray-800">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="p-2 bg-white rounded-lg">
              <EnhpixLogo className="w-8 h-8" />
            </div>
            <span className="text-xl font-bold text-white">Enhpix</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/login')} className="border-gray-600 text-white hover:bg-gray-800">
            Sign In
          </Button>
        </nav>
      </header>

      {/* Pricing Content */}
      <div className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">
              Choose Your <span className="text-blue-400">AI Enhancement Plan</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Unlock professional-grade image enhancement with our AI-powered upscaling technology. Start with a free trial, then choose the plan that fits your needs.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-lg ${!isYearly ? 'text-white font-medium' : 'text-gray-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? 'bg-blue-500' : 'bg-gray-600'}`}
              >
                <div
                  className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${
                    isYearly ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg ${isYearly ? 'text-white font-medium' : 'text-gray-400'}`}>
                Yearly <span className="text-sm text-yellow-400 ml-1">Save 17%</span>
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
                  className={`relative p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                    plan.popular
                      ? 'border-blue-500 bg-gray-800/50 shadow-2xl shadow-blue-500/20'
                      : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      plan.popular ? 'bg-blue-500/20' : 'bg-gray-700/50'
                    }`}>
                      <IconComponent className={`w-8 h-8 ${plan.popular ? 'text-blue-400' : 'text-gray-300'}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-white">
                        ${isYearly ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice}
                      </span>
                      <span className="text-gray-400">/month</span>
                    </div>
                    {isYearly && (
                      <p className="text-sm text-gray-400">
                        Billed annually
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                    onClick={() => navigate('/login')}
                  >
                    Get Started
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Free Trial */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">
              Try Enhpix free with 1 image enhancement
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="border-gray-600 text-white hover:bg-gray-800"
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