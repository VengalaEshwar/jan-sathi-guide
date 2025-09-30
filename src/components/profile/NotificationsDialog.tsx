import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NotificationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export const NotificationsDialog = ({ open, onOpenChange, userId }: NotificationsDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    notifications_enabled: true,
    medication_reminders: true,
    appointment_alerts: true,
    government_updates: true,
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
        .select("notifications_enabled, medication_reminders, appointment_alerts, government_updates")
        .eq("id", userId)
        .maybeSingle();

      if (error) throw error;
      if (data) setSettings(data);
    } catch (error: any) {
      toast.error("Error loading notification settings");
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

      toast.success("Notification settings updated");
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
          <DialogTitle>Notification Settings</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications_enabled">Enable Notifications</Label>
            <Switch
              id="notifications_enabled"
              checked={settings.notifications_enabled}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, notifications_enabled: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="medication_reminders">Medication Reminders</Label>
            <Switch
              id="medication_reminders"
              checked={settings.medication_reminders}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, medication_reminders: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="appointment_alerts">Appointment Alerts</Label>
            <Switch
              id="appointment_alerts"
              checked={settings.appointment_alerts}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, appointment_alerts: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="government_updates">Government Updates</Label>
            <Switch
              id="government_updates"
              checked={settings.government_updates}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, government_updates: checked })
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
