import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Music, BookOpen, Activity, Fingerprint, Sparkles, Smile, Lightbulb, Compass, Shield, GraduationCap, Users, Heart, MessageSquare } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { FALLBACK_IMAGES } from '../config/cms';
import SectionDivider from '../components/common/SectionDivider';
import styles from './ActivitiesPage.module.scss';

const iconMap = {
  Palette: Palette,
  Music: Music,
  BookOpen: BookOpen,
  Activity: Activity,
  Fingerprint: Fingerprint,
  Sparkles: Sparkles,
  Smile: Smile,
  Lightbulb: Lightbulb,
  Compass: Compass
};

const filterCategories = ["All", "Creative", "Physical", "Cognitive", "Social"];

const Activities = () => {
  const { activities } = useCMS();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredActivities = activeFilter === "All"
    ? activities
    : activities.filter(act => act.category === activeFilter);

  const trustStripItems = [
    {
      icon: Shield,
      title: "Safe & Secure Campus",
      desc: "A nurturing environment where safety always comes first."
    },
    {
      icon: GraduationCap,
      title: "Qualified Educators",
      desc: "Experienced, caring teachers who inspire young minds."
    },
    {
      icon: Users,
      title: "Playful Learning",
      desc: "Activity-based learning that makes every day joyful."
    },
    {
      icon: Heart,
      title: "Nurturing Care",
      desc: "We care with warmth, patience and individual attention."
    },
    {
      icon: Palette,
      title: "Creative Growth",
      desc: "Encouraging imagination, curiosity and self-expression."
    },
    {
      icon: MessageSquare,
      title: "Open Communication",
      desc: "Strong parent partnership for every child's success."
    }
  ];

  return (
    <div className={styles.activitiesPage}>
      
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
          <span className={styles.upperTag}>ACTIVE LEARNING</span>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            School Activities
          </motion.h1>
          <div className={styles.heartLine}>
            <Heart size={14} className={styles.heartIcon} />
          </div>
          <p>Discover our wide array of co-curricular activities and workshops that foster creativity, confidence, and holistic growth.</p>
        </div>
      </section>

      {/* Co-Curricular & Workshops Section */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', paddingTop: '56px', paddingBottom: '64px' }}>
        <div className="container">
          
          <div className={styles.sectionHeader}>
            <h2>Co-Curricular Activities & Workshops</h2>
            <p>Choose a category below to explore activities designed for holistic development.</p>
          </div>

          {/* Category Filter Bar */}
          <div className={styles.filterBar}>
            {filterCategories.map((cat) => (
              <button 
                key={cat} 
                className={`${styles.filterBtn} ${activeFilter === cat ? styles.activeBtn : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Horizontal Layout 9 Cards Grid */}
          <motion.div layout className={styles.activitiesGrid}>
            <AnimatePresence mode="popLayout">
              {filteredActivities.map((act) => {
                const IconComponent = iconMap[act.icon] || Sparkles;
                
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={styles.activityCard}
                    key={act.id}
                  >
                    
                    {/* Left: Icon Badge */}
                    <div className={styles.cardIconCol}>
                      <div className={styles.iconCircle} style={{ borderColor: `${act.color}33`, color: act.color, backgroundColor: `${act.color}0a` }}>
                        <IconComponent size={20} strokeWidth={1.8} />
                      </div>
                    </div>

                    {/* Middle: Text Details */}
                    <div className={styles.cardContentCol}>
                      <h3 className={styles.cardTitle}>{act.title}</h3>
                      <p className={styles.cardDesc}>{act.description}</p>
                    </div>

                    {/* Right: Landscape Image */}
                    <div className={styles.cardImageCol}>
                      <img 
                        src={act.image} 
                        alt={act.title} 
                        onError={(e) => { e.target.src = FALLBACK_IMAGES.activity; }}
                        loading="lazy" 
                      />
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* 6-Block Trust Strip (Above Footer) */}
      <section className={styles.trustStripSection}>
        <div className="container">
          <div className={styles.trustGrid}>
            {trustStripItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div className={styles.trustItem} key={idx}>
                  <div className={styles.trustIconCircle}>
                    <IconComp size={22} strokeWidth={1.5} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Activities;
