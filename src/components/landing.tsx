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

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute h-full w-full bg-gradient-to-b from-black/5 via-black/50 to-black/80" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-sm text-pink-400 backdrop-blur-xl">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              AI-Powered Business Proposals
            </div>

            <h1 className="mt-8 max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-7xl">
              Create Professional
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                {" "}
                Business Proposals{" "}
              </span>
              in Minutes
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Transform your ideas into compelling business proposals with our
              AI-powered platform. Professional formatting, detailed cost
              breakdowns, and beautiful designs - all automated.
            </p>

            <div className="mt-10 flex items-center gap-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-400 to-pink-500 hover:opacity-90"
                onClick={() => (window.location.href = "/app")}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="link" className="text-gray-300 hover:text-white">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="relative pl-12">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-500/10 ring-1 ring-pink-500/30 absolute left-0 top-0">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold leading-7 text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 sm:py-32 bg-black/40">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-12">
            Trusted by Business Leaders
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="relative bg-black/20 p-6 rounded-2xl border border-pink-500/20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-cyan-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <h3 className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-cyan-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/40 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img
                src="https://lime-zygomorphic-vicuna-674.mypinata.cloud/ipfs/QmUUZrnhnLuh19NegbX9iMwbFWPubB6TZbRVFHK2mfPK5M"
                alt="My Amigx Labs Logo"
                className="h-8 w-auto"
              />
              <span className="text-sm text-gray-400">Powered by My Amigx</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 My Amigx Labs. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, TechVision Inc",
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
    icon: <Cpu className="h-5 w-5 text-pink-400" />,
  },
  {
    title: "Beautiful Templates",
    description:
      "Choose from a variety of modern, professional templates that make your proposals stand out.",
    icon: <Palette className="h-5 w-5 text-pink-400" />,
  },
  {
    title: "Cost Breakdowns",
    description:
      "Automatically generate detailed cost tables and pricing structures for transparency.",
    icon: <Calculator className="h-5 w-5 text-pink-400" />,
  },
  {
    title: "Export Options",
    description:
      "Download your proposals as PDF or Word documents for easy sharing and printing.",
    icon: <FileDown className="h-5 w-5 text-pink-400" />,
  },
  {
    title: "Real-time Preview",
    description:
      "See your changes instantly with our side-by-side preview as you build your proposal.",
    icon: <Eye className="h-5 w-5 text-pink-400" />,
  },
  {
    title: "Multilingual Support",
    description:
      "Generate proposals in multiple languages to reach a global audience.",
    icon: <Globe className="h-5 w-5 text-pink-400" />,
  },
];
