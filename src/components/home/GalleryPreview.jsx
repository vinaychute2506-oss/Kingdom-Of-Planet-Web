import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import styles from './GalleryPreview.module.scss';

const previewImages = [
  {
    url: "/gallery-1.webp",
    title: "Classroom Learning",
    category: "Academic"
  },
  {
    url: "/gallery-2.webp",
    title: "Outdoor Playground",
    category: "Playtime"
  },
  {
    url: "/gallery-3.webp",
    title: "Creative Art Class",
    category: "Creativity"
  },
  {
    url: "/gallery-4.webp",
    title: "Science Experiments",
    category: "Explore"
  },
  {
    url: "/gallery-5.webp",
    title: "Annual Stage Dance",
    category: "Events"
  },
  {
    url: "/gallery-6.webp",
    title: "Early Reading Club",
    category: "Cognitive"
  }
];

const GalleryPreview = () => {
  const handleViewAll = () => {
    window.location.hash = '#gallery';
  };

  return (
    <section className="section" id="home-gallery-preview" style={{ backgroundColor: '#FAF6EE', position: 'relative' }}>
      {/* Subtle background texture watermark */}
      <div 
        className="section-bg-watermark" 
        style={{ 
          backgroundImage: `url('/classroom-bg.webp')`,
          opacity: 0.26
        }} 
      />
      <div className={`container ${styles.gridContainer}`} style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Left Side: Callout text and button */}
        <div className={styles.leftCol}>
          <span className={styles.tag}>Photo Album</span>
          <h2 className={styles.heading}>
            Life at <br />
            Kingdom of <br />
            <span className={styles.highlight}>Learning</span>
          </h2>
          <p className={styles.subtext}>
            Take a sneak peek into the bright, cheerful, and active environment our children experience daily. Smiling faces and active minds everywhere!
          </p>
          <motion.button 
            className={styles.viewBtn} 
            onClick={handleViewAll}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View All Photos</span>
            <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* Right Side: Round Mosaic Grid */}
        <div className={styles.rightCol}>
          {previewImages.map((img, index) => {
            return (
              <motion.div 
                className={styles.imageCard}
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <img src={img.url} alt={img.title} className={styles.albumImage} />
                <div className={styles.imageOverlay}>
                  <span className={styles.categoryBadge}>{img.category}</span>
                  <h4 className={styles.overlayTitle}>{img.title}</h4>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default GalleryPreview;
