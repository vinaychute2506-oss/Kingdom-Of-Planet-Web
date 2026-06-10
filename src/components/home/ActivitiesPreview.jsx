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
    'art-craft': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400',
    'music-dance': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=400',
    'storytelling-rhymes': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400',
    'indoor-outdoor-games': 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=400',
    'sensory-activities': 'https://images.unsplash.com/photo-1537655780520-1e392edd816a?auto=format&fit=crop&q=80&w=400',
    'festival-celebrations': 'https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&q=80&w=400',
    'personality-development': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    'creative-learning': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=400',
    'motor-skill-development': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400',
    'fun-learning-activities': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400'
  };
  return mapping[id] || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400';
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
          backgroundImage: `url('https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&q=80&w=1000')`,
          opacity: 0.12
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
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600" 
                alt="Smiling toddler playing with blocks" 
                loading="lazy"
              />
            </div>
            <div className={`${styles.collageItem} ${styles.archFrame2}`}>
              <img 
                src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600" 
                alt="Smiling child painting" 
                loading="lazy"
              />
            </div>
            <div className={`${styles.collageItem} ${styles.archFrame3}`}>
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600" 
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

