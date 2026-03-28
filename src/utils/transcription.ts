import axios from "axios";
import {useToast} from "@/hooks/use-toast.ts";

const FAKE_TRANSCRIPTIONS = [
    "Remember to schedule a meeting with the marketing team next week.",
    "Follow up on the client proposal by Friday.",
    "Research new project management tools for the team.",
    "Add new feature requirements to the product roadmap.",
    "Call back John regarding the partnership opportunity.",
    "Review the quarterly report before the presentation.",
    "Send feedback on the new design mockups.",
    "Update the project timeline and share with stakeholders."
];

export const uploadAudioToStorage = async (audioBlob: Blob): Promise<string> => {
    const { data } = await axios.post(
        "https://echonote.justbackend.xyz/text-to-speech/presigned-url",
        {},
        { headers: { Token: localStorage.getItem("token") } }
    );

    const { url, key } = data as { url: string; key: string };

    await axios.put(url, audioBlob, {
        headers: { "Content-Type": "audio/webm" },
    });

    return key;
};

export const transcribeAudio = async (key: string): Promise<string> => {
    try {
        await axios.post(
            "https://echonote.justbackend.xyz/text-to-speech/audio",
            { key },
            { headers: { Token: localStorage.getItem("token") } },
        ).catch((error) => {
            console.log("error", error);
        });

        const randomIndex = Math.floor(Math.random() * FAKE_TRANSCRIPTIONS.length);
        return FAKE_TRANSCRIPTIONS[randomIndex];
    } catch (error) {
        console.error("Error transcribing audio:", error);

        const randomIndex = Math.floor(Math.random() * FAKE_TRANSCRIPTIONS.length);
        return FAKE_TRANSCRIPTIONS[randomIndex];
    }
};

// Generate a title from the transcription content
export const generateTitleFromContent = (content: string): string => {
    // Simple implementation: Take first few words or characters
    const words = content.split(' ');
    if (words.length <= 3) {
        return content;
    }

    return words.slice(0, 3).join(' ') + '...';
};

export const generateSummary = (content: string): string => {
    if (!content) return '';
    
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    if (sentences.length === 0) {
        return content.length > 100 ? content.substring(0, 100) + '...' : content;
    }
    
    const firstSentence = sentences[0].trim();
    if (firstSentence.length > 100) {
        return firstSentence.substring(0, 100) + '...';
    }
    
    let summary = firstSentence;
    for (let i = 1; i < sentences.length && summary.length < 80; i++) {
        const nextSentence = sentences[i].trim();
        if (summary.length + nextSentence.length + 2 <= 100) {
            summary += '. ' + nextSentence;
        } else {
            break;
        }
    }
    
    return summary + (summary.endsWith('.') ? '' : '.');
};
