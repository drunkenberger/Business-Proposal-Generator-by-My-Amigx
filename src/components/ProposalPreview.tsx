import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollArea } from "./ui/scroll-area";
import { Image } from "./ui/image";
import ExportActions from "./ExportActions";
import { exportToHTML, exportToWord } from "@/lib/export";
import { TimelineItem } from "./TimelineInput";

interface ProposalPreviewProps {
  companyLogo?: string;
  accentColor?: string;
  companyTitle?: string;
  companySubtitle?: string;
  clientDetails?: {
    name: string;
    company: string;
    email: string;
  };
  serviceDetails?: {
    description: string;
    scope: string[];
  };
  pricing?: {
    items: Array<{
      description: string;
      quantity: number;
      price: number;
    }>;
  };
  timeline?: {
    items: TimelineItem[];
  };
  customTerms?: string;
}

const ProposalPreview = ({
  clientDetails = {
    name: "John Smith",
    company: "Acme Corp",
    email: "john@acmecorp.com",
  },
  serviceDetails = {
    description: "Web Development Services",
    scope: [
      "Custom website development",
      "Responsive design implementation",
      "Content management system integration",
    ],
  },
  pricing = {
    items: [
      { description: "Website Development", quantity: 1, price: 5000 },
      { description: "CMS Integration", quantity: 1, price: 2000 },
      { description: "Responsive Design", quantity: 1, price: 1500 },
    ],
  },
  timeline = {
    items: [],
  },
  customTerms = "",
  companyLogo = "https://lime-zygomorphic-vicuna-674.mypinata.cloud/ipfs/QmUUZrnhnLuh19NegbX9iMwbFWPubB6TZbRVFHK2mfPK5M",
  accentColor = "#EC4899",
  companyTitle = "My Amigx Labs",
  companySubtitle = "Soluciones Digitales Innovadoras",
}: ProposalPreviewProps) => {
  const { t } = useTranslation();
  const totalAmount = pricing.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background:
          "linear-gradient(to bottom right, #4C1D95, #BE185D, #1E40AF)",
      }}
    >
      <div className="h-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600" />
      <ScrollArea className="flex-grow p-6">
        <div
          id="proposal-preview"
          className="max-w-4xl mx-auto bg-black/50 p-8 rounded-lg border border-pink-500 shadow-lg text-white"
        >
          {/* Header */}
          <header className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image
                src={companyLogo}
                alt="Company Logo"
                className="h-16 w-auto"
                style={{
                  filter: `drop-shadow(0 0 8px ${accentColor}80)`,
                }}
              />
            </div>
            <h1
              className="text-5xl font-bold mb-6 leading-tight"
              style={{
                background: "linear-gradient(to right, #22D3EE, #EC4899)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                paddingBottom: "0.5rem",
              }}
            >
              {companyTitle}
            </h1>
            <p className="text-xl text-cyan-300 mt-2">{companySubtitle}</p>
          </header>

          {/* Client Info */}
          <section className="mb-8">
            <h2 className="text-xl text-cyan-300 font-bold mb-4">
              {t("clientDetails")}
            </h2>
            <p>
              <span className="text-pink-400">{t("clientName")}:</span>{" "}
              {clientDetails.name}
            </p>
            <p>
              <span className="text-pink-400">{t("projectTitle")}:</span>{" "}
              {clientDetails.company}
            </p>
            <p>
              <span className="text-pink-400">Email:</span>{" "}
              {clientDetails.email}
            </p>
          </section>

          {/* Executive Summary */}
          <section className="mb-8">
            <h2 className="text-xl text-cyan-300 font-bold mb-4">
              {t("executiveSummary")}
            </h2>
            <p className="leading-relaxed">{serviceDetails.description}</p>
          </section>

          {/* Scope of Work */}
          <section className="mb-8">
            <h2 className="text-xl text-cyan-300 font-bold mb-4">
              {t("scopeOfWork")}
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {serviceDetails.scope.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Pricing */}
          <section className="mb-8">
            <h2 className="text-xl text-cyan-300 font-bold mb-4">
              {t("pricingDetails")}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-pink-500">
                <thead className="bg-pink-500/50">
                  <tr>
                    <th className="px-4 py-2 text-left border border-pink-500">
                      {t("description")}
                    </th>
                    <th className="px-4 py-2 text-right border border-pink-500">
                      {t("quantity")}
                    </th>
                    <th className="px-4 py-2 text-right border border-pink-500">
                      {t("price")}
                    </th>
                    <th className="px-4 py-2 text-right border border-pink-500">
                      {t("total")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pricing.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border border-pink-500">
                        {item.description}
                      </td>
                      <td className="px-4 py-2 text-right border border-pink-500">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-2 text-right border border-pink-500">
                        ${item.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-right border border-pink-500">
                        ${(item.price * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-cyan-600/30 rounded-lg">
              <p className="text-xl font-bold text-cyan-300">
                {t("total")}: ${totalAmount.toLocaleString()}
              </p>
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-8">
            <h2 className="text-xl text-cyan-300 font-bold mb-4">
              {t("projectTimeline")}
            </h2>
            <div className="space-y-4">
              {timeline?.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-pink-500"
                >
                  <div>
                    <h3 className="font-medium">{item.milestone}</h3>
                    <p className="text-sm text-cyan-300">
                      {t("starts")}:{" "}
                      {new Date(item.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-sm text-cyan-300">
                    {t("duration")}: {item.duration} {t(item.durationUnit)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Terms and Conditions */}
          <section>
            <h2 className="text-xl text-cyan-300 font-bold mb-4">
              {t("termsConditions")}
            </h2>
            <div className="space-y-2">
              <p>{t("standardTerms.payment")}</p>
              <p>{t("standardTerms.timeline")}</p>
              <p>{t("standardTerms.revisions")}</p>
              <p>{t("standardTerms.validity")}</p>
              {customTerms && (
                <>
                  <div className="h-px my-4 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600" />
                  <div className="whitespace-pre-wrap">{customTerms}</div>
                </>
              )}
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-pink-500 text-center text-cyan-300">
            <p>
              My Amigx Labs
              <br />
              Website: myamigxlab.com
              <br />
              Email: contact@myamigxlab.com
            </p>
          </footer>
        </div>
      </ScrollArea>

      <div className="h-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600" />
      <ExportActions
        onExportPDF={() => exportToHTML("proposal-preview")}
        onExportWord={() =>
          exportToWord({
            clientDetails,
            serviceDetails,
            pricing,
            timeline,
            customTerms,
            companyLogo,
            accentColor,
          })
        }
        companyLogo={companyLogo}
      />
    </div>
  );
};

export default ProposalPreview;
