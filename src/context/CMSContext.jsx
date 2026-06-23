import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCMSData } from '../services/api';
import { CACHE_COOLDOWN_MS, FALLBACK_IMAGES, optimizeCloudinaryUrl } from '../config/cms';

// Fallback data sources for zero layout shifts
import { programsData } from '../data/programs';
import { activitiesData } from '../data/activities';
import { testimonialsData } from '../data/testimonials';
import { teachersData } from '../data/teachers';
import { routineData } from '../data/routine';
import { eventsData } from '../data/events';

// In-line gallery fallback images mapping
const galleryFallbackPhotos = [
  { id: 1, url: "/gallery-1.png", title: "Interactive Storytelling Library", category: "Campus", sizeClass: "" },
  { id: 2, url: "/gallery-2.png", title: "Outdoor Soft Slide Play", category: "Play", sizeClass: "tall" },
  { id: 3, url: "/gallery-3.png", title: "Watercolor & Painting Workshop", category: "Play", sizeClass: "" },
  { id: 4, url: "/gallery-4.png", title: "STEM Experiential Science Setup", category: "Learn", sizeClass: "wide" },
  { id: 5, url: "/gallery-5.png", title: "Grand Annual Day Stage Choreography", category: "Events", sizeClass: "" },
  { id: 6, url: "/gallery-6.png", title: "Early Alphabet Tracing Lessons", category: "Learn", sizeClass: "tall" },
  { id: 7, url: "/gallery-7.png", title: "Creative Montessori Activity Desks", category: "Campus", sizeClass: "" },
  { id: 8, url: "/gallery-8.png", title: "Early Childhood Phonics Session", category: "Learn", sizeClass: "" }
];

const getProgramFallbackImage = (id) => {
  const cleanId = String(id).toLowerCase();
  if (cleanId.includes('todd') || cleanId.includes('play')) {
    return '/toddcare.png';
  } else if (cleanId.includes('nursery')) {
    return '/nursery.png';
  } else if (cleanId.includes('junior') || cleanId.includes('lkg') || cleanId.includes('kg')) {
    return '/junior-kg.png';
  } else if (cleanId.includes('senior') || cleanId.includes('ukg')) {
    return '/senior-kg.png';
  }
  return FALLBACK_IMAGES.program;
};

const schoolInfoFallback = {
  schoolName: "Kingdom of Learning Pre School",
  tagline: "Warmth • Creativity • Trust",
  phone: "+91 9667706285",
  whatsapp: "+91 9667708285",
  email: "admin@kingdomoflearning.com",
  altEmail: "singh.komal.tvf@gmail.com",
  address: "190-A, G/F Shahpur Jat, New Delhi - 110049",
  principalName: "Mrs. Komal Singh",
  principalExperience: "12+ Years in Premium Preschool Administration",
  principalBio: "Passionate early childhood learning leader dedicated to providing safe, activity-based play-way education for young minds.",
  admissionsNotice: "Limited seats for this academic year! Admissions are on a first-come, first-served basis.",
  toddcareTimings: "Mon - Fri: 09:00 AM - 12:00 PM",
  nurseryKGTimings: "Mon - Fri: 09:00 AM - 01:00 PM",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14015.460458428588!2d77.2066373!3d28.5738096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd00318029c7%3A0x444d32a9a463a56!2sShahpur%20Jat%2C%20New%20Delhi%2C%20Delhi%20110049!5e0!3m2!1sen!2sin!4v1716482937512!5m2!1sen!2sin",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  youtubeUrl: "https://youtube.com",
  siteVersion: "1.0.0" // Version key for client-driven cache invalidations
};

const admissionsFallback = [
  { type: "step", itemTitle: "Enquiry & Campus Visit", itemDescription: "Visit our secure campus in Shahpur Jat." },
  { type: "step", itemTitle: "Admission Interaction", itemDescription: "Friendly discussion with Principal Mrs. Komal Singh." },
  { type: "step", itemTitle: "Form Submission", itemDescription: "Submit physical document copies." },
  { type: "step", itemTitle: "Document Verification", itemDescription: "Verification check of Aadhaar, Birth certs, etc." },
  { type: "step", itemTitle: "Admission Confirmation", itemDescription: "Official confirmation and slot locking." },
  { type: "document", itemTitle: "Birth Certificate", itemDescription: "" },
  { type: "document", itemTitle: "Child's Passport Photos", itemDescription: "" },
  { type: "document", itemTitle: "Child & Parents Aadhaar Copies", itemDescription: "" },
  { type: "document", itemTitle: "Address Proof (Utility Bill/Rent)", itemDescription: "" },
  { type: "document", itemTitle: "Previous School Records (If any)", itemDescription: "" }
];

