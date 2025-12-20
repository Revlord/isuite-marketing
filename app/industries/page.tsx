"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { 
  Factory, Package, ShoppingCart, Calculator, Building, 
  FlaskConical, Activity, ShieldCheck, ScanBarcode, Store, 
  Ticket, TrendingUp, Warehouse, Hammer, Users, Truck, 
  FileText, Landmark, ArrowRight, Check, Hexagon, Target,
  Cpu, Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data ---

const industries = [
  {
    id: "pharma",
    title: "Pharmaceutical & Life Sciences",
    shortTitle: "Pharma",
    description: "End-to-end traceability, quality control, and compliance management for highly regulated environments where accuracy isn't optional.",
    image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=2070&auto=format&fit=crop",
    challenges: [
      "Batch tracking and genealogy requirements",
      "Regulatory documentation burden (FDA, GMP)",
      "Quality control at every production stage",
      "Equipment validation and maintenance"
    ],
    solutions: [
      { 
        title: "Complete Batch Traceability", 
        icon: ScanBarcode, 
        desc: "Full genealogy from raw material to finished good. Manage shelf-life, FEFO picking, and recall capabilities automatically.",
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop"
      },
      { 
        title: "Integrated Quality Control", 
        icon: Activity, 
        desc: "QC tests at receiving, production, and dispatch. Pass/fail workflows, certificates of analysis, and deviation tracking.",
        image: "https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "Regulatory Compliance", 
        icon: ShieldCheck, 
        desc: "21 CFR Part 11 compliance, electronic signatures, and immutable audit trails designed for FDA and GMP requirements.",
        image: "https://images.unsplash.com/photo-1555447405-058428d1ac79?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "R&D & Formulation", 
        icon: FlaskConical, 
        desc: "Manage formulation development, clinical trial supplies, and new product introduction with complete documentation.",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop"
      },
    ]
  },
  {
    id: "manufacturing",
    title: "Industrial Manufacturing",
    shortTitle: "Manufacturing",
    description: "Optimize production lines, manage complex inventories, and streamline procurement with precision that keeps operations running.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    challenges: [
      "Complex production scheduling across lines",
      "Multi-level BOM management",
      "Inventory optimization across locations",
      "Vendor and supply chain coordination"
    ],
    solutions: [
      { 
        title: "Production Planning & Control", 
        icon: Factory, 
        desc: "Master production scheduling, machine capacity tracking, BOM management, and lean manufacturing support.",
        image: "https://images.unsplash.com/photo-1565514020176-dbf2277f18f3?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "Real-Time Inventory", 
        icon: Package, 
        desc: "Live stock visibility across locations. Smart reordering, transfer routing, and dynamic forecasting.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "Integrated Procurement", 
        icon: ShoppingCart, 
        desc: "From supplier evaluation to contract execution. Automated approvals, 3-way matching, and cost reduction.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
      },
    ]
  },
  {
    id: "retail",
    title: "Retail & FMCG",
    shortTitle: "Retail",
    description: "Unify your supply chain from warehouse to storefront. Manage POS, pricing, promotions, and distribution in real-time.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    challenges: [
      "Multi-store pricing and promotion management",
      "Real-time inventory visibility",
      "Customer retention and loyalty",
      "Demand planning and stock optimization"
    ],
    solutions: [
      { 
        title: "Store Operations", 
        icon: Store, 
        desc: "Centralized control over multi-store pricing, promotions, and stock. Real-time sales data from every location.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "Loyalty & Customer Management", 
        icon: Ticket, 
        desc: "Configurable rewards programs, gift cards, and customer tiering to drive retention and repeat business.",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2071&auto=format&fit=crop"
      },
      { 
        title: "Demand Planning", 
        icon: TrendingUp, 
        desc: "Forecast demand based on historical sales, seasonality, and trends to optimize stock levels.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2064&auto=format&fit=crop"
      },
    ]
  },
  {
    id: "construction",
    title: "Construction & Infrastructure",
    shortTitle: "Construction",
    description: "Deliver projects on time and on budget. Manage job costing, subcontractors, and site inventory with complete visibility.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
    challenges: [
      "Budget overruns and cost control",
      "Subcontractor management complexity",
      "Material tracking across multiple sites",
      "Progress billing and cash flow"
    ],
    solutions: [
      { 
        title: "Job Costing & BOQ", 
        icon: Calculator, 
        desc: "Track material, labor, and overhead costs against BOQ. Real-time budget vs. actual analysis.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop"
      },
      { 
        title: "Subcontractor Management", 
        icon: Hammer, 
        desc: "Work orders, progress claims, and retention money management for all your subcontractors.",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "Site Inventory Control", 
        icon: Warehouse, 
        desc: "Track material consumption at sites, inter-site transfers, and prevent wastage and pilferage.",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
      },
    ]
  },
  {
    id: "finance",
    title: "Financial Services",
    shortTitle: "Finance",
    description: "A fortress for your financial data. Manage multi-entity structures, complex tax regimes, and high-volume transactions with precision.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    challenges: [
      "Multi-entity consolidation complexity",
      "Regulatory and tax compliance",
      "High-volume transaction processing",
      "Audit readiness and documentation"
    ],
    solutions: [
      { 
        title: "Multi-Entity Finance", 
        icon: Landmark, 
        desc: "Advanced budgeting, cost centers, real-time reporting, multi-tax structures, and audit-ready accuracy.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop"
      },
      { 
        title: "Comprehensive Accounting", 
        icon: Calculator, 
        desc: "Double-entry ledger, journal entries, AP/AR, payroll, and real-time trial balances. Fully integrated.",
        image: "https://images.unsplash.com/photo-1554224154-260327c00c40?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "Fixed Asset Management", 
        icon: Building, 
        desc: "Acquisition to retirement — depreciation tracking, transfers, maintenance, and complete lifecycle visibility.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
      },
    ]
  },
  {
    id: "distribution",
    title: "Distribution & Logistics",
    shortTitle: "Distribution",
    description: "Drive revenue and deliver on promises. From the first order to the final mile, maintain total control over your supply chain.",
    image: "https://images.unsplash.com/photo-1494412574643-35d324698188?q=80&w=2070&auto=format&fit=crop",
    challenges: [
      "Order-to-delivery cycle time",
      "Fleet and logistics management",
      "Customer service complexity",
      "Margin protection and pricing"
    ],
    solutions: [
      { 
        title: "Sales & Distribution", 
        icon: TrendingUp, 
        desc: "360° control over orders, pricing, delivery, billing, and credit management. Complete quote-to-cash.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2064&auto=format&fit=crop"
      },
      { 
        title: "Fleet Management", 
        icon: Truck, 
        desc: "Track company fleet, monitor costs, schedule maintenance, and manage vehicle compliance.",
        image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "Customer Service", 
        icon: Users, 
        desc: "Ticket management, SLA tracking, resolution analytics, and complete customer history in one view.",
        image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2069&auto=format&fit=crop"
      },
    ]
  }
];

