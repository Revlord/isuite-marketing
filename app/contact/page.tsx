"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { 
  Mail, MapPin, Phone, ArrowRight, Check, Clock, 
  Shield, Headset, Building2, Factory, Pill, Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const industries = [
  { value: "pharma", label: "Pharmaceutical & Life Sciences", icon: Pill },
  { value: "manufacturing", label: "Industrial Manufacturing", icon: Factory },
  { value: "retail", label: "Retail & FMCG", icon: Package },
  { value: "construction", label: "Construction & Infrastructure", icon: Building2 },
  { value: "finance", label: "Financial Services", icon: Building2 },
  { value: "distribution", label: "Distribution & Logistics", icon: Package },
  { value: "other", label: "Other", icon: Building2 },
];

const companySize = [
  { value: "small", label: "1-50 employees" },
  { value: "medium", label: "51-200 employees" },
  { value: "large", label: "201-1000 employees" },
  { value: "enterprise", label: "1000+ employees" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    size: "",
    currentERP: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black/10">
      <Navbar />

      {/* ============================================ */}
      {/* HERO */}
      {/* ============================================ */}
      <section className="relative pt-32 pb-16 px-6 border-b border-black/10 overflow-hidden">
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
              Get Started
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-light tracking-tight mb-6"
          >
            See iSuite <span className="text-black/40">In Action.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-black/50 max-w-2xl font-light"
          >
            Every organization is different. Request a personalized demo and see how 
            iSuite would handle your specific requirements.
          </motion.p>
        </div>
      </section>

      {/* ============================================ */}
      {/* MAIN CONTENT */}
      {/* ============================================ */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16">
          
          {/* Form Column */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-2xl font-light mb-2">Request Your Demo</h2>
              <p className="text-black/50">Fill out the form below and we'll be in touch within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField 
                  label="First Name"
                  required
                  value={formData.firstName}
                  onChange={(v) => setFormData({...formData, firstName: v})}
                />
                <FormField 
                  label="Last Name"
                  required
                  value={formData.lastName}
                  onChange={(v) => setFormData({...formData, lastName: v})}
                />
              </div>

              {/* Contact Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField 
                  label="Work Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(v) => setFormData({...formData, email: v})}
                />
                <FormField 
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(v) => setFormData({...formData, phone: v})}
                />
              </div>

              {/* Company */}
              <FormField 
                label="Company Name"
                required
                value={formData.company}
                onChange={(v) => setFormData({...formData, company: v})}
              />

              {/* Industry & Size Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-black/50">
                    Industry <span className="text-black/30">*</span>
                  </label>
                  <select 
                    required
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    className="w-full bg-gray-50 border border-black/10 p-4 text-black focus:outline-none focus:border-black/30 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-white">Select Industry</option>
                    {industries.map(ind => (
                      <option key={ind.value} value={ind.value} className="bg-white">{ind.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-black/50">
                    Company Size
                  </label>
                  <select 
                    value={formData.size}
                    onChange={(e) => setFormData({...formData, size: e.target.value})}
                    className="w-full bg-gray-50 border border-black/10 p-4 text-black focus:outline-none focus:border-black/30 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-white">Select Size</option>
                    {companySize.map(size => (
                      <option key={size.value} value={size.value} className="bg-white">{size.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Current ERP */}
              <FormField 
                label="Current ERP System (if any)"
                placeholder="e.g., SAP, Oracle, Tally, Custom, None"
                value={formData.currentERP}
                onChange={(v) => setFormData({...formData, currentERP: v})}
              />

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">
                  Tell Us About Your Requirements
                </label>
                <textarea 
                  rows={5}
                  placeholder="What challenges are you looking to solve? What does your ideal solution look like?"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-gray-50 border border-black/10 p-4 text-black focus:outline-none focus:border-black/30 transition-colors resize-none placeholder:text-black/30"
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button 
                  type="submit"
                  className="w-full md:w-auto bg-black text-white hover:bg-black/90 rounded-none h-14 px-12 text-sm uppercase tracking-wider font-semibold group"
                >
                  Request Demo
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-black/30">
                By submitting this form, you agree to our privacy policy. We'll never share your information with third parties.
              </p>
            </form>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* What to Expect */}
            <div className="bg-gray-50 border border-black/10 p-8">
              <h3 className="text-lg font-medium mb-6">What to Expect</h3>
              <div className="space-y-4">
                <ExpectationItem 
                  step="01"
                  title="Discovery Call"
                  description="30-minute conversation to understand your requirements and challenges."
                />
                <ExpectationItem 
                  step="02"
                  title="Personalized Demo"
                  description="See iSuite configured for your specific industry and use cases."
                />
                <ExpectationItem 
                  step="03"
                  title="Solution Proposal"
                  description="Detailed proposal with timeline, scope, and investment."
                />
              </div>
            </div>

            {/* Trust Elements */}
            <div className="space-y-4">
              <TrustCard 
                icon={<Clock className="w-5 h-5" />}
                title="Response Within 24 Hours"
                description="Our team responds to every inquiry within one business day."
              />
              <TrustCard 
                icon={<Shield className="w-5 h-5" />}
                title="No Obligation"
                description="Demos are free with no pressure. We believe in earning your business."
              />
              <TrustCard 
                icon={<Headset className="w-5 h-5" />}
                title="Direct Access"
                description="Talk to people who understand enterprise software, not salespeople with scripts."
              />
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 border border-black/10 p-8">
              <h3 className="text-lg font-medium mb-6">Direct Contact</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-black/40 mt-1" />
                  <div>
                    <div className="text-black/60 text-sm mb-1">Email</div>
                    <a href="mailto:hello@isuite.com" className="text-black hover:text-black/80 transition-colors">
                      hello@isuite.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-black/40 mt-1" />
                  <div>
                    <div className="text-black/60 text-sm mb-1">Phone</div>
                    <a href="tel:+15551234567" className="text-black hover:text-black/80 transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-black/40 mt-1" />
                  <div>
                    <div className="text-black/60 text-sm mb-1">Headquarters</div>
                    <address className="text-black not-italic">
                      123 Innovation Drive<br/>
                      Tech District, CA 94025
                    </address>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* ALTERNATIVE CTA */}
      {/* ============================================ */}
      <section className="py-20 px-6 border-t border-black/10 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-6">
            Not Ready for a Demo?
          </h2>
          <p className="text-black/50 mb-8 max-w-2xl mx-auto">
            Explore our platform, modules, and industry solutions at your own pace. 
            When you're ready to talk, we'll be here.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="outline" className="border-black/20 text-black hover:bg-black/5 rounded-none h-12 px-8">
              <Link href="/platform">Explore Platform</Link>
            </Button>
            <Button asChild variant="outline" className="border-black/20 text-black hover:bg-black/5 rounded-none h-12 px-8">
              <Link href="/solutions">View Modules</Link>
            </Button>
            <Button asChild variant="outline" className="border-black/20 text-black hover:bg-black/5 rounded-none h-12 px-8">
              <Link href="/industries">Industry Solutions</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ============================================
// COMPONENT: Form Field
// ============================================
function FormField({ 
  label, 
  type = "text", 
  required = false, 
  placeholder,
  value,
  onChange
}: { 
  label: string; 
  type?: string; 
  required?: boolean; 
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-black/50">
        {label} {required && <span className="text-black/30">*</span>}
      </label>
      <input 
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-50 border border-black/10 p-4 text-black focus:outline-none focus:border-black/30 transition-colors placeholder:text-black/30"
      />
    </div>
  );
}

// ============================================
// COMPONENT: Expectation Item
// ============================================
function ExpectationItem({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="text-2xl font-light text-black/20">{step}</div>
      <div>
        <div className="font-medium text-black mb-1">{title}</div>
        <div className="text-sm text-black/50">{description}</div>
      </div>
    </div>
  );
}

// ============================================
// COMPONENT: Trust Card
// ============================================
function TrustCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4 p-4 border border-black/10 bg-white">
      <div className="text-black/40">{icon}</div>
      <div>
        <div className="font-medium text-black text-sm mb-1">{title}</div>
        <div className="text-xs text-black/50">{description}</div>
      </div>
    </div>
  );
}