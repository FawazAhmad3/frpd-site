import { useEffect, useRef, useState } from 'react';

interface StatItem {
  icon: string;
  target: number;
  suffix: string;
  label: string;
}

interface Props {
  stats: {
    researchesTarget: string;
    researchesSuffix: string;
    researchesLabel: string;
    projectsTarget: string;
    projectsSuffix: string;
    projectsLabel: string;
    blogsTarget: string;
    blogsSuffix: string;
    blogsLabel: string;
    expertsTarget: string;
    expertsSuffix: string;
    expertsLabel: string;
  };
}

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            const duration = 2500;
            let start: number | null = null;
            const step = (timestamp: number) => {
              if (!start) start = timestamp;
              const progress = Math.min((timestamp - start) / duration, 1);
              const easeOutQuad = 1 - (1 - progress) * (1 - progress);
              setValue(Math.floor(easeOutQuad * target));
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-3xl sm:text-5xl font-extrabold font-heading mb-2">
      {value}{suffix}
    </div>
  );
}

export default function SectionStats({ stats }: Props) {
  const items: StatItem[] = [
    { icon: 'fas fa-file-contract', target: parseInt(stats.researchesTarget), suffix: stats.researchesSuffix, label: stats.researchesLabel },
    { icon: 'fas fa-project-diagram', target: parseInt(stats.projectsTarget), suffix: stats.projectsSuffix, label: stats.projectsLabel },
    { icon: 'fas fa-feather-alt', target: parseInt(stats.blogsTarget), suffix: stats.blogsSuffix, label: stats.blogsLabel },
    { icon: 'fas fa-users', target: parseInt(stats.expertsTarget), suffix: stats.expertsSuffix, label: stats.expertsLabel },
  ];

  return (
    <section className="py-10 bg-[#FAFEFF] relative">
      <div className="absolute inset-0 bg-[#f0f9ff]/20 opacity-10 mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12 text-center text-[#0f1729]">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center group">
            <i className={`${item.icon} text-3xl mb-4 text-brand-accent opacity-80 group-hover:scale-110 transition-transform`}></i>
            <AnimatedNumber target={item.target} suffix={item.suffix} />
            <div className="text-gray-600 font-semibold uppercase tracking-wider text-[10px] sm:text-sm">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
