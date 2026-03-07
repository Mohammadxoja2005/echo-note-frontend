
import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Note } from '@/utils/storage';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface RecordingPlayerProps {
  recording: Note;
}

const RecordingPlayer = ({ recording }: RecordingPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();
  
  const isUnsaved = recording.isUnsaved;
  
  // Set up audio URL from blob if needed
  useEffect(() => {
    // If we have a direct audioUrl, use that
    if (recording.audioUrl) {
      setAudioUrl(recording.audioUrl);
      
      return () => {
        // No cleanup needed for external URLs
      };
    } 
    // Otherwise, create URL from blob
    else if (recording.audioBlob) {
      const url = URL.createObjectURL(recording.audioBlob);
      setAudioUrl(url);
      
      // Clean up the object URL when component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    } else if (recording.audioChunks && recording.audioChunks.length > 0) {
      // First convert the first chunk to get the audio type
      fetch(recording.audioChunks[0])
        .then(res => res.blob())
        .then(firstBlob => {
          // Use the same type for all chunks
          const type = firstBlob.type || 'audio/webm';
          
          // Convert all audio chunks to blobs
          return Promise.all(recording.audioChunks.map(chunk => fetch(chunk).then(res => res.blob())))
            .then(blobs => {
              const combinedBlob = new Blob(blobs, { type });
              const url = URL.createObjectURL(combinedBlob);
              setAudioUrl(url);
            });
        })
        .catch(err => {
          console.error('Error creating audio URL from chunks:', err);
        });
      
      return () => {
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
      };
    }
  }, [recording]);
  
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleVolumeChange = (values: number[]) => {
    const newVolume = values[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleResume = () => {
    // Navigate to recorder and pass the recording data
    navigate('/dashboard/recorder', { 
      state: { resumeRecording: recording }
    });
  };
  
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">
          {recording.title}
          {isUnsaved && (
            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 rounded-full px-2 py-1">
              Unsaved
            </span>
          )}
        </h3>
      </div>
      
      {audioUrl && (
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="flex items-center gap-3">
            <Button 
              onClick={handlePlayPause}
              variant="outline"
              size="icon"
              className="w-9 h-9 rounded-full"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            
            <div className="flex items-center gap-2 w-32 ml-auto">
              <Volume2 size={16} className="text-gray-600" />
              <Slider
                value={[volume]}
                onValueChange={handleVolumeChange}
                max={1}
                step={0.01}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
      
      {/*<div className="flex justify-end mt-4">*/}
      {/*  <Button */}
      {/*    onClick={handleResume}*/}
      {/*    className="bg-echonote-purple hover:bg-echonote-purple/90 text-white"*/}
      {/*  >*/}
      {/*    /!*{isUnsaved ? "Continue Recording" : "Resume Recording"}*!/*/}
      {/*  </Button>*/}
      {/*</div>*/}
      
      {audioUrl && (
        <audio 
          ref={audioRef}
          src={audioUrl} 
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          hidden
        />
      )}
    </Card>
  );
};

export default RecordingPlayer;
