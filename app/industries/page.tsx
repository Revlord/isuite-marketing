"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { 
  Factory, Package, ShoppingCart, Landmark, Calculator, Building, Coins, 
  Users, Kanban, FileText, GraduationCap, TrendingUp, Truck, Headset, Megaphone,
  Cpu, Layers, Workflow, Database, Printer, LayoutDashboard, FileInput, MousePointerClick,
  FlaskConical, Activity, ShieldCheck, ScanBarcode, Store, Ticket, Warehouse, Hammer
} from "lucide-react";
import { cn } from "@/lib/utils";
import VideoPlayer from "@/components/VideoPlayer";

// --- Data ---

const industries = [
  {
    id: "pharma",
    title: "Pharmaceutical & Life Sciences",
    description: "End-to-end traceability, quality control, and compliance management for highly regulated environments.",
    image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=2070&auto=format&fit=crop",
    modules: [
      { 
        title: "Quality Control (QC)", 
        icon: Activity, 
        desc: "Integrated QC tests at receiving, production, and dispatch with pass/fail workflows and certificates of analysis.",
        image: "https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "Batch & Expiry Tracking", 
        icon: ScanBarcode, 
        desc: "Complete genealogy tracking from raw material to finished good. Manage shelf-life and FEFO picking automatically.",
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop"
      },
      { 
        title: "Regulatory Compliance", 
        icon: ShieldCheck, 
        desc: "21 CFR Part 11 compliance, electronic signatures, and audit trails designed for FDA and GMP requirements.",
        image: "https://images.unsplash.com/photo-1555447405-058428d1ac79?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "R&D Projects", 
        icon: FlaskConical, 
        desc: "Manage formulation development, clinical trial supplies, and new product introduction projects.",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop"
      },
    ]
  },
  {
    id: "manufacturing",
    title: "Manufacturing & Supply Chain",
    description: "Optimize production lines, manage complex inventories, and streamline procurement with military-grade precision.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    modules: [
      { 
        title: "Manufacturing (MRP)", 
        icon: Factory, 
        desc: "Master production scheduling, machine capacity tracking, BoM management, QA workflows, and lean manufacturing support.",
        image: "https://images.unsplash.com/photo-1565514020176-dbf2277f18f3?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "Inventory Management", 
        icon: Package, 
        desc: "Real-time inventory tracking, smart reordering, transfer routing, and dynamic stock forecasting across locations.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "Procurement", 
        icon: ShoppingCart, 
        desc: "From supplier evaluation to contract execution, manage sourcing with total visibility. Automate approvals and reduce cost per purchase.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
      },
    ]
  },
  {
    id: "retail",
    title: "Retail & FMCG",
    description: "Unify your supply chain from warehouse to storefront. Manage POS, loyalty, and distribution in real-time.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    modules: [
      { 
        title: "POS & Store Operations", 
        icon: Store, 
        desc: "Centralized control over multi-store pricing, promotions, and stock. Real-time sales data from every register.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "Loyalty Management", 
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
    description: "Deliver projects on time and on budget. Manage job costing, subcontractors, and site inventory.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
    modules: [
      { 
        title: "Job Costing", 
        icon: Calculator, 
        desc: "Track material, labor, and overhead costs against BOQ. Real-time budget vs. actual analysis.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop"
      },
      { 
        title: "Subcontractor Mgmt", 
        icon: Hammer, 
        desc: "Manage work orders, progress claims, and retention money for all your subcontractors.",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "Site Inventory", 
        icon: Warehouse, 
        desc: "Track material consumption at sites, transfers between sites, and prevent pilferage.",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
      },
    ]
  },
  {
    id: "finance",
    title: "Global Finance & Banking",
    description: "A fortress for your financial data. Manage multi-entity structures, complex tax regimes, and high-volume transactions.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    modules: [
      { 
        title: "Financial Management", 
        icon: Landmark, 
        desc: "Advanced budgeting, cost centers, real-time reporting, multi-tax structures, and audit-ready accuracy.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop"
      },
      { 
        title: "Accounting Software", 
        icon: Calculator, 
        desc: "Double-entry ledger, journal entries, AP/AR, payroll, and real-time trial balances. Fully integrated and compliant.",
        image: "https://images.unsplash.com/photo-1554224154-260327c00c40?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "Fixed Assets", 
        icon: Building, 
        desc: "From acquisition to retirement—track depreciation, transfers, maintenance, and cost visibility at every asset lifecycle stage.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
      },
      { 
        title: "Fixed Deposit Software", 
        icon: Coins, 
        desc: "Complete FD lifecycle: interest calculations, maturity management, account integration, and security-first architecture.",
        image: "https://images.unsplash.com/photo-1621905251189-fc01530c6c37?q=80&w=2070&auto=format&fit=crop"
      },
    ]
  },
  {
    id: "operations",
    title: "Enterprise Operations",
    description: "The operating system for your workforce. Unify HR, projects, and knowledge management in a single secure environment.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    modules: [
      { 
        title: "HR & Payroll", 
        icon: Users, 
        desc: "Hire-to-retire automation: employee records, attendance, payroll cycles, compliance, and performance reviews.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
      },
      { 
        title: "Project Management", 
        icon: Kanban, 
        desc: "Manage complex projects with task planning, resource assignment, timelines, and actual-vs-planned analysis.",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "Document Management", 
        icon: FileText, 
        desc: "Version control, access rights, digital signatures, and automated approval flows.",
        image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "LMS", 
        icon: GraduationCap, 
        desc: "Train your teams with role-based courses, assessments, and certifications—all from one dashboard.",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2067&auto=format&fit=crop"
      },
    ]
  },
  {
    id: "commercial",
    title: "Commercial & Logistics",
    description: "Drive revenue and deliver on promises. From the first lead to the final mile, maintain total control.",
    image: "https://images.unsplash.com/photo-1494412574643-35d324698188?q=80&w=2070&auto=format&fit=crop",
    modules: [
      { 
        title: "Sales & Distribution", 
        icon: TrendingUp, 
        desc: "360° control over customer/vendor lifecycles, orders, pricing, delivery, billing, and credit management.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2064&auto=format&fit=crop"
      },
      { 
        title: "Vehicle Management", 
        icon: Truck, 
        desc: "Track company fleet, monitor costs, schedule maintenance, and manage vehicle compliance.",
        image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        title: "Customer Service", 
        icon: Headset, 
        desc: "Ticket management, SLA tracking, resolution analytics, and customer history in one unified view.",
        image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2069&auto=format&fit=crop"
      },
      { 
        title: "Marketing Software", 
        icon: Megaphone, 
        desc: "Campaign planning, lead scoring, contact segmentation, omnichannel execution, and ROI analysis.",
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=2070&auto=format&fit=crop"
      },
    ]
  }
];

