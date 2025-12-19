"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import NavigationMenu from "./NavigationMenu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-black">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-medium tracking-tight text-black flex items-center gap-2">
              <Image 
                src="/logos/outlineBlack.svg" 
                alt="iSuite Logo" 
                width={32} 
                height={32} 
                className="w-8 h-auto"
              />
              iSuite
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button 
              variant="secondary" 
              className="hidden md:flex bg-black text-white hover:bg-gray-800 rounded-none h-9 px-6 text-xs uppercase tracking-wider font-semibold"
          >
            Get Started
          </Button>
          
          <button className="p-2 text-black/80 hover:text-black transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-black/80 hover:text-black transition-colors border-l border-black/20 pl-4 ml-2"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
