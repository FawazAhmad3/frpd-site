import { Link } from 'react-router-dom';

interface Publication {
  id: string;
  title: string;
  author: string;
  date: string;
  type: string;
  typeClass: string;
  description: string;
  thumbnail: string;
  downloadUrl: string;
}

interface Props {
  title: string;
  summary: string;
  publications: Publication[];
}

export default function SectionFeaturedPublications({ title, summary, publications }: Props) {
  const top3 = publications.slice(0, 3);
  const delays = ['animate__delay-1s', 'animate__delay-2s', 'animate__delay-3s'];

  return (
    <section className="py-20 bg-brand-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16 animate__animated animate__fadeIn">
          <h2 className="text-2xl sm:text-4xl font-heading font-bold text-brand-dark mb-4">{title}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">{summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {top3.map((pub, i) => (
            <div key={pub.id} className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full animate__animated animate__fadeInUp ${delays[i]}`}>
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={pub.thumbnail} alt={pub.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${pub.typeClass} shadow-sm`}>
                    {pub.type}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-gray-400">
                  <span>{pub.date}</span>
                  <span>&bull;</span>
                  <span className="text-brand-accent uppercase">{pub.author}</span>
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-dark group-hover:text-brand-accent transition-colors mb-3 line-clamp-2">{pub.title}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">{pub.description}</p>
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <a href={pub.downloadUrl} className="inline-flex items-center text-xs font-bold text-brand-accent uppercase tracking-widest hover:text-blue-700 transition-colors">
                    <i className="fas fa-file-download mr-2"></i> Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/pages/publications" className="inline-flex items-center gap-2 text-brand-accent font-bold hover:gap-3 transition-all">
            Access Full Publication Archive
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
