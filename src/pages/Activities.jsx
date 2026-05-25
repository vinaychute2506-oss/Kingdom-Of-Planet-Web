import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Music, Activity, Cpu, Sparkles, Calendar, Clock, Star } from 'lucide-react';
import { activitiesData } from '../data/activities';
import SectionTitle from '../components/common/SectionTitle';
import styles from './ActivitiesPage.module.scss';

const iconMap = {
  Palette: Palette,
  Music: Music,
  Activity: Activity,
  Cpu: Cpu,
  Sparkles: Sparkles,
  Calendar: Calendar
};

const activityImages = {
  "art-craft": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=500",
  "music-dance": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=500",
  "storytelling-rhymes": "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&q=80&w=500",
  "indoor-outdoor-games": "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=500",
  "sensory-activities": "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=500",
  "festival-celebrations": "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&q=80&w=500",
  "personality-development": "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?auto=format&fit=crop&q=80&w=500",
  "creative-learning": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=500",
  "motor-skill-development": "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=500",
  "fun-learning-activities": "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=500"
};

const filterCategories = ["All", "Creative", "Physical", "Cognitive", "Social"];

const Activities = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredActivities = activeFilter === "All"
    ? activitiesData
    : activitiesData.filter(act => act.category === activeFilter);

  return (
    <div className={styles.activitiesPage}>
      
      {/* Header Banner */}
      <section className={styles.pageHeader}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            School Activities
          </motion.h1>
          <p>Discover our wide array of cognitive workshops, sports schedules, music training, and seasonal camps.</p>
        </div>
      </section>

      {/* Main filter list and Grid */}
      <section className="section">
        <div className="container">
          
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
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className={styles.activityCard}
                    key={act.id}
                    style={{ '--accent-color': act.color, '--bg-soft': act.bgSoft }}
                  >
                    
                    {/* Top Image Banner */}
                    <div className={styles.cardImageWrapper}>
                      <img 
                        src={activityImages[act.id]} 
                        alt={act.title} 
                        className={styles.cardImage} 
                        loading="lazy" 
                      />
                      <span className={styles.categoryBadge}>{act.category}</span>
                    </div>

                    {/* Content Wrapper */}
                    <div className={styles.cardContent}>
                      <div className={styles.titleRow}>
                        <div className={styles.iconCircle}>
                          <IconComponent size={18} />
                        </div>
                        <h3 className={styles.cardTitle}>{act.title}</h3>
                      </div>
                      <p className={styles.cardDesc}>{act.description}</p>
                      <p className={styles.cardDetails}>{act.details}</p>

                      <div className={styles.scheduleRow}>
                        <Clock size={16} className={styles.clockIcon} />
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
