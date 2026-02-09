import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Linkedin, MapPin, Star, Award, TrendingUp, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useUI } from "@/contexts/UIContext";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

const Hero = () => {
  const { openLiveCV, openContact } = useUI();
  // Static Data - Backend Disconnected
  const personalInfo = {
    name: "Efstathios Georgopoulos",
    title: "Compliance & Blockchain Specialist",
    current_position: "AML/CFT · Fraud Detection · Forensic Analysis · Regulatory Advisory",
    description: "Multilingual compliance professional with deep expertise across banking and fintech in Europe. Helping regulated entities navigate AML/CFT, KYC, blockchain compliance, and financial crime prevention — from policy to investigation.",
    location: "Madrid, Spain",
    badges: ['🛡️ AML/CFT Expert', '⛓️ Blockchain Forensics', '🌍 Multi-Jurisdictional', '🏦 Banking & FinTech']
  };

  const stats = {
    experience: "5+",
    certifications: "7+", // Regulatory Frameworks count from user request
    projects: "8", // Active Services count
    languages: "3"
  };

  const scrollToSection = (id: string) => {
    trackEvent(ANALYTICS_EVENTS.NAV_CLICK, { target: id, location: 'hero_scroll' });
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const displayStats = [
    { icon: Star, label: "Years in FinCrime", value: stats.experience },
    { icon: Award, label: "Regulatory Frameworks", value: stats.certifications },
    { icon: TrendingUp, label: "Active Services", value: stats.projects },
    { icon: Globe, label: "Languages", value: stats.languages }
  ];

  return (
    <section id="hero" className="relative bg-background overflow-hidden pt-0">
      {/* Background removed as per request */}



      <div className="relative z-10 container mx-auto px-4 md:px-6 min-h-[60vh] md:min-h-[80vh] flex flex-col justify-center pt-20 md:pt-32 pb-8 md:pb-12">
        <div className="w-full max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-6 md:mb-10 fade-in-up">
            {/* Main Heading */}
            {/* Main Heading */}
            <h1 className="font-playfair font-bold mb-3 md:mb-6 leading-none tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white drop-shadow-md">
              <span className="block mb-2">{personalInfo.name.split(' ')[0]}</span>
              <span className="block">{personalInfo.name.split(' ').slice(1).join(' ')}</span>
            </h1>

            {/* Status Badges - Under the name */}
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-3 mb-4 md:mb-6 stagger-children px-2">
              {personalInfo.badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="glass-effect text-[10px] md:text-sm px-2 md:px-4 py-0.5 md:py-1.5 text-white/90 border-white/10" style={{ '--i': index } as any}>
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Professional Title */}
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white/95 mb-2 md:mb-3 px-4 drop-shadow-sm font-playfair">
              {personalInfo.title}
            </p>

            {/* Current Position */}
            <p className="text-xs sm:text-sm md:text-lg text-white/80 mb-4 md:mb-8 px-4 font-medium uppercase tracking-wider">
              {personalInfo.current_position}
            </p>

            {/* Description - Hidden on small mobile to save vertical space as requested "higher all visible" */}
            <p className="hidden md:block text-sm sm:text-base md:text-lg text-white/80 mb-6 md:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
              {personalInfo.description}
            </p>

            {/* CTA Buttons - Compact */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-12 px-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="default"
                      size="default"
                      onClick={() => {
                        trackEvent(ANALYTICS_EVENTS.CONTACT_SUBMIT, { location: 'hero' });
                        openContact();
                      }}
                      className="w-full sm:w-auto min-w-[160px] md:min-w-[180px] text-sm md:text-lg h-11 md:h-12 font-medium shadow-premium hover:scale-105 transition-transform"
                    >
                      Get In Touch
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Opens contact form</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() => {
                        trackEvent(ANALYTICS_EVENTS.VIEW_CV, { location: 'hero' });
                        openLiveCV();
                      }}
                      className="w-full sm:w-auto min-w-[160px] md:min-w-[180px] text-sm md:text-lg h-11 md:h-12 font-medium glass-effect border-white/20 hover:bg-white/10"
                    >
                      <Award className="mr-2 md:mr-3 w-4 md:w-5 h-4 md:h-5" />
                      View Live CV
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Opens interactive CV in Notion</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Stats Section - High Contrast */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12 stagger-children px-2 md:px-4">
            {displayStats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center glass-panel p-3 md:p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
                style={{ '--i': index } as any}
              >
                <stat.icon className="w-5 md:w-8 h-5 md:h-8 text-white mx-auto mb-2 md:mb-3 drop-shadow-glow" />
                <div className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-1 drop-shadow-md">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-sm text-white/80 font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Location */}
          <div className="text-center mb-4 md:mb-8">
            <div className="flex items-center justify-center text-white/60 text-xs md:text-base px-4">
              <MapPin className="w-3 md:w-4 h-3 md:h-4 mr-2 flex-shrink-0" />
              <span className="text-center tracking-wider uppercase">{personalInfo.location}</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Scroll to About section"
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
