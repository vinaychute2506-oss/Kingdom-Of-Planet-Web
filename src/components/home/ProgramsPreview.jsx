import React from 'react';
import { motion } from 'framer-motion';
import { Baby, Smile, BookOpen, ChevronRight, GraduationCap } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import SectionTitle from '../common/SectionTitle';
import styles from './ProgramsPreview.module.scss';

const iconMap = {
  Baby: Baby,
  Smile: Smile,
  BookOpen: BookOpen,
  GraduationCap: GraduationCap
};

const ProgramsPreview = () => {
  const { programs } = useCMS();
  const handleLearnMore = () => {
    window.location.hash = '#programs';
  };

  return (
    <section className="section" id="home-programs" style={{ backgroundColor: '#FFFFFF', position: 'relative' }}>
      {/* Subtle background texture watermark */}
      <div 
        className="section-bg-watermark" 
        style={{ 
          backgroundImage: `url('/classroom-bg.png')`,
          opacity: 0.16
        }} 
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        <SectionTitle 
          tag="Our Foundations"
          title="Programs Designed for Every Learning Stage"
          highlightWord="Programs"
          align="center"
          subtitle="Our curriculum is tailored to nurture cognitive growth, emotional security, creative capabilities, and logical skills as your child develops."
        />

        <div className={styles.programsGrid}>
          {programs.map((program, index) => {
            const IconComponent = iconMap[program.icon] || GraduationCap;
            const themeClass = styles[`theme-${program.id}`] || '';
            
            return (
              <motion.div 
                className={`${styles.programCard} ${themeClass}`}
                key={program.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                
                {/* Age pill badge */}
                <div className={styles.ageBadge}>
                  {program.age}
                </div>

                {/* Monochromatic outline icon circle */}
                <div className={styles.iconCircle}>
                  <IconComponent size={22} strokeWidth={1.5} />
                </div>

                <h3 className={styles.programTitle}>{program.title}</h3>
                <p className={styles.tagline}>{program.tagline}</p>
                <p className={styles.description}>{program.description}</p>

                {/* Learn more trigger */}
                <button className={styles.cardBtn} onClick={handleLearnMore}>
                  <span>Explore Program</span>
                  <div className={styles.btnArrowCircle}>
                    <ChevronRight size={14} color="#FFFFFF" />
                  </div>
                </button>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProgramsPreview;

