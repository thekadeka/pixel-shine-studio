import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
// In production, set this via environment variables
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo_key';
export const stripePromise = loadStripe(stripePublishableKey);

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  stripePriceIdMonthly?: string;
  stripePriceIdYearly?: string;
  features: string[];
  imageLimit: number;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    priceMonthly: 19,
    priceYearly: 190,
    stripePriceIdMonthly: 'price_basic_monthly', // Replace with actual Stripe Price IDs
    stripePriceIdYearly: 'price_basic_yearly',
    imageLimit: 150,
    features: [
      '150 images/month',
      '4x upscaling resolution', 
      'Basic quality enhancement',
      'Email support',
      'Standard processing speed'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 37,
    priceYearly: 370,
    stripePriceIdMonthly: 'price_pro_monthly',
    stripePriceIdYearly: 'price_pro_yearly', 
    imageLimit: 400,
    features: [
      '400 images/month',
      '8x upscaling resolution',
      'Premium quality enhancement', 
      'Priority support',
      'Batch processing'
    ]
  },
  {
    id: 'premium',
    name: 'Premium', 
    priceMonthly: 90,
    priceYearly: 900,
    stripePriceIdMonthly: 'price_premium_monthly',
    stripePriceIdYearly: 'price_premium_yearly',
    imageLimit: 1300,
    features: [
      '1,300 images/month',
      '16x upscaling resolution',
      'Ultra quality enhancement',
      '24/7 priority support', 
      'API access & integrations'
    ]
  }
];

export interface CheckoutData {
  planId: string;
  billing: 'monthly' | 'yearly';
  customerEmail?: string;
  customerName?: string;
}

// Create Stripe checkout session
export const createCheckoutSession = async (data: CheckoutData) => {
  try {
    // Find the selected plan
    const plan = PRICING_PLANS.find(p => p.id === data.planId);
    if (!plan) {
      throw new Error('Invalid plan selected');
    }

    // Get the correct price ID based on billing cycle
    const priceId = data.billing === 'yearly' 
      ? plan.stripePriceIdYearly 
      : plan.stripePriceIdMonthly;

    if (!priceId) {
      throw new Error('Price ID not configured for this plan');
    }

    // In a real implementation, this would call your backend
    // For demo mode, we'll simulate successful payment and redirect to success
    const demoSessionId = 'cs_demo_' + Math.random().toString(36).substr(2, 9);
    const checkoutSession = {
      id: demoSessionId,
      url: `${window.location.origin}/success?demo=true&session_id=${demoSessionId}`,
      customer_email: data.customerEmail,
      success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${window.location.origin}/pricing`,
      mode: 'subscription',
      line_items: [{
        price: priceId,
        quantity: 1
      }]
    };

    return checkoutSession;

  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new Error('Failed to create checkout session');
  }
};

// Redirect to Stripe Checkout
export const redirectToCheckout = async (checkoutData: CheckoutData) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    // Create checkout session
    const session = await createCheckoutSession(checkoutData);
    
    // In demo mode, redirect directly to success page
    if (session.url.includes('demo=true')) {
      window.location.href = session.url;
      return;
    }

    // In production, redirect to actual Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (error) {
      throw new Error(error.message);
    }

  } catch (error) {
    console.error('Checkout redirect failed:', error);
    throw error;
  }
};

// Verify payment session (for success page)
export const verifyPaymentSession = async (sessionId: string) => {
  try {
    // In a real implementation, this would call your backend to verify the session
    // For demo purposes, we'll simulate a successful verification
    if (sessionId.startsWith('cs_demo_')) {
      return {
        id: sessionId,
        payment_status: 'paid',
        customer: {
          email: 'demo@enhpix.com',
          name: 'Demo Customer'
        },
        subscription: {
          id: 'sub_demo_' + Math.random().toString(36).substr(2, 9),
          status: 'active'
        }
      };
    }

    // This would make a real API call to your backend
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sessionId })
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    return response.json();

  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
};

export const getPlanById = (planId: string): PricingPlan | undefined => {
  return PRICING_PLANS.find(plan => plan.id === planId);
};