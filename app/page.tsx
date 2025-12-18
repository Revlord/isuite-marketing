"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Clock, 
  Infinity, 
  Shield, 
  Zap,
  Factory,
  Building2,
  Pill,
  Package,
  ChevronRight,
  Check
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Parallax effect for hero background
      gsap.to(".hero-bg", {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Fade in sections on scroll
      gsap.utils.toArray(".fade-section").forEach((section: any) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="bg-[#050505] text-white selection:bg-white/20 overflow-x-hidden">
      <Navbar />

      {/* ============================================ */}
      {/* HERO SECTION - THE HOOK */}
      {/* ============================================ */}
      <section className="hero-section relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        {/* Background */}
        <div className="hero-bg absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-[#050505]"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          {/* Animated grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] z-[1]"></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center pt-32 pb-20">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-xs font-medium uppercase tracking-[0.2em] text-white/60 bg-white/5 backdrop-blur-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Enterprise Operating System
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05] mb-8"
          >
            Introducing <br/>
            <span className="text-white/40">
              <span className="relative inline-block">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0, 1, 0] }}
                  transition={{ duration: 0.4, times: [0, 0.2, 0.5, 0.8, 1], delay: 0.2 }}
                  className="absolute inset-0 underline decoration-1 decoration-white/40 underline-offset-8"
                  aria-hidden="true"
                >
                  Absolute
                </motion.span>
                <span className="underline decoration-1 decoration-white/40 underline-offset-8">
                  {"Absolute".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0, delay: 0.7 + i * 0.08 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </span>{" "}
              ERP Control.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto font-light leading-relaxed mb-12"
          >
            iSuite is the enterprise platform that molds to your operations — not the other way around. Deploy in weeks. Customize without limits. Evolve continuously.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              asChild
              className="bg-white text-black hover:bg-gray-200 rounded-none h-14 min-w-[220px] px-8 text-sm uppercase tracking-wider font-semibold group"
            >
              <Link href="/contact">
                Request Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white rounded-none h-14 min-w-[220px] px-8 text-sm uppercase tracking-wider font-medium"
            >
              <Link href="/platform">
                Explore Platform
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 pt-12 border-t border-white/10"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-6">Trusted by Industry Leaders</p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40">
              {/* Placeholder for client logos */}
              <div className="text-2xl font-light tracking-tight">Pharma<span className="text-white/50">Corp</span></div>
              <div className="text-2xl font-light tracking-tight">Industrial<span className="text-white/50">Tech</span></div>
              <div className="text-2xl font-light tracking-tight">Mfg<span className="text-white/50">Global</span></div>
              <div className="text-2xl font-light tracking-tight">Process<span className="text-white/50">Pro</span></div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center gap-2 text-white/30">
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent"></div>
          </div>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* THE PROBLEM SECTION */}
      {/* ============================================ */}
      <section className="fade-section py-20 md:py-32 px-6 border-t border-white/10 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-6">The Problem</h2>
              <h3 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                Traditional ERP is <br/>
                <span className="text-white/40">Broken.</span>
              </h3>
              <div className="space-y-6 text-lg text-white/60 leading-relaxed">
                <p>
                  You spend millions on SAP or Oracle. Then you spend years adapting your operations to match their assumptions. 
                </p>
                <p>
                  When requirements change, you face impossible choices: expensive customization projects, clunky workarounds, or starting over.
                </p>
                <p className="text-white/80 font-medium">
                  There's a better way.
                </p>
              </div>
            </div>

            {/* Pain Points */}
            <div className="space-y-6">
              <PainPointCard 
                number="01"
                title="18-36 Month Implementations"
                description="Traditional ERPs take years to deploy. Your business can't wait that long."
              />
              <PainPointCard 
                number="02"
                title="Millions in Consulting Fees"
                description="Armies of consultants who profit from complexity, not your success."
              />
              <PainPointCard 
                number="03"
                title="Forced Compromises"
                description="'That's how the software works' becomes the answer to every requirement."
              />
              <PainPointCard 
                number="04"
                title="Technical Debt"
                description="Every customization creates code that breaks on upgrades."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* THE SOLUTION SECTION */}
      {/* ============================================ */}
      <section className="fade-section py-20 md:py-32 px-6 border-t border-white/10 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto text-center mb-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-6">The iSuite Difference</h2>
          <h3 className="text-4xl md:text-5xl font-light leading-tight mb-8">
            Software That <span className="text-white/40">Adapts to You.</span>
          </h3>
          <p className="text-xl text-white/50 max-w-3xl mx-auto">
            iSuite was architected differently. Our proprietary platform molds precisely to how your organization actually operates — delivering enterprise depth with unprecedented flexibility.
          </p>
        </div>

        {/* Value Props */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          <ValueCard 
            icon={<Clock className="w-8 h-8" />}
            title="Weeks, Not Years"
            description="Deploy a fully customized enterprise system in weeks. No 18-month implementation nightmares."
          />
          <ValueCard 
            icon={<Infinity className="w-8 h-8" />}
            title="Unlimited Customization"
            description="Every screen, workflow, and report — configured exactly to your requirements. No artificial limits."
          />
          <ValueCard 
            icon={<Zap className="w-8 h-8" />}
            title="Continuous Evolution"
            description="Requirements change? New workflows deploy in days, not development cycles."
          />
          <ValueCard 
            icon={<Shield className="w-8 h-8" />}
            title="Zero Technical Debt"
            description="Structured customization means no code sprawl. Upgrades don't break your system."
          />
        </div>
      </section>

      {/* ============================================ */}
      {/* COMPARISON SECTION */}
      {/* ============================================ */}
      <section className="fade-section py-20 md:py-32 px-6 border-t border-white/10 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-6">The Comparison</h2>
            <h3 className="text-4xl md:text-5xl font-light">
              Legacy ERP <span className="text-white/40">vs.</span> iSuite
            </h3>
          </div>

          <div className="border border-white/10 overflow-hidden overflow-x-auto">
            <div className="grid grid-cols-3 border-b border-white/10 min-w-[600px]">
              <div className="p-6 bg-white/5"></div>
              <div className="p-6 text-center border-l border-white/10">
                <span className="text-sm uppercase tracking-wider text-white/40">Legacy ERP</span>
              </div>
              <div className="p-6 text-center border-l border-white/10 bg-white/5">
                <span className="text-sm uppercase tracking-wider text-white font-medium">iSuite</span>
              </div>
            </div>

            <div className="min-w-[600px]">
              <ComparisonRow 
                label="Implementation"
                legacy="18-36 months"
                isuite="4-12 weeks"
              />
              <ComparisonRow 
                label="Customization"
                legacy="Requires developers"
                isuite="Visual configuration"
              />
              <ComparisonRow 
                label="Changes"
                legacy="Months + budget"
                isuite="Days"
              />
              <ComparisonRow 
                label="Total Cost"
                legacy="$1M - $50M+"
                isuite="Fraction of legacy"
              />
              <ComparisonRow 
                label="Flexibility"
                legacy="You adapt to it"
                isuite="It adapts to you"
              />
              <ComparisonRow 
                label="Upgrades"
                legacy="Break customizations"
                isuite="Seamless"
                isLast
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* MODULES SECTION */}
      {/* ============================================ */}
      <section className="fade-section py-20 md:py-32 px-6 border-t border-white/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">Complete Suite</h2>
              <h3 className="text-4xl md:text-5xl font-light">
                Every Function. <span className="text-white/40">Unified.</span>
              </h3>
            </div>
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-none h-12 px-8 self-start lg:self-auto">
              <Link href="/modules">
                View All Modules <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            <ModuleCard 
              title="Financial Management"
              description="Budgeting, cost centers, multi-currency, and real-time reporting. Every rupee tracked from quote to cash."
              href="/modules#erp"
            />
            <ModuleCard 
              title="Sales & Distribution"
              description="Complete quote-to-cash. Pricing, orders, delivery, billing, and credit management — unified."
              href="/modules#sales"
            />
            <ModuleCard 
              title="Manufacturing (MRP)"
              description="Production scheduling, BOM management, quality checkpoints, and shop floor tracking."
              href="/modules#mrp"
            />
            <ModuleCard 
              title="Inventory Management"
              description="Real-time visibility across locations. Batch tracking, stock movements, and reorder automation."
              href="/modules#inventory"
            />
            <ModuleCard 
              title="Procurement"
              description="RFQ to payment. Vendor management, approvals, GRN, and 3-way matching built in."
              href="/modules#procurement"
            />
            <ModuleCard 
              title="HR & Payroll"
              description="Employee lifecycle, attendance, payroll processing, and compliance — all integrated."
              href="/modules#hr"
            />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* INDUSTRIES SECTION */}
      {/* ============================================ */}
      <section className="fade-section py-20 md:py-32 px-6 border-t border-white/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">Industries</h2>
              <h3 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                Built for Industries <br/>
                <span className="text-white/40">That Demand Precision.</span>
              </h3>
              <p className="text-lg text-white/50 leading-relaxed mb-8">
                Pharmaceutical manufacturing. Industrial production. Process and discrete manufacturing. 
                Organizations where accuracy isn't optional and compliance isn't negotiable.
              </p>
              <Button asChild className="bg-white text-black hover:bg-white/90 rounded-none h-12 px-8">
                <Link href="/industries">
                  Explore Industries <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <IndustryCard 
                icon={<Pill className="w-8 h-8" />}
                title="Pharmaceutical"
                href="/industries#pharma"
              />
              <IndustryCard 
                icon={<Factory className="w-8 h-8" />}
                title="Manufacturing"
                href="/industries#manufacturing"
              />
              <IndustryCard 
                icon={<Package className="w-8 h-8" />}
                title="Distribution"
                href="/industries#retail"
              />
              <IndustryCard 
                icon={<Building2 className="w-8 h-8" />}
                title="Construction"
                href="/industries#construction"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIAL / PROOF SECTION */}
      {/* ============================================ */}
      <section className="fade-section py-20 md:py-32 px-6 border-t border-white/10 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <svg className="w-12 h-12 mx-auto text-white/20 mb-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
          <blockquote className="text-2xl md:text-3xl font-light leading-relaxed text-white/80 mb-8">
            "We evaluated SAP and Oracle. Both quoted 18+ months and seven-figure implementations. 
            iSuite delivered everything we needed in 10 weeks. The flexibility is unlike anything we've seen."
          </blockquote>
          <div className="text-white/40">
            <div className="font-medium text-white/60">Operations Director</div>
            <div className="text-sm">Leading Pharmaceutical Manufacturer</div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="py-20 md:py-32 px-6 bg-white text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">
            Ready to See <br/>
            <span className="text-black/40">What's Possible?</span>
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto mb-12">
            Every organization is different. Let us show you how iSuite would work for yours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="bg-black text-white hover:bg-black/90 rounded-none h-14 px-10 text-sm uppercase tracking-wider font-semibold">
              <Link href="/contact">
                Request Personalized Demo
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

      <Footer />
    </main>
  );
}

