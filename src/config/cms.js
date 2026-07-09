/**
 * Kingdom of Learning — Centralized CMS Configuration
 */

// Google Apps Script endpoint mapped from environment
export const CMS_API_URL = import.meta.env.VITE_CMS_API || '';

// SWR Cache Duration (in milliseconds). Standard is 5 minutes (300,000ms)
export const CACHE_COOLDOWN_MS = 5 * 60 * 1000;

// High-quality, warm-toned editorial fallbacks if parent-configured images fail to resolve
export const FALLBACK_IMAGES = {
  logo: '/logo.png',
  heroVideo: '/hero-video.mp4',
  classroom: '/classroom-kids.webp',
  program: '/toddcare.webp',
  activity: '/activity-art.webp',
  teacher: '/teacher-komal.webp',
  testimonial: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Preschooler',
  gallery: '/gallery-1.webp'
};

// Toggle branding watermarks overlay dynamically on all Cloudinary assets (Asset protection)
export const ENABLE_GALLERY_WATERMARK = false;

/**
 * Optimizes Cloudinary image links by injecting smart compression (q_auto), 
 * modern auto-format selection (f_auto), and optional branded typography watermarks dynamically.
 * 
 * @param {string} url - The original image URL 
 * @returns {string} - The optimized Cloudinary CDN URL, or original if not hosted on Cloudinary
 */
export const optimizeCloudinaryUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  
  // Verify it is a valid Cloudinary resource URL
  if (!url.includes('res.cloudinary.com')) {
    // If it's a standard Google Drive shareable link, we can dynamically parse it to direct URL format
    if (url.includes('drive.google.com/file/d/')) {
      const match = url.match(/\/file\/d\/([^\/]+)/);
      if (match && match[1]) {
        return `https://lh3.googleusercontent.com/d/${match[1]}=s1600`;
      }
    }
    return url;
  }
  
  // If it already has transformations, bypass to prevent conflicts
  if (url.includes('/f_auto') || url.includes('/q_auto')) {
    return url;
  }
  
  // Inject /f_auto,q_auto/ transformations
  try {
    if (ENABLE_GALLERY_WATERMARK) {
      // Overlays a premium light white Playfair Display text watermark at the bottom right corner
      const watermarkTransformation = 'f_auto,q_auto/l_text:Playfair%20Display_15_bold_italic:Kingdom%20of%20Learning,co_rgb:ffffff,o_30,g_south_east,y_15,x_15/';
      return url.replace('/upload/', `/upload/${watermarkTransformation}`);
    }
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
  } catch (e) {
    return url;
  }
};
