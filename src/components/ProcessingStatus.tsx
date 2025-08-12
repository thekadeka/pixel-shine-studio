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
    <Card className="p-2 sm:p-4 md:p-8 bg-card shadow-card border-border overflow-x-hidden max-w-full">
      <div className="space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden max-w-full">
        <div className="text-center space-y-2 sm:space-y-3 md:space-y-4 overflow-x-hidden max-w-full">
          <div className="flex justify-center">
            <div className="p-2 sm:p-3 md:p-4 bg-primary/10 rounded-full animate-pulse-glow">
              <CurrentIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary animate-spin" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm sm:text-base md:text-xl font-semibold text-foreground mb-1 sm:mb-2 break-words overflow-wrap-anywhere max-w-full">
              Enhancing Your Image
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground break-words overflow-wrap-anywhere max-w-full">
              {steps[currentStep]?.name || "Processing..."}
            </p>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3 overflow-x-hidden max-w-full">
          <div className="flex justify-between text-xs sm:text-sm overflow-x-hidden max-w-full">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 overflow-x-hidden max-w-full">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div
                key={step.name}
                className={`flex flex-col items-center gap-1 sm:gap-2 p-1 sm:p-2 md:p-3 rounded-md sm:rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary/10 text-primary scale-105' 
                    : isCompleted 
                    ? 'bg-accent/20 text-accent' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <StepIcon className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${isActive ? 'animate-spin' : ''}`} />
                <span className="text-xs text-center font-medium break-words overflow-wrap-anywhere max-w-full leading-tight">
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="text-center overflow-x-hidden max-w-full">
          <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 md:mb-4 break-words overflow-wrap-anywhere max-w-full">
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