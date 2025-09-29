import { Camera, Mic, Sparkles, BookOpen, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/Card";
import { toast } from "sonner";

const GAssist = () => {
  const navigate = useNavigate();
  const gAssistFeatures = [
    {
      icon: Camera,
      title: "Photo-to-Form AI",
      description:
        "Upload documents and let AI automatically fill out government forms. Save time and reduce errors",
      action: () => navigate("/g-assist/photo-to-form"),
    },
    {
      icon: Mic,
      title: "Voice Chatbot",
      description:
        "Talk to our AI assistant in multiple Indian languages. Get answers to queries about government services",
      action: () => navigate("/g-assist/voice-chatbot"),
    },
    {
      icon: Sparkles,
      title: "Scheme Finder",
      description:
        "Discover government schemes you're eligible for based on your profile. Get personalized recommendations",
      action: () => toast.info("Scheme Finder - Coming Soon"),
    },
    {
      icon: BookOpen,
      title: "Step-by-Step Guides",
      description:
        "Visual instructions with images and videos to help you complete any government procedure with ease",
      action: () => toast.info("Step Guides - Coming Soon"),
    },
    {
      icon: Users,
      title: "Volunteer Network",
      description:
        "Connect with verified NGOs and volunteers for complex cases requiring human assistance",
      action: () => toast.info("Volunteer Network - Coming Soon"),
    },
  ];

  return (
    <div className="min-h-screen bg-background md:pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-12 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Government Assist</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            AI-powered tools to help you navigate government services, fill forms, 
            and discover benefits you're entitled to
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {gAssistFeatures.map((feature, index) => (
            <div
              key={feature.title}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                onClick={feature.action}
              />
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-card text-white shadow-glow">
          <h2 className="text-xl font-semibold mb-3">Making Government Services Accessible</h2>
          <p className="text-white/90 leading-relaxed">
            Navigating government services can be complex. JanSathi simplifies the process 
            with AI-powered tools that understand your needs, speak your language, and guide 
            you through every step. From form filling to scheme discovery, we're here to 
            ensure you get the support you deserve.
          </p>
        </div>

        {/* Languages Support */}
        <div className="mt-8 p-6 rounded-2xl bg-secondary border border-border">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Mic className="w-5 h-5 text-primary" />
            Multilingual Support
          </h3>
          <p className="text-sm text-muted-foreground">
            Available in Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, 
            Kannada, Malayalam, Punjabi, and more Indian languages
          </p>
        </div>
      </div>
    </div>
  );
};

export default GAssist;
