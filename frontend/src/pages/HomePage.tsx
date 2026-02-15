import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Globe,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { api } from '../services/api';
import { Profile } from '../types';
import { LoadingPage } from '../components/LoadingSpinner';

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
  twitter: <Twitter size={20} />,
  globe: <Globe size={20} />,
};

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    // Hardcoded profile data in frontend
    setProfile({
      name: 'Marwin John Gonzales',
      title: 'Full Stack Developer',
      bio: 'Welcome to my personal profile! I am a passionate developer who loves building web applications. Feel free to leave a message in my guestbook!',
      skills: ['JavaScript', 'TypeScript', 'React', 'NestJS', 'Node.js', 'Supabase'],
      socialLinks: [],
    });
    setLoading(false);
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error && !profile) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={loadProfile} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          {/* Avatar */}
          <div className="mb-6">
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-full mx-auto border-4 border-primary-500/30 shadow-lg shadow-primary-500/20"
              />
            ) : (
              <div className="w-32 h-32 rounded-full mx-auto bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-red-600/30">
                {profile?.name?.charAt(0) || 'U'}
              </div>
            )}
          </div>

          {/* Name & Title */}
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">
            <span className="text-gradient">{profile?.name}</span>
          </h1>
          <p className="text-xl text-slate-400 mb-4">{profile?.title}</p>

          {/* Location & Email */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 mb-6">
            {profile?.location && (
              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {profile.location}
              </span>
            )}
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1 hover:text-primary-400 transition-colors"
              >
                <Mail size={16} />
                {profile.email}
              </a>
            )}
          </div>

          {/* Social Links */}
          {profile?.socialLinks && profile.socialLinks.length > 0 && (
            <div className="flex items-center justify-center gap-3 mb-8">
              {profile.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-black/50 text-slate-400 hover:bg-red-600 hover:text-white transition-all duration-200"
                  title={link.platform}
                >
                  {iconMap[link.icon || 'globe'] || <Globe size={20} />}
                </a>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <Link
            to="/guestbook"
            className="inline-flex items-center gap-2 btn-primary text-lg px-6 py-3"
          >
            <Sparkles size={20} />
            Sign My Guestbook
            <ArrowRight size={20} />
          </Link>
        </section>

        {/* Bio Section */}
        <section className="card p-8 mb-8 animate-slide-up">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-gradient">About Me</span>
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            {profile?.bio}
          </p>
        </section>

        {/* Skills Section */}
        {profile?.skills && profile.skills.length > 0 && (
          <section className="card p-8 animate-slide-up animate-delay-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-gradient">Skills & Technologies</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-slate-700/50 rounded-full text-slate-300 border border-slate-600/50 hover:border-primary-500/50 hover:text-primary-400 transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
