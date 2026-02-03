import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Star, Zap, Globe, Briefcase, Code, Brain, ArrowRight } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string | null;
  order_index: number;
  visible: boolean;
}

interface Language {
  id: string;
  name: string;
  proficiency: string;
  level: number;
  order_index: number;
  visible: boolean;
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsRes, langRes] = await Promise.all([
          supabase.from('skills').select('*').order('order_index'),
          supabase.from('languages').select('*').order('order_index')
        ]);

        if (skillsRes.data) setSkills(skillsRes.data);
        if (langRes.data) setLanguages(langRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technical': return Code;
      case 'Tools': return Zap;
      case 'Soft Skills': return Brain;
      case 'Compliance': return Briefcase;
      default: return Star;
    }
  };

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
        <div className="animate-pulse text-muted-foreground">Loading skills...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      {/* Hero Section */}
      <div className="text-center mb-12 md:mb-16 fade-in-up">
        <Badge variant="outline" className="mb-4 md:mb-6 text-sm px-4 py-2">
          Expertise
        </Badge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-6 text-primary">
          Skills & Competencies
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          A comprehensive overview of my technical expertise, tools proficiency, and professional skills 
          developed through years of experience in financial compliance and blockchain technology.
        </p>
      </div>

      {/* Skills Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-primary/10 backdrop-blur">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold">Professional Skills</h2>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="flex-wrap h-auto p-1 mb-8">
            {categories.map(cat => {
              const Icon = getCategoryIcon(cat);
              return (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="flex items-center gap-2 px-4 py-2"
                >
                  <Icon className="w-4 h-4" />
                  {cat}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={activeCategory}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
              {filteredSkills.map((skill, index) => (
                <Card 
                  key={skill.id} 
                  className="glass-effect hover:shadow-premium transition-spring hover:scale-105"
                  style={{ '--i': index } as any}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-lg">{skill.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {skill.category}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Proficiency</span>
                        <span className="font-medium">{skill.proficiency}%</span>
                      </div>
                      <Progress value={skill.proficiency} className="h-2" />
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
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-primary/10 backdrop-blur">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold">Languages</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {languages.map((lang, index) => (
            <Card 
              key={lang.id} 
              className="glass-effect hover:shadow-premium transition-spring hover:scale-105"
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

          {languages.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No languages added yet.
            </div>
          )}
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
