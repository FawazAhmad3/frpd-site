import { Link } from 'react-router-dom';
import CardResearch from '../research/CardResearch';

interface Props {
  title: string;
  summary: string;
  items: any[];
  onOpenModal?: (id: string) => void;
}

export default function SectionFeaturedResearch({ title, summary, items, onOpenModal }: Props) {
  const top3 = items.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-heading font-bold text-brand-dark mb-4">{title}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">{summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {top3.map((item) => (
            <CardResearch key={item.id} {...item} onOpenModal={onOpenModal!} />
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
