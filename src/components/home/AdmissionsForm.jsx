import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, HelpCircle, User, Phone, Mail, Award, CheckSquare, ClipboardList, AlertTriangle } from 'lucide-react';
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
    <section className="section" id="admission-form">
      <div className="container">
        
        {/* Playful seat notice block */}
        <motion.div 
          className={styles.alertNotice}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            backgroundColor: '#FFFDD0', 
            border: '2px dashed #D4AF37', 
            borderRadius: '20px', 
            padding: '16px 24px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            marginBottom: '40px'
          }}
        >
          <AlertTriangle size={24} color="#6B1D2F" style={{ flexShrink: 0 }} />
          <p style={{ color: '#6B1D2F', fontWeight: '800', fontSize: '1.05rem', margin: 0 }}>
            <strong>Important Notice:</strong> Limited seats are available to ensure personal attention and quality learning for every child. Secure your slot today.
          </p>
        </motion.div>

        <div className={styles.formContainer}>
          
          {/* Left panel: admissions instructions */}
          <div className={styles.infoCol} style={{ background: 'linear-gradient(135deg, #F5E6E8 0%, #FFFDD0 100%)' }}>
            <span className={styles.tag} style={{ backgroundColor: '#6B1D2F', color: '#FFFFFF', borderColor: '#6B1D2F' }}>Admissions 2026-27</span>
            <h2 className={styles.heading}>
              Start Your Child's <br />
              <span className={styles.highlight} style={{ color: '#6B1D2F' }}>Kingdom Journey</span>
            </h2>
            
            {/* Admissions steps timeline */}
            <div className={styles.stepsTimeline} style={{ width: '100%', margin: '24px 0' }}>
              <h4 style={{ fontFamily: 'Baloo 2', color: '#6B1D2F', marginBottom: '14px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ClipboardList size={18} />
                <span>Admission Process:</span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {admissionSteps.map((step) => (
                  <div key={step.num} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#6B1D2F', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '800', flexShrink: 0 }}>
                      {step.num}
                    </div>
                    <div>
                      <h5 style={{ fontFamily: 'Nunito', fontWeight: '800', color: '#2A2A2A', fontSize: '0.9rem', margin: 0 }}>{step.title}</h5>
                      <p style={{ fontSize: '0.75rem', color: '#6A6A6A', margin: 0 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents list */}
            <div className={styles.docSection} style={{ width: '100%', marginTop: '10px' }}>
              <h4 style={{ fontFamily: 'Baloo 2', color: '#D4AF37', marginBottom: '10px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckSquare size={18} />
                <span>Required Documents:</span>
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {requiredDocuments.map((doc, i) => (
                  <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.85rem', color: '#2A2A2A', fontWeight: '700' }}>
                    <span style={{ color: '#D4AF37' }}>✔</span>
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
                    <User size={16} className={styles.fieldIcon} />
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
                    <Phone size={16} className={styles.fieldIcon} />
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
                    <User size={16} className={styles.fieldIcon} />
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
                    <Mail size={16} className={styles.fieldIcon} />
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ background: 'linear-gradient(135deg, #6B1D2F 0%, #4a121e 100%)', boxShadow: '0 8px 24px rgba(107, 29, 47, 0.15)' }}
              >
                <Send size={18} />
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
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{ borderColor: '#6B1D2F' }}
            >
              <div className={styles.successIconBox} style={{ backgroundColor: '#FAF6EE', color: '#6B1D2F' }}>
                <CheckCircle size={44} />
              </div>
              <h3 className={styles.modalTitle} style={{ color: '#6B1D2F' }}>Application Registered!</h3>
              <p className={styles.modalText}>
                Dear <strong>{formData.parentName}</strong>, we have logged your inquiry for <strong>{formData.childName}</strong> (Program: {formData.grade}).
              </p>
              <p className={styles.modalSubtext}>
                Our admissions guide will contact you at <strong>{formData.phone}</strong> or send details to <strong>admin@kingdomoflearning.com</strong> to plan your campus visit.
              </p>
              <button className={styles.modalCloseBtn} onClick={handleCloseSuccess} style={{ backgroundColor: '#6B1D2F' }}>
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
