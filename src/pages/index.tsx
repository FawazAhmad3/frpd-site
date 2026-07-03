import { useState } from 'react';
import Hero from '../components/home/Hero';
import SectionAbout from '../components/home/SectionAbout';
import SectionStats from '../components/home/SectionStats';
import SectionFeaturedResearch from '../components/home/SectionFeaturedResearch';
import SectionFeaturedPublications from '../components/home/SectionFeaturedPublications';
import ModalResearch from '../components/research/ModalResearch';
import ModalPublication from '../components/publications/ModalPublication';
import InternshipPopup from '../components/home/InternshipPopup';
import homeData from '../data/home.json';
import researchDataAll from '../data/research-wing.json';
import publicationsData from '../data/publications.json';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { language } = useLanguage();
  const data = (homeData as any)[language];
  const researchData = (researchDataAll as any)[language].items;
  const pubLang = (publicationsData as any)[language];
  const publications = pubLang?.publications || [];

  const [selectedResearch, setSelectedResearch] = useState<any>(null);
  const [selectedPublication, setSelectedPublication] = useState<any>(null);
  const [showInternshipPopup, setShowInternshipPopup] = useState(true);

  const openResearchModal = (id: string) => {
    const item = researchData?.find((r: any) => r.id === id);
    if (item) setSelectedResearch(item);
  };

  const openPublicationModal = (id: string) => {
    const item = publications?.find((p: any) => p.id === id);
    if (item) setSelectedPublication(item);
  };

  return (
    <>
      <Hero />

      <SectionAbout title={data.about.title} summary={data.about.summary} />

      <SectionStats stats={data.stats} />

      <SectionFeaturedResearch
        title={data.featuredResearch.title}
        summary={data.featuredResearch.summary}
        items={researchData || []}
        onOpenModal={openResearchModal}
      />

      <SectionFeaturedPublications
        title={data.featuredPublications.title}
        summary={data.featuredPublications.summary}
        publications={publications}
        onOpenModal={openPublicationModal}
      />

      {selectedResearch && (
        <ModalResearch item={selectedResearch} onClose={() => setSelectedResearch(null)} />
      )}

      {selectedPublication && (
        <ModalPublication item={selectedPublication} onClose={() => setSelectedPublication(null)} />
      )}

      {showInternshipPopup && (
        <InternshipPopup onClose={() => setShowInternshipPopup(false)} />
      )}
    </>
  );
}
