import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import globalData from '../data/global.json';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { language } = useLanguage();
  const t = (globalData as any)[language].footer;
  const nav = (globalData as any)[language].nav;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setStatus({ text: t.subscribeSuccess, type: 'success' });
      setEmail('');
    } catch {
      setStatus({ text: t.subscribeError, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-blue-50 text-gray-700 mt-auto border-t-8 border-brand-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side */}
          <div className="lg:col-span-7 space-y-10">
            <div className="flex items-center gap-6">
              <img src="/assets/icons/logo.png" alt="FRPD" className="h-24 w-auto object-contain" />
              <div className="border-l-2 border-gray-200 pl-6">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-gray-500">
                  Firm of Research, Policy and Development
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-4 text-sm font-medium border-y border-gray-100 py-6">
              {[
                { to: '/pages/research-wing', label: nav.research },
                { to: '/pages/online-courses', label: nav.onlineCourses },
                { to: '/pages/capacity-building', label: nav.capacityBuilding },
                { to: '/pages/workshops-events', label: nav.workshops },
                { to: '/pages/consultancy', label: nav.policyAdvisory },
                { to: '/pages/datahub', label: nav.datahub },
                { to: '/pages/mandate', label: nav.mandate },
                { to: '/pages/governance', label: nav.governance },
                { to: '/pages/contact', label: nav.contactUs },
              ].map((item, i, arr) => (
                <span key={item.to} className="flex items-center gap-6">
                  <Link to={item.to} className="hover:text-brand-accent transition-colors">{item.label}</Link>
                  {i < arr.length - 1 && <span className="text-gray-300">|</span>}
                </span>
              ))}
            </div>

            <div className="pt-2 text-sm text-gray-500 leading-relaxed italic">
              {t.tagline}
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-5 space-y-10">
            <div className="text-center lg:text-left">
              <h4 className="text-2xl font-heading font-bold text-gray-900 mb-2">{t.subscribe}</h4>
              <p className="text-sm text-gray-500 mb-4">{t.subscribeDesc}</p>
              <form onSubmit={handleSubmit} className="flex max-w-md mx-auto lg:ml-0 overflow-hidden border border-gray-300 rounded shadow-sm focus-within:border-brand-accent transition-all">
                <input
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-3 text-sm focus:outline-none bg-transparent"
                />
                <button type="submit" disabled={submitting} className="bg-brand-accent text-white px-6 hover:bg-blue-600 transition-colors">
                  {submitting ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-envelope"></i>}
                </button>
              </form>
              {status && (
                <p className={`mt-2 text-xs font-semibold ${status.type === 'success' ? 'text-brand-accent' : 'text-red-500'}`}>
                  {status.text}
                </p>
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm group cursor-pointer border-t border-gray-50 pt-4">
                  <i className="fas fa-phone text-brand-accent"></i>
                  <span className="font-medium group-hover:text-brand-accent">0092 344 9198158</span>
                </div>
                <div className="flex items-center gap-4 text-sm group cursor-pointer border-t border-gray-50 pt-4">
                  <i className="fas fa-envelope text-brand-accent"></i>
                  <span className="font-medium group-hover:text-brand-accent">info@frpd.pk</span>
                </div>
                <div className="flex items-center gap-4 text-sm group cursor-pointer border-t border-gray-50 pt-4 pb-2">
                  <i className="fas fa-map-marker-alt text-brand-accent"></i>
                  <span className="font-medium group-hover:text-brand-accent">{t.address}</span>
                </div>
              </div>
              <div className="text-right">
                <Link to="/pages/governance" className="inline-flex items-center gap-2 text-brand-accent font-bold text-sm hover:gap-3 transition-all">
                  {t.staffDirectory}
                  <i className="fas fa-chevron-right text-[10px]"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-brand-dark text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm font-medium tracking-wide">
          &copy; {new Date().getFullYear()} Firm of Research, Policy and Development. {t.allRights}
        </div>
      </div>
    </footer>
  );
}
