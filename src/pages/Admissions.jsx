import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, BookOpen, Clock, Calendar, CheckCircle2, FileText, Heart } from 'lucide-react';
import AdmissionsForm from '../components/home/AdmissionsForm';
import SectionDivider from '../components/common/SectionDivider';
import styles from './Admissions.module.scss';

const Admissions = () => {
  const steps = [
    {
      num: "1",
      title: "Enquiry",
      desc: "Parents can contact us by phone, email, website, or visit our campus to learn more about our programs and facilities."
    },
    {
      num: "2",
      title: "School Visit",
      desc: "Families are invited to tour our preschool, explore our learning environment, meet our educators, and experience our child-friendly campus."
    },
    {
      num: "3",
      title: "Interaction",
      desc: "A friendly, informal interaction with the child and parents helps us understand the child's interests, developmental stage, and individual needs. No entrance test is conducted."
    },
    {
      num: "4",
      title: "Registration",
      desc: "Parents complete the admission form and submit the required documents along with the registration fee."
    },
    {
      num: "5",
      title: "Admission Confirmation",
      desc: "Admission is confirmed upon successful document verification and payment of the admission fee. Parents will receive a welcome kit and all necessary school information."
    },
    {
      num: "6",
      title: "Orientation & First Day",
      desc: "Before the academic session begins, parents and children attend an orientation program to become familiar with the school, teachers, routines, and classroom environment, ensuring a smooth and happy start."
    }
  ];

  const documents = [
    "Child's Birth Certificate",
    "Aadhaar Card (Child & Parents, if available)",
    "Passport-size photographs (Child & Parents)",
    "Address Proof",
    "Previous School Records (if applicable)",
    "Medical/Immunization Record (if available)"
  ];

  return (
    <div className={styles.admissionsPage}>
      {/* Page Header Banner */}
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
            Admissions Process
          </motion.h1>
          <div className={styles.heartLine}>
            <Heart size={14} className={styles.heartIcon} />
          </div>
          <p>Begin your child's joyful journey of discovery, warmth, and trust in our secure early childhood sanctuary.</p>
        </div>
      </section>

      {/* 1. Admission Journey Timeline */}
      <section className="section" style={{ backgroundColor: '#FAF6EE', paddingTop: '64px', paddingBottom: '56px', position: 'relative' }}>
        <div 
          className="section-bg-watermark" 
          style={{ 
            backgroundImage: `url('/classroom-bg.png')`,
            opacity: 0.08
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          <div className={styles.sectionHeader}>
            <div className={styles.headerDecor}>
              <span className={styles.decorStar}>✦</span>
              <span className={styles.decorCrown}>👑</span>
              <span className={styles.decorStar}>✦</span>
            </div>
            <h2>Our Admissions <span className={styles.italicHighlight}>Journey</span></h2>
            <div className={styles.heartLine}>
              <Heart size={14} className={styles.heartIcon} />
            </div>
            <p className={styles.sectionSubtitle}>
              A simple, parent-friendly path designed to welcome your family into our nursery school community.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className={styles.timeline}>
            <div className={styles.timelineLine} />
            {steps.map((step, idx) => (
              <motion.div 
                className={`${styles.timelineItem} ${idx % 2 === 1 ? styles.timelineItemRight : ''}`}
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <div className={styles.timelineBadge}>
                  <span>{step.num}</span>
                </div>
                <div className={styles.timelineCard}>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Section Divider */}
      <SectionDivider color="#541221" />

      {/* 2. Documents Required Section */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', paddingTop: '64px', paddingBottom: '64px', position: 'relative' }}>
        <div 
          className="section-bg-watermark" 
          style={{ 
            backgroundImage: `url('/classroom-bg.png')`,
            opacity: 0.08
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          <div className={styles.sectionHeader}>
            <div className={styles.headerDecor}>
              <span className={styles.decorStar}>✦</span>
              <span className={styles.decorCrown}>👑</span>
              <span className={styles.decorStar}>✦</span>
            </div>
            <h2>Documents <span className={styles.italicHighlight}>Required</span></h2>
            <div className={styles.heartLine}>
              <Heart size={14} className={styles.heartIcon} />
            </div>
            <p className={styles.sectionSubtitle}>
              Please prepare the following documents to attach with the registration application.
            </p>
          </div>

          {/* Checklist Grid */}
          <div className={styles.docsGrid}>
            {documents.map((doc, idx) => (
              <motion.div 
                className={styles.docCard}
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <div className={styles.docIconBox}>
                  <FileText size={20} />
                </div>
                <div className={styles.docText}>
                  <h4>{doc}</h4>
                  <div className={styles.checkBadge}>
                    <CheckCircle2 size={16} />
                    <span>Required</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Section Divider */}
      <SectionDivider color="#FAF6EE" />

      {/* 3. Embedded Admissions Inquiry Form */}
      <section className="section" style={{ backgroundColor: '#FAF6EE', paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="container">
          <div className={styles.formContainer}>
            <AdmissionsForm />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Admissions;
