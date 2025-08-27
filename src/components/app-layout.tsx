import { Globe, Sparkles, FileText, Download, CheckCircle, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };

  const progressSteps = [
    { 
      id: "fillDetails", 
      icon: FileText, 
      color: "from-amber-400 to-yellow-500",
      bgColor: "bg-amber-500/10 border-amber-700/30",
      description: t("fillDetails") 
    },
    { 
      id: "generateAI", 
      icon: Sparkles, 
      color: "from-amber-300 to-amber-400",
      bgColor: "bg-amber-400/10 border-amber-600/30", 
      description: t("generateAI") 
    },
    { 
      id: "exportDoc", 
      icon: Download, 
      color: "from-yellow-400 to-amber-500",
      bgColor: "bg-yellow-500/10 border-yellow-600/30", 
      description: t("exportDoc") 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-zinc-800 relative overflow-hidden">
      {/* Film Grain Overlay */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}></div>
      
      {/* Venetian Blind Shadow Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(255,255,255,0.02) 15px, rgba(255,255,255,0.02) 18px)'
      }}></div>
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-black/90 backdrop-blur-xl border-b border-amber-500/20 sticky top-0 z-50 shadow-2xl shadow-amber-500/10"
        style={{
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.8), 0 4px 6px -2px rgba(245,158,11,0.1), inset 0 -1px 0 rgba(245,158,11,0.3)'
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex justify-between items-center py-3 md:py-4">
            {/* Logo and Title Section */}
            <motion.div 
              className="flex items-center gap-3 md:gap-6"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="relative">
                  <img
                    src="/images/waza-logo.png"
                    alt="WAZA Lab Logo"
                    className="h-8 md:h-10 w-auto filter drop-shadow-lg"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(245,158,11,0.6))' }}
                  />
                  <div className="absolute -top-1 -right-1 w-2 md:w-3 h-2 md:h-3 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full animate-pulse shadow-lg shadow-amber-400/50"></div>
                </div>
                <div className="hidden sm:block border-l border-amber-500/30 pl-2 md:pl-3">
                  <Badge variant="secondary" className="text-xs font-medium bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-200 border border-amber-500/30 shadow-lg shadow-amber-500/20">
                    WAZA Lab
                  </Badge>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent drop-shadow-2xl"
                    style={{ textShadow: '0 0 20px rgba(245,158,11,0.3)' }}>
                  {t("businessProposal")}
                </h1>
                <p className="text-xs lg:text-sm text-amber-300/80 mt-1 font-medium tracking-wide">{t("createProposal")}</p>
              </div>
            </motion.div>

            {/* Actions Section */}
            <motion.div 
              className="flex items-center gap-3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge variant="outline" className="hidden lg:flex items-center gap-1 text-xs px-3 py-1 bg-amber-500/10 text-amber-200 border-amber-500/30 shadow-lg shadow-amber-500/20">
                <CheckCircle className="h-3 w-3" />
                {t("poweredBy")}
              </Badge>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="rounded-full border-amber-500/30 hover:border-amber-400/50 bg-black/50 text-amber-200 hover:text-amber-100 hover:bg-amber-500/10 transition-all duration-200 hover:scale-105 shadow-lg shadow-amber-500/20"
              >
                <Globe className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{i18n.language.toUpperCase()}</span>
              </Button>
            </motion.div>
          </div>

          {/* Progress Steps */}
          <motion.div 
            className="pb-3 md:pb-4"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex flex-wrap gap-2 md:gap-4 lg:gap-6">
              {progressSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg ${step.bgColor} border transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(245,158,11,0.3)' }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(15,15,15,0.8) 100%)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <div className={`p-1 md:p-1.5 rounded-md bg-gradient-to-r ${step.color}`}>
                      <Icon className="h-2.5 md:h-3 w-2.5 md:w-3 text-white" />
                    </div>
                    <span className="text-xs font-medium text-amber-200 hidden sm:inline tracking-wide">{step.description}</span>
                    <span className="text-xs font-medium text-amber-200 sm:hidden tracking-wide">{step.description.split(' ')[0]}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {children}
      </motion.main>

      {/* Footer */}
      <motion.footer 
        className="bg-gradient-to-r from-black via-zinc-900 to-black mt-16 border-t border-amber-500/20 relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          boxShadow: 'inset 0 1px 0 rgba(245,158,11,0.1), 0 -10px 25px -5px rgba(0,0,0,0.5)'
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/waza-logo.png"
                  alt="WAZA Lab Logo"
                  className="h-8 w-auto"
                />
                <span className="text-lg font-semibold text-amber-200" style={{ textShadow: '0 0 10px rgba(245,158,11,0.5)' }}>WAZA Lab</span>
              </div>
              <p className="text-sm text-amber-300/70 leading-relaxed">
                Empowering businesses with AI-driven solutions for professional
                proposal generation and business process automation.
              </p>
            </div>

            <div>
              <h3 className="text-amber-200 font-semibold mb-4 text-sm uppercase tracking-wide" style={{ textShadow: '0 0 5px rgba(245,158,11,0.3)' }}>Features</h3>
              <ul className="space-y-3 text-sm text-amber-300/70">
                <li className="hover:text-amber-200 transition-colors cursor-pointer hover:drop-shadow-lg">AI-Powered Generation</li>
                <li className="hover:text-amber-200 transition-colors cursor-pointer hover:drop-shadow-lg">Professional Templates</li>
                <li className="hover:text-amber-200 transition-colors cursor-pointer hover:drop-shadow-lg">Real-time Preview</li>
                <li className="hover:text-amber-200 transition-colors cursor-pointer hover:drop-shadow-lg">Multiple Export Options</li>
              </ul>
            </div>

            <div>
              <h3 className="text-amber-200 font-semibold mb-4 text-sm uppercase tracking-wide" style={{ textShadow: '0 0 5px rgba(245,158,11,0.3)' }}>Resources</h3>
              <ul className="space-y-3 text-sm text-amber-300/70">
                <li className="hover:text-amber-200 transition-colors cursor-pointer hover:drop-shadow-lg">Documentation</li>
                <li className="hover:text-amber-200 transition-colors cursor-pointer hover:drop-shadow-lg">API Reference</li>
                <li className="hover:text-amber-200 transition-colors cursor-pointer hover:drop-shadow-lg">Examples</li>
                <li className="hover:text-amber-200 transition-colors cursor-pointer hover:drop-shadow-lg">Support Center</li>
              </ul>
            </div>

            <div>
              <h3 className="text-amber-200 font-semibold mb-4 text-sm uppercase tracking-wide" style={{ textShadow: '0 0 5px rgba(245,158,11,0.3)' }}>Contact</h3>
              <ul className="space-y-3 text-sm text-amber-300/70">
                <li className="hover:text-amber-200 transition-colors hover:drop-shadow-lg">contact@wazalab.com</li>
                <li className="hover:text-amber-200 transition-colors hover:drop-shadow-lg">+1 (555) 123-4567</li>
                <li className="hover:text-amber-200 transition-colors hover:drop-shadow-lg">123 Innovation Drive</li>
                <li className="hover:text-amber-200 transition-colors hover:drop-shadow-lg">San Francisco, CA 94105</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-amber-500/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-amber-300/70">
              © 2024 WAZA Lab. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-amber-300/70">
              <a href="#" className="hover:text-amber-200 transition-colors hover:drop-shadow-lg">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-amber-200 transition-colors hover:drop-shadow-lg">
                Terms of Service
              </a>
              <a href="#" className="hover:text-amber-200 transition-colors hover:drop-shadow-lg">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
