import React, {createContext, useContext, useState, useRef, useCallback, useEffect} from 'react';
import {useToast} from '@/hooks/use-toast';
import {transcribeAudio, generateTitleFromContent, generateSummary} from '@/utils/transcription';
import {saveNote, Note, saveUnsavedRecording, loadNotes, blobToBase64, NoteStatus} from '@/utils/storage';

type RecorderContextType = {
    isRecording: boolean;
    isPaused: boolean;
    setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
    audioBlob: Blob | null;
    setAudioBlob: React.Dispatch<React.SetStateAction<Blob | null>>;
    audioUrl: string | null;
    setAudioUrl: React.Dispatch<React.SetStateAction<string | null>>;
    transcription: string;
    setTranscription: React.Dispatch<React.SetStateAction<string>>;
    isTranscribing: boolean;
    setIsTranscribing: React.Dispatch<React.SetStateAction<boolean>>;
    isVoiceActive: boolean;
    setIsVoiceActive: React.Dispatch<React.SetStateAction<boolean>>;
    audioContext: React.MutableRefObject<AudioContext | null>;
    analyserNode: React.MutableRefObject<AnalyserNode | null>;
    audioData: React.MutableRefObject<Float32Array | null>;
    startRecording: () => Promise<void>;
    startSystemRecording: () => Promise<void>;
    pauseRecording: () => void;
    continueRecording: () => void;
    stopRecording: () => void;
    discardRecording: () => void;
    saveRecording: () => void;
    onNewRecording: () => void;
};

const RecorderContext = createContext<RecorderContextType | undefined>(undefined);

export const useRecorder = (): RecorderContextType => {
    const context = useContext(RecorderContext);
    if (context === undefined) {
        throw new Error('useRecorder must be used within a RecorderProvider');
    }
    return context;
};

