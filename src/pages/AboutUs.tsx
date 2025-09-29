import { Heart, Target, Users, Mail, Globe } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background md:pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary shadow-glow mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About JanSathi</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Empowering citizens with accessible healthcare and government services through AI
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-12 p-8 rounded-2xl bg-gradient-card text-white shadow-glow">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Our Mission</h2>
          </div>
          <p className="text-white/90 leading-relaxed text-lg">
            JanSathi is dedicated to breaking down barriers in healthcare and government 
            services access. We leverage AI technology to ensure that every citizen, 
            regardless of literacy level or language, can understand their medications, 
            navigate government procedures, and access the support they deserve.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card
            icon={Heart}
            title="Health Literacy"
            description="We help citizens verify medicines, understand prescriptions, and access 
            health information in their own language. Our OCR and voice tools make healthcare 
            information accessible to everyone."
          />
          <Card
            icon={Users}
            title="Government Access"
            description="Our AI-powered tools simplify government services - from auto-filling forms 
            to finding relevant schemes. We connect citizens with volunteers when needed for 
            complex cases."
          />
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-secondary border border-border text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                Available in multiple languages with voice support for all
              </p>
            </div>
            <div className="p-6 rounded-xl bg-secondary border border-border text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Compassion</h3>
              <p className="text-sm text-muted-foreground">
                Designed with empathy for those who need help the most
              </p>
            </div>
            <div className="p-6 rounded-xl bg-secondary border border-border text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">
                Connecting citizens with volunteers and verified NGOs
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="p-8 rounded-2xl bg-secondary border border-border text-center">
          <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Get in Touch</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Have questions or feedback? We'd love to hear from you. 
            Our team is here to help make JanSathi better for everyone.
          </p>
          <Button className="bg-gradient-primary hover:opacity-90 text-white shadow-glow">
            Contact Us
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-xl bg-gradient-card text-white text-center shadow-glow">
            <div className="text-3xl font-bold mb-1">10+</div>
            <div className="text-sm text-white/80">Languages</div>
          </div>
          <div className="p-6 rounded-xl bg-gradient-card text-white text-center shadow-glow">
            <div className="text-3xl font-bold mb-1">5</div>
            <div className="text-sm text-white/80">Health Tools</div>
          </div>
          <div className="p-6 rounded-xl bg-gradient-card text-white text-center shadow-glow">
            <div className="text-3xl font-bold mb-1">5</div>
            <div className="text-sm text-white/80">G-Assist Features</div>
          </div>
          <div className="p-6 rounded-xl bg-gradient-card text-white text-center shadow-glow">
            <div className="text-3xl font-bold mb-1">24/7</div>
            <div className="text-sm text-white/80">AI Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