const platformTools = [
  { title: "Workflow Engine", icon: Workflow, desc: "Automate anything. Define business logic and let iSuite execute." },
  { title: "Report Builder", icon: FileText, desc: "Drag-and-drop interface to build data-rich reports across any module." },
  { title: "Dashboard Builder", icon: LayoutDashboard, desc: "Build real-time KPI dashboards. Visualize performance. Take action fast." },
  { title: "Transaction Builder", icon: MousePointerClick, desc: "Design custom forms and workflows without writing a single line of code." },
  { title: "Data Import Engine", icon: Database, desc: "Bulk import without chaos. Smart mapping and clean rollback options." },
  { title: "Print Builder", icon: Printer, desc: "Custom print layouts tailored to your organization’s formats." },
];

// --- Components ---

function Hero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center items-center px-6 pt-20 overflow-hidden border-b border-white/10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Background"
            fill
            className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/50 to-[#0a0a0a]"></div>
      </div>
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/50 mb-6">iSuite Software Solutions</h2>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-6">
            One Platform. <br/>
            <span className="text-white/50">Total Control.</span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
        >
          We deliver the foundation upon which modern enterprises operate, adapt, and scale. 
          Designed by seasoned technologists to rival and surpass legacy platforms.
        </motion.p>
      </div>
    </section>
  );
}

