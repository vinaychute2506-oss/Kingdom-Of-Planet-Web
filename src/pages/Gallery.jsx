import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import styles from './GalleryPage.module.scss';

const galleryPhotos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&q=80&w=800",
    title: "Interactive Storytelling Library",
    category: "Campus",
    sizeClass: ""
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800",
    title: "Outdoor Soft Slide Play",
    category: "Play",
    sizeClass: "tall"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
    title: "Watercolor & Painting Workshop",
    category: "Play",
    sizeClass: ""
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    title: "STEM Experiential Science Setup",
    category: "Learn",
    sizeClass: "wide"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
    title: "Grand Annual Day Stage Choreography",
    category: "Events",
    sizeClass: ""
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    title: "Early Alphabet Tracing Lessons",
    category: "Learn",
    sizeClass: "tall"
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800",
    title: "Creative Montessori Activity Desks",
    category: "Campus",
    sizeClass: ""
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
    title: "Early Childhood Phonics Session",
    category: "Learn",
    sizeClass: ""
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1486016006115-74a41448aea2?auto=format&fit=crop&q=80&w=800",
    title: "Junior Olympic Relay Races",
    category: "Events",
    sizeClass: "wide"
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800",
    title: "Indoor Creative Blocks Assembly",
    category: "Play",
    sizeClass: ""
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=800",
    title: "Hands-on Fine Motor Clay Sculpting",
    category: "Play",
    sizeClass: "tall"
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1596464601899-76506300a20e?auto=format&fit=crop&q=80&w=800",
    title: "Preschool Group Puzzles",
    category: "Learn",
    sizeClass: ""
  },
  {
    id: 13,
    url: "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?auto=format&fit=crop&q=80&w=800",
    title: "Teacher-Guided Storytelling Circles",
    category: "Learn",
    sizeClass: "wide"
  },
  {
    id: 14,
    url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800",
    title: "Sensory Sandbox & Garden Exploration",
    category: "Play",
    sizeClass: ""
  },
  {
    id: 15,
    url: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=800",
    title: "Kids Phonics & Reading Sessions",
    category: "Learn",
    sizeClass: ""
  },
  {
    id: 16,
    url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800",
    title: "Premium Child-safe Indoor Play Gym",
    category: "Campus",
    sizeClass: "tall"
  },
  {
    id: 17,
    url: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&q=80&w=800",
    title: "Holiday Festival & Craft Celebrations",
    category: "Events",
    sizeClass: ""
  },
  {
    id: 18,
    url: "https://images.unsplash.com/photo-1503676382389-1e09c800847b?auto=format&fit=crop&q=80&w=800",
    title: "Sensory Learning & Reading Corner",
    category: "Campus",
    sizeClass: ""
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
                  <img src={photo.url} alt={photo.title} className={styles.image} loading="lazy" />
                  
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
                <img src={selectedPhoto.url} alt={selectedPhoto.title} loading="eager" />
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
