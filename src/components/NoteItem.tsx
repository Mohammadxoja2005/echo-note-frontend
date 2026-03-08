
import {useState} from 'react';
import {format} from 'date-fns';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Trash} from 'lucide-react';
import {Note, updateNote, NoteStatus} from '@/utils/storage';
import {Textarea} from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import axios from 'axios';

interface NoteItemProps {
    note: Note;
    onDelete: (id: string) => void;
    onUpdate: (note: Note) => void;
    onClick?: (note: Note) => void;
}

const NoteItem = ({note, onDelete, onUpdate, onClick}: NoteItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(note.description);

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
        try {
            await axios.delete(`https://echonote.justbackend.xyz/note/delete/${note.id}`, {
                headers: { Token: localStorage.getItem('token') || '' }
            });
            onDelete(note.id);
        } catch (error) {
            console.error('Error deleting note:', error);
            toast({
                title: 'Error',
                description: 'Failed to delete the note. Please try again.',
                variant: 'destructive'
            });
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
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-medium truncate">{note.title}</h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <Badge variant={isInProgress ? "outline" : "default"}>
                            {isInProgress ? "In Progress" : "Done"}
                        </Badge>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-gray-400 hover:text-red-500"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Trash size={14} />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete note?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete "{note.title}". This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDelete}
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
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
