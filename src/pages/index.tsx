import { useState } from 'react';
import Hero from '../components/Hero';
import SectionAbout from '../components/SectionAbout';
import SectionStats from '../components/SectionStats';
import SectionFeaturedResearch from '../components/SectionFeaturedResearch';
import SectionFeaturedPublications from '../components/SectionFeaturedPublications';
import ModalResearch from '../components/ModalResearch';
import homeData from '../data/home.json';
import researchDataAll from '../data/research-wing.json';
import publicationsData from '../data/publications.json';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { language } = useLanguage();
  const data = (homeData as any)[language];
  const researchData = (researchDataAll as any)[language].projects;
  const [selectedResearch, setSelectedResearch] = useState<any>(null);

  const featuredResearchItems = [
    { id: data.featuredResearch.res1_id, title: data.featuredResearch.res1_title, image: data.featuredResearch.res1_image, category: data.featuredResearch.res1_category },
    { id: data.featuredResearch.res2_id, title: data.featuredResearch.res2_title, image: data.featuredResearch.res2_image, category: data.featuredResearch.res2_category },
    { id: data.featuredResearch.res3_id, title: data.featuredResearch.res3_title, image: data.featuredResearch.res3_image, category: data.featuredResearch.res3_category },
  ];

  const openResearchModal = (id: string) => {
    const item = researchData.find((r: any) => r.id === id);
    if (item) setSelectedResearch(item);
  };

  const pubLang = (publicationsData as any)[language];
  const publications = pubLang?.publications || [];

  return (
    <>
      <Hero />

      <SectionAbout title={data.about.title} summary={data.about.summary} />

      <SectionStats stats={data.stats} />

      <SectionFeaturedResearch
        title={data.featuredResearch.title}
        summary={data.featuredResearch.summary}
        items={featuredResearchItems}
        onOpenModal={openResearchModal}
      />

      <SectionFeaturedPublications
        title={data.featuredPublications.title}
        summary={data.featuredPublications.summary}
        publications={publications}
      />

      {selectedResearch && (
        <ModalResearch item={selectedResearch} onClose={() => setSelectedResearch(null)} />
      )}
    </>
  );
}
