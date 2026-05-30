import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Activity, Music, Cpu, Sparkles, Calendar, Users, Heart, Sun, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import styles from './ActivitiesPreview.module.scss';

const iconMap = {
  Palette,
  Activity,
  Music,
  Cpu,
  Sparkles,
  Calendar,
  Users,
  Heart,
  Sun,
  Clock,
  BookOpen
};

const ActivitiesPreview = () => {
  const { activities } = useCMS();
  const handleViewAll = () => {
    window.location.hash = '#activities';
  };

  // Slice first 4 activities to match layout structure
  const previewList = activities.slice(0, 4);

  return (
    <section className="section" id="home-activities" style={{ backgroundColor: '#FFFFFF' }}>
      <div className={`container ${styles.gridContainer}`}>
        
        {/* Left Side: Callout Text Panel */}
        <div className={styles.leftCol}>
          <span className={styles.tag}>Our Activities</span>
          <h2 className={styles.heading}>
            Learn. Play. <br />
            Discover. <span className={styles.highlight}>Grow.</span>
          </h2>
          <p className={styles.subtext}>
            We offer a wide and diverse range of early development programs to unlock key creative talents and physical potentials in every growing child.
          </p>
          <motion.button 
            className={styles.viewBtn} 
            onClick={handleViewAll}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View All Activities</span>
            <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* Right Side: The 4 Columns cards */}
        <div className={styles.rightCol}>
          {previewList.map((act, index) => {
            const IconComponent = iconMap[act.icon] || Sparkles;
            
            return (
              <motion.div 
                className={styles.activityCard}
                key={act.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                {/* Visual Icon Circle with monochromatic style */}
                <div className={styles.iconCircle}>
                  <IconComponent size={22} strokeWidth={1.5} />
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{act.title}</h3>
                  <p className={styles.cardTags}>{act.description}</p>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ActivitiesPreview;

