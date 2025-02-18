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
import { Card } from "./ui/card";
import ValidationMessage from "./ValidationMessage";
import { useForm } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

interface CostItem {
  description: string;
  quantity: number;
  unitPrice: number;
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
    { description: "", quantity: 1, unitPrice: 0 },
  ]);

  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    { milestone: "", startDate: "", duration: 1, durationUnit: "weeks" },
  ]);

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

  const addCostItem = () => {
    setCostItems([
      ...costItems,
      { description: "", quantity: 1, unitPrice: 0 },
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
    const costBreakdown = costItems
      .map((item) => `${item.description}: $${item.unitPrice * item.quantity}`)
      .join("\n");
    onSubmit({ ...data, costItems, timelineItems });
  };

  return (
    <Card className="w-full max-w-[700px] h-[900px] bg-white p-6 overflow-y-auto">
      <Tabs
        defaultValue="client"
        className="w-full"
        onValueChange={(value) => form.clearErrors()}
      >
        <TabsList className="flex flex-wrap w-full gap-2 mb-6">
          <TabsTrigger
            value="client"
            className="flex-1 min-w-[140px] px-4 py-2 h-auto whitespace-normal text-center"
          >
            {t("clientDetails")}
          </TabsTrigger>
          <TabsTrigger
            value="service"
            className="flex-1 min-w-[140px] px-4 py-2 h-auto whitespace-normal text-center"
          >
            {t("serviceDetails")}
          </TabsTrigger>
          <TabsTrigger
            value="pricing"
            className="flex-1 min-w-[140px] px-4 py-2 h-auto whitespace-normal text-center"
          >
            {t("pricingTimeline")}
          </TabsTrigger>
          <TabsTrigger
            value="terms"
            className="flex-1 min-w-[140px] px-4 py-2 h-auto whitespace-normal text-center"
          >
            {t("terms")}
          </TabsTrigger>
          <TabsTrigger
            value="styling"
            className="flex-1 min-w-[140px] px-4 py-2 h-auto whitespace-normal text-center"
          >
            {t("styling")}
          </TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <TabsContent value="client">
              <FormField
                control={form.control}
                name="anthropicApiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("anthropicApiKey")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your Anthropic API key"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="h-4" />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("clientName")}</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter client name" {...field} />
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
                      <FormLabel>{t("clientEmail")}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter client email"
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
                      <FormLabel>{t("projectTitle")}</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="service">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="serviceDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("serviceDescription")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the services to be provided"
                          className="min-h-[150px]"
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
                      <FormLabel>{t("deliverables")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List the project deliverables"
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="pricing">
              <div className="space-y-4">
                <div>
                  <FormLabel>{t("costItems")}</FormLabel>
                  <div className="space-y-2">
                    {costItems.map((item, index) => (
                      <div key={index} className="flex gap-2 items-start">
                        <div className="flex-grow">
                          <FormLabel className="text-xs mb-1">
                            Description
                          </FormLabel>
                          <Input
                            placeholder="Item description"
                            value={item.description}
                            onChange={(e) =>
                              updateCostItem(
                                index,
                                "description",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="w-20">
                          <FormLabel className="text-xs mb-1">
                            Quantity
                          </FormLabel>
                          <Input
                            type="number"
                            placeholder="Qty"
                            value={item.quantity}
                            onChange={(e) =>
                              updateCostItem(
                                index,
                                "quantity",
                                parseInt(e.target.value) || 0,
                              )
                            }
                          />
                        </div>
                        <div className="w-32">
                          <FormLabel className="text-xs mb-1">
                            Unit Price ($)
                          </FormLabel>
                          <Input
                            type="number"
                            placeholder="Price"
                            value={item.unitPrice}
                            onChange={(e) =>
                              updateCostItem(
                                index,
                                "unitPrice",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeCostItem(index)}
                          disabled={costItems.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addCostItem}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Item
                  </Button>
                </div>

                <div>
                  <FormLabel>{t("projectTimeline")}</FormLabel>
                  <TimelineInput
                    items={timelineItems}
                    onChange={setTimelineItems}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="terms">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="customTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("additionalTerms")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add any additional terms and conditions"
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="styling">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyLogo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("companyLogo")}</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="Enter logo URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accentColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("accentColor")}</FormLabel>
                      <FormControl>
                        <div className="flex gap-2 items-center">
                          <Input
                            type="color"
                            className="w-12 h-10 p-1"
                            {...field}
                          />
                          <Input
                            type="text"
                            placeholder="#000000"
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
                  name="companyTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("companyTitle")}</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companySubtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("companySubtitle")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter company subtitle"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <div className="flex justify-between pt-6">
              <ValidationMessage
                type="success"
                message="All changes saved"
                className="w-2/3"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? t("generating") : t("generateProposal")}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </Card>
  );
};

export default ProposalForm;
