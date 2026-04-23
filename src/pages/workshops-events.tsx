import { useState } from 'react';
import CardEvent from '../components/CardEvent';
import eventsData from '../data/events.json';

type EventItem = typeof eventsData.en[0];

const filterButtons = [
  { label: 'All Events', filter: 'All', isStatus: false },
  { label: 'Workshops', filter: 'Workshop', isStatus: false },
  { label: 'Seminars', filter: 'Seminar', isStatus: false },
  { label: 'Conferences', filter: 'Conference', isStatus: false },
  { label: 'Webinars', filter: 'Webinar', isStatus: false },
  { label: 'Roundtables', filter: 'Roundtable', isStatus: false },
  { label: 'Coming Soon', filter: 'Coming Soon', isStatus: true },
];

export default function WorkshopsEvents() {
  const [currentFilter, setCurrentFilter] = useState('All');
  const [isStatusFilter, setIsStatusFilter] = useState(false);

  const allEvents: EventItem[] = eventsData.en || [];

  const filtered = allEvents.filter((item) => {
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
          <span className="inline-block px-4 py-1.5 bg-brand-accent/20 text-brand-accent text-sm font-bold uppercase tracking-widest rounded-full mb-6 animate__animated animate__fadeInDown">Knowledge Hub</span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 animate__animated animate__fadeInUp">Workshops & Events</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed animate__animated animate__fadeInUp animate__delay-1s">
            Connecting global experts, policy makers, and researchers through high-impact workshops, seminars, and academic conferences.
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
              <div className="col-span-full py-20 text-center text-gray-400">No events found for the selected category.</div>
            ) : (
              filtered.map((item) => <CardEvent key={item.id} {...item} />)
            )}
          </div>
        </div>
      </section>
    </>
  );
}
