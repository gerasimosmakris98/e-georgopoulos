import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { 
  Shield, TrendingUp, Search, FileCheck, 
  Briefcase, CheckCircle, ArrowRight, Linkedin
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  features: string[];
  order_index: number;
  visible: boolean;
}

const iconMap: { [key: string]: React.ElementType } = {
  Shield,
  TrendingUp,
  Search,
  FileCheck,
  Briefcase,
  CheckCircle
};

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('visible', true)
          .order('order_index');

        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getIcon = (iconName: string | null) => {
    if (!iconName) return Briefcase;
    return iconMap[iconName] || Briefcase;
  };

  const defaultServices = [
    {
      id: 'default-1',
      title: 'AML/CFT Compliance',
      description: 'Expert analysis and implementation of Anti-Money Laundering and Counter-Financing of Terrorism programs tailored to your organization.',
      icon: 'Shield',
      features: [
        'Risk Assessment & Gap Analysis',
        'Policy Development',
        'Transaction Monitoring',
        'SAR/STR Filing'
      ],
      order_index: 0,
      visible: true
    },
    {
      id: 'default-2',
      title: 'KYC/CDD Implementation',
      description: 'Comprehensive Know Your Customer and Customer Due Diligence frameworks that balance regulatory requirements with customer experience.',
      icon: 'Search',
      features: [
        'Identity Verification',
        'Enhanced Due Diligence',
        'Ongoing Monitoring',
        'Risk Scoring'
      ],
      order_index: 1,
      visible: true
    },
    {
      id: 'default-3',
      title: 'Blockchain & Crypto Compliance',
      description: 'Specialized compliance solutions for cryptocurrency businesses, DeFi protocols, and blockchain-based financial services.',
      icon: 'TrendingUp',
      features: [
        'VASP Compliance',
        'Travel Rule Implementation',
        'Chainalysis Integration',
        'Regulatory Mapping'
      ],
      order_index: 2,
      visible: true
    },
    {
      id: 'default-4',
      title: 'Quality Assurance & Audit',
      description: 'Independent quality control and compliance auditing to ensure your operations meet regulatory standards.',
      icon: 'FileCheck',
      features: [
        'Process Quality Reviews',
        'Compliance Testing',
        'Gap Identification',
        'Remediation Planning'
      ],
      order_index: 3,
      visible: true
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      {/* Hero Section */}
      <div className="text-center mb-12 md:mb-16 fade-in-up">
        <Badge variant="outline" className="mb-4 md:mb-6 text-sm px-4 py-2">
          Services
        </Badge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-6 text-primary">
          Professional Services
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Specialized consulting services in financial crime compliance, regulatory frameworks, 
          and blockchain technology for organizations seeking to enhance their compliance posture.
        </p>
      </div>

      {/* Services Grid */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
          {displayServices.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <Card 
                key={service.id} 
                className="glass-effect hover:shadow-premium transition-spring hover:scale-[1.02] group"
                style={{ '--i': index } as any}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-playfair mb-2">
                        {service.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Collaboration Areas */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-4">
            Areas of Collaboration
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I work with organizations across various sectors to strengthen their compliance frameworks.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {[
            'Fintech Startups',
            'Traditional Banking',
            'Cryptocurrency Exchanges',
            'Payment Service Providers',
            'DeFi Protocols',
            'Regulatory Technology',
            'Investment Firms',
            'Neo-Banks'
          ].map((area, index) => (
            <Badge 
              key={area} 
              variant="secondary" 
              className="px-4 py-2 text-sm glass-effect hover:shadow-card transition-spring cursor-default"
              style={{ '--i': index } as any}
            >
              {area}
            </Badge>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 glass-effect rounded-2xl">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-4">
            Ready to Strengthen Your Compliance?
          </h2>
          <p className="text-muted-foreground mb-8">
            Whether you need a full compliance program review, specific regulatory guidance, 
            or blockchain compliance expertise, I'm here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">
                Start a Conversation <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://www.linkedin.com/in/efstathios-georgopoulos/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 w-4 h-4" /> Connect on LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
