interface Props {
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
  onOpenModal: (id: string) => void;
}

export default function CardCourse({ id, title, instructor, rating, reviewsCount, price, oldPrice, badge, badgeVisibility, image, onOpenModal }: Props) {
  return (
    <div
      className="flex-shrink-0 w-[280px] flex flex-col h-full group cursor-pointer animate__animated animate__fadeInUp bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
      onClick={() => onOpenModal(id)}
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 leading-snug group-hover:text-brand-accent transition-colors">{title}</h3>
        <p className="text-[11px] text-gray-500 mb-1 leading-tight">{instructor}</p>

        <div className={`mb-1 ${badgeVisibility === 'block' ? '' : 'hidden'}`}>
          <span className="inline-block px-2 py-0.5 bg-[#eceb98] text-[#3d3c0a] text-[10px] font-bold rounded-sm uppercase tracking-tight">{badge}</span>
        </div>

        <div className="flex items-center gap-1 mb-2">
          <span className="text-xs font-bold text-[#b4690e]">{rating}</span>
          <div className="flex text-[8px] text-[#b4690e]">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
          </div>
          <span className="text-[10px] text-gray-400">({reviewsCount})</span>
        </div>

        <div className="mt-auto flex items-center gap-2">
          <span className="text-base font-bold text-gray-900">{price} PKR</span>
          <span className="text-xs text-gray-400 line-through">{oldPrice} PKR</span>
        </div>
      </div>
    </div>
  );
}
