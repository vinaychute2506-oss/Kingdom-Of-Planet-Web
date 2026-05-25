import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { eventsData } from '../../data/events';
import SectionTitle from '../common/SectionTitle';
import styles from './EventHighlights.module.scss';

const EventHighlights = () => {
  return (
    <section className="section" id="home-events">
      <div className="container">
        
        <SectionTitle 
          tag="Active Campus"
          title="Exciting Highlights & School Events"
          highlightWord="Highlights"
          align="center"
          subtitle="Discover how active our students are throughout the academic year. From sports events to theatrical arts, there is always joy at school."
        />

        <div className={styles.eventsGrid}>
          {eventsData.map((ev, index) => {
            return (
              <motion.div 
                className={styles.eventCard}
                key={ev.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                style={{ '--accent-color': ev.color }}
              >
                
                {/* Image panel */}
                <div className={styles.imgWrapper}>
                  <img src={ev.image} alt={ev.title} className={styles.eventImage} />
                  <div className={styles.dateTag} style={{ backgroundColor: ev.color }}>
                    <Calendar size={14} />
                    <span>{ev.date.split(',')[0]}</span>
                  </div>
                </div>

                {/* Info details */}
                <div className={styles.eventDetails}>
                  <h3 className={styles.eventTitle}>{ev.title}</h3>
                  
                  <div className={styles.metaRow}>
                    <div className={styles.metaItem}>
                      <Clock size={14} className={styles.metaIcon} />
                      <span>{ev.time}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <MapPin size={14} className={styles.metaIcon} />
                      <span>Main Campus</span>
                    </div>
                  </div>

                  <p className={styles.eventDesc}>{ev.description}</p>

                  <div className={styles.footerRow}>
                    <span className={styles.themeBadge}>Theme: {ev.theme}</span>
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

export default EventHighlights;
