"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlatformSection from "@/components/PlatformSection";
import OperationsSection from "@/components/OperationsSection";
import { Button } from "@/components/ui/button";
import { Activity, Box, Briefcase, Cog, FileText, Globe, Layers, Truck, Factory, Cpu, Library, LayoutGrid, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "+=150%", // Pin for 1.5 screen heights
          scrub: 1,
          pin: true,
        }
      });

      // Animate Hero Out
      tl.to(heroRef.current, {
        opacity: 0,
        scale: 0.9,
        y: -50,
        duration: 1,
        ease: "power2.inOut"
      })
      // Animate Nav Hub In
      .fromTo(navRef.current, 
        { 
          opacity: 0, 
          scale: 0.8, 
          y: 100,
          pointerEvents: "none"
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 1,
          ease: "power2.out",
          pointerEvents: "auto"
        },
        "-=0.5"
      );

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="bg-[#0a0a0a] text-white selection:bg-white/20">
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Intro Wrapper (Pinned Sequence) */}
      <div ref={introRef} className="relative h-screen w-full overflow-hidden">
        
        {/* Shared Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-80"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-[#0a0a0a]"></div>
        </div>

        {/* Hero Section */}
        <section ref={heroRef} className="absolute inset-0 flex flex-col justify-center items-center px-6 z-10 h-full w-full">
          <div className="relative max-w-5xl mx-auto text-center space-y-8 pt-20">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1]">
            The AI-Powered ERP <br />
            <span className="text-white/90">That Adapts to Your Business</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            iSuite unifies your entire enterprise—from finance to operations—into a single, intelligent operating system.
          </p>

          <div className="pt-8">
            <Button className="bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 text-sm uppercase tracking-wider font-semibold">
              Start Now
            </Button>
          </div>
          </div>
        </section>

        {/* Navigation Hub (Initially Hidden) */}
        <section ref={navRef} className="absolute inset-0 flex items-center justify-center z-20 h-full w-full px-6 opacity-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl">
            <NavCard 
              href="/industries" 
              title="Industries" 
              description="Tailored solutions for Pharma, Retail, and more." 
              icon={<Factory className="w-8 h-8" />} 
            />
            <NavCard 
              href="/modules" 
              title="Modules" 
              description="Comprehensive suite of business tools." 
              icon={<LayoutGrid className="w-8 h-8" />} 
            />
            <NavCard 
              href="/platform" 
              title="Platform" 
              description="The technology powering your growth." 
              icon={<Cpu className="w-8 h-8" />} 
            />
            <NavCard 
              href="/resources" 
              title="Resources" 
              description="Guides, documentation, and support." 
              icon={<Library className="w-8 h-8" />} 
            />
          </div>
        </section>
      </div>

      {/* Rest of the Page Content */}
      <div className="relative z-30 bg-[#0a0a0a] border-t border-white/10">

      {/* Core Modules Grid */}
      <section className="py-32 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4">Core Infrastructure</h2>
            <h3 className="text-3xl md:text-4xl font-light">Enterprise Resource Planning</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            <ModuleCard 
              icon={<Briefcase className="w-6 h-6" />}
              title="Financial Management"
              description="Budgeting, cost centers, complex tax structures, and deep financial insights."
              href="/modules#erp"
            />
            <ModuleCard 
              icon={<Globe className="w-6 h-6" />}
              title="Sales & Distribution"
              description="Master data, sales orders, delivery, billing, pricing, and credit management."
              href="/modules#sales"
            />
            <ModuleCard 
              icon={<Box className="w-6 h-6" />}
              title="Procurement"
              description="Supplier evaluation, contract management, and relationship lifecycle."
              href="/modules#procurement"
            />
            <ModuleCard 
              icon={<Layers className="w-6 h-6" />}
              title="Inventory Management"
              description="Tracking, order management, transfers, purchasing, and shipping."
              href="/modules#inventory"
            />
            <ModuleCard 
              icon={<Cog className="w-6 h-6" />}
              title="Manufacturing (MRP)"
              description="Production scheduling, bill of materials, capacity planning, and QA."
              href="/modules#mrp"
            />
            <ModuleCard 
              icon={<FileText className="w-6 h-6" />}
              title="Accounting"
              description="AP/AR, general ledger, journals, payroll, and trial balance."
              href="/modules#erp"
            />
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-32 px-6 border-t border-white/10 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="md:w-1/2 space-y-8">
            <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4">Industries</h2>
                <h3 className="text-3xl md:text-5xl font-light leading-tight">
                Tailored for <br/>
                <span className="text-white/50">your sector.</span>
                </h3>
            </div>
            <p className="text-white/60 text-lg leading-relaxed max-w-md">
              iSuite provides specialized solutions for manufacturing, retail, healthcare, and more. 
              Our platform adapts to the unique regulatory and operational requirements of your industry.
            </p>
            <Button asChild className="bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 text-sm uppercase tracking-wider font-semibold">
              <Link href="/industries">View All Industries</Link>
            </Button>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-px bg-white/10 border border-white/10">
             <div className="aspect-square bg-[#0a0a0a] p-8 flex flex-col justify-between group hover:bg-[#111] transition-colors">
                <Cog className="w-8 h-8 text-white/40 group-hover:text-white transition-colors" />
                <span className="text-xl font-light">Manufacturing</span>
             </div>
             <div className="aspect-square bg-[#0a0a0a] p-8 flex flex-col justify-between group hover:bg-[#111] transition-colors">
                <Box className="w-8 h-8 text-white/40 group-hover:text-white transition-colors" />
                <span className="text-xl font-light">Retail</span>
             </div>
             <div className="aspect-square bg-[#0a0a0a] p-8 flex flex-col justify-between group hover:bg-[#111] transition-colors">
                <Activity className="w-8 h-8 text-white/40 group-hover:text-white transition-colors" />
                <span className="text-xl font-light">Healthcare</span>
             </div>
             <div className="aspect-square bg-[#0a0a0a] p-8 flex flex-col justify-between group hover:bg-[#111] transition-colors">
                <Truck className="w-8 h-8 text-white/40 group-hover:text-white transition-colors" />
                <span className="text-xl font-light">Logistics</span>
             </div>
          </div>
        </div>
      </section>

      {/* Operations Section */}
      <OperationsSection />

      {/* Platform Tools */}
      <PlatformSection />

      {/* CTA Section */}
      <section className="py-32 px-6 border-t border-white/10 bg-white text-black">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Ready to modernize your enterprise?
          </h2>
          <p className="text-lg text-black/60 max-w-2xl mx-auto">
            Join the forward-thinking companies using iSuite to power their decision-making.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800 rounded-none h-12 px-8 text-sm uppercase tracking-wider font-semibold">
            Get in Touch
          </Button>
        </div>
      </section>

      <Footer />
      </div>
    </main>
  );
}

