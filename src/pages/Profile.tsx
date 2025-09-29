import { User, Globe, Bell, Eye, Shield, HelpCircle } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Profile = () => {
  const profileSections = [
    {
      icon: User,
      title: "Personal Information",
      description: "Update your name, age, location, and contact details",
      action: () => toast.info("Personal Info - Coming Soon"),
    },
    {
      icon: Globe,
      title: "Language Preferences",
      description: "Choose your preferred language for app interface and voice assistance",
      action: () => toast.info("Language Settings - Coming Soon"),
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage alerts for medications, appointments, and government updates",
      action: () => toast.info("Notification Settings - Coming Soon"),
    },
    {
      icon: Eye,
      title: "Accessibility",
      description: "Text size, high contrast mode, screen reader, and voice navigation",
      action: () => toast.info("Accessibility - Coming Soon"),
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Control data sharing, biometric access, and account security",
      action: () => toast.info("Privacy Settings - Coming Soon"),
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      description: "FAQs, tutorials, and contact support for assistance",
      action: () => toast.info("Help Center - Coming Soon"),
    },
  ];

  return (
    <div className="min-h-screen bg-background md:pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-12 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <User className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Your Profile</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Manage your account settings, preferences, and accessibility options
          </p>
        </div>

        {/* Profile Card */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-card text-white shadow-glow">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Welcome Back!</h2>
              <p className="text-white/80">Manage your JanSathi experience</p>
            </div>
          </div>
          <Button
            className="mt-4 bg-white text-primary hover:bg-white/90"
            onClick={() => toast.info("Edit Profile - Coming Soon")}
          >
            Edit Profile
          </Button>
        </div>

        {/* Settings Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {profileSections.map((section, index) => (
            <div
              key={section.title}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card
                icon={section.icon}
                title={section.title}
                description={section.description}
                onClick={section.action}
              />
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-secondary border border-border text-center">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-sm text-muted-foreground mt-1">Scans</div>
          </div>
          <div className="p-4 rounded-xl bg-secondary border border-border text-center">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-sm text-muted-foreground mt-1">Forms Filled</div>
          </div>
          <div className="p-4 rounded-xl bg-secondary border border-border text-center">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-sm text-muted-foreground mt-1">Schemes Found</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
