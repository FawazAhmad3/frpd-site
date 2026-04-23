import { useState, useRef, useEffect, useCallback } from 'react';
import CardCourse from '../components/CardCourse';
import ModalCourse from '../components/ModalCourse';
import programsData from '../data/online-programs.json';
import { useLanguage } from '../context/LanguageContext';

interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  reviewsCount: string;
  price: string;
  oldPrice: string;
  badge: string;
  badgeVisibility: string;
  image: string;
  duration?: string;
  level?: string;
}

export default function OnlineCourses() {
  const { language } = useLanguage();
  const data = (programsData as any)[language] || programsData.en;
  const [activeTab, setActiveTab] = useState('all');
  const [modalCourse, setModalCourse] = useState<Course | null>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const allCourses: Course[] = data.categories.flatMap((c: any) => c.courses);

  const activeCat = data.categories.find((c: any) => c.id === activeTab);
  
  const allLabel = data.ui.allLabel;

  const displayName = activeTab === 'all' ? allLabel : activeCat?.name || '';
  const displayDesc = activeTab === 'all' ? data.ui.allDescription : activeCat?.description || '';

  const courses: Course[] = activeTab === 'all' ? allCourses : activeCat?.courses || [];

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
  }, [updateScrollButtons, activeTab]);

  const scrollGrid = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 300;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const openModal = (id: string) => {
    const course = allCourses.find((c) => c.id === id);
    if (course) setModalCourse(course);
  };

  return (
    <main className="flex-grow">
      {/* Premium Banner */}
      <section className="bg-white pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate__animated animate__fadeIn">
            {data.hero.title}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl animate__animated animate__fadeIn animate__delay-1s">
            {data.hero.description}
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="border-b border-gray-200 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto no-scrollbar py-4">
            <div
              onClick={() => setActiveTab('all')}
              className={`course-tab text-sm font-bold pb-2 cursor-pointer whitespace-nowrap transition-all ${
                activeTab === 'all' ? 'active text-brand-dark border-b-2 border-brand-dark font-bold' : 'text-gray-500 hover:text-brand-dark'
              }`}
            >
              {allLabel}
            </div>
            {data.categories.map((cat: any) => (
              <div
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`course-tab text-sm font-bold pb-2 cursor-pointer whitespace-nowrap transition-all ${
                  activeTab === cat.id ? 'active text-brand-dark border-b-2 border-brand-dark font-bold' : 'text-gray-500 hover:text-brand-dark'
                }`}
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate__animated animate__fadeIn">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{displayName}</h2>
            <p className="text-gray-600 max-w-4xl">{displayDesc}</p>
          </div>

          {/* Scrollable Container */}
          <div className="relative group">
            {showLeft && (
              <button
                onClick={() => scrollGrid('left')}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-accent hover:text-white transition-all border border-gray-100"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
            )}

            <div
              ref={scrollRef}
              onScroll={updateScrollButtons}
              className="flex overflow-x-auto gap-6 pb-8 no-scrollbar scroll-smooth"
            >
              {courses.map((course) => (
                <CardCourse key={course.id} {...course} onOpenModal={openModal} />
              ))}
            </div>

            {showRight && (
              <button
                onClick={() => scrollGrid('right')}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-accent hover:text-white transition-all border border-gray-100"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalCourse && (
        <ModalCourse item={modalCourse} onClose={() => setModalCourse(null)} />
      )}
    </main>
  );
}
