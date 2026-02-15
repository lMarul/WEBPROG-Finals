import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, User, BookOpen } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-primary-600/20 text-primary-400'
        : 'text-slate-300 hover:text-white hover:bg-slate-800'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-gradient"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white text-sm font-bold">P</span>
            </div>
            Profile
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={navLinkClass} end>
              <User size={18} />
              <span>About</span>
            </NavLink>
            <NavLink to="/guestbook" className={navLinkClass}>
              <BookOpen size={18} />
              <span>Guestbook</span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-700/50 animate-slide-down">
            <div className="flex flex-col gap-2">
              <NavLink
                to="/"
                className={navLinkClass}
                end
                onClick={() => setIsOpen(false)}
              >
                <User size={18} />
                <span>About</span>
              </NavLink>
              <NavLink
                to="/guestbook"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                <BookOpen size={18} />
                <span>Guestbook</span>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
