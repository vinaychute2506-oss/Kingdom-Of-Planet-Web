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

  if (type === 'line') {
    return (
      <div 
        className="section-divider-line-container"
        style={{ 
          backgroundColor: bgColor, 
          width: '100%', 
          padding: '32px 0',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(84, 18, 33, 0) 0%, rgba(84, 18, 33, 0.12) 50%, rgba(84, 18, 33, 0.12) 100%)' }} />
          <div style={{ margin: '0 20px', color: 'rgba(84, 18, 33, 0.2)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, rgba(84, 18, 33, 0) 0%, rgba(84, 18, 33, 0.12) 50%, rgba(84, 18, 33, 0.12) 100%)' }} />
        </div>
      </div>
    );
  }

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
