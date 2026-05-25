import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, HeartHandshake, Home } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import styles from './SafetySection.module.scss';

const safetyCards = [
  {
    icon: Eye,
    title: "CCTV Monitoring",
    description: "100% round-the-clock video surveillance covering playground boundaries, classrooms, and cafeteria access pathways.",
    color: "#29B6F6", // Blue
  },
  {
    icon: Home,
    title: "Eco-Friendly Safe Campus",
    description: "Highly secure double-gated architecture with padded walls, rounded corner desks, and toddler-proof play enclosures.",
    color: "#4CAF50", // Green
  },
  {
    icon: HeartHandshake,
    title: "Certified Pedagogy & Staff",
    description: "Educators and support caretakers undergo extensive child defense, early first-aid, and emotional development checks.",
    color: "#8A4FFF", // Purple
  },
  {
    icon: ShieldCheck,
    title: "Pure Hygienic Standard",
    description: "Filtered drinking water dispensers, chemical-free sanitization, and daily strict classroom cleanup routines.",
    color: "#FF7043", // Orange
  }
];

const SafetySection = () => {
  return (
    <section className="section section-accent" id="home-safety">
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
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, boxShadow: "0 15px 35px rgba(76, 175, 80, 0.08)" }}
                style={{ '--accent-color': card.color }}
              >
                <div className={styles.iconBox}>
                  <IconComponent size={28} />
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
