import React from 'react';
import Hero from '../components/home/Hero';
import AboutPreview from '../components/home/AboutPreview';
import SchedulePreview from '../components/home/SchedulePreview';
import ProgramsPreview from '../components/home/ProgramsPreview';
import ActivitiesPreview from '../components/home/ActivitiesPreview';
import SafetySection from '../components/home/SafetySection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import MethodologySection from '../components/common/MethodologySection';
import EventHighlights from '../components/home/EventHighlights';
import GalleryPreview from '../components/home/GalleryPreview';
import TestimonialsSection from '../components/home/TestimonialsSection';
import AdmissionsForm from '../components/home/AdmissionsForm';
import SectionDivider from '../components/common/SectionDivider';

const Home = () => {
  return (
    <>
      <Hero />
      <SectionDivider type="line" bgColor="#FAF6EE" />
      <AboutPreview />
      <SectionDivider type="line" bgColor="#FAF6EE" />
      <SchedulePreview />
      
      {/* Transition: Cream (#FAF6EE) to White (#FFFFFF) */}
      <SectionDivider type="wave" bgColor="#FAF6EE" fillColor="#FFFFFF" height="56px" />
      
      <ProgramsPreview />
      <SectionDivider type="line" bgColor="#FFFFFF" />
      <ActivitiesPreview />
      <SectionDivider type="line" bgColor="#FFFFFF" />
      <SafetySection />
      <SectionDivider type="line" bgColor="#FFFFFF" />
      <WhyChooseUs />
      
      {/* Transition: White (#FFFFFF) to Cream (#FAF6EE) */}
      <SectionDivider type="organic" bgColor="#FFFFFF" fillColor="#FAF6EE" height="56px" />
      
      <MethodologySection />
      <SectionDivider type="line" bgColor="#FAF6EE" />
      <EventHighlights />
      <SectionDivider type="line" bgColor="#FAF6EE" />
      <GalleryPreview />
      <SectionDivider type="line" bgColor="#FAF6EE" />
      <TestimonialsSection />
      
      {/* Transition: Cream (#FAF6EE) to White (#FFFFFF) */}
      <SectionDivider type="dip" bgColor="#FAF6EE" fillColor="#FFFFFF" height="48px" />
      
      <AdmissionsForm />
    </>
  );
};

export default Home;
