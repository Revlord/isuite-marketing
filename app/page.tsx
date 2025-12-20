"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
  Check,
  Lightbulb,
  Puzzle,
  Wrench,
  Target
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
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
    <main ref={mainRef} className="bg-white text-black selection:bg-black/10 overflow-x-hidden">
      <Navbar />

      {/* ============================================ */}
      {/* HERO SECTION - THE HOOK */}
      {/* ============================================ */}
      <section className="hero-section relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        {/* Background */}
        <div className="hero-bg absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-white to-white"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-multiply"></div>
          {/* Animated grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-[1]"></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center pt-32 pb-20">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-black text-xs font-medium uppercase tracking-[0.2em] text-black bg-white backdrop-blur-sm">
              <span className="w-2 h-2 bg-black rounded-none animate-pulse"></span>
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
            <span className="text-black/40">
              <span className="relative inline-block">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0, 1, 0] }}
                  transition={{ duration: 0.4, times: [0, 0.2, 0.5, 0.8, 1], delay: 0.2 }}
                  className="absolute inset-0 underline decoration-1 decoration-black underline-offset-8"
                  aria-hidden="true"
                >
                  Absolute
                </motion.span>
                <span className="underline decoration-1 decoration-black/40 underline-offset-8">
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
            className="text-xl md:text-2xl text-black/60 max-w-3xl mx-auto font-light leading-relaxed mb-12"
          >
            iSuite is the enterprise platform that molds to your operations — not the other way around. Deploy in weeks. Customize without limits. Scale without Fear.
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
              className="bg-black text-white hover:bg-black/90 rounded-none h-14 min-w-[220px] px-8 text-sm uppercase tracking-wider font-semibold group border border-black"
            >
              <Link href="/contact">
                Request Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="bg-transparent border-black text-black hover:bg-black hover:text-white rounded-none h-14 min-w-[220px] px-8 text-sm uppercase tracking-wider font-medium transition-colors"
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
            className="mt-20 pt-12 border-t border-black/10"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-black/30 mb-6">Trusted by Industry Leaders</p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40">
              {/* Placeholder for client logos */}
              <div className="text-2xl font-light tracking-tight">Pharma<span className="text-black/50">Corp</span></div>
              <div className="text-2xl font-light tracking-tight">Industrial<span className="text-black/50">Tech</span></div>
              <div className="text-2xl font-light tracking-tight">Mfg<span className="text-black/50">Global</span></div>
              <div className="text-2xl font-light tracking-tight">Process<span className="text-black/50">Pro</span></div>
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
          <div className="flex flex-col items-center gap-2 text-black/30">
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-black/30 to-transparent"></div>
          </div>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* SOLUTION FIRST SECTION - THE BIG STATEMENT */}
      {/* ============================================ */}
      <section className="fade-section py-24 md:py-32 px-6 border-t border-black bg-black text-white">
        <div className="max-w-6xl mx-auto">
          {/* The Big Statement */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="inline-block px-4 py-2 border border-white/20 text-xs font-bold uppercase tracking-[0.3em] text-white/60">
                [ The iSuite Philosophy ]
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tighter mb-8">
              <span className="text-white/40 tracking-tighter">We Don't Just Sell Modules.</span> <br/>
              We Sell Solutions.
            </h2>
            
            <p className="text-xl md:text-2xl text-white/50 max-w-4xl mx-auto leading-relaxed">
              Tell us what your business needs. We'll build it. No feature requests denied because 
              "that's not in the package." No compromises because "the system doesn't support that."
              <span className="text-white font-medium"> Just your solution, exactly as you need it.</span>
            </p>
          </div>

          {/* The Three Pillars of Solution-First */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <SolutionPillar 
              icon={<Lightbulb className="w-8 h-8" />}
              number="01"
              title="You Describe"
              description="Tell us your workflows, your pain points, your vision. We listen first — deeply."
            />
            <SolutionPillar 
              icon={<Wrench className="w-8 h-8" />}
              number="02"
              title="We Build"
              description="Our platform molds to your requirements. No limitations. No 'that's not possible.'"
            />
            <SolutionPillar 
              icon={<Target className="w-8 h-8" />}
              number="03"
              title="You Win"
              description="A system that works exactly how you work. Not the other way around."
            />
          </div>

          {/* The Bold Promise */}
          <div className="border border-white/20 p-8 md:p-12 text-center bg-white/[0.02]">
            <div className="max-w-3xl mx-auto">
              <Puzzle className="w-12 h-12 mx-auto text-white/40 mb-6" />
              <h3 className="text-2xl md:text-3xl font-light mb-6">
                "If you can describe it, we can build it."
              </h3>
              <p className="text-white/50 leading-relaxed mb-8">
                Other ERPs force you into their mold. They sell you "modules" and hope they fit.
                iSuite is different. Our proprietary platform was designed from day one to 
                create <em>any</em> solution — not just the ones we anticipated. Your unique workflows, 
                your specific approvals, your exact reports. No exceptions.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Unlimited customization
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Any workflow
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Any approval chain
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Any report
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* THE PROBLEM SECTION */}
      {/* ============================================ */}
      <section className="fade-section py-20 md:py-32 px-6 border-t border-black bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-6">[ The Problem ]</h2>
              <h3 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                Traditional ERP is <br/>
                <span className="text-black/40">Broken.</span>
              </h3>
              <div className="space-y-6 text-lg text-black/60 leading-relaxed">
                <p>
                  You spend millions on big ERPs like SAP or Oracle. Then you spend years adapting your operations to match their assumptions. 
                </p>
                <p>
                  When requirements change, you face impossible choices: expensive customization projects, clunky workarounds, or starting over. Worse, endless back and forth between teams with no proper expertise or communication skills.
                </p>
                <p className="text-black font-medium">
                  <span className="inline-flex items-center gap-2 align-middle">
                    <span>There's a better way. The iSuite </span>
                    <Image
                      src="/logos/iSuiteLogoMathBlack.svg"
                      alt="iSuite Monogram"
                      width={24}
                      height={20}
                      className="h-5 w-auto"
                    />
                  </span>
                  <span className="px-1"> way.</span>
                </p>
              </div>
            </div>

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
                title="'That's Just How It Works'"
                description="The answer to every requirement that doesn't fit their predefined boxes."
              />
              <PainPointCard 
                number="04"
                title="Feature Limitations"
                description="'Upgrade to the Enterprise tier' or 'That's on our roadmap for next year.'"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* THE SOLUTION SECTION */}
      {/* ============================================ */}
      <section className="fade-section py-20 md:py-32 px-6 border-t border-black/10 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-6">[ The iSuite Difference ]</h2>
            <h3 className="text-4xl md:text-5xl font-light leading-tight mb-8 text-black/50">
            A Platform That <span className="text-black">Becomes Your Solution.</span>
            </h3>
          <p className="text-xl text-black/50 max-w-3xl mx-auto">
            iSuite isn't just a collection of modules you buy. It's a platform that molds to your 
            exact requirements — delivering enterprise depth with zero compromise.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ValueCard 
            icon={<Clock className="w-8 h-8" />}
            title="Weeks, Not Years"
            description="Your custom solution deployed in weeks. No 18-month implementation nightmares."
          />
          <ValueCard 
            icon={<Infinity className="w-8 h-8" />}
            title="Zero Limitations"
            description="If you can describe the requirement, we can build it. No artificial constraints."
          />
          <ValueCard 
            icon={<Zap className="w-8 h-8" />}
            title="Continuous Evolution"
            description="New requirements? Deployed in days. Your solution grows with your business."
          />
          <ValueCard 
            icon={<Shield className="w-8 h-8" />}
            title="Future-Proof"
            description="No technical debt. No upgrade nightmares. Your solution stays current."
          />
        </div>
      </section>

      {/* ============================================ */}
      {/* COMPARISON SECTION */}
      {/* ============================================ */}
      <section className="fade-section py-20 md:py-32 px-6 border-t border-black bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-6">[ The Comparison ]</h2>
            <h3 className="text-4xl md:text-5xl font-light">
              Traditional ERP <span className="text-white/40">vs.</span> iSuite
            </h3>
          </div>

          <div className="border border-white/20 overflow-hidden overflow-x-auto">
            <div className="grid grid-cols-3 border-b border-white/20 min-w-[600px]">
              <div className="p-6 bg-white/5"></div>
              <div className="p-6 text-center border-l border-white/20">
                <span className="text-sm uppercase tracking-wider text-white/40">Traditional ERP</span>
              </div>
              <div className="p-6 text-center border-l border-white/20 bg-white/10">
                <span className="text-sm uppercase tracking-wider text-white font-medium">iSuite</span>
              </div>
            </div>

            <div className="min-w-[600px]">
              <ComparisonRow 
                label="Approach"
                legacy="Buy modules, hope they fit"
                isuite="Describe needs, we build"
              />
              <ComparisonRow 
                label="Customization"
                legacy="Limited by package tier"
                isuite="Unlimited — if you need it, we build it"
              />
              <ComparisonRow 
                label="New Requirements"
                legacy="'Submit a feature request'"
                isuite="Deployed in days"
              />
              <ComparisonRow 
                label="Implementation"
                legacy="18-36 months"
                isuite="4-12 weeks"
              />
              <ComparisonRow 
                label="Your Workflows"
                legacy="Adapt to the software"
                isuite="Software adapts to you"
              />
              <ComparisonRow 
                label="Total Cost"
                legacy="$1M - $50M+ (then more for changes)"
                isuite="Predictable, fraction of legacy"
                isLast
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHAT WE'VE BUILT - EXAMPLES, NOT PRODUCTS */}
      {/* ============================================ */}
      <section className="fade-section py-20 md:py-32 px-6 border-t border-black bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-4">[ What We've Built ]</h2>
              <h3 className="text-4xl md:text-5xl font-light mb-6">
                Examples of <span className="text-black/40">What's Possible.</span>
              </h3>
              <p className="text-lg text-black/50">
                These aren't modules you purchase — they're examples of solutions we've created for clients. 
                Your solution will be different, because your business is different.
              </p>
            </div>
            <Button asChild variant="outline" className="border-black text-black hover:bg-black hover:text-white rounded-none h-12 px-8 self-start lg:self-auto transition-colors">
              <Link href="/industries">
                See Industry Solutions <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SolutionExampleCard 
              title="Complete Financial Control"
              description="Real-time visibility across entities, automated compliance, audit-ready documentation — built exactly as the CFO needed it."
            />
            <SolutionExampleCard 
              title="End-to-End Sales Operations"
              description="Quote-to-cash with custom pricing logic, approval chains matching their authority structure, and reports their CEO actually uses."
            />
            <SolutionExampleCard 
              title="Precision Manufacturing"
              description="Production scheduling, quality checkpoints, and shop floor tracking — designed around their specific production lines."
            />
            <SolutionExampleCard 
              title="Intelligent Inventory"
              description="Multi-location visibility, batch tracking, and reorder automation — with the exact fields and workflows their team requested."
            />
            <SolutionExampleCard 
              title="Strategic Procurement"
              description="Vendor management, approvals, and 3-way matching — with custom integrations to their existing supplier systems."
            />
            <SolutionExampleCard 
              title="Integrated HR Operations"
              description="Hire-to-retire management with payroll, attendance, and compliance — tailored to their regional requirements."
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-black/40 text-lg">
              These are starting points, not limitations. <span className="text-black font-medium">Tell us what you need.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* INDUSTRIES SECTION */}
      {/* ============================================ */}
      <section className="fade-section py-20 md:py-32 px-6 border-t border-black bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-4">[ Industries ]</h2>
              <h3 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                Deep Expertise. <br/>
                <span className="text-black/40">Custom Solutions.</span>
              </h3>
              <p className="text-lg text-black/50 leading-relaxed mb-8">
                Pharmaceutical manufacturing. Industrial production. Process and discrete manufacturing. 
                We understand these industries deeply — but we build solutions specifically for <em>your</em> operation.
              </p>
              <Button asChild className="bg-black text-white hover:bg-black/90 rounded-none h-12 px-8">
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
      {/* TESTIMONIAL */}
      {/* ============================================ */}
      <section className="fade-section py-20 md:py-32 px-6 border-t border-black/10 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <svg className="w-12 h-12 mx-auto text-black/20 mb-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
          <blockquote className="text-2xl md:text-3xl font-light leading-relaxed text-black/80 mb-8">
            "We came to iSuite with a list of 47 specific requirements that SAP said would need 'extensive customization.' 
            iSuite built every single one. In 10 weeks. It's not software — it's a solution that actually fits."
          </blockquote>
          <div className="text-black/40">
            <div className="font-medium text-black/60">Operations Director</div>
            <div className="text-sm">Leading Pharmaceutical Manufacturer</div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="py-20 md:py-32 px-6 bg-black text-white border-t border-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">
            What Does Your <br/>
            <span className="text-white/40">Business Need?</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
            Stop adapting to software limitations. Tell us what you need — 
            we'll show you exactly how we'll build it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="bg-white text-black hover:bg-white/90 rounded-none h-14 px-10 text-sm uppercase tracking-wider font-semibold">
              <Link href="/contact">
                Describe Your Requirements
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 text-black hover:bg-white/10 hover:text-white rounded-none h-14 px-10 text-sm uppercase tracking-wider">
              <Link href="/platform">
                See What's Possible
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
// COMPONENT: Solution Pillar
// ============================================
function SolutionPillar({ icon, number, title, description }: { icon: React.ReactNode; number: string; title: string; description: string }) {
  return (
    <div className="text-center p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
      <div className="text-white/20 mb-4">{icon}</div>
      <div className="text-5xl font-light text-white/10 mb-4">{number}</div>
      <h4 className="text-xl font-medium text-white mb-3">{title}</h4>
      <p className="text-white/50 leading-relaxed">{description}</p>
    </div>
  );
}

