
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
        // Slower progress animation: max 70% until complete, increase at 2% per second
        setProgressValue(Math.min(newTime * 2, 70)); 
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
