import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Linkedin, MapPin, Star, Award, TrendingUp, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface PersonalInfo {
  name: string;
  title: string;
  description: string | null;
  current_position: string | null;
  location: string | null;
  badges: string[] | null;
}

const Hero = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [stats, setStats] = useState({
    experience: "4+",
    certifications: "15+",
    projects: "30+",
    languages: "5"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [personalRes, expRes, certRes, langRes] = await Promise.all([
          supabase.from('personal_info').select('*').limit(1).maybeSingle(),
          supabase.from('experiences').select('id').eq('visible', true),
          supabase.from('certifications').select('id').eq('visible', true),
          supabase.from('languages').select('id').eq('visible', true)
        ]);

        if (personalRes.data) setPersonalInfo(personalRes.data);
        
        setStats({
          experience: "4+",
          certifications: certRes.data?.length ? `${certRes.data.length}+` : "15+",
          projects: "30+",
          languages: langRes.data?.length ? `${langRes.data.length}` : "5"
        });
      } catch (error) {
        console.error('Error fetching hero data:', error);
      }
    };

    fetchData();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const displayStats = [
    { icon: Star, label: "Years Experience", value: stats.experience },
    { icon: Award, label: "Certifications", value: stats.certifications },
    { icon: TrendingUp, label: "Projects", value: stats.projects },
    { icon: Globe, label: "Languages", value: stats.languages }
  ];

  const name = personalInfo?.name || "Efstathios Georgopoulos";
  const title = personalInfo?.title || "Financial Crime & Compliance QA Lead";
  const currentPosition = personalInfo?.current_position || "Financial Crime Compliance Quality Assurance Lead at Ebury";
  const description = personalInfo?.description || "Multilingual Compliance & Blockchain Specialist with deep expertise in AML/CFT, fraud detection, and forensic financial analysis.";
  const location = personalInfo?.location || "Madrid, Spain";
  const badges = personalInfo?.badges || ['🏛️ Financial Crime Compliance', '⛓️ Blockchain Specialist', '🎓 MSc Fintech & Blockchain', '📍 Madrid, Spain'];

  return (
    <section id="hero" className="relative min-h-screen bg-gradient-hero overflow-hidden pt-16 md:pt-0">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 md:top-20 right-10 md:right-20 w-32 md:w-96 h-32 md:h-96 bg-accent/10 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-20 md:bottom-32 left-10 md:left-20 w-24 md:w-80 h-24 md:h-80 bg-primary-light/15 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-20 md:w-64 h-20 md:h-64 bg-accent/5 rounded-full blur-2xl floating-animation" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-6 min-h-screen flex items-center">
        <div className="w-full max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-8 md:mb-16 fade-in-up">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              <span className="text-primary-foreground">{name.split(' ')[0]}</span>
              <br />
              <span className="bg-gradient-accent bg-clip-text text-transparent animate-shimmer">
                {name.split(' ').slice(1).join(' ')}
              </span>
            </h1>

            {/* Status Badges - Under the name */}
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-3 mb-6 md:mb-8 stagger-children px-2">
              {badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="glass-effect text-xs px-2 md:px-4 py-1 md:py-2" style={{ '--i': index } as any}>
                  {badge}
                </Badge>
              ))}
            </div>
            
            {/* Professional Title */}
            <p className="text-base sm:text-lg md:text-xl lg:text-3xl font-medium text-primary-foreground/90 mb-2 md:mb-4 px-4">
              {title}
            </p>
            
            {/* Current Position */}
            <p className="text-sm sm:text-base md:text-lg text-primary-foreground/80 mb-4 md:mb-6 px-4 font-semibold">
              {currentPosition}
            </p>
            
            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-primary-foreground/80 mb-6 md:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              {description}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-16 px-4">
              <Button 
                variant="default" 
                size="lg"
                asChild
                className="w-full sm:w-auto min-w-[180px] md:min-w-[200px] text-sm md:text-lg h-12 md:h-14"
              >
                <Link to="/contact">Get In Touch</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                asChild
                className="w-full sm:w-auto min-w-[180px] md:min-w-[200px] text-sm md:text-lg h-12 md:h-14"
              >
                <a href="https://www.linkedin.com/in/efstathios-georgopoulos/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 md:mr-3 w-4 md:w-5 h-4 md:h-5" />
                  LinkedIn Profile
                </a>
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-16 stagger-children px-2 md:px-4">
            {displayStats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center glass-effect p-3 md:p-6 rounded-xl hover:shadow-premium transition-spring hover:scale-105"
                style={{ '--i': index } as any}
              >
                <stat.icon className="w-5 md:w-8 h-5 md:h-8 text-accent mx-auto mb-2 md:mb-3" />
                <div className="text-lg md:text-2xl lg:text-3xl font-bold text-primary-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-primary-foreground/70 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Location */}
          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center text-primary-foreground/70 text-sm md:text-lg px-4">
              <MapPin className="w-4 md:w-5 h-4 md:h-5 mr-2 flex-shrink-0" />
              <span className="text-center">{location}</span>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => scrollToSection('about')}
            className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 animate-bounce"
          >
            <ChevronDown className="w-5 md:w-6 h-5 md:h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
