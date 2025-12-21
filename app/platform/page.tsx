"use client";

import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ArrowRight,
  Layers,
  Zap,
  Shield,
  Globe,
  Lock,
  RefreshCcw,
  Check,
  ChevronRight,
  Settings2,
  Workflow,
  BarChart3,
  FileText,
  Cpu,
  Rocket,
  Target,
  Trophy,
  Gauge,
  Hexagon,
  Box
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// COMPONENT: Geometric Globe Animation
// ============================================
function GeometricGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    const GLOBE_RADIUS = 300;
    const DOT_RADIUS = 1.5;
    const DOT_COUNT = 400;
    const CONNECTION_DISTANCE = 90;
    const ROTATION_SPEED = 0.001;

    const points: { x: number, y: number, z: number, baseX: number, baseY: number, baseZ: number }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < DOT_COUNT; i++) {
      const y = 1 - (i / (DOT_COUNT - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      points.push({
        x: x * GLOBE_RADIUS,
        y: y * GLOBE_RADIUS,
        z: z * GLOBE_RADIUS,
        baseX: x * GLOBE_RADIUS,
        baseY: y * GLOBE_RADIUS,
        baseZ: z * GLOBE_RADIUS
      });
    }

    let rotationX = 0;
    let rotationY = 0;

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;

      rotationY += ROTATION_SPEED;
      rotationX += ROTATION_SPEED * 0.5;

      const projectedPoints: { x: number, y: number, z: number }[] = [];

      points.forEach(point => {
        let x1 = point.baseX * Math.cos(rotationY) - point.baseZ * Math.sin(rotationY);
        let z1 = point.baseZ * Math.cos(rotationY) + point.baseX * Math.sin(rotationY);
        let y1 = point.baseY * Math.cos(rotationX) - z1 * Math.sin(rotationX);
        let z2 = z1 * Math.cos(rotationX) + point.baseY * Math.sin(rotationX);

        const scale = 800 / (800 - z2);
        const x2D = x1 * scale + cx;
        const y2D = y1 * scale + cy;

        projectedPoints.push({ x: x2D, y: y2D, z: z2 });

        const alpha = Math.max(0.4, (z2 + GLOBE_RADIUS) / (2 * GLOBE_RADIUS));
        ctx.beginPath();
        ctx.arc(x2D, y2D, DOT_RADIUS * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(alpha * 1.1, 1)})`;
        ctx.fill();
      });

      ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.lineWidth = 0.9;
      
      for (let i = 0; i < projectedPoints.length; i++) {
        const p1 = projectedPoints[i];
        if (p1.z < -50) continue;

        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p2 = projectedPoints[j];
          if (p2.z < -50) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
    />
  );
}

// ============================================
// COMPONENT: Geometric Core Visual (The Art)
// ============================================
function GeometricCoreVisual({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  const borderColor = isDark ? "border-white/20" : "border-black/20";
  const borderColorMid = isDark ? "border-white/15" : "border-black/15";
  const borderColorLight = isDark ? "border-white/10" : "border-black/10";
  const bgColor = isDark ? "bg-white/5" : "bg-black/5";
  const textColor = isDark ? "text-white/30" : "text-black/30";
  const iconColor = isDark ? "text-white/40" : "text-black/40";

  return (
    <div className={cn(
      "aspect-square border p-8 md:p-12 relative overflow-hidden",
      isDark ? "bg-gradient-to-br from-white/5 to-transparent border-white/10" : "bg-gradient-to-br from-black/5 to-transparent border-black/10"
    )}>
      {/* Abstract visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          {/* Outer rotating square */}
          <div className={cn("absolute inset-0 border rotate-45 animate-[spin_20s_linear_infinite]", borderColor)}></div>
          {/* Middle rotating square */}
          <div className={cn("absolute inset-4 border rotate-12 animate-[spin_15s_linear_infinite_reverse]", borderColorMid)}></div>
          {/* Inner rotating square */}
          <div className={cn("absolute inset-8 border -rotate-12 animate-[spin_25s_linear_infinite]", borderColorLight)}></div>
          {/* Center icon */}
          <div className={cn("absolute inset-12 backdrop-blur-sm flex items-center justify-center", bgColor)}>
            <Cpu className={cn("w-10 h-10 md:w-12 md:h-12", iconColor)} />
          </div>
        </div>
      </div>
      
      {/* Corner labels */}
      <div className={cn("absolute top-4 left-4 text-[10px] font-mono uppercase tracking-wider", textColor)}>Flexibility</div>
      <div className={cn("absolute top-4 right-4 text-[10px] font-mono uppercase tracking-wider", textColor)}>Depth</div>
      <div className={cn("absolute bottom-4 left-4 text-[10px] font-mono uppercase tracking-wider", textColor)}>Speed</div>
      <div className={cn("absolute bottom-4 right-4 text-[10px] font-mono uppercase tracking-wider", textColor)}>Control</div>
    </div>
  );
}

export default function PlatformPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black/10 overflow-x-hidden">
      <Navbar />
      
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-100 via-white to-white"></div>
          <GeometricGlobe />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#ffffff_100%)]"></div>
        </div>

        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 max-w-6xl mx-auto text-center pt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 flex justify-center"
          >
            <div className="flex items-center gap-3 px-5 py-2.5 border border-black/10 rounded-full bg-black/[0.03] backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></div>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-black/70">
                Proprietary Architecture
              </span>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-[0.95] mb-10 text-black mix-blend-multiply">
            <motion.span 
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              The Engine
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="block text-black/40"
            >
              Behind the Power.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-xl md:text-2xl text-black/60 max-w-3xl mx-auto font-light leading-relaxed mb-16"
          >
            While others sell you software, we engineered something different — 
            a proprietary platform that doesn't just compete with legacy giants. 
            <span className="text-black font-medium"> It outperforms them.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <Button 
              asChild
              className="bg-black text-white hover:bg-black/90 rounded-none h-14 px-10 text-sm uppercase tracking-wider font-semibold transition-all hover:scale-105"
            >
              <Link href="/industries">
                Explore Industries
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="ghost"
              className="text-black hover:text-black hover:bg-black/5 rounded-none h-14 px-10 text-sm uppercase tracking-wider font-medium border border-black/10 hover:border-black/20 transition-all"
            >
              <Link href="/solutions">
                Explore Solutions
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-black/20 to-transparent overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-full h-1/2 bg-gradient-to-b from-transparent to-black/50"
            />
          </div>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* THE UNFAIR ADVANTAGE - WITH GEOMETRIC VISUAL */}
      {/* ============================================ */}
      <section className="py-24 md:py-32 px-6 border-t border-black bg-black text-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 text-xs font-bold uppercase tracking-[0.3em] text-white/60">
                <Trophy className="w-4 h-4" />
                The Unfair Advantage
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-8">
              They Spent Decades. <br/>
              <span className="text-white/40">We Spent Them Smarter.</span>
            </h2>

            <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
              Legacy ERPs spent decades piling on complexity. Big ERPs grew by acquisition and market gravity.
              We studied where they went wrong — then engineered what they can’t replicate.
            </p>
          </div>

          {/* Competitive Edge Stats */}
          <div className="grid md:grid-cols-4 gap-px bg-white/10 border border-white/10 mb-16">
            <CompetitiveStatCard 
              metric="10x"
              label="Faster Implementation"
              comparison="vs. Legacy ERPs"
            />
            <CompetitiveStatCard 
              metric="<200ms"
              label="Query Response"
              comparison="Even on complex reports"
            />
            <CompetitiveStatCard 
              metric="∞"
              label="Customization Depth"
              comparison="No artificial limits"
            />
            <CompetitiveStatCard 
              metric="0"
              label="Compromises Required"
              comparison="Your process, exactly"
            />
          </div>

          {/* The Core Visual + Promise Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Geometric Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <GeometricCoreVisual variant="dark" />
            </motion.div>

            {/* Promise Content */}
            <div className="space-y-8">
              <div>
                <Cpu className="w-10 h-10 text-white/40 mb-6" />
                <h3 className="text-2xl md:text-3xl font-light mb-4">
                  Proprietary Engines. <span className="text-white/40">Unmatched Results.</span>
                </h3>
                <p className="text-white/50 leading-relaxed">
                  Under the hood, iSuite runs on a suite of proprietary engines we've spent years perfecting. 
                  They're the reason we can promise what others can't — and deliver what others won't.
                </p>
              </div>
              <div className="space-y-3">
                <EngineHighlight text="Build any screen, any workflow, any logic — in hours" />
                <EngineHighlight text="Handle enterprise complexity without enterprise bloat" />
                <EngineHighlight text="Scale from startup to multinational without re-architecture" />
                <EngineHighlight text="Deploy changes while competitors file change requests" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* THE POWER BENEATH - CAPABILITIES */}
      {/* ============================================ */}
      <section className="py-20 md:py-32 px-6 border-t border-black/10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-6">[ The Power Beneath ]</h2>
            <h3 className="text-4xl md:text-6xl font-light mb-6">
              Engines That Outperform.
            </h3>
            <p className="text-xl text-black/50 max-w-3xl mx-auto">
              Four proprietary engines working in concert. Each one designed to do what legacy systems can't — 
              adapt instantly, scale infinitely, perform relentlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <PowerEngineCard 
              icon={<Settings2 className="w-10 h-10" />}
              number="01"
              title="Infinite Interface Engine"
              tagline="Any screen. Any form. Any field. Built in hours."
              description="While competitors limit you to predefined templates, our interface engine generates any data capture point your process demands. 30+ field types, unlimited validation rules, pixel-perfect layouts — all without writing code."
              capabilities={["Unlimited field types", "Complex validation logic", "Dynamic form behavior", "Zero development wait"]}
              competitiveEdge="{ Big ERPs } charges for 'custom development.' We call it Tuesday."
            />
            <PowerEngineCard 
              icon={<Workflow className="w-10 h-10" />}
              number="02"
              title="Adaptive Workflow Engine"
              tagline="Your approval chains. Your rules. Your way."
              description="Multi-level approvals, conditional routing, parallel processes, automatic escalations — our workflow engine handles complexity that makes consultants nervous. And it configures in minutes, not months."
              capabilities={["Unlimited approval levels", "Conditional branching", "Auto-escalation rules", "Real-time notifications"]}
              competitiveEdge="{ Legacy ERPs } implementations take 18 months. Ours take conversations."
            />
            <PowerEngineCard 
              icon={<BarChart3 className="w-10 h-10" />}
              number="03"
              title="Real-Time Analytics Engine"
              tagline="Any data. Any calculation. Instant answers."
              description="Pull data from anywhere in your operation, apply any calculation, visualize any way you need. Sub-200ms response times on complex queries. Dashboards that actually show what matters."
              capabilities={["Cross-module analytics", "Custom calculations", "Real-time refresh", "Export any format"]}
              competitiveEdge="Their 'real-time' means overnight batch. Ours means now."
            />
            <PowerEngineCard 
              icon={<FileText className="w-10 h-10" />}
              number="04"
              title="Document Generation Engine"
              tagline="Pixel-perfect output. Every time."
              description="Invoices, purchase orders, certificates, reports — every document formatted exactly as your business demands. Brand-compliant, regulation-ready, generated automatically at scale."
              capabilities={["Custom templates", "Dynamic data binding", "Batch generation", "Multi-format export"]}
              competitiveEdge="They give you templates. We give you control."
            />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHY WE WIN - DIRECT COMPARISON */}
      {/* ============================================ */}
      <section className="py-20 md:py-32 px-6 border-t border-black/10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-6">[ Why We'd Win ]</h2>
            <h3 className="text-4xl md:text-5xl font-light mb-6">
              The Comparison <span className="text-black/40">They'd Rather You Didn't See.</span>
            </h3>
          </div>

          <div className="border border-black/10 overflow-hidden bg-white">
            <div className="grid grid-cols-3 border-b border-black/10">
              <div className="p-6 bg-black/[0.02]"></div>
              <div className="p-6 text-center border-l border-black/10">
                <span className="text-sm uppercase tracking-wider text-black/40">Legacy Giants</span>
                <p className="text-xs text-black/30 mt-1"></p>
              </div>
              <div className="p-6 text-center border-l border-black/10 bg-black text-white">
                <span className="text-sm uppercase tracking-wider font-medium">iSuite</span>
                <p className="text-xs text-white/50 mt-1">Unfair advantage</p>
              </div>
            </div>

            <ComparisonTableRow 
              label="New Screen Creation"
              legacy="Weeks + developers"
              isuite="Hours. No code."
            />
            <ComparisonTableRow 
              label="Workflow Changes"
              legacy="Change request → 6 months"
              isuite="Configure → Deploy → Done"
            />
            <ComparisonTableRow 
              label="Custom Reports"
              legacy="IT backlog queue"
              isuite="Build yourself. Minutes."
            />
            <ComparisonTableRow 
              label="Implementation Time"
              legacy="18-36 months"
              isuite="4-12 weeks"
            />
            <ComparisonTableRow 
              label="Total Cost of Ownership"
              legacy="$1M-$50M+ (and growing)"
              isuite="Fraction. Predictable."
            />
            <ComparisonTableRow 
              label="Your Requirements"
              legacy="'That's not how it works'"
              isuite="'When do you need it?'"
              isLast
            />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TECHNICAL FOUNDATION */}
      {/* ============================================ */}
      <section className="py-20 md:py-32 px-6 border-t border-black/10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-6">[ Technical Foundation ]</h2>
              <h3 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                Enterprise-Grade. <br/>
                <span className="text-black/40">Battle-Tested.</span>
              </h3>
              <p className="text-lg text-black/50 leading-relaxed mb-8">
                Built on distributed architecture designed for millions of transactions with sub-second response. 
                Security and compliance aren't features — they're non-negotiables baked into every layer.
              </p>
              <Button asChild variant="outline" className="border-black text-black hover:bg-black hover:text-white rounded-none h-12 px-8 transition-colors">
                <Link href="/contact">
                  Request Technical Deep-Dive <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              <TechCard 
                icon={<Shield className="w-6 h-6" />}
                title="Enterprise Security"
                description="Role-based access, field-level permissions, encryption everywhere, complete audit trails. Bank-grade security."
              />
              <TechCard 
                icon={<Globe className="w-6 h-6" />}
                title="Multi-Everything Ready"
                description="Multi-currency, multi-location, multi-company, multi-language. Complex structures handled natively."
              />
              <TechCard 
                icon={<Lock className="w-6 h-6" />}
                title="Compliance-First Design"
                description="GST, regulatory requirements, audit trails — engineered in from day one. Not patched on as afterthought."
              />
              <TechCard 
                icon={<Rocket className="w-6 h-6" />}
                title="Infinite Scalability"
                description="Start with 10 users, scale to 10,000. Same architecture. No re-implementation. No migration pain."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="py-20 md:py-32 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">
            Ready for an <br/>
            <span className="text-white/40">Unfair Advantage?</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
            Stop fighting your software. Start outpacing your competition. 
            See what iSuite can do for your specific operation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="bg-white text-black hover:bg-white/90 rounded-none h-14 px-10 text-sm uppercase tracking-wider font-semibold">
              <Link href="/contact">
                Request Platform Demo
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 text-black hover:bg-white/10 hover:text-white rounded-none h-14 px-10 text-sm uppercase tracking-wider">
              <Link href="/solutions">
                Explore Solutions
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
// COMPONENT: Competitive Stat Card
// ============================================
function CompetitiveStatCard({ metric, label, comparison }: { metric: string; label: string; comparison: string }) {
  return (
    <div className="p-8 bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-center">
      <div className="text-4xl md:text-5xl font-light text-white mb-2">{metric}</div>
      <div className="text-sm font-medium text-white/80 mb-1">{label}</div>
      <div className="text-xs text-white/40">{comparison}</div>
    </div>
  );
}

// ============================================
// COMPONENT: Engine Highlight
// ============================================
function EngineHighlight({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 p-4 border border-white/10 bg-white/[0.02]">
      <Check className="w-5 h-5 text-white/60 shrink-0" />
      <span className="text-white/70">{text}</span>
    </div>
  );
}

// ============================================
// COMPONENT: Power Engine Card
// ============================================
function PowerEngineCard({ 
  icon, 
  number,
  title, 
  tagline,
  description, 
  capabilities,
  competitiveEdge
}: { 
  icon: React.ReactNode;
  number: string;
  title: string; 
  tagline: string;
  description: string;
  capabilities: string[];
  competitiveEdge: string;
}) {
  return (
    <div className="group p-8 md:p-10 border border-black/10 bg-white hover:border-black/30 transition-all duration-500">
      <div className="flex items-start justify-between mb-6">
        <div className="text-black/30 group-hover:text-black transition-colors">
          {icon}
        </div>
        <span className="text-5xl font-light text-black/10">{number}</span>
      </div>
      
      <h4 className="text-2xl font-medium text-black mb-2">{title}</h4>
      <p className="text-sm font-mono text-black/40 uppercase tracking-wider mb-4">{tagline}</p>
      
      <p className="text-black/60 leading-relaxed mb-6">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {capabilities.map((cap, i) => (
          <span 
            key={i}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-black/[0.03] border border-black/10 text-xs text-black/70"
          >
            <Check className="w-3 h-3 text-black/50" />
            {cap}
          </span>
        ))}
      </div>
      
      <div className="pt-6 border-t border-black/10">
        <p className="text-sm text-black/80 italic">"{competitiveEdge}"</p>
      </div>
    </div>
  );
}

// ============================================
// COMPONENT: Comparison Table Row
// ============================================
function ComparisonTableRow({ 
  label, 
  legacy, 
  isuite, 
  isLast = false 
}: { 
  label: string; 
  legacy: string; 
  isuite: string; 
  isLast?: boolean;
}) {
  return (
    <div className={cn("grid grid-cols-3", !isLast && "border-b border-black/10")}>
      <div className="p-6 text-black/70 font-medium text-sm">{label}</div>
      <div className="p-6 text-center border-l border-black/10 text-black/40 text-sm">{legacy}</div>
      <div className="p-6 text-center border-l border-black/10 bg-black/[0.02] text-black font-medium text-sm flex items-center justify-center gap-2">
        <Check className="w-4 h-4 text-black/60 shrink-0" />
        {isuite}
      </div>
    </div>
  );
}

// ============================================
// COMPONENT: Tech Card
// ============================================
function TechCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="flex gap-6 p-6 border border-black/10 bg-gray-50 hover:bg-gray-100 hover:border-black/20 transition-all">
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-black/10 bg-white text-black/60">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-medium text-black mb-2">{title}</h4>
        <p className="text-sm text-black/50 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}