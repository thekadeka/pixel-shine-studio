import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { EnhpixLogo } from '@/components/ui/enhpix-logo';
import { Check, CreditCard, Shield } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'US'
  });

  const planId = searchParams.get('plan');
  const isYearly = searchParams.get('billing') === 'yearly';

  const plans = {
    starter: {
      name: 'Starter',
      monthlyPrice: 9,
      yearlyPrice: 90,
      features: ['50 images/month', 'Basic quality', '4x upscaling', 'Email support'],
      stripeMonthlyId: 'price_starter_monthly',
      stripeYearlyId: 'price_starter_yearly'
    },
    pro: {
      name: 'Pro',
      monthlyPrice: 37,
      yearlyPrice: 370,
      features: ['400 images/month', 'Premium quality', 'Priority support', '8x upscaling', 'Batch processing'],
      stripeMonthlyId: 'price_pro_monthly',
      stripeYearlyId: 'price_pro_yearly'
    },
    premium: {
      name: 'Premium',
      monthlyPrice: 90,
      yearlyPrice: 900,
      features: ['1,500 images/month', 'Ultra quality', '24/7 support', '16x upscaling', 'API access'],
      stripeMonthlyId: 'price_premium_monthly',
      stripeYearlyId: 'price_premium_yearly'
    }
  };

  const selectedPlan = planId ? plans[planId as keyof typeof plans] : plans.pro;
  const price = isYearly ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice;
  const pricePerMonth = isYearly ? Math.round(selectedPlan.yearlyPrice / 12) : selectedPlan.monthlyPrice;

  useEffect(() => {
    if (!planId || !selectedPlan) {
      navigate('/pricing');
    }
  }, [planId, selectedPlan, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would integrate with Stripe
      // For now, we'll simulate the payment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create user account and redirect to success
      const newUser = {
        email: formData.email,
        password: 'checkout_user', // Default password for checkout users
        name: formData.name,
        plan: planId,
        billing: isYearly ? 'yearly' : 'monthly',
        subscriptionId: `sub_${Date.now()}`,
        createdAt: new Date().toISOString(),
        usedImages: 0,
        trialImages: 0
      };
      
      // Get existing users and add new user
      const usersData = localStorage.getItem('enhpix_users');
      const users = usersData ? JSON.parse(usersData) : [];
      
      // Check if user already exists
      const existingUserIndex = users.findIndex((u: any) => u.email === formData.email);
      if (existingUserIndex !== -1) {
        // Update existing user with new subscription
        users[existingUserIndex] = { ...users[existingUserIndex], ...newUser };
      } else {
        // Add new user
        users.push(newUser);
      }
      
      localStorage.setItem('enhpix_users', JSON.stringify(users));
      localStorage.setItem('enhpix_user', JSON.stringify(newUser));

      navigate('/dashboard?welcome=true');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  Complete your subscription to {selectedPlan.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{selectedPlan.name} Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      {isYearly ? 'Annual billing' : 'Monthly billing'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      ${pricePerMonth}/month
                    </p>
                    {isYearly && (
                      <p className="text-sm text-muted-foreground">
                        Billed ${price} yearly
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

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

                <Separator />

                <div className="flex items-center justify-between font-semibold">
                  <span>Total {isYearly ? '(Annual)' : '(Monthly)'}</span>
                  <span className="text-primary">${price}</span>
                </div>

                {isYearly && (
                  <div className="text-center text-sm text-accent">
                    Save ${(selectedPlan.monthlyPrice * 12) - selectedPlan.yearlyPrice} per year
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="order-1 lg:order-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </CardTitle>
                <CardDescription>
                  Enter your payment details to complete your subscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      placeholder="4242 4242 4242 4242 (Test Card)"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Test card: 4242 4242 4242 4242 | Expiry: 12/25 | CVV: 123
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        placeholder="12/25"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="123 Main St"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="New York"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        placeholder="10001"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : `Complete Payment - $${price}`}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
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
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;