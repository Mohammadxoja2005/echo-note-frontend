import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import NoteItem from '@/components/NoteItem';
import {Note, NoteStatus} from '@/utils/storage';
import axios from "axios";

const NotesPage = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const POLLING_INTERVAL = 5000; // 5 seconds

    useEffect(() => {
        const config = {
            headers: {
                Token: localStorage.getItem("token") || ""
            }
        };

        const fetchNotes = () => {
            axios.get(`https://echonote.justbackend.xyz/note/get-all/${page}`, config)
                .then((response) => {
                    setNotes(response.data.notes);
                    setTotalPages(response.data.totalPages || 1);
                })
                .catch(error => {
                    console.error("Failed to fetch notes:", error);
                });
        };

        fetchNotes();

        const intervalId = setInterval(fetchNotes, POLLING_INTERVAL);

        return () => clearInterval(intervalId);
    }, [page]);

    const navigate = useNavigate();
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleNoteDelete = (id: string) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const handleNoteUpdate = (updatedNote: Note) => {
        setNotes(notes.map(note =>
            note.id === updatedNote.id ? updatedNote : note
        ));
    };

    const handleNoteClick = (note: Note) => {
        if (note.status === NoteStatus.done) {
            navigate(`/note/${note.id}`);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const renderPaginationItems = () => {
        const items = [];

        // Show first page
        if (totalPages > 0) {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(1);
                        }}
                        isActive={page === 1}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Show ellipsis if needed
        if (page > 3) {
            items.push(
                <PaginationItem key="ellipsis-start">
                    <PaginationEllipsis/>
                </PaginationItem>
            );
        }

        // Show pages around current page
        for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(i);
                        }}
                        isActive={page === i}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Show ellipsis if needed
        if (page < totalPages - 2) {
            items.push(
                <PaginationItem key="ellipsis-end">
                    <PaginationEllipsis/>
                </PaginationItem>
            );
        }

        // Show last page
        if (totalPages > 1) {
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(totalPages);
                        }}
                        isActive={page === totalPages}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    const filteredNotes = searchTerm
        ? notes.filter(note =>
            note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : notes;

    return (
        <div className="flex-grow p-4 flex flex-col justify-start">
            <div className="w-full pl-2">
                {filteredNotes.length > 0 ? (
                    <>
                        <div className="flex flex-wrap gap-4 mb-6">
                            {filteredNotes.map((note) => (
                                <div key={note.id}>
                                    <NoteItem
                                        note={note}
                                        onDelete={handleNoteDelete}
                                        onUpdate={handleNoteUpdate}
                                        onClick={handleNoteClick}
                                    />
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <Pagination className="mt-8">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(page - 1);
                                            }}
                                            className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                                        />
                                    </PaginationItem>

                                    {renderPaginationItems()}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(page + 1);
                                            }}
                                            className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-start">
                        <div
                            className="text-center py-8 bg-white rounded-lg border border-dashed border-gray-300 w-full max-w-md">
                            <h3 className="text-xl font-medium text-gray-700 mb-2">No voice notes yet</h3>
                            <p className="text-gray-500 mb-4">Use the voice recorder to create your first note</p>
                            <div className="flex justify-center">
                                <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotesPage;
