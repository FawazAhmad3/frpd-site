import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardData from '../components/datahub/CardData';
import ModalData from '../components/datahub/ModalData';
import datahubData from '../data/datahub.json';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/shared/SEO';

export default function DataHub() {
  const { language } = useLanguage();
  const data = (datahubData as any)[language] || datahubData.en;
  const ui = data.ui;
  const sidebarCategories = ui.categories;
  const accessFilters = ui.accessFilters;

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [accessFilter, setAccessFilter] = useState('All');
  const [modalItem, setModalItem] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filtered = useMemo(() => {
    return data.resources.filter((r: any) => {
      const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === 'All' || r.category === categoryFilter;
      const matchAccess = accessFilter === 'All' || r.access === accessFilter;
      return matchSearch && matchCategory && matchAccess;
    });
  }, [search, categoryFilter, accessFilter, data.resources]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filtered]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  const openModal = (id: string) => {
    const item = data.resources.find((r: any) => r.id === id);
    if (item) setModalItem(item);
  };

  return (
    <main className="flex-grow bg-gray-50/50 min-h-screen">
      <SEO
        title="DataHub | Open Data, Econometric Datasets & AI Analytics"
        description="FRPD's DataHub provides centralized access to curated open datasets, macroeconomic indicators, trade statistics, AI models, and policy data visualization dashboards."
        keywords="DataHub, Open Data Pakistan, Econometric Datasets, Trade Data, Macroeconomic Indicators, AI Models, Data Science Repository"
        canonicalUrl="/pages/datahub"
      />
      {/* Page Header */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">
              FRPD DataHub
            </h1>
            <p className="text-gray-500 max-w-3xl mx-auto text-lg leading-relaxed mb-6">
              The central repository for high-fidelity economic data, longitudinal surveys, and interactive visualization tools designed to support evidence-based policy making.
            </p>
            <div className="w-16 h-1 bg-brand-accent mx-auto"></div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative group shadow-sm">
              <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-accent transition-colors"></i>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title..."
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Explorer Layout */}
      <section className="py-12 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-32 space-y-8">
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">{ui.sidebarTitle}</h4>
                  <nav className="space-y-1 flex flex-col">
                    {sidebarCategories.map((cat: any) => (
                      <button
                        key={cat.value}
                        onClick={() => setCategoryFilter(cat.value)}
                        className={`category-filter-btn flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all group hover:bg-gray-50 ${
                          categoryFilter === cat.value
                            ? 'active bg-brand-accent/5 text-brand-dark'
                            : 'text-gray-500 hover:text-brand-dark'
                        }`}
                      >
                        <i className={`${cat.icon} w-5 ${categoryFilter === cat.value ? 'text-brand-accent' : 'text-gray-400 group-hover:text-brand-accent'}`}></i>
                        <span>{cat.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">{ui.supportTitle}</h4>
                  <Link to="/contact" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:text-brand-accent hover:bg-brand-accent/5 transition-all group">
                    <i className="fas fa-headset w-5 text-gray-400 group-hover:text-brand-accent"></i>
                    <span>{ui.customRequest}</span>
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow">
              {/* Access Filters */}
              <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-6">
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  {accessFilters.map((af: any) => (
                    <button
                      key={af.value}
                      onClick={() => setAccessFilter(af.value)}
                      className={`access-filter-btn px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                        accessFilter === af.value
                          ? 'active bg-white text-brand-dark shadow-sm'
                          : 'text-gray-500 hover:text-brand-dark'
                      }`}
                    >
                      {af.label}
                    </button>
                  ))}
                </div>
                <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>{filtered.length}</span> {ui.resourcesFound}
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {paginatedItems.length > 0 ? (
                  paginatedItems.map((resource: any) => (
                    <CardData
                      key={resource.id}
                      {...resource}
                      onOpenModal={openModal}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center text-gray-400">
                    <i className="fas fa-search text-4xl mb-4 text-brand-accent"></i>
                    <p className="font-medium">{ui.noResults}</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
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

      {/* Data Request CTA */}
      <section className="py-20 bg-brand-dark text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold mb-6">{ui.ctaTitle}</h2>
          <p className="text-gray-400 mb-10 text-lg">
            {ui.ctaDesc}
          </p>
          <a 
            href={ui.submitUrl || "#"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block px-10 py-4 bg-brand-accent text-white font-bold rounded-full hover:bg-red-600 transition-all btn-hover shadow-xl"
          >
            {ui.ctaButton} <i className="fas fa-paper-plane ml-2"></i>
          </a>
        </div>
      </section>

      {/* Modal */}
      {modalItem && (
        <ModalData item={modalItem} onClose={() => setModalItem(null)} />
      )}
    </main>
  );
}
