import CardDepartment from './CardDepartment';
import { useLanguage } from '../context/LanguageContext';

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
  ui: any;
}

export default function SectionContact({ phone, email, address, workHours, mapUrl, departments, ui }: Props) {
  const { language } = useLanguage();
  
  const labels: any = {
    en: { phone: "Phone", email: "Email", location: "Location", hours: "Work Hours", call: "Call us anytime", support: "Support 24/7", weekend: "Weekend Closed", direct: "Direct Lines" },
    ar: { phone: "الهاتف", email: "البريد الإلكتروني", location: "الموقع", hours: "ساعات العمل", call: "اتصل بنا في أي وقت", support: "دعم 24/7", weekend: "مغلق في عطلة نهاية الأسبوع", direct: "الخطوط المباشرة" },
    fr: { phone: "Téléphone", email: "E-mail", location: "Emplacement", hours: "Heures de travail", call: "Appelez-nous à tout moment", support: "Assistance 24/7", weekend: "Fermé le week-end", direct: "Lignes directes" },
    de: { phone: "Telefon", email: "E-Mail", location: "Standort", hours: "Arbeitszeiten", call: "Rufen Sie uns jederzeit an", support: "Support rund um die Uhr", weekend: "Wochenende geschlossen", direct: "Direktleitungen" },
    zh: { phone: "电话", email: "电子邮件", location: "地点", hours: "工作时间", call: "随时致电我们", support: "24/7 支持", weekend: "周末关闭", direct: "直达线路" }
  };
  const l = labels[language] || labels.en;

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent group-hover:text-white transition-all">
              <i className="fas fa-phone-alt text-xl"></i>
            </div>
            <h4 className="text-xl font-heading font-bold text-gray-900 mb-3">{l.phone}</h4>
            <p className="text-gray-600 font-medium">{phone}</p>
            <p className="text-xs text-brand-accent mt-2 font-bold tracking-widest uppercase">{l.call}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent group-hover:text-white transition-all">
              <i className="fas fa-envelope text-xl"></i>
            </div>
            <h4 className="text-xl font-heading font-bold text-gray-900 mb-3">{l.email}</h4>
            <a href={`mailto:${email}`} className="text-gray-600 font-medium hover:text-brand-accent">{email}</a>
            <p className="text-xs text-brand-accent mt-2 font-bold tracking-widest uppercase">{l.support}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group lg:col-span-1">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent group-hover:text-white transition-all">
              <i className="fas fa-map-marker-alt text-xl"></i>
            </div>
            <h4 className="text-xl font-heading font-bold text-gray-900 mb-3">{l.location}</h4>
            <p className="text-gray-600 font-medium leading-relaxed">{address}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent group-hover:text-white transition-all">
              <i className="fas fa-clock text-xl"></i>
            </div>
            <h4 className="text-xl font-heading font-bold text-gray-900 mb-3">{l.hours}</h4>
            <p className="text-gray-600 font-medium">{workHours}</p>
            <p className="text-xs text-brand-accent mt-2 font-bold tracking-widest uppercase">{l.weekend}</p>
          </div>
        </div>

        {/* Departmental Contacts */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <span className="text-brand-accent font-bold tracking-[0.3em] uppercase text-xs block mb-4">{l.direct}</span>
            <h2 className="text-4xl font-heading font-bold text-gray-900 italic">{ui.deptTitle}</h2>
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
