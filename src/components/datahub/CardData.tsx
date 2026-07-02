interface Props {
  id: string;
  category: string;
  title: string;
  description: string;
  format: string;
  access: string;
  accessClass: string;
  icon: string;
  url: string;
  image?: string;
  onOpenModal: (id: string) => void;
}

export default function CardData({ id, category, title, description, format, access, accessClass, icon, url, image, onOpenModal }: Props) {
  return (
    <div
      onClick={() => onOpenModal(id)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full group animate__animated animate__fadeInUp hover:-translate-y-2 hover:scale-[1.02] z-10 hover:z-30 cursor-pointer"
    >
      {/* Premium Image Header */}
      <div className="relative h-44 overflow-hidden bg-brand-dark/5">
        <img 
          src={image || '/assets/images/sample1.jpg'} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent"></div>
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${accessClass}`}>{access}</span>
          <div className="w-9 h-9 rounded-xl bg-white/25 backdrop-blur-md flex items-center justify-center text-white text-base border border-white/20 shadow-sm">
            <i className={icon}></i>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow relative">
        <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-1">{category}</span>
        <h3 className="text-lg font-heading font-bold text-brand-dark mb-2 leading-tight group-hover:text-brand-accent transition-colors">{title}</h3>

        <div className="flex-grow overflow-hidden">
          <p className="text-gray-500 text-sm mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase">
            <i className="fas fa-file-invoice mr-2"></i>
            <span>Format: {format}</span>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-accent hover:text-blue-700 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fas fa-circle-arrow-down text-xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
