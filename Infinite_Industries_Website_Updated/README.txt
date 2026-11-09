INFINITE INDUSTRIES — UPDATED WEBSITE
=====================================

PAGES
- index.html, about.html, products.html, services.html, projects.html, quote.html, contact.html

BRAND LOGO
- Extracted the original Infinite Industries logo lockup from the supplied reference image.
- Used in the shared site header and footer.
- Asset: assets/images/infinite-industries-logo.png
- The crop is taken from the supplied social post artwork, so it includes the original dark background.

AUTOMATIC ENQUIRY SUBMISSION
- Customer fills the form and clicks Submit enquiry once.
- The website sends the enquiry to the configured Google Apps Script endpoint.
- Apps Script appends the lead to Google Sheets and sends an email to the configured business inbox.
- The customer does not need to open WhatsApp or email.
- Optional automatic WhatsApp notification to the owner can be enabled through WhatsApp Business Cloud API and an approved template.

REQUIRED SETUP
1. Create a Google Sheet.
2. Open Extensions > Apps Script and paste google-apps-script/Code.gs.
3. Apps Script Project Settings > Script Properties:
   BUSINESS_EMAIL = your company inbox email address
4. Optional WhatsApp Cloud API properties:
   WHATSAPP_ACCESS_TOKEN = your API token
   WHATSAPP_PHONE_NUMBER_ID = your WhatsApp Cloud API phone number ID
   WHATSAPP_RECIPIENT = owner's WhatsApp number (country code + number, digits only)
   WHATSAPP_TEMPLATE_NAME = approved template name
5. Deploy as a Web App; Execute as Me; access Anyone.
6. Copy the deployment URL into assets/js/config.js:
   googleSheetsEndpoint: "YOUR_DEPLOYED_WEB_APP_URL"
7. Re-deploy a new version after Apps Script changes and test with a real enquiry.

WHATSAPP NOTES
- A normal wa.me link cannot automatically send a message in the background.
- Automatic notification requires WhatsApp Business Platform / Cloud API credentials
  and an approved template for business-initiated notifications.
- Never put WhatsApp access tokens in browser-side JavaScript.

EMAIL NOTES
- Email is sent by Google Apps Script MailApp to BUSINESS_EMAIL.
- The customer is not asked to open an email application.

IMPORTANT
- The email destination is not configured yet because the company email address
  has not been supplied. Set BUSINESS_EMAIL in Apps Script Script Properties.
- Google Sheets and email delivery are not live until the Apps Script deployment
  URL is added to config.js.
- The browser uses a no-cors request to Apps Script. It cannot inspect the server
  response, so verify test submissions in the sheet and company inbox.
- Replace stock photos with company-owned/licensed project photos before launch.
- Add privacy policy and spam protection before public production use.
