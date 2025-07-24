import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EditRecordForm from "@/components/EditRecordForm";

interface Record {
  _id: string;
  title: string;
  start: string;
  description: string;
}

interface RecordGridProps {
  records: Record[];
  handleEditClick: (recordId: string) => void;
  handleDelete: (record: Record) => void;
  selectedRecordId: string | null;
  handleRecordUpdated: () => void;
  setShowEditForm: (show: boolean) => void;
}

const RecordGrid = ({
  records,
  handleEditClick,
  handleDelete,
  selectedRecordId,
  handleRecordUpdated,
  setShowEditForm,
}: RecordGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {records.map((record: Record) => (
        <div key={record._id} className="bg-white p-4 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{record.title}</h3>
          <p className="text-sm text-gray-600 mb-1"><strong>Date:</strong> {format(new Date(record.start), "MM/dd/yyyy")}</p>
          <p className="text-sm text-gray-700 line-clamp-3 mb-3"><strong>Description:</strong> {record.description}</p>
          <div className="flex justify-end space-x-2 mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(record._id)}
                >
                  <CiEdit />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg md:max-w-2xl w-full">
                <DialogHeader>
                  <DialogTitle>Edit Record</DialogTitle>
                </DialogHeader>
                {selectedRecordId === record._id && (
                  <EditRecordForm
                    recordId={selectedRecordId}
                    onRecordUpdated={handleRecordUpdated}
                    onClose={() => setShowEditForm(false)}
                  />
                )}
              </DialogContent>
            </Dialog>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(record)}
            >
              <MdDelete />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecordGrid; 