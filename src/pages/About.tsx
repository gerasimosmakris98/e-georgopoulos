import React from 'react';
import { SEO } from "@/components/SEO";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import {
  Shield, TrendingUp, Globe, Users, Award, Target, Brain, Zap,
  ArrowRight, Linkedin, MapPin, Star
} from 'lucide-react';

// Define types for static data
interface Language {
  id: string;
  name: string;
  proficiency: string;
  level: number;
}

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

const About: React.FC = () => {
  // Static content - Removed Supabase dependency for instant loading/SEO

  const highlights = [
    {
      icon: Shield,
      title: "Financial Crime Specialist",
      description: "Deep expertise in AML/CFT, fraud detection, and forensic analysis.",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      title: "Blockchain Compliance",
      description: "Crypto-asset registration, MiCA compliance, and on-chain forensics.",
      color: "text-primary"
    },
    {
      icon: Globe,
      title: "Multilingual",
      description: "Native Greek, Fluent English & Spanish. Working with global regulators.",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "QA & Operations Lead",
      description: "Track record of leading Level 3 QA and compliance operations teams.",
      color: "text-primary"
    }
  ];

  const features = [
    { icon: Award, title: "15+ Certifications", description: "ACAMS, Chainalysis, & More" },
    { icon: Target, title: "30+ Projects", description: "Banking & Fintech Implementations" },
    { icon: Brain, title: "7+ Regulators", description: "Aligned with EU, US, LATAM standards" },
    { icon: Zap, title: "Based in Madrid", description: "Serving clients globally" }
  ];

  const techStack = [
    'Chainalysis', 'Siron', 'Napier', 'RiskShield', 'Oracle', 'Veriff',
    'Jira', 'PowerBI', 'Excel', 'Dynamics 365'
  ];

  const languages: Language[] = [
    { id: '1', name: "Greek", proficiency: "Native", level: 5 },
    { id: '2', name: "English", proficiency: "Fluent", level: 5 },
    { id: '3', name: "Spanish", proficiency: "Fluent", level: 5 }
  ];

  const skills: Skill[] = [
    { id: '1', name: "AML/CFT Compliance", category: "Technical", proficiency: 100 },
    { id: '2', name: "KYC/CDD", category: "Technical", proficiency: 100 },
    { id: '3', name: "Blockchain Forensics", category: "Technical", proficiency: 95 },
    { id: '4', name: "Fraud Investigation", category: "Technical", proficiency: 95 },
    { id: '5', name: "Regulatory Advisory", category: "Technical", proficiency: 90 },
    { id: '6', name: "Quality Assurance", category: "Technical", proficiency: 100 }
  ];

  const renderStars = (level: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= level ? 'fill-primary text-primary' : 'text-muted-foreground'
            }`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      <SEO
        title="About My Journey"
        description="Learn about my background in financial crime compliance and my passion for blockchain technology."
        keywords="Who is Efstathios Georgopoulos, Compliance Expert Madrid, Blockchain Enthusiast"
        url="/about"
      />
      {/* Hero Section */}
      <div className="text-center mb-12 md:mb-20 fade-in-up">
        <Badge variant="outline" className="mb-4 md:mb-6 text-sm px-4 py-2 border-primary/20 text-primary bg-primary/5">About Me</Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 md:mb-8 text-primary tracking-tight">
          About Efstathios
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
          Multilingual Compliance & Blockchain Specialist. Bridging the gap between traditional banking regulation and the future of digital finance.
        </p>
      </div>

      {/* About Text + Highlights Grid */}
      <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start mb-12 md:mb-20">
        <div className="fade-in-up">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 md:mb-8 text-primary">
            Brief Bio
          </h2>
          <div className="space-y-4 md:space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-base md:text-lg">Multilingual Compliance & Blockchain Specialist with deep expertise in AML/CFT, fraud detection, and forensic financial analysis. I have demonstrated success across banking and fintech sectors in Europe, blending regulatory insight with hands-on skills in data analytics and blockchain compliance.</p>
            <p className="text-base md:text-lg">My experience includes leading KYC/CDD operations, conducting complex investigations, and performing independent Level 3 QA reviews. I have worked directly with requirements from regulators such as BoG (Greece), FinCEN (USA), SEPBLAC (Spain), CSSF (Luxembourg), BaFin (Germany), and FIU-IND (India).</p>
            <p className="text-base md:text-lg">Currently based in Madrid, Spain, I am dedicated to helping financial institutions and crypto businesses navigate the complex regulatory landscape through robust compliance frameworks and advanced forensic analysis.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 stagger-children">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <Card
                key={index}
                className="glass-panel border-white/5 hover:border-primary/20 hover:shadow-premium transition-all duration-300 hover:scale-[1.02] group"
                style={{ '--i': index } as any}
              >
                <CardContent className="p-4 md:p-8 text-center">
                  <Icon className={`w-8 md:w-12 h-8 md:h-12 ${highlight.color} mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-spring drop-shadow-glow`} />
                  <h4 className="font-playfair font-bold text-base md:text-lg mb-2 md:mb-3 text-primary">
                    {highlight.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-12 md:mb-20 stagger-children">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="text-center p-4 md:p-6 rounded-xl glass-effect hover:shadow-premium transition-spring hover:scale-105"
              style={{ '--i': index } as any}
            >
              <Icon className="w-8 md:w-10 h-8 md:h-10 text-primary mx-auto mb-3 md:mb-4" />
              <div className="text-lg md:text-xl font-bold text-primary mb-1 md:mb-2">{feature.title}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{feature.description}</div>
            </div>
          );
        })}
      </div>

      {/* Tech Stack */}
      <section className="mb-12 md:mb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-4 text-primary">
            Tools & Technologies
          </h2>
          <p className="text-muted-foreground">Technologies and platforms I work with daily</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 stagger-children">
          {techStack.map((tech, index) => (
            <Badge
              key={tech}
              variant="secondary"
              className="px-3 md:px-6 py-2 md:py-3 text-xs md:text-sm glass-effect hover:shadow-card transition-spring hover:scale-105 cursor-default"
              style={{ '--i': index } as any}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      {/* Languages Section */}
      <section className="mb-12 md:mb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-4 text-primary">
            Languages
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto stagger-children">
          {languages.map((lang, index) => (
            <Card
              key={lang.id}
              className="glass-effect hover:shadow-premium transition-spring hover:scale-105"
              style={{ '--i': index } as any}
            >
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">{lang.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{lang.proficiency}</p>
                {renderStars(lang.level)}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Top Skills Preview */}
      <section className="mb-12 md:mb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-primary mb-4">
            Core Competencies
          </h2>
          <Button asChild variant="ghost">
            <Link to="/skills">View All Skills <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {skills.map((skill, index) => (
            <Card
              key={skill.id}
              className="glass-effect"
              style={{ '--i': index } as any}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                </div>
                <Progress value={skill.proficiency} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Location & CTA */}
      <section className="text-center py-12 glass-effect rounded-2xl">
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
          <MapPin className="w-5 h-5" />
          <span>Based in Madrid, Spain • Open to Remote Opportunities</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-4">
          Let's Connect
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Whether you're looking to discuss compliance challenges, blockchain opportunities,
          or potential collaboration, I'd love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/contact">
              Get In Touch <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://www.linkedin.com/in/efstathios-georgopoulos/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 w-4 h-4" /> Connect on LinkedIn
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
