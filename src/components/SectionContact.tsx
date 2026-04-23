import CardDepartment from './CardDepartment';

interface Department {
  name: string;
  phone: string;
  email: string;
}

interface Props {
  phone: string;
  email: string;
  address: string;
  workHours: string;
  mapUrl: string;
  departments: Department[];
}

export default function SectionContact({ phone, email, address, workHours, mapUrl, departments }: Props) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent group-hover:text-white transition-all">
              <i className="fas fa-phone-alt text-xl"></i>
            </div>
            <h4 className="text-xl font-heading font-bold text-gray-900 mb-3">Phone</h4>
            <p className="text-gray-600 font-medium">{phone}</p>
            <p className="text-xs text-brand-accent mt-2 font-bold tracking-widest uppercase">Call us anytime</p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent group-hover:text-white transition-all">
              <i className="fas fa-envelope text-xl"></i>
            </div>
            <h4 className="text-xl font-heading font-bold text-gray-900 mb-3">Email</h4>
            <a href={`mailto:${email}`} className="text-gray-600 font-medium hover:text-brand-accent">{email}</a>
            <p className="text-xs text-brand-accent mt-2 font-bold tracking-widest uppercase">Support 24/7</p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group lg:col-span-1">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent group-hover:text-white transition-all">
              <i className="fas fa-map-marker-alt text-xl"></i>
            </div>
            <h4 className="text-xl font-heading font-bold text-gray-900 mb-3">Location</h4>
            <p className="text-gray-600 font-medium leading-relaxed">{address}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent group-hover:text-white transition-all">
              <i className="fas fa-clock text-xl"></i>
            </div>
            <h4 className="text-xl font-heading font-bold text-gray-900 mb-3">Work Hours</h4>
            <p className="text-gray-600 font-medium">{workHours}</p>
            <p className="text-xs text-brand-accent mt-2 font-bold tracking-widest uppercase">Weekend Closed</p>
          </div>
        </div>

        {/* Departmental Contacts */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <span className="text-brand-accent font-bold tracking-[0.3em] uppercase text-xs block mb-4">Direct Lines</span>
            <h2 className="text-4xl font-heading font-bold text-gray-900 italic">Departmental Contacts</h2>
            <div className="w-20 h-1 bg-brand-accent mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, i) => (
              <CardDepartment key={i} {...dept} />
            ))}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-brand-gray pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-white">
            <div className="h-[400px] relative">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-1000"
                title="Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
