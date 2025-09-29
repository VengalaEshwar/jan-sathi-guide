import { Heart, Sparkles, User, Info, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  const quickLinks = [
    {
      icon: Heart,
      title: "Health Services",
      description: "Scan medicines, read prescriptions, and find nearby clinics",
      path: "/health",
      gradient: true,
    },
    {
      icon: Sparkles,
      title: "Government Assist",
      description: "AI-powered help with forms, schemes, and services",
      path: "/g-assist",
      gradient: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background md:pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary shadow-glow mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Welcome to JanSathi
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your AI-powered co-pilot for healthcare and government services. 
            Access vital information, get personalized assistance, and navigate 
            services with ease.
          </p>
          <Button
            onClick={() => navigate("/health")}
            className="mt-6 bg-gradient-primary hover:opacity-90 text-white shadow-glow px-8 py-6 text-lg rounded-xl"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {quickLinks.map((link) => (
            <Card
              key={link.path}
              icon={link.icon}
              title={link.title}
              description={link.description}
              gradient={link.gradient}
              onClick={() => navigate(link.path)}
            />
          ))}
        </div>

        {/* Additional Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            icon={User}
            title="Your Profile"
            description="Manage preferences, language settings, and accessibility options"
            onClick={() => navigate("/profile")}
          />
          <Card
            icon={Info}
            title="About JanSathi"
            description="Learn about our mission to make services accessible for everyone"
            onClick={() => navigate("/about")}
          />
        </div>

        {/* Features Overview */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-xl bg-secondary border border-border">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Health Literacy</h3>
              <p className="text-sm text-muted-foreground">
                Verify medicines, understand prescriptions, and access health information
              </p>
            </div>
            <div className="p-6 rounded-xl bg-secondary border border-border">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">AI Assistance</h3>
              <p className="text-sm text-muted-foreground">
                Voice chatbot, smart forms, and personalized scheme recommendations
              </p>
            </div>
            <div className="p-6 rounded-xl bg-secondary border border-border">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                <Info className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Accessible Design</h3>
              <p className="text-sm text-muted-foreground">
                Multiple languages, voice support, and easy-to-use interface
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
