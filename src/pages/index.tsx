import { useState } from 'react';
import Hero from '../components/Hero';
import SectionAbout from '../components/SectionAbout';
import SectionStats from '../components/SectionStats';
import SectionFeaturedResearch from '../components/SectionFeaturedResearch';
import SectionFeaturedPublications from '../components/SectionFeaturedPublications';
import ModalResearch from '../components/ModalResearch';
import homeData from '../data/home-en.json';
import researchData from '../data/research-wing-en.json';
import publicationsData from '../data/publications.json';

export default function Home() {
  const [selectedResearch, setSelectedResearch] = useState<typeof researchData[0] | null>(null);

  const featuredResearchItems = [
    { id: homeData.featuredResearch.res1_id, title: homeData.featuredResearch.res1_title, image: homeData.featuredResearch.res1_image, category: homeData.featuredResearch.res1_category },
    { id: homeData.featuredResearch.res2_id, title: homeData.featuredResearch.res2_title, image: homeData.featuredResearch.res2_image, category: homeData.featuredResearch.res2_category },
    { id: homeData.featuredResearch.res3_id, title: homeData.featuredResearch.res3_title, image: homeData.featuredResearch.res3_image, category: homeData.featuredResearch.res3_category },
  ];

  const openResearchModal = (id: string) => {
    const item = researchData.find((r) => r.id === id);
    if (item) setSelectedResearch(item);
  };

  const pubLang = (publicationsData as Record<string, { publications?: typeof publicationsData.en.publications }>).en;
  const publications = pubLang?.publications || [];

  return (
    <>
      <Hero />

      <SectionAbout title={homeData.about.title} summary={homeData.about.summary} />

      <SectionStats stats={homeData.stats} />

      <SectionFeaturedResearch
        title={homeData.featuredResearch.title}
        summary={homeData.featuredResearch.summary}
        items={featuredResearchItems}
        onOpenModal={openResearchModal}
      />

      <SectionFeaturedPublications
        title={homeData.featuredPublications.title}
        summary={homeData.featuredPublications.summary}
        publications={publications}
      />

      {selectedResearch && (
        <ModalResearch item={selectedResearch} onClose={() => setSelectedResearch(null)} />
      )}
    </>
  );
}
