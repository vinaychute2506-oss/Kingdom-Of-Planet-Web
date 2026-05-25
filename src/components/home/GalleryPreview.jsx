import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import styles from './GalleryPreview.module.scss';

const previewImages = [
  {
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=500",
    title: "Classroom Learning",
    color: "#FFC83B" // Yellow
  },
  {
    url: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=500",
    title: "Outdoor Playground",
    color: "#4CAF50" // Green
  },
  {
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=500",
    title: "Creative Art Class",
    color: "#8A4FFF" // Purple
  },
  {
    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=500",
    title: "Science Experiments",
    color: "#FF7043" // Orange
  },
  {
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=500",
    title: "Annual Stage Dance",
    color: "#29B6F6" // Blue
  },
  {
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=500",
    title: "Early Reading Club",
    color: "#FF4081" // Pink
  }
];

const GalleryPreview = () => {
  const handleViewAll = () => {
    window.location.hash = '#gallery';
  };

  return (
    <section className="section" id="home-gallery-preview">
      <div className={`container ${styles.gridContainer}`}>
        
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Photos</span>
            <Sparkles size={16} />
          </motion.button>
        </div>

        {/* Right Side: Round Mosaic Grid (matching Little Bharat Gallery preview exactly) */}
        <div className={styles.rightCol}>
          {previewImages.map((img, index) => {
            return (
              <motion.div 
                className={styles.imageCard}
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 1 : -1 }}
                style={{ '--accent-color': img.color }}
              >
                <img src={img.url} alt={img.title} className={styles.albumImage} />
                <div className={styles.imageOverlay}>
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
