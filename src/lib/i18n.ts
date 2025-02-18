import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Header
      businessProposal: "Business Proposal Generator",
      createProposal:
        "Create professional business proposals in minutes with AI assistance",
      poweredBy: "Powered by My Amigx",
      fillDetails: "Fill in your project details",
      generateAI: "Generate with AI",
      exportDoc: "Export as PDF or Word",

      // Form
      clientDetails: "Client Details",
      serviceDetails: "Service Details",
      pricingTimeline: "Pricing & Timeline",
      terms: "Terms",
      clientName: "Client Name",
      clientEmail: "Client Email",
      projectTitle: "Project Title",
      serviceDescription: "Service Description",
      deliverables: "Deliverables",
      costItems: "Cost Items",
      description: "Description",
      quantity: "Quantity",
      unitPrice: "Unit Price ($)",
      addItem: "Add Item",
      projectTimeline: "Project Timeline",
      additionalTerms: "Additional Terms & Conditions",
      generateProposal: "Generate Proposal",
      generating: "Generating...",
      milestone: "Milestone",
      startDate: "Start Date",
      duration: "Duration",
      unit: "Unit",
      days: "Days",
      weeks: "Weeks",
      months: "Months",
      starts: "Starts",
      price: "Price",
      total: "Total",
      anthropicApiKey: "Anthropic API Key",

      // Preview
      businessProposal: "Business Proposal",
      preparedFor: "Prepared for:",
      executiveSummary: "Executive Summary",
      scopeOfWork: "Scope of Work",
      pricingDetails: "Pricing Details",
      termsConditions: "Terms & Conditions",
      standardTerms: {
        payment: "1. Payment Terms: 50% upfront, 50% upon completion",
        timeline: "2. Project Timeline: To be determined upon agreement",
        revisions: "3. Revisions: Up to 2 rounds of revisions included",
        validity: "4. Validity: This proposal is valid for 30 days",
      },
      exportPDF: "Export as PDF",
      exportWord: "Export as Word",
      companyLogo: "Company Logo URL",
      accentColor: "Accent Color",
      styling: "Styling",
      companyTitle: "Company Title",
      companySubtitle: "Company Subtitle",
    },
  },
  es: {
    translation: {
      // Header
      businessProposal: "Generador de Propuestas",
      createProposal:
        "Crea propuestas comerciales profesionales en minutos con IA",
      poweredBy: "Desarrollado por My Amigx",
      fillDetails: "Completa los detalles del proyecto",
      generateAI: "Genera con IA",
      exportDoc: "Exporta como PDF o Word",

      // Form
      clientDetails: "Datos del Cliente",
      serviceDetails: "Detalles del Servicio",
      pricingTimeline: "Precios y Cronograma",
      terms: "Términos",
      clientName: "Nombre del Cliente",
      clientEmail: "Email del Cliente",
      projectTitle: "Título del Proyecto",
      serviceDescription: "Descripción del Servicio",
      deliverables: "Entregables",
      costItems: "Items de Costo",
      description: "Descripción",
      quantity: "Cantidad",
      unitPrice: "Precio Unitario ($)",
      addItem: "Agregar Item",
      projectTimeline: "Cronograma del Proyecto",
      additionalTerms: "Términos y Condiciones Adicionales",
      generateProposal: "Generar Propuesta",
      generating: "Generando...",
      milestone: "Hito",
      startDate: "Fecha de Inicio",
      duration: "Duración",
      unit: "Unidad",
      days: "Días",
      weeks: "Semanas",
      months: "Meses",
      starts: "Comienza",
      price: "Precio",
      total: "Total",
      anthropicApiKey: "Clave API de Anthropic",

      // Preview
      businessProposal: "Propuesta Comercial",
      preparedFor: "Preparado para:",
      executiveSummary: "Resumen Ejecutivo",
      scopeOfWork: "Alcance del Trabajo",
      pricingDetails: "Detalles de Precios",
      termsConditions: "Términos y Condiciones",
      standardTerms: {
        payment: "1. Términos de Pago: 50% por adelantado, 50% al finalizar",
        timeline:
          "2. Cronograma del Proyecto: A determinar al momento del acuerdo",
        revisions: "3. Revisiones: Incluye hasta 2 rondas de revisiones",
        validity: "4. Validez: Esta propuesta es válida por 30 días",
      },
      exportPDF: "Exportar como PDF",
      exportWord: "Exportar como Word",
      companyLogo: "URL del Logo",
      accentColor: "Color de Acento",
      styling: "Estilo",
      companyTitle: "Título de la Empresa",
      companySubtitle: "Subtítulo de la Empresa",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
