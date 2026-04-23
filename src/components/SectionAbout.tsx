interface Props {
  title: string;
  summary: string;
}

export default function SectionAbout({ title, summary }: Props) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl font-heading font-bold text-brand-dark mb-4 sm:mb-6">{title}</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">{summary}</p>
        </div>
      </div>
    </section>
  );
}
