import { useState, useEffect } from 'react';
import axios from 'axios';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface EditRecordFormProps {
  recordId: string;
  onRecordUpdated: () => void;
  onClose: () => void;
}

interface RecordData {
  title: string;
  start: string;
  description: string;
}

const EditRecordForm = ({ recordId, onRecordUpdated, onClose }: EditRecordFormProps) => {
  const [record, setRecord] = useState<RecordData>({ title: '', start: '', description: '' });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/records/${recordId}`);
        setRecord(data.data);
      } catch (error) {
        console.error('Error fetching record:', error);
      }
      setLoading(false);
    };

    if (recordId) {
      fetchRecord();
    }
  }, [recordId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/records/${recordId}`, record);
      toast({
        title: "Success!",
        description: "Record updated successfully.",
      });
      onRecordUpdated();
      onClose(); 
    } catch (error) {
      console.error('Error updating record:', error);
      toast({
        title: "Error!",
        description: "Failed to update record.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <p>Loading record...</p>;
  }

  return (
    <div className="p-4 w-full">
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-1.5 mb-4">
          <Label htmlFor="editTitle">Title</Label>
          <Input
            type="text"
            id="editTitle"
            value={record.title}
            onChange={(e) => setRecord({ ...record, title: e.target.value })}
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5 mb-4">
          <Label htmlFor="editDescription">Description</Label>
          <Textarea
            id="editDescription"
            value={record.description}
            onChange={(e) => setRecord({ ...record, description: e.target.value })}
            rows={4}
            required
          />
        </div>
        <Button type="submit">Update Record</Button>
      </form>
    </div>
  );
};

export default EditRecordForm; 