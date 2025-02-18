import React from "react";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface ValidationMessageProps {
  message?: string;
  type?: "success" | "error";
  className?: string;
}

const ValidationMessage = ({
  message = "Please fill in all required fields",
  type = "error",
  className = "",
}: ValidationMessageProps) => {
  const variants = {
    success: {
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      borderColor: "border-green-200",
      icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
    },
    error: {
      bgColor: "bg-red-50",
      textColor: "text-red-800",
      borderColor: "border-red-200",
      icon: <AlertCircle className="h-4 w-4 text-red-600" />,
    },
  };

  const variant = variants[type];

  return (
    <Alert
      className={`flex items-center ${variant.bgColor} ${variant.borderColor} ${className}`}
      variant="default"
    >
      <div className="mr-2">{variant.icon}</div>
      <AlertDescription className={`text-sm ${variant.textColor}`}>
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default ValidationMessage;
