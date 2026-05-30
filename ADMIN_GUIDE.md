# 🏛️ Administrator Hand-Off & CMS Management Guide
## Kingdom of Learning Pre School — Premium No-Backend CMS Platform

Welcome to your new premium, installable, luxury preschool digital platform! This guide equips your school administration, teachers, and developers to manage, edit, and maintain the website effortlessly without editing a single line of code.

The website is powered entirely by a **React frontend** that synchronizes dynamically with a **Google Spreadsheet** using **Google Apps Script**.

---

## 📅 1. How to Update Content (Google Sheets)

Every page segment maps directly to a spreadsheet tab inside your Google Sheet. Making updates is as simple as typing inside cells and refreshing the browser page!

### Tab Directory

#### 1. `SchoolInfo` (Core School Timings & Contact Details)
This tab operates on a **Key-Value structure** (Column A contains the identifier, Column B contains your text):
*   `schoolName`: The official preschool name.
*   `phone`: Mapped directly to headers, footers, and admissions hotlines.
*   `whatsapp`: The direct number loaded in the floating green chat widget.
*   `email` / `altEmail`: Admin inbox addresses.
*   `address`: Appears on page contacts and footer blocks.
*   `admissionsNotice`: Displayed in highlighted banners and admissions checkpoints.
*   `toddcareTimings` / `nurseryKGTimings`: Timings loaded in timelines and footers.
*   `mapEmbedUrl`: Your Google Maps Embed source code link.

#### 2. `Programs` (Toddcare, Nursery, LKG, UKG)
*   **Editing Features & Activities:** Features and Activities list items are stored as **semicolon-separated strings** (e.g., `Sensory exploration; Motor skills; Phonics; Story hour`). The frontend automatically splits these and compiles elegant checkmark bullets on-the-fly!
*   **Image formatting:** Paste optimized Cloudinary links or public web URLs.

#### 3. `Activities` (Outlined Curriculum Blocks)
*   Define the learning focus (e.g., Art, Phonics, Rhythm & Movement) with descriptive summaries and category selectors ("Creative", "Physical", "Cognitive", "Social").

#### 4. `Testimonials` (Parent Reviews)
*   Easily manage glowing parent reviews. The rating column (value from `1` to `5`) dynamically compiles gold stars on the testimonials section carousel.

#### 5. `Gallery` (Photo Mosaic Collage)
*   **Visual Grid Adjustments:** Set the `sizeClass` column to `wide` or `tall` to dynamically skew photo cards in a beautiful staggered masonry grid layout. Leave empty for standard 1:1 squares.

---

## 🖼️ 2. Media Hosting & Cloudinary Folder Automation

To maintain a crisp, fast, and beautiful luxury feel, we highly recommend utilizing **Cloudinary** (a free cloud image host) to store and serve high-resolution photos:

### Smart CDN Optimization & Auto-Compression
The frontend is equipped with an automatic asset optimizer! Any Cloudinary URL pasted in the sheets automatically appends `f_auto,q_auto` compression parameters in the background, minimizing data sizes and guaranteeing sub-second load times on mobile devices.

### Dynamic Branding Watermarks (Optional)
To protect your preschool assets from unauthorized duplication, you can activate dynamic watermarking! 
*   Open the file `src/config/cms.js` on your codebase and toggle the `ENABLE_GALLERY_WATERMARK` parameter to `true`.
*   This will automatically instruct Cloudinary to dynamically overlay a beautiful, translucent, light white *Kingdom of Learning* Playfair Display text watermark in the bottom right corner of all your gallery images on-the-fly.

### Recommended Folder Structure
For clean organization, group your photos into folders inside Cloudinary:
*   `gallery/` - High-resolution moments for the Photo Album tab.
*   `teachers/` - Clean headshots for Mrs. Komal Singh and the guide roster.
*   `programs/` - Illustrative icons or child activity photos for class cards.
*   `events/` - Banners for upcoming stage festivals and holidays.

---

## 🛡️ 3. Inquiry Logging & Smart Classification

When a parent fills out the **Admissions Enrollment Form** or the **Contact Message Form**:

1.  **Spreadsheet Logging:** Inquiries are appended instantly inside the `AdmissionsForm` and `ContactForm` tabs.
2.  **Leading Zeros Protection:** Phone numbers are prefixed with `'` automatically, instructing Google Sheets to retain leading zeros rather than stripping them as integers.
3.  **Spam Protection:** Off-screen Honeypot input fields intercept spam bots and drop malicious payloads silently without disturbing operations.
4.  **Operational Priority Labeling:** The system parses messages for urgent keywords (`urgent`, `callback`, `emergency`, `fee structure`) and classifies entries under a dedicated **Priority** column:
    *   🔴 `URGENT (Callback Request)` (Keywords triggered)
    *   🟡 `HIGH (Enrollment)` (All direct admissions inquiries)
    *   🟢 `MEDIUM` (General messages)
