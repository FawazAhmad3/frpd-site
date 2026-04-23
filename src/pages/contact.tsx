import SectionContact from '../components/SectionContact';
import contactDataAll from '../data/contact.json';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { language } = useLanguage();
  const data = (contactDataAll as any)[language] || contactDataAll.en;
  const ui = data.ui;

  return (
    <main className="flex-grow">
      {/* Page Header */}
      <section className="bg-brand-dark py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-brand-accent/20 text-brand-accent text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
            {ui.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{data.hero.title}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">{data.hero.description}</p>
        </div>
      </section>

      {/* Contact Sections */}
      <SectionContact
        phone={data.details.phone}
        email={data.details.email}
        address={data.details.address}
        workHours={data.details.workHours}
        mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13271.6022359489!2d73.1812!3d33.7389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf848c1a9333%3A0xe549cd97b0a7c9f!2sCDA%20Head%20Works%20Rd%2C%20Islamabad!5e0!3m2!1sen!2spk!4v1713250000000!5m2!1sen!2spk"
        departments={data.departments}
        ui={ui}
      />
    </main>
  );
}
