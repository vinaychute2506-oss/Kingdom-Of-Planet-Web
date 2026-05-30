/**
 * KINGDOM OF LEARNING PRE SCHOOL — NO-BACKEND DYNAMIC CMS API
 * 
 * INSTRUCTIONS FOR DEPLOYMENT:
 * 1. Open Google Sheets (create a sheet with SchoolInfo, Programs, Activities, Testimonials, Gallery, Admissions, Teachers, Routine, AdmissionsForm, ContactForm tabs).
 * 2. Click "Extensions" -> "Apps Script".
 * 3. Delete any code in the editor, paste this entire script, and click save.
 * 4. Click "Deploy" (top right) -> "New deployment".
 * 5. Under select type, click the Gear icon and choose "Web app".
 * 6. Set Description: "KOL Preschool CMS API"
 * 7. Set "Execute as": "Me (your-email@gmail.com)"
 * 8. Set "Who has access": "Anyone"
 * 9. Click "Deploy". Authorize any requested permissions.
 * 10. Copy the generated "Web app URL" and paste it in your React project's .env file as VITE_CMS_API.
 */

function doGet(e) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var result = {};
  
  var sheets = spreadsheet.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var sheetName = sheets[i].getName();
    
    // Skip lead storage sheets from GET reading
    if (sheetName === "AdmissionsForm" || sheetName === "ContactForm") {
      continue;
    }
    
    result[sheetName] = getSheetData(sheets[i]);
  }
  
  // Format as JSON and allow cross-origin requests
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
    
    var formType = params.formType || "contact"; // "admission" or "contact"
    var targetSheetName = formType === "admission" ? "AdmissionsForm" : "ContactForm";
    
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(targetSheetName);
    
    // Create tab dynamically if not exists
    if (!sheet) {
      sheet = spreadsheet.insertSheet(targetSheetName);
      var headers = formType === "admission"
        ? ["Timestamp", "Parent Name", "Child Name", "Phone", "Email", "Program/Grade", "Message"]
        : ["Timestamp", "Parent Name", "Phone", "Email", "Message"];
      sheet.appendRow(headers);
    }
    
    var row = [];
    var timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    
    if (formType === "admission") {
      row = [
        timestamp,
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
        params.parentName || params.name || "",
        "'" + (params.phone || ""),
        params.email || "",
        params.message || ""
      ];
    }
    
    sheet.appendRow(row);
    
    // ==========================================
    // SUCCESS EMAIL AUTOMATION (Apps Script Trigger)
    // ==========================================
    try {
      // 1. Fetch school emails from SchoolInfo sheet if available
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
        ? "Admission Inquiry: " + (params.childName || "New Child") + " (" + (params.grade || "Preschool") + ")"
        : "Admissions Direct Message from " + (params.parentName || "Parent");

      var adminBody = "Dear Principal Mrs. Komal Singh,\n\n" +
        "A new parent inquiry has been registered on the website:\n\n" +
        "----------------------------------------\n" +
        "Form Type: " + (formType === "admission" ? "Admissions Enrollment Form" : "Contact Message Form") + "\n" +
        "Parent Name: " + (params.parentName || params.name || "N/A") + "\n" +
        (formType === "admission" ? "Child Name: " + (params.childName || "N/A") + "\n" : "") +
        "Phone Number: " + (params.phone || "N/A") + "\n" +
        "Email Address: " + (params.email || "N/A") + "\n" +
        (formType === "admission" ? "Class Program: " + (params.grade || "N/A") + "\n" : "") +
        "Message/Notes: " + (params.message || "None") + "\n" +
        "Timestamp: " + timestamp + "\n" +
        "----------------------------------------\n\n" +
        "Check your Google Sheet 'Kingdom of Learning Admissions' under the log tab '" + targetSheetName + "' to view full entries.\n\n" +
        "Warm regards,\n" +
        "KOL Digital System Auto-Mailer";

      // Dispatch notice email to School Admin/Principal
      MailApp.sendEmail(adminEmail, subject, adminBody);

      // 2. Dispatch receipt email to Parent
      if (params.email) {
        var parentSubject = "We have received your enrollment inquiry! — Kingdom of Learning";
        var parentBody = "Dear " + (params.parentName || "Parent") + ",\n\n" +
          "Thank you for contacting Kingdom of Learning Pre School. We are thrilled to welcome you to our learning family!\n\n" +
          "We have successfully registered your inquiry:\n" +
          "- Child Name: " + (params.childName || "Your child") + "\n" +
          "- Requested Program: " + (params.grade || "Preschool stage") + "\n\n" +
          "Our admissions coordinator is reviewing your details and will call you at " + (params.phone || "your contact number") + " shortly to answer your questions and arrange a secure campus visit to Shahpur Jat.\n\n" +
          "Warm regards,\n" +
          "Admissions Office\n" +
          "Kingdom of Learning Pre School\n" +
          "Delhi Sanctuary: Warmth • Creativity • Trust";

        MailApp.sendEmail(params.email, parentSubject, parentBody);
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
