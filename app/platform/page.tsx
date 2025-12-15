"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "motion/react";
import { 
  Workflow, FileText, Printer, LayoutDashboard, 
  Database, Component, Kanban, MousePointerClick,
  Cpu, Code, ShieldCheck, Zap
} from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";

const builders = [
  {
    title: "Transaction Builder",
    icon: MousePointerClick,
    description: "Drag-and-drop interface for creating custom workflows that mirror your unique business processes. Design transaction flows, approval chains, and data capture forms without developer intervention.",
    features: ["Visual Flow Designer", "Custom Data Forms", "No-Code Logic"]
  },
  {
    title: "Report Builder",
    icon: FileText,
    description: "Create visual, data-rich reports with customizable layouts, filters, and exports. Pull data from any module and present it in formats that drive decision-making.",
    features: ["Cross-Module Data", "Custom Layouts", "Automated Exports"]
  },
  {
    title: "Print Builder",
    icon: Printer,
    description: "Design pixel-perfect output templates for invoices, purchase orders, delivery notes, packing slips, and any other business documents with complete control over layout and branding.",
    features: ["Pixel-Perfect PDF", "Brand Control", "Dynamic Fields"]
  },
  {
    title: "Dashboard Builder",
    icon: LayoutDashboard,
    description: "Construct real-time KPI dashboards with drill-down capabilities. Monitor critical metrics across operations, finance, sales, and compliance from a unified view.",
    features: ["Real-Time Metrics", "Drill-Down Support", "Role-Based Views"]
  },
  {
    title: "Workflow Engine",
    icon: Workflow,
    description: "Automate business processes with configurable approval routing, exception handling, and notifications via Slack, email, or in-app alerts based on values, risk levels, or business rules.",
    features: ["Multi-Stage Approvals", "Exception Handling", "Slack/Email Alerts"]
  },
  {
    title: "Data Import Engine",
    icon: Database,
    description: "Handle clean, error-aware data imports at scale with validation rules, duplicate detection, and rollback capabilities for safe migration and ongoing data integration.",
    features: ["Validation Rules", "Duplicate Detection", "Safe Rollback"]
  },
  {
    title: "Widget Builder",
    icon: Component,
    description: "Extend functionality by creating reusable UI components that can be injected into any screen, enabling custom calculations, lookups, or contextual information display.",
    features: ["Custom UI Injection", "Contextual Lookups", "Dynamic Calculations"]
  },
  {
    title: "Kanban Forms",
    icon: Kanban,
    description: "Visualize work items across customizable swim lanes with drag-and-drop progression tracking for projects, service tickets, production orders, and more.",
    features: ["Drag-and-Drop", "Custom Swimlanes", "Visual Progress"]
  }
];

export default function PlatformPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white/20 font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-radial-[circle_800px_at_50%_-200px] from-white/5 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-blue-500"></div>
              <span className="text-blue-400 font-mono text-xs tracking-widest uppercase">Platform Architecture</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-[1.1]">
              Build without <br/>
              <span className="text-white/40">Boundaries.</span>
            </h1>
            <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl mb-12">
              iSuite isn't just an ERP. It's a composable platform layer that gives you eight powerful engines to customize, extend, and automate your enterprise without writing code.
            </p>
            <VideoPlayer title="Builder Demo" coverImage="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" />
          </motion.div>
        </div>
      </section>

      {/* Builders Grid */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {builders.map((builder, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-[#0a0a0a] border border-white/10 p-8 hover:border-white/20 transition-colors overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <builder.icon className="w-24 h-24 stroke-1" />
                </div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                    <builder.icon className="w-6 h-6 text-white/80" />
                  </div>
                  
                  <h3 className="text-xl font-medium mb-3">{builder.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-8 flex-grow">
                    {builder.description}
                  </p>

                  <div className="space-y-2 pt-6 border-t border-white/5">
                    {builder.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs font-mono text-white/40">
                        <div className="w-1 h-1 bg-blue-500/50 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs / "The Engine" Section */}
      <section className="py-32 px-6 bg-[#080808] border-t border-white/10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-light mb-8">The Core Engine</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 flex-shrink-0 bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <Cpu className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">High-Performance Compute</h3>
                  <p className="text-white/50 leading-relaxed">
                    Built on a distributed architecture designed to handle millions of transactions with sub-second latency.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 flex-shrink-0 bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <ShieldCheck className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Enterprise-Grade Security</h3>
                  <p className="text-white/50 leading-relaxed">
                    Role-based access control (RBAC), field-level security, and immutable audit logs ensure your data is always protected.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 flex-shrink-0 bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Zap className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Real-Time Event Bus</h3>
                  <p className="text-white/50 leading-relaxed">
                    Every action in the system triggers events that can drive workflows, notifications, and external integrations instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Abstract Visualization */}
          <div className="relative h-[500px] bg-[#030303] border border-white/10 p-8 font-mono text-xs text-white/30 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite]"></div>
            <div className="grid grid-cols-2 gap-4 h-full">
                <div className="border border-white/5 p-4 flex flex-col justify-between">
                    <div>
                        <div className="text-blue-500 mb-2">Transaction_Layer</div>
                        <div>Processing...</div>
                    </div>
                    <div className="h-32 bg-white/5 w-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-1 bg-blue-500 animate-[scan_2s_ease-in-out_infinite]"></div>
                    </div>
                </div>
                <div className="border border-white/5 p-4 flex flex-col justify-between">
                    <div>
                        <div className="text-purple-500 mb-2">Data_Lake</div>
                        <div>Syncing...</div>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                        {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className="aspect-square bg-white/5 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                        ))}
                    </div>
                </div>
                <div className="col-span-2 border border-white/5 p-4">
                    <div className="text-emerald-500 mb-2">Workflow_Orchestrator</div>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500/50 w-2/3"></div>
                        </div>
                        <span>67%</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