const CMSContext = createContext(null);

export const CMSProvider = ({ children }) => {
  // Master states initialized to direct high-fidelity fallbacks
  const [schoolInfo, setSchoolInfo] = useState(schoolInfoFallback);
  const [programs, setPrograms] = useState(programsData);
  const [activities, setActivities] = useState(activitiesData);
  const [testimonials, setTestimonials] = useState(testimonialsData);
  const [gallery, setGallery] = useState(galleryFallbackPhotos);
  const [admissions, setAdmissions] = useState(admissionsFallback);
  const [teachers, setTeachers] = useState(teachersData);
  const [routine, setRoutine] = useState(routineData);
  const [events, setEvents] = useState(eventsData);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Parse Raw Sheet Data into correctly typed application sets
  const processCMSResponse = (rawSheets) => {
    const processed = {};

    // 1. Process SchoolInfo key-value tab
    if (rawSheets.SchoolInfo && Array.isArray(rawSheets.SchoolInfo)) {
      const infoObj = {};
      rawSheets.SchoolInfo.forEach(row => {
        if (row.Key || row.key) {
          const k = row.Key || row.key;
          const v = row.Value !== undefined ? row.Value : row.value;
          infoObj[k] = v;
        }
      });
      processed.schoolInfo = { ...schoolInfoFallback, ...infoObj };
    }

    // 2. Process Programs
    if (rawSheets.Programs && Array.isArray(rawSheets.Programs)) {
      processed.programs = rawSheets.Programs.map((row, idx) => {
        const feats = row.features || row.Features;
        const acts = row.activities || row.Activities;
        
        return {
          id: row.id || row.Id || `prog-${idx}`,
          title: row.title || row.Title,
          age: row.age || row.Age,
          tagline: row.tagline || row.Tagline || '',
          description: row.description || row.Description || '',
          accentColor: row.accentColor || row.AccentColor || '#541221',
          lightBg: row.lightBg || row.LightBg || '#F6F1E9',
          image: optimizeCloudinaryUrl(row.image || row.Image || getProgramFallbackImage(row.id || row.Id || `prog-${idx}`)),
          learningMethod: row.learningMethod || row.LearningMethod || '',
          features: typeof feats === 'string' 
            ? feats.split(';').map(f => f.trim()).filter(Boolean)
            : Array.isArray(feats) ? feats : [],
          activities: typeof acts === 'string'
            ? acts.split(';').map(a => a.trim()).filter(Boolean)
            : Array.isArray(acts) ? acts : []
        };
      });
    }

    // 3. Process Activities
    if (rawSheets.Activities && Array.isArray(rawSheets.Activities)) {
      processed.activities = rawSheets.Activities.map((row, idx) => ({
        id: row.id || row.Id || `act-${idx}`,
        title: row.title || row.Title,
        category: row.category || row.Category || 'General',
        description: row.description || row.Description || '',
        icon: row.icon || row.Icon || 'Sparkles',
        color: row.color || row.Color || '#541221',
        bgSoft: row.bgSoft || row.BgSoft || '#F6F1E9',
        details: row.details || row.Details || '',
        schedule: row.schedule || row.Schedule || ''
      }));
    }

    // 4. Process Testimonials
    if (rawSheets.Testimonials && Array.isArray(rawSheets.Testimonials)) {
      processed.testimonials = rawSheets.Testimonials.map((row, idx) => ({
        id: parseInt(row.id || row.Id || idx + 1),
        author: row.author || row.Author || 'Parent Reviewer',
        childName: row.childName || row.ChildName || '',
        quote: row.quote || row.Quote || row.review || row.Review || '',
        rating: parseInt(row.rating || row.Rating || 5),
        avatar: optimizeCloudinaryUrl(row.avatar || row.Avatar || FALLBACK_IMAGES.testimonial)
      }));
    }

    // 5. Process Gallery
    if (rawSheets.Gallery && Array.isArray(rawSheets.Gallery)) {
      processed.gallery = rawSheets.Gallery.map((row, idx) => ({
        id: parseInt(row.id || row.Id || idx + 1),
        title: row.title || row.Title || '',
        category: row.category || row.Category || 'Campus',
        url: optimizeCloudinaryUrl(row.url || row.Url || row.image || row.Image || FALLBACK_IMAGES.gallery),
        sizeClass: row.sizeClass || row.SizeClass || ''
      }));
    }

    // 6. Process Admissions
    if (rawSheets.Admissions && Array.isArray(rawSheets.Admissions)) {
      processed.admissions = rawSheets.Admissions.map(row => ({
        type: row.type || row.Type || 'step',
        itemTitle: row.itemTitle || row.ItemTitle || '',
        itemDescription: row.itemDescription || row.ItemDescription || ''
      }));
    }

    // 7. Process Teachers
    if (rawSheets.Teachers && Array.isArray(rawSheets.Teachers)) {
      processed.teachers = rawSheets.Teachers.map((row, idx) => ({
        id: parseInt(row.id || row.Id || idx + 1),
        name: row.name || row.Name || '',
        role: row.role || row.Role || '',
        experience: row.experience || row.Experience || '',
        bio: row.bio || row.Bio || '',
        avatar: optimizeCloudinaryUrl(row.avatar || row.Avatar || FALLBACK_IMAGES.teacher)
      }));
    }

    // 8. Process Routine
    if (rawSheets.Routine && Array.isArray(rawSheets.Routine)) {
      processed.routine = rawSheets.Routine.map(row => ({
        time: row.time || row.Time || '',
        title: row.title || row.Title || '',
        description: row.description || row.Description || '',
        color: row.color || row.Color || '#541221',
        icon: row.icon || row.Icon || 'Clock'
      }));
    }

    // 9. Process Events
    if (rawSheets.Events && Array.isArray(rawSheets.Events)) {
      processed.events = rawSheets.Events.map((row, idx) => ({
        id: parseInt(row.id || row.Id || idx + 1),
        title: row.title || row.Title || '',
        date: row.date || row.Date || '',
        time: row.time || row.Time || '',
        theme: row.theme || row.Theme || '',
        color: row.color || row.Color || '#8A4FFF',
        image: optimizeCloudinaryUrl(row.image || row.Image || FALLBACK_IMAGES.program),
        description: row.description || row.Description || ''
      }));
    }

    return processed;
  };

  // The SWR Synchronization logic
  const synchronizeCMS = async (force = false) => {
    if (force) {
      setRefreshing(true);
    }

    try {
      console.log('[CMS Provider] Fetching dynamic content from Google Sheets API...');
      const rawData = await fetchCMSData();
      const cleanData = processCMSResponse(rawData);

      // Cache Version invalidation triggers
      const currentVersion = schoolInfo.siteVersion || "1.0.0";
      const fetchedVersion = cleanData.schoolInfo?.siteVersion || cleanData.schoolInfo?.siteversion || "1.0.0";

      if (fetchedVersion !== currentVersion) {
        console.log(`[CMS Provider] Version shift detected (Current: ${currentVersion} -> Fetched: ${fetchedVersion}). Invalidating local storage cache.`);
      }

      // SWR state mapping with robust empty check fallbacks
      if (cleanData.schoolInfo) setSchoolInfo(cleanData.schoolInfo);
      
      if (cleanData.programs && cleanData.programs.length > 0) {
        setPrograms(cleanData.programs);
      } else {
        setPrograms(programsData);
      }

      if (cleanData.activities && cleanData.activities.length > 0) {
        setActivities(cleanData.activities);
      } else {
        setActivities(activitiesData);
      }

      if (cleanData.testimonials && cleanData.testimonials.length > 0) {
        setTestimonials(cleanData.testimonials);
      } else {
        setTestimonials(testimonialsData);
      }

      if (cleanData.gallery && cleanData.gallery.length > 0) {
        setGallery(cleanData.gallery);
      } else {
        setGallery(galleryFallbackPhotos);
      }

      if (cleanData.admissions && cleanData.admissions.length > 0) {
        setAdmissions(cleanData.admissions);
      } else {
        setAdmissions(admissionsFallback);
      }

      if (cleanData.teachers && cleanData.teachers.length > 0) {
        setTeachers(cleanData.teachers);
      } else {
        setTeachers(teachersData);
      }

      if (cleanData.routine && cleanData.routine.length > 0) {
        setRoutine(cleanData.routine);
      } else {
        setRoutine(routineData);
      }

      if (cleanData.events && cleanData.events.length > 0) {
        setEvents(cleanData.events);
      } else {
        setEvents(eventsData);
      }

      const syncTimestamp = Date.now();
      setLastUpdated(syncTimestamp);
      setError(null);

      // Save complete dataset to LocalStorage cache
      const cacheObj = {
        timestamp: syncTimestamp,
        data: cleanData
      };
      localStorage.setItem('kol_cms_cache', JSON.stringify(cacheObj));
      console.log('[CMS Provider] Cache updated successfully at:', new Date(syncTimestamp).toLocaleTimeString());
    } catch (err) {
      // Offline fallback safety checks
      console.warn('[CMS Provider] Sheets API connection failed. Continuing to display offline cached values.', err);
      setError('CMS sync failed. Showing offline cached or fallback content.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  useEffect(() => {
    // 1. Check for offline cached values instantly
    const cacheStr = localStorage.getItem('kol_cms_cache');
    let shouldFetch = true;
    let cacheTime = null;

    if (cacheStr) {
      try {
        const cache = JSON.parse(cacheStr);
        if (cache && cache.data && cache.timestamp) {
          console.log('[CMS Provider] Offline cache found, painting view immediately.');
          
          if (cache.data.schoolInfo) setSchoolInfo(cache.data.schoolInfo);
          
          if (cache.data.programs && cache.data.programs.length > 0) {
            setPrograms(cache.data.programs);
          } else {
            setPrograms(programsData);
          }

          if (cache.data.activities && cache.data.activities.length > 0) {
            setActivities(cache.data.activities);
          } else {
            setActivities(activitiesData);
          }

          if (cache.data.testimonials && cache.data.testimonials.length > 0) {
            setTestimonials(cache.data.testimonials);
          } else {
            setTestimonials(testimonialsData);
          }

          if (cache.data.gallery && cache.data.gallery.length > 0) {
            setGallery(cache.data.gallery);
          } else {
            setGallery(galleryFallbackPhotos);
          }

          if (cache.data.admissions && cache.data.admissions.length > 0) {
            setAdmissions(cache.data.admissions);
          } else {
            setAdmissions(admissionsFallback);
          }

          if (cache.data.teachers && cache.data.teachers.length > 0) {
            setTeachers(cache.data.teachers);
          } else {
            setTeachers(teachersData);
          }

          if (cache.data.routine && cache.data.routine.length > 0) {
            setRoutine(cache.data.routine);
          } else {
            setRoutine(routineData);
          }

          if (cache.data.events && cache.data.events.length > 0) {
            setEvents(cache.data.events);
          } else {
            setEvents(eventsData);
          }

          cacheTime = cache.timestamp;
          setLastUpdated(cacheTime);
          setLoading(false); // Instantly bypass loading state!

          // Check if cache has expired
          const elapsed = Date.now() - cacheTime;
          if (elapsed < CACHE_COOLDOWN_MS) {
            shouldFetch = false;
            console.log('[CMS Provider] Cache is fresh. Bypassing network revalidation.');
          } else {
            console.log('[CMS Provider] Cache expired. Running silent background revalidation.');
          }
        }
      } catch (e) {
        console.error('[CMS Provider] Error parsing localStorage cache:', e);
      }
    }

    if (shouldFetch) {
      synchronizeCMS();
    }
  }, []);

  const value = {
    schoolInfo,
    programs,
    activities,
    testimonials,
    gallery,
    admissions,
    teachers,
    routine,
    events,
    loading,
    refreshing,
    error,
    lastUpdated,
    forceRefresh: () => synchronizeCMS(true)
  };

  return (
    <CMSContext.Provider value={value}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
