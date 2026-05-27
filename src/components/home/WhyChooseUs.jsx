import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Heart, Star, Sparkles, Trophy } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import styles from './WhyChooseUs.module.scss';

const features = [
  {
    icon: ShieldAlert,
    title: "Safe Environment",
    description: "Rounded corners, padded playscapes, secure double gates, and 100% video coverage on our Shahpur Jat campus."
  },
  {
    icon: Trophy,
    title: "Experienced Educators",
    description: "Our caretakers undergo extensive cognitive administration checks and early aid certifications."
  },
  {
    icon: Sparkles,
    title: "Activity Based Learning",
    description: "Integrating sensory bins, handwriting readiness patterns, digital counting tools, and clay modeling projects."
  },
  {
    icon: Heart,
    title: "Personal Attention",
    description: "Extremely low student-to-teacher batches to confirm every child receives focused diagnostic guidance."
  },
  {
    icon: Star,
    title: "Creative Curriculum",
    description: "A customized early child program loaded with music, rhymes, puppet theaters, and physical coordination games."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="section" id="home-why-choose-us" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        <SectionTitle 
          tag="Why Parents Choose Us"
          title="Designed to Unlock Lifelong Values & Potential"
          highlightWord="Potential"
          align="center"
          subtitle="We focus on the overall development of every child — nurturing creativity, confidence, communication, and emotional growth."
        />

        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            
            return (
              <motion.div 
                className={styles.featureCard}
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <div className={styles.iconCircle}>
                  <IconComponent size={22} strokeWidth={1.5} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
