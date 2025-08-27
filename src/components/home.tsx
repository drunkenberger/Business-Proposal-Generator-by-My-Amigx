import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Globe, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import AppLayout from "./app-layout";
import ProposalForm from "./ProposalForm";
import ProposalPreview from "./ProposalPreview";
import { generateProposal } from "@/lib/anthropic";
import { PRICING_REGIONS, calculateRegionalPricing, PricingRegion } from "@/lib/pricingRegions";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";

interface CostItem {
  description: string;
  hours: number;
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
  companyTitle?: string;
  companySubtitle?: string;
  backgroundColor?: string;
  gradientStyle?: "solid" | "gradient" | "radial";
  fontFamily?: "sans" | "serif" | "mono";
  borderStyle?: "none" | "simple" | "double" | "glow";
}

interface RegionalCostItem extends CostItem {
  hourlyRate: number;
}

interface RegionalProposalData extends Partial<ProposalData> {
  region: PricingRegion;
  regionalCostItems?: RegionalCostItem[];
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
    costItems: [{ description: "", hours: 0 }],
    timelineItems: [
      { milestone: "", startDate: "", duration: 1, durationUnit: "weeks" },
    ],
    backgroundColor: "#000000",
    gradientStyle: "gradient",
    fontFamily: "sans",
    borderStyle: "simple",
    accentColor: "#FFC107",
  });

  const [regionalProposals, setRegionalProposals] = useState<RegionalProposalData[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('mexico');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStep, setGenerationStep] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFormSubmit = async (data: ProposalData) => {
    console.log("handleFormSubmit called with:", data);
    setError(null);
    setSuccess(false);
    setGenerationProgress(0);
    
    // Update all form data including styling options
    setProposalData(data);
    const dataWithLanguage = {
      ...data,
      language: i18n.language === "es" ? "Spanish" : "English",
    };
    
    console.log("API Key check:", data.anthropicApiKey);
    if (!data.anthropicApiKey) {
      console.log("No API key provided");
      setError("Please provide an Anthropic API key");
      return;
    }

    setIsGenerating(true);
    setGenerationStep("Initializing AI generation...");
    setGenerationProgress(10);

    try {
      setGenerationStep("Analyzing proposal requirements...");
      setGenerationProgress(30);

      const sections = await generateProposal(
        data.anthropicApiKey,
        dataWithLanguage,
      );

      setGenerationStep("Processing regional pricing...");
      setGenerationProgress(70);

      // Generate proposals for all three regions
      const regionalProposalsData: RegionalProposalData[] = PRICING_REGIONS.map(region => {
        const regionalCostItems = data.costItems.map(item => ({
          ...item,
          hourlyRate: region.hourlyRate // Use the region's global hourly rate
        }));
        
        return {
          ...data,
          serviceDescription: sections.executiveSummary,
          deliverables: sections.scopeOfWork,
          timelineItems: data.timelineItems,
          region: region,
          regionalCostItems: regionalCostItems,
        };
      });

      setGenerationStep("Finalizing proposal...");
      setGenerationProgress(90);
      
      setRegionalProposals(regionalProposalsData);
      setProposalData({
        ...data,
        serviceDescription: sections.executiveSummary,
        deliverables: sections.scopeOfWork,
        timelineItems: data.timelineItems,
      });

      setGenerationProgress(100);
      setGenerationStep("Proposal generated successfully!");
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (error) {
      console.error("Error generating proposal:", error);
      setError(
        error instanceof Error 
          ? `Generation failed: ${error.message}` 
          : "Error generating proposal. Please check your API key and try again."
      );
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
      setGenerationStep('');
    }
  };

  const formatProposalData = () => {
    // Find the selected regional proposal
    const selectedProposal = regionalProposals.find(p => p.region?.id === selectedRegion);
    const currentRegion = PRICING_REGIONS.find(r => r.id === selectedRegion) || PRICING_REGIONS[0];
    
    // Use regional cost items if available, otherwise use base cost items with current region rate
    const baseCostItems = selectedProposal?.regionalCostItems || 
      (proposalData.costItems || []).map(item => ({
        ...item,
        hourlyRate: currentRegion.hourlyRate
      }));
    
    const costItems = baseCostItems.map((item) => ({
      description: item.description || "Item",
      quantity: item.hours || 1,
      price: item.hourlyRate || currentRegion.hourlyRate,
    }));

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
      selectedRegion: selectedRegion,
      pricingRegion: currentRegion,
    };
  };

  return (
    <AppLayout>
      <main className="p-4 md:p-6 relative z-10">
        <div className="max-w-[1600px] mx-auto">
          {/* Status Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="mb-6"
              >
                <Alert variant="destructive" className="border-red-500/30 bg-red-900/20 backdrop-blur-sm text-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
            
            {success && (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="mb-6"
              >
                <Alert className="border-amber-500/30 bg-amber-500/10 backdrop-blur-sm">
                  <CheckCircle className="h-4 w-4 text-amber-400" />
                  <AlertDescription className="text-amber-200">
                    Proposal generated successfully! You can now export it.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {isGenerating && (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="mb-6"
              >
                <Card className="bg-black/60 border-amber-500/30 backdrop-blur-lg shadow-2xl shadow-amber-500/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Loader2 className="h-5 w-5 animate-spin text-amber-400" style={{ filter: 'drop-shadow(0 0 5px rgba(245,158,11,0.8))' }} />
                      <span className="font-medium text-amber-200" style={{ textShadow: '0 0 10px rgba(245,158,11,0.5)' }}>Generating Proposal</span>
                    </div>
                    <Progress value={generationProgress} className="mb-2 bg-gray-800 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-yellow-500 [&>div]:shadow-lg [&>div]:shadow-amber-400/50" />
                    <p className="text-sm text-amber-300/80 font-medium tracking-wide">{generationStep}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-start">
            {/* Form Column */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full order-1 lg:order-1"
            >
              <ProposalForm
                onSubmit={handleFormSubmit}
                initialData={proposalData}
                isLoading={isGenerating}
              />
            </motion.div>

            {/* Preview Column */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full h-[600px] md:h-[700px] lg:h-[900px] order-2 lg:order-2 flex flex-col"
            >
              <ProposalPreview 
                {...formatProposalData()} 
                onRegionChange={setSelectedRegion}
                availableRegions={PRICING_REGIONS}
              />
            </motion.div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default Home;
