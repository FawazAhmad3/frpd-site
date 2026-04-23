import { useState } from 'react';
import CardEvent from '../components/CardEvent';
import eventsData from '../data/events.json';
import { useLanguage } from '../context/LanguageContext';

export default function WorkshopsEvents() {
  const { language } = useLanguage();
  const data = (eventsData as any)[language] || eventsData.en;
  const header = data.header;
  const allEvents = data.events || [];

  const [currentFilter, setCurrentFilter] = useState('All');
  const [isStatusFilter, setIsStatusFilter] = useState(false);

  const filterLabels: any = {
    'en': { 'All': 'All Events', 'Workshop': 'Workshops', 'Seminar': 'Seminars', 'Conference': 'Conferences', 'Webinar': 'Webinars', 'Roundtable': 'Roundtables', 'Coming Soon': 'Coming Soon', 'Knowledge Hub': 'Knowledge Hub' },
    'ar': { 'All': 'كل الفعاليات', 'Workshop': 'ورش العمل', 'Seminar': 'ندوات', 'Conference': 'مؤتمرات', 'Webinar': 'ندوات عبر الإنترنت', 'Roundtable': 'طاولات مستديرة', 'Coming Soon': 'قريباً', 'Knowledge Hub': 'مركز المعرفة' },
    'fr': { 'All': 'Tous les événements', 'Workshop': 'Ateliers', 'Seminar': 'Séminaires', 'Conference': 'Conférences', 'Webinar': 'Webinaires', 'Roundtable': 'Tables rondes', 'Coming Soon': 'Bientôt', 'Knowledge Hub': 'Centre de connaissances' },
    'de': { 'All': 'Alle Veranstaltungen', 'Workshop': 'Workshops', 'Seminar': 'Seminare', 'Conference': 'Konferenzen', 'Webinar': 'Webinare', 'Roundtable': 'Runde Tische', 'Coming Soon': 'Demnächst', 'Knowledge Hub': 'Wissenszentrum' },
    'zh': { 'All': '所有活动', 'Workshop': '研讨会', 'Seminar': '研讨会', 'Conference': '会议', 'Webinar': '网络研讨会', 'Roundtable': '圆桌会议', 'Coming Soon': '即将推出', 'Knowledge Hub': '知识中心' }
  };

  const l = filterLabels[language] || filterLabels.en;

  const filterButtons = [
    { label: l['All'], filter: 'All', isStatus: false },
    { label: l['Workshop'], filter: 'Workshop', isStatus: false },
    { label: l['Seminar'], filter: 'Seminar', isStatus: false },
    { label: l['Conference'], filter: 'Conference', isStatus: false },
    { label: l['Webinar'], filter: 'Webinar', isStatus: false },
    { label: l['Roundtable'], filter: 'Roundtable', isStatus: false },
    { label: l['Coming Soon'], filter: 'Coming Soon', isStatus: true },
  ];

  const filtered = allEvents.filter((item: any) => {
    if (currentFilter === 'All') return true;
    if (isStatusFilter) return item.status === currentFilter;
    return item.type === currentFilter;
  });

  return (
    <>
      {/* Page Header */}
      <section className="bg-brand-dark py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-brand-accent/20 text-brand-accent text-sm font-bold uppercase tracking-widest rounded-full mb-6 animate__animated animate__fadeInDown">{l['Knowledge Hub']}</span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 animate__animated animate__fadeInUp">{header.title}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed animate__animated animate__fadeInUp animate__delay-1s">
            {header.description}
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-28 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 py-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {filterButtons.map((btn) => (
              <button
                key={btn.label}
                onClick={() => { setCurrentFilter(btn.filter); setIsStatusFilter(btn.isStatus); }}
                className={`event-filter-btn px-6 py-2.5 rounded-xl border border-gray-200 bg-white text-brand-dark font-semibold shadow-sm hover:border-brand-accent hover:text-brand-accent transition-all ${
                  currentFilter === btn.filter ? 'active' : ''
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.length === 0 ? (
              <div className="col-span-full py-20 text-center text-gray-400">
                {language === 'ar' ? 'لم يتم العثور على فعاليات للفئة المختارة.' : 
                 language === 'fr' ? 'Aucun événement trouvé pour la catégorie sélectionnée.' :
                 language === 'de' ? 'Keine Veranstaltungen für die ausgewählte Kategorie gefunden.' :
                 language === 'zh' ? '未找到所选类别的活动。' :
                 'No events found for the selected category.'}
              </div>
            ) : (
              filtered.map((item: any) => <CardEvent key={item.id} {...item} />)
            )}
          </div>
        </div>
      </section>
    </>
  );
}
