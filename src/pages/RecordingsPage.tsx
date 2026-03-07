
import { useState, useEffect } from 'react';
import { loadNotes, Note, deleteNote } from '@/utils/storage';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Play, Trash, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import RecordingPlayer from '@/components/recordings/RecordingPlayer';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const RecordingsPage = () => {
  const [recordings, setRecordings] = useState<Note[]>([]);
  const [selectedRecording, setSelectedRecording] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load recordings on mount
  useEffect(() => {
    const fetchRecordings = async () => {
      setIsLoading(true);
      try {
        // Load all recordings, including unsaved ones
        const loadedRecordings = await loadNotes();
        setRecordings(loadedRecordings);
      } catch (error) {
        console.error('Error loading recordings:', error);
        toast({
          title: 'Error',
          description: 'Failed to load recordings',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecordings();
  }, [toast]);

  const handleDelete = async (id: string) => {
    try {
      const updatedRecordings = await deleteNote(id);
      setRecordings(updatedRecordings);
      
      // If the deleted recording was selected, clear selection
      if (selectedRecording && selectedRecording.id === id) {
        setSelectedRecording(null);
      }
      
      toast({
        title: 'Recording deleted',
        description: 'The recording has been removed'
      });
    } catch (error) {
      console.error('Error deleting recording:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete recording',
        variant: 'destructive'
      });
    }
  };

  const handlePlay = (recording: Note) => {
    setSelectedRecording(recording);
  };

  const formatDate = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <div className="flex-grow p-4 flex flex-col gap-4 md:gap-6">
      <Alert className="w-full">
        <Info className="h-4 w-4" />
        <AlertDescription className="text-sm">
          All recordings are saved locally on your device. They will be lost if you clear your browser data or use a different device.
        </AlertDescription>
      </Alert>

      {selectedRecording && (
        <div className="w-full mb-4">
          <RecordingPlayer recording={selectedRecording} />
        </div>
      )}
      
      <div className="w-full">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">Loading recordings...</p>
          </div>
        ) : recordings.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Title</TableHead>
                  <TableHead className="hidden md:table-cell">Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recordings.map((recording) => (
                  <TableRow key={recording.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span className="truncate">{recording.title}</span>
                        {recording.isUnsaved && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 rounded-full px-2 py-1 w-fit mt-1">
                            Unsaved
                          </span>
                        )}
                        <span className="text-sm text-gray-500 md:hidden mt-1">
                          {formatDate(recording.timestamp)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(recording.timestamp)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handlePlay(recording)}
                          className="h-8 w-8"
                        >
                          <Play size={14} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleDelete(recording.id)}
                          className="h-8 w-8"
                        >
                          <Trash size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
            <h3 className="text-xl md:text-2xl font-medium text-gray-700">No recordings yet</h3>
            <p className="text-base md:text-lg text-gray-500 mt-2">Your recordings will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordingsPage;
