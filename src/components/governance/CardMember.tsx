interface Props {
  name: string;
  role: string;
  department?: string;
  phone?: string;
  email?: string;
  image: string;
  bio?: string;
}

export default function CardMember({ name, role, department, phone, email, image }: Props) {
  return (
    <div className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-6">
      {/* Image Container */}
      <div className="flex-shrink-0 w-32 h-40 overflow-hidden rounded-lg shadow-inner bg-gray-50">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>

      {/* Info Container */}
      <div className="flex-grow text-center sm:text-left pt-2">
        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-1">{role}</p>
        <p className="text-[13px] text-gray-400 font-medium mb-4">{department}</p>
        
        {/* Divider */}
        <div className="w-16 h-[2px] bg-emerald-500 mb-4 mx-auto sm:mx-0"></div>

        {/* Contact Info */}
        <div className="space-y-2">
          {phone && (
            <div className="flex items-center justify-center sm:justify-start gap-3 text-[13px] text-gray-600">
              <i className="fas fa-phone text-emerald-500 w-4"></i>
              <span>{phone}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center justify-center sm:justify-start gap-3 text-[13px] text-gray-600">
              <i className="fas fa-envelope text-emerald-500 w-4"></i>
              <span className="truncate">{email}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
