import SectionMandate from '../components/SectionMandate';
import mandateDataAll from '../data/mandate.json';
import { useLanguage } from '../context/LanguageContext';

export default function Mandate() {
  const { language } = useLanguage();
  const data = ((mandateDataAll as any)[language] || (mandateDataAll as any).en).mandate;

  return (
    <main className="flex-grow">
      {/* Page Header */}
      <section className="bg-brand-dark py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-brand-accent/20 text-brand-accent text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
            {language === 'ar' ? 'أساسنا' : language === 'fr' ? 'Notre Fondation' : language === 'de' ? 'Unser Fundament' : language === 'zh' ? '我们的基础' : 'Our Foundation'}
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            {language === 'ar' ? 'ولايتنا' : language === 'fr' ? 'Notre Mandat' : language === 'de' ? 'Unser Mandat' : language === 'zh' ? '我们的使命' : 'Our Mandate'}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {language === 'ar' ? 'قيادة الحلول القائمة على الأدلة من خلال البحث الصارم وتطوير السياسات الشاملة.' : 
             language === 'fr' ? 'Promouvoir des solutions fondées sur des données probantes grâce à une recherche rigoureuse et une élaboration de politiques inclusives.' :
             language === 'de' ? 'Förderung evidenzbasierter Lösungen durch strenge Forschung und inklusive Politikentwicklung.' :
             language === 'zh' ? '通过严谨的研究和包容性的政策制定，推动循证解决方案。' :
             'Driving evidence-based solutions through rigorous research and inclusive policy development.'}
          </p>
        </div>
      </section>

      {/* Mandate Sections */}
      <SectionMandate
        visionTitle={data.visionTitle}
        visionText={data.visionText}
        missionTitle={data.missionTitle}
        missionList={data.missionList}
        approachTitle={data.approachTitle}
        approachContent={data.approachContent}
        approachSecond={data.approachSecond}
        approachThird={data.approachThird}
        values={data.values}
      />
    </main>
  );
}