// --- Page Component ---

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-white text-black selection:bg-black/10">
      <Navbar />
      
      <Hero />
      <WhySection />
      <ImpactStats />
      
      <div className="relative">
        {industries.map((ind, i) => (
          <IndustrySection key={ind.id} industry={ind} index={i} />
        ))}
      </div>

      <CTASection />
      <Footer />
    </main>
  );
}

// --- Geometric Industry Icon ---

function IndustryGeometricIcon({ index }: { index: number }) {
  const shapes = [
    // Pharma - Hexagonal molecular structure
    <div key="pharma" className="relative w-full h-full">
      <div className="absolute inset-4 border border-black/20 rotate-[30deg]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
      <div className="absolute inset-8 border border-black/15 rotate-[60deg]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
      <div className="absolute inset-12 bg-black/5 flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
        <FlaskConical className="w-6 h-6 text-black/40" />
      </div>
    </div>,
    // Manufacturing - Interlocking gears
    <div key="manufacturing" className="relative w-full h-full">
      <div className="absolute inset-2 border border-black/20 rounded-full animate-[spin_30s_linear_infinite]" />
      <div className="absolute inset-6 border border-dashed border-black/15 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
      <div className="absolute inset-10 border border-black/10 rounded-full animate-[spin_40s_linear_infinite]" />
      <div className="absolute inset-14 bg-black/5 rounded-full flex items-center justify-center">
        <Factory className="w-6 h-6 text-black/40" />
      </div>
    </div>,
    // Retail - Grid network
    <div key="retail" className="relative w-full h-full">
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="border border-black/10" />
        ))}
      </div>
      <div className="absolute inset-8 bg-white/80 flex items-center justify-center border border-black/20">
        <Store className="w-6 h-6 text-black/40" />
      </div>
    </div>,
    // Construction - Layered structure
    <div key="construction" className="relative w-full h-full">
      <div className="absolute inset-2 border-2 border-black/10" />
      <div className="absolute inset-6 border-2 border-black/15 rotate-3" />
      <div className="absolute inset-10 border-2 border-black/20 -rotate-3" />
      <div className="absolute inset-14 bg-black/5 flex items-center justify-center">
        <Building className="w-6 h-6 text-black/40" />
      </div>
    </div>,
    // Finance - Concentric squares
    <div key="finance" className="relative w-full h-full">
      <div className="absolute inset-2 border border-black/10 rotate-45" />
      <div className="absolute inset-6 border border-black/15 rotate-[22.5deg]" />
      <div className="absolute inset-10 border border-black/20" />
      <div className="absolute inset-14 bg-black/5 flex items-center justify-center">
        <Landmark className="w-6 h-6 text-black/40" />
      </div>
    </div>,
    // Distribution - Network nodes
    <div key="distribution" className="relative w-full h-full">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/20 rounded-full" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/20 rounded-full" />
      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-black/20 rounded-full" />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-black/20 rounded-full" />
      <div className="absolute top-2 left-1/2 w-px h-[calc(50%-8px)] bg-black/10" />
      <div className="absolute bottom-2 left-1/2 w-px h-[calc(50%-8px)] bg-black/10" />
      <div className="absolute left-2 top-1/2 w-[calc(50%-8px)] h-px bg-black/10" />
      <div className="absolute right-2 top-1/2 w-[calc(50%-8px)] h-px bg-black/10" style={{ right: 'auto', left: '50%' }} />
      <div className="absolute inset-10 bg-black/5 rounded-full flex items-center justify-center">
        <Truck className="w-6 h-6 text-black/40" />
      </div>
    </div>,
  ];

  return (
    <div className="w-32 h-32 md:w-40 md:h-40">
      {shapes[index % shapes.length]}
    </div>
  );
}

