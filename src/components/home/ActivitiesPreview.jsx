import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Activity, Music, Cpu, ArrowRight } from 'lucide-react';
import styles from './ActivitiesPreview.module.scss';

const activitiesList = [
  {
    id: "creative-arts",
    title: "Creative Arts",
    icon: Palette,
    tags: "Drawing, Painting, Craft"
  },
  {
    id: "sports-fitness",
    title: "Sports & Fitness",
    icon: Activity,
    tags: "Football, Yoga, Athletics"
  },
  {
    id: "music-dance",
    title: "Music & Dance",
    icon: Music,
    tags: "Vocal, Guitar, Choreography"
  },
  {
    id: "smart-learning",
    title: "Smart Learning",
    icon: Cpu,
    tags: "STEM, Coding, Robotics"
  }
];

const ActivitiesPreview = () => {
  const handleViewAll = () => {
    window.location.hash = '#activities';
  };

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
          {activitiesList.map((act, index) => {
            const IconComponent = act.icon;
            
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
                  <p className={styles.cardTags}>{act.tags}</p>
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
