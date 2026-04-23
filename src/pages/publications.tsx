import { useState } from 'react';
import CardPublication from '../components/CardPublication';
import pubData from '../data/publications.json';

const filterButtons = ['All', 'Report', 'Policy Brief', 'Article'];

export default function Publications() {
  const [currentFilter, setCurrentFilter] = useState('All');

  const pageData = (pubData as Record<string, { hero?: { title: string; description: string }; publications?: Array<{ id: string; title: string; author: string; date: string; type: string; typeClass: string; description: string; thumbnail: string; downloadUrl: string }> }>).en;
  const publications = pageData?.publications || [];

  const filtered = publications.filter((item) => currentFilter === 'All' || item.type === currentFilter);

  return (
    <>
      {/* Page Header */}
      <section className="bg-brand-dark py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-accent rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-900 rounded-full blur-3xl opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-brand-accent/20 text-brand-accent text-xs font-bold uppercase tracking-widest rounded-full mb-6 animate__animated animate__fadeInDown">Knowledge Repository</span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 animate__animated animate__fadeInUp">{pageData?.hero?.title || 'Publications'}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed animate__animated animate__fadeInUp animate__delay-1s">
            {pageData?.hero?.description || 'Access our high-impact reports, detailed policy briefs, and peer-reviewed research articles shaping global development policy.'}
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-28 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {filterButtons.map((type) => (
              <button
                key={type}
                onClick={() => setCurrentFilter(type)}
                className={`pub-filter-btn px-5 py-2 rounded-full border border-gray-200 text-xs font-bold uppercase tracking-widest shadow-sm transition-all ${
                  currentFilter === type ? 'active bg-brand-accent text-white' : 'bg-white text-brand-dark hover:border-brand-accent hover:text-brand-accent'
                }`}
              >
                {type === 'All' ? 'All Works' : type === 'Report' ? 'Reports' : type === 'Policy Brief' ? 'Policy Briefs' : 'Research Articles'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50/50 min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.length === 0 ? (
              <div className="col-span-full py-20 text-center text-gray-400">No publications found for the selected category.</div>
            ) : (
              filtered.map((item) => <CardPublication key={item.id} {...item} />)
            )}
          </div>
        </div>
      </section>
    </>
  );
}
