interface Props {
  id: string;
  image: string;
  title: string;
  type: string;
  date: string;
  category: string;
  onOpenModal: (id: string) => void;
}

export default function CardResearch({ id, image, title, type, date, category, onOpenModal }: Props) {
  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer research-card-trigger"
      onClick={() => onOpenModal(id)}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-bold rounded-full uppercase tracking-wider">{type}</span>
          <span className="text-gray-400 text-xs font-medium">{date}</span>
        </div>
        <h3 className="text-xl font-heading font-bold text-brand-dark group-hover:text-brand-accent transition-colors duration-300 line-clamp-2">{title}</h3>
        <p className="mt-2 text-gray-500 text-sm font-medium">{category}</p>
      </div>
      <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/5 transition-colors duration-300"></div>
    </div>
  );
}
