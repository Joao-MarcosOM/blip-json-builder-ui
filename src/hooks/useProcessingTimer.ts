
import { useState, useRef, useEffect } from 'react';

export const useProcessingTimer = () => {
  const [processingTime, setProcessingTime] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    // Reset processing time and progress
    setProcessingTime(0);
    setProgressValue(0);
    
    // Clear any existing timers
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Start a new timer
    timerRef.current = setInterval(() => {
      setProcessingTime(prev => {
        const newTime = prev + 1;
        
        // Very slow progress animation: max 90% until complete, with slowing rate
        // This allows for up to 4 minutes of processing time
        let newProgress = 0;
        
        if (newTime < 60) {
          // First minute: go to 30%
          newProgress = Math.min(30 * (newTime / 60), 30);
        } else if (newTime < 120) {
          // Second minute: go from 30% to 50%
          newProgress = 30 + Math.min(20 * ((newTime - 60) / 60), 20);
        } else if (newTime < 180) {
          // Third minute: go from 50% to 70%
          newProgress = 50 + Math.min(20 * ((newTime - 120) / 60), 20);
        } else {
          // Fourth minute and beyond: go from 70% to 90% max
          newProgress = 70 + Math.min(20 * ((newTime - 180) / 60), 20);
        }
        
        setProgressValue(newProgress);
        return newTime;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setProgressValue(100); // Complete the progress bar
  };

  return {
    processingTime,
    progressValue,
    startTimer,
    stopTimer
  };
};
