import { useEffect, useRef } from 'react';
import { AudioWaveform } from 'lucide-react';
import { useRecorder } from '@/contexts/RecorderContext';
import p5 from 'p5';

const WaveformVisualizer = () => {
  const {
    isRecording,
    audioUrl,
    isVoiceActive,
    setIsVoiceActive,
    analyserNode,
    audioData
  } = useRecorder();
  
  const waveformContainerRef = useRef<HTMLDivElement | null>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const voiceActivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dataPointsRef = useRef<number[]>([]);

  useEffect(() => {
    if (!waveformContainerRef.current) return;
    
    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
      p5InstanceRef.current = null;
    }
    
    dataPointsRef.current = Array(100).fill(0);
    
    const sketch = (p: p5) => {
      p.setup = () => {
        const container = waveformContainerRef.current;
        if (!container) return;
        
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        p.createCanvas(width, height);
        p.noFill();
        p.smooth();
      };
      
      p.draw = () => {
        p.background('#f0f4ff'); // Light blue background
        
        if (isRecording && audioData.current && audioData.current.length > 0) {
          updateWaveformData(audioData.current);
          drawStationaryWaveform(p);
          checkVoiceActivity(audioData.current);
        } else if (audioUrl) {
          // Draw static waveform for playback
          drawStaticWaveform(p);
        } else {
          // Draw placeholder waveform
          drawPlaceholderWaveform(p);
        }
      };
      
      p.windowResized = () => {
        if (!waveformContainerRef.current) return;
        p.resizeCanvas(waveformContainerRef.current.clientWidth, waveformContainerRef.current.clientHeight);
      };
    };
    
    // Create new p5 instance
    p5InstanceRef.current = new p5(sketch, waveformContainerRef.current);
    
    // Cleanup function
    return () => {
      if (voiceActivityTimeoutRef.current) {
        clearTimeout(voiceActivityTimeoutRef.current);
      }
      
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [isRecording, audioUrl, audioData]);

  // Update waveform data points with new audio data
  const updateWaveformData = (data: Float32Array) => {
    // Sample the audio data to get representative points
    const sampleSize = Math.floor(data.length / 10); // More samples for responsiveness
    let newDataPoint = 0;
    
    for (let i = 0; i < sampleSize; i++) {
      const index = Math.floor(Math.random() * data.length);
      newDataPoint += Math.abs(data[index]);
    }
    
    newDataPoint = (newDataPoint / sampleSize) * 8; // Amplify more for stronger vibration

    for (let i = 0; i < dataPointsRef.current.length; i++) {
      // Blend current point with new intensity for smooth transition
      dataPointsRef.current[i] = dataPointsRef.current[i] * 0.7 + newDataPoint * 0.3;
    }
  };

  const drawStationaryWaveform = (p: p5) => {
    p.stroke('#8B5CF6'); // Vivid purple
    p.strokeWeight(3.5); // Thicker line for better visibility
    
    const points = dataPointsRef.current;
    const width = p.width;
    const height = p.height;
    
    p.beginShape();
    for (let x = 0; x < width; x++) {
      const i = Math.floor((x / width) * points.length); // Map x position to datapoints index
      const baseY = height / 2;
      
      // Calculate position based on fixed sine wave pattern
      const fixedWave = Math.sin((x / width) * Math.PI * 4); // 2 complete sine waves
      
      // Amplify the effect when voice is active
      const amplifier = isVoiceActive ? 2.5 : 0.8;
      const intensity = points[i] * amplifier;
      
      // Add time-based vibration that increases with voice intensity
      const vibration = Math.sin(p.frameCount * 0.2 + x * 0.02) * intensity * 0.3;
      
      // Combine fixed wave with intensity and vibration
      const y = baseY + (fixedWave * 15) + (fixedWave * intensity * height / 8) + vibration;
      
      p.vertex(x, y);
    }
    p.endShape();
    
    // Add secondary vibrating wave when voice is active
    if (isVoiceActive) {
      p.stroke('rgba(139, 92, 246, 0.4)');  // Transparent purple
      p.strokeWeight(2.5);
      
      p.beginShape();
      for (let x = 0; x < width; x++) {
        const i = Math.floor((x / width) * points.length);
        const baseY = height / 2;
        
        // Slightly offset secondary wave for visual effect
        const fixedWave = Math.sin((x / width) * Math.PI * 4 + 0.5);
        const intensity = points[i] * 2.8; // Stronger effect
        
        // Add more vibration to secondary wave
        const vibration = Math.sin(p.frameCount * 0.25 + x * 0.03) * intensity * 0.5;
        
        // Create more dramatic secondary wave
        const y = baseY + (fixedWave * 20) + (fixedWave * intensity * height / 7) + vibration;
        
        p.vertex(x, y);
      }
      p.endShape();
    }
  };

  // Draw static waveform for audio playback
  const drawStaticWaveform = (p: p5) => {
    p.stroke('#9b87f5');
    p.strokeWeight(2.5);
    
    const width = p.width;
    const height = p.height;
    const points = 50;
    const step = width / points;
    
    p.beginShape();
    
    // Use vertex points for rendering (instead of curveVertex)
    for (let i = 0; i <= points; i++) {
      const x = i * step;
      // Create a sine wave pattern with some noise
      const amplitude = p.noise(i * 0.1, p.frameCount * 0.01) * 40;
      const y = height / 2 + amplitude * Math.sin(i * 0.3);
      p.vertex(x, y);
    }
    
    p.endShape();
  };

  // Draw placeholder flat waveform
  const drawPlaceholderWaveform = (p: p5) => {
    p.stroke('#d1d5db');
    p.strokeWeight(1.5);
    
    const width = p.width;
    const height = p.height;
    const amplitude = 5;
    const frequency = 0.05;
    
    p.beginShape();
    for (let x = 0; x < width; x += 5) {
      const y = height / 2 + Math.sin(x * frequency) * amplitude;
      p.vertex(x, y);
    }
    p.endShape();
  };
  
  // Check for voice activity
  const checkVoiceActivity = (data: Float32Array) => {
    // Calculate RMS (Root Mean Square) to detect audio activity
    let rms = 0;
    for (let i = 0; i < data.length; i++) {
      rms += data[i] * data[i];
    }
    rms = Math.sqrt(rms / data.length);
    
    const threshold = 0.006; // Lower threshold for better sensitivity
    
    if (rms > threshold) {
      if (!isVoiceActive) {
        setIsVoiceActive(true);
      }
      
      // Reset timeout if voice is still active
      if (voiceActivityTimeoutRef.current) {
        clearTimeout(voiceActivityTimeoutRef.current);
      }
      
      // Set timeout to mark voice as inactive after a short delay
      voiceActivityTimeoutRef.current = setTimeout(() => {
        setIsVoiceActive(false);
      }, 300);
    }
  };

  return (
    <div className="py-3">
      {isRecording && (
        <div className="flex items-center gap-2 mb-2">
          <span className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-red-500 font-medium">Recording</span>
        </div>
      )}
      
      {/* p5.js waveform container */}
      <div 
        ref={waveformContainerRef} 
        className={`bg-blue-50 rounded-lg p-4 h-24 flex items-center justify-center relative ${isVoiceActive && isRecording ? 'border-2 border-purple-500' : 'border border-blue-200'}`}
      >
        {!isRecording && !audioUrl && (
          <div className="flex flex-col items-center text-gray-400 absolute">
            <AudioWaveform size={32} />
            <span className="text-sm mt-1">Ready to record</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaveformVisualizer;
