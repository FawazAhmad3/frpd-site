interface Props {
  name: string;
  phone: string;
  email: string;
}

export default function CardDepartment({ name, phone, email }: Props) {
  return (
    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-accent">
          <i className="fas fa-building text-lg"></i>
        </div>
        <h4 className="text-xl font-heading font-bold text-gray-900">{name}</h4>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-4 text-sm group cursor-pointer border-t border-gray-50 pt-4">
          <i className="fas fa-phone text-brand-accent w-5 text-center"></i>
          <span className="font-medium group-hover:text-brand-accent">{phone}</span>
        </div>
        <div className="flex items-center gap-4 text-sm group cursor-pointer border-t border-gray-50 pt-4">
          <i className="fas fa-envelope text-brand-accent w-5 text-center"></i>
          <span className="font-medium group-hover:text-brand-accent">{email}</span>
        </div>
      </div>
    </div>
  );
}
