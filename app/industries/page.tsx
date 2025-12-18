"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { 
  Factory, Package, ShoppingCart, Calculator, Building, 
  FlaskConical, Activity, ShieldCheck, ScanBarcode, Store, 
  Ticket, TrendingUp, Warehouse, Hammer, Users, Truck, 
  FileText, Landmark, ArrowRight, Check
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
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
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

// --- Section Components ---

function Hero() {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center items-center px-6 pt-20 overflow-hidden border-b border-white/10">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          alt="Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:48px_48px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-xs font-medium uppercase tracking-[0.2em] text-white/60 bg-white/5">
            Industry Solutions
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-7xl font-light tracking-tight leading-[1.1] mb-8"
        >
          Built for Industries <br/>
          <span className="text-white/40">That Demand Precision.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed"
        >
          From pharmaceutical compliance to manufacturing complexity, iSuite delivers 
          the depth these industries require — without the rigidity they've come to expect.
        </motion.p>
      </div>
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
    <section className="py-20 md:py-24 px-6 border-b border-white/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-2xl md:text-4xl font-light mb-6">
              Why Industry Leaders <span className="text-white/40">Choose iSuite</span>
            </h2>
            <p className="text-white/60 leading-relaxed">
              We don't just provide software — we provide a competitive advantage. 
              Our platform adapts to the most demanding industrial environments because 
              it was built to be flexible from the ground up.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="space-y-3">
              <div className="w-8 h-px bg-white/30 mb-4" />
              <h3 className="text-lg font-medium text-white">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactStats() {
  return (
    <section className="py-16 px-6 border-b border-white/10 bg-[#030303]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-5xl font-light text-white mb-2">6+</div>
            <div className="text-sm text-white/40 uppercase tracking-wider">Industries Served</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-light text-white mb-2">Weeks</div>
            <div className="text-sm text-white/40 uppercase tracking-wider">To Deploy</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-light text-white mb-2">100%</div>
            <div className="text-sm text-white/40 uppercase tracking-wider">Customizable</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-light text-white mb-2">Global</div>
            <div className="text-sm text-white/40 uppercase tracking-wider">Compliance Ready</div>
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
        "min-h-screen flex flex-col border-b border-white/10 last:border-0",
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      {/* Sticky Image Panel */}
      <div className="lg:w-1/2 relative flex flex-col justify-center lg:sticky lg:top-0 lg:h-screen z-10 overflow-hidden bg-black">
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
              className="object-cover opacity-50"
            />
            <div className={cn(
              "absolute inset-0",
              isEven 
                ? "bg-gradient-to-r from-black/90 via-black/60 to-black/30" 
                : "bg-gradient-to-l from-black/90 via-black/60 to-black/30"
            )}></div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 p-6 md:p-12 lg:p-20">
          <motion.div
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: isEven ? -20 : 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono text-white/40 mb-4 block uppercase tracking-widest">
              {String(index + 1).padStart(2, '0')} / {industry.shortTitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">{industry.title}</h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-md mb-8">
              {industry.description}
            </p>

            {/* Challenges */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-white/40 mb-3 block">Key Challenges We Solve</span>
              {industry.challenges.map((challenge, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/60">
                  <Check className="w-4 h-4 text-emerald-500/70 shrink-0" />
                  <span>{challenge}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scrollable Solutions Panel */}
      <div className="lg:w-1/2 bg-[#0a0a0a]">
        <div className="p-12 lg:p-20 space-y-20">
          <div>
            <span className="text-xs uppercase tracking-widest text-white/40 mb-2 block">How iSuite Helps</span>
            <h3 className="text-2xl font-light text-white/80">Industry-Specific Capabilities</h3>
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
                    ? "bg-white text-black border-white" 
                    : "bg-white/5 border-white/10 text-white/80 group-hover:bg-white/10"
                )}>
                  <solution.icon className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h4 className={cn(
                    "text-xl font-medium transition-colors duration-300",
                    activeSolutionIndex === i ? "text-white" : "text-white/70 group-hover:text-white"
                  )}>
                    {solution.title}
                  </h4>
                  <p className="text-white/50 leading-relaxed">
                    {solution.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* CTA for this industry */}
          <div className="pt-8 border-t border-white/10">
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-none h-12 px-8">
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
    <section className="py-32 px-6 bg-white text-black">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">
          Your Industry. <br/>
          <span className="text-black/40">Your Requirements.</span>
        </h2>
        <p className="text-xl text-black/60 max-w-2xl mx-auto mb-12">
          Every industry has unique challenges. Let us show you how iSuite addresses 
          the specific requirements of your sector.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="bg-black text-white hover:bg-black/90 rounded-none h-14 px-10 text-sm uppercase tracking-wider font-semibold">
            <Link href="/contact">
              Request Industry Demo
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-black/20 text-black hover:bg-black/5 rounded-none h-14 px-10 text-sm uppercase tracking-wider">
            <Link href="/modules">
              Explore Modules
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}