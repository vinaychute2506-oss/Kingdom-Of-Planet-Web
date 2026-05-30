/**
 * KINGDOM OF LEARNING PRE SCHOOL — NO-BACKEND DYNAMIC CMS API, ANALYTICS & DIAGNOSTICS PLATFORM
 * 
 * INSTRUCTIONS FOR DEPLOYMENT:
 * 1. Open Google Sheets (create a sheet with SchoolInfo, Programs, Activities, Testimonials, Gallery, Admissions, Teachers, Routine, AdmissionsForm, ContactForm tabs).
 * 2. Click "Extensions" -> "Apps Script".
 * 3. Delete any code in the editor, paste this entire script, and click save.
 * 4. Click "Deploy" (top right) -> "New deployment".
 * 5. Under select type, click the Gear icon and choose "Web app".
 * 6. Set Description: "KOL Preschool CMS API with Analytics & Diagnostics"
 * 7. Set "Execute as": "Me (your-email@gmail.com)"
 * 8. Set "Who has access": "Anyone"
 * 9. Click "Deploy". Authorize any requested permissions.
 * 10. Copy the generated "Web app URL" and paste it in your React project's .env file as VITE_CMS_API.
 * 11. Optional Daily Backup setup: In Apps Script, click the Triggers icon (clock on the left), click "Add Trigger", set function to run: "createDailyBackup", type: "Time-driven", timer: "Daily timer", time: "Midnight to 1 AM".
 */

