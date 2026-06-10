import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Heart, Star, Sparkles, Trophy, Award } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import styles from './WhyChooseUs.module.scss';

const rowData = [
  {
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Safe preschool playground sandbox",
    features: [
      {
        icon: ShieldAlert,
        title: "Safe Environment",
        description: "Rounded corners, padded playscapes, secure double gates, and 100% video coverage on our Shahpur Jat campus."
      },
      {
        icon: Trophy,
        title: "Experienced Educators",
        description: "Our caretakers undergo extensive cognitive administration checks and early aid certifications."
      }
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Teacher child studying guidance",
    features: [
      {
        icon: Sparkles,
        title: "Activity Based Learning",
        description: "Integrating sensory bins, handwriting readiness patterns, digital counting tools, and clay modeling projects."
      },
      {
        icon: Heart,
        title: "Personal Attention",
        description: "Extremely low student-to-teacher batches to confirm every child receives focused diagnostic guidance."
      }
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Music and singing class",
    features: [
      {
        icon: Star,
        title: "Creative Curriculum",
        description: "A customized early child program loaded with music, rhymes, puppet theaters, and physical coordination games."
      },
      {
        icon: Award,
        title: "Holistic Development",
        description: "Nurturing emotional confidence, social values, and kinetic physical pathways to ensure standard school readiness."
      }
    ]
  }
];

const WhyChooseUs = () => {
  return (
    <section className="section" id="home-why-choose-us" style={{ backgroundColor: '#FFFFFF', position: 'relative' }}>
      {/* Subtle background texture watermark */}
      <div 
        className="section-bg-watermark" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1600')`,
          opacity: 0.26
        }} 
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        <SectionTitle 
          tag="Why Parents Choose Us"
          title="Designed to Unlock Lifelong Values & Potential"
          highlightWord="Potential"
          align="center"
          subtitle="We focus on the overall development of every child — nurturing creativity, confidence, communication, and emotional growth."
        />

        <div className={styles.showcaseWrapper}>
          {rowData.map((row, rowIndex) => {
            const isEven = rowIndex % 2 === 0;
            
            return (
              <div 
                className={`${styles.showcaseRow} ${isEven ? '' : styles.reverseRow}`} 
                key={rowIndex}
              >
                {/* Visual Image Column */}
                <motion.div 
                  className={styles.imageCol}
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className={styles.imageArch}>
                    <img src={row.image} alt={row.imageAlt} loading="lazy" />
                  </div>
                </motion.div>

                {/* Content Column */}
                <motion.div 
                  className={styles.contentCol}
                  initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                >
                  {row.features.map((feature, featIndex) => {
                    const IconComponent = feature.icon;
                    return (
                      <div className={styles.featureItem} key={featIndex}>
                        <div className={styles.iconCircle}>
                          <IconComponent size={22} strokeWidth={1.5} />
                        </div>
                        <div className={styles.featureText}>
                          <h3 className={styles.featureTitle}>{feature.title}</h3>
                          <p className={styles.featureDesc}>{feature.description}</p>
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

export default WhyChooseUs;
