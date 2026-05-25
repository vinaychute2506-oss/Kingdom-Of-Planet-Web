import React from 'react';
import { motion } from 'framer-motion';
import { Baby, Smile, BookOpen, Check, Target, Compass, Sparkles } from 'lucide-react';
import { programsData } from '../data/programs';
import SectionTitle from '../components/common/SectionTitle';
import styles from './Programs.module.scss';

const iconMap = {
  Baby: Baby,
  Smile: Smile,
  BookOpen: BookOpen
};

const Programs = () => {
  return (
    <div className={styles.programsPage}>
      
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
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
            {programsData.map((prog, idx) => {
              const IconComp = iconMap[prog.icon] || Smile;
              const isEven = idx % 2 === 0;

              return (
                <div 
                  className={`${styles.progBlock} ${isEven ? '' : styles.reverseBlock}`} 
                  key={prog.id}
                  style={{ '--accent-color': prog.accentColor, '--bg-soft': prog.lightBg }}
                >
                  {/* Left Column: Visual summary badge */}
                  <motion.div 
                    className={styles.visualCol}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className={styles.illustrationCard} style={{ background: prog.gradient }}>
                      <div className={styles.iconContainer}>
                        <IconComp size={48} />
                      </div>
                      <h2 className={styles.progStageTitle}>{prog.title}</h2>
                      <div className={styles.agePill}>{prog.age}</div>
                    </div>
                  </motion.div>

                  {/* Right Column: Full description and features checklist */}
                  <motion.div 
                    className={styles.textCol}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <h2 className={styles.title}>{prog.title} Curriculum</h2>
                    <h4 className={styles.tagline}>{prog.tagline}</h4>
                    <p className={styles.descText}>{prog.description}</p>

                    {/* Features checklist */}
                    <div className={styles.curriculumGrid}>
                      <div className={styles.featuresSection}>
                        <h4>Key Focus Milestones:</h4>
                        <ul className={styles.checkList}>
                          {prog.features.map((feat, i) => (
                            <li key={i}>
                              <Check className={styles.checkIcon} size={16} />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Activities list */}
                      <div className={styles.activitiesSection}>
                        <h4>Specialized Activities:</h4>
                        <ul className={styles.checkList}>
                          {prog.activities.map((act, i) => (
                            <li key={i}>
                              <span className={styles.bulletDot} style={{ backgroundColor: prog.accentColor }} />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Methodology highlight */}
                    <div className={styles.methodologyBox}>
                      <Target className={styles.methodIcon} size={22} />
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
      <section className="section section-accent">
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Ready to Shape Your Child's Future?</h2>
            <p>Admissions are officially open for the current academic session 2026-27. Book a campus tour today!</p>
            <motion.button 
              className={styles.enrollBtn}
              onClick={() => window.location.hash = '#contact'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Apply for Admissions</span>
              <Sparkles size={16} />
            </motion.button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Programs;
