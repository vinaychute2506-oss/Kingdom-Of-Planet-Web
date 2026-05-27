import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, HeartHandshake, Home } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import styles from './SafetySection.module.scss';

const safetyCards = [
  {
    icon: Eye,
    title: "CCTV Monitoring",
    description: "100% round-the-clock video surveillance covering playground boundaries, classrooms, and cafeteria access pathways."
  },
  {
    icon: Home,
    title: "Eco-Friendly Safe Campus",
    description: "Highly secure double-gated architecture with padded walls, rounded corner desks, and toddler-proof play enclosures."
  },
  {
    icon: HeartHandshake,
    title: "Certified Pedagogy & Staff",
    description: "Educators and support caretakers undergo extensive child defense, early first-aid, and emotional development checks."
  },
  {
    icon: ShieldCheck,
    title: "Pure Hygienic Standard",
    description: "Filtered drinking water dispensers, chemical-free sanitization, and daily strict classroom cleanup routines."
  }
];

const SafetySection = () => {
  return (
    <section className="section section-accent" id="home-safety" style={{ backgroundColor: '#FAF6EE', margin: '0 24px', borderRadius: '32px' }}>
      <div className="container">
        
        <SectionTitle 
          tag="Safety First"
          title="Nurturing Your Child in a Safe & Trusted Nest"
          highlightWord="Trusted"
          align="center"
          subtitle="We prioritize physical security and hygiene above all, giving parents complete mental comfort while their kids explore."
        />

        <div className={styles.safetyGrid}>
          {safetyCards.map((card, idx) => {
            const IconComponent = card.icon;
            
            return (
              <motion.div 
                className={styles.safetyCard}
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <div className={styles.iconBox}>
                  <IconComponent size={22} strokeWidth={1.5} />
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SafetySection;
