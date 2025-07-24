import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { GrFormPrevious, GrNext } from "react-icons/gr";
import { Dispatch, SetStateAction } from "react";
import { format } from "date-fns"; // Import format
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EditRecordForm from "@/components/EditRecordForm";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LuTable, LuGrid } from "react-icons/lu"; // Import icons
import RecordGrid from "@/components/RecordGrid";

interface Record {
  _id: string;
  title: string;
  start: string;
  description: string;
}

interface RecordListProps {
  records: Record[];
  loading: boolean;
  page: number;
  limit: number;
  totalPages: number;
  search: string;
  setSearch: (search: string) => void;
  setPage: Dispatch<SetStateAction<number>>;
  fetchRecords: () => void;
}

const RecordList = ({
  records,
  loading,
  page,
  totalPages,
  search,
  setSearch,
  setPage,
  fetchRecords,
  limit, 
}: RecordListProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table"); // New state for view mode
  const { toast } = useToast();

  const handleEditClick = (recordId: string) => {
    setSelectedRecordId(recordId);
    setShowEditForm(true);
  };

  const handleRecordUpdated = () => {
    fetchRecords();
    setShowEditForm(false);
    setSelectedRecordId(null);
  };

  const handleDelete = async (record: Record) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete record with ID ${record._id}?`
    );

    if (confirmed) {
      try {
        await axios.delete(`/api/records/${record._id}`);
        toast({
          title: "Success!",
          description: "Record deleted successfully.",
        });
        fetchRecords();
      } catch (error) {
        console.error('Error deleting record:', error);
        toast({
          title: "Error!",
          description: "Failed to delete record.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mb-24">
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-full mr-4"
        />
        <Button onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}>
          {viewMode === "table" ? <LuGrid className="text-xl" /> : <LuTable className="text-xl" />}
        </Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : records.length === 0 ? (
        <p className="text-center text-gray-500">No records found.</p>
      ) : viewMode === "table" ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record: Record, index: number) => (
              <TableRow key={record._id}>
                <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                <TableCell>{record.title}</TableCell>
                <TableCell>{format(new Date(record.start), "MM/dd/yyyy")}</TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(record._id)}
                        className="mr-2"
                      >
                        <CiEdit />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg md:max-w-2xl w-full">
                      <DialogHeader>
                        <DialogTitle>Edit Record</DialogTitle>
                      </DialogHeader>
                      {selectedRecordId && (
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <RecordGrid
          records={records}
          handleEditClick={handleEditClick}
          handleDelete={handleDelete}
          selectedRecordId={selectedRecordId}
          handleRecordUpdated={handleRecordUpdated}
          setShowEditForm={setShowEditForm}
        />
      )}

      {(records.length > 0 && totalPages > 1) && (
        <Pagination className="mt-4">
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious href="#" onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))} />
              </PaginationItem>
            )}
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= page - 1 && pageNumber <= page + 1)) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={pageNumber === page}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (pageNumber === page - 2 || pageNumber === page + 2) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}
            {page < totalPages && (
              <PaginationItem>
                <PaginationNext href="#" onClick={() => setPage((prev: number) => prev + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default RecordList; 