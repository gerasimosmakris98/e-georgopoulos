
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { useAnalytics } from "./hooks/useAnalytics";
import { useEffect, Suspense, lazy } from "react";
import Layout from "./components/Layout";
import CookieConsent from "./components/CookieConsent";
import ChatWidget from "./components/chat/ChatWidget";
import { Loader2 } from "lucide-react";
import GlobalLoader from "./components/ui/GlobalLoader";

// Lazy Load Pages for Performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Resume = lazy(() => import("./pages/Resume"));
const Skills = lazy(() => import("./pages/Skills"));
const Services = lazy(() => import("./pages/Services"));
const BlogListing = lazy(() => import("./pages/BlogListing"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Faq = lazy(() => import("./pages/Faq"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Legal Pages (Lazy Loaded)
const Privacy = lazy(() => import("./pages/legal/Privacy"));
const Terms = lazy(() => import("./pages/legal/Terms"));
const Cookies = lazy(() => import("./pages/legal/Cookies"));
const LegalNotice = lazy(() => import("./pages/legal/LegalNotice"));
const Accessibility = lazy(() => import("./pages/legal/Accessibility"));

const queryClient = new QueryClient();

const AnalyticsTracker = () => {
  const { trackPageView } = useAnalytics();
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnalyticsTracker />
            <Suspense fallback={<GlobalLoader />}>
              <Routes>
                <Route path="/admin" element={<Admin />} />
                <Route path="/*" element={
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/resume" element={<Resume />} />
                      <Route path="/skills" element={<Skills />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/blog" element={<BlogListing />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/faqs" element={<Faq />} />

                      {/* Legal & Compliance Routes */}
                      <Route path="/legal/terms" element={<Terms />} />
                      <Route path="/legal/privacy" element={<Privacy />} />
                      <Route path="/legal/cookies" element={<Cookies />} />
                      <Route path="/legal/notice" element={<LegalNotice />} />
                      <Route path="/legal/accessibility" element={<Accessibility />} />

                      {/* Redirect legacy paths if necessary, or keep simplified */}
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/cookies" element={<Cookies />} />

                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                } />
              </Routes>
            </Suspense>
            <CookieConsent />
            <ChatWidget />
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
