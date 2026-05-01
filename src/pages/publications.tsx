import { useState, useMemo } from 'react';
import CardPublication from '../components/publications/CardPublication';
import ModalPublication from '../components/publications/ModalPublication';
import pubData from '../data/publications.json';
import { useLanguage } from '../context/LanguageContext';

export default function Publications() {
  const { language } = useLanguage();
  const pageData = (pubData as any)[language] || pubData.en;
  const ui = pageData.ui;
  const publications = pageData.publications || [];

  const [currentFilter, setCurrentFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalItem, setModalItem] = useState<any>(null);

  const filterButtons = [
    { label: ui.filterAll, value: 'All' },
    { label: ui.filterReports, value: 'Report' },
    { label: ui.filterBriefs, value: 'Policy Brief' },
    { label: ui.filterArticles, value: 'Article' }
  ];

  const filtered = useMemo(() => {
    return publications.filter((item: any) => {
      const matchesFilter = currentFilter === 'All' || item.type === currentFilter;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [publications, currentFilter, searchTerm]);

  return (
    <main className="flex-grow bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-left mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">
              {pageData?.hero?.title || 'Recent Publications'}
            </h1>
            <div className="w-16 h-1 bg-brand-accent mx-auto md:mx-0"></div>
          </div>
          
          <div className="max-w-2xl">
            <div className="relative group shadow-sm">
              <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-accent transition-colors"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or author..."
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-32 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <h4 className="text-sm font-bold text-brand-dark uppercase tracking-widest mb-6 pb-4 border-b border-gray-100">Filter by Type</h4>
                <nav className="space-y-2 flex flex-col">
                  {filterButtons.map((btn: any) => (
                    <button
                      key={btn.value}
                      onClick={() => setCurrentFilter(btn.value)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-[1rem] text-sm font-bold transition-all ${
                        currentFilter === btn.value
                          ? 'bg-brand-accent text-white shadow-md'
                          : 'text-gray-600 hover:bg-blue-50 hover:text-brand-accent'
                      }`}
                    >
                      <i className={`fas fa-chevron-right text-[10px] ${currentFilter === btn.value ? 'text-white/70' : 'text-gray-300'}`}></i>
                      <span>{btn.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-brand-dark">Showing {filtered.length} Results</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.length === 0 ? (
                  <div className="col-span-full py-20 text-center text-gray-400 bg-white rounded-[2.5rem] border border-gray-100">
                    <i className="fas fa-search text-4xl mb-4 text-brand-accent opacity-50"></i>
                    <p className="font-medium">{ui.noResults}</p>
                  </div>
                ) : (
                  filtered.map((item: any) => (
                    <CardPublication 
                      key={item.id} 
                      {...item} 
                      onOpenModal={(id) => setModalItem(publications.find((p: any) => p.id === id))} 
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalItem && (
        <ModalPublication item={modalItem} onClose={() => setModalItem(null)} />
      )}
    </main>
  );
}