// ============================================
// COMPONENT: Pain Point Card
// ============================================
function PainPointCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="group flex gap-6 p-6 border border-black/10 bg-black/[0.02] hover:bg-black/[0.05] transition-colors">
      <div className="text-4xl font-light text-black/20 group-hover:text-black/40 transition-colors">
        {number}
      </div>
      <div>
        <h4 className="text-lg font-medium text-black mb-2">{title}</h4>
        <p className="text-sm text-black/50 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ============================================
// COMPONENT: Value Card
// ============================================
function ValueCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group p-10 bg-white border border-black/10 hover:border-black hover:bg-black hover:text-white transition-all duration-300">
      <div className="text-black/30 group-hover:text-white/60 transition-colors mb-6">
        {icon}
      </div>
      <h4 className="text-xl font-medium text-black group-hover:text-white mb-4 transition-colors">{title}</h4>
      <p className="text-sm text-black/50 group-hover:text-white/50 leading-relaxed transition-colors">{description}</p>
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
      <div className="p-6 text-center border-l border-white/10 text-white/40 text-sm">{legacy}</div>
      <div className="p-6 text-center border-l border-white/10 bg-white/5 text-white font-medium flex items-center justify-center gap-2 text-sm">
        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
        {isuite}
      </div>
    </div>
  );
}

// ============================================
// COMPONENT: Solution Example Card
// ============================================
function SolutionExampleCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="group p-8 bg-white border border-black/10 hover:border-black transition-all duration-300">
      <h4 className="text-lg font-medium text-black mb-3">{title}</h4>
      <p className="text-sm text-black/50 leading-relaxed">{description}</p>
    </div>
  );
}

// ============================================
// COMPONENT: Industry Card
// ============================================
function IndustryCard({ icon, title, href }: { icon: React.ReactNode; title: string; href: string }) {
  return (
    <Link 
      href={href}
      className="group aspect-square bg-white border border-black/10 p-8 flex flex-col justify-between hover:bg-black hover:text-white hover:border-black transition-all duration-300"
    >
      <div className="text-black/30 group-hover:text-white/60 transition-colors">
        {icon}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xl font-light">{title}</span>
        <ArrowRight className="w-5 h-5 text-black/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}