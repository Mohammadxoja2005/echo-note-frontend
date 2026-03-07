
import { Card } from '@/components/ui/card';
import { RecorderProvider } from '@/contexts/RecorderContext';
import WaveformVisualizer from '@/components/recorder/WaveformVisualizer';
import VoiceActivityIndicator from '@/components/recorder/VoiceActivityIndicator';
import AudioPlayer from '@/components/recorder/AudioPlayer';
import TranscriptionDisplay from '@/components/recorder/TranscriptionDisplay';
import RecorderControls from '@/components/recorder/RecorderControls';
import RemainingTime from '@/components/recorder/RemainingTime';
import { Note } from '@/utils/storage';

interface VoiceRecorderProps {
  onNewRecording: () => void;
  resumeRecording?: Note | null;
}

const VoiceRecorder = ({ onNewRecording, resumeRecording }: VoiceRecorderProps) => {
  const isUnsavedRecording = resumeRecording &&
    (resumeRecording.isUnsaved || resumeRecording.title === 'Unsaved Recording');

  return (
    <RecorderProvider onNewRecording={onNewRecording} initialRecording={resumeRecording}>
      <Card className="p-6 shadow-sm border border-gray-200 notion-card">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">Voice Recorder</h2>
            <div className="flex flex-col items-end gap-2">
              {resumeRecording && (
                <div className="text-sm text-gray-500">
                  {isUnsavedRecording 
                    ? 'Resuming unsaved recording' 
                    : `Resuming: ${resumeRecording.title}`}
                </div>
              )}
              <RemainingTime />
            </div>
          </div>
          
          <WaveformVisualizer />
          <VoiceActivityIndicator />
          <AudioPlayer />
          <TranscriptionDisplay />
          <RecorderControls />
        </div>
      </Card>
    </RecorderProvider>
  );
};

export default VoiceRecorder;
