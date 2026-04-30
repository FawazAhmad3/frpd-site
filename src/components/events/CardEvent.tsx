interface Props {
  id: string;
  type: string;
  typeColor: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  registrationUrl: string;
  status: string;
  statusColor: string;
}

export default function CardEvent({ type, typeColor, title, date, time, location, description, imageUrl, registrationUrl, status, statusColor }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full animate__animated animate__fadeInUp">
      <div className="relative h-48 overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 ${typeColor} text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg`}>{type}</span>
        </div>
        <div className="absolute bottom-4 right-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-dark text-[10px] font-bold uppercase rounded flex items-center shadow-sm">
            <i className={`fas fa-circle text-[6px] mr-2 ${statusColor} animate-pulse`}></i> {status}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-heading font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors leading-tight">{title}</h3>
        <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">{description}</p>

        <div className="mt-auto space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3 text-brand-accent">
              <i className="far fa-calendar-alt"></i>
            </div>
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center mr-3 text-orange-500">
              <i className="far fa-clock"></i>
            </div>
            <span>{time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mr-3 text-green-600">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <span>{location}</span>
          </div>
        </div>

        <div className="mt-8">
          <a href={registrationUrl} className="block w-full text-center py-3 px-6 bg-brand-dark text-white rounded-xl font-bold hover:bg-brand-accent hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg">
            Register / Details
          </a>
        </div>
      </div>
    </div>
  );
}
