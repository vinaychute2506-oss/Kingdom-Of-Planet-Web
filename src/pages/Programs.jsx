import React from 'react';
import { motion } from 'framer-motion';
import { Baby, Smile, BookOpen, GraduationCap, Check, Shield, Heart, Users, Star, MessageSquare } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { FALLBACK_IMAGES } from '../config/cms';
import SectionDivider from '../components/common/SectionDivider';
import styles from './Programs.module.scss';

// Map icons dynamically
const iconMap = {
  Baby: Baby,
  Smile: Smile,
  BookOpen: BookOpen,
  GraduationCap: GraduationCap
};

const Programs = () => {
  const { programs } = useCMS();

  const featureStripList = [
    {
      icon: Shield,
      title: "Safe & Secure Environment",
      desc: "Padded campus with CCTV and trained staff."
    },
    {
      icon: Heart,
      title: "Experiential Learning",
      desc: "Learn by doing through play, projects, and activities."
    },
    {
      icon: Users,
      title: "Nurturing Educators",
      desc: "Loving, qualified teachers who inspire and guide."
    },
    {
      icon: Star,
      title: "Holistic Development",
      desc: "Academic, physical, emotional and social growth."
    },
    {
      icon: MessageSquare,
      title: "Every child is unique",
      desc: "We help them shine in their own way."
    }
  ];

  return (
    <div className={styles.programsPage}>
      
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div 
          className="section-bg-watermark" 
          style={{ 
            backgroundImage: `url('/classroom-bg.webp')`,
            opacity: 0.12
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.headerDecor}>
            <span className={styles.decorStar}>✦</span>
            <span className={styles.decorCrown}>👑</span>
            <span className={styles.decorStar}>✦</span>
          </div>
          <span className={styles.taglineUpper}>OUR ACADEMIC PROGRAMS</span>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nurturing Young Minds. <br />Building <span className={styles.italicHighlight}>Strong</span> Foundations.
          </motion.h1>
          <div className={styles.heartLine}>
            <Heart size={14} className={styles.heartIcon} />
          </div>
          <p className={styles.subtitleText}>Our age-appropriate curriculum is thoughtfully designed to encourage curiosity, creativity, and confidence at every stage of early childhood.</p>
        </div>
      </section>

      {/* 2x2 Grid of Curriculum Cards */}
      <section className="section" style={{ backgroundColor: '#FAF6EE', paddingTop: '56px', paddingBottom: '56px' }}>
        <div className="container">
          
          <div className={styles.curriculumGrid}>
            {programs.map((prog, idx) => {
              const IconComp = iconMap[prog.icon] || BookOpen;
              const numberStr = `0${idx + 1}`;
              
              // Custom colors based on program
              const customColors = {
                borderColor: prog.accentColor,
                bgColor: prog.lightBg
              };

              return (
                <motion.div 
                  className={styles.curriculumCard}
                  key={prog.id}
                  style={{ 
                    borderColor: `${customColors.borderColor}33`, 
                    backgroundColor: customColors.bgColor,
                    borderBottom: `4px solid ${customColors.borderColor}`
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  {/* Left part: Image */}
                  <div className={styles.cardImageCol}>
                    <img 
                      src={prog.image} 
                      alt={prog.title} 
                      onError={(e) => { e.target.src = FALLBACK_IMAGES.program; }}
                      loading="lazy"
                    />
                  </div>

                  {/* Right part: Details */}
                  <div className={styles.cardContentCol}>
                    <div className={styles.cardHeader}>
                      <div className={styles.iconCircle} style={{ backgroundColor: `${customColors.borderColor}15`, color: customColors.borderColor }}>
                        <IconComp size={18} />
                      </div>
                      <span className={styles.numberLabel} style={{ color: customColors.borderColor }}>{numberStr}</span>
                    </div>
                    
                    <h3 className={styles.cardTitle}>{prog.title} Curriculum</h3>
                    <p className={styles.cardDesc}>{prog.description}</p>

                    <div className={styles.milestonesSection}>
                      <ul className={styles.checkList}>
                        {prog.features && prog.features.map((feat, i) => (
                          <li key={i}>
                            <Check className={styles.checkIcon} size={14} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Five-column Feature Strip */}
      <section className={styles.featureStripSection}>
        <div className="container">
          <div className={styles.featureStripGrid}>
            {featureStripList.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div className={styles.stripItem} key={idx}>
                  <div className={styles.stripIconCircle}>
                    <IconComp size={20} strokeWidth={1.5} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Card with Blurry Backdrop */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', paddingTop: '64px', paddingBottom: '64px', position: 'relative' }}>
        <div 
          className="section-bg-watermark" 
          style={{ 
            backgroundImage: `url('/classroom-bg.webp')`,
            opacity: 0.12
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          <div className={styles.ctaBannerBox}>
            <div className={styles.ctaBlurBg} />
            <div className={styles.ctaContent}>
              <div className={styles.ctaCrownIcon}>👑</div>
              <h2>Ready to Shape Your Child's Future?</h2>
              <p>Admissions are officially open for the current academic session 2026-27. <br />Book a campus tour today!</p>
              <motion.button 
                className={styles.ctaBtn}
                onClick={() => window.location.hash = '#contact'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Apply for Admissions</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </motion.button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Programs;
