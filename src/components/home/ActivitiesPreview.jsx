import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const getBgImage = (id) => {
  const mapping = {
    'art-craft': '/activity-art.webp',
    'music-dance': '/activity-music.webp',
    'storytelling-rhymes': '/activity-storytelling.webp',
    'indoor-outdoor-games': '/activity-games.webp',
    'sensory-activities': '/activity-sensory.webp',
    'festival-celebrations': '/activity-festivals.webp',
    'personality-development': '/activity-personality.webp',
    'creative-learning': '/activity-creative.webp',
    'motor-skill-development': '/activity-motor.webp',
    'fun-learning-activities': '/classroom-kids.webp'
  };
  return mapping[id] || '/activity-art.webp';
};

const ActivitiesPreview = () => {
  const { activities } = useCMS();
  const handleViewAll = () => {
    window.location.hash = '#activities';
  };

  // Slice first 4 activities to match layout structure
  const previewList = activities.slice(0, 4);

  return (
    <section className="section" id="home-activities" style={{ backgroundColor: '#FFFFFF', position: 'relative' }}>
      {/* Subtle background texture watermark */}
      <div 
        className="section-bg-watermark" 
        style={{ 
          backgroundImage: `url('/classroom-bg.webp')`,
          opacity: 0.28
        }} 
      />
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
            style={{ marginBottom: '32px' }}
          >
            <span>View All Activities</span>
            <ArrowRight size={16} />
          </motion.button>
 
          {/* Branded layered child-storytelling collage */}
          <div className={styles.storytellingCollage}>
            <div className={`${styles.collageItem} ${styles.archFrame1}`}>
              <img 
                src="/collage-1.webp" 
                alt="Smiling toddler playing with blocks" 
                loading="lazy"
              />
            </div>
            <div className={`${styles.collageItem} ${styles.archFrame2}`}>
              <img 
                src="/collage-2.webp" 
                alt="Smiling children playing with blocks" 
                loading="lazy"
              />
            </div>
            <div className={`${styles.collageItem} ${styles.archFrame3}`}>
              <img 
                src="/collage-3.webp" 
                alt="Teacher explaining reading book" 
                loading="lazy"
              />
            </div>
          </div>
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
                {/* Subtle blurred/faded background visual storytelling */}
                <div 
                  className={styles.cardBgImage}
                  style={{ backgroundImage: `url(${getBgImage(act.id)})` }}
                />
                <div className={styles.cardBgOverlay} />

                <div className={styles.cardContentWrapper}>
                  {/* Visual Icon Circle with monochromatic style */}
                  <div className={styles.iconCircle}>
                    <IconComponent size={22} strokeWidth={1.5} />
                  </div>

                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{act.title}</h3>
                    <p className={styles.cardTags}>{act.description}</p>
                  </div>
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

