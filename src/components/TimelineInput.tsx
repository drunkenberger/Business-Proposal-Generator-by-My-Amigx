import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormLabel } from "./ui/form";
import { Plus, Trash2 } from "lucide-react";

export interface TimelineItem {
  milestone: string;
  startDate: string;
  duration: number;
  durationUnit: "days" | "weeks" | "months";
}

interface TimelineInputProps {
  items: TimelineItem[];
  onChange: (items: TimelineItem[]) => void;
}

const TimelineInput = ({ items, onChange }: TimelineInputProps) => {
  const { t } = useTranslation();
  const addItem = () => {
    onChange([
      ...items,
      { milestone: "", startDate: "", duration: 1, durationUnit: "weeks" },
    ]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (
    index: number,
    field: keyof TimelineItem,
    value: string | number,
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="flex-grow">
              <FormLabel className="text-xs mb-1">{t("milestone")}</FormLabel>
              <Input
                placeholder="Project milestone"
                value={item.milestone}
                onChange={(e) => updateItem(index, "milestone", e.target.value)}
              />
            </div>
            <div className="w-32">
              <FormLabel className="text-xs mb-1">{t("startDate")}</FormLabel>
              <Input
                type="date"
                value={item.startDate}
                onChange={(e) => updateItem(index, "startDate", e.target.value)}
              />
            </div>
            <div className="w-20">
              <FormLabel className="text-xs mb-1">{t("duration")}</FormLabel>
              <Input
                type="number"
                min="1"
                value={item.duration}
                onChange={(e) =>
                  updateItem(index, "duration", parseInt(e.target.value) || 1)
                }
              />
            </div>
            <div className="w-24">
              <FormLabel className="text-xs mb-1">{t("unit")}</FormLabel>
              <select
                className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
                value={item.durationUnit}
                onChange={(e) =>
                  updateItem(
                    index,
                    "durationUnit",
                    e.target.value as TimelineItem["durationUnit"],
                  )
                }
              >
                <option value="days">{t("days")}</option>
                <option value="weeks">{t("weeks")}</option>
                <option value="months">{t("months")}</option>
              </select>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="mt-6"
              onClick={() => removeItem(index)}
              disabled={items.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={addItem}>
        <Plus className="h-4 w-4 mr-2" /> Add Milestone
      </Button>
    </div>
  );
};

export default TimelineInput;
