// Define the Note type
export interface Note {
    id: string;
    title: string;
    description: string;
    summerizedText: string;
    content: string;
    summary?: string;
    timestamp: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    status: NoteStatus;
    isUnsaved?: boolean;
    audioUrl?: string;
    audioBlob?: Blob;
    audioChunks?: string[];
}

export enum NoteStatus {
    progress = "progress",
    done = "done",
    active = "active"
}

const STORAGE_KEY = 'echonote-recordings';
const MAX_RECORDINGS = 5;

// Function to convert Blob to base64 for storage
export const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error('Failed to convert blob to base64'));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

// Function to convert base64 to Blob
const base64ToBlob = (base64: string): Promise<Blob> => {
    return fetch(base64).then(res => res.blob());
};

// Load notes from local storage
export const loadNotes = (): Note[] => {
    try {
        const notesString = localStorage.getItem(STORAGE_KEY);
        if (!notesString) return [];

        const storedNotes = JSON.parse(notesString);

        // Convert base64 audio data back to usable format
        const processedNotes = storedNotes.map((note: any) => {
            const processedNote: Note = {
                id: note.id,
                content: note.content || '',
                summary: note.summary || '',
                timestamp: note.timestamp || Date.now(),
                title: note.title || 'Untitled Note',
                description: note.description || '',
                createdAt: note.createdAt ? new Date(note.createdAt) : new Date(),
                updatedAt: note.updatedAt ? new Date(note.updatedAt) : new Date(),
                userId: note.userId || 'anonymous',
                status: note.status || 'active',
                isUnsaved: note.isUnsaved || false
            };

            // If we have audio data stored as base64
            if (note.audioData) {
                processedNote.audioUrl = note.audioData;
            }

            // If we have stored audio chunks
            if (note.audioChunks) {
                processedNote.audioChunks = note.audioChunks;
            }

            return processedNote;
        });

        return processedNotes;
    } catch (error) {
        console.error('Error loading notes from storage:', error);
        return [];
    }
};

// Save unsaved recording directly to main storage
export const saveUnsavedRecording = async (id: string, audioChunks: string[]): Promise<void> => {
    try {
        const notes = loadNotes();

        // Check if this recording already exists
        const existingIndex = notes.findIndex(note => note.id === id);

        const currentDate = new Date();
        const unsavedRecording = {
            id,
            audioChunks,
            content: '',
            description: 'Unsaved voice recording',
            timestamp: Date.now(),
            title: 'Unsaved Recording',
            createdAt: currentDate,
            updatedAt: currentDate,
            userId: 'anonymous',
            status: 'active' as const,
            isUnsaved: true
        };

        let updatedNotes;

        if (existingIndex >= 0) {
            // Update existing recording
            updatedNotes = [...notes];
            updatedNotes[existingIndex] = unsavedRecording;
        } else {
            // Add as a new recording
            updatedNotes = [unsavedRecording, ...notes];

            // Keep only the most recent MAX_RECORDINGS
            updatedNotes = updatedNotes.slice(0, MAX_RECORDINGS);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
        console.log('Saved unsaved recording to main storage');
    } catch (error) {
        console.error('Error saving unsaved recording:', error);
    }
};

// Save a note to local storage
export const saveNote = async (note: Note): Promise<Note[]> => {
    try {
        // First load existing notes
        const notes = loadNotes();
        const currentDate = new Date();

        // Prepare the note for storage
        const noteToStore: any = {
            id: note.id,
            content: note.content,
            summary: note.summary || '',
            description: note.description || note.content.substring(0, 100),
            timestamp: note.timestamp,
            title: note.title,
            createdAt: note.createdAt || currentDate,
            updatedAt: currentDate,
            userId: note.userId || 'anonymous',
            status: note.status || 'active',
            isUnsaved: false // Mark as properly saved
        };

        // Store audio chunks if available
        if (note.audioChunks) {
            noteToStore.audioChunks = note.audioChunks;
        }

        // Convert blob to base64 for storage if available
        if (note.audioBlob) {
            noteToStore.audioData = await blobToBase64(note.audioBlob);
        } else if (note.audioUrl && note.audioUrl.startsWith('data:')) {
            // If we already have base64 data in audioUrl
            noteToStore.audioData = note.audioUrl;
        }

        // Add the new note at the beginning
        const updatedNotes = [noteToStore, ...notes.filter(n => n.id !== note.id)];

        // Keep only the most recent MAX_RECORDINGS
        const limitedNotes = updatedNotes.slice(0, MAX_RECORDINGS);

        // Save to local storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedNotes));

        return loadNotes();
    } catch (error) {
        console.error('Error saving note to storage:', error);
        return loadNotes();
    }
};

// Delete a note from local storage
export const deleteNote = (noteId: string): Note[] => {
    try {
        // First load existing notes
        const notes = loadNotes();

        // Filter out the note with the given ID
        const filteredNotes = notes.filter(note => note.id !== noteId);

        // Save the filtered notes to local storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes));

        // Return the updated list of notes
        return loadNotes();
    } catch (error) {
        console.error('Error deleting note from storage:', error);
        return loadNotes();
    }
};

// Update an existing note
export const updateNote = async (updatedNote: Note): Promise<Note[]> => {
    try {
        // First load existing notes
        const notes = loadNotes();

        // Prepare the updated note for storage
        const noteToStore: any = {
            id: updatedNote.id,
            content: updatedNote.content,
            summary: updatedNote.summary || '',
            description: updatedNote.description || updatedNote.content.substring(0, 100),
            timestamp: updatedNote.timestamp,
            title: updatedNote.title,
            createdAt: updatedNote.createdAt || new Date(),
            updatedAt: new Date(),
            userId: updatedNote.userId || 'anonymous',
            status: updatedNote.status || 'active',
            isUnsaved: updatedNote.isUnsaved || false
        };

        // Store audio chunks if available
        if (updatedNote.audioChunks) {
            noteToStore.audioChunks = updatedNote.audioChunks;
        }

        // Convert blob to base64 for storage if available
        if (updatedNote.audioBlob) {
            noteToStore.audioData = await blobToBase64(updatedNote.audioBlob);
        } else if (updatedNote.audioUrl && updatedNote.audioUrl.startsWith('data:')) {
            // If we already have base64 data in audioUrl
            noteToStore.audioData = updatedNote.audioUrl;
        }

        // Map through notes, replacing the one that matches the ID
        const updatedNotes = notes.map((note) => {
            if (note.id === updatedNote.id) {
                return noteToStore;
            }
            return note;
        });

        // Save to local storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));

        return loadNotes();
    } catch (error) {
        console.error('Error updating note in storage:', error);
        return loadNotes();
    }
};
