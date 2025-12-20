"use client";

import { motion } from "motion/react";
import { 
  ArrowRight, 
  CircleDot,
  Factory,
  Truck,
  Package,
  FileText,
  CreditCard,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const operationalFlow = [
  { 
    icon: Factory, 
    title: "Production", 
    desc: "Plan, schedule, execute",
    color: "blue"
  },
  { 
    icon: Package, 
    title: "Inventory", 
    desc: "Track every unit",
    color: "purple"
  },
  { 
    icon: Truck, 
    title: "Distribution", 
    desc: "Deliver on time",
    color: "emerald"
  },
  { 
    icon: FileText, 
    title: "Invoicing", 
    desc: "Bill accurately",
    color: "amber"
  },
  { 
    icon: CreditCard, 
    title: "Collections", 
    desc: "Get paid faster",
    color: "rose"
  },
  { 
    icon: BarChart3, 
    title: "Analytics", 
    desc: "Decide with data",
    color: "cyan"
  },
];

export default function OperationsSection() {
  return (
    <section className="py-32 px-6 border-t border-black/10 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/5 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-4"
            >
              Unified Operations
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-light tracking-tight mb-6"
            >
              One System. <span className="text-black/40">Complete Flow.</span>
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-black/50 leading-relaxed"
            >
              Every business function connected. Data flows seamlessly from production to payment, 
              with real-time visibility at every step. No silos. No reconciliation nightmares. 
              No "the system doesn't talk to that."
            </motion.p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <StatBox value="Real-Time" label="Data Sync" />
            <StatBox value="100%" label="Integrated" />
            <StatBox value="Single" label="Source of Truth" />
            <StatBox value="Zero" label="Data Silos" />
          </div>
        </div>

        {/* Flow Visualization */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent hidden lg:block"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {operationalFlow.map((step, index) => (
              <FlowStep 
                key={index} 
                step={step} 
                index={index} 
                isLast={index === operationalFlow.length - 1}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-white/40 mb-6">
            See how all modules work together as one unified system.
          </p>
          <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-none h-12 px-8">
            <Link href="/solutions">
              Explore All Modules <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-6 border border-white/10 bg-white/[0.02]">
      <div className="text-2xl md:text-3xl font-light text-white mb-1">{value}</div>
      <div className="text-xs text-white/40 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function FlowStep({ 
  step, 
  index, 
  isLast 
}: { 
  step: typeof operationalFlow[0]; 
  index: number;
  isLast: boolean;
}) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20",
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-400 group-hover:bg-purple-500/20",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400 group-hover:bg-amber-500/20",
    rose: "bg-rose-500/10 border-rose-500/20 text-rose-400 group-hover:bg-rose-500/20",
    cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="p-6 bg-[#050505] border border-white/10 hover:border-white/20 transition-all duration-300 text-center">
        {/* Step Number */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#0a0a0a] border border-white/10 flex items-center justify-center">
          <span className="text-[10px] font-mono text-white/40">{String(index + 1).padStart(2, '0')}</span>
        </div>

        {/* Icon */}
        <div className={cn(
          "w-14 h-14 mx-auto mb-4 flex items-center justify-center border transition-all duration-300",
          colorClasses[step.color]
        )}>
          <step.icon className="w-6 h-6" />
        </div>

        {/* Content */}
        <h4 className="text-sm font-medium text-white mb-1">{step.title}</h4>
        <p className="text-xs text-white/40">{step.desc}</p>
      </div>

      {/* Connector Arrow (hidden on last item and mobile) */}
      {!isLast && (
        <div className="hidden lg:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
          <CircleDot className="w-4 h-4 text-white/20" />
        </div>
      )}
    </motion.div>
  );
}