function NavCard({ href, title, description, icon }: { href: string, title: string, description: string, icon: React.ReactNode }) {
  return (
    <Link href={href} className="group relative overflow-hidden bg-white/5 border border-white/10 p-8 h-64 flex flex-col justify-between hover:bg-white/10 transition-all duration-500 hover:scale-[1.02]">
       <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
       <div className="text-white/60 group-hover:text-white transition-colors relative z-10">
         {icon}
       </div>
       <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-light">{title}</h3>
            <ArrowRight className="w-5 h-5 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
          </div>
          <p className="text-white/50 text-sm">{description}</p>
       </div>
    </Link>
  )
}

function ModuleCard({ icon, title, description, href }: { icon: React.ReactNode, title: string, description: string, href?: string }) {
    const Content = (
        <div className="group p-8 bg-[#0a0a0a] hover:bg-[#111] transition-colors border border-transparent hover:border-white/5 relative h-full">
            <div className="text-white/40 mb-6 group-hover:text-white transition-colors">{icon}</div>
            <h4 className="text-lg font-medium mb-3 text-white/90">{title}</h4>
            <p className="text-sm text-white/50 leading-relaxed">{description}</p>
        </div>
    );

    if (href) {
        return <Link href={href} className="block h-full">{Content}</Link>;
    }

    return Content;
}

function ListItem({ title }: { title: string }) {
    return (
        <li className="flex items-center gap-3 text-white/80 border-b border-white/5 py-3">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
            {title}
        </li>
    )
}

function ToolCard({ title, icon }: { title: string, icon: React.ReactNode }) {
    return (
        <div className="p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-4">
            <div className="text-white/60">{icon}</div>
            <span className="font-medium text-sm tracking-wide">{title}</span>
        </div>
    )
}