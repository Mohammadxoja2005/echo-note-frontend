
import { useLocation } from 'react-router-dom';
import VoiceRecorder from '@/components/VoiceRecorder';
import { useState } from 'react';
import { Note } from '@/utils/storage';

const RecorderPage = () => {
  const location = useLocation();
  const [resumeRecording, setResumeRecording] = useState<Note | null>(
    location.state && location.state.resumeRecording 
      ? location.state.resumeRecording 
      : null
  );
  
  const handleNewRecording = () => {
    setResumeRecording(null);
  };

  return (
    <div className="flex-grow flex items-start justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <VoiceRecorder 
          onNewRecording={handleNewRecording}
          resumeRecording={resumeRecording} 
        />
      </div>
    </div>
  );
};

export default RecorderPage;
