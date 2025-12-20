import Link from "next/link";
import Image from "next/image";

const solutionLinks = [
  { label: "Financial Management", href: "/solutions#financial" },
  { label: "Sales & Distribution", href: "/solutions#sales" },
  { label: "Procurement", href: "/solutions#procurement" },
  { label: "Inventory Management", href: "/solutions#inventory" },
  { label: "Manufacturing (MRP)", href: "/solutions#manufacturing" },
  { label: "Project Management", href: "/solutions#pm" },
];

const industryLinks = [
  { label: "Pharmaceutical & Life Sciences", href: "/industries#pharma" },
  { label: "Industrial Manufacturing", href: "/industries#manufacturing" },
  { label: "Retail & FMCG", href: "/industries#retail" },
  { label: "Construction & Infrastructure", href: "/industries#construction" },
  { label: "Financial Services", href: "/industries#finance" },
  { label: "Distribution & Logistics", href: "/industries#distribution" },
];

const resourceLinks = [
  { label: "Platform Overview", href: "/platform" },
  { label: "Solutions Library", href: "/solutions" },
  { label: "Industries We Serve", href: "/industries" },
  { label: "Book a Consultation", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-white text-black/60 py-20 px-6 border-t border-black/10 text-sm">
      <div className="max-w-7xl mx-auto grid gap-12 grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] items-start">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Image
              src="/logos/iSuiteLogoMathWhite.svg"
              alt="iSuite Logo"
              width={40}
              height={40}
              className="w-10 h-auto"
            />
            <span className="text-2xl font-medium text-black tracking-tight">iSuite</span>
          </Link>
          <p className="max-w-md mb-6">
            We build custom ERP experiences across finance, operations, and field teams.
            Every workflow on this site is something we have delivered for real customers.
          </p>
          <div className="space-y-3 text-xs text-black/40">
            <p>&copy; {new Date().getFullYear()} iSuite Software Solutions Pvt. Ltd. All rights reserved.</p>
            <Link href="/contact" className="text-black hover:text-black/70 transition-colors">
              Need something specific? Book a consultation →
            </Link>
          </div>
        </div>

        <div className="space-y-12 lg:space-y-0 lg:flex lg:items-start lg:justify-between lg:gap-12 lg:col-span-3">
        <div>
          <h3 className="text-black font-medium mb-4 uppercase tracking-wider text-xs">Solutions</h3>
          <ul className="space-y-3">
            {solutionLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-black transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-black font-medium mb-4 uppercase tracking-wider text-xs">Industries</h3>
          <ul className="space-y-3">
            {industryLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-black transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-black font-medium mb-4 uppercase tracking-wider text-xs">Explore</h3>
          <ul className="space-y-3">
            {resourceLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-black transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </footer>
  );
}
