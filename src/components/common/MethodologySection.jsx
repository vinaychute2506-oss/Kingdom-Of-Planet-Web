import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Music, Users, Compass, Fingerprint, Lightbulb } from 'lucide-react';
import SectionTitle from './SectionTitle';
import styles from './MethodologySection.module.scss';

const methodologyRows = [
  {
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=500",
    imageAlt: "Play-Way and Activity-Based Learning",
    items: [
      {
        icon: Sparkles,
        title: "Play-Way Learning",
        desc: "Nurturing early curiosity through structured child-directed toy play and interactive puzzles."
      },
      {
        icon: Fingerprint,
        title: "Activity-Based Education",
        desc: "Hands-on alphabet blocks, clay crafts, and counting setups to engage spatial thinking."
      }
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=500",
    imageAlt: "Experiential Learning & Storytelling",
    items: [
      {
        icon: Lightbulb,
        title: "Experiential Learning",
        desc: "Fostering physical troubleshooting skills through seed growth and liquid science."
      },
      {
        icon: BookOpen,
        title: "Storytelling & Rhymes",
        desc: "Accelerating phonics retention and verbal vocabulary using classic picture books."
      }
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=500",
    imageAlt: "Music, Movement and Social Dev",
    items: [
      {
        icon: Music,
        title: "Music & Movement",
        desc: "Unlocking physical coordination, rhythm alignment, and self-confidence through song."
      },
      {
        icon: Users,
        title: "Collaborative Learning",
        desc: "Teaching sharing values, polite conversational manners, and peer team behaviors."
      }
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=500",
    imageAlt: "Hands-on Nature Exploration",
    items: [
      {
        icon: Compass,
        title: "Hands-on Exploration",
        desc: "Outdoor walks, sandbox building, and nature tours that spark spatial curiosity."
      }
    ]
  }
];

const MethodologySection = () => {
  return (
    <section className="section" id="teaching-methodology" style={{ backgroundColor: '#FAF6EE', position: 'relative' }}>
      {/* Subtle background texture watermark */}
      <div 
        className="section-bg-watermark" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000')`,
          opacity: 0.12
        }} 
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        <SectionTitle 
          tag="Teaching Philosophy"
          title="Our Premium Teaching Methodology"
          highlightWord="Methodology"
          align="center"
          subtitle="At Kingdom of Learning, we move past static rote lectures. We apply a soft, luxury childhood framework designed to make learning come alive."
        />

        <div className={styles.methodologyShowcase}>
          {methodologyRows.map((row, rowIndex) => {
            const isEven = rowIndex % 2 === 0;
            return (
              <div 
                className={`${styles.showcaseRow} ${isEven ? '' : styles.reverseRow}`} 
                key={rowIndex}
              >
                {/* Image Arch Column */}
                <motion.div 
                  className={styles.imageCol}
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className={styles.methodArch}>
                    <img src={row.image} alt={row.imageAlt} loading="lazy" />
                  </div>
                </motion.div>

                {/* Content Block Column */}
                <motion.div 
                  className={styles.contentCol}
                  initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                >
                  {row.items.map((item, itemIdx) => {
                    const IconComponent = item.icon;
                    return (
                      <div className={styles.methodBlock} key={itemIdx}>
                        <div className={styles.iconCircle}>
                          <IconComponent size={22} strokeWidth={1.5} />
                        </div>
                        <div className={styles.blockText}>
                          <h3 className={styles.blockTitle}>{item.title}</h3>
                          <p className={styles.blockDesc}>{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MethodologySection;
