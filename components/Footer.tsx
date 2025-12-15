import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white/60 py-20 px-6 border-t border-white/10 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
        <div className="col-span-2 lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Image 
              src="/logos/outlineWhite.svg" 
              alt="iSuite Logo" 
              width={40} 
              height={40} 
              className="w-10 h-auto"
            />
            <span className="text-2xl font-medium text-white tracking-tight">iSuite</span>
          </Link>
          <p className="max-w-sm mb-8">
            Empowering enterprises with intelligent ERP solutions. 
            From financial management to operational automation, 
            we build the backbone of modern business.
          </p>
          <div className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} iSuite Pvt. Ltd. All rights reserved.
          </div>
        </div>

        <div>
          <h3 className="text-white font-medium mb-4 uppercase tracking-wider text-xs">Core ERP</h3>
          <ul className="space-y-3">
            <li><Link href="/modules#erp" className="hover:text-white transition-colors">Financial Management</Link></li>
            <li><Link href="/modules#sales" className="hover:text-white transition-colors">Sales & Distribution</Link></li>
            <li><Link href="/modules#procurement" className="hover:text-white transition-colors">Procurement</Link></li>
            <li><Link href="/modules#inventory" className="hover:text-white transition-colors">Inventory Management</Link></li>
            <li><Link href="/modules#mrp" className="hover:text-white transition-colors">Manufacturing (MRP)</Link></li>
            <li><Link href="/modules#erp" className="hover:text-white transition-colors">Accounting</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-medium mb-4 uppercase tracking-wider text-xs">Operations</h3>
          <ul className="space-y-3">
            <li><Link href="/modules#pm" className="hover:text-white transition-colors">Project Management</Link></li>
            <li><Link href="/industries#finance" className="hover:text-white transition-colors">Fixed Assets</Link></li>
            <li><Link href="/industries#commercial" className="hover:text-white transition-colors">Customer Service</Link></li>
            <li><Link href="/industries#operations" className="hover:text-white transition-colors">HR & Payroll</Link></li>
            <li><Link href="/industries#commercial" className="hover:text-white transition-colors">Vehicle Management</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-medium mb-4 uppercase tracking-wider text-xs">Platform</h3>
          <ul className="space-y-3">
            <li><Link href="/platform" className="hover:text-white transition-colors">Transaction Builder</Link></li>
            <li><Link href="/platform" className="hover:text-white transition-colors">Report Builder</Link></li>
            <li><Link href="/platform" className="hover:text-white transition-colors">Workflow Engine</Link></li>
            <li><Link href="/platform" className="hover:text-white transition-colors">Dashboard Builder</Link></li>
            <li><Link href="/platform" className="hover:text-white transition-colors">LMS & DMS</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
