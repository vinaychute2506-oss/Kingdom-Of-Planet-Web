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
                <div className={styles.iconCircle}>
                  <IconComponent size={22} strokeWidth={1.5} />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MethodologySection;
