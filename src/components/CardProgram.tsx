interface Props {
  title: string;
  url: string;
}

export default function CardProgram({ title, url }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      <div className="mb-4 text-brand-accent/30 group-hover:text-brand-accent transition-colors">
        <i className="fas fa-arrow-right"></i>
      </div>
      <h4 className="text-base font-bold text-brand-dark leading-tight mb-4 flex-grow">{title}</h4>
      <div className="mt-4 pt-4 border-t border-gray-50">
        <a href={url} className="text-xs font-bold text-brand-accent uppercase tracking-widest hover:text-blue-700 transition-colors">
          Inquire Now <i className="fas fa-chevron-right ml-1 text-[8px]"></i>
        </a>
      </div>
    </div>
  );
}
