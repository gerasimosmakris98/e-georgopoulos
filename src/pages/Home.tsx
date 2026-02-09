import { Button } from "@/components/ui/button";
import { ArrowRight, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Hero from "@/components/Hero";
import RiskCalculator from "@/components/compliance/RiskCalculator";
import { SEO } from "@/components/SEO";

const Home = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });

  // New Landing Data
  const landingData = {
    valueProposition: {
      title: "Why Partner With Me?",
      items: [
        { title: "Regulatory Depth", description: "Direct experience with 7+ global regulators (SEPBLAC, FinCEN, etc.)." },
        { title: "Crypto Native", description: "Deep understanding of DeFi, NFTs, and on-chain forensics." },
        { title: "Operational Excellence", description: "Proven track record in leading QA and compliance ops teams." }
      ]
    },
    servicesOverview: [
      { title: "AML/CFT Advisory", description: "Risk assessments, policy design, and regulatory reporting." },
      { title: "Blockchain Compliance", description: "VASP registration, Travel Rule, and forensic analysis." },
      { title: "Training", description: "Custom workshops for compliance teams and boards." }
    ],
    credentialsBar: [
      "Certified Anti-Money Laundering Specialist",
      "Chainalysis Reactor Certified",
      "MBA in FinTech & Blockchain"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO />
      {/* Hero Section */}
      <div ref={heroRef} className={`transition-opacity duration-1000 ${heroInView ? 'opacity-100' : 'opacity-0'}`}>
        <Hero />
      </div>

      {/* Credentials Ticker / Bar */}
      <div className="glass-panel border-y border-white/5 py-6 overflow-hidden relative z-20">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12 text-sm md:text-base font-medium text-muted-foreground/80">
          {landingData.credentialsBar.map((cred, i) => (
            <div key={i} className="flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              {cred}
            </div>
          ))}
        </div>
      </div>

      {/* Value Proposition */}
      <section className="py-16 md:py-24 container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">{landingData.valueProposition.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {landingData.valueProposition.items.map((item, i) => (
            <div key={i} className="group p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Preview - Uniform Background */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Core Services</h2>
            <p className="text-muted-foreground">Comprehensive compliance solutions for the modern financial landscape.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {landingData.servicesOverview.map((service, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl glass-panel p-8 hover:shadow-xl transition-all duration-500 hover:border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="relative text-xl font-bold mb-3">{service.title}</h3>
                <p className="relative text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                <div className="relative flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                  Learn more <ArrowRight className="ml-2 w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild className="hover:bg-primary hover:text-white transition-colors">
              <Link to="/services">View All Services <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Compliance Tech Demo Section */}
      <div className="relative z-10">
        <RiskCalculator />
      </div>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold">Ready to elevate your compliance framework?</h2>
          <p className="text-xl text-muted-foreground">Whether you need specific training, a full audit, or ongoing advisory, I'm here to help.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="px-8 text-lg h-12">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="px-8 text-lg h-12">
              <Link to="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
