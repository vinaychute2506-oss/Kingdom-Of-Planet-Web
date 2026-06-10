import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import styles from './GalleryPreview.module.scss';

const previewImages = [
  {
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=500",
    title: "Classroom Learning",
    category: "Academic"
  },
  {
    url: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=500",
    title: "Outdoor Playground",
    category: "Playtime"
  },
  {
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=500",
    title: "Creative Art Class",
    category: "Creativity"
  },
  {
    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=500",
    title: "Science Experiments",
    category: "Explore"
  },
  {
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=500",
    title: "Annual Stage Dance",
    category: "Events"
  },
  {
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=500",
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
          backgroundImage: `url('https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800')`,
          opacity: 0.10
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
