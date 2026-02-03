import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { 
  Shield, TrendingUp, Globe, Users, Award, Target, Brain, Zap,
  ArrowRight, Linkedin, MapPin, GraduationCap, Star
} from 'lucide-react';

interface AboutContent {
  summary: string;
  paragraphs: string[];
  highlights: { title: string; description: string; icon: string; color: string }[];
  features: { icon: string; title: string; description: string }[];
  tech_stack: string[];
}

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
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultHighlights = [
    {
      icon: 'Shield',
      title: "Financial Crime Fighter",
      description: "4+ years specializing in AML/CFT, KYC/CDD, and fraud investigations",
      color: "text-primary"
    },
    {
      icon: 'TrendingUp',
      title: "Blockchain Expert",
      description: "Advanced knowledge in financial compliance and blockchain technology",
      color: "text-primary"
    },
    {
      icon: 'Globe',
      title: "Multilingual Professional",
      description: "Fluent in Greek, English, Spanish, studying French and Portuguese",
      color: "text-primary"
    },
    {
      icon: 'Users',
      title: "Quality Assurance Leader",
      description: "Leading QA operations and compliance initiatives at Ebury",
      color: "text-primary"
    }
  ];

  const defaultFeatures = [
    { icon: 'Award', title: "15+ Certifications", description: "Industry-recognized credentials" },
    { icon: 'Target', title: "30+ Projects", description: "Successful compliance implementations" },
    { icon: 'Brain', title: "10+ Publications", description: "Thought leadership articles" },
    { icon: 'Zap', title: "Madrid Based", description: "Open to remote opportunities" }
  ];

  const defaultTechStack = [
    'Chainalysis', 'RiskShield', 'Siron', 'Oracle', 'Veriff', 
    'Jira', 'Power BI', 'Excel', 'Dynamics 365'
  ];

  const iconMap: { [key: string]: React.ElementType } = {
    Shield, TrendingUp, Globe, Users, Award, Target, Brain, Zap, GraduationCap, Star
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, langRes, skillsRes] = await Promise.all([
          supabase.from('about_content').select('*').limit(1).maybeSingle(),
          supabase.from('languages').select('*').order('order_index'),
          supabase.from('skills').select('*').order('order_index').limit(6)
        ]);

        if (aboutRes.data) {
          // Parse JSONB fields properly
          setAboutContent({
            summary: aboutRes.data.summary || '',
            paragraphs: aboutRes.data.paragraphs || [],
            highlights: (aboutRes.data.highlights as unknown as AboutContent['highlights']) || [],
            features: (aboutRes.data.features as unknown as AboutContent['features']) || [],
            tech_stack: aboutRes.data.tech_stack || []
          });
        }
        if (langRes.data) setLanguages(langRes.data);
        if (skillsRes.data) setSkills(skillsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const highlights = aboutContent?.highlights?.length ? aboutContent.highlights : defaultHighlights;
  const features = aboutContent?.features?.length ? aboutContent.features : defaultFeatures;
  const techStack = aboutContent?.tech_stack?.length ? aboutContent.tech_stack : defaultTechStack;

  const getIcon = (iconName: string) => iconMap[iconName] || Shield;

  const renderStars = (level: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= level ? 'fill-primary text-primary' : 'text-muted-foreground'
          }`}
        />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      {/* Hero Section */}
      <div className="text-center mb-12 md:mb-20 fade-in-up">
        <Badge variant="outline" className="mb-4 md:mb-6 text-sm px-4 py-2">About Me</Badge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-6 md:mb-8 text-primary">
          Professional Background
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
          {aboutContent?.summary || 
            "MBA & Master's in Fintech and Blockchain graduate, currently pursuing Master's in Compliance. Dedicated to enhancing global financial security through advanced compliance and blockchain expertise at Ebury."}
        </p>
      </div>

      {/* About Text + Highlights Grid */}
      <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start mb-12 md:mb-20">
        <div className="fade-in-up">
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-6 md:mb-8 text-primary">
            About Efstathios
          </h2>
          <div className="space-y-4 md:space-y-6 text-muted-foreground leading-relaxed">
            {(aboutContent?.paragraphs || [
              "As an MBA & Master's in Fintech and Blockchain graduate, I bring a unique combination of business acumen and technical expertise to the financial compliance sector. Currently pursuing a Master's in Compliance, I'm committed to staying at the forefront of regulatory developments.",
              "Currently working at Ebury as a Financial Crime Compliance Quality Assurance Lead with 4+ years of experience in AML/CFT, KYC/CDD, fraud detection, and financial analysis, I ensure regulatory compliance and operational integrity across complex financial systems.",
              "My passion extends beyond traditional finance into the blockchain and cryptocurrency space, where I focus on developing robust compliance frameworks for emerging financial technologies."
            ]).map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg">{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 stagger-children">
          {highlights.map((highlight, index) => {
            const Icon = getIcon(highlight.icon);
            return (
              <Card 
                key={index} 
                className="glass-effect border-border/50 hover:shadow-premium transition-spring hover:scale-105 group"
                style={{ '--i': index } as any}
              >
                <CardContent className="p-4 md:p-8 text-center">
                  <Icon className={`w-8 md:w-12 h-8 md:h-12 ${highlight.color} mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-spring`} />
                  <h4 className="font-playfair font-semibold text-base md:text-lg mb-2 md:mb-3 text-primary">
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
          const Icon = getIcon(feature.icon);
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
      {languages.length > 0 && (
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
      )}

      {/* Top Skills Preview */}
      {skills.length > 0 && (
        <section className="mb-12 md:mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-primary">
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
      )}

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
