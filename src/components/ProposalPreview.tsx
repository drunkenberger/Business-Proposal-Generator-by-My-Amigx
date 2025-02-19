import React from "react";
import { exportToHTML, exportToWord } from "@/lib/export";
import ExportActions from "./ExportActions";
import { useTranslation } from "react-i18next";

interface ClientDetails {
  name: string;
  company: string;
  email: string;
}

interface ServiceDetails {
  description: string;
  scope: string[];
}

interface PricingItem {
  description: string;
  quantity: number;
  price: number;
}

interface PricingDetails {
  items: PricingItem[];
}

interface TimelineItem {
  milestone: string;
  startDate: string;
  duration: number;
  durationUnit: "days" | "weeks" | "months";
}

interface TimelineDetails {
  items: TimelineItem[];
}

interface ProposalPreviewProps {
  clientDetails: ClientDetails;
  serviceDetails: ServiceDetails;
  pricing: PricingDetails;
  timeline: TimelineDetails;
  customTerms?: string;
  companyLogo?: string;
  accentColor?: string;
  companyTitle?: string;
  companySubtitle?: string;
  backgroundColor?: string;
  gradientStyle?: "solid" | "gradient" | "radial";
  fontFamily?: "sans" | "serif" | "mono";
  borderStyle?: "none" | "simple" | "double" | "glow";
}

