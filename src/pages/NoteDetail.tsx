import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Header from '@/components/Header';
import {Note, loadNotes, updateNote, NoteStatus} from '@/utils/storage';
import {Button} from '@/components/ui/button';
import {format} from 'date-fns';
import {ArrowLeft, Edit, FileText} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {toast} from '@/hooks/use-toast';
import axios from "axios";
import ReactMarkdown from 'react-markdown';

const NoteDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');

    useEffect(() => {
        const config: any = {
            headers: {
                Token: localStorage.getItem("token") || ""
            }
        }

        axios.post(`https://echonote.justbackend.xyz/note/get/${id}`, {}, config).then((response) => {
            const fetchedNote = response.data.note;
            
            // Check if the note is in progress, redirect back if it is
            if (fetchedNote.status === NoteStatus.progress) {
                toast({
                    title: "Note in progress",
                    description: "This note is still in progress and cannot be accessed.",
                    variant: "destructive"
                });
                navigate('/dashboard/notes');
                return;
            }
            
            setNote(fetchedNote);
            setLoading(false);

            setEditedTitle(fetchedNote.title);
            setEditedContent(fetchedNote.description);
        }).catch(error => {
            navigate('/dashboard/notes');
        })
    }, [id, navigate]);

    const handleSave = () => {
        if (!note) return;

        const config: any = {
            headers: {
                Token: localStorage.getItem("token") || ""
            }
        }

        axios.post(`https://echonote.justbackend.xyz/note/update/${id}`, {
            title: editedTitle,
            description: editedContent
        }, config).then((response) => {
            window.location.reload();

            setIsEditing(false);

            toast({
                title: "Changes saved",
                description: "Note has been updated successfully.",
            });
        })
    };

    const handleCancel = () => {
        if (!note) return;
        setEditedTitle(note.title);
        setEditedContent(note.description);
        setIsEditing(false);
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header/>
                <main className="flex-grow flex items-center justify-center">
                    <p>Loading note...</p>
                </main>
            </div>
        );
    }

    // if (!note) {
    //     return (
    //         <div className="flex flex-col min-h-screen">
    //             <Header/>
    //             <main className="flex-grow flex items-center justify-center">
    //                 <div className="text-center">
    //                     <h1 className="text-2xl font-bold mb-4">Note Not Found</h1>
    //                     <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
    //                 </div>
    //             </main>
    //         </div>
    //     );
    // }

    return (
        <div className="flex flex-col min-h-screen">
            {/*<Header/>*/}
            <main className="flex-grow bg-echonote-light/30 p-6">
                <div className="max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/dashboard/notes')}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft size={16}/>
                            <span>Back to Notes</span>
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className="flex items-center gap-2"
                        >
                            {isEditing ? <FileText size={16}/> : <Edit size={16}/>}
                            <span>{isEditing ? 'Save' : 'Edit'}</span>
                        </Button>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        {isEditing ? (
                            <div className="space-y-4">
                                <Input
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    className="text-2xl font-bold border-b border-gray-200 pb-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    placeholder="Note title"
                                />
                                <p className="text-sm text-gray-500">
                                    Created on {format(note.createdAt, 'MMMM d, yyyy - h:mm a')}
                                </p>
                                <Textarea
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    className="min-h-[300px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                                    placeholder="Note content"
                                />
                                <div className="flex justify-end space-x-2 pt-4">
                                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                                    <Button onClick={handleSave}>Save Changes</Button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h1 className="text-2xl font-bold mb-2">{note.title}</h1>
                                <p className="text-sm text-gray-500 mb-6">
                                    Created on {format(note.createdAt, 'MMMM d, yyyy - h:mm a')}
                                </p>

                                <Tabs defaultValue="summary">
                                    <TabsList className="mb-4">
                                        <TabsTrigger value="summary">📋 Summary</TabsTrigger>
                                        <TabsTrigger value="transcript">📝 Transcript</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="summary">
                                        <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary text-sm text-foreground/80">
                                            <ReactMarkdown
                                                components={{
                                                    h2: ({children}) => <h2 className="text-sm font-semibold text-primary mt-4 mb-2 first:mt-0">{children}</h2>,
                                                    p: ({children}) => <p className="leading-relaxed mb-2">{children}</p>,
                                                    ul: ({children}) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
                                                    li: ({children}) => <li className="leading-relaxed">{children}</li>,
                                                }}
                                            >
                                                {note.summerizedText || 'No summary available'}
                                            </ReactMarkdown>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="transcript">
                                        <div className="prose max-w-none bg-gray-50 p-4 rounded-lg">
                                            <p className="whitespace-pre-wrap text-sm leading-relaxed">
                                                {note.description || 'No transcript available'}
                                            </p>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NoteDetail;
