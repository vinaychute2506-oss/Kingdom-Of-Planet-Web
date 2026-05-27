import React from 'react';
import { motion } from 'framer-motion';
import styles from './SectionTitle.module.scss';

const SectionTitle = ({ tag, title, subtitle, highlightWord, align = 'center' }) => {
  // Render title with the highlighted word styled differently
  const renderTitle = () => {
    if (!highlightWord) return title;
    
    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className={styles.highlight}>{highlightWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`${styles.container} ${styles[align]}`}>
      {tag && (
        <motion.span 
          className={styles.tag}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {tag}
        </motion.span>
      )}
      
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        {renderTitle()}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Editorial thin separator line */}
      <div className={styles.decoratorLine} />
    </div>
  );
};

export default SectionTitle;
