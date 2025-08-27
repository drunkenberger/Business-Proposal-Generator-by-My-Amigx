import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TimelineInput, { TimelineItem } from "./TimelineInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import ValidationMessage from "./ValidationMessage";
import { useForm } from "react-hook-form";
import { Plus, Trash2, HelpCircle, User, Briefcase, DollarSign, FileText, Palette, Loader2, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface CostItem {
  description: string;
  hours: number;
}

interface ProposalFormData {
  clientName: string;
  clientEmail: string;
  projectTitle: string;
  serviceDescription: string;
  deliverables: string;
  costItems: CostItem[];
  timelineItems: TimelineItem[];
  anthropicApiKey?: string;
  customTerms: string;
  companyLogo?: string;
  accentColor?: string;
  companyTitle?: string;
  companySubtitle?: string;
  backgroundColor?: string;
  gradientStyle?: "solid" | "gradient" | "radial";
  fontFamily?: "sans" | "serif" | "mono";
  borderStyle?: "none" | "simple" | "double" | "glow";
}

interface ProposalFormProps {
  onSubmit?: (data: ProposalFormData) => void;
  initialData?: Partial<ProposalFormData>;
  isLoading?: boolean;
}

const ProposalForm = ({
  onSubmit = (data) => console.log("Form submitted:", data),
  initialData = {},
  isLoading = false,
}: ProposalFormProps) => {
  const { t } = useTranslation();
  const [costItems, setCostItems] = useState<CostItem[]>([
    { description: "", hours: 0 },
  ]);

  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    { milestone: "", startDate: "", duration: 1, durationUnit: "weeks" },
  ]);

  const [activeTab, setActiveTab] = useState("client");
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const form = useForm<ProposalFormData>({
    mode: "onChange",
    defaultValues: {
      clientName: initialData.clientName || "",
      clientEmail: initialData.clientEmail || "",
      projectTitle: initialData.projectTitle || "",
      serviceDescription: initialData.serviceDescription || "",
      deliverables: initialData.deliverables || "",
      costItems: initialData.costItems || costItems,
      timelineItems: initialData.timelineItems || timelineItems,
      anthropicApiKey: initialData.anthropicApiKey || "",
    },
  });

  const tabIcons = {
    client: User,
    service: Briefcase,
    pricing: DollarSign,
    terms: FileText,
    styling: Palette,
  };

  const tabProgress = [
    { id: "client", title: t("clientDetails"), description: "Basic client information" },
    { id: "service", title: t("serviceDetails"), description: "Service description and deliverables" },
    { id: "pricing", title: t("pricingTimeline"), description: "Cost breakdown and timeline" },
    { id: "terms", title: t("terms"), description: "Additional terms and conditions" },
    { id: "styling", title: t("styling"), description: "Visual customization options" },
  ];

  const calculateProgress = () => {
    const totalSections = tabProgress.length;
    const completed = completedSections.length;
    return (completed / totalSections) * 100;
  };

  const isTabCompleted = (tabId: string) => completedSections.includes(tabId);
  
  const markTabCompleted = (tabId: string) => {
    if (!completedSections.includes(tabId)) {
      setCompletedSections([...completedSections, tabId]);
    }
  };

  const addCostItem = () => {
    setCostItems([
      ...costItems,
      { description: "", hours: 0 },
    ]);
  };

  const removeCostItem = (index: number) => {
    setCostItems(costItems.filter((_, i) => i !== index));
  };

  const updateCostItem = (
    index: number,
    field: keyof CostItem,
    value: string | number,
  ) => {
    const newItems = [...costItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setCostItems(newItems);
  };

  const handleSubmit = (data: ProposalFormData) => {
    console.log("Form submitted with data:", data);
    console.log("Cost items:", costItems);
    console.log("Timeline items:", timelineItems);
    
    const costBreakdown = costItems
      .map((item) => `${item.description}: ${item.hours} hours`)
      .join("\n");
    
    const submitData = { ...data, costItems, timelineItems };
    console.log("Calling onSubmit with:", submitData);
    onSubmit(submitData);
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-[700px]"
    >
      <Card className="bg-black/90 backdrop-blur-lg border-amber-500/30 shadow-2xl shadow-black/50" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.9) 100%)', backdropFilter: 'blur(20px)' }}>
        <CardHeader className="pb-3 md:pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div>
              <CardTitle className="text-lg md:text-xl font-semibold text-amber-200" style={{ textShadow: '0 0 10px rgba(245,158,11,0.5)' }}>
                Create Your Proposal
              </CardTitle>
              <CardDescription className="text-amber-300/70 mt-1 text-sm font-medium tracking-wide">
                Provide basic information - our AI will enrich and expand it into a comprehensive proposal
              </CardDescription>
              <div className="mt-2 flex items-center gap-2 text-xs text-amber-400/80">
                <span className="inline-block w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                AI Enhancement: Transforms simple inputs into detailed, professional content
              </div>
            </div>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-200 border-amber-500/30 text-xs shadow-lg shadow-amber-500/20">
              {Math.round(calculateProgress())}% Complete
            </Badge>
          </div>
          
          <div className="mt-4">
            <Progress value={calculateProgress()} className="h-2 bg-gray-800 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-yellow-500 [&>div]:shadow-lg [&>div]:shadow-amber-400/50" />
          </div>
        </CardHeader>

        <CardContent className="px-4 md:px-6">
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value);
              form.clearErrors();
            }}
            className="w-full"
          >
            {/* Enhanced Tab Navigation */}
            <div className="mb-6">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 bg-black/60 border border-amber-500/20 p-1 h-auto backdrop-blur-lg" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(15,15,15,0.9) 100%)' }}>
                {tabProgress.map((tab, index) => {
                  const Icon = tabIcons[tab.id as keyof typeof tabIcons];
                  const isCompleted = isTabCompleted(tab.id);
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex-col gap-1 h-auto py-2 md:py-3 px-1 md:px-2 data-[state=active]:bg-amber-500/20 data-[state=active]:shadow-lg data-[state=active]:shadow-amber-500/30 data-[state=active]:border data-[state=active]:border-amber-500/40 text-amber-200 hover:bg-amber-500/10 transition-all duration-200"
                    >
                      <div className="flex items-center gap-1">
                        {isCompleted ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 md:w-4 h-3 md:h-4 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/50"
                          >
                            <Check className="w-2 md:w-2.5 h-2 md:h-2.5 text-white" />
                          </motion.div>
                        ) : (
                          <Icon className={`w-3 md:w-4 h-3 md:h-4 ${isActive ? 'text-amber-400' : 'text-amber-300/60'}`} />
                        )}
                      </div>
                      <span className={`text-xs font-medium ${isActive ? 'text-amber-200' : 'text-amber-300/70'} hidden md:block tracking-wide`}>
                        {tab.title}
                      </span>
                      <span className={`text-xs font-medium ${isActive ? 'text-amber-200' : 'text-amber-300/70'} md:hidden tracking-wide`}>
                        {tab.title.split(' ')[0]}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <Form {...form}>
              <div className="max-h-[400px] md:max-h-[500px] xl:max-h-[600px] overflow-y-auto pr-2">
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TabsContent value="client" className="space-y-6 mt-0">
                        <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 p-4 rounded-lg border border-amber-500/30 shadow-lg backdrop-blur-sm" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(251,191,36,0.1) 100%)' }}>
                          <h3 className="font-semibold text-amber-200 mb-2" style={{ textShadow: '0 0 5px rgba(245,158,11,0.5)' }}>API Configuration</h3>
                          <FormField
                            control={form.control}
                            name="anthropicApiKey"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex items-center gap-2">
                                  <FormLabel className="text-blue-800">{t("anthropicApiKey")}</FormLabel>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-4 w-4 p-0 hover:bg-transparent"
                                          onClick={() =>
                                            window.open(
                                              "https://console.anthropic.com/account/keys",
                                              "_blank",
                                            )
                                          }
                                          type="button"
                                        >
                                          <HelpCircle className="h-4 w-4 text-blue-600" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent className="max-w-[300px]">
                                        <p>Get your API key from Anthropic Console:</p>
                                        <ol className="list-decimal ml-4 mt-1 text-sm">
                                          <li>Go to console.anthropic.com</li>
                                          <li>Sign up or log in to your account</li>
                                          <li>Navigate to API Keys section</li>
                                          <li>
                                            Click &quot;Create Key&quot; to generate a new
                                            key
                                          </li>
                                        </ol>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                                <FormControl>
                                  <Input
                                    type="password"
                                    placeholder="sk-ant-..."
                                    className="bg-white/80 border-blue-200 focus:border-blue-400"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-semibold text-amber-200 text-lg">Client Information</h3>
                          
                          <FormField
                            control={form.control}
                            name="clientName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-amber-200 font-medium tracking-wide">{t("clientName")}</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="John Smith" 
                                    className="border-amber-500/30 focus:border-amber-400 bg-black/60 text-amber-100 placeholder:text-amber-300/50 transition-all duration-200 focus:shadow-lg focus:shadow-amber-500/20 transition-colors"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="clientEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-amber-200 font-medium tracking-wide">{t("clientEmail")}</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="john@company.com"
                                    className="border-amber-500/30 focus:border-amber-400 bg-black/60 text-amber-100 placeholder:text-amber-300/50 transition-all duration-200 focus:shadow-lg focus:shadow-amber-500/20 transition-colors"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="projectTitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-amber-200 font-medium tracking-wide" style={{ textShadow: '0 0 5px rgba(245,158,11,0.3)' }}>{t("projectTitle")}</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Website Redesign Project" 
                                    className="border-amber-500/30 focus:border-amber-400 bg-black/50 text-amber-100 placeholder:text-amber-300/50 backdrop-blur-sm transition-all duration-200 focus:shadow-lg focus:shadow-amber-500/20"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="service" className="space-y-6 mt-0">
                        <h3 className="font-semibold text-amber-200 text-lg" style={{ textShadow: '0 0 10px rgba(245,158,11,0.5)' }}>Service Details</h3>
                        
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="serviceDescription"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-amber-200 font-medium tracking-wide" style={{ textShadow: '0 0 5px rgba(245,158,11,0.3)' }}>{t("serviceDescription")}</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Brief service description (AI will expand this into detailed methodology and approach)"
                                    className="min-h-[150px] border-amber-500/30 focus:border-amber-400 bg-black/50 text-amber-100 placeholder:text-amber-300/50 backdrop-blur-sm transition-all duration-200 focus:shadow-lg focus:shadow-amber-500/20"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="deliverables"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-amber-200 font-medium tracking-wide" style={{ textShadow: '0 0 5px rgba(245,158,11,0.3)' }}>{t("deliverables")}</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Basic deliverables list (AI will add technical specs, quality assurance, and detailed outcomes)"
                                    className="min-h-[150px] border-amber-500/30 focus:border-amber-400 bg-black/50 text-amber-100 placeholder:text-amber-300/50 backdrop-blur-sm transition-all duration-200 focus:shadow-lg focus:shadow-amber-500/20"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="pricing" className="space-y-6 mt-0">
                        <h3 className="font-semibold text-amber-200 text-lg" style={{ textShadow: '0 0 10px rgba(245,158,11,0.5)' }}>Pricing & Timeline</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <FormLabel className="text-amber-200 font-medium tracking-wide" style={{ textShadow: '0 0 5px rgba(245,158,11,0.3)' }}>{t("costItems")}</FormLabel>
                            <div className="space-y-3 mt-2">
                              {costItems.map((item, index) => (
                                <motion.div 
                                  key={index} 
                                  className="flex gap-2 items-start p-3 bg-slate-50 rounded-lg border border-slate-200"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <div className="flex-grow">
                                    <FormLabel className="text-xs mb-1 text-amber-300/80 font-medium tracking-wide">
                                      Description
                                    </FormLabel>
                                    <Input
                                      placeholder="Service item (e.g., 'Frontend Development')"
                                      value={item.description}
                                      className="border-amber-500/30 focus:border-amber-400 bg-black/60 text-amber-100 placeholder:text-amber-300/50 transition-all duration-200 focus:shadow-lg focus:shadow-amber-500/20"
                                      onChange={(e) =>
                                        updateCostItem(
                                          index,
                                          "description",
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="w-24">
                                    <FormLabel className="text-xs mb-1 text-amber-300/80 font-medium tracking-wide">
                                      Hours
                                    </FormLabel>
                                    <Input
                                      type="number"
                                      placeholder="0"
                                      value={item.hours}
                                      className="border-amber-500/30 focus:border-amber-400 bg-black/60 text-amber-100 placeholder:text-amber-300/50 transition-all duration-200 focus:shadow-lg focus:shadow-amber-500/20"
                                      onChange={(e) =>
                                        updateCostItem(
                                          index,
                                          "hours",
                                          parseInt(e.target.value) || 0,
                                        )
                                      }
                                    />
                                    <p className="text-xs text-amber-400/60 mt-1 font-medium">
                                      Rate set by region
                                    </p>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="mt-5"
                                    onClick={() => removeCostItem(index)}
                                    disabled={costItems.length === 1}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                              ))}
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addCostItem}
                              className="mt-3 border-blue-200 text-blue-600 hover:bg-blue-50"
                            >
                              <Plus className="h-4 w-4 mr-2" /> Add Item
                            </Button>
                          </div>

                          <div>
                            <FormLabel className="text-amber-200 font-medium tracking-wide">{t("projectTimeline")}</FormLabel>
                            <div className="mt-2">
                              <TimelineInput
                                items={timelineItems}
                                onChange={setTimelineItems}
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="terms" className="space-y-6 mt-0">
                        <h3 className="font-semibold text-amber-200 text-lg">Terms & Conditions</h3>
                        
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="customTerms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-amber-200 font-medium tracking-wide">{t("additionalTerms")}</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Any specific requirements or conditions (AI will add standard business terms)"
                                    className="min-h-[200px] border-amber-500/30 focus:border-amber-400 bg-black/60 text-amber-100 placeholder:text-amber-300/50 transition-all duration-200 focus:shadow-lg focus:shadow-amber-500/20 transition-colors"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="styling" className="space-y-6 mt-0">
                        <h3 className="font-semibold text-amber-200 text-lg">Visual Customization</h3>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="companyLogo"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-amber-200 font-medium tracking-wide">{t("companyLogo")}</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="url"
                                      placeholder="https://..."
                                      className="border-amber-500/30 focus:border-amber-400 bg-black/60 text-amber-100 placeholder:text-amber-300/50 transition-all duration-200 focus:shadow-lg focus:shadow-amber-500/20 transition-colors"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="companyTitle"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-amber-200 font-medium tracking-wide">{t("companyTitle")}</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="WAZA Lab" 
                                      className="border-amber-500/30 focus:border-amber-400 bg-black/60 text-amber-100 placeholder:text-amber-300/50 transition-all duration-200 focus:shadow-lg focus:shadow-amber-500/20 transition-colors"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="companySubtitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-amber-200 font-medium tracking-wide">{t("companySubtitle")}</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Professional Business Solutions"
                                    className="border-amber-500/30 focus:border-amber-400 bg-black/60 text-amber-100 placeholder:text-amber-300/50 transition-all duration-200 focus:shadow-lg focus:shadow-amber-500/20 transition-colors"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="accentColor"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-amber-200 font-medium tracking-wide">{t("accentColor")}</FormLabel>
                                  <FormControl>
                                    <div className="flex gap-2 items-center">
                                      <Input
                                        type="color"
                                        className="w-12 h-10 p-1 border-slate-200"
                                        {...field}
                                      />
                                      <Input
                                        type="text"
                                        placeholder="#000000"
                                        className="flex-1 border-amber-500/30 focus:border-amber-400 bg-black/60 text-amber-100 placeholder:text-amber-300/50 transition-all duration-200 focus:shadow-lg focus:shadow-amber-500/20 transition-colors"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="backgroundColor"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-amber-200 font-medium tracking-wide">{t("backgroundColor")}</FormLabel>
                                  <FormControl>
                                    <div className="flex gap-2 items-center">
                                      <Input
                                        type="color"
                                        className="w-12 h-10 p-1 border-slate-200"
                                        {...field}
                                      />
                                      <Input
                                        type="text"
                                        placeholder="#000000"
                                        className="flex-1 border-amber-500/30 focus:border-amber-400 bg-black/60 text-amber-100 placeholder:text-amber-300/50 transition-all duration-200 focus:shadow-lg focus:shadow-amber-500/20 transition-colors"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </TabsContent>

                    </motion.div>
                  </AnimatePresence>

                  {/* Enhanced Submit Section */}
                  <motion.div 
                    className="flex items-center justify-between pt-6 border-t border-amber-500/30"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-2">
                      {calculateProgress() === 100 && (
                        <Badge variant="default" className="bg-amber-500/20 text-amber-200 border-amber-500/30 hover:bg-amber-500/30">
                          <Check className="w-3 h-3 mr-1" />
                          Ready to Generate
                        </Badge>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                      onClick={() => console.log("Button clicked! Progress:", calculateProgress())}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {t("generating")}
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4 mr-2" />
                          {t("generateProposal")}
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProposalForm;
