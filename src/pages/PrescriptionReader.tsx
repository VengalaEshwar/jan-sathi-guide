import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { TextToSpeech } from "@/components/VoiceInput";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PrescriptionReader = () => {
  const navigate = useNavigate();
  const [isReading, setIsReading] = useState(false);
  const [prescriptionText, setPrescriptionText] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleRead = async (imageDataUrl: string) => {
    setIsReading(true);
    setSelectedImage(imageDataUrl);
    setPrescriptionText("");

    try {
      const { data, error } = await supabase.functions.invoke("read-prescription", {
        body: { image: imageDataUrl },
      });

      if (error) throw error;

      setPrescriptionText(data.prescriptionText);
      toast.success("Prescription read successfully");
    } catch (error: any) {
      console.error("Error reading prescription:", error);
      toast.error(error.message || "Failed to read prescription");
    } finally {
      setIsReading(false);
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
          <h1 className="text-3xl font-bold mb-2">Prescription Reader</h1>
          <p className="text-muted-foreground">
            Upload handwritten prescriptions for OCR processing and audio instructions
          </p>
        </div>

        <div className="space-y-6">
          <ImageUpload
            onImageSelect={handleRead}
            onClear={() => {
              setPrescriptionText("");
              setSelectedImage("");
            }}
            disabled={isReading}
          />

          {isReading && (
            <div className="flex items-center justify-center gap-3 p-8 rounded-2xl bg-secondary border border-border">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <p className="text-lg">Reading prescription...</p>
            </div>
          )}

          {prescriptionText && (
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-card text-white shadow-glow animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Prescription Details</h2>
                  <TextToSpeech text={prescriptionText} />
                </div>
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans">{prescriptionText}</pre>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-secondary border border-border">
                <p className="text-sm text-muted-foreground">
                  💡 Tap the speaker icon to hear the prescription read aloud in your language
                </p>
              </div>
            </div>
          )}

          {!selectedImage && !isReading && (
            <div className="p-6 rounded-2xl bg-secondary border border-border">
              <h3 className="font-semibold mb-2">How to use:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Take a clear photo of your prescription</li>
                <li>Ensure the handwriting is legible and well-lit</li>
                <li>Upload the image for OCR processing</li>
                <li>Listen to audio instructions for each medicine</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionReader;
