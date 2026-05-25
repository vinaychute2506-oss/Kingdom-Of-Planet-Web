import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Activity, Music, Cpu, Sparkles } from 'lucide-react';
import styles from './ActivitiesPreview.module.scss';

const activitiesList = [
  {
    id: "creative-arts",
    title: "Creative Arts",
    accent: "#FFC83B", // Yellow
    bgSoft: "#FFFDEB",
    icon: Palette,
    emoji: "🎨",
    tags: "Drawing, Painting, Craft"
  },
  {
    id: "sports-fitness",
    title: "Sports & Fitness",
    accent: "#4CAF50", // Green
    bgSoft: "#E8F5E9",
    icon: Activity,
    emoji: "⚽",
    tags: "Football, Yoga, Athletics"
  },
  {
    id: "music-dance",
    title: "Music & Dance",
    accent: "#8A4FFF", // Purple
    bgSoft: "#F3E8FF",
    icon: Music,
    emoji: "🎵",
    tags: "Vocal, Guitar, Choreography"
  },
  {
    id: "smart-learning",
    title: "Smart Learning",
    accent: "#29B6F6", // Blue
    bgSoft: "#E1F5FE",
    icon: Cpu,
    emoji: "🤖",
    tags: "STEM, Coding, Robotics"
  }
];

const ActivitiesPreview = () => {
  const handleViewAll = () => {
    window.location.hash = '#activities';
  };

  return (
    <section className="section" id="home-activities">
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Activities</span>
            <Sparkles size={16} />
          </motion.button>
        </div>

        {/* Right Side: The 4 Columns cards (matching reference image) */}
        <div className={styles.rightCol}>
          {activitiesList.map((act, index) => {
            const IconComponent = act.icon;
            
            return (
              <motion.div 
                className={styles.activityCard}
                key={act.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                style={{ 
                  '--accent-color': act.accent,
                  '--bg-soft': act.bgSoft
                }}
              >
                {/* Visual Avatar Emoji Box */}
                <div className={styles.visualBox}>
                  <span className={styles.emoji}>{act.emoji}</span>
                  <div className={styles.iconOverlay}>
                    <IconComponent size={20} />
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{act.title}</h3>
                  <p className={styles.cardTags}>{act.tags}</p>
                </div>

                {/* Subtle bottom indicator line */}
                <div className={styles.indicatorBar} />

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ActivitiesPreview;
