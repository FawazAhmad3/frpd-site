import CardMember from '../components/CardMember';
import govDataAll from '../data/governance.json';
import { useLanguage } from '../context/LanguageContext';

export default function Governance() {
  const { language } = useLanguage();
  const pageData = (govDataAll as any)[language] || (govDataAll as any).en;
  const data = pageData.governance || {};
  const ui = pageData.ui || {};

  const labels: any = {
    en: { strategic: "Strategic Leadership", team: "Core Team", operations: "Operations" },
    ar: { strategic: "القيادة الاستراتيجية", team: "الفريق الأساسي", operations: "العمليات" },
    fr: { strategic: "Direction stratégique", team: "Équipe de base", operations: "Opérations" },
    de: { strategic: "Strategische Führung", team: "Kernteam", operations: "Betrieb" },
    zh: { strategic: "战略领导力", team: "核心团队", operations: "运营" }
  };
  const l = labels[language] || labels.en;

  return (
    <main className="flex-grow">
      {/* Page Header */}
      <section className="bg-brand-dark py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-brand-accent/20 text-brand-accent text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
            {ui.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{ui.heroTitle}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {ui.heroDesc}
          </p>
        </div>
      </section>

      {/* Board of Governors */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate__animated animate__fadeInUp">
            <span className="text-brand-accent font-bold tracking-[0.3em] uppercase text-xs block mb-4">{l.strategic}</span>
            <h2 className="text-4xl font-heading font-bold text-gray-900 italic">{data.boardTitle}</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">{data.boardSummary}</p>
            <div className="w-20 h-1 bg-brand-accent mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {(data.board || []).map((member: any, i: number) => (
              <CardMember key={i} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Research & Policy Team */}
      <section className="py-20 bg-brand-gray overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate__animated animate__fadeInUp">
            <span className="text-brand-accent font-bold tracking-[0.3em] uppercase text-xs block mb-4">{l.team}</span>
            <h2 className="text-4xl font-heading font-bold text-gray-900 italic">{data.teamTitle}</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">{data.teamSummary}</p>
            <div className="w-20 h-1 bg-brand-accent mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {(data.team || []).map((member: any, i: number) => (
              <CardMember key={i} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Administrative Staff */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate__animated animate__fadeInUp">
            <span className="text-brand-accent font-bold tracking-[0.3em] uppercase text-xs block mb-4">{l.operations}</span>
            <h2 className="text-4xl font-heading font-bold text-gray-900 italic">{data.adminTitle}</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">{data.adminSummary}</p>
            <div className="w-20 h-1 bg-brand-accent mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {(data.adminStaff || []).map((member: any, i: number) => (
              <CardMember key={i} {...member} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
