export function exportToHTML(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement;
  const container = document.createElement("div");
  container.appendChild(clone);

  // Get computed styles of the preview container
  const previewContainer = element.parentElement?.parentElement;
  const computedStyle = previewContainer
    ? getComputedStyle(previewContainer)
    : null;
  const background =
    computedStyle?.background || computedStyle?.backgroundColor || "";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Business Proposal</title>
      <style>
        :root {
          --cyan-300: #67E8F9;
          --cyan-400: #22D3EE;
          --pink-400: #EC4899;
          --pink-500: #BE185D;
        }
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background: linear-gradient(to bottom right, #4C1D95, #BE185D, #1E40AF);
          color: white;
          min-height: 100vh;
        }
        .container {
          max-width: 1200px;
          margin: 40px auto;
          background-color: rgba(0, 0, 0, 0.5);
          padding: 32px;
          border-radius: 8px;
          border: 1px solid var(--pink-400);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        header {
          text-align: center;
          margin-bottom: 32px;
        }
        .logo {
          height: 64px;
          margin-bottom: 16px;
          filter: drop-shadow(0 0 8px rgba(236, 72, 153, 0.5));
        }
        h1 {
          font-size: 48px;
          font-weight: bold;
          background: linear-gradient(to right, var(--cyan-400), var(--pink-400));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 8px;
        }
        .tagline {
          color: var(--cyan-300);
          font-size: 20px;
        }
        section {
          margin-bottom: 32px;
        }
        h2 {
          color: var(--cyan-300);
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 16px;
        }
        .label {
          color: var(--pink-400);
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 16px;
          color: white;
        }
        th, td {
          border: 1px solid var(--pink-400);
          padding: 8px;
          text-align: left;
        }
        th {
          background: rgba(236, 72, 153, 0.3);
        }
        .total-amount {
          background: rgba(103, 232, 249, 0.1);
          padding: 16px;
          border-radius: 8px;
          margin-top: 16px;
        }
        .total-amount p {
          color: var(--cyan-300);
          font-size: 24px;
          font-weight: bold;
          margin: 0;
        }
        .timeline-item {
          border-bottom: 1px solid var(--pink-400);
          padding: 8px 0;
        }
        .timeline-milestone {
          font-weight: 500;
        }
        .timeline-date {
          color: var(--cyan-300);
          font-size: 14px;
        }
        footer {
          margin-top: 48px;
          padding-top: 24px;
          border-top: 1px solid var(--pink-400);
          text-align: center;
          color: var(--cyan-300);
        }
        .text-pink-400 {
          color: var(--pink-400);
        }
        .text-cyan-300 {
          color: var(--cyan-300);
        }
      </style>
    </head>
    <body>
      <div class="container" style="background: ${background}">
        ${clone.outerHTML}
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "business-proposal.html";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

export function exportToWord(data) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Business Proposal</title>
      <style>
        :root {
          --pink-400: #EC4899;
          --pink-500: #BE185D;
          --cyan-300: #67E8F9;
        }
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 40px;
          background: white;
          color: black;
        }
        .header {
          text-align: center;
          margin-bottom: 32px;
          border-bottom: 2px solid var(--pink-400);
          padding-bottom: 16px;
        }
        .logo {
          height: 64px;
          margin-bottom: 16px;
        }
        .section {
          margin-bottom: 24px;
        }
        .section-title {
          color: var(--pink-500);
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 16px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 16px;
        }
        th, td {
          border: 1px solid var(--pink-500);
          padding: 8px;
          text-align: left;
        }
        th {
          background: #FDF2F8;
        }
        .total-amount {
          background: #F0F9FF;
          padding: 16px;
          border-radius: 8px;
          margin-top: 16px;
        }
        .footer {
          margin-top: 48px;
          padding-top: 24px;
          border-top: 2px solid var(--pink-400);
          text-align: center;
          color: #64748B;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="${data.companyLogo || "/images/waza-logo.png"}" alt="Company Logo" class="logo">
        <h1>Business Proposal</h1>
      </div>

      <div class="section">
        <h2 class="section-title">Client Details</h2>
        <p><strong>Name:</strong> ${data.clientDetails.name}</p>
        <p><strong>Company:</strong> ${data.clientDetails.company}</p>
        <p><strong>Email:</strong> ${data.clientDetails.email}</p>
      </div>

      <div class="section">
        <h2 class="section-title">Executive Summary</h2>
        <p>${data.serviceDetails.description}</p>
      </div>

      <div class="section">
        <h2 class="section-title">Scope of Work</h2>
        <ul>
          ${data.serviceDetails.scope.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>

      <div class="section">
        <h2 class="section-title">Pricing</h2>
        <table>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
          ${data.pricing.items
            .map(
              (item) => `
            <tr>
              <td>${item.description}</td>
              <td>${item.quantity}</td>
              <td>$${item.price}</td>
              <td>$${item.price * item.quantity}</td>
            </tr>
          `,
            )
            .join("")}
        </table>
        <div class="total-amount">
          <p><strong>Total:</strong> $${data.pricing.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}</p>
        </div>
      </div>

      <div class="footer">
        <p>WAZA Lab</p>
        <p>Website: wazalab.com</p>
        <p>Email: contact@wazalab.com</p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "business-proposal.html";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
