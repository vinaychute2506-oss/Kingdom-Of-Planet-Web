import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Users, Coffee, Sparkles, Bike, Heart } from 'lucide-react';
import { routineData } from '../../data/routine';
import SectionTitle from '../common/SectionTitle';
import styles from './SchedulePreview.module.scss';

const iconMap = {
  Sun: Sun,
  Users: Users,
  Coffee: Coffee,
  Sparkles: Sparkles,
  Bike: Bike,
  Heart: Heart
};

const SchedulePreview = () => {
  return (
    <section className="section" style={{ backgroundColor: '#FAF6EE', position: 'relative' }}>
      {/* Subtle background texture watermark */}
      <div 
        className="section-bg-watermark" 
        style={{ 
          backgroundImage: `url('/classroom-bg.webp')`,
          opacity: 0.28
        }} 
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        <SectionTitle 
          tag="A Day At Our Pre School"
          title="Playful Schedules Designed for Daily Discoveries"
          highlightWord="Schedules"
          align="center"
          subtitle="We craft every hour to balance logical learning, high-energy games, rest, nutritious snack breaks, and creative arts exploration."
        />

        <div className={styles.timelineGrid}>
          {routineData.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            
            return (
              <motion.div 
                className={styles.routineCard} 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                {/* Visual Icon Header with monochromatic wine circle */}
                <div className={styles.iconCircle}>
                  <IconComponent size={22} strokeWidth={1.5} />
                </div>

                {/* Content details */}
                <div className={styles.timeTag}>
                  {item.time}
                </div>

                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic bottom CTA badge */}
        <div className={styles.bottomCallout}>
          <p>
            Interested in experiencing it live? <a href="#contact" className={styles.visitLink}><strong>Book a personal campus tour</strong></a> with our principal today.
          </p>
        </div>

      </div>
    </section>
  );
};

export default SchedulePreview;
