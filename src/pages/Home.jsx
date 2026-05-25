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

const Home = () => {
  return (
    <>
      <Hero />
      <AboutPreview />
      <SchedulePreview />
      <ProgramsPreview />
      <ActivitiesPreview />
      <SafetySection />
      <WhyChooseUs />
      <MethodologySection />
      <EventHighlights />
      <GalleryPreview />
      <TestimonialsSection />
      <AdmissionsForm />
    </>
  );
};

export default Home;
