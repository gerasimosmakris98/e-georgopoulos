import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Star, Zap, Globe, Briefcase, Code, Brain, ArrowRight } from 'lucide-react';
import { SEO } from "@/components/SEO";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

interface Language {
  id: string;
  name: string;
  proficiency: string;
  level: number;
}

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const skills: Skill[] = [
    // Compliance & Regulatory
    { id: '1', name: "AML/CFT Policy Development", category: "Compliance & Regulatory", proficiency: 100 },
    { id: '2', name: "KYC/CDD & Enhanced Due Diligence", category: "Compliance & Regulatory", proficiency: 100 },
    { id: '3', name: "Regulatory Reporting (SAR/STR)", category: "Compliance & Regulatory", proficiency: 95 },
    { id: '4', name: "SEPBLAC, FinCEN, CSSF, BaFin Alignment", category: "Compliance & Regulatory", proficiency: 90 },
    { id: '5', name: "MiCA & Travel Rule Compliance", category: "Compliance & Regulatory", proficiency: 95 },
    { id: '6', name: "GDPR & Data Protection", category: "Compliance & Regulatory", proficiency: 90 },

    // Investigation & Analysis
    { id: '7', name: "Fraud Detection & Investigation", category: "Investigation & Analysis", proficiency: 95 },
    { id: '8', name: "Forensic Financial Analysis", category: "Investigation & Analysis", proficiency: 90 },
    { id: '9', name: "Transaction Monitoring", category: "Investigation & Analysis", proficiency: 95 },
    { id: '10', name: "On-chain Blockchain Analysis", category: "Investigation & Analysis", proficiency: 95 },
    { id: '11', name: "PEP/Sanctions Screening", category: "Investigation & Analysis", proficiency: 100 },
    { id: '12', name: "Risk Scoring & Assessment", category: "Investigation & Analysis", proficiency: 95 },

    // Operations & Leadership
    { id: '13', name: "Quality Assurance (QA) Reviews", category: "Operations & Leadership", proficiency: 100 },
    { id: '14', name: "Compliance Process Mapping", category: "Operations & Leadership", proficiency: 90 },
    { id: '15', name: "Cross-functional Team Collaboration", category: "Operations & Leadership", proficiency: 95 },
    { id: '16', name: "Training & Capacity Building", category: "Operations & Leadership", proficiency: 90 },
    { id: '17', name: "Dispute & Chargeback Management", category: "Operations & Leadership", proficiency: 85 },
    { id: '18', name: "Internal Audit Support", category: "Operations & Leadership", proficiency: 90 },

    // Tools
    { id: '19', name: "Chainalysis", category: "Tools", proficiency: 95 },
    { id: '20', name: "Siron / Napier / RiskShield", category: "Tools", proficiency: 90 },
    { id: '21', name: "Excel & PowerBI", category: "Tools", proficiency: 90 },
    { id: '22', name: "Jira & Microsoft Dynamics", category: "Tools", proficiency: 85 },
    { id: '23', name: "AI Tools (ChatGPT, Gemini)", category: "Tools", proficiency: 95 }
  ];

  const languages: Language[] = [
    { id: '1', name: "Greek", proficiency: "Native", level: 5 },
    { id: '2', name: "English", proficiency: "Fluent", level: 5 },
    { id: '3', name: "Spanish", proficiency: "Fluent", level: 5 }
  ];

  const categories = ['All', 'Compliance & Regulatory', 'Investigation & Analysis', 'Operations & Leadership', 'Tools'];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Investigation & Analysis': return Code;
      case 'Tools': return Zap;
      case 'Operations & Leadership': return Brain;
      case 'Compliance & Regulatory': return Briefcase;
      default: return Star;
    }
  };

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
        title="Core Skills & Expertise"
        description="Deep expertise in AML/CFT, Blockchain Forensics, Sanctions, and Regulatory Compliance."
        keywords="Compliance Skills, AML Expertise, Blockchain Forensics Professional, QA Analyst Skills"
        url="/skills"
      />
      {/* Hero Section */}
      <div className="text-center mb-12 md:mb-16 fade-in-up">
        <Badge variant="outline" className="mb-4 md:mb-6 text-sm px-4 py-2 border-primary/20 text-primary bg-primary/5">
          Expertise
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 text-primary tracking-tight">
          Skills & Competencies
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          A comprehensive overview of my technical expertise, tools proficiency, and professional skills
          developed through years of experience in financial compliance and blockchain technology.
        </p>
      </div>

      {/* Skills Section */}
      <section className="mb-16">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-primary/10 backdrop-blur">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold">Professional Skills</h2>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="flex-wrap h-auto p-1 mb-8 bg-black/20 backdrop-blur-md border border-white/5 rounded-xl mx-auto justify-center">
            {categories.map(cat => {
              const Icon = getCategoryIcon(cat);
              return (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  <Icon className="w-4 h-4" />
                  {cat}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={activeCategory}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {filteredSkills.map((skill, index) => (
                <Card
                  key={skill.id}
                  className="glass-panel border-white/5 hover:border-primary/20 hover:shadow-premium transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden"
                  style={{ '--i': index } as any}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-6 relative">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{skill.name}</h3>
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                        {skill.category}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Proficiency</span>
                        <span className="font-bold text-primary">{skill.proficiency}%</span>
                      </div>
                      <Progress value={skill.proficiency} className="h-2 bg-primary/10" indicatorClassName="bg-gradient-to-r from-primary to-accent" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSkills.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No skills found in this category.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Languages Section */}
      <section className="mb-16">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-primary/10 backdrop-blur">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold">Languages</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {languages.map((lang, index) => (
            <Card
              key={lang.id}
              className="glass-panel border-white/5 hover:border-primary/20 hover:shadow-premium transition-all duration-300 hover:scale-[1.02] group"
              style={{ '--i': index } as any}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">{lang.name}</h3>
                  <Badge variant="outline">{lang.proficiency}</Badge>
                </div>
                {renderStars(lang.level)}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 glass-effect rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-4">
          Interested in Collaborating?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Let's discuss how my skills and expertise can contribute to your organization's success
          in compliance, financial crime prevention, or blockchain initiatives.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/contact">
              Get In Touch <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://www.linkedin.com/in/efstathios-georgopoulos/" target="_blank" rel="noopener noreferrer">
              View LinkedIn Profile
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Skills;
