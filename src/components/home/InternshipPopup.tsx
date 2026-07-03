import { useNavigate } from 'react-router-dom';

interface Props {
  onClose: () => void;
}

export default function InternshipPopup({ onClose }: Props) {
  const navigate = useNavigate();

  const handleImageClick = () => {
    onClose();
    navigate('/pages/careers');
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-dark/85 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100 animate__animated animate__zoomIn animate__faster">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/95 shadow-md rounded-full flex items-center justify-center text-brand-dark hover:text-red-500 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Close popup"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        {/* Clickable Image */}
        <div 
          onClick={handleImageClick}
          className="cursor-pointer group relative overflow-hidden"
        >
          <img 
            src="/assets/images/internship announcement/batch-1.png" 
            alt="Internship Announcement" 
            className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-300"
          />
          {/* Hover overlay to indicate clickability */}
          <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-brand-accent text-white font-bold px-5 py-2.5 rounded-xl shadow-lg text-sm flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
              Apply Now <i className="fa-solid fa-arrow-right"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