// ============================================
// COMPONENT: Pain Point Card
// ============================================
function PainPointCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="group flex gap-6 p-6 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
      <div className="text-4xl font-light text-white/20 group-hover:text-white/40 transition-colors">
        {number}
      </div>
      <div>
        <h4 className="text-lg font-medium text-white/90 mb-2">{title}</h4>
        <p className="text-sm text-white/50 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ============================================
// COMPONENT: Value Card
// ============================================
function ValueCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group p-10 bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-all duration-300">
      <div className="text-white/30 group-hover:text-white/60 transition-colors mb-6">
        {icon}
      </div>
      <h4 className="text-xl font-medium text-white mb-4">{title}</h4>
      <p className="text-sm text-white/50 leading-relaxed">{description}</p>
    </div>
  );
}

// ============================================
// COMPONENT: Comparison Row
// ============================================
function ComparisonRow({ label, legacy, isuite, isLast = false }: { label: string; legacy: string; isuite: string; isLast?: boolean }) {
  return (
    <div className={cn("grid grid-cols-3", !isLast && "border-b border-white/10")}>
      <div className="p-6 text-white/60 font-medium">{label}</div>
      <div className="p-6 text-center border-l border-white/10 text-white/40">{legacy}</div>
      <div className="p-6 text-center border-l border-white/10 bg-white/5 text-white font-medium flex items-center justify-center gap-2">
        <Check className="w-4 h-4 text-emerald-500" />
        {isuite}
      </div>
    </div>
  );
}

// ============================================
// COMPONENT: Module Card
// ============================================
function ModuleCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href} className="group block p-8 bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">{title}</h4>
        <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
      </div>
      <p className="text-sm text-white/50 leading-relaxed">{description}</p>
    </Link>
  );
}

// ============================================
// COMPONENT: Industry Card
// ============================================
function IndustryCard({ icon, title, href }: { icon: React.ReactNode; title: string; href: string }) {
  return (
    <Link 
      href={href}
      className="group aspect-square bg-white/[0.02] border border-white/10 p-8 flex flex-col justify-between hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
    >
      <div className="text-white/30 group-hover:text-white/60 transition-colors">
        {icon}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xl font-light">{title}</span>
        <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}