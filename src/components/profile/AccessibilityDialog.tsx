import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AccessibilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export const AccessibilityDialog = ({ open, onOpenChange, userId }: AccessibilityDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    text_size: "medium",
    high_contrast: false,
    screen_reader: false,
    voice_navigation: true,
  });

  useEffect(() => {
    if (open && userId) {
      loadSettings();
    }
  }, [open, userId]);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("text_size, high_contrast, screen_reader, voice_navigation")
        .eq("id", userId)
        .maybeSingle();

      if (error) throw error;
      if (data) setSettings(data);
    } catch (error: any) {
      toast.error("Error loading accessibility settings");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: userId,
          ...settings,
        });

      if (error) throw error;

      toast.success("Accessibility settings updated");
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Error updating settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Accessibility Settings</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Text Size</Label>
            <Select value={settings.text_size} onValueChange={(value) => setSettings({ ...settings, text_size: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="extra-large">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="high_contrast">High Contrast Mode</Label>
            <Switch
              id="high_contrast"
              checked={settings.high_contrast}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, high_contrast: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="screen_reader">Screen Reader Support</Label>
            <Switch
              id="screen_reader"
              checked={settings.screen_reader}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, screen_reader: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="voice_navigation">Voice Navigation</Label>
            <Switch
              id="voice_navigation"
              checked={settings.voice_navigation}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, voice_navigation: checked })
              }
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
