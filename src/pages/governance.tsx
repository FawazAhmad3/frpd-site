import { useState, useMemo } from 'react';
import CardMember from '../components/governance/CardMember';
import govDataAll from '../data/governance.json';
import { useLanguage } from '../context/LanguageContext';

export default function Governance() {
  const { language } = useLanguage();
  const pageData = (govDataAll as any)[language] || (govDataAll as any).en;
  const data = pageData.governance || {};
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Faculty'); // 'Administrative' or 'Faculty'
  const [designationSearch, setDesignationSearch] = useState('');

  // Combine all staff with a type marker
  const allStaff = useMemo(() => {
    const faculty = [
      ...(data.board || []).map((m: any) => ({ ...m, type: 'Faculty' })),
      ...(data.team || []).map((m: any) => ({ ...m, type: 'Faculty' }))
    ];
    const admin = (data.adminStaff || []).map((m: any) => ({ ...m, type: 'Administrative' }));
    return [...faculty, ...admin];
  }, [data]);

  const filteredStaff = useMemo(() => {
    return allStaff.filter((m: any) => {
      const matchType = m.type === selectedType;
      const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDesignation = m.role.toLowerCase().includes(designationSearch.toLowerCase());
      return matchType && matchSearch && matchDesignation;
    });
  }, [allStaff, selectedType, searchTerm, designationSearch]);

  return (
    <main className="flex-grow bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">
              Advance Staff Search
            </h1>
            <div className="w-16 h-1 bg-brand-accent mx-auto"></div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative group shadow-sm">
              <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-accent transition-colors"></i>
              <input
                type="text"
                placeholder="Find Staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-10">
              
              {/* Staff Type Radio */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="staffType"
                    checked={selectedType === 'Faculty'}
                    onChange={() => setSelectedType('Faculty')}
                    className="w-4 h-4 text-brand-accent focus:ring-brand-accent border-gray-300"
                  />
                  <span className={`text-sm font-medium ${selectedType === 'Faculty' ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
                    Faculty / Researcher
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="staffType"
                    checked={selectedType === 'Administrative'}
                    onChange={() => setSelectedType('Administrative')}
                    className="w-4 h-4 text-brand-accent focus:ring-brand-accent border-gray-300"
                  />
                  <span className={`text-sm font-medium ${selectedType === 'Administrative' ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
                    Administrative Staff
                  </span>
                </label>
              </div>

              {/* Designation Search */}
              <div className="pt-8 border-t border-gray-50">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Search By Designation</h4>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={designationSearch}
                    onChange={(e) => setDesignationSearch(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-accent/10 transition-all"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Staff Grid */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredStaff.length > 0 ? (
                filteredStaff.map((member: any, i: number) => (
                  <CardMember key={i} {...member} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-white rounded-xl border border-gray-100">
                  <i className="fas fa-user-slash text-3xl text-gray-200 mb-4"></i>
                  <p className="text-gray-400 font-medium">No staff members found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
