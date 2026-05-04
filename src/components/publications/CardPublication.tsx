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
    <div 
      onClick={() => onOpenModal ? onOpenModal(id) : window.open(downloadUrl, '_blank')}
      className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 p-4 flex flex-col h-full group animate__animated animate__fadeInUp cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-[2rem] mb-5 border border-gray-50">
        <img src={thumbnail} alt={title} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>

      <div className="px-2 flex flex-col flex-grow">
        <h3 className={`font-bold text-brand-dark leading-tight mb-6 min-h-[3.5rem] group-hover:text-brand-accent transition-colors ${title.length > 60 ? 'text-lg line-clamp-3' : 'text-xl line-clamp-2'}`}>
          {title}
        </h3>

        <div className="space-y-4 mb-2 mt-auto">
          <div className="flex items-center gap-4 text-base text-gray-600">
            <i className="fa-solid fa-users text-red-600 w-5 text-center text-lg"></i>
            <span className="font-medium leading-snug">{author}</span>
          </div>
          <div className="flex items-center gap-4 text-base text-gray-600">
            <i className="fa-regular fa-bookmark text-red-600 w-5 text-center text-lg"></i>
            <span>{type}</span>
          </div>
          <div className="flex items-center gap-4 text-base text-gray-600">
            <i className="fa-regular fa-calendar text-red-600 w-5 text-center text-lg"></i>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