const ProposalPreview = ({
  clientDetails = {
    name: "Client Name",
    company: "Company Name",
    email: "client@example.com",
  },
  serviceDetails = {
    description: "Service Description",
    scope: ["Service item 1", "Service item 2", "Service item 3"],
  },
  pricing = {
    items: [
      { description: "Service 1", quantity: 1, price: 1000 },
      { description: "Service 2", quantity: 1, price: 2000 },
      { description: "Service 3", quantity: 1, price: 1500 },
    ],
  },
  timeline = {
    items: [],
  },
  customTerms = "",
  companyLogo = "https://lime-zygomorphic-vicuna-674.mypinata.cloud/ipfs/QmUUZrnhnLuh19NegbX9iMwbFWPubB6TZbRVFHK2mfPK5M",
  accentColor = "#EC4899",
  companyTitle = "My Amigx Labs",
  companySubtitle = "Professional Business Solutions",
  backgroundColor = "#4C1D95",
  gradientStyle = "gradient",
  fontFamily = "sans",
  borderStyle = "simple",
}: ProposalPreviewProps) => {
  const { t } = useTranslation();

  const handleExportPDF = () => {
    exportToHTML("proposal-preview");
  };

  const handleExportWord = () => {
    exportToWord({
      clientDetails,
      serviceDetails,
      pricing,
      timeline,
      customTerms,
      companyLogo,
      accentColor,
      companyTitle,
      companySubtitle,
    });
  };

  const totalAmount = pricing.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const getBorderStyle = () => {
    switch (borderStyle) {
      case "simple":
        return "border border-pink-500/30";
      case "double":
        return "border-4 border-double border-pink-500/30";
      case "glow":
        return "border border-pink-500/30 shadow-lg shadow-pink-500/20";
      default:
        return "";
    }
  };

  const getBackgroundStyle = () => {
    switch (gradientStyle) {
      case "gradient":
        return `bg-gradient-to-br from-${backgroundColor} via-purple-900 to-gray-900`;
      case "radial":
        return `bg-radial from-${backgroundColor} via-purple-900 to-gray-900`;
      default:
        return backgroundColor;
    }
  };

  const getFontFamily = () => {
    switch (fontFamily) {
      case "serif":
        return "font-serif";
      case "mono":
        return "font-mono";
      default:
        return "font-sans";
    }
  };

  return (
    <div
      className={`w-full h-full bg-black/50 rounded-lg overflow-hidden flex flex-col ${getBorderStyle()}`}
    >
      <div
        id="proposal-preview"
        className={`flex-1 overflow-y-auto p-8 ${getFontFamily()}`}
        style={{ background: getBackgroundStyle() }}
      >
        {/* Header */}
        <header className="text-center mb-12">
          <img
            src={companyLogo}
            alt="Company Logo"
            className="h-16 mx-auto mb-4 filter drop-shadow-glow"
          />
          <h1 className="text-5xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">
            {companyTitle}
          </h1>
          <p className="text-xl text-cyan-300">{companySubtitle}</p>
        </header>

        {/* Client Details */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
            {t("preparedFor")}:
          </h2>
          <div className="bg-black/30 p-6 rounded-lg border border-pink-500/30">
            <p className="text-white">
              <span className="text-pink-400">{t("clientName")}:</span>{" "}
              {clientDetails.name}
            </p>
            <p className="text-white">
              <span className="text-pink-400">{t("projectTitle")}:</span>{" "}
              {clientDetails.company}
            </p>
            <p className="text-white">
              <span className="text-pink-400">{t("clientEmail")}:</span>{" "}
              {clientDetails.email}
            </p>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
            {t("executiveSummary")}
          </h2>
          <div className="bg-black/30 p-6 rounded-lg border border-pink-500/30">
            <p className="text-white whitespace-pre-line">
              {serviceDetails.description}
            </p>
          </div>
        </section>

        {/* Scope of Work */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
            {t("scopeOfWork")}
          </h2>
          <div className="bg-black/30 p-6 rounded-lg border border-pink-500/30">
            <ul className="list-disc list-inside space-y-2">
              {serviceDetails.scope.map((item, index) => (
                <li key={index} className="text-white">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pricing Details */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
            {t("pricingDetails")}
          </h2>
          <div className="bg-black/30 p-6 rounded-lg border border-pink-500/30">
            <table className="w-full mb-4">
              <thead>
                <tr className="border-b border-pink-500/30">
                  <th className="text-left py-2 text-pink-400">
                    {t("description")}
                  </th>
                  <th className="text-center py-2 text-pink-400">
                    {t("quantity")}
                  </th>
                  <th className="text-right py-2 text-pink-400">
                    {t("price")}
                  </th>
                  <th className="text-right py-2 text-pink-400">
                    {t("total")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricing.items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-pink-500/10 text-white"
                  >
                    <td className="py-2">{item.description}</td>
                    <td className="text-center py-2">{item.quantity}</td>
                    <td className="text-right py-2">
                      ${item.price.toLocaleString()}
                    </td>
                    <td className="text-right py-2">
                      ${(item.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-cyan-950/30 p-4 rounded-lg">
              <p className="text-xl font-semibold text-cyan-300 text-right">
                {t("total")}: ${totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </section>

        {/* Project Timeline */}
        {timeline.items.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
              {t("projectTimeline")}
            </h2>
            <div className="bg-black/30 p-6 rounded-lg border border-pink-500/30 space-y-4">
              {timeline.items.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-pink-500/10 last:border-0 pb-4 last:pb-0"
                >
                  <p className="text-white font-medium">{item.milestone}</p>
                  <p className="text-sm text-cyan-300">
                    {t("starts")}: {item.startDate} ({item.duration}{" "}
                    {t(item.durationUnit)})
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Terms and Conditions */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
            {t("termsConditions")}
          </h2>
          <div className="bg-black/30 p-6 rounded-lg border border-pink-500/30">
            <div className="space-y-4 text-white">
              <p>{t("standardTerms.payment")}</p>
              <p>{t("standardTerms.timeline")}</p>
              <p>{t("standardTerms.revisions")}</p>
              <p>{t("standardTerms.validity")}</p>
              {customTerms && (
                <div className="mt-6 pt-6 border-t border-pink-500/30">
                  <p className="whitespace-pre-line">{customTerms}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Export Actions */}
      <ExportActions
        onExportPDF={handleExportPDF}
        onExportWord={handleExportWord}
        companyLogo={companyLogo}
      />
    </div>
  );
};

export default ProposalPreview;
