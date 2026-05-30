import React from 'react';
import { motion } from 'framer-motion';
import { Baby, Smile, BookOpen, Check, Target, Compass, ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { FALLBACK_IMAGES } from '../config/cms';
import SectionTitle from '../components/common/SectionTitle';
import styles from './Programs.module.scss';

const iconMap = {
  Baby: Baby,
  Smile: Smile,
  BookOpen: BookOpen
};

const Programs = () => {
  const { programs } = useCMS();

  return (
    <div className={styles.programsPage}>
      
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Academic Programs
          </motion.h1>
          <p>Explore our carefully designed age-appropriate curriculum for Nursery, Kindergarten, and Primary classes.</p>
        </div>
      </section>

      {/* Main expanded program details section */}
      <section className="section">
        <div className="container">
          
          <div className={styles.programDetailsList}>
            {programs.map((prog, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div 
                  className={`${styles.progBlock} ${isEven ? '' : styles.reverseBlock}`} 
                  key={prog.id}
                >
                  {/* Left Column: Visual summary badge (arch image) */}
                  <motion.div 
                    className={styles.visualCol}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className={styles.illustrationCard}>
                      <img 
                        src={prog.image} 
                        alt={prog.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={(e) => { e.target.src = FALLBACK_IMAGES.program; }}
                        loading="lazy"
                      />
                      <div className={styles.imageOverlayContainer}>
                        <div className={styles.agePill}>
                          {prog.age}
                        </div>
                        <h3 className={styles.imageOverlayTitle}>{prog.title}</h3>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Column: Full description and features checklist */}
                  <motion.div 
                    className={styles.textCol}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                  >
                    <h2 className={styles.title}>{prog.title} Curriculum</h2>
                    <h4 className={styles.tagline}>{prog.tagline}</h4>
                    <p className={styles.descText}>{prog.description}</p>

                    {/* Features checklist */}
                    <div className={styles.curriculumGrid}>
                      <div className={styles.featuresSection}>
                        <h4>Key Focus Milestones:</h4>
                        <ul className={styles.checkList}>
                          {prog.features && prog.features.map((feat, i) => (
                            <li key={i}>
                              <Check className={styles.checkIcon} size={14} />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Activities list */}
                      <div className={styles.activitiesSection}>
                        <h4>Specialized Activities:</h4>
                        <ul className={styles.checkList}>
                          {prog.activities && prog.activities.map((act, i) => (
                            <li key={i}>
                              <span className={styles.bulletDot} />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Methodology highlight */}
                    <div className={styles.methodologyBox}>
                      <Target className={styles.methodIcon} size={18} strokeWidth={1.5} />
                      <div>
                        <strong>Learning Method: </strong>
                        <span>{prog.learningMethod}</span>
                      </div>
                    </div>

                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Bottom enrollment callout */}
      <section className="section section-accent" style={{ backgroundColor: '#FAF6EE', margin: '0 24px', borderRadius: '32px' }}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Ready to Shape Your Child's Future?</h2>
            <p>Admissions are officially open for the current academic session 2026-27. Book a campus tour today!</p>
            <motion.button 
              className={styles.enrollBtn}
              onClick={() => window.location.hash = '#contact'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Apply for Admissions</span>
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Programs;

