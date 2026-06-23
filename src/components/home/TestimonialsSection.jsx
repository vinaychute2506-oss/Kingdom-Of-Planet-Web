import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Sun, Quote } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { FALLBACK_IMAGES } from '../../config/cms';
import SectionTitle from '../common/SectionTitle';
import styles from './TestimonialsSection.module.scss';

const cornerIcons = [Heart, Star, Sun];

const TestimonialsSection = () => {
  const { testimonials } = useCMS();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section" id="home-testimonials" style={{ backgroundColor: '#FAF6EE', position: 'relative' }}>
      {/* Subtle background texture watermark */}
      <div 
        className="section-bg-watermark" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1600')`,
          opacity: 0.35
        }} 
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        <SectionTitle 
          tag="Happy Parents"
          title="What Parents Say About Our School"
          highlightWord="Parents"
          align="center"
          subtitle="Real stories from families who have experienced our caring environment and joyful learning."
        />

        <div className={styles.testimonialsGrid}>
          {testimonials.map((test, index) => {
            const IconComp = cornerIcons[index % cornerIcons.length] || Heart;
            const themeClass = styles[`theme-${index % 3}`];

            return (
              <motion.div 
                className={`${styles.testimonialCard} ${themeClass}`}
                key={test.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                {/* Top Left Corner Icon Badge */}
                <div className={styles.cornerDecoration}>
                  <IconComp size={16} strokeWidth={2} />
                </div>

                {/* Top Right Quote Mark */}
                <div className={styles.quoteIcon}>
                  ”
                </div>

                {/* Stars Row */}
                <div className={styles.starsRow}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" color="currentColor" />
                  ))}
                </div>

                <p className={styles.quoteText}>“{test.quote}”</p>

                {/* Author Card Info */}
                <div className={styles.authorSection}>
                  <div className={styles.avatarBox}>
                    <img 
                      src={test.avatar} 
                      alt={test.author} 
                      className={styles.avatarImg} 
                      onError={(e) => { e.target.src = FALLBACK_IMAGES.testimonial; }}
                    />
                  </div>
                  <div className={styles.authorInfo}>
                    <h4 className={styles.authorName}>{test.author}</h4>
                    <p className={styles.childTag}>{test.childName}</p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Active dots for presentation */}
        <div className={styles.dotsContainer}>
          {testimonials.map((_, idx) => (
            <div 
              key={idx} 
              className={`${styles.dot} ${idx === activeIndex ? styles.activeDot : ''}`}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
