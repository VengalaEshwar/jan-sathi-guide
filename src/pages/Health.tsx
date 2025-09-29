import { Scan, FileText, AlertTriangle, MapPin, Bell } from "lucide-react";
import { Card } from "@/components/Card";
import { toast } from "sonner";

const Health = () => {
  const healthFeatures = [
    {
      icon: Scan,
      title: "Medicine Scanner",
      description:
        "Scan barcodes or medicine strips to verify authenticity and check for expired or counterfeit drugs",
      action: () => toast.info("Medicine Scanner - Coming Soon"),
    },
    {
      icon: FileText,
      title: "Prescription Reader",
      description:
        "Upload handwritten prescriptions for OCR processing and receive audio instructions in your language",
      action: () => toast.info("Prescription Reader - Coming Soon"),
    },
    {
      icon: AlertTriangle,
      title: "Danger Alerts",
      description:
        "Get warnings about unsafe drug combinations, double dosages, and potential health risks",
      action: () => toast.info("Danger Alerts - Coming Soon"),
    },
    {
      icon: MapPin,
      title: "Nearby Clinics",
      description:
        "Find verified health centers, pharmacies, and hospitals near your location with real-time availability",
      action: () => toast.info("Nearby Clinics - Coming Soon"),
    },
    {
      icon: Bell,
      title: "Health Notifications",
      description:
        "Set medication reminders, vaccination alerts, and receive important health updates",
      action: () => toast.info("Notifications - Coming Soon"),
    },
  ];

  return (
    <div className="min-h-screen bg-background md:pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-12 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Scan className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Health Services</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Access comprehensive health tools to verify medicines, understand prescriptions, 
            and connect with healthcare providers
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {healthFeatures.map((feature, index) => (
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
          <h2 className="text-xl font-semibold mb-3">Why Health Literacy Matters</h2>
          <p className="text-white/90 leading-relaxed">
            Understanding your medications and health information is crucial for your wellbeing. 
            JanSathi helps you verify medicine authenticity, understand doctor's prescriptions, 
            and make informed health decisions. Our tools are designed to be accessible for 
            everyone, regardless of literacy level or language.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Health;
