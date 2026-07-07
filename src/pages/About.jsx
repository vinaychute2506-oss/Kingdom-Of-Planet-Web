import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, BookOpen, Palette, Lightbulb, Search, Award, Users, GraduationCap, Scale, Heart } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { FALLBACK_IMAGES } from '../config/cms';
import SectionDivider from '../components/common/SectionDivider';
import styles from './About.module.scss';

const About = () => {
  const { schoolInfo, teachers } = useCMS();

  const benefitsList = [
    {
      icon: Sparkles,
      title: "Child-Centered Learning",
      desc: "We nurture curiosity, creativity, and confidence through play, exploration, and joyful discovery.",
      colorClass: styles.benefitRose
    },
    {
      icon: Shield,
      title: "Safe & Nurturing Campus",
      desc: "From secure premises to hygiene standards, we ensure a safe, caring, and loving environment every day.",
      colorClass: styles.benefitGreen
    },
    {
      icon: Users,
      title: "Experienced Educators",
      desc: "Our qualified and passionate teachers bring warmth, patience, and expertise to every learning moment.",
      colorClass: styles.benefitOrange
    }
  ];

  const methodologyItems = [
    {
      icon: BookOpen,
      title: "Play-Way Learning",
      desc: "Learning through play makes concepts easier to grasp and learning truly enjoyable."
    },
    {
      icon: Palette,
      title: "Activity-Based Education",
      desc: "Hands-on activities spark curiosity and help children understand through experience."
    },
    {
      icon: Lightbulb,
      title: "Experiential Learning",
      desc: "Real-life experiences build understanding, confidence, and lifelong skills."
    },
    {
      icon: Search,
      title: "Hands-On Exploration",
      desc: "Children explore, discover, and create—building curiosity and a love for learning."
    }
  ];

  return (
    <div className={styles.aboutPage}>
      
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div 
          className="section-bg-watermark" 
          style={{ 
            backgroundImage: `url('/classroom-bg.png')`,
            opacity: 0.12
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.headerDecor}>
            <span className={styles.decorStar}>✦</span>
            <span className={styles.decorCrown}>👑</span>
            <span className={styles.decorStar}>✦</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Our School
          </motion.h1>
          <div className={styles.heartLine}>
            <Heart size={14} className={styles.heartIcon} />
          </div>
          <p>A Kingdom Where Learning Comes Alive – Explore our vision, values, and our promise to nurture joyful, confident learners.</p>
        </div>
      </section>

      {/* 1. Welcome Section & Benefit Cards */}
      <section className="section" style={{ backgroundColor: '#FAF6EE', paddingTop: '56px', paddingBottom: '56px' }}>
        <div className="container">
          
          {/* Welcome Box */}
          <div className={styles.welcomeBox}>
            <div className={styles.principalAvatarCol}>
              <div className={styles.principalFrame}>
                <img 
                  src="/teacher-komal.png" 
                  alt={schoolInfo.principalName} 
                  onError={(e) => { e.target.src = FALLBACK_IMAGES.teacher; }}
                  loading="lazy" 
                />
              </div>
              <h3 className={styles.principalName}>{schoolInfo.principalName}</h3>
              <p className={styles.principalRole}>FOUNDER | DIRECTOR | HEAD OF LEARNING</p>
            </div>
            
            <div className={styles.messageCol}>
              <span className={styles.quoteMark}>“</span>
              <h3 className={styles.messageTitle}>A Warm Welcome to Our Learning Kingdom</h3>
              <p className={styles.messageText}>
                At <strong>{schoolInfo.schoolName}</strong>, we believe every child is a unique explorer. Our modern early childhood learning center is dedicated to providing a safe, joyful, and engaging environment for young learners.
              </p>
              <p className={styles.messageText}>
                Passionate about early childhood learning, Mrs. Komal guides our curriculum pathways, blending experiential and play-way educational templates with warm care.
              </p>
              <p className={styles.messageText}>
                We maintain an exceptionally low student-to-teacher ratio to confirm every child receives focused diagnostic guidance. I invite you to visit our secure campus in Shahpur Jat, New Delhi and experience how we make learning come alive!
              </p>
              <div className={styles.signature}>
                <p className={styles.sigCursive}>Komal Singh</p>
                <p className={styles.sigName}>{schoolInfo.principalName}</p>
                <p className={styles.sigTitle}>Founder | Director | Head of Learning, {schoolInfo.schoolName}</p>
              </div>
            </div>
          </div>

          {/* Three Benefit Cards */}
          <div className={styles.benefitsRow}>
            {benefitsList.map((benefit, idx) => {
              const IconComp = benefit.icon;
              return (
                <motion.div 
                  className={`${styles.benefitCard} ${benefit.colorClass}`}
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className={styles.benefitIconBox}>
                    <IconComp size={24} strokeWidth={1.8} />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. Teaching Methodology Section */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', paddingTop: '64px', paddingBottom: '64px', position: 'relative' }}>
        <div 
          className="section-bg-watermark" 
          style={{ 
            backgroundImage: `url('/classroom-bg.png')`,
            opacity: 0.12
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          <div className={styles.methodologyHeader}>
            <div className={styles.headerDecor}>
              <span className={styles.decorStar}>✦</span>
              <span className={styles.decorCrown}>👑</span>
              <span className={styles.decorStar}>✦</span>
            </div>
            <h2>Our Premium Teaching <br /><span className={styles.italicHighlight}>Methodology</span></h2>
            <div className={styles.heartLine}>
              <Heart size={14} className={styles.heartIcon} />
            </div>
            <p className={styles.methodologySubtitle}>
              At Kingdom of Learning, we combine play, exploration, and creativity to make learning joyful, meaningful, and future-ready.
            </p>
          </div>

          <div className={styles.methodologyShowcase}>
            
            {/* Left Arch Column */}
            <motion.div 
              className={styles.methodArchCol}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.methodArch}>
                <img 
                  src="/play-way-method.png" 
                  alt="Play-Way learning blocks" 
                  loading="lazy"
                />
              </div>
              <div className={styles.archHeartDecor}>
                <Heart size={12} fill="#E05A6D" stroke="none" />
              </div>
            </motion.div>

            {/* Center Grid Column */}
            <div className={styles.methodGridCol}>
              {methodologyItems.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <motion.div 
                    className={styles.methodCard}
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  >
                    <div className={styles.methodIconCircle}>
                      <IconComp size={22} strokeWidth={1.8} />
                    </div>
                    <div className={styles.methodText}>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Arch Column */}
            <motion.div 
              className={styles.methodArchCol}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.methodArch}>
                <img 
                  src="/storytelling-method.png" 
                  alt="Activity classroom learning" 
                  loading="lazy"
                />
              </div>
              <div className={styles.archHeartDecor}>
                <Heart size={12} fill="#E05A6D" stroke="none" />
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 3. Caregivers / Certified Staff List */}
      <section className="section" style={{ backgroundColor: '#FAF6EE', paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="container">
          
          <div className={styles.teachersHeader}>
            <span className={styles.teacherTag}>OUR CAREGIVERS</span>
            <h2>Meet Our Certified, Loving <span className={styles.italicHighlight}>Staff</span></h2>
            <p>Our educators combine high academic credentials with early development expertise, empathy, patience, and warmth.</p>
          </div>

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
                      style={{ objectPosition: teacher.objectPosition || 'center' }}
                      onError={(e) => { e.target.src = FALLBACK_IMAGES.teacher; }}
                      loading="lazy" 
                    />
                  </div>
                  <div className={styles.teacherDetails}>
                    <h3 className={styles.tName}>{teacher.name}</h3>
                    <p className={styles.tRole}>{teacher.role}</p>
                    <span className={styles.tDivider}>•</span>
                    <p className={styles.tBio}>{teacher.bio}</p>
                    <div className={styles.linkedinBox}>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.linkedinBtn} aria-label="LinkedIn profile">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Wine Red Stats Banner */}
      <section className={styles.statsBanner}>
        <div 
          className="section-bg-watermark" 
          style={{ 
            backgroundImage: `url('/classroom-bg.png')`,
            opacity: 0.08
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.statsGrid}>
            
            <div className={styles.statItem}>
              <div className={styles.statIconCircle}>
                <Award size={24} className={styles.statIcon} />
              </div>
              <h3 className={styles.statVal}>12+ Yrs</h3>
              <p className={styles.statLbl}>Leadership Exp</p>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIconCircle}>
                <Users size={24} className={styles.statIcon} />
              </div>
              <h3 className={styles.statVal}>100%</h3>
              <p className={styles.statLbl}>Certified Staff</p>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIconCircle}>
                <GraduationCap size={24} className={styles.statIcon} />
              </div>
              <h3 className={styles.statVal}>1</h3>
              <p className={styles.statLbl}>Secure Campus</p>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIconCircle}>
                <Scale size={24} className={styles.statIcon} />
              </div>
              <h3 className={styles.statVal}>1:8</h3>
              <p className={styles.statLbl}>Teacher Ratio</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
