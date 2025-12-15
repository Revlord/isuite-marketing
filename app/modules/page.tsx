"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "motion/react";
import { 
  Briefcase, Globe, Box, Layers, Cog, FileText, Users, 
  CheckCircle2, ArrowRight, BarChart3, Zap, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import VideoPlayer from "@/components/VideoPlayer";

const modules = [
  {
    id: "erp",
    title: "Enterprise Resource Planning",
    icon: Briefcase,
    tagline: "The Single Source of Truth",
    description: "The foundation module providing unified operations and finance management. Close faster with accurate AR/AP, aging, and cashflow.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    outcomes: [
      "Single source of truth for orders, inventory, and ledger",
      "Approvals everywhere with clean audit trails",
      "Real-time ledger ↔ operations synchronization"
    ],
    capabilities: [
      "Unified transaction management",
      "Document templates with print builder",
      "Role-based access control",
      "Multi-currency & Multi-entity"
    ]
  },
  {
    id: "pm",
    title: "Project Management",
    icon: Layers,
    tagline: "Deliver on Time, Every Time",
    description: "Plan, track, and deliver projects with Gantt charts, work breakdown structures, budgets, and change orders that sync directly with finance.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop",
    outcomes: [
      "On-time delivery with dependency tracking",
      "Budget vs. actual visibility by phase",
      "Change control without email chaos"
    ],
    capabilities: [
      "WBS & Critical Path Analysis",
      "Resource Allocation & Capacity",
      "Time & Cost Capture",
      "Earned Value Management"
    ]
  },
  {
    id: "inventory",
    title: "Inventory Management",
    icon: Box,
    tagline: "Zero Surprises",
    description: "Live stock visibility across locations with lot/serial tracking and turns analysis—zero surprises during pick/pack/ship operations.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    outcomes: [
      "Accurate availability across all locations",
      "Healthy inventory turns",
      "Complete lot/serial tracking"
    ],
    capabilities: [
      "Multi-warehouse management",
      "Lot/Serial tracking with expiry",
      "Cycle counts & adjustments",
      "ABC Classification"
    ]
  },
  {
    id: "procurement",
    title: "Procurement",
    icon: FileText,
    tagline: "Smarter Sourcing",
    description: "Vendor management, RFQs, purchase orders, contracts, and clean 3-way matching—delivering real savings with fewer escalations.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    outcomes: [
      "Better pricing & supplier performance",
      "Tighter controls with reduced friction",
      "Fewer invoice disputes"
    ],
    capabilities: [
      "RFQ & Vendor Quote Comparison",
      "Contract Management",
      "3-Way Matching (PO-GRN-Bill)",
      "Vendor Scorecards"
    ]
  },
  {
    id: "sales",
    title: "Sales & Distribution",
    icon: Globe,
    tagline: "Quote-to-Cash Velocity",
    description: "Quote-to-cash with intelligent pricing logic, real-time availability, and aligned dispatches—no more 'sorry, out of stock' surprises.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2064&auto=format&fit=crop",
    outcomes: [
      "Clean pricing & promotions",
      "Higher fill rates",
      "Shorter order-to-invoice cycles"
    ],
    capabilities: [
      "Customer-specific catalogs",
      "Available-to-Promise (ATP)",
      "Route Optimization",
      "Margin Analysis"
    ]
  },
  {
    id: "mrp",
    title: "Manufacturing (MRP)",
    icon: Cog,
    tagline: "Precision Production",
    description: "Bills of materials, routings, scheduling, and QA—creating realistic production plans that respect machines, materials, and people.",
    image: "https://images.unsplash.com/photo-1565514020176-dbf2277f18f3?q=80&w=2070&auto=format&fit=crop",
    outcomes: [
      "Feasible production schedules",
      "Lower WIP and rework",
      "Predictable lead times"
    ],
    capabilities: [
      "Multi-level BOMs",
      "Routing & Work Centers",
      "Backflushing & Scrap Tracking",
      "OEE & Yield Analytics"
    ]
  },
  {
    id: "crm",
    title: "CRM",
    icon: Users,
    tagline: "Pipeline Intelligence",
    description: "A pipeline system your team will actually use—opportunities, activities, and quotes tied directly to inventory and pricing.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    outcomes: [
      "Faster sales cycles",
      "Defendable forecasts",
      "No double entry between CRM & ERP"
    ],
    capabilities: [
      "Lead & Opportunity Management",
      "Activity Tracking",
      "Quote-to-Order Flow",
      "Pipeline Coverage Analytics"
    ]
  }
];

