import React, { useEffect } from 'react';

interface PublicationSection {
  title: string;
  body: string;
}

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
  sections?: PublicationSection[];
}

interface Props {
  item: Publication | null;
  onClose: () => void;
}

export default function ModalPublication({ item, onClose }: Props) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/80 transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Main Modal Container */}
      <div className="relative bg-white w-full max-w-[1320px] h-[95vh] rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden animate__animated animate__fadeInUp animate__faster border border-gray-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/90 border border-gray-100 shadow-md rounded-full flex items-center justify-center text-gray-500 hover:text-brand-accent hover:bg-blue-50 hover:scale-110 transition-all"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        {/* Left Sidebar - Action Panel */}
        <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-100 flex flex-col p-8 lg:p-12 overflow-y-auto hidden-scrollbar relative">
          
          <div className="w-full aspect-[3/4] rounded-[2rem] overflow-hidden shadow-lg border border-white mb-8 relative">
             <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
             <div className="absolute top-4 left-4">
               <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${item.typeClass} shadow-md`}>
                 {item.type}
               </span>
             </div>
          </div>

          <div className="mt-auto">
            <a 
              href={item.downloadUrl || '#'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex w-full items-center justify-center gap-3 px-6 py-5 bg-brand-accent text-white text-lg font-bold rounded-[1.5rem] hover:bg-blue-700 shadow-lg shadow-brand-accent/20 transition-all hover:-translate-y-1"
            >
              <i className="fa-solid fa-file-pdf"></i> Download PDF
            </a>
          </div>
          
          {/* Mock QR Code space like PIDE */}
          <div className="mt-8 flex justify-center opacity-30">
            <i className="fa-solid fa-qrcode text-6xl text-gray-400"></i>
          </div>

        </div>

        {/* Right Main Content Area */}
        <div className="w-full md:w-2/3 p-8 lg:p-14 overflow-y-auto bg-white flex flex-col relative">
          
          {/* Meta Data List */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center">
                <i className="fa-solid fa-user text-brand-accent"></i>
              </div>
              <span className="font-bold">{item.author}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center">
                <i className="fa-solid fa-calendar text-brand-accent"></i>
              </div>
              <span className="font-bold">{item.date}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center">
                <i className="fa-solid fa-bookmark text-brand-accent"></i>
              </div>
              <span className="font-bold">{item.type}</span>
            </div>
          </div>

          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-dark mb-10 leading-tight">
            {item.title}
          </h2>

          <div className="flex-grow max-w-3xl">
            {item.sections && item.sections.length > 0 ? (
              item.sections.map((sec, idx) => (
                <div key={idx} className="mb-10">
                  <h3 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-3">
                    <span className="w-8 h-1 bg-brand-accent rounded-full inline-block"></span>
                    {sec.title}
                  </h3>
                  <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: sec.body }}></div>
                </div>
              ))
            ) : (
              <>
                <h3 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-brand-accent rounded-full inline-block"></span>
                  Executive Summary
                </h3>
                <div className="prose prose-lg prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg mb-8" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
