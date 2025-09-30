import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Globe, Bell, Eye, Shield, HelpCircle, LogOut } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfoDialog } from "@/components/profile/PersonalInfoDialog";
import { LanguageDialog } from "@/components/profile/LanguageDialog";
import { NotificationsDialog } from "@/components/profile/NotificationsDialog";
import { AccessibilityDialog } from "@/components/profile/AccessibilityDialog";
import { ProfileChatbot } from "@/components/profile/ProfileChatbot";
import { HelpSupportDialog } from "@/components/profile/HelpSupportDialog";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [personalInfoOpen, setPersonalInfoOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [helpSupportOpen, setHelpSupportOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    } else if (user) {
      loadProfile();
    }
  }, [user, loading, navigate]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error("Error loading profile:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      navigate("/auth");
    } catch (error: any) {
      toast.error("Error signing out");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;
  const profileSections = [
    {
      icon: User,
      title: "Personal Information",
      description: "Update your name, age, location, and contact details",
      action: () => setPersonalInfoOpen(true),
    },
    {
      icon: Globe,
      title: "Language Preferences",
      description: "Choose your preferred language for app interface and voice assistance",
      action: () => setLanguageOpen(true),
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage alerts for medications, appointments, and government updates",
      action: () => setNotificationsOpen(true),
    },
    {
      icon: Eye,
      title: "Accessibility",
      description: "Text size, high contrast mode, screen reader, and voice navigation",
      action: () => setAccessibilityOpen(true),
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
      action: () => setHelpSupportOpen(true),
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
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {profile?.first_name && profile?.last_name
                  ? `${profile.first_name} ${profile.last_name}`
                  : "Welcome Back!"}
              </h2>
              <p className="text-white/80">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => setPersonalInfoOpen(true)}
            >
              Edit Profile
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
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

      {/* Dialogs */}
      <PersonalInfoDialog
        open={personalInfoOpen}
        onOpenChange={setPersonalInfoOpen}
        userId={user.id}
      />
      <LanguageDialog
        open={languageOpen}
        onOpenChange={setLanguageOpen}
        userId={user.id}
      />
      <NotificationsDialog
        open={notificationsOpen}
        onOpenChange={setNotificationsOpen}
        userId={user.id}
      />
      <AccessibilityDialog
        open={accessibilityOpen}
        onOpenChange={setAccessibilityOpen}
        userId={user.id}
      />
      <HelpSupportDialog
        open={helpSupportOpen}
        onOpenChange={setHelpSupportOpen}
      />

      {/* Chatbot */}
      <ProfileChatbot />
    </div>
  );
};

export default Profile;
