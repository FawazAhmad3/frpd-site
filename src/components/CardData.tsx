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
  onOpenModal: (id: string) => void;
}

export default function CardData({ id, category, title, description, format, access, accessClass, icon, url, onOpenModal }: Props) {
  return (
    <div
      onClick={() => onOpenModal(id)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full group animate__animated animate__fadeInUp hover:-translate-y-2 hover:scale-[1.02] z-10 hover:z-30 cursor-pointer"
    >
      <div className="p-6 pb-0 flex justify-between items-start">
        <div className="w-12 h-12 rounded-xl bg-brand-gray flex items-center justify-center text-brand-accent text-xl group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
          <i className={icon}></i>
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${accessClass}`}>{access}</span>
      </div>

      <div className="p-6 flex flex-col flex-grow relative">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{category}</span>
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
