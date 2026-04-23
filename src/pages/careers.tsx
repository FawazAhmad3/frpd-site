import { Link } from 'react-router-dom';
import CardCareer from '../components/CardCareer';
import careersData from '../data/careers.json';
import { useLanguage } from '../context/LanguageContext';

export default function Careers() {
  const { language } = useLanguage();
  const data = (careersData as any)[language].careers;
  return (
    <main className="flex-grow">
      {/* Page Header */}
      <section className="bg-brand-dark py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-brand-accent/20 text-brand-accent text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
            Opportunities
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{data.title}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">{data.summary}</p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-accent font-bold tracking-[0.3em] uppercase text-xs block mb-4">Current Openings</span>
            <h2 className="text-4xl font-heading font-bold text-gray-900 italic">Open Positions</h2>
            <div className="w-20 h-1 bg-brand-accent mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {data.listings.map((listing, i) => (
              <CardCareer key={i} {...listing} />
            ))}
          </div>
        </div>
      </section>

      {/* Talent Pool CTA */}
      <section className="py-20 bg-brand-gray overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white p-12 rounded-3xl shadow-lg border border-gray-100">
            <div className="w-20 h-20 bg-brand-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <i className="fas fa-user-plus text-brand-accent text-3xl"></i>
            </div>
            <h2 className="text-3xl font-heading font-bold text-brand-dark mb-4">Don't See a Fit?</h2>
            <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
              Submit your CV to our global talent pool. We'll reach out when a matching role becomes available.
            </p>
            <a
              href={data.cvLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-brand-dark text-white font-bold rounded-full hover:bg-brand-accent transition-all btn-hover shadow-xl"
            >
              Join Talent Pool <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