function WhySection() {
  const features = [
    { title: "Built for Scale", desc: "Modular architecture supports everything from startups to complex enterprises." },
    { title: "Battle-Tested", desc: "Trusted by large institutions to handle real-world, high-volume operations." },
    { title: "Tactical Precision", desc: "Every module is purpose-built to address real business pain points with elegance." },
    { title: "No Bloat", desc: "Fast to deploy, easy to configure, and ready to integrate." },
  ];

  return (
    <section className="py-24 px-6 border-b border-white/10 bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 opacity-5">
         <Image 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
            alt="Texture"
            fill
            className="object-cover"
         />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div>
                <h2 className="text-3xl md:text-4xl font-light mb-6">Why Industry Leaders Choose iSuite</h2>
                <p className="text-white/60 leading-relaxed">
                    We don't just provide software; we provide a competitive advantage. 
                    See how our platform adapts to the most demanding industrial environments.
                </p>
            </div>
            <div className="relative">
                <VideoPlayer title="Industry Impact" coverImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" />
            </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="space-y-3">
              <div className="w-8 h-px bg-white/50 mb-4" />
              <h3 className="text-lg font-medium text-white">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="py-20 px-6 border-b border-white/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-light text-white mb-2">40%</div>
            <div className="text-sm text-white/50 uppercase tracking-wider">Efficiency Gain</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-light text-white mb-2">2.5x</div>
            <div className="text-sm text-white/50 uppercase tracking-wider">Faster Deployment</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-light text-white mb-2">99.9%</div>
            <div className="text-sm text-white/50 uppercase tracking-wider">Uptime SLA</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-light text-white mb-2">Global</div>
            <div className="text-sm text-white/50 uppercase tracking-wider">Compliance Ready</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function IndustrySection({ industry, index }: { industry: typeof industries[0], index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const [activeImage, setActiveImage] = useState(industry.image);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number | null>(null);

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} id={industry.id} className={cn(
        "min-h-screen flex flex-col border-b border-white/10 last:border-0",
        isEven ? "md:flex-row" : "md:flex-row-reverse"
    )}>
      {/* Sticky Panel with Image Background */}
      <div className="md:w-1/2 relative flex flex-col justify-center md:sticky md:top-0 md:h-screen z-10 border-r border-white/10 overflow-hidden bg-black">
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
                <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-black/20"></div>
            </motion.div>
        </AnimatePresence>

        <div className="relative z-10 p-12 md:p-24">
            <motion.div
                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: isEven ? -20 : 20 }}
                transition={{ duration: 0.6 }}
            >
                <span className="text-xs font-mono text-white/40 mb-4 block">0{index + 1} / SECTOR</span>
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">{industry.title}</h2>
                <p className="text-lg text-white/80 leading-relaxed max-w-md drop-shadow-md">
                    {industry.description}
                </p>
            </motion.div>
        </div>
      </div>

      {/* Scrollable Panel */}
      <div className="md:w-1/2 bg-[#0f0f0f]">
        <div className="p-12 md:p-24 space-y-24">
          {industry.modules.map((mod, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer"
              onMouseEnter={() => {
                  setActiveImage(mod.image);
                  setActiveModuleIndex(i);
              }}
              onMouseLeave={() => {
                  // Optional: Reset to main industry image or keep last active
                  // setActiveImage(industry.image); 
                  // setActiveModuleIndex(null);
              }}
            >
              <div className="flex items-start gap-6">
                <div className={cn(
                    "p-4 border rounded-sm transition-all duration-300",
                    activeModuleIndex === i 
                        ? "bg-white text-black border-white" 
                        : "bg-white/5 border-white/10 text-white/80 group-hover:bg-white/10"
                )}>
                  <mod.icon className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h3 className={cn(
                      "text-xl font-medium transition-colors duration-300",
                      activeModuleIndex === i ? "text-white" : "text-white/60 group-hover:text-white"
                  )}>
                    {mod.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlatformToolkit() {
  return (
    <section className="py-32 px-6 bg-[#050505] border-t border-white/10 relative overflow-hidden">
       {/* Background Image */}
       <div className="absolute inset-0 z-0 opacity-10">
        <Image 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
            alt="Tech Background"
            fill
            className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Platform & Productivity Toolkit</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Extend, customize, and automate. The iSuite toolkit gives you the power to build your own workflows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {platformTools.map((tool, i) => (
            <div key={i} className="p-8 bg-[#0a0a0a]/80 backdrop-blur-sm hover:bg-[#111]/90 transition-colors group">
              <div className="mb-6 text-white/40 group-hover:text-white transition-colors">
                <tool.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-white mb-3">{tool.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="py-32 px-6 bg-white text-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 relative z-10">
        <div>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-8">
            Activate iSuite <br/> Across the Enterprise
          </h2>
          <p className="text-lg text-black/60 max-w-md leading-relaxed mb-12">
            Whether you're migrating from a legacy ERP or scaling into your first full-suite system, iSuite provides a smoother, smarter path forward.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-black/20"></div>
              <span className="text-sm font-medium uppercase tracking-wider">Built to Outperform</span>
            </div>
            <ul className="space-y-2 text-black/70 ml-16">
              <li>• Faster deployment cycles</li>
              <li>• Easier customization</li>
              <li>• Intuitive UI/UX</li>
              <li>• Lower total cost of ownership</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-8 md:p-12 border border-gray-200 relative">
          <form className="space-y-6 relative z-10">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">First Name</label>
                <input type="text" className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">Last Name</label>
                <input type="text" className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-black/50">Email Address</label>
              <input type="email" className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-black/50">Company Name</label>
              <input type="text" className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors" />
            </div>

            <div className="space-y-2 pt-4">
              <label className="text-xs font-bold uppercase tracking-wider text-black/50">Tell us about your needs</label>
              <textarea className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors min-h-[100px] resize-none"></textarea>
            </div>

            <div className="pt-6">
              <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-none h-14 text-sm uppercase tracking-wider font-semibold">
                Submit Request
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20">
      <Navbar />
      <Hero />
      <WhySection />
      <ImpactSection />
      
      <div className="relative">
        {industries.map((ind, i) => (
          <IndustrySection key={ind.id} industry={ind} index={i} />
        ))}
      </div>

      <PlatformToolkit />
      <ContactSection />
      <Footer />
    </main>
  );
}
