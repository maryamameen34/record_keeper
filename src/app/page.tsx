'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import RecordForm from "@/components/RecordForm";
import RecordList from "@/components/RecordList";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/nextjs";

interface Record {
  _id: string;
  title: string;
  start: string;
  description: string;
}

const Home = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [sortBy, setSortBy] = useState('createdAtDesc'); // Default sort by createdAt descending

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/records`, {
        params: { page, limit, search, sortBy }, 
      });
      setRecords(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecords();
  }, [page, limit, search, sortBy]); 

  const handleRecordCreated = () => {
    fetchRecords(); 
  };

  return (
    <>
      <Header />
      <SignedIn>
        <div className="container mx-auto p-4 mb-24">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Records</h1>
            <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 text-white p-2 rounded">
                  Add New Record
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg md:max-w-2xl w-full">
                <DialogHeader>
                  <DialogTitle>Create New Record</DialogTitle>
                </DialogHeader>
                <RecordForm onRecordCreated={() => {
                  handleRecordCreated();
                  setShowCreateForm(false);
                }} />
              </DialogContent>
            </Dialog>
          </div>
          <RecordList
            records={records}
            loading={loading}
            page={page}
            limit={limit}
            totalPages={totalPages}
            search={search}
            setSearch={setSearch}
            setPage={setPage}
            fetchRecords={fetchRecords}
          />
        </div>
      </SignedIn>

      {/* SIGN IN / SIGN UP TOGGLE */}
      <SignedOut>
        <div className="h-screen w-full flex flex-col justify-center items-center">
          {showSignUp ? (
            <>
              <SignUp
                appearance={{
                  elements: {
                    footerAction__signIn: "hidden", 
                  },
                }}
                routing="virtual"
                signInUrl="" 
              />
              <p className="mt-4">
                Already have an account?{" "}
                <button
                  onClick={() => setShowSignUp(false)}
                  className="text-blue-500 underline"
                >
                  Sign In
                </button>
              </p>
            </>
          ) : (
            <>
              <SignIn
                appearance={{
                  elements: {
                    footerAction__signUp: "hidden", 
                  },
                }}
                routing="virtual"
                signUpUrl=""
              />
            </>
          )}
        </div>
      </SignedOut>
    </>
  );
};

export default Home;
