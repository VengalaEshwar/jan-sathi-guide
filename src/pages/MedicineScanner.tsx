import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MedicineScanner = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleAnalyze = async (imageDataUrl: string) => {
    setIsAnalyzing(true);
    setSelectedImage(imageDataUrl);
    setAnalysis("");

    try {
      const { data, error } = await supabase.functions.invoke("analyze-medicine", {
        body: { image: imageDataUrl },
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      toast.success("Medicine analyzed successfully");
    } catch (error: any) {
      console.error("Error analyzing medicine:", error);
      toast.error(error.message || "Failed to analyze medicine");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background md:pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/health")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Health
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Medicine Scanner</h1>
          <p className="text-muted-foreground">
            Scan medicine barcodes or strips to verify authenticity and check expiry
          </p>
        </div>

        <div className="space-y-6">
          <ImageUpload
            onImageSelect={handleAnalyze}
            onClear={() => {
              setAnalysis("");
              setSelectedImage("");
            }}
            disabled={isAnalyzing}
          />

          {isAnalyzing && (
            <div className="flex items-center justify-center gap-3 p-8 rounded-2xl bg-secondary border border-border">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <p className="text-lg">Analyzing medicine...</p>
            </div>
          )}

          {analysis && (
            <div className="p-6 rounded-2xl bg-gradient-card text-white shadow-glow animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Analysis Report</h2>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans">{analysis}</pre>
              </div>
            </div>
          )}

          {!selectedImage && !isAnalyzing && (
            <div className="p-6 rounded-2xl bg-secondary border border-border">
              <h3 className="font-semibold mb-2">How to use:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Take a clear photo of the medicine strip or bottle</li>
                <li>Ensure the barcode, expiry date, and batch number are visible</li>
                <li>Upload the image for instant analysis</li>
                <li>Get details about authenticity, expiry, and safety warnings</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineScanner;
