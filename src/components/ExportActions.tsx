import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { FileDown, FileText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface ExportActionsProps {
  onExportPDF?: () => void;
  onExportWord?: () => void;
  isGenerating?: boolean;
  companyLogo?: string;
}

const ExportActions = ({
  onExportPDF = () => console.log("Export PDF clicked"),
  onExportWord = () => console.log("Export Word clicked"),
  isGenerating = false,
  companyLogo = "https://lime-zygomorphic-vicuna-674.mypinata.cloud/ipfs/QmUUZrnhnLuh19NegbX9iMwbFWPubB6TZbRVFHK2mfPK5M",
}: ExportActionsProps) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white p-4 border-t flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <img
          src={companyLogo}
          alt="My Amigx Labs Logo"
          className="h-6 w-auto"
        />
        <span className="text-sm text-gray-500">Powered by My Amigx</span>
      </div>
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={onExportWord}
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                {t("exportWord")}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download as Word document</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onExportPDF}
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                <FileDown className="h-4 w-4" />
                {t("exportPDF")}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download as PDF</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ExportActions;
