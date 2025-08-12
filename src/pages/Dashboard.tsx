import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { EnhpixLogo } from '@/components/ui/enhpix-logo';
import { ImageUploader } from '@/components/ImageUploader';
import { ProcessingStatus } from '@/components/ProcessingStatus';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { 
  User, 
  Crown, 
  Zap, 
  Settings, 
  LogOut, 
  Upload,
  History,
  Star,
  Gift,
  Sparkles,
  MessageSquare,
  Send,
  Mic
} from 'lucide-react';

interface UserData {
  email: string;
  name?: string;
  plan: string;
  billing: string;
  subscriptionId: string;
  createdAt: string;
  trialImages?: number;
  usedImages?: number;
}

type AppState = 'upload' | 'processing' | 'results';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<UserData | null>(null);
  const [appState, setAppState] = useState<AppState>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [enhancedUrl, setEnhancedUrl] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('enhpix_user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Show welcome message for new users
    if (searchParams.get('welcome') === 'true') {
      setShowWelcome(true);
      // Remove welcome param from URL
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('welcome');
      navigate(`/dashboard?${newParams.toString()}`, { replace: true });
    }
  }, [navigate, searchParams]);

  const getPlanDetails = (planType: string) => {
    const plans = {
      trial: { 
        name: 'Free Trial', 
        maxImages: 3, 
        quality: 'Basic', 
        upscaling: '4x',
        color: 'bg-gray-500'
      },
      starter: { 
        name: 'Starter', 
        maxImages: 50, 
        quality: 'Basic', 
        upscaling: '4x',
        color: 'bg-blue-500'
      },
      pro: { 
        name: 'Pro', 
        maxImages: 400, 
        quality: 'Premium', 
        upscaling: '8x',
        color: 'bg-purple-500',
        features: ['Batch processing', 'Priority support']
      },
      premium: { 
        name: 'Premium', 
        maxImages: 1500, 
        quality: 'Ultra', 
        upscaling: '16x',
        color: 'bg-gold-500',
        features: ['API access', '24/7 support', 'Advanced filters']
      }
    };
    return plans[planType as keyof typeof plans] || plans.trial;
  };

  const handleImageUpload = (file: File) => {
    if (!user) return;

    const planDetails = getPlanDetails(user.plan);
    const usedImages = user.usedImages || 0;
    const availableImages = user.plan === 'trial' ? (user.trialImages || 0) : planDetails.maxImages - usedImages;

    if (availableImages <= 0) {
      alert('You have reached your image limit. Please upgrade your plan to continue.');
      navigate('/pricing');
      return;
    }

    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setAppState('processing');

    // Simulate AI processing with plan-specific timing
    const processingTime = user.plan === 'premium' ? 2000 : user.plan === 'pro' ? 3000 : 4000;
    
    setTimeout(() => {
      setEnhancedUrl(url); // In real app, this would be the enhanced image
      setAppState('results');
      
      // Update usage count
      const updatedUser = {
        ...user,
        usedImages: usedImages + 1,
        trialImages: user.plan === 'trial' ? Math.max(0, (user.trialImages || 3) - 1) : user.trialImages
      };
      setUser(updatedUser);
      localStorage.setItem('enhpix_user', JSON.stringify(updatedUser));
    }, processingTime);
  };

  const handleStartOver = () => {
    setAppState('upload');
    setUploadedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (enhancedUrl && enhancedUrl !== previewUrl) {
      URL.revokeObjectURL(enhancedUrl);
      setEnhancedUrl(null);
    }
  };

  const handleCancelProcessing = () => {
    setAppState('upload');
  };

  const handleLogout = () => {
    localStorage.removeItem('enhpix_user');
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const planDetails = getPlanDetails(user.plan);
  const usedImages = user.usedImages || 0;
  const availableImages = user.plan === 'trial' 
    ? (user.trialImages || 0) 
    : planDetails.maxImages - usedImages;
  const usagePercentage = user.plan === 'trial' 
    ? ((3 - (user.trialImages || 0)) / 3) * 100
    : (usedImages / planDetails.maxImages) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Welcome to Enhpix! 🎉</CardTitle>
              <CardDescription>
                {user.plan === 'trial' 
                  ? `You're on a free trial with ${user.trialImages || 3} image enhancements included.`
                  : `Your ${planDetails.name} subscription is now active!`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setShowWelcome(false)}
                className="w-full"
              >
                Start Enhancing Images
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account and subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Plan</label>
                <p className="text-sm text-muted-foreground">{planDetails.name} ({user.billing})</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Member Since</label>
                <p className="text-sm text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button onClick={() => navigate('/pricing')} variant="outline" className="flex-1">
                  Manage Subscription
                </Button>
                <Button onClick={() => setShowSettings(false)} className="flex-1">
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <header className="p-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg">
              <EnhpixLogo className="w-8 h-8" />
            </div>
            <span className="text-xl font-bold text-foreground">Enhpix</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="hidden sm:flex">
              <Crown className="w-3 h-3 mr-1" />
              {planDetails.name}
            </Badge>
            
            <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-foreground">{user.name || 'User'}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                
                <div className={`p-3 rounded-lg ${planDetails.color}/10`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">{planDetails.name} Plan</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <p className="text-muted-foreground">Quality: {planDetails.quality}</p>
                    <p className="text-muted-foreground">Max upscaling: {planDetails.upscaling}</p>
                  </div>
                </div>

                {user.plan === 'trial' ? (
                  <Button onClick={() => navigate('/pricing')} className="w-full">
                    <Gift className="w-4 h-4 mr-2" />
                    Upgrade Plan
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => navigate('/pricing')} className="w-full">
                    Manage Subscription
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Usage This Month
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Images Enhanced</span>
                    <span>{user.plan === 'trial' ? (3 - (user.trialImages || 0)) : usedImages} / {user.plan === 'trial' ? 3 : planDetails.maxImages}</span>
                  </div>
                  <Progress value={usagePercentage} className="h-2" />
                </div>

                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Remaining</span>
                    <span className="font-medium">{availableImages}</span>
                  </div>
                  
                  {planDetails.features && (
                    <div className="pt-2 border-t border-border">
                      <p className="text-muted-foreground mb-1">Plan Features:</p>
                      {planDetails.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-xs">
                          <Star className="w-3 h-3 text-accent" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* AI Tools Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Wand2 className="w-6 h-6 text-primary" />
                  AI Enhancement Tools
                </CardTitle>
                <CardDescription className="text-base">
                  Choose the perfect enhancement method for your image type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card 
                    className={`cursor-pointer transition-all hover:scale-105 ${selectedTool === 'universal' ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                    onClick={() => setSelectedTool('universal')}
                  >
                    <CardContent className="p-4 text-center">
                      <Image className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h3 className="font-semibold text-sm">Universal</h3>
                      <p className="text-xs text-muted-foreground">All image types</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={`cursor-pointer transition-all hover:scale-105 ${selectedTool === 'photo' ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                    onClick={() => setSelectedTool('photo')}
                  >
                    <CardContent className="p-4 text-center">
                      <Camera className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h3 className="font-semibold text-sm">Photo</h3>
                      <p className="text-xs text-muted-foreground">Real photos</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={`cursor-pointer transition-all hover:scale-105 ${selectedTool === 'artwork' ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                    onClick={() => setSelectedTool('artwork')}
                  >
                    <CardContent className="p-4 text-center">
                      <Palette className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h3 className="font-semibold text-sm">Artwork</h3>
                      <p className="text-xs text-muted-foreground">Digital art</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={`cursor-pointer transition-all hover:scale-105 ${selectedTool === 'logo' ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'} ${user.plan === 'trial' ? 'opacity-50' : ''}`}
                    onClick={() => user.plan !== 'trial' && setSelectedTool('logo')}
                  >
                    <CardContent className="p-4 text-center">
                      <Layers className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h3 className="font-semibold text-sm">Logo/Text</h3>
                      <p className="text-xs text-muted-foreground">Sharp graphics</p>
                      {user.plan === 'trial' && <Badge variant="secondary" className="text-xs mt-1">Pro+</Badge>}
                    </CardContent>
                  </Card>
                </div>
                
                {/* Enhancement Methods for Paid Users */}
                {user.plan !== 'trial' && planDetails.methods && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Gauge className="w-4 h-4" />
                      Enhancement Method
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {planDetails.methods.map((method) => (
                        <Badge 
                          key={method}
                          variant={selectedMethod === method.toLowerCase() ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => setSelectedMethod(method.toLowerCase())}
                        >
                          {method}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Different models optimized for various image types and quality levels
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Image Enhancement */}
            <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Upload className="w-6 h-6 text-primary" />
                  Upload & Enhance
                </CardTitle>
                <CardDescription className="text-base">
                  Drag and drop your image or click to browse
                  {availableImages <= 0 ? (
                    <span className="text-destructive ml-2 font-medium">
                      • No images remaining - upgrade to continue
                    </span>
                  ) : (
                    <span className="text-primary ml-2 font-medium">
                      • {availableImages} enhancement{availableImages !== 1 ? 's' : ''} remaining
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {appState === 'upload' && (
                  <ImageUploader 
                    onImageUpload={handleImageUpload}
                    disabled={availableImages <= 0}
                  />
                )}

                {appState === 'processing' && (
                  <ProcessingStatus 
                    isProcessing={true} 
                    onCancel={handleCancelProcessing}
                    message={`Enhancing with ${planDetails.quality} quality...`}
                  />
                )}

                {appState === 'results' && previewUrl && enhancedUrl && uploadedFile && (
                  <ResultsDisplay
                    originalImage={previewUrl}
                    enhancedImage={enhancedUrl}
                    originalFile={uploadedFile}
                    onStartOver={handleStartOver}
                    planType={user.plan}
                  />
                )}

                {availableImages <= 0 && appState === 'upload' && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Crown className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {user.plan === 'trial' ? 'Trial Complete!' : 'Monthly Limit Reached'}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {user.plan === 'trial' 
                        ? 'You\'ve used your free trial image. Upgrade to continue enhancing images.'
                        : 'You\'ve reached your monthly image limit. Upgrade for more capacity.'
                      }
                    </p>
                    <Button onClick={() => navigate('/pricing')}>
                      View Pricing Plans
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhancement Showcase */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Enhancement Showcase
                </CardTitle>
                <CardDescription>
                  See the power of our AI enhancement tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="group relative rounded-lg overflow-hidden bg-muted">
                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-blue-600" />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-center text-white">
                        <Eye className="w-6 h-6 mx-auto mb-1" />
                        <p className="text-sm">Portrait Enhancement</p>
                        <p className="text-xs text-gray-300">4x → 16x upscale</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative rounded-lg overflow-hidden bg-muted">
                    <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                      <Palette className="w-12 h-12 text-purple-600" />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-center text-white">
                        <Eye className="w-6 h-6 mx-auto mb-1" />
                        <p className="text-sm">Digital Artwork</p>
                        <p className="text-xs text-gray-300">Crisp details preserved</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative rounded-lg overflow-hidden bg-muted">
                    <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                      <Layers className="w-12 h-12 text-green-600" />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-center text-white">
                        <Eye className="w-6 h-6 mx-auto mb-1" />
                        <p className="text-sm">Logo & Graphics</p>
                        <p className="text-xs text-gray-300">Sharp edges maintained</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Pro Tip</p>
                      <p className="text-sm text-muted-foreground">
                        Upload images with different enhancement tools selected to see varying results optimized for each image type.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent History */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Your Recent Enhancements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Your enhanced images will appear here after processing
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;