import CardProgram from './CardProgram';

interface Program {
  title: string;
  url: string;
}

interface Props {
  id: string;
  title: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  programs: Program[];
}

export default function SectionProgramCategory({ id, title, icon, colorClass, bgClass, programs }: Props) {
  return (
    <section className={`py-16 md:py-24 ${bgClass} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 mb-12 animate__animated animate__fadeInLeft">
          <div className={`w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center ${colorClass} text-2xl`}>
            <i className={icon}></i>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark">{title}</h2>
            <div className="h-1.5 w-24 bg-brand-accent mt-3 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id={`programs-grid-${id}`}>
          {programs.map((prog, i) => (
            <CardProgram key={i} title={prog.title} url={prog.url} />
          ))}
        </div>
      </div>
    </section>
  );
}
