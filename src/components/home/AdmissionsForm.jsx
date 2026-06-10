import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, User, Phone, Mail, CheckSquare, ClipboardList, AlertTriangle, Loader2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { submitForm } from '../../services/api';
import { trackEvent } from '../../services/analytics';
import SectionTitle from '../common/SectionTitle';
import styles from './AdmissionsForm.module.scss';


const AdmissionsForm = () => {
  const { schoolInfo, admissions } = useCMS();

  // Dynamic timelines and checklists filtered straight from Google Sheets rows!
  const admissionSteps = admissions
    .filter(item => item.type === 'step' || item.Type === 'step')
    .map((item, idx) => ({
      num: (idx + 1).toString(),
      title: item.itemTitle || item.ItemTitle,
      desc: item.itemDescription || item.ItemDescription
    }));

  const requiredDocuments = admissions
    .filter(item => item.type === 'document' || item.Type === 'document')
    .map(item => item.itemTitle || item.ItemTitle);

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
    setErrorMsg(null); // Clear previous errors

    if (cooldown) {
      setErrorMsg(`Rate-limiting protection: Please wait ${cooldownSeconds}s before submitting another application request.`);
      return;
    }

    // Bot detection filter (honeypot triggered if hidden field is filled out)
    if (formData.honeypot) {
      console.warn("Spam-bot trigger intercepted!");
      setShowSuccess(true);
      return;
    }

    if (!formData.parentName || !formData.childName || !formData.phone || !formData.grade) {
      setErrorMsg("Required enrollment details missing! Please enter parent name, child name, program selection, and contact number.");
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
        throw new Error(response?.message || 'Server responded with an unexpected error status.');
      }
    } catch (err) {
      // Enhanced diagnostic logging for network/CORS failures
      console.error('[Admissions Dispatch Failure] Diagnostics Details:', {
        exception: err.message,
        payloadPreserved: formData,
        apiUrlTargeted: import.meta.env.VITE_CMS_API
      });
      setErrorMsg("Admissions enrollment submission failed due to an API connection error. We have preserved your inputs. Please check your network and try again.");
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
          backgroundImage: `url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600')`,
          opacity: 0.26
        }} 
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Playful seat notice block rebranded to elegant brochure alert */}
        <motion.div 
          className={styles.alertNotice}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px', padding: '18px 24px' }}
        >
          <AlertTriangle size={20} style={{ flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: '0.95rem' }}>
            <strong>Important Notice:</strong> {schoolInfo.admissionsNotice}
          </p>
        </motion.div>

        <div className={styles.formContainer}>
          
          {/* Left panel: admissions instructions */}
          <div className={styles.infoCol}>
            <span className={styles.tag}>Admissions Open</span>
            <h2 className={styles.heading}>
              Start Your Child's <br />
              <span className={styles.highlight}>Kingdom Journey</span>
            </h2>
            
            {/* Admissions steps timeline */}
            {admissionSteps.length > 0 && (
              <div className={styles.stepsTimeline}>
                <h4 style={{ fontFamily: 'Playfair Display', color: '#FFFFFF', marginBottom: '16px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 500 }}>
                  <ClipboardList size={18} style={{ color: '#C8B39A' }} />
                  <span>Admission Process</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {admissionSteps.map((step) => (
                    <div key={step.num} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.3)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: '700', flexShrink: 0 }}>
                        {step.num}
                      </div>
                      <div>
                        <h5 style={{ fontFamily: 'Lato', fontWeight: '700', color: '#FFFFFF', fontSize: '0.92rem', margin: 0 }}>{step.title}</h5>
                        <p style={{ fontSize: '0.78rem', color: 'rgba(246, 241, 233, 0.7)', margin: 0, marginTop: '2px' }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Required Documents list */}
            {requiredDocuments.length > 0 && (
              <div className={styles.docSection}>
                <h4 style={{ fontFamily: 'Playfair Display', color: '#C8B39A', marginBottom: '12px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 500 }}>
                  <CheckSquare size={18} />
                  <span>Required Documents</span>
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {requiredDocuments.map((doc, i) => (
                    <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.88rem', color: '#FFFFFF', fontWeight: '400' }}>
                      <span style={{ color: '#C8B39A', fontSize: '1rem' }}>✓</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Right panel: Application Form */}
          <div className={styles.formCol}>
            <form onSubmit={handleSubmit} className={styles.realForm}>
              
              {/* Bot-protection Honeypot field (hidden from user view) */}
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
                  <label htmlFor="age">Child's Age</label>
                  <div className={styles.fieldWrapper}>
                    <input 
                      type="number" 
                      id="age" 
                      name="age" 
                      placeholder="e.g. 3" 
                      min="1" 
                      max="6"
                      value={formData.age}
                      onChange={handleChange}
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
                      <option value="Toddcare">Toddcare (1.5 - 2.5 Yrs)</option>
                      <option value="Nursery">Nursery (2.5 - 3.5 Yrs)</option>
                      <option value="Junior KG">Junior KG / LKG (3.5 - 4.5 Yrs)</option>
                      <option value="Senior KG">Senior KG / UKG (4.5 - 5.5 Yrs)</option>
                    </select>
                  </div>
                </div>

                {/* Email Address */}
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email Address</label>
                  <div className={styles.fieldWrapper}>
                    <Mail size={15} className={styles.fieldIcon} />
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="parent@email.com"
                      value={formData.email}
                      onChange={handleChange}
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
                    ? "Dispatching Inquiry..." 
                    : cooldown 
                      ? `Locked (${cooldownSeconds}s)` 
                      : "Submit Admissions Inquiry"}
                </span>
              </motion.button>

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

