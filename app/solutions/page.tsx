"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { 
  Briefcase, Globe, Box, Layers, Cog, FileText, Users, 
  CheckCircle2, ArrowRight, Target, Zap, TrendingUp,
  Calculator, Truck, Headset, ClipboardList, Settings,
  BarChart3, Package, ShoppingCart, Factory, Landmark,
  Shield, GraduationCap, Wrench, UserCircle, Car, Building2, Vault
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const solutions = [
  {
    id: "dms",
    title: "Document Management",
    icon: FileText,
    tagline: "Every Document. Under Control.",
    heroLine: "Version control that actually works.",
    description: "No more 'which version is latest?' chaos. Centralized document repository with approval workflows, version history, and access controls. SOPs, policies, contracts — organized, searchable, and audit-ready.",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2070&auto=format&fit=crop",
    outcomes: [
      "Single source of truth for all documents",
      "Instant retrieval during audits",
      "Automated review and approval cycles",
      "Complete version history and audit trails"
    ],
    capabilities: [
      "Centralized Document Repository",
      "Version Control & History",
      "Approval Workflows",
      "Access Control & Permissions",
      "Document Templates",
      "Full-Text Search",
      "Expiry & Review Reminders",
      "Audit Trail & Activity Log"
    ]
  },
  {
    id: "lms",
    title: "Learning Management",
    icon: GraduationCap,
    tagline: "Competence. Verified.",
    heroLine: "Train, track, certify — all in one system.",
    description: "Employee training that's tracked, not trusted. Course assignments, completion tracking, certification management, and competency matrices. Compliance training with proof that stands up to inspection.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    outcomes: [
      "100% training compliance visibility",
      "Automated certification renewals",
      "Competency gaps identified proactively",
      "Audit-ready training records"
    ],
    capabilities: [
      "Course & Curriculum Management",
      "Training Assignment & Scheduling",
      "Progress Tracking & Completion",
      "Assessment & Quiz Management",
      "Certification & Expiry Tracking",
      "Competency Matrix",
      "Training Effectiveness Reports",
      "Compliance Training Management"
    ]
  },
  {
    id: "qms",
    title: "Quality Management System",
    icon: Shield,
    tagline: "Zero Defects. Zero Compromises.",
    heroLine: "Enterprise-grade quality control that regulators respect.",
    description: "Not a checkbox exercise — a complete quality ecosystem. From CAPA to calibration, from audit trails to corrective actions, iSuite QMS delivers the depth pharmaceutical, aerospace, and manufacturing leaders demand. FDA 21 CFR Part 11 ready. ISO compliant. Audit-proof.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
    outcomes: [
      "First-pass audit success with complete documentation",
      "CAPA cycle times reduced by 60%+",
      "Zero findings on regulatory inspections",
      "Complete traceability from complaint to resolution",
      "Real-time quality metrics across all operations"
    ],
    capabilities: [
      "Document Control & Version Management",
      "CAPA (Corrective & Preventive Action)",
      "Non-Conformance & Deviation Management",
      "Audit Management (Internal & External)",
      "Calibration & Equipment Qualification",
      "Training Records & Competency Tracking",
      "Supplier Quality Management",
      "Risk Assessment & FMEA",
      "Change Control Management",
      "Complaint Handling & Investigation",
      "Statistical Process Control (SPC)",
      "Management Review & Quality Metrics",
      "Electronic Signatures (21 CFR Part 11)",
      "Batch Record Review & Release"
    ]
  },
  {
    id: "plant-maintenance",
    title: "Plant & Equipment Maintenance",
    icon: Wrench,
    tagline: "Uptime. Maximized.",
    heroLine: "Preventive maintenance that prevents.",
    description: "Equipment downtime kills margins. Our maintenance solution keeps machines running with scheduled PMs, condition monitoring, and spare parts integration. Reactive firefighting becomes proactive planning.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    outcomes: [
      "Unplanned downtime reduced dramatically",
      "Maintenance costs optimized",
      "Equipment lifespan extended",
      "Spare parts availability when needed"
    ],
    capabilities: [
      "Equipment Master & Hierarchy",
      "Preventive Maintenance Scheduling",
      "Work Order Management",
      "Breakdown & Corrective Maintenance",
      "Spare Parts Integration",
      "Maintenance History & Logs",
      "MTBF & MTTR Analytics",
      "Calibration Scheduling"
    ]
  },
  {
    id: "crm",
    title: "Customer Relationship Management",
    icon: UserCircle,
    tagline: "Every Relationship. Nurtured.",
    heroLine: "Know your customers. Grow your business.",
    description: "Pipeline visibility, lead tracking, and customer intelligence that drives revenue. Every interaction logged, every opportunity tracked, every relationship managed with precision.",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop",
    outcomes: [
      "Complete pipeline visibility",
      "Higher conversion rates with lead scoring",
      "Customer lifetime value optimization",
      "Sales team accountability and performance"
    ],
    capabilities: [
      "Lead Capture & Management",
      "Opportunity Pipeline",
      "Contact & Account Management",
      "Activity Tracking & Follow-ups",
      "Quotation Integration",
      "Sales Forecasting",
      "Campaign Management",
      "Customer Analytics & Segmentation"
    ]
  },
  {
    id: "financial",
    title: "Financial Management",
    icon: Landmark,
    tagline: "Every Transaction. Tracked.",
    heroLine: "Complete financial control from quote to cash.",
    description: "Close faster with accurate AR/AP, aging analysis, and real-time cash flow visibility. Multi-currency, multi-entity, fully GST-compliant — without the complexity.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop",
    outcomes: [
      "Real-time financial visibility across all entities",
      "Automated GST compliance and tax calculations",
      "Month-end close in days, not weeks",
      "Audit-ready documentation always available"
    ],
    capabilities: [
      "General Ledger & Journal Management",
      "Accounts Payable & Receivable",
      "Multi-Currency & Exchange Rates",
      "Cost Center & Profit Center Accounting",
      "Bank Reconciliation (BRS)",
      "Budgeting & Variance Analysis",
      "Cash Flow Management",
      "Financial Reporting (Balance Sheet, P&L, Trial Balance)"
    ]
  },
  {
    id: "sales",
    title: "Sales & Distribution",
    icon: TrendingUp,
    tagline: "Quote to Cash. Accelerated.",
    heroLine: "From first contact to final receipt — complete visibility.",
    description: "Intelligent pricing logic, real-time inventory availability, and aligned dispatches. No more 'sorry, out of stock' surprises. Every opportunity tracked, every customer known.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2064&auto=format&fit=crop",
    outcomes: [
      "Shorter order-to-invoice cycles",
      "Higher fill rates with ATP visibility",
      "Clean pricing and promotions management",
      "Complete customer 360° view"
    ],
    capabilities: [
      "Customer Master & Segmentation",
      "Sales Enquiry & Quotation",
      "Sales Order Processing",
      "Pricing & Discount Management",
      "Delivery Scheduling & Dispatch",
      "Invoicing & Billing",
      "Credit Management",
      "Sales Analytics & Pipeline"
    ]
  },
  {
    id: "procurement",
    title: "Procurement",
    icon: ShoppingCart,
    tagline: "Smarter Sourcing. Real Savings.",
    heroLine: "Right material. Right time. Right price.",
    description: "Vendor management, RFQs, purchase orders, contracts, and clean 3-way matching. Procurement that prevents problems before they happen — delivering real savings with fewer escalations.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    outcomes: [
      "Better pricing through vendor comparison",
      "Tighter controls with reduced friction",
      "Fewer invoice disputes with 3-way matching",
      "Strategic vendor relationship management"
    ],
    capabilities: [
      "Purchase Requisition & Approvals",
      "RFQ & Vendor Quotation",
      "Quotation Analysis & Comparison",
      "Purchase Order Management",
      "Goods Receipt Note (GRN)",
      "3-Way Matching (PO-GRN-Invoice)",
      "Vendor Scorecards & Performance",
      "Contract Management"
    ]
  },
  {
    id: "inventory",
    title: "Inventory Management",
    icon: Package,
    tagline: "Zero Surprises. Total Visibility.",
    heroLine: "Every unit accounted for. Across all locations.",
    description: "Real-time stock visibility with lot/serial tracking and turns analysis. Zero surprises during pick/pack/ship. Accuracy that finance trusts and operations relies on.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    outcomes: [
      "Accurate availability across all locations",
      "Healthy inventory turns and reduced carrying costs",
      "Complete lot/serial/batch traceability",
      "Automated reorder point management"
    ],
    capabilities: [
      "Multi-Warehouse Management",
      "Lot/Serial/Batch Tracking",
      "Stock Movement & Transfers",
      "Cycle Counts & Adjustments",
      "Stock Aging & Expiry Management",
      "ABC Classification",
      "Reorder Automation",
      "20+ Inventory Reports"
    ]
  },
  {
    id: "manufacturing",
    title: "Manufacturing (MRP)",
    icon: Factory,
    tagline: "Precision Production.",
    heroLine: "Shop floor to shipping dock. Planned and tracked.",
    description: "Bills of materials, routings, scheduling, and integrated QA — creating realistic production plans that respect machines, materials, and people. Every work order, every component, every quality check.",
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=2070&auto=format&fit=crop",
    outcomes: [
      "Feasible production schedules that hold",
      "Lower WIP and rework rates",
      "Predictable lead times for planning",
      "Real-time production visibility"
    ],
    capabilities: [
      "Multi-Level Bill of Materials",
      "Production Planning & Scheduling",
      "Work Order Management",
      "Routing & Work Centers",
      "Assembly & Stage Tracking",
      "Quality Checkpoints",
      "Backflushing & Scrap Tracking",
      "Capacity Planning & OEE"
    ]
  },
  {
    id: "quality",
    title: "Quality Control",
    icon: ClipboardList,
    tagline: "Quality Built In.",
    heroLine: "Not inspected in. Built in.",
    description: "QC integrated throughout operations — not bolted on. Every checkpoint documented, every issue tracked, every root cause analyzed. Compliance documentation always audit-ready.",
    image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=2070&auto=format&fit=crop",
    outcomes: [
      "Defects caught at source, not at shipment",
      "Complete quality documentation trail",
      "Root cause analysis that drives improvement",
      "Regulatory compliance confidence"
    ],
    capabilities: [
      "QC Checkpoints at Every Stage",
      "Test Parameters & Specifications",
      "Pass/Fail Workflows",
      "Certificate of Analysis",
      "Non-Conformance Management",
      "Root Cause Analysis",
      "Quality Metrics & Reporting",
      "Audit Trail Documentation"
    ]
  },
  {
    id: "service",
    title: "Service Management",
    icon: Headset,
    tagline: "Service Excellence. Delivered.",
    heroLine: "From request to resolution. Complete control.",
    description: "Field service operations under complete control. AMC and warranty tracking that protects revenue. Customer equipment history always accessible. Service delivery, precision managed.",
    image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2069&auto=format&fit=crop",
    outcomes: [
      "Faster service response times",
      "AMC revenue protected and tracked",
      "Complete customer equipment history",
      "Service profitability visibility"
    ],
    capabilities: [
      "Service Request Management",
      "AMC & Warranty Tracking",
      "Technician Scheduling",
      "Visit Planning & Dispatch",
      "Equipment History",
      "Spare Parts Management",
      "Service Invoicing",
      "SLA Tracking & Analytics"
    ]
  },
  {
    id: "hr",
    title: "HR & Payroll",
    icon: Users,
    tagline: "Your People. Professionally Managed.",
    heroLine: "Hire to retire. All integrated.",
    description: "Employee lifecycle management without spreadsheet chaos. Attendance, leave, payroll processing, and compliance — unified in one system that talks to your financials.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop",
    outcomes: [
      "Payroll processed accurately, on time",
      "Attendance tracking without manual effort",
      "Compliance requirements handled",
      "HR data that informs decisions"
    ],
    capabilities: [
      "Employee Master & Records",
      "Attendance Management",
      "Leave Management",
      "Payroll Processing",
      "Statutory Compliance",
      "Department & Designation Management",
      "Performance Management",
      "HR Reporting & Analytics"
    ]
  },
  {
    id: "projects",
    title: "Project Management",
    icon: Layers,
    tagline: "Deliver On Time. Every Time.",
    heroLine: "Plan, track, and deliver with confidence.",
    description: "Gantt charts, work breakdown structures, budgets, and change orders that sync directly with finance. Budget vs. actual visibility that keeps projects on track and stakeholders informed.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop",
    outcomes: [
      "On-time delivery with dependency tracking",
      "Budget vs. actual visibility by phase",
      "Change control without email chaos",
      "Resource utilization optimization"
    ],
    capabilities: [
      "Work Breakdown Structure (WBS)",
      "Task Dependencies & Critical Path",
      "Resource Allocation",
      "Time & Cost Tracking",
      "Budget Management",
      "Change Order Processing",
      "Progress Reporting",
      "Earned Value Analysis"
    ]
  },
  {
    id: "vehicle-maintenance",
    title: "Vehicle & Fleet Maintenance",
    icon: Car,
    tagline: "Fleet Fitness. Guaranteed.",
    heroLine: "Every vehicle. Every service. On schedule.",
    description: "Fleet maintenance that keeps wheels turning. Service scheduling, fuel tracking, compliance management, and cost analysis. Whether 10 vehicles or 1,000 — complete visibility and control.",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop",
    outcomes: [
      "Fleet availability maximized",
      "Fuel costs tracked and optimized",
      "Compliance deadlines never missed",
      "Total cost of ownership visibility"
    ],
    capabilities: [
      "Vehicle Master & Registration",
      "Service Scheduling & Reminders",
      "Fuel Consumption Tracking",
      "Insurance & Permit Management",
      "Driver Assignment & Logs",
      "Breakdown & Repair History",
      "Cost Analysis by Vehicle",
      "Compliance & Fitness Certificates"
    ]
  },
  {
    id: "fixed-assets",
    title: "Fixed Asset Management",
    icon: Building2,
    tagline: "Every Asset. Accounted For.",
    heroLine: "Acquisition to disposal. Complete lifecycle.",
    description: "Assets are investments — manage them like it. Depreciation calculations, physical verification, transfers, and disposal tracking. Finance-integrated accuracy that survives any audit.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    outcomes: [
      "Accurate depreciation calculations",
      "Physical verification simplified",
      "Asset location always known",
      "Tax-compliant asset registers"
    ],
    capabilities: [
      "Asset Acquisition & Capitalization",
      "Depreciation Methods (SLM, WDV)",
      "Asset Categories & Classification",
      "Physical Verification & Tagging",
      "Asset Transfers & Movement",
      "Maintenance History",
      "Disposal & Write-off",
      "Asset Register & Reports"
    ]
  },
  {
    id: "fixed-deposits",
    title: "Fixed Deposit Management",
    icon: Vault,
    tagline: "Treasury. Optimized.",
    heroLine: "Every deposit. Every maturity. Tracked.",
    description: "Corporate treasury visibility for FD portfolios. Maturity tracking, interest calculations, renewal management, and bank-wise analysis. Never miss a renewal, never lose interest income.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop",
    outcomes: [
      "Maturity dates tracked automatically",
      "Interest income maximized",
      "Renewal decisions data-driven",
      "Complete FD portfolio visibility"
    ],
    capabilities: [
      "FD Creation & Documentation",
      "Bank & Branch Master",
      "Interest Rate Management",
      "Maturity Tracking & Alerts",
      "Auto-Renewal Management",
      "TDS Tracking & Certificates",
      "Interest Accrual & Posting",
      "Portfolio Analysis & Reports"
    ]
  }
];