export const RecorderProvider: React.FC<{
    children: React.ReactNode;
    onNewRecording: () => void;
    initialRecording?: Note | null;
}> = ({children, onNewRecording, initialRecording}) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [transcription, setTranscription] = useState<string>('');
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [isVoiceActive, setIsVoiceActive] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const base64ChunksRef = useRef<string[]>([]);
    const streamRef = useRef<MediaStream | null>(null);
    const displayStreamRef = useRef<MediaStream | null>(null);
    const audioContext = useRef<AudioContext | null>(null);
    const analyserNode = useRef<AnalyserNode | null>(null);
    const sourceNode = useRef<MediaStreamAudioSourceNode | null>(null);
    const audioData = useRef<Float32Array | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const notificationSoundRef = useRef<HTMLAudioElement | null>(null);
    const dataUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const chunkSaveIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const noteIdRef = useRef<string>(Date.now().toString());

    const {toast} = useToast();

    // Function to convert base64 to Blob
    const base64ToBlob = (base64: string): Promise<Blob> => {
        return fetch(base64).then(res => res.blob());
    };

    // Load existing chunks from initialRecording
    useEffect(() => {
        if (initialRecording) {
            // Set the transcription from the initial recording
            setTranscription(initialRecording.content);
            noteIdRef.current = initialRecording.id;

            // Clear existing audio chunks before loading
            audioChunksRef.current = [];
            base64ChunksRef.current = [];

            // If we have audioChunks, we want to convert them back to Blobs
            if (initialRecording.audioChunks && initialRecording.audioChunks.length > 0) {
                // Save the base64 chunks for later use
                base64ChunksRef.current = initialRecording.audioChunks;

                // Convert base64 chunks back to blobs
                Promise.all(
                    initialRecording.audioChunks.map(chunkBase64 => base64ToBlob(chunkBase64))
                )
                    .then(blobChunks => {
                        // Store the chunks for continuing the recording
                        audioChunksRef.current = blobChunks;

                        // Also create a combined blob for preview
                        const combinedBlob = new Blob(blobChunks, {type: 'audio/webm'});
                        setAudioBlob(combinedBlob);

                        // Create a new URL to prevent duplicate audio playback
                        if (audioUrl) {
                            URL.revokeObjectURL(audioUrl);
                        }
                        const url = URL.createObjectURL(combinedBlob);
                        setAudioUrl(url);

                        toast({
                            title: "Recording loaded",
                            description: `Loaded: ${initialRecording.title}`
                        });
                    })
                    .catch(err => {
                        console.error("Error converting audio chunks:", err);
                        toast({
                            title: "Error",
                            description: "Failed to load the recording chunks",
                            variant: "destructive"
                        });
                    });
            }
            // If we have a direct audioBlob
            else if (initialRecording.audioBlob) {
                setAudioBlob(initialRecording.audioBlob);
                // Create URL for the blob
                if (audioUrl) {
                    URL.revokeObjectURL(audioUrl);
                }
                const url = URL.createObjectURL(initialRecording.audioBlob);
                setAudioUrl(url);
                toast({
                    title: "Recording loaded",
                    description: `Loaded: ${initialRecording.title}`
                });
            }
            // If we have an audioUrl (for backward compatibility)
            else if (initialRecording.audioUrl) {
                // Fetch the blob from the URL
                fetch(initialRecording.audioUrl)
                    .then(response => response.blob())
                    .then(blob => {
                        setAudioBlob(blob);
                        audioChunksRef.current = [blob]; // Store as a chunk for continuation

                        // Create new URL to prevent duplicate audio
                        if (audioUrl) {
                            URL.revokeObjectURL(audioUrl);
                        }
                        const url = URL.createObjectURL(blob);
                        setAudioUrl(url);

                        toast({
                            title: "Recording loaded",
                            description: `Loaded: ${initialRecording.title}`
                        });
                    })
                    .catch(err => {
                        console.error("Error fetching audio blob:", err);
                        toast({
                            title: "Error",
                            description: "Failed to load the recording",
                            variant: "destructive"
                        });
                    });
            }
        }
    }, [initialRecording, toast]);

    // Initialize audio notification
    useEffect(() => {
        const audioElement = new Audio('/assets/recording-beep.mp3');
        audioElement.volume = 0.3;
        notificationSoundRef.current = audioElement;

        return () => {
            notificationSoundRef.current = null;
        };
    }, []);

    // Function to automatically save chunks to storage
    const saveChunksToStorage = useCallback(async () => {
        // Only save if we have chunks
        if (audioChunksRef.current.length === 0) return;

        // Convert current blob chunks to base64
        const newChunksToConvert = audioChunksRef.current.slice(base64ChunksRef.current.length);
        if (newChunksToConvert.length === 0) return;

        try {
            // Convert new blobs to base64
            const newBase64Chunks = await Promise.all(
                newChunksToConvert.map(blob => blobToBase64(blob))
            );

            // console.log("base64ChunksRef.current beofre", base64ChunksRef.current);
            // Add to our base64 chunks reference
            base64ChunksRef.current = Array.from(new Set([
                ...base64ChunksRef.current,
                ...newBase64Chunks,
            ]));

            // Save to main storage
            await saveUnsavedRecording(noteIdRef.current, base64ChunksRef.current);

            console.log("Auto-saved recording chunks", base64ChunksRef.current.length);
        } catch (error) {
            console.error("Error saving chunks to storage:", error);
        }
    }, []);

    // Setup interval to automatically save chunks during recording
    useEffect(() => {
        if (isRecording && !isPaused) {
            // Create an interval to save chunks
            chunkSaveIntervalRef.current = setInterval(() => {
                saveChunksToStorage();
            }, 5000); // Save every 5 seconds during recording
        } else {
            // If we're paused or not recording, clear the interval
            if (chunkSaveIntervalRef.current) {
                clearInterval(chunkSaveIntervalRef.current);
                chunkSaveIntervalRef.current = null;
            }

            // But still save the current state
            if (!isRecording && audioChunksRef.current.length > 0) {
                saveChunksToStorage();
            }
        }

        return () => {
            if (chunkSaveIntervalRef.current) {
                clearInterval(chunkSaveIntervalRef.current);
                chunkSaveIntervalRef.current = null;
            }
        };
    }, [isRecording, isPaused, saveChunksToStorage]);

    // Update audio data for visualization
    const updateAudioData = useCallback(() => {
        if (!analyserNode.current) return;

        if (!audioData.current) {
            audioData.current = new Float32Array(analyserNode.current.fftSize);
        }

        analyserNode.current.getFloatTimeDomainData(audioData.current);

        // Check for voice activity immediately when data is updated
        const checkVoice = () => {
            if (!audioData.current) return false;

            let sum = 0;
            for (let i = 0; i < audioData.current.length; i++) {
                sum += audioData.current[i] * audioData.current[i];
            }

            const rms = Math.sqrt(sum / audioData.current.length);
            const threshold = 0.008; // Lower threshold for better sensitivity

            return rms > threshold;
        };

        const hasVoice = checkVoice();
        if (hasVoice && !isVoiceActive) {
            setIsVoiceActive(true);
        }

        animationFrameRef.current = requestAnimationFrame(updateAudioData);
    }, [isRecording, isVoiceActive]);

    // Play notification sound when voice is detected
    const playNotificationSound = useCallback(() => {
        if (notificationSoundRef.current && isVoiceActive) {
            notificationSoundRef.current.currentTime = 0;
            notificationSoundRef.current.play().catch(err => {
                console.error("Error playing notification sound:", err);
            });
        }
    }, [isVoiceActive]);

    // Effect to play notification when voice becomes active
    useEffect(() => {
        if (isVoiceActive) {
            playNotificationSound();
        }
    }, [isVoiceActive, playNotificationSound]);

    // Setup interval to automatically reset voice active state
    useEffect(() => {
        if (isRecording) {
            // Create an interval to reset isVoiceActive to false if no new voice is detected
            dataUpdateIntervalRef.current = setInterval(() => {
                if (isVoiceActive) {
                    setIsVoiceActive(false);
                }
            }, 300);
        }

        return () => {
            if (dataUpdateIntervalRef.current) {
                clearInterval(dataUpdateIntervalRef.current);
                dataUpdateIntervalRef.current = null;
            }
        };
    }, [isRecording, isVoiceActive]);

    // Start recording
    const startRecording = async () => {
        try {
            // Reset state
            setIsRecording(true);
            setIsPaused(false);

            // Always start with a fresh recording unless explicitly resuming
            // if (!initialRecording) {
            //     setAudioBlob(null);
            //     if (audioUrl) {
            //         URL.revokeObjectURL(audioUrl);
            //     }
            //     setAudioUrl(null);
            //     setTranscription('');
            //     audioChunksRef.current = [];
            //     base64ChunksRef.current = [];
            //     noteIdRef.current = Date.now().toString();
            // }

            setIsVoiceActive(false);

            // Get microphone stream
            const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            streamRef.current = stream;

            // Set up Web Audio API for visualization
            audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            analyserNode.current = audioContext.current.createAnalyser();
            analyserNode.current.fftSize = 2048;
            sourceNode.current = audioContext.current.createMediaStreamSource(stream);
            sourceNode.current.connect(analyserNode.current);

            // Start audio data collection for visualization
            updateAudioData();

            // Set up MediaRecorder for recording
            mediaRecorderRef.current = new MediaRecorder(stream, {mimeType: 'audio/webm;codecs=opus'});

            mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);

                    // Update the preview with the current chunks
                    const updatedBlob = new Blob(audioChunksRef.current, {type: 'audio/webm'});
                    setAudioBlob(updatedBlob);

                    // Update the audio URL
                    if (audioUrl) {
                        URL.revokeObjectURL(audioUrl);
                    }
                    const newUrl = URL.createObjectURL(updatedBlob);
                    setAudioUrl(newUrl);
                }
            });

            // Start recording
            mediaRecorderRef.current.start(1000); // Capture in 1-second chunks for better resuming

            toast({
                title: "Recording started",
                description: "Speak now to record your voice note"
            });

        } catch (error) {
            console.error('Error starting recording:', error);
            setIsRecording(false);

            toast({
                title: "Permission Denied",
                description: "Please allow microphone access to record audio",
                variant: "destructive"
            });
        }
    };

    // Start recording from system audio + microphone mixed together
    const startSystemRecording = async () => {
        try {
            setIsRecording(true);
            setIsPaused(false);
            setIsVoiceActive(false);

            // Get system audio via screen share
            const displayStream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
            displayStream.getVideoTracks().forEach(track => track.stop());

            if (displayStream.getAudioTracks().length === 0) {
                setIsRecording(false);
                toast({
                    title: "No system audio",
                    description: "No audio track found. Make sure to check 'Share audio' when prompted.",
                    variant: "destructive"
                });
                return;
            }

            // Get microphone audio
            const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Mix both streams via Web Audio API
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            audioContext.current = ctx;

            const destination = ctx.createMediaStreamDestination();

            // Microphone source — also used for visualization
            const micSource = ctx.createMediaStreamSource(micStream);
            micSource.connect(destination);

            // System audio source
            const systemSource = ctx.createMediaStreamSource(displayStream);
            systemSource.connect(destination);

            // Hook up analyser to mic for voice activity visualization
            analyserNode.current = ctx.createAnalyser();
            analyserNode.current.fftSize = 2048;
            micSource.connect(analyserNode.current);

            // Store both streams for cleanup
            streamRef.current = micStream;
            displayStreamRef.current = displayStream;

            // Stop recording if system share is stopped from Chrome's "Stop sharing" UI
            displayStream.getAudioTracks()[0].addEventListener('ended', () => {
                stopRecording();
            });

            updateAudioData();

            // Record from the merged destination stream
            mediaRecorderRef.current = new MediaRecorder(destination.stream, { mimeType: 'audio/webm;codecs=opus' });

            mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);

                    const updatedBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                    setAudioBlob(updatedBlob);

                    if (audioUrl) URL.revokeObjectURL(audioUrl);
                    const newUrl = URL.createObjectURL(updatedBlob);
                    setAudioUrl(newUrl);
                }
            });

            mediaRecorderRef.current.start(1000);

            toast({
                title: "Desktop recording started",
                description: "Recording your voice and system audio together"
            });

        } catch (error) {
            console.error('Error starting system recording:', error);
            setIsRecording(false);
            toast({
                title: "Permission Denied",
                description: "Please allow both screen sharing (with audio) and microphone access",
                variant: "destructive"
            });
        }
    };

    // Pause recording
    const pauseRecording = () => {
        const rec = mediaRecorderRef.current;
        if (rec && isRecording && !isPaused) {
            // Prefer pausing the existing MediaRecorder to keep a single instance
            if (rec.state === 'recording' && typeof (rec as any).pause === 'function') {
                rec.pause();
            } else {
                // Fallback: if pause is not supported, stop the recorder (will recreate on resume)
                try { rec.stop(); } catch {}
            }
            setIsPaused(true);

            // Pause visualization but don't disconnect audio nodes
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }

            // Save the current chunks when pausing
            saveChunksToStorage();

            toast({
                title: "Recording paused",
                description: "Click resume to continue recording"
            });
        }
    };

    // Continue recording
    const continueRecording = async () => {
        if (!isPaused) return;

        console.log("return");
        const rec = mediaRecorderRef.current;
        if (rec && typeof (rec as any).resume === 'function' && rec.state === 'paused') {
            rec.resume();

            // Resume visualization
            updateAudioData();

            setIsPaused(false);
            setIsRecording(true);

            toast({
                title: "Recording resumed",
                description: "Continue speaking to record your voice note"
            });
            return;
        }

        // Fallback: if we don't have a recorder but we still have a stream, recreate it
        if (!rec && streamRef.current) {
            const newRec = new MediaRecorder(streamRef.current, { mimeType: 'audio/webm;codecs=opus' });
            mediaRecorderRef.current = newRec;

            newRec.addEventListener('dataavailable', (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);

                    // Update the preview with the current chunks
                    const updatedBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                    setAudioBlob(updatedBlob);

                    // Update the audio URL
                    if (audioUrl) {
                        URL.revokeObjectURL(audioUrl);
                    }
                    const newUrl = URL.createObjectURL(updatedBlob);
                    setAudioUrl(newUrl);
                }
            });

            newRec.start(1000); // Capture in 1-second chunks

            // Resume visualization
            updateAudioData();

            setIsPaused(false);
            setIsRecording(true);

            toast({
                title: "Recording resumed",
                description: "Continue speaking to record your voice note"
            });
            return;
        }

        // If no active stream but we have chunks, start a new recording session
        if (audioChunksRef.current.length > 0) {
            await startRecording();
        }
    };

    // Stop recording
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            try {
                if (mediaRecorderRef.current.state !== 'inactive') {
                    mediaRecorderRef.current.stop();
                }
            } catch (err) {
                console.error("Error stopping MediaRecorder:", err);
            }

            // Stop the animation frame
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }

            // Clear the data update interval
            if (dataUpdateIntervalRef.current) {
                clearInterval(dataUpdateIntervalRef.current);
                dataUpdateIntervalRef.current = null;
            }

            // Stop mic stream
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }

            // Stop display stream
            if (displayStreamRef.current) {
                displayStreamRef.current.getTracks().forEach(track => track.stop());
                displayStreamRef.current = null;
            }

            // Disconnect audio nodes
            if (sourceNode.current) {
                sourceNode.current.disconnect();
                sourceNode.current = null;
            }

            // Close audio context
            if (audioContext.current && audioContext.current.state !== 'closed') {
                audioContext.current.close().catch(err => console.error("Error closing audio context:", err));
            }

            // Save the current chunks when stopping
            saveChunksToStorage();

            setIsPaused(false);
            setIsRecording(false);
        }
    };

    // Discard recording - reset everything to initial state
    const discardRecording = () => {
        // Clear all recording data
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
        }
        setAudioBlob(null);
        setAudioUrl(null);
        setTranscription('');
        setIsRecording(false);
        setIsPaused(false);
        audioChunksRef.current = [];
        base64ChunksRef.current = [];
        noteIdRef.current = Date.now().toString();

        toast({
            title: "New Recording Ready",
            description: "Previous recording discarded. Ready to start a new one."
        });

        onNewRecording();
    };

    // Save recording - modified to update existing note
    const saveRecording = async () => {
        if (audioBlob && audioChunksRef.current.length > 0) {
            console.log("audioBlob", audioBlob);
            // Transcribe the audio when saving
            setIsTranscribing(true);

            try {
                // Use existing base64 chunks if available, otherwise convert
                let base64Chunks: string[];
                if (base64ChunksRef.current.length === audioChunksRef.current.length) {
                    base64Chunks = base64ChunksRef.current;
                } else {
                    base64Chunks = await Promise.all(
                        audioChunksRef.current.map(blob => blobToBase64(blob))
                    );
                }

                let text = '';
                try {
                    // Try to transcribe the audio
                    text = await transcribeAudio(audioBlob);
                    // setTranscription(text);
                } catch (error) {
                    console.error('Transcription error:', error);
                    text = transcription || '';
                }

                // Check if we're updating an existing note or creating a new one
                const notes = loadNotes();
                const existingNote = notes.find(note => note.id === noteIdRef.current);
                const currentDate = new Date();

                // Create and save the note
                const note: Note = {
                    id: noteIdRef.current,
                    content: existingNote ? `${existingNote.content}\n\n${text}` : text, // Append new content if existing
                    summary: generateSummary(text), // Generate summary from transcription
                    description: text.substring(0, 100) || 'Voice recording',
                    audioBlob, // For immediate use
                    audioChunks: base64Chunks, // Use only the new chunks, not combining with existing
                    timestamp: Date.now(),
                    title: existingNote ? existingNote.title : generateTitleFromContent(text || 'Voice Recording'),
                    createdAt: existingNote ? existingNote.createdAt : currentDate,
                    updatedAt: currentDate,
                    userId: 'anonymous',
                    status: NoteStatus.active, // Use enum value instead of string literal
                    isUnsaved: false
                };

                await saveNote(note);
                onNewRecording();

                toast({
                    title: "Note saved",
                    description:
                        "Your voice is being transcribed into note. You can find your note in notes section"
                });

                // Reset recorder state but don't modify storage
                if (audioUrl) {
                    URL.revokeObjectURL(audioUrl);
                }
                setAudioBlob(null);
                setAudioUrl(null);
                setTranscription('');
                audioChunksRef.current = [];
                base64ChunksRef.current = [];
                noteIdRef.current = Date.now().toString();
            } catch (error) {
                console.error('Error saving recording:', error);
                toast({
                    title: "Error",
                    description: "Failed to save your recording",
                    variant: "destructive"
                });
            } finally {
                setIsTranscribing(false);
            }
        }
    };

    // Cleanup resources when component unmounts
    useEffect(() => {
        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }

            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            if (dataUpdateIntervalRef.current) {
                clearInterval(dataUpdateIntervalRef.current);
            }

            if (chunkSaveIntervalRef.current) {
                clearInterval(chunkSaveIntervalRef.current);
            }

            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }

            if (displayStreamRef.current) {
                displayStreamRef.current.getTracks().forEach(track => track.stop());
            }

            if (sourceNode.current) {
                sourceNode.current.disconnect();
            }

            if (audioContext.current && audioContext.current.state !== 'closed') {
                audioContext.current.close().catch(err => console.error("Error closing audio context:", err));
            }

            // Save any unsaved chunks before unmounting
            if (audioChunksRef.current.length > 0) {
                saveChunksToStorage();
            }
        };
    }, [saveChunksToStorage]);

    const value = {
        isRecording,
        isPaused,
        setIsRecording,
        setIsPaused,
        audioBlob,
        setAudioBlob,
        audioUrl,
        setAudioUrl,
        transcription,
        setTranscription,
        isTranscribing,
        setIsTranscribing,
        isVoiceActive,
        setIsVoiceActive,
        audioContext,
        analyserNode,
        audioData,
        startRecording,
        startSystemRecording,
        pauseRecording,
        continueRecording,
        stopRecording,
        discardRecording,
        saveRecording,
        onNewRecording
    };

    return (
        <RecorderContext.Provider value={value}>
            {children}
        </RecorderContext.Provider>
    );
};
