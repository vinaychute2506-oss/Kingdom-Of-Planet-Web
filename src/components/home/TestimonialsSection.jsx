import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonialsData } from '../../data/testimonials';
import SectionTitle from '../common/SectionTitle';
import styles from './TestimonialsSection.module.scss';

const TestimonialsSection = () => {
  return (
    <section className="section section-accent" id="home-testimonials">
      <div className="container">
        
        <SectionTitle 
          tag="Happy Parents"
          title="What Parents Say About Our School"
          highlightWord="Parents"
          align="center"
          subtitle="Read honest reviews and testimonials from families who have experienced our loving academic atmosphere first-hand."
        />

        <div className={styles.testimonialsGrid}>
          {testimonialsData.map((test, index) => {
            return (
              <motion.div 
                className={styles.testimonialCard}
                key={test.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                
                {/* Floating quote bubble icon */}
                <div className={styles.quoteIcon}>
                  <Quote size={20} fill="#8A4FFF" color="#8A4FFF" />
                </div>

                {/* Stars Row */}
                <div className={styles.starsRow}>
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#FFC83B" color="#FFC83B" />
                  ))}
                </div>

                <p className={styles.quoteText}>"{test.quote}"</p>

                {/* Author Card Info */}
                <div className={styles.authorSection}>
                  <div className={styles.avatarBox}>
                    <img src={test.avatar} alt={test.author} className={styles.avatarImg} />
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

      </div>
    </section>
  );
};

export default TestimonialsSection;
