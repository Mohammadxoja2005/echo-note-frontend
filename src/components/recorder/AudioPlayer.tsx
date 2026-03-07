import { useRef, useState, useEffect } from 'react';
import { useRecorder } from '@/contexts/RecorderContext';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const AudioPlayer = () => {
  const { audioUrl, isRecording } = useRecorder();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!audioUrl || isRecording) return null;

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

  return (
      <div className="py-3">
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="flex items-center gap-3">
            <button
                onClick={handlePlayPause}
                className="bg-echonote-purple hover:bg-echonote-purple/90 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

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

        <audio
            key={audioUrl}
            ref={audioRef}
            src={audioUrl}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            hidden
        />
      </div>
  );
};

export default AudioPlayer;