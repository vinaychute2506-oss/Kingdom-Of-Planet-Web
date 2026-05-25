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
                    
                    {/* Header with circular icon */}
                    <div className={styles.cardHeader}>
                      <div className={styles.iconCircle}>
                        <IconComponent size={24} />
                      </div>
                      <span className={styles.categoryBadge}>{act.category}</span>
                    </div>

                    <h3 className={styles.cardTitle}>{act.title}</h3>
                    <p className={styles.cardDesc}>{act.description}</p>
                    <p className={styles.cardDetails}>{act.details}</p>

                    <div className={styles.scheduleRow}>
                      <Clock size={16} className={styles.clockIcon} />
                      <span>{act.schedule}</span>
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
