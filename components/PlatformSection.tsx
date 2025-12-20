"use client";

import { motion } from "motion/react";
import { 
  Settings2, 
  BarChart3, 
  FileText, 
  Workflow, 
  LayoutDashboard, 
  Zap,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Note: We're showing CAPABILITIES, not the internal builders
// This protects IP while showcasing power

const capabilities = [
  { 
    title: "Custom Screens & Forms", 
    icon: Settings2, 
    description: "Every data entry point designed exactly as your process requires. New screens in hours." 
  },
  { 
    title: "Automated Workflows", 
    icon: Workflow, 
    description: "Approval chains and business logic that match how your organization actually operates." 
  },
  { 
    title: "Real-Time Dashboards", 
    icon: LayoutDashboard, 
    description: "Live visibility into every metric that matters. Role-based views, instant updates." 
  },
  { 
    title: "Advanced Analytics", 
    icon: BarChart3, 
    description: "Reports that show exactly what you need. Any data, any calculation, any format." 
  },
  { 
    title: "Document Generation", 
    icon: FileText, 
    description: "Invoices, POs, reports — formatted exactly as your business demands. Brand-compliant." 
  },
  { 
    title: "Process Automation", 
    icon: Zap, 
    description: "Eliminate manual steps. Trigger actions automatically based on your business rules." 
  },
];

export default function PlatformSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 border-t border-black/10 bg-gray-50 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-4"
            >
              Platform Capabilities
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-light tracking-tight"
            >
              Unlimited <span className="text-black/40">Flexibility.</span>
            </motion.h3>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button asChild variant="outline" className="border-black/20 text-black hover:bg-black/5 rounded-none h-12 px-8">
              <Link href="/platform">
                Explore Platform <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((capability, index) => (
            <CapabilityCard 
              key={index} 
              capability={capability} 
              index={index} 
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-white/40 max-w-2xl mx-auto">
            Our proprietary architecture enables these capabilities without custom code — 
            changes deploy in days, not development cycles.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function CapabilityCard({ 
  capability, 
  index, 
  hoveredIndex, 
  setHoveredIndex 
}: { 
  capability: typeof capabilities[0]; 
  index: number; 
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  const isHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={cn(
        "relative group p-8 h-56 bg-white/[0.02] border border-white/10 transition-all duration-300 overflow-hidden",
        isDimmed ? "opacity-40 scale-[0.98]" : "opacity-100 scale-100",
        isHovered && "bg-white/[0.05] border-white/20"
      )}
    >
      {/* Hover Gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 transition-opacity duration-500",
        isHovered && "opacity-100"
      )} />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className={cn(
            "w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 mb-6 transition-all duration-300",
            isHovered && "bg-white text-black border-white"
          )}>
            <capability.icon className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-medium text-white mb-2">{capability.title}</h4>
          <p className="text-sm text-white/50 leading-relaxed">{capability.description}</p>
        </div>

        {/* Bottom indicator */}
        <div className="flex items-center gap-2 pt-4">
          <div className={cn(
            "h-px w-6 bg-white/20 transition-all duration-300",
            isHovered && "w-full bg-white/50"
          )} />
        </div>
      </div>
    </motion.div>
  );
}