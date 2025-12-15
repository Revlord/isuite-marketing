import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight, ChevronRight } from "lucide-react";
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
            const timer = setTimeout(() => setIsVisible(false), 500); // Match transition duration
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div 
            className={cn(
                "fixed inset-0 z-[100] bg-[#0a0a0a] text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isOpen ? "translate-y-0" : "-translate-y-full"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div className="text-xl font-medium tracking-tight text-white flex items-center gap-2">
                    <Image 
                        src="/logos/outlineWhite.svg" 
                        alt="iSuite Logo" 
                        width={24} 
                        height={24} 
                        className="w-6 h-auto"
                    />
                    iSuite
                </div>
                <button 
                    onClick={onClose}
                    className="p-2 text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                >
                    <span className="text-xs uppercase tracking-wider font-medium hidden md:block group-hover:opacity-100 opacity-0 transition-opacity duration-300">Close</span>
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Main Content */}
            <div className="h-[calc(100vh-73px)] overflow-y-auto">
                <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                        
                        {/* Navigation Column - Core ERP */}
                        <div className="md:col-span-3 space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">[ Core ERP ]</h3>
                                <ul className="space-y-3">
                                    <NavItem href="/modules#erp" label="Financial Management" />
                                    <NavItem href="/modules#sales" label="Sales & Distribution" />
                                    <NavItem href="/modules#procurement" label="Procurement" />
                                    <NavItem href="/modules#inventory" label="Inventory Management" />
                                    <NavItem href="/modules#mrp" label="Manufacturing (MRP)" />
                                    <NavItem href="/modules#erp" label="Accounting Software" />
                                </ul>
                            </div>

                            <div className="space-y-4 pt-8 border-t border-white/10">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">[ Operations ]</h3>
                                <ul className="space-y-3">
                                    <NavItem href="/modules#pm" label="Project Management" />
                                    <NavItem href="/industries#finance" label="Fixed Assets" />
                                    <NavItem href="/industries#commercial" label="Vehicle Management" />
                                </ul>
                            </div>
                        </div>

                        {/* Navigation Column - Business & Platform */}
                        <div className="md:col-span-3 space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">[ Business Ops ]</h3>
                                <ul className="space-y-3">
                                    <NavItem href="/industries#commercial" label="Customer Service" />
                                    <NavItem href="/industries#commercial" label="Marketing Software" />
                                    <NavItem href="/industries#operations" label="HR & Payroll" />
                                    <NavItem href="/industries#finance" label="Fixed Deposit" />
                                </ul>
                            </div>

                            <div className="space-y-4 pt-8 border-t border-white/10">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">[ Platform Tools ]</h3>
                                <ul className="space-y-3">
                                    <NavItem href="/platform" label="Transaction Builder" />
                                    <NavItem href="/platform" label="Workflow Engine" />
                                    <NavItem href="/platform" label="Report & Dashboard" />
                                    <NavItem href="/platform" label="LMS & DMS" />
                                </ul>
                            </div>
                        </div>

                        {/* Featured / Why iSuite Column */}
                        <div className="md:col-span-6 lg:col-span-5 lg:col-start-8 flex flex-col h-full">
                            
                            {/* Featured Image */}
                            <div className="relative w-full aspect-video mb-8 overflow-hidden border border-white/10 group">
                                <Image 
                                    src="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1974&auto=format&fit=crop"
                                    alt="iSuite Dashboard"
                                    fill
                                    className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                    <div className="text-xs font-bold uppercase tracking-wider text-white/80 border border-white/20 px-2 py-1 inline-block backdrop-blur-md">
                                        Latest Release v4.0
                                    </div>
                                </div>
                            </div>

                            {/* Why iSuite Section */}
                            <div className="flex-1">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-6">[ Why iSuite. ]</h3>
                                <div className="space-y-6">
                                    <h2 className="text-3xl md:text-4xl font-light leading-tight">
                                        One Platform. <br/>
                                        <span className="text-white/50">Total Control.</span>
                                    </h2>
                                    <p className="text-white/60 leading-relaxed max-w-md">
                                        Designed from the ground up by seasoned technologists. 
                                        iSuite rivals legacy platforms with unmatched agility, flexibility, and cost-efficiency.
                                    </p>
                                    
                                    <div className="grid grid-cols-2 gap-6 pt-4">
                                        <FeaturePoint title="Built for Scale" desc="Startups to complex enterprises." />
                                        <FeaturePoint title="Tactical Precision" desc="Purpose-built for real pain points." />
                                        <FeaturePoint title="Battle-Tested" desc="High-volume real-world operations." />
                                        <FeaturePoint title="No Bloat" desc="Fast to deploy, easy to configure." />
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="pt-8 border-t border-white/10">
                                <Link href="#" className="group inline-flex items-center gap-2 text-lg font-medium hover:text-white/80 transition-colors">
                                    <span className="border-b border-white pb-0.5 group-hover:border-white/60 transition-colors">Schedule a Demo</span>
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

function NavItem({ href, label }: { href: string, label: string }) {
    return (
        <li>
            <Link href={href} className="group flex items-center gap-3 text-lg text-white/70 hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-white/50" />
                <span>{label}</span>
            </Link>
        </li>
    )
}

function FeaturePoint({ title, desc }: { title: string, desc: string }) {
    return (
        <div>
            <h4 className="text-white font-medium mb-1">{title}</h4>
            <p className="text-sm text-white/40">{desc}</p>
        </div>
    )
}
