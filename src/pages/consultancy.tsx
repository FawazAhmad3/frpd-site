import SectionProgramCategory from '../components/SectionProgramCategory';
import paData from '../data/policy-advisory.json';
import { useLanguage } from '../context/LanguageContext';

export default function Consultancy() {
  const { language } = useLanguage();
  const data = (paData as any)[language] || paData.en;

  const badgeLabel = language === 'ar' ? 'الخدمات الاستشارية' : 
                     language === 'fr' ? 'Services de conseil' : 
                     language === 'de' ? 'Beratungsdienste' : 
                     language === 'zh' ? '咨询服务' : 'Advisory Services';

  return (
    <main className="flex-grow">
      {/* Page Header */}
      <section className="bg-brand-dark py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-brand-accent/20 text-brand-accent text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
            {badgeLabel}
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{data.hero.title}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">{data.hero.description}</p>
        </div>
      </section>

      {/* Service Categories */}
      {(data.categories || []).map((cat: any) => (
        <SectionProgramCategory
          key={cat.id}
          id={cat.id}
          title={cat.title}
          icon={cat.icon}
          colorClass={cat.colorClass}
          bgClass={cat.bgClass}
          programs={cat.programs}
        />
      ))}
    </main>
  );
}
