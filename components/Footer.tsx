import Link from "next/link";
import { Zap, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="col-span-2 sm:col-span-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center">
              <Zap size={12} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-slate-900">Elevatr</span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            Build smarter resumes, craft better outreach, and get hired faster with Gemini AI.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 text-sm mb-4">Product</h4>
          <ul className="space-y-2.5 text-sm text-slate-500">
            <li><Link href="/resume-analyzer" className="hover:text-slate-900 transition-colors">Resume Analyzer</Link></li>
            <li><Link href="/cold-email" className="hover:text-slate-900 transition-colors">Cold Email</Link></li>
            <li><Link href="/interview" className="hover:text-slate-900 transition-colors">Interview Q&A</Link></li>
            <li><Link href="/job-role-matcher" className="hover:text-slate-900 transition-colors">Job Matcher</Link></li>
            <li><Link href="/pricing" className="hover:text-slate-900 transition-colors">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 text-sm mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm text-slate-500">
            <li><Link href="/" className="hover:text-slate-900 transition-colors">Home</Link></li>
            <li><Link href="/contact" className="hover:text-slate-900 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 text-sm mb-4">Legal</h4>
          <ul className="space-y-2.5 text-sm text-slate-500">
            <li><Link href="/" className="hover:text-slate-900 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/" className="hover:text-slate-900 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-400">© {year} Elevatr. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="https://github.com" target="_blank" aria-label="GitHub" className="text-slate-400 hover:text-slate-600 transition-colors">
            <Github size={16} />
          </Link>
          <Link href="https://twitter.com" target="_blank" aria-label="Twitter" className="text-slate-400 hover:text-slate-600 transition-colors">
            <Twitter size={16} />
          </Link>
          <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn" className="text-slate-400 hover:text-slate-600 transition-colors">
            <Linkedin size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
