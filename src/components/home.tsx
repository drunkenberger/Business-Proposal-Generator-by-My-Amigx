import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";
import AppLayout from "./app-layout";
import ProposalForm from "./ProposalForm";
import ProposalPreview from "./ProposalPreview";
import { generateProposal } from "@/lib/anthropic";

interface CostItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

import { TimelineItem } from "./TimelineInput";

interface ProposalData {
  clientName: string;
  clientEmail: string;
  projectTitle: string;
  serviceDescription: string;
  deliverables: string;
  costItems: CostItem[];
  timelineItems: TimelineItem[];
  anthropicApiKey?: string;
  customTerms?: string;
  companyLogo?: string;
  accentColor?: string;
}

const Home = () => {
  const { t, i18n } = useTranslation();
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };
  const [proposalData, setProposalData] = useState<Partial<ProposalData>>({
    clientName: "",
    clientEmail: "",
    projectTitle: "",
    serviceDescription: "",
    deliverables: "",
    costItems: [{ description: "", quantity: 1, unitPrice: 0 }],
    timelineItems: [
      { milestone: "", startDate: "", duration: 1, durationUnit: "weeks" },
    ],
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormSubmit = async (data: ProposalData) => {
    const dataWithLanguage = {
      ...data,
      language: i18n.language === "es" ? "Spanish" : "English",
    };
    if (!data.anthropicApiKey) {
      alert("Please provide an Anthropic API key");
      return;
    }

    setIsGenerating(true);
    try {
      const sections = await generateProposal(
        data.anthropicApiKey,
        dataWithLanguage,
      );

      setProposalData({
        ...data,
        serviceDescription: sections.executiveSummary,
        deliverables: sections.scopeOfWork,
        timelineItems: data.timelineItems,
      });
    } catch (error) {
      console.error("Error generating proposal:", error);
      alert(
        "Error generating proposal. Please check your API key and try again.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const formatProposalData = () => {
    const costItems =
      proposalData.costItems?.map((item) => ({
        description: item.description || "Item",
        quantity: item.quantity || 1,
        price: item.unitPrice || 0,
      })) || [];

    const scopeItems =
      proposalData.deliverables
        ?.split("\n")
        .filter(Boolean)
        .map((item) => item.trim()) || [];

    return {
      clientDetails: {
        name: proposalData.clientName || "Client Name",
        company: proposalData.projectTitle || "Company Name",
        email: proposalData.clientEmail || "client@example.com",
      },
      serviceDetails: {
        description: proposalData.serviceDescription || "Service Description",
        scope: scopeItems.length
          ? scopeItems
          : ["Service item 1", "Service item 2", "Service item 3"],
      },
      pricing: {
        items: costItems.length
          ? costItems
          : [
              { description: "Service 1", quantity: 1, price: 1000 },
              { description: "Service 2", quantity: 1, price: 2000 },
              { description: "Service 3", quantity: 1, price: 1500 },
            ],
      },
      timeline: {
        items: proposalData.timelineItems || [],
      },
      customTerms: proposalData.customTerms || "",
      companyLogo: proposalData.companyLogo,
      accentColor: proposalData.accentColor,
      companyTitle: proposalData.companyTitle,
      companySubtitle: proposalData.companySubtitle,
    };
  };

  return (
    <AppLayout>
      <main className="p-6">
        <div className="max-w-[1512px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="w-full">
              <ProposalForm
                onSubmit={handleFormSubmit}
                initialData={proposalData}
                isLoading={isGenerating}
              />
            </div>

            <div className="w-full h-[900px]">
              <ProposalPreview {...formatProposalData()} />
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default Home;
