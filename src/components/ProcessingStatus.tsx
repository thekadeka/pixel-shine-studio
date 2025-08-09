import { useState, useEffect } from 'react';
import { Loader2, Sparkles, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface ProcessingStatusProps {
  isProcessing: boolean;
  onCancel?: () => void;
}

export const ProcessingStatus = ({ isProcessing, onCancel }: ProcessingStatusProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { name: "Analyzing image", icon: Sparkles },
    { name: "AI enhancement", icon: Zap },
    { name: "Upscaling resolution", icon: Loader2 },
    { name: "Finalizing", icon: Sparkles },
  ];

  useEffect(() => {
    if (!isProcessing) {
      setProgress(0);
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        
        // Update current step based on progress
        if (newProgress > 75) setCurrentStep(3);
        else if (newProgress > 50) setCurrentStep(2);
        else if (newProgress > 25) setCurrentStep(1);
        else setCurrentStep(0);

        return Math.min(newProgress, 95);
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isProcessing]);

  if (!isProcessing) return null;

  const CurrentIcon = steps[currentStep]?.icon || Loader2;

  return (
    <Card className="p-8 bg-card shadow-card border-border">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full animate-pulse-glow">
              <CurrentIcon className="w-8 h-8 text-primary animate-spin" />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Enhancing Your Image
            </h3>
            <p className="text-muted-foreground">
              {steps[currentStep]?.name || "Processing..."}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div
                key={step.name}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary/10 text-primary scale-105' 
                    : isCompleted 
                    ? 'bg-accent/20 text-accent' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <StepIcon className={`w-5 h-5 ${isActive ? 'animate-spin' : ''}`} />
                <span className="text-xs text-center font-medium">
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Estimated time: 30-60 seconds
          </p>
          {onCancel && (
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel Processing
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};