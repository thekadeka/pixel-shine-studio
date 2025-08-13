import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [imagesRemaining] = useState(3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-6 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold">Enhpix</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Trial Plan</span>
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold mb-4">Your Plan</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Plan:</span>
                  <span className="text-sm font-medium">Free Trial</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Images remaining:</span>
                  <span className="text-sm font-medium">{imagesRemaining}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4"
                onClick={() => navigate('/pricing')}
              >
                Upgrade Plan
              </Button>
            </div>
          </div>

          {/* Main Dashboard */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Welcome to your Dashboard!</h1>
              <p className="text-muted-foreground">
                Start enhancing your images with AI-powered upscaling
              </p>
            </div>

            {/* Upload Area */}
            <div className="bg-card p-8 rounded-lg border-2 border-dashed border-border text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📸</span>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">Upload Your Image</h3>
              <p className="text-muted-foreground mb-6">
                Drag and drop an image here, or click to browse
              </p>
              
              <div className="space-y-4">
                <Button size="lg" disabled={imagesRemaining <= 0}>
                  {imagesRemaining > 0 ? 'Choose Image' : 'No Credits Remaining'}
                </Button>
                
                {imagesRemaining <= 0 && (
                  <p className="text-sm text-muted-foreground">
                    <Button 
                      variant="link" 
                      className="p-0 h-auto"
                      onClick={() => navigate('/pricing')}
                    >
                      Upgrade your plan
                    </Button> to continue enhancing images
                  </p>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Recent Enhancements</h3>
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="text-center py-8 text-muted-foreground">
                  <span className="text-2xl mb-2 block">🎨</span>
                  <p>Your enhanced images will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;