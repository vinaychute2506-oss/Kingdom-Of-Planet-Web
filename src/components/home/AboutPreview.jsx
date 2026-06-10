import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, BookOpen, Award, Sprout, ArrowRight } from 'lucide-react';
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

  const features = [
    {
      icon: <Shield size={22} strokeWidth={1.5} />,
      title: "Safe Environment",
      desc: "Our absolute priority is your child's security and protection."
    },
    {
      icon: <BookOpen size={22} strokeWidth={1.5} />,
      title: "Play & Learn",
      desc: "Nurturing active curiosity via interactive, child-led discovery."
    },
    {
      icon: <Award size={22} strokeWidth={1.5} />,
      title: "Qualified Guides",
      desc: "Dedicated and certified loving educators fostering warm growth."
    },
    {
      icon: <Sprout size={22} strokeWidth={1.5} />,
      title: "Holistic Growth",
      desc: "Cultivating cognitive, social, creative, and physical attributes."
    }
  ];

  return (
    <section className="section section-accent" style={{ backgroundColor: '#FFFFFF', margin: '0 24px', borderRadius: '32px', position: 'relative' }}>
      {/* Subtle background texture watermark */}
      <div 
        className="section-bg-watermark" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&q=80&w=1600')`,
          opacity: 0.40,
          borderRadius: '32px'
        }} 
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* 1. 4-Column Horizontal Features Section (Direct reference replication) */}
        <div className={styles.featuresStrip}>
          {features.map((feat, index) => (
            <div key={index} className={styles.featureItem}>
              <div className={styles.featureIconWrapper}>
                {feat.icon}
              </div>
              <h4 className={styles.featureTitle}>{feat.title}</h4>
              <p className={styles.featureDesc}>{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* 2. Split Columns Section */}
        <div className={styles.gridContainer}>
          
          {/* Left Side Large Arch Visual Frame */}
          <div className={styles.visualCol}>
            <motion.div 
              className={styles.archFrame}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.archImageWrapper}>
                <img 
                  src="https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?auto=format&fit=crop&q=80&w=600" 
                  alt="Teacher-student activity interaction" 
                  loading="lazy" 
                />
              </div>
              <div className={styles.archCaption}>
                <h4>Where Learning Comes Alive</h4>
                <p>Experiential Play, 2026</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side Rebranded Content */}
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

            {/* Quiet-Luxury Mission & Vision blocks */}
            <div className={styles.coreBlocks}>
              <div className={styles.missionBox}>
                <h5>Our Mission</h5>
                <p>
                  To provide a safe, nurturing, and joyful learning environment where every child is encouraged to explore, learn, and grow.
                </p>
              </div>
              <div className={styles.visionBox}>
                <h5>Our Vision</h5>
                <p>
                  To provide high-quality early education that inspires young minds to discover the world and develop lifelong values.
                </p>
              </div>
            </div>

            <ul className={styles.benefitsList}>
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <CheckCircle2 className={styles.checkIcon} size={18} />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button 
              className={styles.learnBtn}
              onClick={handleLearnMore}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Explore Our Methodology</span>
              <ArrowRight size={16} />
            </motion.button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutPreview;
