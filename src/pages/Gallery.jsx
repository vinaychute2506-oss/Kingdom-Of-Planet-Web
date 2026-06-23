import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Image, Users, Home, Heart } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { FALLBACK_IMAGES } from '../config/cms';
import SectionDivider from '../components/common/SectionDivider';
import styles from './GalleryPage.module.scss';

const Gallery = () => {
  const { gallery } = useCMS();
  const [activeTab, setActiveTab] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Compile dynamic filter tabs
  const categories = ["All", ...new Set(gallery.map(photo => photo.category).filter(Boolean))];

  // Close lightbox modal upon hitting Escape
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

  const filteredPhotos = activeTab === "All"
    ? gallery
    : gallery.filter(photo => photo.category === activeTab);

  const statsList = [
    {
      icon: Image,
      val: "500+",
      lbl: "Cherished Moments"
    },
    {
      icon: Users,
      val: "50+",
      lbl: "Activities & Events"
    },
    {
      icon: Home,
      val: "2+",
      lbl: "Campus Locations"
    },
    {
      icon: Heart,
      val: "Countless",
      lbl: "Smiles & Memories"
    }
  ];

  return (
    <div className={styles.galleryPage}>
      
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div 
          className="section-bg-watermark" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1600')`,
            opacity: 0.15
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.headerDecor}>
            <span className={styles.decorStar}>✦</span>
            <span className={styles.decorStar}>✦</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Photo Gallery
          </motion.h1>
          <div className={styles.heartLine}>
            <Heart size={14} className={styles.heartIcon} />
          </div>
          <p>Peek inside our colorful campus, active assemblies, scientific workshops, and playground memories.</p>
        </div>
      </section>

      {/* Main Section */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', paddingTop: '56px', paddingBottom: '64px' }}>
        <div className="container">
          
          <div className={styles.sectionHeader}>
            <span className={styles.upperTag}>CAPTURING MEMORIES</span>
            <h2>Life & <span className={styles.italicHighlight}>Discoveries</span> at Kingdom of Learning</h2>
            <p>Filter images below to explore classrooms, campus yards, creative play circles, and seasonal festival highlights.</p>
          </div>

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

          {/* Uniform Grid of Photos */}
          <motion.div layout className={styles.uniformGrid}>
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className={styles.photoCard}
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img 
                    src={photo.url} 
                    alt={photo.title} 
                    onError={(e) => { e.target.src = FALLBACK_IMAGES.gallery; }}
                    loading="lazy" 
                  />
                  
                  {/* Hover Overlay */}
                  <div className={styles.hoverOverlay}>
                    <ZoomIn className={styles.zoomIcon} size={22} strokeWidth={1.5} />
                    <h4 className={styles.photoTitle}>{photo.title}</h4>
                    <span className={styles.photoTag}>{photo.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Stats strip below the grid */}
          <div className={styles.statsStripRow}>
            {statsList.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div className={styles.statBox} key={idx}>
                  <div className={styles.statIconCircle}>
                    <IconComp size={20} className={styles.statIcon} />
                  </div>
                  <div className={styles.statText}>
                    <h3>{stat.val}</h3>
                    <p>{stat.lbl}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Instagram Promo Banner */}
          <div className={styles.instagramBanner}>
            <div className={styles.instaLeft}>
              <div className={styles.instaIconCircle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </div>
              <div className={styles.instaText}>
                <h3>More memories every day!</h3>
                <p>Follow our journey on Instagram for daily snapshots of joy and learning.</p>
              </div>
            </div>
            <div className={styles.instaRight}>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.instaBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Follow Us on Instagram</span>
              </motion.a>
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
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
