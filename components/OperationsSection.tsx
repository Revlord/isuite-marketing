"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Users, Headset, Megaphone, Truck } from "lucide-react";

const operations = [
  {
    id: "hr",
    title: "HR & Payroll Management",
    description: "Hire-to-retire automation: employee records, attendance, payroll cycles, compliance, and performance reviews.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "customer",
    title: "Customer Service",
    description: "Ticket management, SLA tracking, resolution analytics, and customer history in one unified view.",
    icon: Headset,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "marketing",
    title: "Marketing Software",
    description: "Campaign planning, lead scoring, contact segmentation, omnichannel execution, and ROI analysis.",
    icon: Megaphone,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  },
  {
    id: "vehicle",
    title: "Vehicle Management System",
    description: "Track company fleet, monitor costs, schedule maintenance, and manage vehicle compliance.",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1566576912902-48f5d9307bb1?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function OperationsSection() {
  const [activeId, setActiveId] = useState(operations[0].id);

  return (
    <section className="py-32 px-6 bg-[#0f0f0f] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column: Content & Navigation */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4">Operations & People</h2>
            <h3 className="text-3xl md:text-4xl font-light mb-8">Business Operations & Intelligence</h3>
            
            <div className="space-y-2">
              {operations.map((op) => (
                <div 
                  key={op.id}
                  onClick={() => setActiveId(op.id)}
                  className={cn(
                    "group cursor-pointer border-l-2 pl-6 py-4 transition-all duration-300",
                    activeId === op.id 
                      ? "border-white bg-white/5" 
                      : "border-white/10 hover:border-white/30 hover:bg-white/[0.02]"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={cn(
                      "text-lg font-medium transition-colors",
                      activeId === op.id ? "text-white" : "text-white/60 group-hover:text-white/80"
                    )}>
                      {op.title}
                    </h4>
                    {activeId === op.id && (
                        <motion.div layoutId="active-icon" transition={{ duration: 0.3 }}>
                            <op.icon className="w-5 h-5 text-white" />
                        </motion.div>
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {activeId === op.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-white/50 leading-relaxed pb-2">
                            {op.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Image Display */}
          <div className="relative aspect-video bg-black border border-white/10 p-2">
             {/* Frame Decorations */}
             <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-white/20"></div>
             <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-white/20"></div>
             <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-white/20"></div>
             <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/20"></div>

             <div className="relative w-full h-full overflow-hidden bg-[#1a1a1a]">
                <AnimatePresence mode="wait">
                    {operations.map((op) => (
                        op.id === activeId && (
                            <motion.div
                                key={op.id}
                                initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                                className="absolute inset-0"
                            >
                                <Image 
                                    src={op.image} 
                                    alt={op.title}
                                    fill
                                    className="object-cover opacity-60"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                
                                {/* Fake UI Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-[10px] font-mono text-green-500 uppercase tracking-wider">System Active</span>
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-2">{op.title}</h3>
                                    <div className="flex gap-4 mt-4">
                                        <div className="h-1 w-12 bg-white/20 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ x: "-100%" }}
                                                animate={{ x: "0%" }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="h-full w-full bg-white" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
