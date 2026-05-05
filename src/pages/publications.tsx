import { useState, useMemo, useEffect } from 'react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filterButtons = [
    { label: ui.filterAll, value: 'All' },
    { label: ui.filterBlog || 'Blog', value: 'Blog' },
    { label: ui.filterReports || 'Reports', value: 'Report' },
    { label: ui.filterArticles || 'Article', value: 'Article' },
    { label: ui.filterBriefs || 'Policy Briefs', value: 'Policy Brief' },
    { label: ui.filterMagazines || 'Magazines', value: 'Magazine' },
    { label: ui.filterBooks || 'Books', value: 'Book' }
  ];

  const filtered = useMemo(() => {
    return publications.filter((item: any) => {
      const matchesFilter = currentFilter === 'All' || item.type === currentFilter;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [publications, currentFilter, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filtered]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  return (
    <main className="flex-grow bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">
              {pageData?.hero?.title || 'Recent Publications'}
            </h1>
            <div className="w-20 h-1 bg-brand-accent mx-auto"></div>
          </div>
          
          <div className="max-w-2xl mx-auto">
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

                {/* Submit Publication CTA */}
                <div className="mt-8 bg-brand-dark rounded-[1.5rem] p-6 text-white text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <i className="fa-solid fa-cloud-arrow-up text-3xl text-brand-accent mb-4 relative z-10 transition-transform group-hover:-translate-y-1"></i>
                  <h4 className="font-bold text-lg mb-2 relative z-10">Submit Your Work</h4>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed relative z-10">
                    Want to feature your research on our platform? Submit your publication for review.
                  </p>
                  <a href={pubData.en.ui.submitUrl || "#"} target="_blank" rel="noopener noreferrer" className="relative z-10 inline-block w-full py-3 bg-brand-accent hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-brand-accent/20 hover:shadow-brand-accent/40 text-sm">
                    Submit Now
                  </a>
                </div>
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-brand-dark">Showing {filtered.length} Results</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedItems.length === 0 ? (
                  <div className="col-span-full py-20 text-center text-gray-400 bg-white rounded-[2.5rem] border border-gray-100">
                    <i className="fas fa-search text-4xl mb-4 text-brand-accent opacity-50"></i>
                    <p className="font-medium">{ui.noResults}</p>
                  </div>
                ) : (
                  paginatedItems.map((item: any) => (
                    <CardPublication 
                      key={item.id} 
                      {...item} 
                      onOpenModal={(id) => setModalItem(publications.find((p: any) => p.id === id))} 
                    />
                  ))
                )}
              </div>

              {/* Pagination UI */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                      currentPage === 1 
                        ? 'text-gray-300 border-gray-100 cursor-not-allowed' 
                        : 'text-brand-dark border-gray-200 hover:border-brand-accent hover:text-brand-accent shadow-sm'
                    }`}
                  >
                    <i className="fas fa-chevron-left text-xs"></i>
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-xl font-bold text-sm transition-all shadow-sm ${
                        currentPage === i + 1
                          ? 'bg-brand-accent text-white border-brand-accent'
                          : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-accent hover:text-brand-accent'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                      currentPage === totalPages 
                        ? 'text-gray-300 border-gray-100 cursor-not-allowed' 
                        : 'text-brand-dark border-gray-200 hover:border-brand-accent hover:text-brand-accent shadow-sm'
                    }`}
                  >
                    <i className="fas fa-chevron-right text-xs"></i>
                  </button>
                </div>
              )}
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
