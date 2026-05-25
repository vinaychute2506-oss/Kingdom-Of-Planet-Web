import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Sparkles } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import styles from './GalleryPage.module.scss';

const galleryPhotos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
    title: "Morning Reading Lessons",
    category: "Learn",
    color: "#FFC83B"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=600",
    title: "Outdoor Soft Slide Play",
    category: "Play",
    color: "#4CAF50"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600",
    title: "Watercolor Painting Classes",
    category: "Play",
    color: "#8A4FFF"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
    title: "STEM Science Liquid Mix",
    category: "Learn",
    color: "#FF7043"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
    title: "Grand Annual Day Stage Choreography",
    category: "Events",
    color: "#29B6F6"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
    title: "Early English Writing Activity",
    category: "Learn",
    color: "#FF4081"
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600",
    title: "Smart Educational Computer Lab",
    category: "Campus",
    color: "#29B6F6"
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&q=80&w=600",
    title: "Interactive Storytelling Library",
    category: "Campus",
    color: "#8A4FFF"
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1486016006115-74a41448aea2?auto=format&fit=crop&q=80&w=600",
    title: "Junior Olympic Relay Races",
    category: "Events",
    color: "#FF7043"
  }
];

const categories = ["All", "Campus", "Events", "Play", "Learn"];

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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

  const filteredPhotos = activeTab === "All"
    ? galleryPhotos
    : galleryPhotos.filter(photo => photo.category === activeTab);

  return (
    <div className={styles.galleryPage}>
      
      {/* Banner Header */}
      <section className={styles.pageHeader} style={{ background: 'linear-gradient(135deg, #6B1D2F 0%, #FF4081 100%)' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
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
                  className={styles.photoCard}
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  style={{ '--accent-color': photo.color }}
                >
                  <img src={photo.url} alt={photo.title} className={styles.image} loading="lazy" />
                  
                  {/* Overlay icon */}
                  <div className={styles.hoverOverlay}>
                    <ZoomIn className={styles.zoomIcon} size={28} />
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
              <X size={32} />
            </button>

            <motion.div 
              className={styles.lightboxCard}
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.lightboxImageContainer}>
                <img src={selectedPhoto.url} alt={selectedPhoto.title} loading="eager" />
              </div>
              <div className={styles.lightboxDetails}>
                <h3>{selectedPhoto.title}</h3>
                <span style={{ backgroundColor: selectedPhoto.color }} className={styles.lightboxTag}>
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
