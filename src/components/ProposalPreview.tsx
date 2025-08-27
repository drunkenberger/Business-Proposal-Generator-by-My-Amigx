import React from "react";
import { exportToProfessionalPDF, exportToProfessionalWord } from "@/lib/exportEnhanced";
import ExportActions from "./ExportActions";
import { useTranslation } from "react-i18next";
import { PricingRegion } from "@/lib/pricingRegions";
import { Button } from "./ui/button";
import { DollarSign, MapPin, FileText, Calendar, Users, Building2, Eye, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

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
  quantity: number; // Will represent hours
  price: number; // Will represent hourly rate
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
  selectedRegion?: string;
  pricingRegion?: PricingRegion;
  onRegionChange?: (region: string) => void;
  availableRegions?: PricingRegion[];
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
  companyLogo = "/images/waza-logo.png",
  accentColor = "#EC4899",
  companyTitle = "WAZA Lab",
  companySubtitle = "Fullstack Agentic Lab",
  backgroundColor = "#4C1D95",
  gradientStyle = "gradient",
  fontFamily = "sans",
  borderStyle = "simple",
  selectedRegion = "mexico",
  pricingRegion,
  onRegionChange,
  availableRegions = [],
}: ProposalPreviewProps) => {
  const { t } = useTranslation();

  const handleExportPDF = () => {
    exportToProfessionalPDF({
      clientDetails,
      serviceDetails,
      pricing,
      timeline,
      customTerms,
      companyLogo,
      companyTitle,
      companySubtitle,
      pricingRegion,
    });
  };

  const handleExportWord = () => {
    exportToProfessionalWord({
      clientDetails,
      serviceDetails,
      pricing,
      timeline,
      customTerms,
      companyLogo,
      companyTitle,
      companySubtitle,
      pricingRegion,
    });
  };

  const totalAmount = pricing.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  
  const currencySymbol = pricingRegion?.currencySymbol || "$";

  const getBorderStyle = () => {
    switch (borderStyle) {
      case "simple":
        return "border border-amber-500/30";
      case "double":
        return "border-4 border-double border-amber-500/30";
      case "glow":
        return "border border-amber-500/30 shadow-lg shadow-amber-500/20";
      default:
        return "";
    }
  };

  const getBackgroundStyle = () => {
    switch (gradientStyle) {
      case "gradient":
        return `bg-gradient-to-br from-black via-zinc-900 to-gray-900`;
      case "radial":
        return `bg-radial from-black via-zinc-900 to-gray-900`;
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
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col h-full"
    >
      {/* Enhanced Header with Region Toggle */}
      <Card className="bg-black/90 backdrop-blur-lg border-amber-500/30 shadow-2xl shadow-black/50" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.9) 100%)', backdropFilter: 'blur(20px)' }}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg shadow-lg shadow-amber-500/50">
                <Eye className="h-4 w-4 text-amber-100" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-amber-200" style={{ textShadow: '0 0 10px rgba(245,158,11,0.5)' }}>
                  Live Preview
                </CardTitle>
                <p className="text-sm text-amber-300/70 font-medium tracking-wide">Real-time proposal preview</p>
              </div>
            </div>
            
            <Badge variant="secondary" className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 text-amber-200 border-amber-500/30 shadow-lg shadow-amber-500/20">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Enhanced
            </Badge>
          </div>

          {/* Region Toggle */}
          {availableRegions.length > 0 && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">
                    {t("selectRegion") || "Pricing Region:"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
                  {availableRegions.map((region, index) => (
                    <motion.div
                      key={region.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant={selectedRegion === region.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => onRegionChange?.(region.id)}
                        className={`transition-all duration-200 text-xs ${
                          selectedRegion === region.id 
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-amber-100 shadow-lg scale-105" 
                            : "border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600"
                        }`}
                      >
                        <DollarSign className="h-3 w-3 mr-1" />
                        <span className="hidden sm:inline">{region.name}</span>
                        <span className="sm:hidden">{region.name.substring(0, 3)}</span>
                        <span className="ml-1 text-xs opacity-70 hidden md:inline">
                          ({region.currencySymbol}{region.hourlyRate}/hr)
                        </span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </CardHeader>
      </Card>
      
      {/* Enhanced Preview Container */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex-1 mt-4 min-h-0"
      >
        <Card className={`h-full bg-black/95 backdrop-blur-lg border-amber-500/30 shadow-2xl shadow-black/60 overflow-hidden ${getBorderStyle()}`}>
          <div className="h-full flex flex-col">
            <div
              id="proposal-preview"
              className={`flex-1 overflow-y-auto p-4 md:p-6 ${getFontFamily()} min-h-0 proposal-preview-scroll`}
              style={{ background: getBackgroundStyle(), scrollBehavior: 'smooth' }}
            >
              <div className="max-w-none space-y-6 proposal-content">
                {/* Enhanced Header */}
                <motion.header 
                  className="text-center mb-8"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="relative mb-6"
                >
                  <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="h-14 mx-auto filter drop-shadow-lg"
                  />
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 to-yellow-500/20 rounded-full blur-xl"></div>
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-300" style={{ textShadow: '0 0 20px rgba(245,158,11,0.5)' }}>
                    {companyTitle}
                  </h1>
                  <p className="text-base md:text-lg text-amber-300/80 font-medium tracking-wide">{companySubtitle}</p>
                  
                  <div className="mt-6 flex justify-center">
                    <Badge variant="outline" className="bg-black/50 border-amber-500/30 text-amber-200 shadow-lg shadow-amber-500/20">
                      <FileText className="h-3 w-3 mr-1" />
                      Business Proposal
                    </Badge>
                  </div>
                </motion.div>
                </motion.header>

                {/* Enhanced Client Details */}
                <motion.section 
                  className="mb-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg shadow-lg shadow-amber-500/50">
                      <Users className="h-4 w-4 text-amber-100" />
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold text-amber-200" style={{ textShadow: '0 0 10px rgba(245,158,11,0.5)' }}>
                      {t("preparedFor")}
                    </h2>
                  </div>
                  
                  <div className="bg-black/60 backdrop-blur-lg p-4 md:p-6 rounded-xl border border-amber-500/30 shadow-2xl shadow-amber-500/10" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.6) 100%)' }}>
                    <div className="grid gap-3 md:gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-amber-400" />
                          <span className="text-amber-400 font-medium text-sm md:text-base tracking-wide">{t("clientName")}:</span>
                        </div>
                        <span className="text-amber-100 font-medium text-sm md:text-base break-words">{clientDetails.name}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-amber-400" />
                          <span className="text-amber-400 font-medium text-sm md:text-base tracking-wide">{t("projectTitle")}:</span>
                        </div>
                        <span className="text-amber-100 font-medium text-sm md:text-base break-words">{clientDetails.company}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-amber-400" />
                          <span className="text-amber-400 font-medium text-sm md:text-base tracking-wide">{t("clientEmail")}:</span>
                        </div>
                        <span className="text-amber-100 font-medium text-sm md:text-base break-all">{clientDetails.email}</span>
                      </div>
                    </div>
                  </div>
                </motion.section>

                {/* Executive Summary */}
                <section className="mb-6">
                  <h2 className="text-lg md:text-xl font-semibold mb-3 text-amber-200">
                    {t("executiveSummary")}
                  </h2>
                  <div className="bg-black/30 p-4 md:p-6 rounded-lg border border-amber-500/30">
                    <p className="text-amber-100 text-sm md:text-base whitespace-pre-line leading-relaxed">
                      {serviceDetails.description}
                    </p>
                  </div>
                </section>

                {/* Scope of Work */}
                <section className="mb-6">
                  <h2 className="text-lg md:text-xl font-semibold mb-3 text-amber-200">
                    {t("scopeOfWork")}
                  </h2>
                  <div className="bg-black/30 p-4 md:p-6 rounded-lg border border-amber-500/30">
                    <ul className="list-disc list-inside space-y-2">
                      {serviceDetails.scope.map((item, index) => (
                        <li key={index} className="text-amber-100 text-sm md:text-base leading-relaxed break-words">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* Pricing Details */}
                <section className="mb-6">
                  <h2 className="text-lg md:text-xl font-semibold mb-3 text-amber-200">
                    {t("pricingDetails")}
                  </h2>
                  <div className="bg-black/30 p-4 md:p-6 rounded-lg border border-amber-500/30">
                    <div className="overflow-x-auto">
                      <table className="w-full mb-4 min-w-[400px]">
                        <thead>
                          <tr className="border-b border-amber-500/30">
                            <th className="text-left py-2 text-amber-400 text-xs md:text-sm">
                              {t("description")}
                            </th>
                            <th className="text-center py-2 text-amber-400 text-xs md:text-sm">
                              Hours
                            </th>
                            <th className="text-right py-2 text-amber-400 text-xs md:text-sm">
                              Rate (/hr)
                            </th>
                            <th className="text-right py-2 text-amber-400 text-xs md:text-sm">
                              {t("total")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {pricing.items.map((item, index) => (
                            <tr
                              key={index}
                              className="border-b border-pink-500/10 text-amber-100"
                            >
                              <td className="py-2 text-xs md:text-sm break-words">{item.description}</td>
                              <td className="text-center py-2 text-xs md:text-sm">{item.quantity} hrs</td>
                              <td className="text-right py-2 text-xs md:text-sm">
                                {currencySymbol}{item.price.toLocaleString()}/hr
                              </td>
                              <td className="text-right py-2 text-xs md:text-sm">
                                {currencySymbol}{(item.price * item.quantity).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-cyan-950/30 p-3 md:p-4 rounded-lg">
                      <p className="text-lg md:text-xl font-semibold text-amber-200 text-right">
                        {t("total")}: {currencySymbol}{totalAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Project Timeline */}
                {timeline.items.length > 0 && (
                  <section className="mb-6">
                    <h2 className="text-lg md:text-xl font-semibold mb-3 text-amber-200">
                      {t("projectTimeline")}
                    </h2>
                    <div className="bg-black/30 p-4 md:p-6 rounded-lg border border-amber-500/30 space-y-3 md:space-y-4">
                      {timeline.items.map((item, index) => (
                        <div
                          key={index}
                          className="border-b border-pink-500/10 last:border-0 pb-3 md:pb-4 last:pb-0"
                        >
                          <p className="text-amber-100 font-medium text-sm md:text-base break-words">{item.milestone}</p>
                          <p className="text-xs md:text-sm text-amber-200">
                            {t("starts")}: {item.startDate} ({item.duration}{" "}
                            {t(item.durationUnit)})
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Terms and Conditions */}
                <section className="mb-6">
                  <h2 className="text-lg md:text-xl font-semibold mb-3 text-amber-200">
                    {t("termsConditions")}
                  </h2>
                  <div className="bg-black/30 p-4 md:p-6 rounded-lg border border-amber-500/30">
                    <div className="space-y-3 md:space-y-4 text-amber-100">
                      <p className="text-sm md:text-base leading-relaxed">{t("standardTerms.payment")}</p>
                      <p className="text-sm md:text-base leading-relaxed">{t("standardTerms.timeline")}</p>
                      <p className="text-sm md:text-base leading-relaxed">{t("standardTerms.revisions")}</p>
                      <p className="text-sm md:text-base leading-relaxed">{t("standardTerms.validity")}</p>
                      {customTerms && (
                        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-amber-500/30">
                          <p className="text-sm md:text-base leading-relaxed whitespace-pre-line break-words">{customTerms}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Enhanced Export Actions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="border-t border-slate-200 bg-slate-50/80 backdrop-blur-sm"
            >
              <ExportActions
                onExportPDF={handleExportPDF}
                onExportWord={handleExportWord}
                companyLogo={companyLogo}
                clientName={clientDetails.name}
                projectTitle={clientDetails.company}
              />
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ProposalPreview;