function ImpactSection() {
  return (
    <section className="py-12 px-6 border-b border-white/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
           <div className="p-6 border border-white/5 bg-white/2">
              <div className="text-3xl font-light text-white mb-1">100%</div>
              <div className="text-xs text-white/40 uppercase tracking-wider">Data Integrity</div>
           </div>
           <div className="p-6 border border-white/5 bg-white/2">
              <div className="text-3xl font-light text-white mb-1">&lt; 200ms</div>
              <div className="text-xs text-white/40 uppercase tracking-wider">Query Latency</div>
           </div>
           <div className="p-6 border border-white/5 bg-white/2">
              <div className="text-3xl font-light text-white mb-1">ISO</div>
              <div className="text-xs text-white/40 uppercase tracking-wider">27001 Certified</div>
           </div>
           <div className="p-6 border border-white/5 bg-white/2">
              <div className="text-3xl font-light text-white mb-1">24/7</div>
              <div className="text-xs text-white/40 uppercase tracking-wider">System Uptime</div>
           </div>
        </div>
      </div>
    </section>
  )
}

export default function ModulesPage() {
  const [activeModule, setActiveModule] = useState("erp");

  // Handle scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = modules.map(m => document.getElementById(m.id));
      const scrollPosition = window.scrollY + 200; // Offset

      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
          setActiveModule(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToModule = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Operational <span className="text-white/40">Intelligence.</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl font-light mb-12">
            A complete suite of integrated modules designed to work together seamlessly. 
            No silos. No data duplication. Just one unified operating system.
          </p>
          <VideoPlayer title="Module Deep Dive" coverImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" />
        </div>
      </section>

      <ImpactSection />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        {/* Sticky Sidebar */}
        <aside className="hidden md:block w-64 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto py-8 pr-8 border-r border-white/10">
          <nav className="space-y-1">
            {modules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => scrollToModule(mod.id)}
                className={cn(
                  "w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 border-l-2",
                  activeModule === mod.id
                    ? "border-white text-white bg-white/5"
                    : "border-transparent text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                {mod.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 py-8 md:px-12">
          <div className="space-y-32 pb-32">
            {modules.map((mod) => (
              <section key={mod.id} id={mod.id} className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                    <mod.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-light">{mod.title}</h2>
                </div>

                <div className="mb-8">
                  <p className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-2">{mod.tagline}</p>
                  <p className="text-lg text-white/70 leading-relaxed max-w-3xl">
                    {mod.description}
                  </p>
                </div>

                <div className="relative w-full h-64 mb-8 border border-white/10 overflow-hidden group">
                    <Image 
                        src={mod.image}
                        alt={mod.title}
                        fill
                        className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Key Outcomes */}
                  <div className="bg-[#0f0f0f] border border-white/5 p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <BarChart3 className="w-4 h-4 text-white/40" />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white/90">Key Outcomes</h3>
                    </div>
                    <ul className="space-y-4">
                      {mod.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500/80 mt-0.5 shrink-0" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Capabilities */}
                  <div className="bg-[#0f0f0f] border border-white/5 p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Zap className="w-4 h-4 text-white/40" />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white/90">Capabilities</h3>
                    </div>
                    <ul className="space-y-4">
                      {mod.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                          <div className="w-1.5 h-1.5 bg-blue-500/50 rounded-full mt-1.5 shrink-0"></div>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
