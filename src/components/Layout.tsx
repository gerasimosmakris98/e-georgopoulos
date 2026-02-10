import { Link, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Layout = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // GA4 MEASUREMENT ID
  const GA_MEASUREMENT_ID = "G-WVSZ11W8XG";

  // Scroll to top is handled by ScrollToTop component in App.tsx now, 
  // but keeping this here implicitly if passing simple children was supported. 
  // Since we use Outlet, this effect is fine but maybe redundant. 
  // We'll leave it or remove it. Let's remove the redundant scroll to top here 
  // to rely on the dedicated component.

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navGroups = [
    {
      title: "Profile",
      items: [
        { label: "Home", path: "/", description: "Welcome to my digital workspace" },
        { label: "About Me", path: "/about", description: "My journey & professional background" },
        { label: "Resume", path: "/resume", description: "Experience, Education & Certifications" },
        { label: "Skills", path: "/skills", description: "Core Competencies & Technology Stack" },
      ]
    },
    {
      title: "Work & Insights",
      items: [
        { label: "Services", path: "/services", description: "Compliance consulting & gap analysis" },
        { label: "Blog", path: "/blog", description: "Insights on FinCrime & Crypto regulations" },
      ]
    },
    {
      title: "Resources",
      items: [
        { label: "Contact", path: "/contact", description: "Let's discuss collaboration opportunities" },
        { label: "FAQ", path: "/faqs", description: "Common questions about my services" },
        { label: "Sitemap", path: "/sitemap", description: "Overview of the website structure" },
        { label: "Legal Notice", path: "/legal/notice", description: "Terms, Privacy & Legal information" },
      ]
    }
  ];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Efstathios Georgopoulos",
    "jobTitle": "Financial Crime Compliance & Blockchain Expert",
    "url": "https://egeorgopoulos-b2e9b.web.app",
    "sameAs": [
      "https://www.linkedin.com/in/efstathios-georgopoulos/"
    ],
    "description": "Multilingual Compliance & Blockchain Specialist with deep expertise in AML/CFT, fraud detection, and forensic financial analysis.",
    "worksFor": {
      "@type": "Organization",
      "name": "Ebury"
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO schema={personSchema} />
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      <nav
        className={cn(
          "fixed top-4 left-0 right-0 z-50 transition-all duration-500 ease-in-out mx-4 rounded-2xl border",
          isScrolled
            ? "bg-background/70 backdrop-blur-xl border-white/10 shadow-glass py-2 max-w-screen-2xl mx-auto"
            : "bg-transparent border-transparent shadow-none py-4 max-w-screen-2xl mx-auto"
        )}
      >
        <div className="px-4 md:px-6">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link to="/" className="text-xl md:text-2xl font-playfair font-bold text-foreground z-50">
              E. Georgopoulos
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-center flex-1 ml-8">
              <NavigationMenu>
                <NavigationMenuList>
                  {navGroups.map((group) => (
                    <NavigationMenuItem key={group.title}>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-white/5 data-[state=open]:bg-white/5">
                        {group.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {group.items.map((item) => (
                            <li key={item.path}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={item.path}
                                  className={cn(
                                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                    location.pathname === item.path && "bg-accent/50 text-accent-foreground"
                                  )}
                                >
                                  <div className="text-sm font-medium leading-none">{item.label}</div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1.5 opacity-80">
                                    {item.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button variant="outline" size="sm" asChild className="rounded-full px-6 border-white/10 hover:bg-white/5 hover:text-primary">
                <a
                  href="https://www.linkedin.com/in/efstathios-georgopoulos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent(ANALYTICS_EVENTS.LINKEDIN_CLICK, { location: 'navbar_desktop' })}
                >
                  LinkedIn
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden h-9 w-9 z-50"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-glass animate-in slide-in-from-top-2 p-4 flex flex-col max-h-[80vh] overflow-y-auto">
              <Accordion type="single" collapsible className="w-full">
                {navGroups.map((group, index) => (
                  <AccordionItem value={`item-${index}`} key={group.title} className="border-b border-white/10 last:border-0">
                    <AccordionTrigger className="text-base font-medium py-3 hover:text-primary hover:no-underline">
                      {group.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex flex-col gap-2 pb-2 pl-4">
                        {group.items.map((item) => (
                          <li key={item.path}>
                            <Link
                              to={item.path}
                              onClick={() => setIsMenuOpen(false)}
                              className={cn(
                                "block py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary",
                                location.pathname === item.path && "text-primary font-medium"
                              )}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-4 pt-4 border-t border-white/10">
                <Button variant="outline" size="sm" asChild className="w-full rounded-full border-white/10">
                  <a
                    href="https://www.linkedin.com/in/efstathios-georgopoulos/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent(ANALYTICS_EVENTS.LINKEDIN_CLICK, { location: 'navbar_mobile' })}
                  >
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 
        Added 'pt-24' to push content down because header is fixed. 
        The exact spacing can be adjusted here. 
      */}
      <main className="flex-1 pt-20 md:pt-32"><Outlet /></main>

      <footer className="footer-gradient text-muted-foreground py-12 mt-20 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <h3 className="font-playfair text-foreground font-bold text-lg mb-4">E. Georgopoulos</h3>
              <p className="text-sm leading-relaxed">
                Financial Crime Compliance & Blockchain Expert based in Madrid, Spain.
              </p>
            </div>

            <div className="md:col-start-3 md:col-span-2">
              <h3 className="font-playfair text-foreground font-bold text-lg mb-4">Legal & Compliance</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Link to="/legal/notice" className="hover:text-primary transition-colors">Legal Notice</Link>
                <Link to="/legal/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/legal/cookies" className="hover:text-primary transition-colors">Cookies Policy</Link>
                <Link to="/legal/terms" className="hover:text-primary transition-colors">Terms of Use</Link>
                <Link to="/legal/accessibility" className="hover:text-primary transition-colors">Accessibility</Link>
                <Link to="/faqs" className="hover:text-primary transition-colors">FAQ</Link>
              </div>
            </div>
          </div>


          <div className="border-t border-border/20 mt-8 pt-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs w-full">
              <p>&copy; {new Date().getFullYear()} Efstathios Georgopoulos. All rights reserved.</p>
              <p className="opacity-70 text-center md:text-right">Created by Gerasimos Makris | AI Web Developer | Founder of <a href="https://g-makris.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">g-makris.com</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
