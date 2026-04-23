import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import globalData from '../data/global.json';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const t = (globalData as any)[language].nav;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white text-brand-dark shadow-[0_5px_15px_rgba(0,0,0,0.25)] sticky top-0 z-50">
      <div className="w-full px-2 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-28">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center pr-4 animate__animated animate__delay-0.1s animate__slower animate__backInRight">
            <Link to="/" className="flex items-center group">
              <img
                src="/assets/icons/logo.png"
                alt="FRPD Logo"
                className="h-12 sm:h-16 lg:h-20 w-auto object-contain rounded shadow-sm group-hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          {/* Right Wrapper */}
          <div className="flex items-center space-x-4 lg:space-x-8 animate__animated animate__delay-0.1s animate__slower animate__backInLeft">
            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6 text-[15px] font-medium">
              <Link to="/" className={`hover:text-brand-accent transition-colors ${isActive('/') ? 'text-brand-accent' : ''}`}>{t.home}</Link>

              {/* What We Do Dropdown */}
              <div className="relative dropdown group">
                <button className="hover:text-brand-accent flex items-center transition-colors pb-12 -mb-12 pt-12 -mt-12">
                  <span>{t.whatWeDo}</span>
                  <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </button>
                <div className="dropdown-menu absolute left-0 top-full w-80 bg-white text-brand-dark rounded-md shadow-xl z-20 border border-gray-100 mt-1 pb-2 animate__animated animate__zoomIn animate__faster">
                  <Link to="/pages/research-wing" className="block px-6 py-3 text-base font-semibold hover:bg-brand-gray hover:text-brand-accent tracking-wide">{t.research}</Link>
                  <div className="border-t border-gray-100"></div>
                  <Link to="/pages/online-courses" className="block px-6 py-3 text-base font-semibold hover:bg-brand-gray hover:text-brand-accent tracking-wide">{t.onlineCourses}</Link>
                  <div className="border-t border-gray-100"></div>
                  <Link to="/pages/capacity-building" className="block px-6 py-3 text-base font-semibold hover:bg-brand-gray hover:text-brand-accent tracking-wide">{t.capacityBuilding}</Link>
                  <div className="border-t border-gray-100"></div>
                  <Link to="/pages/consultancy" className="block px-6 py-3 text-base font-semibold hover:bg-brand-gray hover:text-brand-accent tracking-wide">{t.policyAdvisory}</Link>
                </div>
              </div>

              <Link to="/pages/workshops-events" className="hover:text-brand-accent transition-colors">{t.workshops}</Link>
              <Link to="/pages/publications" className="hover:text-brand-accent transition-colors">{t.publications}</Link>
              <Link to="/pages/datahub" className="hover:text-brand-accent transition-colors">{t.datahub}</Link>

              {/* About Us Dropdown */}
              <div className="relative dropdown group">
                <button className="hover:text-brand-accent flex items-center transition-colors pb-12 -mb-12 pt-12 -mt-12">
                  <span>{t.aboutUs}</span>
                  <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </button>
                <div className="dropdown-menu absolute right-0 top-full w-56 bg-white text-brand-dark rounded-md shadow-xl z-20 border border-gray-100 mt-1 animate__animated animate__zoomIn animate__faster">
                  <Link to="/pages/mandate" className="block px-4 py-3 text-base hover:bg-brand-gray hover:text-brand-accent">{t.mandate}</Link>
                  <Link to="/pages/governance" className="block px-4 py-3 text-base hover:bg-brand-gray hover:text-brand-accent">{t.governance}</Link>
                  <Link to="/pages/careers" className="block px-4 py-3 text-base hover:bg-brand-gray hover:text-brand-accent">{t.careers}</Link>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3 lg:space-x-4 flex-shrink-0">
              <Link
                to="/pages/contact"
                className="hidden lg:inline-block bg-brand-accent text-white px-6 py-2.5 rounded-full hover:bg-blue-600 transition-colors btn-hover shadow-md font-semibold"
              >
                {t.contactUs}
              </Link>

              {/* Language Switcher */}
              <div className="relative dropdown group">
                <button className="flex items-center space-x-2 text-brand-dark hover:text-brand-accent transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-50 border border-gray-100 lg:border-none lg:hover:bg-transparent">
                  <i className="fas fa-globe"></i>
                  <span className="uppercase">{language}</span>
                  <i className="fas fa-chevron-down text-[10px]"></i>
                </button>
                <div className="dropdown-menu absolute right-0 top-full w-40 bg-white text-brand-dark rounded-md shadow-xl z-50 border border-gray-100 mt-1 animate__animated animate__zoomIn animate__faster">
                  <button onClick={() => setLanguage('en')} className={`w-full text-left px-4 py-3 text-sm hover:bg-brand-gray hover:text-brand-accent ${language === 'en' ? 'font-bold text-brand-accent' : ''}`}>English</button>
                  <button onClick={() => setLanguage('ar')} className={`w-full text-left px-4 py-3 text-sm hover:bg-brand-gray hover:text-brand-accent ${language === 'ar' ? 'font-bold text-brand-accent' : ''}`}>العربية (Arabic)</button>
                  <button onClick={() => setLanguage('fr')} className={`w-full text-left px-4 py-3 text-sm hover:bg-brand-gray hover:text-brand-accent ${language === 'fr' ? 'font-bold text-brand-accent' : ''}`}>Français (French)</button>
                  <button onClick={() => setLanguage('de')} className={`w-full text-left px-4 py-3 text-sm hover:bg-brand-gray hover:text-brand-accent ${language === 'de' ? 'font-bold text-brand-accent' : ''}`}>Deutsch (German)</button>
                  <button onClick={() => setLanguage('zh')} className={`w-full text-left px-4 py-3 text-sm hover:bg-brand-gray hover:text-brand-accent ${language === 'zh' ? 'font-bold text-brand-accent' : ''}`}>中文 (Chinese)</button>
                </div>
              </div>

              {/* Mobile button */}
              <div className="lg:hidden flex items-center">
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="text-brand-dark hover:text-brand-accent focus:outline-none p-2 flex items-center justify-center min-w-[44px] min-h-[44px]"
                  aria-label="Toggle Menu"
                >
                  <i className="fas fa-bars text-2xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${mobileOpen ? '' : 'hidden'} lg:hidden bg-white border-t border-gray-100 pb-4 shadow-xl`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
          {[
            { to: '/', label: t.home },
            { to: '/pages/research-wing', label: t.research },
            { to: '/pages/online-courses', label: t.onlineCourses },
            { to: '/pages/capacity-building', label: t.capacityBuilding },
            { to: '/pages/workshops-events', label: t.workshops },
            { to: '/pages/publications', label: t.publications },
            { to: '/pages/consultancy', label: t.policyAdvisory },
            { to: '/pages/datahub', label: t.datahub },
            { to: '/pages/mandate', label: t.mandate },
            { to: '/pages/governance', label: t.governance },
            { to: '/pages/careers', label: t.careers },
          ].map((item: any) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-dark hover:text-brand-accent hover:bg-gray-50 transition"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/pages/contact"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-bold text-brand-accent hover:text-brand-dark hover:bg-gray-50 transition"
          >
            {t.contactUs}
          </Link>
          
          <div className="border-t border-gray-100 my-2 pt-2 px-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Switch Language</span>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => { setLanguage('en'); setMobileOpen(false); }} className={`px-3 py-2 rounded-md text-sm font-medium ${language === 'en' ? 'bg-brand-accent text-white' : 'bg-gray-50 text-brand-dark'}`}>English</button>
              <button onClick={() => { setLanguage('ar'); setMobileOpen(false); }} className={`px-3 py-2 rounded-md text-sm font-medium ${language === 'ar' ? 'bg-brand-accent text-white' : 'bg-gray-50 text-brand-dark'}`}>العربية</button>
              <button onClick={() => { setLanguage('fr'); setMobileOpen(false); }} className={`px-3 py-2 rounded-md text-sm font-medium ${language === 'fr' ? 'bg-brand-accent text-white' : 'bg-gray-50 text-brand-dark'}`}>Français</button>
              <button onClick={() => { setLanguage('de'); setMobileOpen(false); }} className={`px-3 py-2 rounded-md text-sm font-medium ${language === 'de' ? 'bg-brand-accent text-white' : 'bg-gray-50 text-brand-dark'}`}>Deutsch</button>
              <button onClick={() => { setLanguage('zh'); setMobileOpen(false); }} className={`px-3 py-2 rounded-md text-sm font-medium ${language === 'zh' ? 'bg-brand-accent text-white' : 'bg-gray-50 text-brand-dark'}`}>中文</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
