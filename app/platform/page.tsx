"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
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
  FileText
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
    
    // Globe parameters
    const GLOBE_RADIUS = 300;
    const DOT_RADIUS = 1.5;
    const DOT_COUNT = 400;
    const CONNECTION_DISTANCE = 90;
    const ROTATION_SPEED = 0.001;

    // Generate points on a sphere
    const points: { x: number, y: number, z: number, baseX: number, baseY: number, baseZ: number }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < DOT_COUNT; i++) {
      const y = 1 - (i / (DOT_COUNT - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      
      const theta = phi * i; // golden angle increment
      
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
      
      // Center of canvas
      const cx = width / 2;
      const cy = height / 2;

      // Rotate globe
      rotationY += ROTATION_SPEED;
      rotationX += ROTATION_SPEED * 0.5;

      // Update and draw points
      const projectedPoints: { x: number, y: number, z: number }[] = [];

      points.forEach(point => {
        // Rotate around Y axis
        let x1 = point.baseX * Math.cos(rotationY) - point.baseZ * Math.sin(rotationY);
        let z1 = point.baseZ * Math.cos(rotationY) + point.baseX * Math.sin(rotationY);
        
        // Rotate around X axis
        let y1 = point.baseY * Math.cos(rotationX) - z1 * Math.sin(rotationX);
        let z2 = z1 * Math.cos(rotationX) + point.baseY * Math.sin(rotationX);

        // Project 3D to 2D (simple orthographic + perspective hint)
        const scale = 800 / (800 - z2);
        const x2D = x1 * scale + cx;
        const y2D = y1 * scale + cy;

        // Only store points that are somewhat "in front" or close to it for connections
        projectedPoints.push({ x: x2D, y: y2D, z: z2 });

        // Draw point
        const alpha = Math.max(0.1, (z2 + GLOBE_RADIUS) / (2 * GLOBE_RADIUS)); // Fade back points
        ctx.beginPath();
        ctx.arc(x2D, y2D, DOT_RADIUS * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.fill();
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < projectedPoints.length; i++) {
        const p1 = projectedPoints[i];
        // Optimization: only check some neighbors or use spatial partitioning if needed. 
        // For 400 points, brute force is okay-ish but let's limit checks to keep it fast.
        // We only connect points that are physically close on the sphere surface in 3D space would be better,
        // but 2D distance check is visually interesting too as it creates "scanning" effects.
        
        // Let's only connect if z is positive (front of sphere) to reduce clutter
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

export default function PlatformPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-white/20 overflow-x-hidden">
      <Navbar />
      
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        
        {/* Geometric Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#030303] to-[#030303]"></div>
          <GeometricGlobe />
          
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)]"></div>
        </div>

        {/* Content */}
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
            <div className="flex items-center gap-3 px-5 py-2.5 border border-white/10 rounded-full bg-white/[0.03] backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
                Next Generation Architecture
              </span>
            </div>
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-[0.95] mb-10 text-white mix-blend-screen">
            <motion.span 
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Capability
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="block text-white/40"
            >
              Without Limits.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed mb-16"
          >
            A proprietary architecture designed for one purpose: enterprise software that truly fits. 
            No rigid templates. No artificial constraints. Just your operations, digitized exactly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <Button 
              asChild
              className="bg-white text-black hover:bg-white/90 rounded-full h-14 px-10 text-sm uppercase tracking-wider font-semibold transition-all hover:scale-105"
            >
              <Link href="/contact">
                See It In Action
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/5 rounded-full h-14 px-10 text-sm uppercase tracking-wider font-medium border border-white/10 hover:border-white/20 transition-all"
            >
              <Link href="/contact">
                Explore Platform
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-full h-1/2 bg-gradient-to-b from-transparent to-white/50"
            />
          </div>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* THE PHILOSOPHY SECTION */}
      {/* ============================================ */}
      <section className="py-32 px-6 border-t border-white/10 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-6">The Philosophy</h2>
              <h3 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                Most ERPs Force You <br/>
                <span className="text-white/40">Into Their Mold.</span>
              </h3>
              <div className="space-y-6 text-lg text-white/60 leading-relaxed">
                <p>
                  Traditional enterprise software starts with assumptions about how businesses should operate — then forces you into that mold.
                </p>
                <p>
                  iSuite was architected differently. From the ground up, we built a platform designed to adapt to <em>any</em> operational requirement, <em>any</em> workflow, <em>any</em> way of working.
                </p>
                <p className="text-white/80 font-medium">
                  The result: enterprise capability without enterprise rigidity.
                </p>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-12 relative overflow-hidden">
                {/* Abstract visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 border border-white/20 rotate-45 animate-[spin_20s_linear_infinite]"></div>
                    <div className="absolute inset-4 border border-white/15 rotate-12 animate-[spin_15s_linear_infinite_reverse]"></div>
                    <div className="absolute inset-8 border border-white/10 -rotate-12 animate-[spin_25s_linear_infinite]"></div>
                    <div className="absolute inset-12 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                      <Layers className="w-12 h-12 text-white/40" />
                    </div>
                  </div>
                </div>
                
                {/* Corner labels */}
                <div className="absolute top-4 left-4 text-[10px] font-mono text-white/30 uppercase tracking-wider">Flexibility</div>
                <div className="absolute top-4 right-4 text-[10px] font-mono text-white/30 uppercase tracking-wider">Depth</div>
                <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/30 uppercase tracking-wider">Speed</div>
                <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/30 uppercase tracking-wider">Control</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CAPABILITY PILLARS */}
      {/* ============================================ */}
      <section className="py-32 px-6 border-t border-white/10 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-6">Platform Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-light">
              What You <span className="text-white/40">Get.</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            <CapabilityCard 
              icon={<Settings2 className="w-8 h-8" />}
              title="Unlimited Screen Customization"
              description="Every form, every field, every data capture point — designed exactly as your process requires. New screens deploy in hours, not months."
              highlights={["Any field type", "Any validation rule", "Any layout"]}
            />
            <CapabilityCard 
              icon={<Workflow className="w-8 h-8" />}
              title="Intelligent Workflow Automation"
              description="Approval chains that match your actual authority structure. Complex business rules automated precisely as your organization operates."
              highlights={["Multi-level approvals", "Conditional routing", "Automatic actions"]}
            />
            <CapabilityCard 
              icon={<BarChart3 className="w-8 h-8" />}
              title="Real-Time Analytics & Reporting"
              description="The exact reports you need, showing exactly what matters. Build any analytical view across any data, updated in real-time."
              highlights={["Any data source", "Any calculation", "Any visualization"]}
            />
            <CapabilityCard 
              icon={<FileText className="w-8 h-8" />}
              title="Complete Document Control"
              description="Every invoice, PO, and report formatted exactly as your business demands. Full brand control, regulatory compliance, automated generation."
              highlights={["Pixel-perfect output", "Dynamic fields", "Batch generation"]}
            />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TECHNICAL FOUNDATION */}
      {/* ============================================ */}
      <section className="py-32 px-6 border-t border-white/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-6">Technical Foundation</h2>
              <h3 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                Enterprise-Grade. <br/>
                <span className="text-white/40">Modern Architecture.</span>
              </h3>
              <p className="text-lg text-white/50 leading-relaxed mb-8">
                Built on a distributed architecture designed to handle millions of transactions with sub-second response times. Security and compliance aren't afterthoughts — they're foundational.
              </p>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-none h-12 px-8">
                <Link href="/contact">
                  Request Technical Deep-Dive <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-6">
              <TechCard 
                icon={<Zap className="w-6 h-6" />}
                color="blue"
                title="High-Performance Engine"
                description="Sub-200ms query latency even on complex reports. Built to scale from startup to enterprise without architectural changes."
              />
              <TechCard 
                icon={<Shield className="w-6 h-6" />}
                color="purple"
                title="Enterprise Security"
                description="Role-based access control, field-level permissions, complete audit trails, and encryption at rest and in transit."
              />
              <TechCard 
                icon={<Globe className="w-6 h-6" />}
                color="emerald"
                title="Multi-Entity Ready"
                description="Multi-currency, multi-location, multi-company. Handle complex organizational structures without workarounds."
              />
              <TechCard 
                icon={<RefreshCcw className="w-6 h-6" />}
                color="amber"
                title="Real-Time Sync"
                description="Changes propagate instantly across the system. What happens on the shop floor appears in finance dashboards immediately."
              />
              <TechCard 
                icon={<Lock className="w-6 h-6" />}
                color="rose"
                title="Compliance Ready"
                description="GST, regulatory requirements, audit trails — built in from day one. Not bolted on as an afterthought."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* THE DIFFERENCE */}
      {/* ============================================ */}
      <section className="py-32 px-6 border-t border-white/10 bg-[#030303]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-6">The Difference</h2>
            <h3 className="text-4xl md:text-5xl font-light mb-8">
              Why This <span className="text-white/40">Matters.</span>
            </h3>
            <p className="text-xl text-white/50 max-w-3xl mx-auto">
              When your platform is built for flexibility from the ground up, everything changes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <DifferenceCard 
              number="01"
              title="New Requirements? Days, Not Months."
              description="When a new process emerges or regulations change, you're not waiting on a development queue. Configure and deploy."
            />
            <DifferenceCard 
              number="02"
              title="Your Processes, Not Ours."
              description="Stop hearing 'that's how the software works.' iSuite works how YOU work. Every workflow, every approval, every report."
            />
            <DifferenceCard 
              number="03"
              title="Scale Without Fear."
              description="Add entities, add locations, add complexity. The architecture handles it. No re-implementation, no data migration nightmares."
            />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="py-32 px-6 bg-white text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">
            See the Platform <br/>
            <span className="text-black/40">In Action.</span>
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto mb-12">
            Words only go so far. Request a personalized demo and see how iSuite would handle your specific requirements.
          </p>
          <Button asChild className="bg-black text-white hover:bg-black/90 rounded-none h-14 px-10 text-sm uppercase tracking-wider font-semibold">
            <Link href="/contact">
              Request Platform Demo
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ============================================
// COMPONENT: Capability Card
// ============================================
function CapabilityCard({ 
  icon, 
  title, 
  description, 
  highlights 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  highlights: string[];
}) {
  return (
    <div className="group p-10 bg-[#050505] hover:bg-[#0a0a0a] transition-all duration-500">
      <div className="text-white/30 group-hover:text-white/60 transition-colors mb-6">
        {icon}
      </div>
      <h4 className="text-2xl font-light text-white mb-4">{title}</h4>
      <p className="text-white/50 leading-relaxed mb-6">{description}</p>
      <div className="flex flex-wrap gap-2">
        {highlights.map((highlight, i) => (
          <span 
            key={i}
            className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 border border-white/10 text-xs text-white/60"
          >
            <Check className="w-3 h-3 text-emerald-500/70" />
            {highlight}
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================
// COMPONENT: Tech Card
// ============================================
function TechCard({ 
  icon, 
  color, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  color: "blue" | "purple" | "emerald" | "amber" | "rose";
  title: string; 
  description: string;
}) {
  const colorClasses = {
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    rose: "bg-rose-500/10 border-rose-500/20 text-rose-400",
  };

  return (
    <div className="flex gap-6 p-6 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
      <div className={cn("w-12 h-12 flex-shrink-0 flex items-center justify-center border", colorClasses[color])}>
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-medium text-white mb-2">{title}</h4>
        <p className="text-sm text-white/50 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ============================================
// COMPONENT: Difference Card
// ============================================
function DifferenceCard({ 
  number, 
  title, 
  description 
}: { 
  number: string; 
  title: string; 
  description: string;
}) {
  return (
    <div className="p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
      <div className="text-5xl font-light text-white/10 mb-6">{number}</div>
      <h4 className="text-xl font-medium text-white mb-4">{title}</h4>
      <p className="text-white/50 leading-relaxed">{description}</p>
    </div>
  );
}