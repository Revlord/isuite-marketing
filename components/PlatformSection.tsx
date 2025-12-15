"use client";

import { motion } from "motion/react";
import { BarChart3, Box, Database, FileText, Layout, Workflow, Settings, Layers } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const tools = [
  { title: "Transaction Builder", icon: Database, description: "Design custom forms and workflows without code." },
  { title: "Report Builder", icon: BarChart3, description: "Drag-and-drop analytics engine for deep insights." },
  { title: "Workflow Engine", icon: Workflow, description: "Automate complex business logic and approvals." },
  { title: "Dashboard Builder", icon: Layout, description: "Real-time KPI visualization and monitoring." },
  { title: "Data Import Engine", icon: Layers, description: "Smart mapping, deduplication, and validation." },
  { title: "Widget Builder", icon: Box, description: "Extend functionality with reusable custom blocks." },
  { title: "Kanban Forms", icon: Settings, description: "Visual process tracking and task management." },
  { title: "Print Builder", icon: FileText, description: "Pixel-perfect document generation and formatting." },
];

export default function PlatformSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 border-t border-white/10 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Grid Animation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <motion.div 
            animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
            }}
            className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,#ffffff12,transparent)]"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4"
          >
            Custom Builder & Platform
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-light tracking-tight"
          >
            Build Your Own <span className="text-white/50">Workflows</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool, index) => (
            <ToolCard 
                key={index} 
                tool={tool} 
                index={index} 
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool, index, hoveredIndex, setHoveredIndex }: { tool: any, index: number, hoveredIndex: number | null, setHoveredIndex: (i: number | null) => void }) {
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
                "relative group p-6 h-48 bg-white/5 border border-white/10 transition-all duration-300 overflow-hidden",
                isDimmed ? "opacity-40 scale-95 blur-[1px]" : "opacity-100 scale-100"
            )}
        >
            {/* Hover Gradient Background */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500",
                isHovered && "opacity-100"
            )} />

            {/* Scanning Line Effect */}
            {isHovered && (
                <motion.div 
                    layoutId="scanner"
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent w-full h-[200%] -translate-y-1/2 pointer-events-none"
                    animate={{ top: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
            )}

            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/0 group-hover:border-white/50 transition-colors duration-300" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/0 group-hover:border-white/50 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/0 group-hover:border-white/50 transition-colors duration-300" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/0 group-hover:border-white/50 transition-colors duration-300" />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className={cn(
                        "w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 mb-4 transition-colors duration-300",
                        isHovered && "bg-white text-black border-white"
                    )}>
                        <tool.icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-medium text-white/90 mb-2">{tool.title}</h4>
                    <p className="text-sm text-white/50 leading-relaxed">{tool.description}</p>
                </div>

                {/* Bottom Status Line */}
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "h-0.5 w-4 bg-white/20 transition-all duration-300",
                        isHovered && "w-full bg-white"
                    )} />
                    <span className={cn(
                        "text-[10px] uppercase tracking-wider text-white/30 transition-colors duration-300",
                        isHovered && "text-white"
                    )}>
                        {isHovered ? "Active" : "0" + (index + 1)}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
