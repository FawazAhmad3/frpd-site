interface DataItem {
  id: string;
  category: string;
  title: string;
  description: string;
  format: string;
  access: string;
  icon: string;
  url: string;
}

interface Props {
  item: DataItem | null;
  onClose: () => void;
}

export default function ModalData({ item, onClose }: Props) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" id="data-modal">
      <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-[1px]" onClick={onClose}></div>

      <div className="modal-content relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 z-[110] w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-brand-dark hover:text-red-500 transition-colors">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div className="p-8 md:p-12 overflow-y-auto">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-bold rounded-full uppercase tracking-wider">{item.category}</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full uppercase tracking-wider">{item.format}</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">{item.access}</span>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-brand-gray flex items-center justify-center text-brand-accent text-3xl md:text-4xl">
              <i className={item.icon}></i>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark leading-tight">{item.title}</h2>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 mt-4">
            <h4 className="text-sm font-bold text-brand-dark uppercase tracking-widest mb-4 opacity-50">Detailed Description</h4>
            <div className="text-gray-600 leading-relaxed text-lg space-y-4" dangerouslySetInnerHTML={{ __html: item.description }}></div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex-grow flex items-center justify-center gap-3 px-8 py-4 bg-brand-accent text-white font-bold rounded-2xl hover:bg-blue-600 shadow-xl shadow-brand-accent/20 transition-all active:scale-95 text-lg">
              Access Resource Portal <i className="fa-solid fa-up-right-from-square"></i>
            </a>
            <button onClick={onClose} className="px-8 py-4 bg-brand-gray text-brand-dark font-bold rounded-2xl hover:bg-gray-200 transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
