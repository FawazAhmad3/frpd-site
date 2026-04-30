interface Props {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  applyLink: string;
}

export default function CardCareer({ title, department, location, type, description, applyLink }: Props) {
  return (
    <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full animate__animated animate__fadeInUp">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-brand-accent/10 rounded-2xl text-brand-accent">
          <i className="fa-solid fa-briefcase text-2xl"></i>
        </div>
        <span className="px-4 py-1.5 bg-brand-gray text-brand-dark text-xs font-bold rounded-full uppercase tracking-widest">{type}</span>
      </div>
      <h3 className="text-2xl font-heading font-bold text-brand-dark mb-2 group-hover:text-brand-accent transition-colors">{title}</h3>
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 font-medium">
        <span className="flex items-center gap-1.5">
          <i className="fa-solid fa-building text-brand-accent/50"></i> {department}
        </span>
        <span className="flex items-center gap-1.5">
          <i className="fa-solid fa-location-dot text-brand-accent/50"></i> {location}
        </span>
      </div>
      <p className="text-gray-500 text-base leading-relaxed mb-8 flex-grow">{description}</p>
      <div className="pt-6 border-t border-gray-50 flex justify-between items-center mt-auto">
        <a href={applyLink} target="_blank" rel="noopener noreferrer" className="text-brand-accent font-bold text-sm tracking-widest uppercase hover:gap-3 flex items-center transition-all group-hover:gap-2">
          Apply Now <i className="fa-solid fa-arrow-right ml-2 group-hover:ml-3 transition-all"></i>
        </a>
      </div>
    </div>
  );
}
