import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Linkedin, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";

const Home = () => {
  const { personalInfo } = useData();
  
  return (
    <section className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl floating-animation" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl floating-animation" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 min-h-screen flex items-center relative z-10">
        <div className="w-full max-w-4xl mx-auto text-center fade-in-up">
          {/* Status Indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Available for opportunities</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-playfair font-bold mb-6 leading-tight text-foreground">
            {personalInfo.name}
          </h1>
          
          {/* Status Badges */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 px-2">
            {personalInfo.badges.map((badge, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs md:text-sm px-4 py-2 glass-effect border-border/50 hover:border-primary/50 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Sparkles className="w-3 h-3 mr-1.5 opacity-60" />
                {badge}
              </Badge>
            ))}
          </div>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl font-medium text-foreground/80 mb-3 px-2">
            {personalInfo.title}
          </p>
          
          {/* Current Position */}
          <p className="text-base sm:text-lg text-muted-foreground mb-6 px-2">
            {personalInfo.currentPosition}
          </p>
          
          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            {personalInfo.description}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 px-4">
            <Button 
              variant="default" 
              size="lg"
              asChild
              className="w-full sm:w-auto min-w-[200px] text-base h-14 rounded-xl shadow-premium hover:shadow-glow transition-all duration-300 group"
            >
              <Link to="/contact">
                Get In Touch
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              asChild
              className="w-full sm:w-auto min-w-[200px] text-base h-14 rounded-xl glass-effect border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <a href={personalInfo.linkedInLink} target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 w-5 h-5" />
                LinkedIn Profile
              </a>
            </Button>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16 px-2">
            <Link 
              to="/resume" 
              className="glass-effect p-6 rounded-2xl hover:shadow-premium transition-all duration-300 group border border-border/50 hover:border-primary/30"
            >
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                Resume & Experience
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Professional journey across Ebury, American Express, and major European banks
              </p>
              <ArrowRight className="w-5 h-5 mt-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
            </Link>
            
            <Link 
              to="/blog" 
              className="glass-effect p-6 rounded-2xl hover:shadow-premium transition-all duration-300 group border border-border/50 hover:border-primary/30"
            >
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                Blog & Articles
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Insights on AML/CFT, blockchain compliance, and financial crime prevention
              </p>
              <ArrowRight className="w-5 h-5 mt-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
            </Link>
            
            <Link 
              to="/contact" 
              className="glass-effect p-6 rounded-2xl hover:shadow-premium transition-all duration-300 group border border-border/50 hover:border-primary/30"
            >
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                Contact
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Get in touch for collaboration and consulting opportunities
              </p>
              <ArrowRight className="w-5 h-5 mt-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
            </Link>
          </div>

          {/* Location */}
          <div className="text-center px-4">
            <div className="inline-flex items-center text-muted-foreground text-sm md:text-base glass-effect px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{personalInfo.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
