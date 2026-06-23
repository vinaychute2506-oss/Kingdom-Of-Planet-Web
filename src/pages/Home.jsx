import React from 'react';
import Hero from '../components/home/Hero';
import ProgramsPreview from '../components/home/ProgramsPreview';
import SafetySection from '../components/home/SafetySection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import AdmissionsForm from '../components/home/AdmissionsForm';
import SectionDivider from '../components/common/SectionDivider';

const Home = () => {
  return (
    <>
      <Hero />
      <SectionDivider type="line" bgColor="#FAF6EE" />
      <ProgramsPreview />
      <SectionDivider type="line" bgColor="#FFFFFF" />
      <SafetySection />
      <SectionDivider type="line" bgColor="#FFFFFF" />
      <TestimonialsSection />
      
      {/* Transition: Cream (#FAF6EE) to White (#FFFFFF) */}
      <SectionDivider type="dip" bgColor="#FAF6EE" fillColor="#FFFFFF" height="48px" />
      
      <AdmissionsForm />
    </>
  );
};

export default Home;
