import { PricingRegion } from './pricingRegions';

interface ExportData {
  clientDetails: {
    name: string;
    company: string;
    email: string;
  };
  serviceDetails: {
    description: string;
    scopeOfWork: string;
  };
  pricing: {
    items: Array<{
      description: string;
      quantity: number;
      price: number;
    }>;
  };
  timeline?: {
    items: Array<{
      milestone: string;
      startDate: string;
      duration: number;
      durationUnit: string;
    }>;
  };
  customTerms?: string;
  companyLogo?: string;
  companyTitle?: string;
  companySubtitle?: string;
  pricingRegion?: PricingRegion;
}

export function exportToProfessionalPDF(data: ExportData) {
  const currencySymbol = data.pricingRegion?.currencySymbol || '$';
  const regionName = data.pricingRegion?.name || 'Standard';

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Business Proposal - ${data.clientDetails.company}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
          --noir-black: #000000;
          --noir-dark: #0A0A0A;
          --noir-charcoal: #1A1A1A;
          --noir-shadow: #2A2A2A;
          --noir-amber: #FFC107;
          --noir-gold: #FFD700;
          --noir-white: #FFFFFF;
          --noir-light: #F5F5F5;
          --noir-grey: #666666;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
          color: var(--noir-white);
          background: linear-gradient(135deg, var(--noir-black) 0%, var(--noir-charcoal) 50%, var(--noir-dark) 100%);
          min-height: 100vh;
          padding: 40px 20px;
          position: relative;
        }

        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.05;
          pointer-events: none;
          z-index: 0;
        }

        body::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(255,193,7,0.02) 15px, rgba(255,193,7,0.02) 18px);
          pointer-events: none;
          z-index: 1;
        }

        .document-container {
          max-width: 210mm;
          margin: 0 auto;
          background: linear-gradient(135deg, var(--noir-dark) 0%, var(--noir-charcoal) 100%);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,193,7,0.2);
          border: 2px solid var(--noir-amber);
          position: relative;
          z-index: 2;
        }

        .header {
          background: linear-gradient(135deg, var(--noir-black) 0%, var(--noir-shadow) 100%);
          color: var(--noir-amber);
          padding: 60px 50px;
          text-align: center;
          position: relative;
          overflow: hidden;
          border-bottom: 3px solid var(--noir-amber);
          box-shadow: inset 0 -2px 10px rgba(255,193,7,0.3);
        }

        .header::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(255,193,7,0.03) 20px,
            rgba(255,193,7,0.03) 25px
          );
          animation: filmGrain 20s infinite linear;
        }

        @keyframes filmGrain {
          0% { transform: translateX(-50%) translateY(-50%) rotate(0deg); }
          100% { transform: translateX(-50%) translateY(-50%) rotate(360deg); }
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="1" fill="white" opacity="0.05"/><circle cx="10" cy="60" r="1" fill="white" opacity="0.05"/><circle cx="90" cy="40" r="1" fill="white" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }

        .company-logo {
          width: 80px;
          height: 80px;
          margin: 0 auto 30px;
          border-radius: 20px;
          background: rgba(255, 193, 7, 0.1);
          backdrop-filter: blur(20px);
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          border: 2px solid var(--noir-amber);
          box-shadow: 0 0 20px rgba(255,193,7,0.3);
        }

        .company-logo img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .company-title {
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
          position: relative;
          z-index: 2;
          text-shadow: 0 0 20px rgba(255,193,7,0.6), 0 0 40px rgba(255,193,7,0.3);
          color: var(--noir-white);
        }

        .company-subtitle {
          font-size: 18px;
          font-weight: 400;
          opacity: 0.8;
          position: relative;
          z-index: 2;
          color: var(--noir-amber);
          text-shadow: 0 0 10px rgba(255,193,7,0.4);
        }

        .proposal-title {
          font-size: 32px;
          font-weight: 600;
          margin-top: 40px;
          position: relative;
          z-index: 2;
          color: var(--noir-amber);
          text-shadow: 0 0 15px rgba(255,193,7,0.5);
        }

        .region-badge {
          display: inline-block;
          background: rgba(255, 193, 7, 0.2);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          margin-top: 20px;
          backdrop-filter: blur(10px);
          position: relative;
          z-index: 2;
          border: 1px solid var(--noir-amber);
          color: var(--noir-white);
          box-shadow: 0 0 10px rgba(255,193,7,0.3);
        }

        .content {
          padding: 50px;
          background: linear-gradient(135deg, var(--noir-charcoal) 0%, var(--noir-shadow) 100%);
          color: var(--noir-white);
        }

        .section {
          margin-bottom: 50px;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 3px solid var(--noir-amber);
          position: relative;
        }

        .section-header::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, var(--noir-amber), transparent);
          box-shadow: 0 0 10px var(--noir-amber);
        }

        .section-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--noir-amber), var(--noir-gold));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--noir-black);
          font-weight: 600;
          box-shadow: 0 0 15px rgba(255,193,7,0.5);
        }

        .section-title {
          font-size: 28px;
          font-weight: 600;
          color: var(--noir-amber);
          letter-spacing: -0.01em;
        }

        .client-details {
          background: linear-gradient(135deg, var(--noir-dark), var(--noir-charcoal));
          border-radius: 16px;
          padding: 30px;
          border: 2px solid var(--noir-amber);
          box-shadow: 0 0 20px rgba(255,193,7,0.2);
        }

        .client-detail-item {
          display: flex;
          margin-bottom: 15px;
          last-child: margin-bottom: 0;
        }

        .client-detail-label {
          font-weight: 600;
          color: var(--noir-amber);
          min-width: 100px;
          margin-right: 15px;
          text-shadow: 0 0 5px rgba(255,193,7,0.3);
        }

        .client-detail-value {
          color: var(--noir-white);
          font-weight: 500;
        }

        .description {
          font-size: 16px;
          line-height: 1.8;
          color: var(--noir-white);
          background: var(--noir-dark);
          padding: 30px;
          border-radius: 16px;
          border-left: 5px solid var(--noir-amber);
          box-shadow: inset 0 0 20px rgba(255,193,7,0.1), 0 0 15px rgba(0,0,0,0.5);
        }

        .scope-content {
          font-size: 16px;
          line-height: 1.8;
          color: var(--noir-white);
          background: var(--noir-dark);
          padding: 30px;
          border-radius: 16px;
          border-left: 5px solid var(--noir-amber);
          box-shadow: inset 0 0 20px rgba(255,193,7,0.1), 0 0 15px rgba(0,0,0,0.5);
        }

        .pricing-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .pricing-table th {
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-purple));
          color: white;
          padding: 20px 15px;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .pricing-table td {
          padding: 20px 15px;
          border-bottom: 1px solid var(--neutral-200);
          font-size: 15px;
        }

        .pricing-table tr:last-child td {
          border-bottom: none;
        }

        .pricing-table tr:nth-child(even) {
          background: var(--neutral-50);
        }

        .total-section {
          background: linear-gradient(135deg, var(--primary-blue), var(--accent-cyan));
          color: white;
          padding: 30px;
          border-radius: 16px;
          margin-top: 30px;
          text-align: right;
        }

        .total-label {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 10px;
        }

        .total-amount {
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .timeline-item {
          background: white;
          border: 1px solid var(--neutral-200);
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 5px;
          height: 100%;
          background: linear-gradient(135deg, var(--primary-blue), var(--accent-cyan));
        }

        .timeline-milestone {
          font-size: 18px;
          font-weight: 600;
          color: var(--noir-amber);
          margin-bottom: 8px;
        }

        .timeline-date {
          color: var(--neutral-500);
          font-size: 14px;
          font-weight: 500;
        }

        .terms-content {
          background: var(--neutral-50);
          padding: 30px;
          border-radius: 16px;
          line-height: 1.8;
        }

        .terms-content p {
          margin-bottom: 15px;
          color: var(--neutral-700);
        }

        .footer {
          background: var(--neutral-900);
          color: white;
          padding: 40px 50px;
          text-align: center;
        }

        .footer-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
        }

        .footer-logo {
          width: 40px;
          height: 40px;
        }

        .footer-text {
          font-size: 14px;
          opacity: 0.8;
        }

        .footer-contact {
          font-size: 14px;
          margin-top: 20px;
          opacity: 0.7;
        }

        @media print {
          body {
            padding: 0;
            background: white;
          }

          .document-container {
            box-shadow: none;
            border-radius: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="document-container">
        <header class="header">
          <div class="company-logo">
            <img src="${data.companyLogo || '/images/waza-logo.png'}" alt="Company Logo">
          </div>
          <h1 class="company-title">${data.companyTitle || 'WAZA Lab'}</h1>
          <p class="company-subtitle">${data.companySubtitle || 'Fullstack Agentic Lab'}</p>
          <h2 class="proposal-title">Business Proposal</h2>
          <div class="region-badge">Pricing: ${regionName} Region</div>
        </header>

        <div class="content">
          <!-- Client Details -->
          <section class="section">
            <div class="section-header">
              <div class="section-icon">👤</div>
              <h3 class="section-title">Client Information</h3>
            </div>
            <div class="client-details">
              <div class="client-detail-item">
                <span class="client-detail-label">Name:</span>
                <span class="client-detail-value">${data.clientDetails.name}</span>
              </div>
              <div class="client-detail-item">
                <span class="client-detail-label">Company:</span>
                <span class="client-detail-value">${data.clientDetails.company}</span>
              </div>
              <div class="client-detail-item">
                <span class="client-detail-label">Email:</span>
                <span class="client-detail-value">${data.clientDetails.email}</span>
              </div>
            </div>
          </section>

          <!-- Executive Summary -->
          <section class="section">
            <div class="section-header">
              <div class="section-icon">📋</div>
              <h3 class="section-title">Executive Summary</h3>
            </div>
            <div class="description">${data.serviceDetails.description}</div>
          </section>

          <!-- Scope of Work -->
          <section class="section">
            <div class="section-header">
              <div class="section-icon">🎯</div>
              <h3 class="section-title">Scope of Work</h3>
            </div>
            <div class="scope-content">
              ${data.serviceDetails.scopeOfWork.replace(/\n/g, '<br>')}
            </div>
          </section>

          <!-- Pricing -->
          <section class="section">
            <div class="section-header">
              <div class="section-icon">💰</div>
              <h3 class="section-title">Investment Details</h3>
            </div>
            <table class="pricing-table">
              <thead>
                <tr>
                  <th>Service Description</th>
                  <th>Hours</th>
                  <th>Rate (/hr)</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${data.pricing.items.map(item => `
                  <tr>
                    <td>${item.description}</td>
                    <td>${item.quantity} hrs</td>
                    <td>${currencySymbol}${item.price.toLocaleString()}/hr</td>
                    <td>${currencySymbol}${(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="total-section">
              <div class="total-label">Total Investment</div>
              <div class="total-amount">${currencySymbol}${data.pricing.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</div>
            </div>
          </section>

          ${data.timeline?.items.length ? `
          <!-- Timeline -->
          <section class="section">
            <div class="section-header">
              <div class="section-icon">📅</div>
              <h3 class="section-title">Project Timeline</h3>
            </div>
            ${data.timeline.items.map(item => `
              <div class="timeline-item">
                <div class="timeline-milestone">${item.milestone}</div>
                <div class="timeline-date">Starts: ${item.startDate} (${item.duration} ${item.durationUnit})</div>
              </div>
            `).join('')}
          </section>
          ` : ''}

          <!-- Terms & Conditions -->
          <section class="section">
            <div class="section-header">
              <div class="section-icon">📜</div>
              <h3 class="section-title">Terms & Conditions</h3>
            </div>
            <div class="terms-content">
              <p><strong>Payment Terms:</strong> 50% upfront, 50% upon completion</p>
              <p><strong>Project Timeline:</strong> To be determined upon agreement</p>
              <p><strong>Revisions:</strong> Up to 2 rounds of revisions included</p>
              <p><strong>Validity:</strong> This proposal is valid for 30 days</p>
              ${data.customTerms ? `<p><strong>Additional Terms:</strong><br>${data.customTerms}</p>` : ''}
            </div>
          </section>
        </div>

        <footer class="footer">
          <div class="footer-content">
            <img src="${data.companyLogo || '/images/waza-logo.png'}" alt="WAZA Lab" class="footer-logo">
            <div>
              <div class="footer-text">Powered by Waza Lab using Lemy AI</div>
              <div class="footer-contact">contact@wazalab.com | wazalab.com</div>
            </div>
          </div>
        </footer>
      </div>
    </body>
    </html>
  `;

  // Create and download
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `business-proposal-${data.clientDetails.company.replace(/\s+/g, '-').toLowerCase()}-${regionName.toLowerCase()}.html`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

export function exportToProfessionalWord(data: ExportData) {
  const currencySymbol = data.pricingRegion?.currencySymbol || '$';
  const regionName = data.pricingRegion?.name || 'Standard';

  const htmlContent = `
    <!DOCTYPE html>
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Business Proposal - ${data.clientDetails.company}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>90</w:Zoom>
          <w:DoNotPromptForConvert/>
          <w:DoNotShowInsertionsAndDeletions/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page {
          margin: 1in;
          size: letter;
        }

        body {
          font-family: Calibri, Arial, sans-serif;
          font-size: 11pt;
          line-height: 1.4;
          color: #333333;
          margin: 0;
          padding: 0;
        }

        .header {
          text-align: center;
          padding: 30px 0;
          border-bottom: 3px solid #3B82F6;
          margin-bottom: 30px;
        }

        .company-logo {
          width: 100px;
          height: auto;
          margin-bottom: 20px;
        }

        .company-title {
          font-size: 24pt;
          font-weight: bold;
          color: #3B82F6;
          margin-bottom: 8px;
        }

        .company-subtitle {
          font-size: 12pt;
          color: #666666;
          margin-bottom: 20px;
        }

        .proposal-title {
          font-size: 20pt;
          font-weight: bold;
          color: #333333;
        }

        .region-info {
          font-size: 10pt;
          color: #666666;
          font-style: italic;
          margin-top: 10px;
        }

        .section {
          margin-bottom: 30px;
          page-break-inside: avoid;
        }

        .section-title {
          font-size: 16pt;
          font-weight: bold;
          color: #3B82F6;
          border-bottom: 2px solid #3B82F6;
          padding-bottom: 5px;
          margin-bottom: 15px;
        }

        .client-details {
          background-color: #F8F9FA;
          padding: 20px;
          border-left: 4px solid #3B82F6;
        }

        .client-detail {
          margin-bottom: 8px;
        }

        .client-label {
          font-weight: bold;
          color: #3B82F6;
          display: inline-block;
          width: 80px;
        }

        .description {
          background-color: #F8F9FA;
          padding: 20px;
          border-left: 4px solid #3B82F6;
          font-size: 11pt;
          line-height: 1.6;
        }

        .scope-content {
          background-color: #F8F9FA;
          padding: 20px;
          border-left: 4px solid #3B82F6;
          font-size: 11pt;
          line-height: 1.6;
        }

        .pricing-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }

        .pricing-table th {
          background-color: #3B82F6;
          color: white;
          padding: 12px 8px;
          text-align: left;
          font-weight: bold;
          font-size: 10pt;
        }

        .pricing-table td {
          padding: 10px 8px;
          border-bottom: 1px solid #E5E7EB;
          font-size: 10pt;
        }

        .pricing-table tr:nth-child(even) {
          background-color: #F8F9FA;
        }

        .total-row {
          background-color: #3B82F6 !important;
          color: white !important;
          font-weight: bold !important;
        }

        .total-row td {
          padding: 15px 8px !important;
          font-size: 12pt !important;
        }

        .timeline-item {
          background-color: #F8F9FA;
          padding: 15px;
          margin-bottom: 10px;
          border-left: 4px solid #3B82F6;
        }

        .timeline-milestone {
          font-weight: bold;
          color: #333333;
          margin-bottom: 5px;
        }

        .timeline-date {
          color: #666666;
          font-size: 10pt;
        }

        .terms-content {
          background-color: #F8F9FA;
          padding: 20px;
          border-left: 4px solid #3B82F6;
        }

        .terms-content p {
          margin-bottom: 10px;
          font-size: 10pt;
        }

        .footer {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 2px solid #3B82F6;
          text-align: center;
          color: #666666;
          font-size: 10pt;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="${data.companyLogo || '/images/waza-logo.png'}" alt="Company Logo" class="company-logo">
        <div class="company-title">${data.companyTitle || 'WAZA Lab'}</div>
        <div class="company-subtitle">${data.companySubtitle || 'Fullstack Agentic Lab'}</div>
        <div class="proposal-title">Business Proposal</div>
        <div class="region-info">Pricing Region: ${regionName}</div>
      </div>

      <!-- Client Details -->
      <div class="section">
        <h2 class="section-title">Client Information</h2>
        <div class="client-details">
          <div class="client-detail">
            <span class="client-label">Name:</span> ${data.clientDetails.name}
          </div>
          <div class="client-detail">
            <span class="client-label">Company:</span> ${data.clientDetails.company}
          </div>
          <div class="client-detail">
            <span class="client-label">Email:</span> ${data.clientDetails.email}
          </div>
        </div>
      </div>

      <!-- Executive Summary -->
      <div class="section">
        <h2 class="section-title">Executive Summary</h2>
        <div class="description">${data.serviceDetails.description}</div>
      </div>

      <!-- Scope of Work -->
      <div class="section">
        <h2 class="section-title">Scope of Work</h2>
        <div class="scope-content">
          ${data.serviceDetails.scopeOfWork.replace(/\n/g, '<br>')}
        </div>
      </div>

      <!-- Pricing -->
      <div class="section">
        <h2 class="section-title">Investment Details</h2>
        <table class="pricing-table">
          <thead>
            <tr>
              <th>Service Description</th>
              <th>Hours</th>
              <th>Rate (/hr)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${data.pricing.items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td>${item.quantity} hrs</td>
                <td>${currencySymbol}${item.price.toLocaleString()}/hr</td>
                <td>${currencySymbol}${(item.price * item.quantity).toLocaleString()}</td>
              </tr>
            `).join('')}
            <tr class="total-row">
              <td colspan="3"><strong>Total Investment</strong></td>
              <td><strong>${currencySymbol}${data.pricing.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      ${data.timeline?.items.length ? `
      <!-- Timeline -->
      <div class="section">
        <h2 class="section-title">Project Timeline</h2>
        ${data.timeline.items.map(item => `
          <div class="timeline-item">
            <div class="timeline-milestone">${item.milestone}</div>
            <div class="timeline-date">Starts: ${item.startDate} (${item.duration} ${item.durationUnit})</div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- Terms & Conditions -->
      <div class="section">
        <h2 class="section-title">Terms & Conditions</h2>
        <div class="terms-content">
          <p><strong>Payment Terms:</strong> 50% upfront, 50% upon completion</p>
          <p><strong>Project Timeline:</strong> To be determined upon agreement</p>
          <p><strong>Revisions:</strong> Up to 2 rounds of revisions included</p>
          <p><strong>Validity:</strong> This proposal is valid for 30 days</p>
          ${data.customTerms ? `<p><strong>Additional Terms:</strong><br>${data.customTerms}</p>` : ''}
        </div>
      </div>

      <div class="footer">
        <p><strong>Powered by Waza Lab using Lemy AI</strong></p>
        <p>contact@wazalab.com | wazalab.com</p>
      </div>
    </body>
    </html>
  `;

  // Create and download
  const blob = new Blob([htmlContent], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `business-proposal-${data.clientDetails.company.replace(/\s+/g, '-').toLowerCase()}-${regionName.toLowerCase()}.doc`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}