
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import RecorderPage from "./pages/RecorderPage";
import NotesPage from "./pages/NotesPage";
import RecordingsPage from "./pages/RecordingsPage";
import NotFound from "./pages/NotFound";
import NoteDetail from "./pages/NoteDetail";
import PricingPage from "./pages/PricingPage";
import LoginPage from "./pages/LoginPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-conditions" element={<TermsConditionsPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Navigate to="/dashboard/recorder" replace />} />
              <Route path="recorder" element={<RecorderPage />} />
              <Route path="notes" element={<NotesPage />} />
              <Route path="recordings" element={<RecordingsPage />} />
            </Route>
            <Route path="/note/:id" element={<NoteDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
