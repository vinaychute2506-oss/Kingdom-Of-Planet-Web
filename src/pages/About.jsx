import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, BookOpen, Music, Users, Compass } from 'lucide-react';
import { teachersData } from '../data/teachers';
import SectionTitle from '../components/common/SectionTitle';
import MethodologySection from '../components/common/MethodologySection';
import styles from './About.module.scss';

const facilitiesList = [
  {
    icon: Sparkles,
    title: "Sensory Playground",
    desc: "Rubber-padded turf with swings, sensory bins, sandpits, and child-safe climbing structures.",
    color: "#D4AF37"
  },
  {
    icon: BookOpen,
    title: "Story Library Nest",
    desc: "A warm, circular reading lounge loaded with interactive picture books and storytelling puppets.",
    color: "#6B1D2F"
  },
  {
    icon: Music,
    title: "Creative Art Studio",
    desc: "Dedicated workshop with child-safe watercolor tables, clay blocks, and keyboards.",
    color: "#E67E22"
  },
  {
    icon: Shield,
    title: "CCTV Enabled Transit",
    desc: "Air-conditioned school vans with live GPS systems, caring matrons, and seat belts.",
    color: "#2980B9"
  }
];

const About = () => {
  return (
    <div className={styles.aboutPage}>
      
      {/* Page Header */}
      <section className={styles.pageHeader} style={{ background: 'linear-gradient(135deg, #6B1D2F 0%, #D4AF37 100%)' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Our School
          </motion.h1>
          <p>A Kingdom Where Learning Comes Alive - Explore our vision, values, principal message, and certified staff.</p>
        </div>
      </section>

      {/* 1. Principal Message */}
      <section className="section">
        <div className="container">
          <div className={styles.principalCard} style={{ borderColor: '#D4AF37' }}>
            <div className={styles.principalAvatarCol}>
              <div className={styles.principalFrame} style={{ borderColor: '#6B1D2F', backgroundColor: '#FFFDD0' }}>
                <img src="https://api.dicebear.com/7.x/micah/svg?seed=Komal" alt="Mrs. Komal Singh" />
              </div>
              <h3 className={styles.principalName}>Mrs. Komal Singh</h3>
              <p className={styles.principalRole} style={{ color: '#6B1D2F' }}>Founder & Principal</p>
            </div>
            
            <div className={styles.messageCol}>
              <span className={styles.quoteMark} style={{ color: 'rgba(107, 29, 47, 0.1)' }}>“</span>
              <h3 className={styles.messageTitle} style={{ color: '#6B1D2F' }}>A Warm Welcome to Our Learning Kingdom</h3>
              <p className={styles.messageText}>
                At <strong>Kingdom of Learning Pre School</strong>, we believe every child is a unique explorer. Our modern early childhood learning center is dedicated to providing a safe, joyful, and engaging environment for young learners.
              </p>
              <p className={styles.messageText}>
                Through activity-based and play-way learning methods, we focus on the overall development of every child — nurturing creativity, confidence, communication, social skills, emotional growth, and cognitive abilities. 
              </p>
              <p className={styles.messageText}>
                We maintain an exceptionally low student-to-teacher ratio to confirm every child receives focused diagnostic guidance. I invite you to visit our secure campus in Shahpur Jat, New Delhi and experience how we make learning come alive!
              </p>
              <div className={styles.signature}>
                <p className={styles.sigName}>Mrs. Komal Singh</p>
                <p className={styles.sigTitle}>Founder & Principal, Kingdom of Learning Pre School</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Vision & Mission Cards */}
      <section className="section section-accent">
        <div className="container">
          <div className={styles.visionGrid}>
            <motion.div 
              className={`${styles.visionCard} ${styles.cardPurple}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ borderLeftColor: '#6B1D2F' }}
            >
              <span className={styles.cardIcon}>🪐</span>
              <h3 style={{ color: '#6B1D2F' }}>Our Vision</h3>
              <p>
                To provide high-quality early childhood education that inspires young minds to discover the world, develop lifelong values, and build a strong foundation for the future.
              </p>
            </motion.div>

            <motion.div 
              className={`${styles.visionCard} ${styles.cardGreen}`}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ borderLeftColor: '#D4AF37' }}
            >
              <span className={styles.cardIcon}>🚀</span>
              <h3 style={{ color: '#D4AF37' }}>Our Mission</h3>
              <p>
                To provide a safe, nurturing, and joyful learning environment where every child is encouraged to explore, learn, create, and grow with confidence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Reusable Methodology Section */}
      <MethodologySection />

      {/* 4. Facilities Grid */}
      <section className="section">
        <div className="container">
          <SectionTitle 
            tag="Our Facilities"
            title="Premium Secure Preschool Environment"
            highlightWord="Environment"
            align="center"
            subtitle="Explore our secure campus classrooms and yards structured with soft, padded child-proof materials for healthy visual and physical explorations."
          />

          <div className={styles.facilitiesGrid}>
            {facilitiesList.map((facility, idx) => {
              const IconComp = facility.icon;
              return (
                <motion.div 
                  className={styles.facilityCard}
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  style={{ '--accent-color': facility.color }}
                >
                  <div className={styles.facIconBox}>
                    <IconComp size={24} />
                  </div>
                  <h3>{facility.title}</h3>
                  <p>{facility.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Teachers polaroids grid */}
      <section className="section section-accent">
        <div className="container">
          <SectionTitle 
            tag="Our Caregivers"
            title="Meet Our Certified, Loving Staff"
            highlightWord="Staff"
            align="center"
            subtitle="Our educators combine high academic credentials in early development with deep empathy, patience, and warmth."
          />

          <div className={styles.teachersGrid}>
            {teachersData.map((teacher, index) => {
              return (
                <motion.div 
                  className={styles.teacherPolaroid}
                  key={teacher.id}
                  initial={{ opacity: 0, rotate: index % 2 === 0 ? -3 : 3 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.03, rotate: 0, boxShadow: "0 20px 40px rgba(107,29,47,0.1)" }}
                >
                  <div className={styles.teacherImgBox} style={{ background: 'linear-gradient(135deg, #FFFDD0 0%, #FAF6EE 100%)' }}>
                    <img src={teacher.avatar} alt={teacher.name} />
                  </div>
                  <div className={styles.teacherDetails}>
                    <h3 className={styles.tName}>{teacher.name}</h3>
                    <p className={styles.tRole} style={{ color: '#6B1D2F' }}>{teacher.role}</p>
                    <p className={styles.tExp} style={{ color: '#D4AF37' }}>{teacher.experience}</p>
                    <p className={styles.tBio}>{teacher.bio}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
