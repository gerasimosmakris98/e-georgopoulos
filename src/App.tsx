import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { DataProvider } from "@/contexts/DataContext";
import { UIProvider } from "@/contexts/UIContext";
import ScrollToTop from "@/components/ScrollToTop";
import { Suspense, lazy, useEffect } from "react";
import { useAnalytics } from "./hooks/useAnalytics";

// Global Components
import CookieConsent from "./components/CookieConsent";
import ChatWidget from "./components/chat/ChatWidget";
import GlobalLoader from "./components/ui/GlobalLoader";
import GlobalModals from "./components/GlobalModals";
// Core Imports (Main Path)
import Layout from "./components/Layout";
import Home from "./pages/Home";

// Lazy Load Secondary Pages
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Resume = lazy(() => import("./pages/Resume"));
const LiveCV = lazy(() => import("./pages/LiveCV"));
const Skills = lazy(() => import("./pages/Skills"));
const BlogListing = lazy(() => import("./pages/BlogListing"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Faq = lazy(() => import("./pages/Faq"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Legal Pages (Lazy)
const LegalNotice = lazy(() => import("./pages/legal/LegalNotice"));
const Privacy = lazy(() => import("./pages/legal/Privacy"));
const Terms = lazy(() => import("./pages/legal/Terms"));
const Cookies = lazy(() => import("./pages/legal/Cookies"));
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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DataProvider>
          <UIProvider>
            <ScrollToTop />
            <AnalyticsTracker />
            <Suspense fallback={<GlobalLoader />}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/cv-live" element={<LiveCV />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/blog" element={<BlogListing />} />
                  <Route path="/faqs" element={<Faq />} />
                  <Route path="/sitemap" element={<Sitemap />} />

                  {/* Legal Routes */}
                  <Route path="/legal/notice" element={<LegalNotice />} />
                  <Route path="/legal/privacy" element={<Privacy />} />
                  <Route path="/legal/terms" element={<Terms />} />
                  <Route path="/legal/cookies" element={<Cookies />} />
                  <Route path="/legal/accessibility" element={<Accessibility />} />

                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
            <CookieConsent />
            <ChatWidget />
            <GlobalModals />
          </UIProvider>
        </DataProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
