import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Linkedin, Send, Scale, MessageCircle, MapPin, Globe } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useData } from "@/contexts/DataContext";
import ContactForm from "@/components/ContactForm";
import { SubscriptionActions } from "@/components/SubscriptionActions";

const ContactPage = () => {
  const { contactInfo: dataContactInfo } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const languages = [
    { language: "Greek", level: "Native", proficiency: 100 },
    { language: "English", level: "Fluent", proficiency: 95 },
    { language: "Spanish", level: "Fluent", proficiency: 90 }
  ];

  const collaborationAreas = [
    "AML/CFT Compliance", "Financial Crime Investigation", "Blockchain Analysis",
    "KYC/CDD Procedures", "Regulatory Compliance", "Risk Assessment",
    "Transaction Monitoring", "Fraud Detection", "Digital Asset Compliance",
    "Training & Development", "Process Optimization", "Quality Assurance"
  ];

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      <SEO
        title="Contact Me"
        description="Let's discuss collaboration opportunities in Financial Crime Compliance, AML/CFT, or Blockchain regulations."
        keywords="Contact Efstathios Georgopoulos, Compliance Consulting, AML Advisor Madrid, Blockchain Compliance Expert"
        url="/contact"
      />
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold mb-4 md:mb-6 text-foreground tracking-tight">
            Let's Connect
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            Ready to discuss financial compliance, blockchain technology, or potential collaboration opportunities?
            I'd love to hear from you.
          </p>
        </div>

        {/* Main Contact Options */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {/* LinkedIn - Primary */}
            <Card className="glass-panel border-white/5 hover:border-primary/20 transition-all duration-300 group">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Linkedin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">LinkedIn</h3>
                    <p className="text-sm text-muted-foreground">Professional networking</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 text-sm">
                  Best way to connect for professional opportunities and industry discussions.
                </p>
                <Button asChild className="w-full h-11 rounded-xl">
                  <a href="https://www.linkedin.com/in/efstathios-georgopoulos/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    Connect on LinkedIn
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="glass-panel border-white/5 hover:border-primary/20 transition-all duration-300 group">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">Send Message</h3>
                    <p className="text-sm text-muted-foreground">Direct communication</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 text-sm">
                  Have a specific inquiry? Send me a message and I'll respond as soon as possible.
                </p>
                <Button
                  variant="outline"
                  className="w-full h-11 rounded-xl glass-panel border-white/5 hover:border-primary/20 hover:text-primary"
                  onClick={() => setIsFormOpen(true)}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Open Contact Form
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Location Info */}
          {/* Location Info & Subscription */}
          <div className="mt-8 flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 text-muted-foreground glass-panel border-white/5 px-6 py-3 rounded-full hover:border-primary/20 transition-colors">
              <MapPin className="w-5 h-5" />
              <span>{dataContactInfo.location || "Madrid, Spain"}</span>
              <span className="text-border">•</span>
              <span className="text-sm">{dataContactInfo.availability || "Available for remote work"}</span>
            </div>

            <div className="glass-panel border-white/5 p-6 rounded-2xl text-center max-w-md w-full hover:border-primary/20 transition-colors">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4">Subscribe to my newsletter for the latest updates.</p>
              <div className="flex justify-center">
                <SubscriptionActions variant="default" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Languages */}
          <div className="fade-in-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-6 flex items-center text-foreground">
              <Globe className="w-6 h-6 mr-3 text-primary" />
              Languages
            </h2>
            <Card className="glass-panel border-white/5 hover:border-primary/20 transition-all duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-6">
                  {languages.map((lang, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-foreground">{lang.language}</span>
                        <Badge variant="secondary" className="text-xs">
                          {lang.level}
                        </Badge>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${lang.proficiency}%`,
                            animationDelay: `${index * 200}ms`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Collaboration Areas */}
          <div className="fade-in-up" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-6 flex items-center text-foreground">
              <MessageCircle className="w-6 h-6 mr-3 text-primary" />
              Collaboration Areas
            </h2>
            <Card className="glass-panel border-white/5 hover:border-primary/20 transition-all duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-wrap gap-2">
                  {collaborationAreas.map((area, index) => (
                    <Badge
                      key={area}
                      variant="outline"
                      className="px-3 py-2 text-xs hover:bg-primary/10 hover:border-primary/50 transition-all cursor-default"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 md:mt-20 fade-in-up" style={{ animationDelay: '300ms' }}>
          <Card className="glass-panel border-white/5 hover:border-primary/20 transition-all duration-300 overflow-hidden max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 md:p-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Send className="w-8 h-8 text-primary" />
                <h3 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">Let's Collaborate</h3>
              </div>
              <p className="text-base sm:text-lg md:text-xl mb-8 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Interested in financial compliance consulting, blockchain analysis, or discussing industry insights?
                I'm always open to new opportunities and meaningful professional connections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <Button
                  size="default"
                  asChild
                  className="flex-1 h-11 rounded-xl shadow-premium"
                >
                  <a href="https://www.linkedin.com/in/efstathios-georgopoulos/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => setIsFormOpen(true)}
                  className="flex-1 h-11 rounded-xl glass-panel border-white/5 hover:border-primary/20 hover:text-primary"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default ContactPage;
