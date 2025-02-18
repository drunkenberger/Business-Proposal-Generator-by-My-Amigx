import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 text-white py-8 px-6 border-b border-purple-500">
        <div className="max-w-[1512px] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-6">
              <img
                src="https://lime-zygomorphic-vicuna-674.mypinata.cloud/ipfs/QmUUZrnhnLuh19NegbX9iMwbFWPubB6TZbRVFHK2mfPK5M"
                alt="My Amigx Labs Logo"
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">
                  Business Proposal Generator
                </h1>
                <p className="text-gray-300 mt-2">
                  Create professional business proposals in minutes with AI
                  assistance
                </p>
                <p className="text-sm text-cyan-300 mt-1">
                  Powered by My Amigx
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleLanguage}
              className="rounded-full border-purple-400 text-purple-400 hover:text-purple-300"
            >
              <Globe className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Fill in your project details
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
              Generate with AI
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              Export as PDF or Word
            </div>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
