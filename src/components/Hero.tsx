import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import globalData from '../data/global.json';

const slides = [
  { src: '/assets/images/sample1.jpg', alt: 'Slide 1' },
  { src: '/assets/images/sample2.png', alt: 'Slide 2' },
  { src: '/assets/images/sample3.png', alt: 'Slide 3' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const { language } = useLanguage();
  const t = (globalData as any)[language].footer;

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="relative w-full pt-4 lg:pt-6">
      <div className="relative w-full h-[400px] md:h-[450px] lg:h-[550px] bg-brand-dark overflow-hidden bg-gray-900 group">
        {slides.map((slide, i) => (
          <img
            key={i}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-out ${
              i === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none"></div>

        {/* Navigation */}
        <button
          onClick={prev}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-gray-800/80 hover:text-black flex items-center justify-center transition-all z-20 hover:scale-110 drop-shadow-md"
        >
          <i className="fas fa-angle-left text-4xl md:text-7xl font-bold"></i>
        </button>
        <button
          onClick={next}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-gray-800/80 hover:text-black flex items-center justify-center transition-all z-20 hover:scale-110 drop-shadow-md"
        >
          <i className="fas fa-angle-right text-4xl md:text-7xl font-bold"></i>
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer shadow-lg ${
                i === current ? 'bg-white scale-125' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Ribbon */}
      <div className="w-full text-center py-2.5 px-4" style={{ backgroundColor: '#0f1729' }}>
        <p className="text-[#c75e2b] text-[10px] md:text-sm font-bold uppercase tracking-widest leading-relaxed">
          {t.ribbonText}
        </p>
      </div>
    </div>
  );
}
