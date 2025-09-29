import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import Home from "./pages/Home";
import Health from "./pages/Health";
import GAssist from "./pages/GAssist";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import MedicineScanner from "./pages/MedicineScanner";
import PrescriptionReader from "./pages/PrescriptionReader";
import PhotoToForm from "./pages/PhotoToForm";
import VoiceChatbot from "./pages/VoiceChatbot";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/health" element={<Health />} />
          <Route path="/health/medicine-scanner" element={<MedicineScanner />} />
          <Route path="/health/prescription-reader" element={<PrescriptionReader />} />
          <Route path="/g-assist" element={<GAssist />} />
          <Route path="/g-assist/photo-to-form" element={<PhotoToForm />} />
          <Route path="/g-assist/voice-chatbot" element={<VoiceChatbot />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
