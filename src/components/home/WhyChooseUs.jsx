import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Heart, Star, Sparkles, Trophy, Award } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import styles from './WhyChooseUs.module.scss';

const rowData = [
  {
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Child milestones and achievements",
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
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Classroom interaction and cooperative play",
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
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Confidence building and creative expression",
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
    <section className="section" id="home-why-choose-us" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
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
