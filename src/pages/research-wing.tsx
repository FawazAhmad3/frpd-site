import { useState } from 'react';
import CardResearch from '../components/CardResearch';
import ModalResearch from '../components/ModalResearch';
import researchDataAll from '../data/research-wing.json';
import { useLanguage } from '../context/LanguageContext';
import globalData from '../data/global.json';

type ResearchItem = any;

export default function ResearchWing() {
  const { language } = useLanguage();
  const langData = (researchDataAll as any)[language] || (researchDataAll as any).en;
  const researchData = langData.items;
  const categories = langData.filters.categories;
  const types = langData.filters.types;
  const t = (globalData as any)[language].buttons;

  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [currentType, setCurrentType] = useState(types[0]);
  const [selectedItem, setSelectedItem] = useState<ResearchItem | null>(null);

  const filtered = researchData.filter((item: any) => {
    const catMatch = currentCategory === categories[0] || item.category === currentCategory;
    const typeMatch = currentType === types[0] || item.type === currentType;
    return catMatch && typeMatch;
  });

  return (
    <>
      {/* Page Header */}
      <section className="bg-brand-dark py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-accent to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 animate__animated animate__fadeInDown">{langData.header.title}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed animate__animated animate__fadeInUp">
            {langData.header.summary}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 bg-white border-b border-gray-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => setCurrentCategory(cat)}
                className={`category-btn px-6 py-2 rounded-full border font-medium shadow-sm transition-all ${
                  currentCategory === cat
                    ? 'bg-brand-accent text-white border-brand-accent shadow-md'
                    : 'border-gray-200 bg-white text-brand-dark hover:border-brand-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 border-t border-gray-100 pt-6">
            {types.map((t: string) => (
              <button
                key={t}
                onClick={() => setCurrentType(t)}
                className={`text-sm font-bold uppercase tracking-widest pb-1 transition-all ${
                  currentType === t
                    ? 'text-brand-accent border-b-2 border-brand-accent'
                    : 'text-brand-dark/50 hover:text-brand-accent hover:border-b-2 hover:border-brand-accent/30'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Research Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.length === 0 ? (
              <div className="col-span-full py-20 text-center text-gray-400">
                {language === 'ar' ? 'لم يتم العثور على مقالات بحثية للفلاتر المختارة.' : 
                 language === 'fr' ? 'Aucun article de recherche trouvé pour les filtres sélectionnés.' :
                 language === 'de' ? 'Keine Forschungsartikel für die ausgewählten Filter gefunden.' :
                 language === 'zh' ? '未找到所选筛选条件的研究文章。' :
                 'No research articles found for the selected filters.'}
              </div>
            ) : (
              filtered.map((item) => (
                <CardResearch
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  type={item.type}
                  date={item.date}
                  category={item.category}
                  onOpenModal={(id) => {
                    const found = researchData.find((r) => r.id === id);
                    if (found) setSelectedItem(found);
                  }}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {selectedItem && <ModalResearch item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </>
  );
}
