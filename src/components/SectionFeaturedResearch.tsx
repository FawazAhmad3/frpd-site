import { Link } from 'react-router-dom';

interface ResearchItem {
  id: string;
  title: string;
  image: string;
  category: string;
}

interface Props {
  title: string;
  summary: string;
  items: ResearchItem[];
  onOpenModal?: (id: string) => void;
}

export default function SectionFeaturedResearch({ title, summary, items, onOpenModal }: Props) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-heading font-bold text-brand-dark mb-4">{title}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">{summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#f8fafc] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
              onClick={() => onOpenModal?.(item.id)}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-brand-accent/10 text-brand-accent text-[10px] font-bold rounded-full uppercase">{item.category}</span>
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-dark group-hover:text-brand-accent transition-colors">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/pages/research-wing" className="inline-flex items-center gap-2 text-brand-accent font-bold hover:gap-3 transition-all">
            Explore Research & Development (R&D)
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
