import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Layout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Resume", path: "/resume" },
    { label: "Skills", path: "/skills" },
    { label: "Services", path: "/services" },
    { label: "Blog", path: "/blog" },
    { label: "FAQ", path: "/faqs" },
    { label: "Contact", path: "/contact" }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out py-4",
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border/40 py-2"
            : "bg-transparent border-b border-transparent shadow-none"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link to="/" className="text-xl md:text-2xl font-playfair font-bold text-foreground">
              E. Georgopoulos
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {menuItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.path
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Button variant="outline" size="sm" asChild className="hidden md:inline-flex rounded-full px-6 border-white/10 hover:bg-white/5 hover:text-primary">
              <a href="https://www.linkedin.com/in/efstathios-georgopoulos/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden h-9 w-9"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 border-t border-border bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-2">
              <div className="px-4 py-4 space-y-2 container mx-auto">
                {menuItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block w-full text-left py-3 text-lg transition-colors border-b border-border/20 last:border-0 ${location.pathname === item.path
                      ? 'text-primary font-semibold'
                      : 'text-muted-foreground hover:text-primary'
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button variant="outline" size="lg" asChild className="w-full mt-6 rounded-full">
                  <a href="https://www.linkedin.com/in/efstathios-georgopoulos/" target="_blank" rel="noopener noreferrer">
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
      <main className="flex-1 pt-32 mobile:pt-24">{children}</main>

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

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/20 text-xs">
            <p>&copy; {new Date().getFullYear()} Efstathios Georgopoulos. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed with precision in Madrid.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