// --- Section Components ---

function Hero() {
  const industryIndex = [
    { num: "01", name: "Pharma", id: "pharma" },
    { num: "02", name: "Manufacturing", id: "manufacturing" },
    { num: "03", name: "Retail", id: "retail" },
    { num: "04", name: "Construction", id: "construction" },
    { num: "05", name: "Finance", id: "finance" },
    { num: "06", name: "Distribution", id: "distribution" },
  ];

  return (
    <section className="relative min-h-screen border-b border-black/10 overflow-hidden">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="min-h-screen flex flex-col lg:flex-row">
          
          {/* Left: Main Content */}
          <div className="flex-1 flex flex-col justify-center py-32 lg:py-0 lg:pr-16 relative">
            {/* Subtle grid - Left side only */}
            <div className="absolute inset-y-0 right-0 w-screen bg-[linear-gradient(to_right,#00000009_1px,transparent_1px),linear-gradient(to_bottom,#00000009_1px,transparent_1px)] bg-[size:80px_80px] bg-right-top -z-10 pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-black/40">
                [ Industry Solutions ]
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.95] mb-8 text-black"
            >
              Precision for <br/>
              <span className="text-black/30">Every Sector.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg md:text-xl text-black/50 max-w-xl font-light leading-relaxed mb-10"
            >
              From pharmaceutical compliance to manufacturing complexity — 
              solutions built for industries where "good enough" isn't.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="rounded-none h-14 px-8 bg-black text-white hover:bg-black/80">
                <Link href="#pharma">Explore Below</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none h-14 px-8 border-black/20 hover:bg-black/5">
                <Link href="/contact">Book a Consultation</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right: Industry Index */}
          <div className="lg:w-80 flex flex-col justify-center py-16 lg:py-0 lg:border-l border-black/10 lg:pl-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-1"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/30 mb-6 block">
                Index
              </span>
              
              {industryIndex.map((ind, i) => (
                <motion.a
                  key={ind.id}
                  href={`#${ind.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                  className="group flex items-center gap-4 py-3 border-b border-black/5 hover:border-black/20 transition-colors cursor-pointer"
                >
                  <span className="text-xs font-mono text-black/30 group-hover:text-black/60 transition-colors">
                    {ind.num}
                  </span>
                  <span className="text-lg font-light text-black/60 group-hover:text-black transition-colors">
                    {ind.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-black/0 group-hover:text-black/40 ml-auto transition-all group-hover:translate-x-1" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />
    </section>
  );
}

function WhySection() {
  const features = [
    { title: "Deep Industry Knowledge", desc: "Solutions shaped by real operational requirements, not generic templates." },
    { title: "Compliance Built In", desc: "Regulatory requirements aren't afterthoughts. They're foundational." },
    { title: "Rapid Adaptation", desc: "When requirements change, your system changes with them. In days." },
    { title: "Proven at Scale", desc: "Trusted by organizations handling real-world, high-volume operations." },
  ];

  return (
    <section className="py-20 md:py-24 px-6 border-b border-black/10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-2xl md:text-4xl font-light mb-6">
              Why Industry Leaders <span className="text-black/40">Choose iSuite</span>
            </h2>
            <p className="text-black/60 leading-relaxed">
              We don't just provide software — we provide a competitive advantage. 
              Our platform adapts to the most demanding industrial environments because 
              it was built to be flexible from the ground up.
            </p>
          </div>
          
          {/* Geometric Visual */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 border border-black/10 rotate-45 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-4 border border-black/15 rotate-12" />
              <div className="absolute inset-8 border border-black/20 -rotate-12" />
              <div className="absolute inset-12 bg-black/5 flex items-center justify-center">
                <Target className="w-8 h-8 text-black/40" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="space-y-3">
              <div className="w-8 h-px bg-black/30 mb-4" />
              <h3 className="text-lg font-medium text-black">{f.title}</h3>
              <p className="text-sm text-black/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactStats() {
  return (
    <section className="py-16 px-6 border-b border-black/10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-5xl font-light text-black mb-2">6+</div>
            <div className="text-sm text-black/40 uppercase tracking-wider">Industries Served</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-light text-black mb-2">Weeks</div>
            <div className="text-sm text-black/40 uppercase tracking-wider">To Deploy</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-light text-black mb-2">100%</div>
            <div className="text-sm text-black/40 uppercase tracking-wider">Customizable</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-light text-black mb-2">Global</div>
            <div className="text-sm text-black/40 uppercase tracking-wider">Compliance Ready</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustrySection({ industry, index }: { industry: typeof industries[0], index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const [activeImage, setActiveImage] = useState(industry.image);
  const [activeSolutionIndex, setActiveSolutionIndex] = useState<number | null>(null);

  const isEven = index % 2 === 0;

  return (
    <div 
      ref={ref} 
      id={industry.id} 
      className={cn(
        "min-h-screen flex flex-col border-b border-black/10 last:border-0",
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      {/* Sticky Image Panel */}
      <div className="lg:w-1/2 relative flex flex-col justify-center lg:sticky lg:top-0 lg:h-screen z-10 overflow-hidden bg-white">
        {/* Background Image Transition */}
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={activeImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <Image 
              src={activeImage}
              alt={industry.title}
              fill
              className="object-cover opacity-20"
            />
            <div className={cn(
              "absolute inset-0",
              isEven 
                ? "bg-gradient-to-r from-white/40 via-white/10 to-transparent" 
                : "bg-gradient-to-l from-white/40 via-white/10 to-transparent"
            )}></div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 p-6 md:p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: isEven ? -20 : 20 }}
            transition={{ duration: 0.6 }}
          >
            {/* Industry Geometric Icon */}
            <div className="mb-6">
              <IndustryGeometricIcon index={index} />
            </div>
            
            <span className="text-xs font-mono text-black/40 mb-4 block uppercase tracking-widest">
              {String(index + 1).padStart(2, '0')} / {industry.shortTitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-black">{industry.title}</h2>
            <p className="text-lg text-black/70 leading-relaxed max-w-md mb-8">
              {industry.description}
            </p>

            {/* Challenges */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-black/40 mb-3 block">Key Challenges We Solve</span>
              {industry.challenges.map((challenge, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-black/60">
                  <Check className="w-4 h-4 text-black/40 shrink-0" />
                  <span>{challenge}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scrollable Solutions Panel */}
      <div className="lg:w-1/2 bg-gray-50">
        <div className="p-8 md:p-12 lg:p-16 space-y-16">
          <div>
            <span className="text-xs uppercase tracking-widest text-black/40 mb-2 block">How iSuite Helps</span>
            <h3 className="text-2xl font-light text-black/80">Industry-Specific Capabilities</h3>
          </div>

          {industry.solutions.map((solution, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer"
              onMouseEnter={() => {
                setActiveImage(solution.image);
                setActiveSolutionIndex(i);
              }}
              onMouseLeave={() => {
                setActiveSolutionIndex(null);
              }}
            >
              <div className="flex items-start gap-6">
                <div className={cn(
                  "p-4 border transition-all duration-300",
                  activeSolutionIndex === i 
                    ? "bg-black text-white border-black" 
                    : "bg-black/5 border-black/10 text-black/80 group-hover:bg-black/10"
                )}>
                  <solution.icon className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h4 className={cn(
                    "text-xl font-medium transition-colors duration-300",
                    activeSolutionIndex === i ? "text-black" : "text-black/70 group-hover:text-black"
                  )}>
                    {solution.title}
                  </h4>
                  <p className="text-black/50 leading-relaxed">
                    {solution.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* CTA */}
          <div className="pt-8 border-t border-black/10">
            <Button asChild variant="outline" className="border-black/20 text-black hover:bg-black hover:text-white rounded-none h-12 px-8 transition-colors">
              <Link href="/contact">
                Discuss {industry.shortTitle} Solution <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <section className="py-32 px-6 bg-black text-white relative overflow-hidden">
      {/* Geometric background for CTA */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          <div className="absolute inset-0 border border-white/5 rounded-full" />
          <div className="absolute inset-[15%] border border-white/10 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-[30%] border border-dashed border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">
          Your Industry. <br/>
          <span className="text-white/40">Your Requirements.</span>
        </h2>
        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
          Every industry has unique challenges. Let us show you how iSuite addresses 
          the specific requirements of your sector.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            className="bg-white text-black hover:bg-white/90 rounded-none h-14 px-10 text-sm uppercase tracking-wider font-semibold transition-colors"
          >
            <Link href="/contact">
              Request Industry Demo
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/20 text-black hover:bg-white/10 hover:text-white rounded-none h-14 px-10 text-sm uppercase tracking-wider transition-colors"
          >
            <Link href="/solutions">
              Explore Solutions
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}