import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Music, Activity, Cpu, Sparkles, Calendar, Users, Heart, Sun, Clock, BookOpen } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { FALLBACK_IMAGES } from '../config/cms';
import SectionTitle from '../components/common/SectionTitle';
import styles from './ActivitiesPage.module.scss';

const iconMap = {
  Palette: Palette,
  Music: Music,
  Activity: Activity,
  Cpu: Cpu,
  Sparkles: Sparkles,
  Calendar: Calendar,
  Users: Users,
  Heart: Heart,
  Sun: Sun,
  Clock: Clock,
  BookOpen: BookOpen
};

const filterCategories = ["All", "Creative", "Physical", "Cognitive", "Social"];

const getActivityImage = (id) => {
  const mapping = {
    'art-craft': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600',
    'music-dance': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600',
    'storytelling-rhymes': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600',
    'indoor-outdoor-games': 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=600',
    'sensory-activities': 'https://images.unsplash.com/photo-1537655780520-1e392edd816a?auto=format&fit=crop&q=80&w=600',
    'festival-celebrations': 'https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&q=80&w=600',
    'personality-development': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    'creative-learning': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=600',
    'motor-skill-development': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
    'fun-learning-activities': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600'
  };
  return mapping[id] || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600';
};

const Activities = () => {
  const { activities } = useCMS();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredActivities = activeFilter === "All"
    ? activities
    : activities.filter(act => act.category === activeFilter);

  return (
    <div className={styles.activitiesPage}>
      
      {/* Header Banner */}
      <section className={styles.pageHeader}>
        {/* Subtle background texture watermark */}
        <div 
          className="section-bg-watermark" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=1600')`,
            opacity: 0.26
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            School Activities
          </motion.h1>
          <p>Discover our wide array of cognitive workshops, sports schedules, music training, and seasonal camps.</p>
        </div>
      </section>

      {/* Main filter list and Grid */}
      <section className="section" style={{ position: 'relative' }}>
        {/* Subtle background texture watermark */}
        <div 
          className="section-bg-watermark" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1600')`,
            opacity: 0.26
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          
          <SectionTitle 
            tag="Active Learning"
            title="Co-Curricular Activities & Workshops"
            highlightWord="Activities"
            align="center"
            subtitle="Choose a category below to explore active classes designed to foster balance, logical capability, and visual arts."
          />

          {/* Tag filters list */}
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

          {/* Cards Grid */}
          <motion.div layout className={styles.activitiesGrid}>
            <AnimatePresence mode="popLayout">
              {filteredActivities.map((act) => {
                const IconComponent = iconMap[act.icon] || Sparkles;
                
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={styles.activityCard}
                    key={act.id}
                  >
                    
                    {/* Top Image Banner */}
                    <div className={styles.cardImageWrapper}>
                      <img 
                        src={getActivityImage(act.id)} 
                        alt={act.title} 
                        className={styles.cardImage} 
                        onError={(e) => { e.target.src = FALLBACK_IMAGES.activity; }}
                        loading="lazy" 
                      />
                      <span className={styles.categoryBadge}>{act.category}</span>
                    </div>

                    {/* Content Wrapper */}
                    <div className={styles.cardContent}>
                      <div className={styles.titleRow}>
                        <div className={styles.iconCircle}>
                          <IconComponent size={20} strokeWidth={1.5} />
                        </div>
                        <h3 className={styles.cardTitle}>{act.title}</h3>
                      </div>
                      <p className={styles.cardDesc}>{act.description}</p>
                      <p className={styles.cardDetails}>{act.details}</p>

                      <div className={styles.scheduleRow}>
                        <Clock size={14} className={styles.clockIcon} />
                        <span>{act.schedule}</span>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default Activities;

