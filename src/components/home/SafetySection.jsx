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

const getSafetyImage = (title) => {
  const cleanTitle = String(title).toLowerCase();
  if (cleanTitle.includes('cctv') || cleanTitle.includes('monitoring')) {
    return 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=400';
  } else if (cleanTitle.includes('eco') || cleanTitle.includes('campus') || cleanTitle.includes('friendly')) {
    return 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=400';
  } else if (cleanTitle.includes('certified') || cleanTitle.includes('pedagogy') || cleanTitle.includes('staff')) {
    return 'https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&q=80&w=400';
  } else if (cleanTitle.includes('hygiene') || cleanTitle.includes('hygienic') || cleanTitle.includes('standard')) {
    return 'https://images.unsplash.com/photo-1608220179579-3994e0780289?auto=format&fit=crop&q=80&w=400';
  }
  return 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=400';
};

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
                {/* Subtle blurred/faded background visual storytelling */}
                <div 
                  className={styles.cardBgImage}
                  style={{ backgroundImage: `url(${getSafetyImage(card.title)})` }}
                />
                <div className={styles.cardBgOverlay} />

                <div className={styles.cardContentWrapper}>
                  <div className={styles.iconBox}>
                    <IconComponent size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDesc}>{card.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SafetySection;
