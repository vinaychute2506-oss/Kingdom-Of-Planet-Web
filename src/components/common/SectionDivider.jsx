import React from 'react';

/**
 * SectionDivider renders highly aesthetic, quiet-luxury SVG curves and waves
 * to blend background transitions between cream (#FAF6EE) and white (#FFFFFF) sections.
 */
const SectionDivider = ({ 
  type = 'wave', 
  bgColor = '#FAF6EE', 
  fillColor = '#FFFFFF', 
  height = '48px',
  flipped = false 
}) => {
  const transform = flipped ? 'scaleY(-1)' : 'none';

  const renderPath = () => {
    switch (type) {
      case 'curve':
        // Soft concave arch curve
        return (
          <svg 
            viewBox="0 0 1440 48" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }}
          >
            <path d="M0,48 Q720,-12 1440,48 L1440,48 L0,48 Z" fill={fillColor} />
          </svg>
        );
      case 'dip':
        // Soft dipping concave curve
        return (
          <svg 
            viewBox="0 0 1440 48" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }}
          >
            <path d="M0,0 Q720,36 1440,0 L1440,48 L0,48 Z" fill={fillColor} />
          </svg>
        );
      case 'organic':
        // Subtle asymmetrical hill/valley
        return (
          <svg 
            viewBox="0 0 1440 60" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }}
          >
            <path d="M0,45 C320,68 640,12 960,35 C1160,45 1300,55 1440,40 L1440,60 L0,60 Z" fill={fillColor} />
          </svg>
        );
      case 'wave':
      default:
        // Elegant quiet-luxury wave curve
        return (
          <svg 
            viewBox="0 0 1440 60" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }}
          >
            <path d="M0,30 C240,65 480,5 720,35 C960,65 1200,25 1440,45 L1440,60 L0,60 Z" fill={fillColor} />
          </svg>
        );
    }
  };

  return (
    <div 
      className="section-divider"
      style={{ 
        backgroundColor: bgColor, 
        width: '100%', 
        height: height,
        overflow: 'hidden',
        lineHeight: 0,
        position: 'relative',
        zIndex: 2,
        transform: transform
      }}
    >
      {renderPath()}
    </div>
  );
};

export default SectionDivider;
