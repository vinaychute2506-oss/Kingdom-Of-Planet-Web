import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, User, Phone, Mail, CheckSquare, ClipboardList, AlertTriangle } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import styles from './AdmissionsForm.module.scss';

const AdmissionsForm = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    phone: '',
    age: '',
    grade: '',
    email: '',
  });
  
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.parentName || !formData.childName || !formData.phone) {
      alert("Please fill in all required fields to submit!");
      return;
    }
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setFormData({
      parentName: '',
      childName: '',
      phone: '',
      age: '',
      grade: '',
      email: '',
    });
  };

  const admissionSteps = [
    { num: "1", title: "Enquiry & Campus Visit", desc: "Visit our secure campus in Shahpur Jat." },
    { num: "2", title: "Admission Interaction", desc: "Friendly discussion with Principal Mrs. Komal Singh." },
    { num: "3", title: "Form Submission", desc: "Submit physical document copies." },
    { num: "4", title: "Document Verification", desc: "Verification check of Aadhaar, Birth certs, etc." },
    { num: "5", title: "Admission Confirmation", desc: "Official confirmation and slot locking." }
  ];

  const requiredDocuments = [
    "Birth Certificate",
    "Child's Passport Photos",
    "Child & Parents Aadhaar Copies",
    "Address Proof (Utility Bill/Rent)",
    "Previous School Records (If any)"
  ];

  return (
    <section className="section" id="admission-form" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
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
            <strong>Important Notice:</strong> Limited seats are available to ensure personal attention and quality learning for every child. Secure your slot today.
          </p>
        </motion.div>

        <div className={styles.formContainer}>
          
          {/* Left panel: admissions instructions */}
          <div className={styles.infoCol}>
            <span className={styles.tag}>Admissions 2026-27</span>
            <h2 className={styles.heading}>
              Start Your Child's <br />
              <span className={styles.highlight}>Kingdom Journey</span>
            </h2>
            
            {/* Admissions steps timeline */}
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

            {/* Required Documents list */}
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

          </div>

          {/* Right panel: Application Form */}
          <div className={styles.formCol}>
            <form onSubmit={handleSubmit} className={styles.realForm}>
              
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
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Send size={15} />
                <span>Submit Admissions Inquiry</span>
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
