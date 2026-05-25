import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Users, Coffee, Sparkles, Bike, Heart, Calendar } from 'lucide-react';
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
    <section className="section">
      <div className="container">
        
        <SectionTitle 
          tag="A Day At Kingdom Of Planet"
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, boxShadow: "0 15px 35px rgba(44, 62, 80, 0.08)" }}
              >
                {/* Visual Icon Header with custom accent color */}
                <div 
                  className={styles.iconCircle}
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  <IconComponent size={24} />
                </div>

                {/* Content details */}
                <div className={styles.timeTag} style={{ backgroundColor: item.color }}>
                  {item.time}
                </div>

                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
                
                {/* Playful corner dot decorator */}
                <span className={styles.cornerDecor} style={{ backgroundColor: item.color }} />
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic bottom CTA badge */}
        <div className={styles.bottomCallout}>
          <p>
            🎒 Interested in experiencing it live? <a href="#contact" className={styles.visitLink}><strong>Book a personal campus tour</strong></a> with our principal today!
          </p>
        </div>

      </div>
    </section>
  );
};

export default SchedulePreview;
