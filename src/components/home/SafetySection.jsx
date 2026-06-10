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
    <section className="section section-accent" id="home-safety" style={{ backgroundColor: '#FAF6EE', margin: '0 24px', borderRadius: '32px', position: 'relative' }}>
      {/* Subtle background texture watermark */}
      <div 
        className="section-bg-watermark" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800')`,
          opacity: 0.025,
          borderRadius: '32px'
        }} 
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        <SectionTitle 
          tag="Safety First"
          title="Nurturing Your Child in a Safe & Trusted Nest"
          highlightWord="Trusted"
          align="center"
          subtitle="We prioritize physical security and hygiene above all, giving parents complete mental comfort while their kids explore."
        />

        <div className={styles.safetySplitGrid}>
          {/* Left Column: Tall Editorial Arch Image */}
          <motion.div 
            className={styles.imageCol}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={styles.safetyArch}>
              <img 
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=600" 
                alt="Preschool supervised safe environment" 
                loading="lazy" 
              />
              <div className={styles.archOverlay}>
                <span className={styles.archBadge}>Zero Compromise Safety</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Flat list of standards with divider lines */}
          <motion.div 
            className={styles.listCol}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            {safetyCards.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <div className={styles.safetyListItem} key={idx}>
                  <div className={styles.itemHeader}>
                    <div className={styles.iconBox}>
                      <IconComponent size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className={styles.itemTitle}>{card.title}</h3>
                  </div>
                  <p className={styles.itemDesc}>{card.description}</p>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default SafetySection;
