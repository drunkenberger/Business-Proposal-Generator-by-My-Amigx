import { Button } from "./ui/button";
import {
  ArrowRight,
  Sparkles,
  Cpu,
  Palette,
  Calculator,
  FileDown,
  Eye,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
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

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute h-full w-full bg-gradient-to-b from-black/10 via-black/60 to-black/90" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 z-10">
          <motion.div 
            className="flex flex-col items-center text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm text-amber-200 backdrop-blur-xl shadow-lg shadow-amber-500/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ filter: 'drop-shadow(0 0 10px rgba(245,158,11,0.3))' }}
            >
              <Sparkles className="mr-2 h-3.5 w-3.5 text-amber-400" />
              AI-Powered Business Proposals
            </motion.div>

            <motion.h1 
              className="mt-8 max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-7xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ textShadow: '0 0 30px rgba(245,158,11,0.3)' }}
            >
              Create Professional
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300">
                {" "}
                Business Proposals{" "}
              </span>
              in Minutes
            </motion.h1>

            <motion.p 
              className="mt-6 max-w-2xl text-lg leading-8 text-amber-100/80"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform your ideas into compelling business proposals with our
              AI-powered platform. Professional formatting, detailed cost
              breakdowns, and beautiful designs - all automated.
            </motion.p>

            <motion.div 
              className="mt-10 flex items-center gap-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-semibold hover:scale-105 transition-all duration-200 shadow-2xl shadow-amber-500/30"
                onClick={() => (window.location.href = "/app")}
                style={{ filter: 'drop-shadow(0 0 20px rgba(245,158,11,0.6))' }}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="link" 
                className="text-amber-200 hover:text-amber-100 hover:drop-shadow-lg transition-all duration-200"
                style={{ textShadow: '0 0 10px rgba(245,158,11,0.3)' }}
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32 relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div 
            className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title} 
                className="relative pl-12 group"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 ring-1 ring-amber-500/30 absolute left-0 top-0 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-200"
                     style={{ filter: 'drop-shadow(0 0 10px rgba(245,158,11,0.3))' }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold leading-7 text-white group-hover:text-amber-100 transition-colors duration-200"
                    style={{ textShadow: '0 0 10px rgba(245,158,11,0.2)' }}>
                  {feature.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-amber-100/70 group-hover:text-amber-100/90 transition-colors duration-200">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 sm:py-32 bg-black/60 relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-white text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textShadow: '0 0 20px rgba(245,158,11,0.3)' }}
          >
            Trusted by Business Leaders
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="relative bg-black/40 p-6 rounded-2xl border border-amber-500/20 backdrop-blur-sm shadow-2xl shadow-amber-500/10 hover:shadow-amber-500/20 hover:border-amber-500/30 transition-all duration-200 group"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(15,15,15,0.8) 100%)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-amber-500/30 group-hover:ring-amber-500/50 transition-all duration-200"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(245,158,11,0.3))' }}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-amber-100 transition-colors duration-200"
                        style={{ textShadow: '0 0 10px rgba(245,158,11,0.2)' }}>
                      {testimonial.name}
                    </h3>
                    <p className="text-amber-400 group-hover:text-amber-300 transition-colors duration-200">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-amber-100/70 group-hover:text-amber-100/90 transition-colors duration-200">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 sm:py-32 relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div 
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label} 
                className="text-center group"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <h3 className="text-4xl font-bold text-white mb-2 group-hover:text-amber-100 transition-colors duration-200"
                    style={{ textShadow: '0 0 20px rgba(245,158,11,0.3)' }}>
                  {stat.value}
                </h3>
                <p className="text-amber-400 group-hover:text-amber-300 transition-colors duration-200 font-medium tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer 
        className="bg-gradient-to-r from-black via-zinc-900 to-black py-12 border-t border-amber-500/20 relative z-10"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          boxShadow: 'inset 0 1px 0 rgba(245,158,11,0.1), 0 -10px 25px -5px rgba(0,0,0,0.5)'
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center gap-2"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/waza-logo.png"
                alt="WAZA Lab Logo"
                className="h-8 w-auto"
                style={{ filter: 'drop-shadow(0 0 10px rgba(245,158,11,0.6))' }}
              />
              <span className="text-sm text-amber-300/80 hover:text-amber-200 transition-colors duration-200"
                    style={{ textShadow: '0 0 5px rgba(245,158,11,0.3)' }}>
                Powered by Waza Lab using Lemy AI
              </span>
            </motion.div>
            <motion.div 
              className="text-sm text-amber-300/70"
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              © 2024 WAZA Lab. All rights reserved.
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Artista Digital",
    quote:
      "This tool has revolutionized how we create business proposals. What used to take days now takes minutes.",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    name: "Marcus Rodriguez",
    role: "Sales Director, GlobalTech",
    quote:
      "The AI-powered suggestions and professional templates have significantly improved our proposal success rate.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    name: "Emily Watson",
    role: "Freelance Consultant",
    quote:
      "As a freelancer, this tool helps me create professional proposals that compete with large agencies.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop",
  },
];

const stats = [
  {
    value: "10,000+",
    label: "Proposals Generated",
  },
  {
    value: "85%",
    label: "Success Rate",
  },
  {
    value: "2.5hrs",
    label: "Average Time Saved",
  },
  {
    value: "24/7",
    label: "AI Assistance",
  },
];

const features = [
  {
    title: "AI-Powered Generation",
    description:
      "Let AI craft professional proposals based on your input, saving hours of manual work.",
    icon: <Cpu className="h-5 w-5 text-amber-400" />,
  },
  {
    title: "Beautiful Templates",
    description:
      "Choose from a variety of modern, professional templates that make your proposals stand out.",
    icon: <Palette className="h-5 w-5 text-amber-400" />,
  },
  {
    title: "Cost Breakdowns",
    description:
      "Automatically generate detailed cost tables and pricing structures for transparency.",
    icon: <Calculator className="h-5 w-5 text-amber-400" />,
  },
  {
    title: "Export Options",
    description:
      "Download your proposals as PDF or Word documents for easy sharing and printing.",
    icon: <FileDown className="h-5 w-5 text-amber-400" />,
  },
  {
    title: "Real-time Preview",
    description:
      "See your changes instantly with our side-by-side preview as you build your proposal.",
    icon: <Eye className="h-5 w-5 text-amber-400" />,
  },
  {
    title: "Multilingual Support",
    description:
      "Generate proposals in multiple languages to reach a global audience.",
    icon: <Globe className="h-5 w-5 text-amber-400" />,
  },
];
