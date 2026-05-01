interface Props {
  id: string;
  title: string;
  author: string;
  date: string;
  type: string;
  typeClass: string;
  description: string;
  thumbnail: string;
  downloadUrl: string;
  onOpenModal?: (id: string) => void;
}

export default function CardPublication({ id, title, author, date, type, typeClass, description, thumbnail, downloadUrl, onOpenModal }: Props) {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 p-4 flex flex-col h-full group animate__animated animate__fadeInUp">
      <div className="relative overflow-hidden rounded-[2rem] mb-5 border border-gray-50">
        <img src={thumbnail} alt={title} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>

      <div className="px-2 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-brand-dark leading-tight mb-5 line-clamp-2 min-h-[3.5rem] group-hover:text-brand-accent transition-colors">
          {title}
        </h3>

        <div className="space-y-3 mb-6 mt-auto">
          <div className="flex items-start gap-3 text-sm text-gray-600">
            <i className="fa-solid fa-user text-brand-accent w-4 text-center mt-1"></i>
            <span className="font-medium leading-snug">{author}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <i className="fa-solid fa-bookmark text-brand-accent w-4 text-center"></i>
            <span>{type}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <i className="fa-solid fa-calendar text-brand-accent w-4 text-center"></i>
            <span>{date}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 mt-2 flex items-center justify-between">
          <button 
            onClick={() => onOpenModal ? onOpenModal(id) : window.open(downloadUrl, '_blank')}
            className="text-brand-accent text-sm font-bold hover:text-blue-800 transition-colors flex items-center gap-2"
          >
            Read Publication <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
