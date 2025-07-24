import { useState } from 'react';
import axios from 'axios';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RecordFormProps {
  onRecordCreated: () => void;
}

const RecordForm = ({ onRecordCreated }: RecordFormProps) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedStart = start ? format(start, 'yyyy-MM-dd') : '';
      await axios.post('/api/records', { title, description, start: formattedStart });
      toast({
        title: "Success!",
        description: "Record created successfully.",
      });
      setTitle('');
      setStart(undefined);
      setDescription('');
      onRecordCreated(); 
    } catch (error) {
      console.error('Error creating record:', error);
      toast({
        title: "Error!",
        description: "Failed to create record.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container p-4 w-full">
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-1.5 mb-4">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5 mb-4">
          <Label htmlFor="startDate">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !start && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {start ? format(start, "PPP") : <span className="text-gray-500">Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={start}
                onSelect={setStart}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid w-full items-center gap-1.5 mb-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default RecordForm; 