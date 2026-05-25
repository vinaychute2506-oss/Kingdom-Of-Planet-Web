import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Heart, Award } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import styles from './AboutPreview.module.scss';

const AboutPreview = () => {
  const handleLearnMore = () => {
    window.location.hash = '#about';
  };

  const benefits = [
    "Experiential & Play-Way Learning",
    "Certified Loving Caregivers",
    "Padded Safety Campus (CCTV enabled)",
    "Creative & Social Etiquette Focus"
  ];

  return (
    <section className="section section-accent">
      <div className={`container ${styles.gridContainer}`}>
        
        {/* Left Side Visual Frame */}
        <div className={styles.visualCol}>
          <motion.div 
            className={styles.polaroidFrame}
            initial={{ opacity: 0, rotate: -5, scale: 0.95 }}
            whileInView={{ opacity: 1, rotate: -3, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            style={{ borderColor: '#D4AF37' }}
          >
            <div className={styles.polaroidImageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?auto=format&fit=crop&q=80&w=600" 
                alt="Teacher-student activity interaction" 
                loading="lazy" 
              />
            </div>
            <div className={styles.polaroidCaption}>
              <h4 style={{ color: '#6B1D2F' }}>Where Learning Comes Alive</h4>
              <p>Experiential Play Time, 2026</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Rebranded Content */}
        <div className={styles.textCol}>
          <SectionTitle 
            tag="Welcome to Our Kingdom"
            title="A Dedicated Environment for Early Childhood Growth"
            highlightWord="Dedicated"
            align="left"
          />

          <p className={styles.description}>
            <strong>Kingdom of Learning Pre School</strong> is a modern early childhood learning center dedicated to providing a safe, joyful, and engaging environment for young learners. Through activity-based and play-way learning methods, we focus on the overall development of every child — nurturing creativity, confidence, communication, social skills, emotional growth, and cognitive abilities.
          </p>

          {/* Quick Mission & Vision summary blocks */}
          <div className={styles.coreBlocks} style={{ display: 'flex', gap: '16px', margin: '20px 0', width: '100%' }}>
            <div style={{ flex: 1, padding: '14px', backgroundColor: '#FAF6EE', borderRadius: '12px', borderLeft: '4px solid #6B1D2F' }}>
              <h5 style={{ fontFamily: 'Baloo 2', fontSize: '1.1rem', color: '#6B1D2F', marginBottom: '4px' }}>Our Mission</h5>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.4', color: '#6A6A6A' }}>
                To provide a safe, nurturing, and joyful learning environment where every child is encouraged to explore, learn, and grow.
              </p>
            </div>
            <div style={{ flex: 1, padding: '14px', backgroundColor: '#FAF6EE', borderRadius: '12px', borderLeft: '4px solid #D4AF37' }}>
              <h5 style={{ fontFamily: 'Baloo 2', fontSize: '1.1rem', color: '#D4AF37', marginBottom: '4px' }}>Our Vision</h5>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.4', color: '#6A6A6A' }}>
                To provide high-quality early education that inspires young minds to discover the world and develop lifelong values.
              </p>
            </div>
          </div>

          <ul className={styles.benefitsList}>
            {benefits.map((benefit, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <CheckCircle2 className={styles.checkIcon} size={22} style={{ color: '#D4AF37' }} />
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>

          <motion.button 
            className={styles.learnBtn}
            onClick={handleLearnMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ background: 'linear-gradient(135deg, #6B1D2F 0%, #4a121e 100%)' }}
          >
            <span>Read More About Us</span>
            <Sparkles size={16} />
          </motion.button>
        </div>

      </div>
    </section>
  );
};

export default AboutPreview;
