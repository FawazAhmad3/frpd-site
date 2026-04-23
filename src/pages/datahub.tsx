import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CardData from '../components/CardData';
import ModalData from '../components/ModalData';
import datahubData from '../data/datahub.json';

const data = datahubData.en;

const sidebarCategories = [
  { label: 'All Resources', value: 'All', icon: 'fas fa-layer-group' },
  { label: 'Surveys', value: 'Surveys', icon: 'fas fa-square-poll-vertical' },
  { label: 'Dashboards', value: 'Dashboards', icon: 'fas fa-chart-pie' },
  { label: 'Reports', value: 'Reports', icon: 'fas fa-file-contract' },
  { label: 'Tools', value: 'Tools', icon: 'fas fa-screwdriver-wrench' },
];

const accessFilters = [
  { label: 'All Access', value: 'All' },
  { label: 'Open Data', value: 'Free' },
  { label: 'Premium', value: 'Premium' },
];

export default function DataHub() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [accessFilter, setAccessFilter] = useState('All');
  const [modalItem, setModalItem] = useState<typeof data.resources[0] | null>(null);

  const filtered = useMemo(() => {
    return data.resources.filter((r) => {
      const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === 'All' || r.category === categoryFilter;
      const matchAccess = accessFilter === 'All' || r.access === accessFilter;
      return matchSearch && matchCategory && matchAccess;
    });
  }, [search, categoryFilter, accessFilter]);

  const openModal = (id: string) => {
    const item = data.resources.find((r) => r.id === id);
    if (item) setModalItem(item);
  };

  return (
    <main className="flex-grow">
      {/* Page Header */}
      <section className="bg-brand-dark py-16 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <span className="inline-block px-4 py-1.5 bg-brand-accent/20 text-brand-accent text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
                Resources Explorer
              </span>
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                {data.hero.title}
              </h1>
              <p className="text-gray-400 max-w-xl text-base leading-relaxed">
                {data.hero.description}
              </p>
            </div>

            {/* Search */}
            <div className="w-full max-w-md relative group">
              <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-accent transition-colors"></i>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title..."
                className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:bg-white/10 transition-all shadow-2xl"
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
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Resource Types</h4>
                  <nav className="space-y-1 flex flex-col">
                    {sidebarCategories.map((cat) => (
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
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Support</h4>
                  <Link to="/contact" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:text-brand-accent hover:bg-brand-accent/5 transition-all group">
                    <i className="fas fa-headset w-5 text-gray-400 group-hover:text-brand-accent"></i>
                    <span>Custom Request</span>
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow">
              {/* Access Filters */}
              <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-6">
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  {accessFilters.map((af) => (
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
                  <span>{filtered.length}</span> Resources Found
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filtered.length > 0 ? (
                  filtered.map((resource) => (
                    <CardData
                      key={resource.id}
                      {...resource}
                      onOpenModal={openModal}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center text-gray-400">
                    <i className="fas fa-search text-4xl mb-4 text-brand-accent"></i>
                    <p className="font-medium">No resources found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Request CTA */}
      <section className="py-20 bg-brand-dark text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold mb-6">Need a Specialized Dataset?</h2>
          <p className="text-gray-400 mb-10 text-lg">
            Our data engineering team provides custom data procurement, cleaning, and advanced analytical services tailored to your specific research or policy objectives.
          </p>
          <Link to="/contact" className="inline-block px-10 py-4 bg-brand-accent text-white font-bold rounded-full hover:bg-blue-600 transition-all btn-hover shadow-xl">
            Submit Data Request <i className="fas fa-paper-plane ml-2"></i>
          </Link>
        </div>
      </section>

      {/* Modal */}
      {modalItem && (
        <ModalData item={modalItem} onClose={() => setModalItem(null)} />
      )}
    </main>
  );
}
