import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Music, Users, Compass, Fingerprint, Lightbulb } from 'lucide-react';
import SectionTitle from './SectionTitle';
import styles from './MethodologySection.module.scss';

const methodologies = [
  {
    icon: Sparkles,
    title: "Play-Way Learning",
    desc: "Nurturing early curiosity through structured child-directed toy play and interactive puzzles."
  },
  {
    icon: Fingerprint,
    title: "Activity-Based Education",
    desc: "Hands-on alphabet blocks, clay crafts, and counting setups to engage spatial thinking."
  },
  {
    icon: Lightbulb,
    title: "Experiential Learning",
    desc: "Fostering physical troubleshooting skills through seed growth and liquid science."
  },
  {
    icon: BookOpen,
    title: "Storytelling & Rhymes",
    desc: "Accelerating phonics retention and verbal vocabulary using classic picture books."
  },
  {
    icon: Music,
    title: "Music & Movement",
    desc: "Unlocking physical coordination, rhythm alignment, and self-confidence through song."
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    desc: "Teaching sharing values, polite conversational manners, and peer team behaviors."
  },
  {
    icon: Compass,
    title: "Hands-on Exploration",
    desc: "Outdoor walks, sandbox building, and nature tours that spark spatial curiosity."
  }
];

const getMethodologyImage = (title) => {
  const cleanTitle = String(title).toLowerCase();
  if (cleanTitle.includes('play')) {
    return 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=400';
  } else if (cleanTitle.includes('activity')) {
    return 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400';
  } else if (cleanTitle.includes('experiential')) {
    return 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400';
  } else if (cleanTitle.includes('storytelling') || cleanTitle.includes('rhymes')) {
    return 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400';
  } else if (cleanTitle.includes('music') || cleanTitle.includes('movement')) {
    return 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=400';
  } else if (cleanTitle.includes('collaborative')) {
    return 'https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&q=80&w=400';
  } else if (cleanTitle.includes('hands-on') || cleanTitle.includes('exploration')) {
    return 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=400';
  }
  return 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400';
};

const MethodologySection = () => {
  return (
    <section className="section" id="teaching-methodology" style={{ backgroundColor: '#FAF6EE' }}>
      <div className="container">
        
        <SectionTitle 
          tag="Teaching Philosophy"
          title="Our Premium Teaching Methodology"
          highlightWord="Methodology"
          align="center"
          subtitle="At Kingdom of Learning, we move past static rote lectures. We apply a soft, luxury childhood framework designed to make learning come alive."
        />

        {/* Editorial visual methodology collage strip */}
        <div className={styles.imageStrip}>
          <div className={styles.stripItem}>
            <div className={styles.stripArch}>
              <img src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=300" alt="Play Way Learning" />
            </div>
            <span className={styles.stripLabel}>Play Way</span>
          </div>
          <div className={styles.stripItem}>
            <div className={styles.stripArch}>
              <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300" alt="Experiential Science" />
            </div>
            <span className={styles.stripLabel}>Experiential</span>
          </div>
          <div className={styles.stripItem}>
            <div className={styles.stripArch}>
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=300" alt="Storytelling Corner" />
            </div>
            <span className={styles.stripLabel}>Storytelling</span>
          </div>
          <div className={styles.stripItem}>
            <div className={styles.stripArch}>
              <img src="https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&q=80&w=300" alt="Social Interaction" />
            </div>
            <span className={styles.stripLabel}>Social Growth</span>
          </div>
        </div>

        <div className={styles.methodGrid}>
          {methodologies.map((item, index) => {
            const IconComponent = item.icon;
            
            return (
              <motion.div 
                className={styles.methodCard}
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                {/* Subtle blurred/faded background visual storytelling */}
                <div 
                  className={styles.cardBgImage}
                  style={{ backgroundImage: `url(${getMethodologyImage(item.title)})` }}
                />
                <div className={styles.cardBgOverlay} />

                <div className={styles.cardContentWrapper}>
                  <div className={styles.iconCircle}>
                    <IconComponent size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MethodologySection;