5.  **Lightweight CRM Status Dropdowns:** New inquiries are automatically assigned a **Status** value of `"New"`. Administrators can click this cell and use a Google Sheets **Data Validation dropdown** (supporting tags like `New`, `Contacted`, `Follow-up`, `Converted`) to track progress directly within the spreadsheet. This turns your Google Sheet into a fully-functional lightweight CRM!

---

## 📧 4. Apps Script Setup & Automations

To activate the real-time form logging, email notifications, and automated backups:

### 1. Web App API Deployment
1.  Open your Google Sheet -> Click **Extensions** -> **Apps Script**.
2.  Clear the editor, paste the contents of your [google-apps-script.js](file:///c:/Users/Takemichi/Desktop/kingdom-of-planet-school/public/google-apps-script.js) file, and click save.
3.  Click **Deploy** (top right) -> **New deployment**.
4.  Click the Selector gear -> Select **Web app**.
5.  Set Description: `KOL Preschool CMS Platform`
6.  Set **Execute as**: `Me (your-email@gmail.com)`
7.  Set **Who has access**: `Anyone`
8.  Click **Deploy**, authorize requested permissions, copy your generated **Web App URL**, and paste it into your host configurations or frontend environment file (`VITE_CMS_API`).

### 2. Time-Triggered Automated Midnight Backups
To activate the daily midnight backup utility:
1.  Inside your Google Apps Script editor, click the **Triggers icon** (represented by a Clock ⏰ on the left navigation sidebar).
2.  Click **Add Trigger** (bottom right).
3.  Set "Choose function to run": `createDailyBackup`.
4.  Set "Select event source": `Time-driven`.
5.  Set "Select type of time based trigger": `Daily timer`.
6.  Set "Select hour interval": `Midnight to 1 AM`.
7.  Click **Save**. Your sheet will now back up itself daily and store the hidden sheets automatically.

---

## 🛜 5. Offline Shell & PWA Mobile Installation

Your preschool platform is structured as an **installable Progressive Web App (PWA)**:
*   **How to Install on iOS (iPhone/iPad):** Open the website in Safari -> Click the **Share** button -> Tap **"Add to Home Screen"**. The platform will launch as a standalone app, complete with custom status bar styles and startup splash screens!
*   **How to Install on Android/Chrome:** Click the **Install Shortcut** button inside the browser search bar.
*   **Offline Resiliency:** The platform is equipped with an active service worker caching key assets (`sw.js`). If a parent loses internet connectivity, the site will still load a beautiful offline shell, allowing them to browse cached content.

---

## 📊 6. Lightweight Heartbeat Status Check

To check the operational health of your CMS integrations and backup states:
*   Simply open your browser and fetch your API web app URL with the `action=status` parameter:
    `https://script.google.com/macros/s/.../exec?action=status`
*   The API will return a beautiful live JSON health report indicating:
    ```json
    {
      "status": "healthy",
      "timestamp": "5/30/2026, 6:42:00 PM",
      "apiVersion": "2.0.0-Diagnostics",
      "spreadsheetName": "Kingdom of Learning Database",
      "totals": {
        "admissionsCount": 142,
        "contactsCount": 89,
        "whatsappClicks": 341
      },
      "lastBackupDate": "2026-05-30"
    }
    ```
    This heartbeat dashboard helps you maintain confidence that your no-backend platform is performing flawlessly!

---

## 📥 7. Exporting Inquiries (PDF & CSV)

As an administrator, you can export your logs and analytics at any time for offline reports, legal records, or local database imports:

### Exporting as PDF
1.  Open your Google Sheet and click the target tab (e.g., `AdmissionsForm`).
2.  Click **File** -> **Print** (or press `Ctrl + P`).
3.  Under the Print Settings pane on the right:
    *   Set **Print** to `Current sheet`.
    *   Set **Paper size** to `A4` or `Letter`.
    *   Set **Page orientation** to `Landscape` (highly recommended for tabular rows!).
    *   Set **Scale** to `Fit to width`.
4.  Click **Next** (top right) and choose **Save as PDF** in your local operating system print dialog.

### Exporting as CSV
1.  Open your Google Sheet and select the target tab.
2.  Click **File** -> **Download** -> **Comma Separated Values (.csv)**.
3.  This exports a clean comma-delimited data spreadsheet file that can be opened instantly in Microsoft Excel, Apple Numbers, or imported into third-party school software!

