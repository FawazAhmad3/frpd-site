import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './src/components/Navbar';
import Footer from './src/components/Footer';
import SocialButtons from './src/components/SocialButtons';
import { LanguageProvider } from './src/context/LanguageContext';

import Home from './src/pages/index';
import ResearchWing from './src/pages/research-wing';
import OnlineCourses from './src/pages/online-courses';
import CapacityBuilding from './src/pages/capacity-building';
import Consultancy from './src/pages/consultancy';
import WorkshopsEvents from './src/pages/workshops-events';
import Publications from './src/pages/publications';
import DataHub from './src/pages/datahub';
import Mandate from './src/pages/mandate';
import Governance from './src/pages/governance';
import Careers from './src/pages/careers';
import Contact from './src/pages/contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-brand-gray text-gray-900 font-sans antialiased">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/research-wing" element={<ResearchWing />} />
          <Route path="/pages/online-courses" element={<OnlineCourses />} />
          <Route path="/pages/capacity-building" element={<CapacityBuilding />} />
          <Route path="/pages/consultancy" element={<Consultancy />} />
          <Route path="/pages/workshops-events" element={<WorkshopsEvents />} />
          <Route path="/pages/publications" element={<Publications />} />
          <Route path="/pages/datahub" element={<DataHub />} />
          <Route path="/pages/mandate" element={<Mandate />} />
          <Route path="/pages/governance" element={<Governance />} />
          <Route path="/pages/careers" element={<Careers />} />
          <Route path="/pages/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <SocialButtons />
      </div>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </LanguageProvider>
  );
}
