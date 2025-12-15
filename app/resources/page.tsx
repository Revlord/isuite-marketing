"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "motion/react";
import Image from "next/image";
import { 
  Book, Code, Shield, FileText, Terminal, 
  Database, Lock, Server, ArrowUpRight, Search,
  PlayCircle, FileJson, GraduationCap, ChevronRight
} from "lucide-react";

const featuredResources = [
  {
    title: "Integration Guide",
    category: "Developers",
    description: "Learn how to connect iSuite with your existing legacy systems using our REST API.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Security Whitepaper",
    category: "Compliance",
    description: "A deep dive into our encryption standards, data residency policies, and SOC 2 compliance.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Platform Architecture",
    category: "Technical",
    description: "Understanding the distributed event-driven architecture that powers iSuite's scalability.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  }
];

const resources = [
  {
    category: "Documentation",
    icon: Book,
    items: [
      { title: "Getting Started Guide", desc: "Initial setup, configuration, and first steps." },
      { title: "User Manuals", desc: "Detailed guides for every module and feature." },
      { title: "Admin Console", desc: "Managing users, roles, and system settings." },
      { title: "Release Notes", desc: "Latest updates, features, and bug fixes." }
    ]
  },
  {
    category: "API & Integration",
    icon: Terminal,
    items: [
      { title: "REST API Reference", desc: "Complete endpoint documentation for developers." },
      { title: "Webhooks", desc: "Event-driven integration patterns." },
      { title: "Authentication", desc: "OAuth2, API Keys, and SSO configuration." },
      { title: "SDKs & Libraries", desc: "Official client libraries for Python, Node, and Java." }
    ]
  },
  {
    category: "Security & Compliance",
    icon: Shield,
    items: [
      { title: "Security Architecture", desc: "Encryption, network security, and data protection." },
      { title: "Compliance Certifications", desc: "SOC 2, GDPR, HIPAA, and ISO 27001." },
      { title: "Audit Logs", desc: "Understanding system-wide audit trails." },
      { title: "Data Residency", desc: "Global data center locations and policies." }
    ]
  },
  {
    category: "Architecture",
    icon: Server,
    items: [
      { title: "System Requirements", desc: "Hardware and software prerequisites." },
      { title: "Deployment Models", desc: "Cloud, On-Premise, and Hybrid options." },
      { title: "Scalability", desc: "Handling high-volume transaction loads." },
      { title: "Disaster Recovery", desc: "Backup strategies and business continuity." }
    ]
  }
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 border-b border-white/10 overflow-hidden">
         {/* Background Image */}
         <div className="absolute inset-0 z-0">
            <Image 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                alt="Background"
                fill
                className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/90 to-[#0a0a0a]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
                Resources & <br/>
                <span className="text-white/40">Documentation.</span>
              </h1>
              <p className="text-xl text-white/60 max-w-2xl font-light">
                Everything you need to build, integrate, and scale with iSuite.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="w-full md:w-96 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/30 group-focus-within:text-white/60 transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Search documentation..." 
                className="w-full bg-white/5 border border-white/10 rounded-none py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-8">Featured</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {featuredResources.map((res, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group cursor-pointer"
                    >
                        <div className="relative h-64 mb-6 overflow-hidden border border-white/10">
                            <Image 
                                src={res.image}
                                alt={res.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6">
                                <span className="text-xs font-mono text-blue-400 mb-2 block">{res.category}</span>
                                <h3 className="text-xl font-medium text-white">{res.title}</h3>
                            </div>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed mb-4">{res.description}</p>
                        <div className="flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                            Read Article <ChevronRight className="w-4 h-4" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Resource Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {resources.map((section, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
                  <section.icon className="w-6 h-6 text-white/60" />
                  <h2 className="text-2xl font-light">{section.category}</h2>
                </div>

                <div className="grid gap-px bg-white/10 border border-white/10">
                  {section.items.map((item, j) => (
                    <a 
                      key={j} 
                      href="#" 
                      className="group block bg-[#0a0a0a] p-6 hover:bg-[#111] transition-colors relative"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors opacity-0 group-hover:opacity-100" />
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {item.desc}
                      </p>
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer CTA */}
      <section className="py-24 px-6 bg-white text-black border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <h2 className="text-4xl font-light mb-4">Start building today.</h2>
            <p className="text-black/60 text-lg max-w-xl">
              Get your API keys and start integrating iSuite into your existing stack.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors">
              Get API Keys
            </button>
            <button className="px-8 py-4 border border-black/20 font-medium hover:bg-gray-50 transition-colors">
              View Changelog
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
