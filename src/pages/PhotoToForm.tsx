import { useState } from "react";
import { ArrowLeft, Loader2, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PhotoToForm = () => {
  const navigate = useNavigate();
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleExtract = async (imageDataUrl: string) => {
    setIsExtracting(true);
    setSelectedImage(imageDataUrl);
    setExtractedData("");

    try {
      const { data, error } = await supabase.functions.invoke("extract-form-data", {
        body: { image: imageDataUrl },
      });

      if (error) throw error;

      setExtractedData(data.extractedData);
      toast.success("Data extracted successfully");
    } catch (error: any) {
      console.error("Error extracting data:", error);
      toast.error(error.message || "Failed to extract form data");
    } finally {
      setIsExtracting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedData);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-background md:pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/g-assist")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to G-Assist
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Photo-to-Form AI</h1>
          <p className="text-muted-foreground">
            Upload documents and let AI automatically extract data for form filling
          </p>
        </div>

        <div className="space-y-6">
          <ImageUpload
            onImageSelect={handleExtract}
            onClear={() => {
              setExtractedData("");
              setSelectedImage("");
            }}
            disabled={isExtracting}
          />

          {isExtracting && (
            <div className="flex items-center justify-center gap-3 p-8 rounded-2xl bg-secondary border border-border">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <p className="text-lg">Extracting data...</p>
            </div>
          )}

          {extractedData && (
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-card text-white shadow-glow animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Extracted Data</h2>
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={copyToClipboard}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans">{extractedData}</pre>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-secondary border border-border">
                <p className="text-sm text-muted-foreground">
                  💡 Use the copy button to paste this data into government forms
                </p>
              </div>
            </div>
          )}

          {!selectedImage && !isExtracting && (
            <div className="p-6 rounded-2xl bg-secondary border border-border">
              <h3 className="font-semibold mb-2">How to use:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Upload your Aadhaar, PAN card, or other documents</li>
                <li>AI will extract all relevant information</li>
                <li>Copy the extracted data</li>
                <li>Paste it directly into government forms</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoToForm;
