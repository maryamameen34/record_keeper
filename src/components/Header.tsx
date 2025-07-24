'use client'

import { useState } from 'react';
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <header className="bg-white">
        <nav className="flex justify-between p-4 items-center w-[92%] m-auto">
          <div>
            <p className="text-2xl font-extrabold">RecordKeeper</p>
          </div>
          <div className="flex items-center">
            <button className="py-2 px-5 hover:text-gray-500 font-medium text-gray-700 rounded-full"> 
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </button>
            <button className="md:hidden ml-4 w-8" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✖️' : '☰'}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
