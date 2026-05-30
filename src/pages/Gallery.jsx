import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { FALLBACK_IMAGES } from '../config/cms';
import { trackEvent } from '../services/analytics';
import SectionTitle from '../components/common/SectionTitle';
import styles from './GalleryPage.module.scss';

const Gallery = () => {
  const { gallery } = useCMS();
  const [activeTab, setActiveTab] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Compile dynamic filter tabs based on actually populated sheet categories
  const categories = ["All", ...new Set(gallery.map(photo => photo.category).filter(Boolean))];

  // Close lightbox modal upon hitting the Escape keyboard button
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };
    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  // Track user gallery tab filters conversion
  useEffect(() => {
    trackEvent('filter', 'Gallery', activeTab);
  }, [activeTab]);

  const filteredPhotos = activeTab === "All"
    ? gallery
    : gallery.filter(photo => photo.category === activeTab);


  return (
    <div className={styles.galleryPage}>
      
      {/* Banner Header */}
      <section className={styles.pageHeader}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Photo Gallery
          </motion.h1>
          <p>Peek inside our colorful campus, active assemblies, scientific workshops, and playground memories.</p>
        </div>
      </section>

      {/* Main mosaic list */}
      <section className="section">
        <div className="container">
          
          <SectionTitle 
            tag="Capturing Memories"
            title="Life & Discoveries at Kingdom of Learning"
            highlightWord="Discoveries"
            align="center"
            subtitle="Filter images below to explore classrooms, campus yards, creative play circles, and seasonal festival highlights."
          />

          {/* Filter Pills */}
          <div className={styles.filterBar}>
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`${styles.filterBtn} ${activeTab === cat ? styles.activeBtn : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Photo Mosaic Grid */}
          <motion.div layout className={styles.mosaicGrid}>
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className={`${styles.photoCard} ${photo.sizeClass === 'tall' ? styles.tallCard : photo.sizeClass === 'wide' ? styles.wideCard : ''}`}
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img 
                    src={photo.url} 
                    alt={photo.title} 
                    className={styles.image} 
                    onError={(e) => { e.target.src = FALLBACK_IMAGES.gallery; }}
                    loading="lazy" 
                  />
                  
                  {/* Overlay icon */}
                  <div className={styles.hoverOverlay}>
                    <ZoomIn className={styles.zoomIcon} size={22} strokeWidth={1.5} />
                    <h4 className={styles.photoTitle}>{photo.title}</h4>
                    <span className={styles.photoTag}>{photo.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <button className={styles.closeBtn} onClick={() => setSelectedPhoto(null)} aria-label="Close Lightbox">
              <X size={28} />
            </button>

            <motion.div 
              className={styles.lightboxCard}
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.lightboxImageContainer}>
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.title} 
                  onError={(e) => { e.target.src = FALLBACK_IMAGES.gallery; }}
                  loading="eager" 
                />
              </div>
              <div className={styles.lightboxDetails}>
                <h3>{selectedPhoto.title}</h3>
                <span className={styles.lightboxTag}>
                  {selectedPhoto.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
};

export default Gallery;
