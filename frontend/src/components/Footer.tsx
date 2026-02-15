import { Heart, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900/50 border-t border-slate-700/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span>Built with</span>
            <Heart size={16} className="text-red-500 fill-current" />
            <span>using</span>
            <span className="text-primary-400 font-medium">React</span>
            <span>+</span>
            <span className="text-primary-400 font-medium">NestJS</span>
            <span>+</span>
            <span className="text-primary-400 font-medium">Supabase</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <span className="text-slate-500">
              © {currentYear} All rights reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
