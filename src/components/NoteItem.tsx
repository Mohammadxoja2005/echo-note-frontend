
import {useState, useEffect} from 'react';
import {format} from 'date-fns';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Trash, Play, Square} from 'lucide-react';
import {Note, deleteNote, updateNote, NoteStatus} from '@/utils/storage';
import {Textarea} from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface NoteItemProps {
    note: Note;
    onDelete: (id: string) => void;
    onUpdate: (note: Note) => void;
    onClick?: (note: Note) => void;
}

const NoteItem = ({note, onDelete, onUpdate, onClick}: NoteItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(note.description);
    const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

    const formattedDate = format(note.createdAt, 'MMM d, yyyy h:mm a');
    const isInProgress = note.status === NoteStatus.progress;

    // Truncate content to first 200 words for display
    const truncateToWords = (text: string, wordCount: number) => {
        const words = text.split(/\s+/);
        if (words.length <= wordCount) return text;
        return words.slice(0, wordCount).join(' ') + '...';
    };

    const displayContent = truncateToWords(note.description, 15);

    const handleDelete = async () => {
        if (audioElement) {
            audioElement.pause();
            setAudioElement(null);
        }

        try {
            await deleteNote(note.id);
            onDelete(note.id);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        const updatedNote = {
            ...note,
            description: content
        };

        try {
            await updateNote(updatedNote);
            onUpdate(updatedNote);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const handleCancel = () => {
        setContent(note.description);
        setIsEditing(false);
    };

    const handleCardClick = () => {
        if (isInProgress) {
            toast({
                title: "Note in progress",
                description: "This note is still in progress and cannot be accessed.",
                variant: "destructive"
            });
            return;
        }
        
        if (onClick) {
            onClick(note);
        }
    };

    return (
        <Card 
            className={`notion-card h-64 w-80 flex flex-col ${isInProgress ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={handleCardClick}
        >
            <CardHeader className="pb-2 flex-shrink-0">
                <div className="flex justify-between">
                    <h3 className="font-medium truncate">{note.title}</h3>
                    <Badge variant={isInProgress ? "outline" : "default"}>
                        {isInProgress ? "In Progress" : "Done"}
                    </Badge>
                </div>
                <p className="text-xs text-gray-500">{formattedDate}</p>
            </CardHeader>

            <CardContent className="flex-grow overflow-hidden">
                {isEditing ? (
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="h-full resize-none"
                        onClick={(e) => e.stopPropagation()}
                    />
                ) : (
                    <div className="text-sm whitespace-pre-wrap overflow-hidden text-ellipsis h-full">
                        {displayContent}
                    </div>
                )}
            </CardContent>

            {isEditing && (
                <CardFooter className="flex justify-end gap-2 pt-0 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}
                            className="bg-echonote-purple text-white hover:bg-echonote-purple/90">
                        Save
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};

export default NoteItem;
