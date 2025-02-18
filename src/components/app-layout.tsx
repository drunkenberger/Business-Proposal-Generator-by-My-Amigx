import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
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
                  {t("businessProposal")}
                </h1>
                <p className="text-gray-300 mt-2">{t("createProposal")}</p>
                <p className="text-sm text-cyan-300 mt-1">{t("poweredBy")}</p>
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
              {t("fillDetails")}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
              {t("generateAI")}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              {t("exportDoc")}
            </div>
          </div>
        </div>
      </header>

      {children}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 py-12 mt-12 border-t border-purple-500">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="https://lime-zygomorphic-vicuna-674.mypinata.cloud/ipfs/QmUUZrnhnLuh19NegbX9iMwbFWPubB6TZbRVFHK2mfPK5M"
                  alt="My Amigx Labs Logo"
                  className="h-8 w-auto"
                />
                <span className="text-sm text-gray-300">My Amigx Labs</span>
              </div>
              <p className="text-sm text-gray-400">
                Empowering businesses with AI-driven solutions for professional
                proposal generation.
              </p>
            </div>

            <div>
              <h3 className="text-cyan-400 font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>AI-Powered Generation</li>
                <li>Professional Templates</li>
                <li>Real-time Preview</li>
                <li>Multiple Export Options</li>
              </ul>
            </div>

            <div>
              <h3 className="text-cyan-400 font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Examples</li>
                <li>Support</li>
              </ul>
            </div>

            <div>
              <h3 className="text-cyan-400 font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>contact@myamigxlab.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Tech Street</li>
                <li>San Francisco, CA 94105</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-purple-500/30 flex justify-between items-center">
            <div className="text-sm text-gray-400">
              © 2024 My Amigx Labs. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-cyan-400">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-cyan-400">
                Terms of Service
              </a>
              <a href="#" className="hover:text-cyan-400">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
