"use client";

import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationMenu({ isOpen, onClose }: NavigationMenuProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 500);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] bg-white text-black transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isOpen ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
        <Link href="/" onClick={onClose} className="text-xl font-medium tracking-tight text-black flex items-center gap-2">
          <Image 
            src="/logos/outlineBlack.svg" 
            alt="iSuite Logo" 
            width={24} 
            height={24} 
            className="w-6 h-auto"
          />
          iSuite
        </Link>
        <button 
          onClick={onClose}
          className="p-2 text-black/60 hover:text-black transition-colors flex items-center gap-2 group"
        >
          <span className="text-xs uppercase tracking-wider font-medium hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">Close</span>
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-73px)] overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            
            {/* Navigation Column - Solutions */}
            <div className="md:col-span-3 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">[ Solutions ]</h3>
                <ul className="space-y-3">
                  <NavItem href="/solutions#financial" label="Financial Management" onClose={onClose} />
                  <NavItem href="/solutions#sales" label="Sales & Distribution" onClose={onClose} />
                  <NavItem href="/solutions#procurement" label="Procurement" onClose={onClose} />
                  <NavItem href="/solutions#inventory" label="Inventory Management" onClose={onClose} />
                  <NavItem href="/solutions#manufacturing" label="Manufacturing (MRP)" onClose={onClose} />
                  <NavItem href="/solutions#quality" label="Quality Control" onClose={onClose} />
                  <NavItem href="/solutions#service" label="Service Management" onClose={onClose} />
                  <NavItem href="/solutions#hr" label="HR & Payroll" onClose={onClose} />
                </ul>
              </div>
            </div>

            {/* Navigation Column - Industries & Platform */}
            <div className="md:col-span-3 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">[ Industries ]</h3>
                <ul className="space-y-3">
                  <NavItem href="/industries#pharma" label="Pharmaceutical" onClose={onClose} />
                  <NavItem href="/industries#manufacturing" label="Manufacturing" onClose={onClose} />
                  <NavItem href="/industries#retail" label="Retail & FMCG" onClose={onClose} />
                  <NavItem href="/industries#construction" label="Construction" onClose={onClose} />
                  <NavItem href="/industries#finance" label="Financial Services" onClose={onClose} />
                  <NavItem href="/industries#distribution" label="Distribution" onClose={onClose} />
                </ul>
              </div>

              <div className="space-y-4 pt-6 border-t border-black/10">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">[ Platform ]</h3>
                <ul className="space-y-3">
                  <NavItem href="/platform" label="Platform Overview" onClose={onClose} />
                  <NavItem href="/platform#capabilities" label="Capabilities" onClose={onClose} />
                  <NavItem href="/platform#technical" label="Technical Foundation" onClose={onClose} />
                </ul>
              </div>

              <div className="space-y-4 pt-6 border-t border-black/10">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">[ Company ]</h3>
                <ul className="space-y-3">
                  <NavItem href="/contact" label="Contact Us" onClose={onClose} />
                </ul>
              </div>
            </div>

            {/* Featured Section */}
            <div className="md:col-span-6 lg:col-span-5 lg:col-start-8 flex flex-col h-full">
              
              {/* Featured Visual */}
              <div className="relative w-full aspect-video mb-8 overflow-hidden border border-black/10 group">
                <Image 
                  src="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1974&auto=format&fit=crop"
                  alt="iSuite Platform"
                  fill
                  className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="text-xs font-medium uppercase tracking-wider text-black/80 border border-black/20 px-3 py-1 inline-block backdrop-blur-md bg-white/30">
                    Enterprise Operating System
                  </div>
                </div>
              </div>

              {/* Value Proposition */}
              <div className="flex-1">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-6">{'{ Why iSuite }'}</h3>
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-light leading-tight">
                    Software That <br/>
                    <span className="text-black/40">Adapts to You.</span>
                  </h2>
                  <p className="text-black/60 leading-relaxed max-w-md">
                    Stop adapting your operations to match rigid software. iSuite molds precisely 
                    to how your organization actually works — with enterprise depth and unprecedented flexibility.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <FeaturePoint title="Deploy in Weeks" desc="Not years." />
                    <FeaturePoint title="Unlimited Customization" desc="No artificial limits." />
                    <FeaturePoint title="Continuous Evolution" desc="Changes in days." />
                    <FeaturePoint title="Zero Technical Debt" desc="Sustainable growth." />
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-8 border-t border-black/10">
                <Link 
                  href="/contact" 
                  onClick={onClose}
                  className="group inline-flex items-center gap-2 text-lg font-medium hover:text-black/80 transition-colors"
                >
                  <span className="border-b border-black pb-0.5 group-hover:border-black/60 transition-colors">Request a Demo</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ href, label, onClose }: { href: string; label: string; onClose: () => void }) {
  return (
    <li>
      <Link 
        href={href} 
        onClick={onClose}
        className="group flex items-center gap-3 text-lg text-black/60 hover:text-black transition-colors"
      >
        <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-black/40" />
        <span>{label}</span>
      </Link>
    </li>
  );
}

function FeaturePoint({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h4 className="text-black font-medium mb-1">{title}</h4>
      <p className="text-sm text-black/40">{desc}</p>
    </div>
  );
}