export default function SolutionsPage() {
  const [activeSolution, setActiveSolution] = useState("dms");

  useEffect(() => {
    const handleScroll = () => {
      const sections = solutions.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
          setActiveSolution(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSolution = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black/10">
      <Navbar />

      {/* ============================================ */}
      {/* HERO */}
      {/* ============================================ */}
      <section className="relative pt-32 pb-20 px-6 border-b border-black/10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:48px_48px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-black/10 text-xs font-medium uppercase tracking-[0.2em] text-black/60 bg-black/5">
              Solution Capabilities
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-7xl font-light tracking-tight mb-6"
          >
            What We <span className="text-black/40">Build.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-black/50 max-w-3xl font-light leading-relaxed"
          >
            These are examples of solutions we've built for clients — not packages you buy off the shelf. 
            Your solution will be tailored to your exact requirements, drawing from these capabilities and beyond.
          </motion.p>
        </div>
      </section>

      {/* ============================================ */}
      {/* STATS BAR */}
      {/* ============================================ */}
      <section className="py-8 px-6 border-b border-black/10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="Unlimited" label="Possibilities" />
            <StatCard value="100%" label="Customized" />
            <StatCard value="Real-Time" label="Data Sync" />
            <StatCard value="Your Way" label="Not Ours" />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* MAIN CONTENT */}
      {/* ============================================ */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* Sticky Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto py-8 pr-8 border-r border-black/10">
          <div className="mb-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-black/30">Solution Areas</span>
          </div>
          <nav className="space-y-1">
            {solutions.map((sol) => (
              <button
                key={sol.id}
                onClick={() => scrollToSolution(sol.id)}
                className={cn(
                  "w-full text-left px-4 py-3 text-sm font-medium transition-all duration-300 border-l-2 flex items-center gap-3",
                  activeSolution === sol.id
                    ? "border-black text-black bg-black/5"
                    : "border-transparent text-black/40 hover:text-black/70 hover:bg-black/[0.02]"
                )}
              >
                <sol.icon className={cn(
                  "w-4 h-4 transition-colors",
                  activeSolution === sol.id ? "text-black" : "text-black/30"
                )} />
                {sol.title}
              </button>
            ))}
          </nav>

          {/* CTA in sidebar */}
          <div className="mt-8 pt-8 border-t border-black/10">
            <p className="text-sm text-black/40 mb-4">Need a custom solution? Well, Its the very premise of our company. Lets chat and discuss what we can build for you.</p>
            <Button asChild variant="outline" className="w-full border-black/20 text-black hover:bg-black/5 rounded-none h-10 text-xs uppercase tracking-wider">
              <Link href="/contact">Tell Us What You Need</Link>
            </Button>
          </div>
        </aside>

        {/* Solution Content */}
        <div className="flex-1 py-8 lg:px-12">
          <div className="space-y-32 pb-32">
            {solutions.map((sol, index) => (
              <SolutionSection key={sol.id} solution={sol} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="py-20 md:py-32 px-6 bg-black text-white border-t border-black/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8">
            These Are All Starting Points. <span className="text-white/40">Not Limits.</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
            Every solution we build is unique. Tell us what your business needs — 
            we'll show you exactly how we'll make it happen.
          </p>
          <Button asChild className="bg-white text-black hover:bg-white/90 rounded-none h-14 px-10 text-sm uppercase tracking-wider font-semibold">
            <Link href="/contact">
              Describe Your Requirements
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ============================================
// COMPONENT: Stat Card
// ============================================
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-light text-black mb-1">{value}</div>
      <div className="text-xs text-black/40 uppercase tracking-wider">{label}</div>
    </div>
  );
}

// ============================================
// COMPONENT: Solution Section
// ============================================
function SolutionSection({ solution, index }: { solution: typeof solutions[0]; index: number }) {
  return (
    <motion.section 
      id={solution.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-32"
    >
      {/* Solution Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-black/5 border border-black/10">
          <solution.icon className="w-6 h-6 text-black/80" />
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-black/30 block mb-1">Solution {String(index + 1).padStart(2, '0')}</span>
          <h2 className="text-3xl font-light">{solution.title}</h2>
        </div>
      </div>

      {/* Tagline */}
      <div className="mb-6">
        <span className="text-black/60 font-mono text-xs tracking-widest uppercase">{solution.tagline}</span>
      </div>

      {/* Hero Line */}
      <h3 className="text-2xl md:text-3xl font-light text-black/80 mb-4">
        {solution.heroLine}
      </h3>

      {/* Description */}
      <p className="text-lg text-black/50 leading-relaxed max-w-3xl mb-8">
        {solution.description}
      </p>

      {/* Image */}
      <div className="relative w-full h-64 mb-10 border border-black/10 overflow-hidden group">
        <Image 
          src={solution.image}
          alt={solution.title}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute bottom-4 left-4">
          <span className="text-xs uppercase tracking-wider text-black/60 bg-white/50 px-3 py-1 backdrop-blur-sm">
            {solution.title}
          </span>
        </div>
      </div>

      {/* Outcomes & Capabilities */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Outcomes */}
        <div className="bg-gray-50 border border-black/5 p-8">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-4 h-4 text-black/40" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-black/80">Key Outcomes</h4>
          </div>
          <ul className="space-y-4">
            {solution.outcomes.map((outcome, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-black/60">
                <CheckCircle2 className="w-4 h-4 text-black/40 mt-0.5 shrink-0" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Capabilities */}
        <div className="bg-gray-50 border border-black/5 p-8">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-4 h-4 text-black/40" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-black/80">What We Can Include</h4>
          </div>
          <ul className="space-y-3">
            {solution.capabilities.map((cap, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-black/60">
                <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-1.5 shrink-0"></div>
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}