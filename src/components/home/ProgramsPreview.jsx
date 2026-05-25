import React from 'react';
import { motion } from 'framer-motion';
import { Baby, Smile, BookOpen, ChevronRight } from 'lucide-react';
import { programsData } from '../../data/programs';
import SectionTitle from '../common/SectionTitle';
import styles from './ProgramsPreview.module.scss';

const iconMap = {
  Baby: Baby,
  Smile: Smile,
  BookOpen: BookOpen
};

const ProgramsPreview = () => {
  const handleLearnMore = () => {
    window.location.hash = '#programs';
  };

  return (
    <section className="section section-accent" id="home-programs">
      <div className="container">
        
        <SectionTitle 
          tag="Our Foundations"
          title="Programs Designed for Every Learning Stage"
          highlightWord="Programs"
          align="center"
          subtitle="Our curriculum is tailored to nurture cognitive growth, emotional security, creative capabilities, and logical skills as your child develops."
        />

        <div className={styles.programsGrid}>
          {programsData.map((program, index) => {
            const IconComponent = iconMap[program.icon] || Smile;
            
            return (
              <motion.div 
                className={styles.programCard}
                key={program.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                style={{ 
                  '--accent-color': program.accentColor,
                  '--shadow-color': program.shadowColor,
                  background: program.gradient
                }}
              >
                
                {/* Age pill badge */}
                <div className={styles.ageBadge}>
                  {program.age}
                </div>

                {/* Floating graphic element icon */}
                <div className={styles.iconCircle}>
                  <IconComponent size={28} />
                </div>

                <h3 className={styles.programTitle}>{program.title}</h3>
                <p className={styles.tagline}>{program.tagline}</p>
                <p className={styles.description}>{program.description.slice(0, 120)}...</p>

                {/* Learn more interactive trigger */}
                <button className={styles.cardBtn} onClick={handleLearnMore}>
                  <span>Learn More</span>
                  <ChevronRight size={16} />
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
