import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Mail, Phone, MessageSquare } from "lucide-react";

interface HelpSupportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HelpSupportDialog = ({
  open,
  onOpenChange,
}: HelpSupportDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support request submitted successfully!");
    setName("");
    setEmail("");
    setMessage("");
    onOpenChange(false);
  };

  const faqs = [
    {
      question: "How do I scan medicines?",
      answer: "Go to Health section and select Medicine Scanner. Point your camera at the medicine label and our AI will extract all relevant information.",
    },
    {
      question: "How do I read prescriptions?",
      answer: "Navigate to Health > Prescription Reader. Upload or capture a photo of your prescription, and our system will digitize it for you.",
    },
    {
      question: "How do I fill government forms?",
      answer: "Use the G-Assist section and select Photo to Form. Take a photo of any document, and we'll help you auto-fill government forms.",
    },
    {
      question: "How do I change language?",
      answer: "Go to your Profile > Language Preferences to select your preferred language for the app interface and voice assistance.",
    },
    {
      question: "How do I enable notifications?",
      answer: "Visit Profile > Notifications to manage alerts for medications, appointments, and government updates.",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Help & Support</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-secondary border border-border text-center">
              <Mail className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Email</p>
              <p className="text-xs text-muted-foreground">support@app.com</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary border border-border text-center">
              <Phone className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Phone</p>
              <p className="text-xs text-muted-foreground">1800-123-4567</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary border border-border text-center">
              <MessageSquare className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Live Chat</p>
              <p className="text-xs text-muted-foreground">9 AM - 6 PM IST</p>
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Frequently Asked Questions
            </h3>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Support</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
