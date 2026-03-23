
import {Button} from '@/components/ui/button';
import {Mic, Monitor, Save, Trash, Pause, Play, Square, Loader} from 'lucide-react';
import {useRecorder} from '@/contexts/RecorderContext';

const RecorderControls = () => {
    const {
        isRecording,
        isPaused,
        audioBlob,
        isTranscribing,
        startRecording,
        startSystemRecording,
        pauseRecording,
        continueRecording,
        stopRecording,
        discardRecording,
        saveRecording
    } = useRecorder();

    return (
        <div className="flex justify-center space-x-3 pt-2">
            {!isRecording && !isPaused && !audioBlob && (
                <>
                    <Button
                        onClick={startRecording}
                        disabled={isTranscribing}
                        className="bg-echonote-purple text-white hover:bg-echonote-purple/90 flex gap-2"
                    >
                        <Mic size={18}/>
                        Record Voice
                    </Button>
                    <Button
                        onClick={startSystemRecording}
                        disabled={isTranscribing}
                        variant="outline"
                        className="flex gap-2"
                    >
                        <Monitor size={18}/>
                        Record Desktop
                    </Button>
                </>
            )}

            {/*{!isRecording && !isPaused && audioBlob && (*/}
            {/*    <Button*/}
            {/*        onClick={continueRecording}*/}
            {/*        disabled={isTranscribing}*/}
            {/*        className="bg-echonote-purple text-white hover:bg-echonote-purple/90 flex gap-2"*/}
            {/*    >*/}
            {/*        <Play size={18}/>*/}
            {/*        Continue Recording*/}
            {/*    </Button>*/}
            {/*)}*/}

            {isRecording && !isPaused && (
                <>
                    <Button
                        onClick={pauseRecording}
                        variant="outline"
                        className="flex gap-2"
                    >
                        <Pause size={18}/>
                        Pause
                    </Button>

                    <Button
                        onClick={stopRecording}
                        variant="destructive"
                        className="flex gap-2"
                    >
                        <Square size={18}/>
                        Stop
                    </Button>
                </>
            )}

            {isPaused && (
                <>
                    <Button
                        onClick={continueRecording}
                        className="bg-echonote-purple text-white hover:bg-echonote-purple/90 flex gap-2"
                    >
                        <Play size={18}/>
                        Resume
                    </Button>

                    <Button
                        onClick={stopRecording}
                        variant="destructive"
                        className="flex gap-2"
                    >
                        <Square size={18}/>
                        Stop
                    </Button>
                </>
            )}

            {(audioBlob && !isRecording && !isPaused) && (
                <>
                    <Button
                        onClick={discardRecording}
                        variant="outline"
                        className="flex gap-2"
                    >
                        <Trash size={18}/>
                        New Recording
                    </Button>

                    <Button
                        onClick={saveRecording}
                        disabled={isTranscribing}
                        className="bg-echonote-purple text-white hover:bg-echonote-purple/90 flex gap-2"
                    >
                        {isTranscribing ? <Loader size={18} className="animate-spin" /> : <Save size={18}/>}
                        {isTranscribing ? 'Uploading file...' : 'Create Note'}
                    </Button>
                </>
            )}
        </div>
    );
};

export default RecorderControls;
