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
          backgroundImage: `url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800')`,
          opacity: 0.10
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
            // Find correct icon component or fallback to GraduationCap
            const IconComponent = iconMap[program.icon] || GraduationCap;
            
            return (
              <motion.div 
                className={styles.programCard}
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
                <p className={styles.description}>{program.description.slice(0, 105)}...</p>

                {/* Learn more trigger */}
                <button className={styles.cardBtn} onClick={handleLearnMore}>
                  <span>Explore Program</span>
                  <ChevronRight size={14} />
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

