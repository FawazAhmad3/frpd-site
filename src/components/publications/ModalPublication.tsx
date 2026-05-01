import React from 'react';

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
  item: Publication | null;
  onClose: () => void;
}

export default function ModalPublication({ item, onClose }: Props) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-dark/90" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate__animated animate__zoomIn animate__faster">
        <button onClick={onClose} className="absolute top-4 right-4 z-[110] w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-brand-dark hover:text-red-500 transition-colors">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        {/* Thumbnail Area */}
        <div className="w-full md:w-1/2 bg-brand-gray border-r border-gray-100 flex items-center justify-center p-8">
          <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-xl">
             <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
             <div className="absolute top-4 left-4">
               <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.typeClass} shadow-md`}>
                 {item.type}
               </span>
             </div>
          </div>
        </div>

        {/* Detail Area */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto bg-white flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span>{item.date}</span>
            <span>&bull;</span>
            <span className="text-brand-accent">{item.author}</span>
          </div>

          <h2 className="text-3xl font-heading font-bold text-brand-dark mb-6 leading-tight">{item.title}</h2>

          <div className="flex-grow">
            <h4 className="text-sm font-bold text-brand-dark uppercase tracking-widest mb-3 opacity-50">About this publication</h4>
            <p className="text-gray-600 leading-relaxed text-sm mb-8">{item.description}</p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <a href={item.downloadUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 px-6 py-4 bg-brand-accent text-white font-bold rounded-xl hover:bg-blue-600 shadow-lg shadow-brand-accent/20 transition-all active:scale-95">
              <i className="fa-solid fa-download"></i> Download Full Text
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
