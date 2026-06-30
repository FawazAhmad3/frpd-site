import { useState, useEffect } from 'react';

interface ResearchItem {
  id: string;
  image: string;
  category: string;
  type: string;
  title: string;
  articleTitle: string;
  date: string;
  team: string;
  details: string;
  previewUrl: string;
  downloadUrl: string;
}

interface Props {
  item: ResearchItem | null;
  onClose: () => void;
}

export default function ModalResearch({ item, onClose }: Props) {
  const [imgSrc, setImgSrc] = useState(item?.image || '/assets/images/sample1.jpg');

  useEffect(() => {
    if (item?.image) {
      setImgSrc(item.image);
    }
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-dark/90" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate__animated animate__zoomIn animate__faster">
        <button onClick={onClose} className="absolute top-4 right-4 z-[110] w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-brand-dark hover:text-red-500 transition-colors">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        {/* Preview Area */}
        <div className="w-full md:w-3/5 bg-brand-gray border-r border-gray-100 min-h-[400px]">
          {item.previewUrl ? (
            <iframe src={item.previewUrl} loading="lazy" className="w-full h-full border-none" allow="autoplay" title="PDF Preview"></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-8 bg-brand-dark/5 relative">
              <img 
                src={imgSrc} 
                alt={item.title} 
                onError={() => setImgSrc('/assets/images/sample1.jpg')} 
                className="w-full h-full object-cover rounded-xl shadow-lg" 
              />
              <div className="absolute inset-0 bg-brand-dark/40 flex flex-col items-center justify-center m-8 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                <i className="fa-solid fa-file-pdf text-4xl text-white mb-2"></i>
                <p className="text-white text-sm font-bold">Document preview unavailable</p>
              </div>
            </div>
          )}
        </div>

        {/* Detail Area */}
        <div className="w-full md:w-2/5 p-8 overflow-y-auto bg-white flex flex-col">
          <div className="mb-6">
            <span className="px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-bold rounded-full uppercase tracking-wider mb-3">{item.category}</span>
            <span className="block mt-2 text-gray-400 text-xs font-medium">{item.type}</span>
          </div>

          <h2 className="text-3xl font-heading font-bold text-brand-dark mb-4 leading-tight">{item.articleTitle || item.title}</h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-center text-sm text-gray-500">
              <i className="fa-solid fa-calendar-day w-6 text-brand-accent"></i>
              <span>{item.date}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <i className="fa-solid fa-users w-6 text-brand-accent"></i>
              <span>{item.team}</span>
            </div>
          </div>

          <div className="flex-grow">
            <h4 className="text-sm font-bold text-brand-dark uppercase tracking-widest mb-3 opacity-50">About this research</h4>
            <p className="text-gray-600 leading-relaxed text-sm">{item.details}</p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {item.previewUrl ? (
              <a 
                href={item.previewUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-gray text-brand-dark font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                <i className="fa-solid fa-eye"></i> Preview
              </a>
            ) : (
              <button 
                disabled 
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-400 font-bold rounded-xl cursor-not-allowed"
                title="Preview unavailable"
              >
                <i className="fa-solid fa-eye-slash"></i> Preview Unavailable
              </button>
            )}

            {item.downloadUrl ? (
              <a 
                href={item.downloadUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-accent text-white font-bold rounded-xl hover:bg-blue-600 shadow-lg shadow-brand-accent/20 transition-all active:scale-95"
              >
                <i className="fa-solid fa-download"></i> Download
              </a>
            ) : (
              <button 
                disabled 
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-400 font-bold rounded-xl cursor-not-allowed"
                title="Download unavailable"
              >
                <i className="fa-solid fa-download-slash"></i> Download Unavailable
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
