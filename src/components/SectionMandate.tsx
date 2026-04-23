interface Props {
  visionTitle: string;
  visionText: string;
  missionTitle: string;
  missionList: string;
  approachTitle: string;
  approachContent: string;
}

export default function SectionMandate({ visionTitle, visionText, missionTitle, missionList, approachTitle, approachContent }: Props) {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="animate__animated animate__fadeInLeft p-8 sm:p-12 rounded-[2.5rem] bg-brand-accent/5 border border-brand-accent/10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/10 text-brand-accent rounded-full text-xs sm:text-sm font-bold uppercase mb-6">
              <i className="fa-solid fa-telescope"></i> Our Vision
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-brand-accent mb-4 sm:mb-6">{visionTitle}</h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed italic">
              "{visionText}"
            </p>
          </div>
          <div className="animate__animated animate__fadeInRight bg-brand-gray p-6 sm:p-10 rounded-3xl relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-accent/10 rounded-full blur-2xl"></div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent text-white rounded-full text-xs sm:text-sm font-bold uppercase mb-6">
              <i className="fa-solid fa-crosshairs"></i> Our Mission
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-brand-dark mb-4 sm:mb-6">{missionTitle}</h2>
            <ul className="space-y-4" dangerouslySetInnerHTML={{ __html: missionList }} />
          </div>
        </div>

        {/* Approach */}
        <div className="animate__animated animate__fadeInUp bg-slate-900 text-white p-8 sm:p-12 lg:p-20 rounded-[2rem] sm:rounded-[3rem] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/20 text-brand-accent rounded-full text-xs sm:text-sm font-bold uppercase mb-6">
              <i className="fa-solid fa-route"></i> Our Approach
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-brand-accent mb-6 sm:mb-8">{approachTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 text-gray-300 text-base sm:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: approachContent }} />
          </div>
        </div>
      </div>
    </section>
  );
}
