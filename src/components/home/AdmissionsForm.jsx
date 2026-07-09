import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, User, Phone, Mail, Award, Shield, Users, Target, FileText, Calendar, Bell, AlertTriangle, Loader2, Lock, Heart } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { submitForm } from '../../services/api';
import { trackEvent } from '../../services/analytics';
import styles from './AdmissionsForm.module.scss';

const benefitList = [
  { icon: FileText, text: "Easy & Simple Admission Process" },
  { icon: Award, text: "Age-Appropriate Learning Programs" },
  { icon: Shield, text: "Safe, Secure & Hygienic Campus" },
  { icon: Users, text: "Nurturing & Experienced Educators" },
  { icon: Target, text: "Focus on Holistic Child Development" }
];

const AdmissionsForm = () => {
  const { schoolInfo } = useCMS();

  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    phone: '',
    age: '',
    grade: '',
    email: '',
    honeypot: '', // bot protection honeypot
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  // Rate-limiting countdown timer loop
  useEffect(() => {
    let interval = null;
    if (cooldown && cooldownSeconds > 0) {
      interval = setInterval(() => {
        setCooldownSeconds((prev) => prev - 1);
      }, 1000);
    } else if (cooldownSeconds === 0) {
      setCooldown(false);
    }
    return () => clearInterval(interval);
  }, [cooldown, cooldownSeconds]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (cooldown) {
      setErrorMsg(`Please wait ${cooldownSeconds}s before submitting another inquiry.`);
      return;
    }

    if (formData.honeypot) {
      setShowSuccess(true);
      return;
    }

    if (!formData.parentName || !formData.childName || !formData.phone || !formData.grade || !formData.email) {
      setErrorMsg("Please fill in all required fields marked with *.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await submitForm({
        formType: 'admission',
        parentName: formData.parentName,
        childName: formData.childName,
        phone: formData.phone,
        email: formData.email,
        grade: formData.grade,
        message: `Child Age: ${formData.age || 'Not specified'}`
      });

      if (response && response.status === 'success') {
        trackEvent('submit', 'Inquiry', 'Admissions Form Success');
        setShowSuccess(true);
        setCooldown(true);
        setCooldownSeconds(10); // 10-second spam protection lock
      } else {
        throw new Error(response?.message || 'Server error occurred.');
      }
    } catch (err) {
      console.error('[Admissions Dispatch Failure]', err);
      setErrorMsg("Admissions inquiry submission failed. Please check your network connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setErrorMsg(null);
    setFormData({
      parentName: '',
      childName: '',
      phone: '',
      age: '',
      grade: '',
      email: '',
      honeypot: '',
    });
  };

  return (
    <section className="section" id="admission-form" style={{ backgroundColor: '#FFFFFF', position: 'relative' }}>
      {/* Subtle background texture watermark */}
      <div 
        className="section-bg-watermark" 
        style={{ 
          backgroundImage: `url('/classroom-kids.webp')`,
          opacity: 0.16
        }} 
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Seat Notice Alert Banner */}
        <motion.div 
          className={styles.alertNotice}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', padding: '14px 20px', borderRadius: '40px' }}
        >
          <Bell size={18} style={{ flexShrink: 0, color: '#E05A6D' }} />
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#541221', fontWeight: 500 }}>
            Limited seats for this academic year! Admissions are on a first-come, first-served basis.
          </p>
        </motion.div>

        <div className={styles.formContainer}>
          
          {/* Left panel: admissions instructions */}
          <div className={styles.infoCol}>
            <span className={styles.tag}>
              <Award size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              <span>Admissions Open</span>
            </span>
            <h2 className={styles.heading}>
              Start Your Child's <br />
              <span className={styles.highlight}>Kingdom Journey</span>
            </h2>
            
            {/* Divider */}
            <div className={styles.formDivider}>
              <div className={styles.divLine}></div>
              <Heart size={14} fill="currentColor" className={styles.divHeart} />
              <div className={styles.divLine}></div>
            </div>

            <p className={styles.infoTagline}>Begin a beautiful journey of learning, growth and discovery.</p>

            {/* List of benefits */}
            <div className={styles.benefitList}>
              {benefitList.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className={styles.benefitItem}>
                    <div className={styles.benefitIconBox}>
                      <IconComp size={14} strokeWidth={2} />
                    </div>
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right panel: Application Form */}
          <div className={styles.formCol}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Enquiry & Admission Form</h3>
              
              {/* Divider */}
              <div className={styles.formDivider} style={{ margin: '12px 0 24px 0' }}>
                <div className={styles.divLine} style={{ backgroundColor: '#EADFCF' }}></div>
                <Heart size={12} fill="currentColor" style={{ color: '#541221' }} />
                <div className={styles.divLine} style={{ backgroundColor: '#EADFCF' }}></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.realForm}>
              
              {/* Bot-protection Honeypot */}
              <input 
                type="text" 
                name="honeypot" 
                value={formData.honeypot} 
                onChange={handleChange} 
                style={{ display: 'none' }} 
                tabIndex="-1" 
                autoComplete="off" 
              />

              <AnimatePresence>
                {errorMsg && (
                  <motion.div 
                    className={styles.errorNotice}
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AlertTriangle size={18} className={styles.errorIcon} />
                    <span>{errorMsg}</span>
                    <button type="button" className={styles.errorClose} onClick={() => setErrorMsg(null)}>×</button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={styles.formGrid}>
                
                {/* Parent's Name */}
                <div className={styles.inputGroup}>
                  <label htmlFor="parentName">Parent's Name *</label>
                  <div className={styles.fieldWrapper}>
                    <User size={15} className={styles.fieldIcon} />
                    <input 
                      type="text" 
                      id="parentName" 
                      name="parentName" 
                      placeholder="Enter parent's full name"
                      value={formData.parentName}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className={styles.inputGroup}>
                  <label htmlFor="phone">Phone Number *</label>
                  <div className={styles.fieldWrapper}>
                    <Phone size={15} className={styles.fieldIcon} />
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      placeholder="Enter 10-digit number"
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>

                {/* Child's Name */}
                <div className={styles.inputGroup}>
                  <label htmlFor="childName">Child's Name *</label>
                  <div className={styles.fieldWrapper}>
                    <User size={15} className={styles.fieldIcon} />
                    <input 
                      type="text" 
                      id="childName" 
                      name="childName" 
                      placeholder="Enter child's full name"
                      value={formData.childName}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>

                {/* Child's Age */}
                <div className={styles.inputGroup}>
                  <label htmlFor="age">Child's Age *</label>
                  <div className={styles.fieldWrapper}>
                    <Calendar size={15} className={styles.fieldIcon} />
                    <input 
                      type="text" 
                      id="age" 
                      name="age" 
                      placeholder="e.g., 3.5 years" 
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Select Class Grade */}
                <div className={styles.inputGroup}>
                  <label htmlFor="grade">Select Program *</label>
                  <div className={styles.fieldWrapper}>
                    <select 
                      id="grade" 
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choose program</option>
                      <option value="Playgroup">Playgroup (2 - 3 Yrs)</option>
                      <option value="Nursery">Nursery (3 - 4 Yrs)</option>
                      <option value="Junior KG">Lower Kindergarten / LKG (4 - 5 Yrs)</option>
                      <option value="Senior KG">Upper Kindergarten / UKG (5 - 6 Yrs)</option>
                    </select>
                  </div>
                </div>

                {/* Email Address */}
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <div className={styles.fieldWrapper}>
                    <Mail size={15} className={styles.fieldIcon} />
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="parent@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

              </div>

              <motion.button 
                type="submit" 
                className={styles.submitBtn}
                disabled={submitting || cooldown}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {submitting ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Send size={15} />
                )}
                <span>
                  {submitting 
                    ? "Submitting Enquiry..." 
                    : cooldown 
                      ? `Locked (${cooldownSeconds}s)` 
                      : "Submit Admission Enquiry"}
                </span>
              </motion.button>

              <div className={styles.lockNotice} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '16px', fontSize: '0.82rem', color: '#7E6F6A' }}>
                <Lock size={12} />
                <span>Your information is safe and secure with us.</span>
              </div>

            </form>
          </div>

        </div>

      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.modalCard}
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
            >
              <div className={styles.successIconBox}>
                <CheckCircle size={36} strokeWidth={1.5} />
              </div>
              <h3 className={styles.modalTitle}>Application Registered</h3>
              <p className={styles.modalText}>
                Dear <strong>{formData.parentName}</strong>, we have logged your inquiry for <strong>{formData.childName}</strong> (Program: {formData.grade}).
              </p>
              <p className={styles.modalSubtext}>
                Our admissions guide will contact you at <strong>{formData.phone}</strong> or send details to your email shortly to plan your campus visit.
              </p>
              <button className={styles.modalCloseBtn} onClick={handleCloseSuccess}>
                Close Summary
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default AdmissionsForm;
