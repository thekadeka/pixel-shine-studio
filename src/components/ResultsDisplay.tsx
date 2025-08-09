import { useState } from 'react';
import { Download, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

interface ResultsDisplayProps {
  originalImage: string;
  enhancedImage: string;
  originalFile: File;
  onStartOver: () => void;
}

export const ResultsDisplay = ({ 
  originalImage, 
  enhancedImage, 
  originalFile, 
  onStartOver 
}: ResultsDisplayProps) => {
  const [comparison, setComparison] = useState(50);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Simulate download process
      const response = await fetch(enhancedImage);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `enhanced_${originalFile.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Download complete!",
        description: "Your enhanced image has been saved.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading your image.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <Card className="p-6 bg-card shadow-card border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Enhancement Complete! ✨
            </h3>
            <p className="text-muted-foreground">
              Your image has been upscaled with AI enhancement
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onStartOver}
            >
              <RotateCcw className="w-4 h-4" />
              Start Over
            </Button>
            <Button
              variant="hero"
              onClick={handleDownload}
              disabled={isDownloading}
              className="min-w-32"
            >
              {isDownloading ? (
                <>
                  <Download className="w-4 h-4 animate-pulse" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Image Comparison */}
      <Card className="p-6 bg-card shadow-card border-border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">Before & After Comparison</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Original</span>
              <div className="w-16 h-6 bg-muted rounded-full p-1">
                <div 
                  className="h-4 w-4 bg-primary rounded-full transition-transform duration-200"
                  style={{ transform: `translateX(${comparison < 50 ? 0 : 24}px)` }}
                />
              </div>
              <span>Enhanced</span>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden bg-muted aspect-video">
            <div className="relative w-full h-full">
              {/* Enhanced image (background) */}
              <img
                src={enhancedImage}
                alt="Enhanced"
                className="absolute inset-0 w-full h-full object-contain"
              />
              
              {/* Original image overlay with clip path */}
              <div 
                className="absolute inset-0 transition-all duration-200 ease-out"
                style={{ 
                  clipPath: `inset(0 ${100 - comparison}% 0 0)`,
                }}
              >
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Divider line */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-primary shadow-glow transition-all duration-200"
                style={{ left: `${comparison}%` }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-glow">
                    <div className="w-1 h-4 bg-primary-foreground rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Slider */}
          <div className="px-4">
            <Slider
              value={[comparison]}
              onValueChange={(value) => setComparison(value[0])}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </Card>

      {/* Enhancement Details */}
      <Card className="p-6 bg-card shadow-card border-border">
        <h4 className="font-medium text-foreground mb-4">Enhancement Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">4x</div>
            <div className="text-sm text-muted-foreground">Resolution Increase</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-accent mb-1">AI</div>
            <div className="text-sm text-muted-foreground">Enhanced Details</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground mb-1">95%</div>
            <div className="text-sm text-muted-foreground">Quality Retained</div>
          </div>
        </div>
      </Card>
    </div>
  );
};