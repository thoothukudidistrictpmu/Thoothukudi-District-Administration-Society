/**
 * Google Apps Script - Thoothukudi District CSR Portal Web App
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet linked to the registration system.
 * 2. In the Google Sheets menu, click Extensions > Apps Script.
 * 3. Delete any default code inside the editor and paste this entire script.
 * 4. Ensure SHEET_NAME matches your sheet name.
 * 5. Click "Deploy" on the top right, then select "New deployment".
 * 6. Click the gear icon next to "Select type", then select "Web app".
 * 7. Set options:
 *    - Description: "Thoothukudi CSR Portal Web App & Email automation"
 *    - Execute as: "Me" (this authorizes email sending on behalf of District PMU)
 *    - Who has access: "Anyone" (crucial so the React portal can submit entries)
 * 8. Click "Deploy", authorize the Google permissions requested.
 * 9. Copy the generated Web App URL and set it as DEFAULT_SCRIPT_URL in SponsorshipPage.tsx (or enter it in your environment configurations).
 */

// Configuration
var SHEET_NAME = 'CSR_Submissions'; // Sheet name where registration entries will be stored
var EMAIL_SUBJECT = 'Thanks for registering - Thoothukudi District CSR Portal';

function doPost(e) {
  try {
    // Parse the incoming JSON payload (React transmits payload as text/plain MIME to bypass browser preflight CORS limits)
    var jsonString = e.postData.contents;
    var data = JSON.parse(jsonString);
    
    // 1. Get or create the designated destination sheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Initialize headers if sheet is newly created
      sheet.appendRow([
        'Timestamp',
        'Contact Name', 
        'Organization', 
        'Official Email', 
        'Phone Number', 
        'Project Category',
        'Additional Notes'
      ]);
      // Apply clean, official visual format to headers
      sheet.getRange(1, 1, 1, 7)
           .setFontWeight('bold')
           .setBackground('#0d9488') // Teal-600 matching Thoothukudi theme
           .setFontColor('#ffffff')
           .setHorizontalAlignment('left');
    }
    
    // 2. Prepare projects description string for spreadsheet storage
    var projectsDescription = '';
    if (data.projects && Array.isArray(data.projects)) {
      projectsDescription = data.projects.map(function(p) {
        var subDesc = '';
        if (p.subProjects && Array.isArray(p.subProjects) && p.subProjects.length > 0) {
          subDesc = ' [' + p.subProjects.map(function(sub) {
            var outlayText = sub.financialOutlay ? ' (' + sub.financialOutlay + ')' : '';
            var descText = sub.description ? ' - ' + sub.description : '';
            return sub.location + outlayText + descText;
          }).join('; ') + ']';
        }
        return p.title + ' (' + (p.department || 'N/A') + ') - Outlay: ' + p.financialOutlay + subDesc;
      }).join(' | ');
    }
    
    // 3. Append details to the Spreadsheet database
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.organization || '',
      data.email || '',
      data.phone || '',
      projectsDescription,
      data.notes || ''
    ]);
    
    // 4. Send highly polished confirmation email to the donor
    if (data.email) {
      sendConfirmationEmail(data);
    }
    
    // Return standard success response back to React client
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    Logger.log("Execution error: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'message': error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendConfirmationEmail(data) {
  var toEmail = data.email.trim();
  var name = data.name || 'Sponsor';
  var org = data.organization || 'Individual Partner';
  var phone = data.phone || 'N/A';
  var totalCost = data.totalCost || 'Rs. 0';
  
  // Format selected projects and sub-projects into beautiful HTML list
  var htmlProjects = '';
  if (data.projects && Array.isArray(data.projects)) {
    htmlProjects = '<table style="width: 100%; border-collapse: collapse; margin: 15px 0; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;">' +
                   '<tr style="background-color: #0f172a; color: white; text-align: left;">' +
                   '<th style="padding: 10px; border: 1px solid #e2e8f0; font-size: 12px; font-weight: bold;">S.No</th>' +
                   '<th style="padding: 10px; border: 1px solid #e2e8f0; font-size: 12px; font-weight: bold;">Selected Project & Blueprint Challenge</th>' +
                   '<th style="padding: 10px; border: 1px solid #e2e8f0; font-size: 12px; font-weight: bold;">Department</th>' +
                   '<th style="padding: 10px; border: 1px solid #e2e8f0; font-size: 12px; font-weight: bold; text-align: right;">Estimated Outlay</th>' +
                   '</tr>';
    
    data.projects.forEach(function(p, index) {
      var bgColor = (index % 2 === 0) ? '#f8fafc' : '#ffffff';
      htmlProjects += '<tr style="background-color: ' + bgColor + '; text-align: left;">' +
                      '<td style="padding: 12px 10px; border: 1px solid #e2e8f0; font-size: 12px; color: #475569; vertical-align: top;">' + (index + 1) + '</td>' +
                      '<td style="padding: 12px 10px; border: 1px solid #e2e8f0; font-size: 12px; color: #0f172a; vertical-align: top;">' +
                        '<div style="font-weight: bold; font-size: 13px; color: #0d9488; margin-bottom: 4px;">' + p.title + '</div>';
      
      // Nested Locations block if sub-projects are present
      if (p.subProjects && Array.isArray(p.subProjects) && p.subProjects.length > 0) {
        htmlProjects += '<div style="margin-top: 8px; padding-left: 10px; border-left: 2px solid #cbd5e1; font-size: 11px; color: #334155;">' +
                          '<div style="font-weight: bold; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-size: 9px;">Selected Locations & Works:</div>';
        
        p.subProjects.forEach(function(sub) {
          htmlProjects += '<div style="margin-bottom: 6px; padding: 6px 8px; background-color: #f1f5f9; border-radius: 4px; display: block; overflow: hidden; font-size: 11px;">' +
                            '<span style="font-weight: bold; color: #1e293b;">📍 ' + sub.location + '</span>' + 
                            (sub.description ? ' &ndash; <span style="color: #475569;">' + sub.description + '</span>' : '') +
                            '<span style="float: right; font-weight: bold; color: #0d9488;">' + sub.financialOutlay + '</span>' +
                          '</div>';
        });
        
        htmlProjects += '</div>';
      }
      
      htmlProjects += '</td>' +
                      '<td style="padding: 12px 10px; border: 1px solid #e2e8f0; font-size: 12px; color: #64748b; vertical-align: top;">' + (p.department || 'N/A') + '</td>' +
                      '<td style="padding: 12px 10px; border: 1px solid #e2e8f0; font-size: 12px; font-weight: bold; color: #059669; text-align: right; vertical-align: top;">' + p.financialOutlay + '</td>' +
                      '</tr>';
    });
    
    htmlProjects += '</table>';
  } else {
    htmlProjects = '<p style="color: #64748b; font-style: italic;">No specific project challenges selected.</p>';
  }
  
  // Custom styled HTML Email template representation of a high-office official letter
  var htmlBody = 
    '<div style="background-color: #f8fafc; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">' +
      '<div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);">' +
        // Header Banner
        '<div style="background-color: #0d9488; background-image: linear-gradient(135deg, #0d9488, #0f766e); padding: 32px 24px; text-align: center; color: #ffffff;">' +
          '<h1 style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px;">DISTRICT COLLECTORATE</h1>' +
          '<p style="margin: 6px 0 0 0; font-size: 11px; opacity: 0.95; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 500;">Thoothukudi District Administration, Tamil Nadu</p>' +
        '</div>' +
        
        // Content Body
        '<div style="padding: 32px 28px; line-height: 1.6; font-size: 14px; color: #334155;">' +
          '<p>Dear Mr./Ms. <strong>' + name + '</strong>,</p>' +
          
          '<p>Greetings from the District Collectorate.</p>' +
          
          '<p>Thank you for reaching out to us and for sharing your details, including your organization information, official email address, contact number, and area of interest.</p>' +
          
          '<p>We appreciate your interest in collaborating and engaging with our initiatives. The information provided by you has been duly noted and will be reviewed by the concerned team.</p>' +
          
          '<p>Our District PMU Team will examine your proposal/interest and will get in touch with you shortly for any further discussion or clarification, if required.</p>' +
          
          '<p>We sincerely thank you for your interest and willingness to contribute. We look forward to connecting with you soon.</p>' +
          
          // Data block
          '<div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 18px; margin: 24px 0; border-radius: 8px;">' +
            '<h3 style="margin: 0 0 10px 0; color: #0f172a; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">Submitted Registration Details</h3>' +
            '<table style="font-size: 13px; line-height: 1.5; border-collapse: collapse; width: 100%; color: #1e293b;">' +
              '<tr><td style="width: 175px; font-weight: bold; color: #64748b; padding: 4px 0;">Name:</td><td style="font-weight: bold; color: #0f172a; padding: 4px 0;">' + name + '</td></tr>' +
              '<tr><td style="font-weight: bold; color: #64748b; padding: 4px 0;">Organisation:</td><td style="color: #334155; padding: 4px 0;">' + org + '</td></tr>' +
              '<tr><td style="font-weight: bold; color: #64748b; padding: 4px 0;">Official EmailID:</td><td style="color: #334155; padding: 4px 0;">' + toEmail + '</td></tr>' +
              '<tr><td style="font-weight: bold; color: #64748b; padding: 4px 0;">Phone Number:</td><td style="color: #334155; padding: 4px 0;">' + phone + '</td></tr>' +
              '<tr><td style="font-weight: bold; color: #64748b; padding: 4px 0;">Total Project Value:</td><td style="font-weight: bold; color: #0d9488; padding: 4px 0;">' + totalCost + '</td></tr>' +
            '</table>' +
          '</div>' +
          
          '<p style="font-weight: bold; margin-bottom: 5px; color: #0f172a;">Selected Infrastructure Blueprints & Target Locations:</p>' +
          htmlProjects +
          
          (data.notes ? '<div style="margin-top: 15px; background-color: #f8fafc; border-left: 3px solid #0d9488; padding: 12px; border-radius: 4px; font-style: italic; font-size: 13px; color: #475569;"><strong>Additional Notes / Specific Remarks:</strong> "' + data.notes + '"</div>' : '') +
          
          '<p style="margin-top: 24px; margin-bottom: 0;">Thank You.</p>' +
          
          '<p style="margin-top: 32px; margin-bottom: 0; line-height: 1.5; font-size: 13px; color: #475569; border-top: 1px solid #e2e8f0; padding-top: 16px;">' +
          'Warm regards,<br><br>' +
          '<strong style="color: #0f172a; font-size: 14px;">District Collector & President</strong><br>' +
          'Thoothukudi District Administration Society<br>' +
          'Government of Tamil Nadu</p>' +
          'Office of Joint Director/Project Director (DRDA), Thoothukudi District' +
        '</div>' +
        
        // Footer Notes
        '<div style="background-color: #f1f5f9; padding: 20px; border-top: 1px solid #e2e8f0; font-size: 11px; text-align: center; color: #64748b; line-height: 1.4;">' +
          'This is a formal automated communication from the Office of the District Collector, Thoothukudi, India.<br>' +
          'Secretariat Compound, Thoothukudi District, Tamil Nadu, India.' +
        '</div>' +
      '</div>' +
    '</div>';

  // Plain-text alternative fallback text in case the user's email client disables HTML
  var plainProjects = '';
  if (data.projects && Array.isArray(data.projects)) {
    data.projects.forEach(function(p, index) {
      plainProjects += (index + 1) + ". " + p.title + " (" + (p.department || 'N/A') + ") - " + p.financialOutlay + "\n";
      if (p.subProjects && Array.isArray(p.subProjects) && p.subProjects.length > 0) {
        plainProjects += "   Selected Locations:\n";
        p.subProjects.forEach(function(sub) {
          plainProjects += "   - " + sub.location + (sub.description ? ' (' + sub.description + ')' : '') + ": " + sub.financialOutlay + "\n";
        });
      }
      plainProjects += "\n";
    });
  } else {
    plainProjects = "No specific project challenges selected.\n";
  }

  var plainBody = 
    "Dear Mr./Ms. " + name + ",\n\n" +
    "Greetings from the District Collectorate.\n\n" +
    "Thank you for reaching out to us and for sharing your details, including your organization information, official email address, contact number, and area of interest.\n\n" +
    "We appreciate your interest in collaborating and engaging with our initiatives. The information provided by you has been duly noted and will be reviewed by the concerned team.\n\n" +
    "Our District PMU Team will examine your proposal/interest and will get in touch with you shortly for any further discussion or clarification, if required.\n\n" +
    "We sincerely thank you for your interest and willingness to contribute. We look forward to connecting with you soon.\n\n" +
    "-----------------------------------------\n" +
    "SUBMITTED REGISTRATION DETAILS\n" +
    "-----------------------------------------\n" +
    "Name: " + name + "\n" +
    "Organisation: " + org + "\n" +
    "Official EmailID: " + toEmail + "\n" +
    "Phone Number: " + phone + "\n" +
    "Total Project Value: " + totalCost + "\n" +
    "-----------------------------------------\n\n" +
    "Selected Infrastructure Blueprints & Locations:\n" +
    plainProjects +
    "-----------------------------------------\n\n" +
    "Thank You.\n\n" +
    "Warm regards,\n" +
    "District Collector & President\n" +
    "Thoothukudi District Administration Society\n" +
    "Government of Tamil Nadu\n" +
    "Office of Joint Director/Project Director (DRDA), Thoothukudi District";

  // Dispatch the email securely using Google MailApp service
  try {
    MailApp.sendEmail({
      to: toEmail,
      subject: EMAIL_SUBJECT,
      htmlBody: htmlBody,
      body: plainBody,
      name: "Office of the District Collector",
      replyTo: "thoothukudidistrictpmu@gmail.com"
    });
  } catch (emailError) {
    Logger.log("Email notification dispatch hit a block: " + emailError.toString());
  }
}
