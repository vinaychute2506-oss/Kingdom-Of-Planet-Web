/**
 * Kingdom of Learning Pre School — Multi-Language i18n Translation Dictionary
 * Mapped ready for future scaling (English & Hindi support)
 */

export const TRANSLATIONS = {
  en: {
    welcome_tagline: "A Kingdom Where Learning Comes Alive",
    explore_classes: "Explore Classes",
    campus_tour: "Campus Tour",
    years_legacy: "Years Legacy",
    certified_guides: "Certified Certified Guides",
    attention: "Holistic Attention",
    contact_admissions: "Contact Admissions",
    admissions_hotline: "Admissions Hotline",
    school_location: "School Sanctuary Location",
    school_timings: "School Operating Timings",
    write_to_us: "Write to Us",
    send_message: "Send Direct Message",
    form_parent_name: "Parent's Full Name *",
    form_phone: "Phone Number *",
    form_email: "Email Address",
    form_message: "Your Message *",
    admissions_notice: "Enrollment Notice",
    force_sync: "Sync CMS Data"
  },
  hi: {
    welcome_tagline: "एक साम्राज्य जहाँ सीखना जीवंत हो उठता है",
    explore_classes: "कक्षाएं देखें",
    campus_tour: "कैंपस यात्रा",
    years_legacy: "वर्षों की विरासत",
    certified_guides: "प्रमाणित शिक्षक",
    attention: "व्यक्तिगत ध्यान",
    contact_admissions: "प्रवेश संपर्क",
    admissions_hotline: "प्रवेश हॉटलाइन",
    school_location: "स्कूल का पता",
    school_timings: "स्कूल का समय",
    write_to_us: "हमें लिखें",
    send_message: "सीधा संदेश भेजें",
    form_parent_name: "अभिभावक का पूरा नाम *",
    form_phone: "फ़ोन नंबर *",
    form_email: "ईमेल पता",
    form_message: "आपका संदेश *",
    admissions_notice: "प्रवेश सूचना",
    force_sync: "डेटा सिंक करें"
  }
};

/**
 * Lightweight hook translation compiler utility
 * 
 * @param {string} key - Translation identifier 
 * @param {string} [locale='en'] - Currently selected locale ('en' | 'hi')
 * @returns {string} - Compiled localized string, or key fallback if missing
 */
export const translate = (key, locale = 'en') => {
  const dictionary = TRANSLATIONS[locale] || TRANSLATIONS.en;
  return dictionary[key] || key;
};