function doGet(e) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // ==========================================
  // LIGHTWEIGHT HEARTBEAT & DIAGNOSTICS MONITOR
  // ==========================================
  if (e && e.parameter && e.parameter.action === "status") {
    var diagnostic = {
      status: "healthy",
      timestamp: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      apiVersion: "2.0.0-Diagnostics",
      spreadsheetName: spreadsheet.getName(),
      sheets: [],
      totals: {
        admissionsCount: 0,
        contactsCount: 0,
        whatsappClicks: 0
      },
      lastBackupDate: "No Backup Triggered"
    };

    var allSheets = spreadsheet.getSheets();
    for (var idx = 0; idx < allSheets.length; idx++) {
      var sName = allSheets[idx].getName();
      diagnostic.sheets.push(sName);
      
      if (sName === "AdmissionsForm") {
        diagnostic.totals.admissionsCount = Math.max(0, allSheets[idx].getLastRow() - 1);
      } else if (sName === "ContactForm") {
        diagnostic.totals.contactsCount = Math.max(0, allSheets[idx].getLastRow() - 1);
      } else if (sName === "AnalyticsDashboard") {
        var dashData = allSheets[idx].getDataRange().getValues();
        for (var rIdx = 1; rIdx < dashData.length; rIdx++) {
          if (dashData[rIdx][0] === "Total WhatsApp Clicks") {
            diagnostic.totals.whatsappClicks = Number(dashData[rIdx][1]) || 0;
            break;
          }
        }
      } else if (sName.indexOf("Backup_") === 0) {
        // Extract date from name e.g., Backup_AdmissionsForm_2026_05_30
        var parts = sName.split("_");
        if (parts.length >= 4) {
          diagnostic.lastBackupDate = parts.slice(-3).join("-");
        }
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", diagnostics: diagnostic }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  }

  // Standard CMS Content retrieval
  var result = {};
  var sheets = spreadsheet.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var sheetName = sheets[i].getName();
    
    // Skip lead storage, diagnostics and analytics sheets from GET reading
    if (sheetName === "AdmissionsForm" || sheetName === "ContactForm" || sheetName === "AnalyticsDashboard" || sheetName.indexOf("Backup_") === 0) {
      continue;
    }
    
    result[sheetName] = getSheetData(sheets[i]);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ status: "success", data: result }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
}

function doPost(e) {
  // Handle CORS preflight options gracefully
  if (e === undefined) {
    return ContentService.createTextOutput(JSON.stringify({ status: "preflight" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  }
  
  try {
    var params = {};
    if (e.postData && e.postData.contents) {
      params = JSON.parse(e.postData.contents);
    } else {
      params = e.parameter;
    }
    
    var formType = params.formType || "contact"; // "admission", "contact", or "analytics"
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // ==========================================
    // BRANDED WEB ENGAGEMENT ANALYTICS TRACKING
    // ==========================================
    if (formType === "analytics") {
      var metricName = params.metric || "WhatsAppClick";
      var dashboardSheet = spreadsheet.getSheetByName("AnalyticsDashboard");
      
      // Auto initialize Analytics sheet if not present
      if (!dashboardSheet) {
        dashboardSheet = spreadsheet.insertSheet("AnalyticsDashboard");
        dashboardSheet.appendRow(["Metric Name", "Value", "Description", "Last Updated"]);
        dashboardSheet.appendRow(["Total Admissions Inquiries", "=COUNTA(AdmissionsForm!A:A)-1", "Formula counting AdmissionsForm rows", new Date()]);
        dashboardSheet.appendRow(["Total Contact Messages", "=COUNTA(ContactForm!A:A)-1", "Formula counting ContactForm rows", new Date()]);
        dashboardSheet.appendRow(["Total WhatsApp Clicks", 0, "Counter logging direct clicks on WhatsApp", new Date()]);
        dashboardSheet.getRange("A1:D1").setFontWeight("bold").setBackground("#6B1E2E").setFontColor("#FFFFFF");
        dashboardSheet.setColumnWidth(1, 240);
        dashboardSheet.setColumnWidth(2, 100);
        dashboardSheet.setColumnWidth(3, 300);
        dashboardSheet.setColumnWidth(4, 180);
      }
      
      // Find and increment target metric (e.g. WhatsApp clicks)
      var dashboardData = dashboardSheet.getDataRange().getValues();
      var found = false;
      for (var idx = 1; idx < dashboardData.length; idx++) {
        if (dashboardData[idx][0] === "Total WhatsApp Clicks" && metricName === "WhatsAppClick") {
          var currentVal = Number(dashboardData[idx][1]) || 0;
          dashboardSheet.getRange(idx + 1, 2).setValue(currentVal + 1);
          dashboardSheet.getRange(idx + 1, 4).setValue(new Date());
          found = true;
          break;
        }
      }
      
      if (!found && metricName === "WhatsAppClick") {
        dashboardSheet.appendRow(["Total WhatsApp Clicks", 1, "Counter logging direct clicks on WhatsApp", new Date()]);
      }
      
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Metric tracked" }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeader("Access-Control-Allow-Origin", "*");
    }
    
    // ==========================================
    // LEAD CAPTURE SYSTEM & INQUIRY CLASSIFICATION
    // ==========================================
    var targetSheetName = formType === "admission" ? "AdmissionsForm" : "ContactForm";
    var sheet = spreadsheet.getSheetByName(targetSheetName);
    
    // Create tab dynamically if not exists (including operational Priority column)
    if (!sheet) {
      sheet = spreadsheet.insertSheet(targetSheetName);
      var headers = formType === "admission"
        ? ["Timestamp", "Priority", "Parent Name", "Child Name", "Phone", "Email", "Program/Grade", "Message"]
        : ["Timestamp", "Priority", "Parent Name", "Phone", "Email", "Message"];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#6B1E2E").setFontColor("#FFFFFF");
    }
    
    // Dynamic Inquiry Priority Classification Engine
    var priority = "MEDIUM";
    var urgentKeywords = ["urgent", "asap", "emergency", "call back", "callback", "immediate", "soon", "important", "critical", "contact me", "fee structure", "admission fee"];
    var msg = (params.message || "").toLowerCase();
    
    if (formType === "admission") {
      priority = "HIGH (Enrollment)";
    }
    for (var kIdx = 0; kIdx < urgentKeywords.length; kIdx++) {
      if (msg.indexOf(urgentKeywords[kIdx]) !== -1) {
        priority = "URGENT (Callback Request)";
        break;
      }
    }

    var row = [];
    var timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    
    if (formType === "admission") {
      row = [
        timestamp,
        priority,
        params.parentName || "",
        params.childName || "",
        "'" + (params.phone || ""), // Prefix with ' to force spreadsheet text formatting (prevents losing leading 0)
        params.email || "",
        params.grade || params.program || "",
        params.message || ""
      ];
    } else {
      row = [
        timestamp,
        priority,
        params.parentName || params.name || "",
        "'" + (params.phone || ""),
        params.email || "",
        params.message || ""
      ];
    }
    
    sheet.appendRow(row);
    
    // ==========================================
    // PREMIUM EMAIL AUTOMATION (Branded & HTML-Styled)
    // ==========================================
    try {
      var adminEmail = "singh.komal.tvf@gmail.com"; // Principal's fallback email
      var schoolInfoSheet = spreadsheet.getSheetByName("SchoolInfo");
      if (schoolInfoSheet) {
        var infoData = schoolInfoSheet.getDataRange().getValues();
        for (var idx = 1; idx < infoData.length; idx++) {
          var k = infoData[idx][0];
          var v = infoData[idx][1];
          if (k === "altEmail" || k === "email") {
            adminEmail = v;
            break;
          }
        }
      }

      var subject = formType === "admission"
        ? "[" + priority + "] ⭐ Admission Inquiry: " + (params.childName || "New Child") + " (" + (params.grade || "Preschool") + ")"
        : "[" + priority + "] ✉️ Admissions Direct Message from " + (params.parentName || "Parent");

      var sheetUrl = spreadsheet.getUrl();

      // HTML Notice for Principal Mrs. Komal Singh
      var adminHtml = '<div style="background-color: #FAF6EE; padding: 40px 20px; font-family: \'Georgia\', serif; color: #3A2F2B;">' +
        '<div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 20px; box-shadow: 0 10px 30px rgba(58, 47, 43, 0.05); overflow: hidden; border: 1px solid #EADFCF;">' +
        '<div style="background-color: #6B1E2E; padding: 30px; text-align: center; border-bottom: 3px solid #C8B39A;">' +
        '<h1 style="color: #FFFFFF; font-size: 22px; margin: 0; font-family: \'Playfair Display\', \'Georgia\', serif; font-weight: normal; letter-spacing: 1px;">New Parent Inquiry Registered</h1>' +
        '</div>' +
        '<div style="padding: 35px 30px; font-family: \'Helvetica Neue\', \'Arial\', sans-serif; font-size: 15px; line-height: 1.6;">' +
        '<p>Dear Principal Mrs. Komal Singh,</p>' +
        '<p>A new visitor has submitted an inquiry on the <strong>Kingdom of Learning Pre School</strong> platform. Here are the logged details:</p>' +
        '<div style="background-color: #F6F1E9; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #EADFCF;">' +
        '<table style="width: 100%; border-collapse: collapse; font-size: 14px;">' +
        '<tr><td style="padding: 8px 0; color: #7E6F6A; border-bottom: 1px solid rgba(58,47,43,0.05); width: 40%;"><strong>Form Source:</strong></td><td style="padding: 8px 0; color: #6B1E2E; border-bottom: 1px solid rgba(58,47,43,0.05);"><strong>' + (formType === "admission" ? "Admissions Enrollment Form" : "Contact Message Form") + '</strong></td></tr>' +
        '<tr><td style="padding: 8px 0; color: #7E6F6A; border-bottom: 1px solid rgba(58,47,43,0.05);"><strong>Operational Priority:</strong></td><td style="padding: 8px 0; color: ' + (priority.indexOf("URGENT") === 0 ? "#FF3B30" : "#6B1E2E") + '; border-bottom: 1px solid rgba(58,47,43,0.05);"><strong>' + priority + '</strong></td></tr>' +
        '<tr><td style="padding: 8px 0; color: #7E6F6A; border-bottom: 1px solid rgba(58,47,43,0.05);"><strong>Parent Name:</strong></td><td style="padding: 8px 0; color: #3A2F2B; border-bottom: 1px solid rgba(58,47,43,0.05);">' + (params.parentName || params.name || "N/A") + '</td></tr>' +
        (formType === "admission" ? '<tr><td style="padding: 8px 0; color: #7E6F6A; border-bottom: 1px solid rgba(58,47,43,0.05);"><strong>Child Name:</strong></td><td style="padding: 8px 0; color: #3A2F2B; border-bottom: 1px solid rgba(58,47,43,0.05);">' + (params.childName || "N/A") + '</td></tr>' +
        '<tr><td style="padding: 8px 0; color: #7E6F6A; border-bottom: 1px solid rgba(58,47,43,0.05);"><strong>Class Program:</strong></td><td style="padding: 8px 0; color: #3A2F2B; border-bottom: 1px solid rgba(58,47,43,0.05);">' + (params.grade || "N/A") + '</td></tr>' : '') +
        '<tr><td style="padding: 8px 0; color: #7E6F6A; border-bottom: 1px solid rgba(58,47,43,0.05);"><strong>Phone Number:</strong></td><td style="padding: 8px 0; color: #3A2F2B; border-bottom: 1px solid rgba(58,47,43,0.05);">' + (params.phone || "N/A") + '</td></tr>' +
        '<tr><td style="padding: 8px 0; color: #7E6F6A; border-bottom: 1px solid rgba(58,47,43,0.05);"><strong>Email Address:</strong></td><td style="padding: 8px 0; color: #3A2F2B; border-bottom: 1px solid rgba(58,47,43,0.05);">' + (params.email || "N/A") + '</td></tr>' +
        '<tr><td style="padding: 8px 0; color: #7E6F6A; vertical-align: top;"><strong>Message/Notes:</strong></td><td style="padding: 8px 0; color: #3A2F2B; white-space: pre-wrap;">' + (params.message || "None") + '</td></tr>' +
        '</table>' +
        '</div>' +
        '<p style="font-size: 13px; color: #7E6F6A;">The entry has been successfully logged inside your Google Sheet under the log tab <strong>' + targetSheetName + '</strong> with timestamp <strong>' + timestamp + '</strong>.</p>' +
        '<div style="text-align: center; margin: 35px 0 10px 0;">' +
        '<a href="' + sheetUrl + '" style="background-color: #6B1E2E; color: #FFFFFF; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 10px rgba(107,30,46,0.1);">Open Google Sheet Logs</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

      // Dispatch notice email to School Admin/Principal
      MailApp.sendEmail({
        to: adminEmail,
        subject: subject,
        htmlBody: adminHtml
      });

      // 2. Dispatch gorgeous, styled, trustworthy HTML receipt email to Parent
      if (params.email) {
        var parentSubject = "We have received your enrollment inquiry! — Kingdom of Learning";
        
        var parentHtml = '<div style="background-color: #F6F1E9; padding: 40px 20px; font-family: \'Georgia\', serif; color: #3A2F2B;">' +
          '<div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 20px; box-shadow: 0 10px 30px rgba(58, 47, 43, 0.05); overflow: hidden; border: 1px solid #EADFCF;">' +
          
          '<!-- Header Banner -->' +
          '<div style="background-color: #6B1E2E; padding: 40px 20px; text-align: center; border-bottom: 3px solid #C8B39A;">' +
          '<h1 style="color: #FFFFFF; font-size: 24px; margin: 0 0 10px 0; font-family: \'Playfair Display\', \'Georgia\', serif; font-weight: normal; letter-spacing: 1px;">Kingdom of Learning</h1>' +
          '<p style="color: #C8B39A; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 2px;">Warmth &bull; Creativity &bull; Trust</p>' +
          '</div>' +
          
          '<!-- Body Content -->' +
          '<div style="padding: 40px 30px; font-family: \'Helvetica Neue\', \'Arial\', sans-serif; font-size: 15px; line-height: 1.6; color: #3A2F2B;">' +
          '<h2 style="font-family: \'Playfair Display\', \'Georgia\', serif; color: #6B1E2E; font-size: 20px; font-weight: normal; margin-top: 0; margin-bottom: 20px;">Welcome to Our Learning Family!</h2>' +
          '<p>Dear ' + (params.parentName || "Parent") + ',</p>' +
          '<p>Thank you for contacting <strong>Kingdom of Learning Pre School</strong>. We are absolutely thrilled at the prospect of welcoming your child into our warm, nurturing, and activity-based learning sanctuary!</p>' +
          
          '<!-- Inquiry Card -->' +
          '<div style="background-color: #FAF6EE; border-left: 4px solid #6B1E2E; padding: 20px; margin: 30px 0; border-radius: 6px; border-top: 1px solid #EADFCF; border-right: 1px solid #EADFCF; border-bottom: 1px solid #EADFCF;">' +
          '<h3 style="font-family: \'Playfair Display\', \'Georgia\', serif; color: #6B1E2E; font-size: 15px; margin-top: 0; margin-bottom: 12px; border-bottom: 1px solid rgba(107, 30, 46, 0.1); padding-bottom: 5px;">Your Registered Inquiry Details</h3>' +
          '<table style="width: 100%; border-collapse: collapse; font-size: 14px;">' +
          '<tr><td style="padding: 6px 0; color: #7E6F6A; width: 40%;"><strong>Parent Name:</strong></td><td style="padding: 6px 0; color: #3A2F2B;">' + (params.parentName || params.name || "N/A") + '</td></tr>' +
          (formType === "admission" ? '<tr><td style="padding: 6px 0; color: #7E6F6A;"><strong>Child\'s Name:</strong></td><td style="padding: 6px 0; color: #3A2F2B;">' + (params.childName || "Your child") + '</td></tr>' +
          '<tr><td style="padding: 6px 0; color: #7E6F6A;"><strong>Requested Program:</strong></td><td style="padding: 6px 0; color: #3A2F2B;">' + (params.grade || "Preschool stage") + '</td></tr>' : '') +
          '<tr><td style="padding: 6px 0; color: #7E6F6A;"><strong>Contact Hotline:</strong></td><td style="padding: 6px 0; color: #3A2F2B;">' + (params.phone || "your phone") + '</td></tr>' +
          '</table>' +
          '</div>' +
          
          '<p>Our admissions coordinator is reviewing your details and will call you at <strong>' + (params.phone || "your number") + '</strong> shortly to answer your questions, outline fee structures, and arrange a secure, private campus visit to Shahpur Jat, Delhi.</p>' +
          
          '<div style="text-align: center; margin: 35px 0 25px 0;">' +
          '<a href="https://wa.me/919667708285?text=Hello!%20I%20just%20submitted%20my%20preschool%20enrollment%20inquiry%20form." style="background-color: #6B1E2E; color: #FFFFFF; text-decoration: none; padding: 14px 35px; border-radius: 30px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 10px rgba(107,30,46,0.15);">Speak Directly on WhatsApp</a>' +
          '</div>' +
          
          '<hr style="border: 0; border-top: 1px solid #EADFCF; margin: 35px 0 20px 0;" />' +
          
          '<!-- Principal Message -->' +
          '<table style="width: 100%; border-collapse: collapse; margin-top: 15px;">' +
          '<tr><td style="vertical-align: top;">' +
          '<p style="margin: 0; font-family: \'Playfair Display\', \'Georgia\', serif; font-size: 16px; color: #6B1E2E; font-style: italic; line-height: 1.5;">"Every child is born a learner. Our mission is to protect that spark with soft care, structured play, and a rich, beautiful environment."</p>' +
          '<p style="margin: 12px 0 0 0; font-size: 13px; color: #7E6F6A;"><strong>Mrs. Komal Singh</strong><br/>Principal & Founder, Kingdom of Learning</p>' +
          '</td></tr>' +
          '</table>' +
          '</div>' +
          
          '<!-- Footer -->' +
          '<div style="background-color: #521320; padding: 30px; text-align: center; font-size: 12px; color: #C8B39A; font-family: \'Helvetica Neue\', \'Arial\', sans-serif;">' +
          '<p style="margin: 0 0 8px 0; color: #FFFFFF; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Delhi Sanctuary Location</p>' +
          '<p style="margin: 0 0 20px 0; line-height: 1.4;">190-A, Ground Floor, Shahpur Jat, New Delhi - 110049<br/>Hotline: +91 9667708285 | Email: admin@kingdomoflearning.com</p>' +
          '<p style="margin: 0; border-top: 1px solid rgba(200, 179, 154, 0.2); padding-top: 15px; font-size: 11px;">&copy; 2026 Kingdom of Learning Pre School. All rights reserved.</p>' +
          '</div>' +
          
          '</div>' +
          '</div>';

        MailApp.sendEmail({
          to: params.email,
          subject: parentSubject,
          htmlBody: parentHtml
        });
      }
    } catch (emailErr) {
      Logger.log("Auto-Mailer failed: " + emailErr.toString());
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Form recorded successfully" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Headers", "Content-Type");
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  }
}

// Fetch row data into structured JSON objects
function getSheetData(sheet) {
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  
  var headers = data[0];
  var rows = [];
  
  for (var i = 1; i < data.length; i++) {
    var row = {};
    var hasContent = false;
    for (var j = 0; j < headers.length; j++) {
      var val = data[i][j];
      
      // Check if row actually has content (skip blank rows)
      if (val !== undefined && val !== null && val !== "") {
        hasContent = true;
      }
      row[headers[j]] = val;
    }
    if (hasContent) {
      rows.push(row);
    }
  }
  return rows;
}

/**
 * ==========================================
 * DAILY TIME-TRIGGERED AUTO BACKUP SYSTEM
 * ==========================================
 * Creates daily timestamped backups of the AdmissionsForm and ContactForm tabs
 * inside the active spreadsheet to prevent accidental data loss.
 */
function createDailyBackup() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var dateStr = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy_MM_dd");
  
  var forms = ["AdmissionsForm", "ContactForm"];
  for (var i = 0; i < forms.length; i++) {
    var sourceSheet = spreadsheet.getSheetByName(forms[i]);
    if (sourceSheet) {
      var backupName = "Backup_" + forms[i] + "_" + dateStr;
      
      // If backup sheet for today already exists, delete it first to avoid duplicates
      var oldBackup = spreadsheet.getSheetByName(backupName);
      if (oldBackup) {
        spreadsheet.deleteSheet(oldBackup);
      }
      
      // Clone sheet rows
      var backupSheet = sourceSheet.copyTo(spreadsheet);
      backupSheet.setName(backupName);
      
      // Hide backup sheet to keep client layout extremely clean and uncluttered
      backupSheet.hideSheet();
      
      Logger.log("Created backup sheet: " + backupName);
    }
  }
}
