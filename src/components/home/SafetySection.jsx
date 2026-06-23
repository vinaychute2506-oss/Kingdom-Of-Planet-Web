import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Leaf, Award, Heart, Users } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import styles from './SafetySection.module.scss';

const safetyCards = [
  {
    id: "cctv",
    icon: Camera,
    title: "CCTV Monitoring",
    description: "24x7 round-the-clock surveillance across classrooms & play areas.",
    bottomIcon: Heart,
    themeClass: "theme-cctv"
  },
  {
    id: "eco",
    icon: Leaf,
    title: "Eco-Friendly Safe Campus",
    description: "Child-safe infrastructure with clean, green, and sustainable practices.",
    bottomIcon: Leaf,
    themeClass: "theme-eco"
  },
  {
    id: "certified",
    icon: Award,
    title: "Certified Pedagogy & Staff",
    description: "Trained educators and age-appropriate pedagogy for holistic development.",
    bottomIcon: Users,
    themeClass: "theme-certified"
  }
];

const SafetySection = () => {
  return (
    <section className="section" id="home-safety" style={{ backgroundColor: '#FAF6EE', position: 'relative' }}>
      {/* Subtle background texture watermark */}
      <div 
        className="section-bg-watermark" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1472162072142-d544e77ade5e?auto=format&fit=crop&q=80&w=1600')`,
          opacity: 0.22
        }} 
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        <div className={styles.safetySplitGrid}>
          {/* Left Column: Heading, Subtitle, and 3 Cards */}
          <div className={styles.contentCol}>
            <SectionTitle 
              tag="Safety First"
              title="Nurturing Your Child in a Safe & Trusted Nest"
              highlightWord="Trusted"
              align="left"
              subtitle="We prioritize physical security and hygiene above all, giving parents complete peace of mind while their kids explore."
              hasHeartDivider={true}
            />

            <div className={styles.cardsRow}>
              {safetyCards.map((card, idx) => {
                const IconComponent = card.icon;
                const BottomIconComponent = card.bottomIcon;
                return (
                  <motion.div 
                    className={`${styles.safetyCard} ${styles[card.themeClass]}`}
                    key={card.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  >
                    <div className={styles.iconBox}>
                      <IconComponent size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardDesc}>{card.description}</p>
                    <div className={styles.cardFooterBar}>
                      <BottomIconComponent size={14} strokeWidth={1.5} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Rounded image card */}
          <motion.div 
            className={styles.imageCol}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <div className={styles.safetyImageCard}>
              <img 
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=600" 
                alt="Teacher helping children build blocks in classroom" 
                loading="lazy" 
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default SafetySection;
