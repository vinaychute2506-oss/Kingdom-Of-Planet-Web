import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, BookOpen, Music, Users, Compass } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { FALLBACK_IMAGES } from '../config/cms';
import SectionTitle from '../components/common/SectionTitle';
import MethodologySection from '../components/common/MethodologySection';
import SectionDivider from '../components/common/SectionDivider';
import styles from './About.module.scss';

const facilitiesList = [
  {
    icon: Sparkles,
    title: "Sensory Playground",
    desc: "Rubber-padded turf with swings, sensory bins, sandpits, and child-safe climbing structures."
  },
  {
    icon: BookOpen,
    title: "Story Library Nest",
    desc: "A warm, circular reading lounge loaded with interactive picture books and storytelling puppets."
  },
  {
    icon: Music,
    title: "Creative Art Studio",
    desc: "Dedicated workshop with child-safe watercolor tables, clay blocks, and keyboards."
  },
  {
    icon: Shield,
    title: "CCTV Enabled Transit",
    desc: "Air-conditioned school vans with live GPS systems, caring matrons, and seat belts."
  }
];

const About = () => {
  const { schoolInfo, teachers } = useCMS();

  return (
    <div className={styles.aboutPage}>
      
      {/* Page Header */}
      <section className={styles.pageHeader}>
        {/* Subtle background texture watermark */}
        <div 
          className="section-bg-watermark" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&q=80&w=1600')`,
            opacity: 0.26
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Our School
          </motion.h1>
          <p>A Kingdom Where Learning Comes Alive - Explore our vision, values, principal message, and certified staff.</p>
        </div>
      </section>

      <SectionDivider type="line" bgColor="#FFFFFF" />

      {/* 1. Principal Message */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', position: 'relative' }}>
        {/* Subtle background texture watermark */}
        <div 
          className="section-bg-watermark" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600')`,
            opacity: 0.26
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.principalCard}>
            <div className={styles.principalAvatarCol}>
              <div className={styles.principalFrame}>
                <img 
                  src={FALLBACK_IMAGES.teacher} 
                  alt={schoolInfo.principalName} 
                  onError={(e) => { e.target.src = FALLBACK_IMAGES.teacher; }}
                  loading="lazy" 
                />
              </div>
              <h3 className={styles.principalName}>{schoolInfo.principalName}</h3>
              <p className={styles.principalRole}>Founder & Principal</p>
            </div>
            
            <div className={styles.messageCol}>
              <span className={styles.quoteMark}>“</span>
              <h3 className={styles.messageTitle}>A Warm Welcome to Our Learning Kingdom</h3>
              <p className={styles.messageText}>
                At <strong>{schoolInfo.schoolName}</strong>, we believe every child is a unique explorer. Our modern early childhood learning center is dedicated to providing a safe, joyful, and engaging environment for young learners.
              </p>
              <p className={styles.messageText}>
                {schoolInfo.principalBio}
              </p>
              <p className={styles.messageText}>
                We maintain an exceptionally low student-to-teacher ratio to confirm every child receives focused diagnostic guidance. I invite you to visit our secure campus in Shahpur Jat, New Delhi and experience how we make learning come alive!
              </p>
              <div className={styles.signature}>
                <p className={styles.sigName}>{schoolInfo.principalName}</p>
                <p className={styles.sigTitle}>Founder & Principal, {schoolInfo.schoolName}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider type="line" bgColor="#FFFFFF" />

      {/* 2. Vision & Mission Cards */}
      <section className="section section-accent" style={{ backgroundColor: '#FAF6EE', margin: '0 24px', borderRadius: '32px', position: 'relative' }}>
        {/* Subtle background texture watermark */}
        <div 
          className="section-bg-watermark" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1600')`,
            opacity: 0.26,
            borderRadius: '32px'
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.visionGrid}>
            <motion.div 
              className={`${styles.visionCard} ${styles.cardPurple}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3>Our Vision</h3>
              <p>
                To provide high-quality early childhood education that inspires young minds to discover the world, develop lifelong values, and build a strong foundation for the future.
              </p>
            </motion.div>
 
            <motion.div 
              className={`${styles.visionCard} ${styles.cardGreen}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              <h3>Our Mission</h3>
              <p>
                To provide a safe, nurturing, and joyful learning environment where every child is encouraged to explore, learn, create, and grow with confidence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
 
      <SectionDivider type="wave" bgColor="#FFFFFF" fillColor="#541221" height="48px" />
 
      {/* 3. Central Dark Wine Stats Banner (moodboard central bar) */}
      <section className={styles.statsBanner} style={{ position: 'relative' }}>
        {/* Subtle background texture watermark */}
        <div 
          className="section-bg-watermark" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1600')`,
            opacity: 0.12
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <h3 className={styles.statVal}>15+</h3>
              <p className={styles.statLbl}>Years Excellence</p>
            </div>
            <div className={styles.statItem}>
              <h3 className={styles.statVal}>25+</h3>
              <p className={styles.statLbl}>Certified Staff</p>
            </div>
            <div className={styles.statItem}>
              <h3 className={styles.statVal}>300+</h3>
              <p className={styles.statLbl}>Happy Students</p>
            </div>
            <div className={styles.statItem}>
              <h3 className={styles.statVal}>10:1</h3>
              <p className={styles.statLbl}>Teacher Ratio</p>
            </div>
          </div>
        </div>
      </section>
 
      <SectionDivider type="organic" bgColor="#541221" fillColor="#FAF6EE" height="48px" />
 
      {/* 4. Reusable Methodology Section */}
      <MethodologySection />
 
      <SectionDivider type="wave" bgColor="#FAF6EE" fillColor="#FFFFFF" height="48px" />

      {/* 5. Facilities Grid */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', position: 'relative' }}>
        {/* Subtle background texture watermark */}
        <div 
          className="section-bg-watermark" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=1600')`,
            opacity: 0.26
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
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
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <div className={styles.facIconBox}>
                    <IconComp size={22} strokeWidth={1.5} />
                  </div>
                  <h3>{facility.title}</h3>
                  <p>{facility.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider type="line" bgColor="#FFFFFF" />

      {/* 6. Teachers list */}
      <section className="section section-accent" style={{ backgroundColor: '#FAF6EE', margin: '0 24px', borderRadius: '32px', position: 'relative' }}>
        {/* Subtle background texture watermark */}
        <div 
          className="section-bg-watermark" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1600')`,
            opacity: 0.26,
            borderRadius: '32px'
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <SectionTitle 
            tag="Our Caregivers"
            title="Meet Our Certified, Loving Staff"
            highlightWord="Staff"
            align="center"
            subtitle="Our educators combine high academic credentials in early development with deep empathy, patience, and warmth."
          />

          <div className={styles.teachersGrid}>
            {teachers.map((teacher, index) => {
              return (
                <motion.div 
                  className={styles.teacherPolaroid}
                  key={teacher.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className={styles.teacherImgBox}>
                    <img 
                      src={teacher.avatar} 
                      alt={teacher.name} 
                      onError={(e) => { e.target.src = FALLBACK_IMAGES.teacher; }}
                      loading="lazy" 
                    />
                  </div>
                  <div className={styles.teacherDetails}>
                    <h3 className={styles.tName}>{teacher.name}</h3>
                    <p className={styles.tRole}>{teacher.role}</p>
                    <p className={styles.tExp}>{teacher.experience}</p>
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

