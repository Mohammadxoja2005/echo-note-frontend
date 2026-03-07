
import { useRecorder } from '@/contexts/RecorderContext';
import { AudioWaveform } from 'lucide-react';

const VoiceActivityIndicator = () => {
  const { isRecording, isVoiceActive } = useRecorder();
  
  if (!isRecording) return null;
  
  return (
    <div className="flex justify-center mt-2">
      {isVoiceActive ? (
        <span className="text-green-600 flex items-center gap-1">
          <AudioWaveform size={16} className="animate-pulse" />
          Speech detected
        </span>
      ) : (
        <span className="text-gray-400 flex items-center gap-1">
          <AudioWaveform size={16} />
          Waiting for voice...
        </span>
      )}
    </div>
  );
};

export default VoiceActivityIndicator;
