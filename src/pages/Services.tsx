import React from 'react';
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Shield, TrendingUp, Search, FileCheck,
  CheckCircle, ArrowRight, Linkedin
} from 'lucide-react';
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

const Services: React.FC = () => {
  // Static services data
  const services = [
    {
      id: '1',
      title: 'AML/CFT Compliance Consulting',
      description: 'Comprehensive Anti-Money Laundering and Counter-Terrorism Financing compliance services. Includes policy development, gap analysis, regulatory reporting (SAR/STR), remediation programs, and alignment with SEPBLAC, FinCEN, CSSF, BaFin, and BoG.',
      icon: Shield,
      features: [
        'AML/CFT Policy Development',
        'Compliance Gap Analysis',
        'SAR/STR Preparation',
        'Regulatory Alignment (EU/US/LATAM)'
      ]
    },
    {
      id: '2',
      title: 'KYC/CDD & Transaction Monitoring',
      description: 'End-to-end Know Your Customer implementation, Enhanced Due Diligence for PEPs/high-risk clients, sanctions screening optimization, and transaction monitoring tuning to reduce false positives.',
      icon: Search,
      features: [
        'KYC/CDD Framework Design',
        'Enhanced Due Diligence (EDD)',
        'Transaction Monitoring Tuning',
        'False Positive Reduction'
      ]
    },
    {
      id: '3',
      title: 'Blockchain & Crypto Asset Compliance',
      description: 'Specialized compliance for crypto-assets, including Bank of Spain registration, Travel Rule (MiCA) compliance, VASP frameworks, and on-chain forensic analysis using Chainalysis.',
      icon: TrendingUp,
      features: [
        'Crypto-Asset Registration (Spain)',
        'Travel Rule (MiCA) Compliance',
        'On-Chain Forensics (Chainalysis)',
        'VASP Framework Design'
      ]
    },
    {
      id: '4',
      title: 'Compliance Training & Development',
      description: 'Tailored training programs covering AML/CFT fundamentals, blockchain compliance, and KYC/CDD best practices. Delivered via workshops, webinars, or e-learning modules.',
      icon: FileCheck,
      features: [
        'Custom Curriculum Design',
        'Live Workshops & Webinars',
        'Staff Assessment & Certification',
        'Regulatory Update Briefings'
      ]
    },
    {
      id: '5',
      title: 'Fraud Investigation & Forensic Analysis',
      description: 'Deep-dive fraud probes, suspicious transaction investigations, and forensic financial analysis backed by banking investigation experience.',
      icon: Search,
      features: [
        'Fraud Pattern Analysis',
        'Forensic Financial Investigation',
        'Evidence Gathering',
        'Internal Fraud Risk Assessment'
      ]
    },
    {
      id: '6',
      title: 'Compliance Quality Assurance & Auditing',
      description: 'Independent Level 3 QA reviews across the client lifecycle (onboarding, screening, TM). Includes thematic reviews, deep dives, and remedial action tracking.',
      icon: CheckCircle,
      features: [
        'Level 3 QA Reviews',
        'Thematic Compliance Audits',
        'Remedial Action Tracking',
        'Calibration Forums'
      ]
    }
  ];

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((s, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Service",
        "name": s.title,
        "description": s.description
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      <SEO
        title="Compliance & Blockchain Services"
        description="Bespoke advisory for AML, Blockchain regulation, and risk management."
        keywords="Compliance Advisory Services, AML Consulting Madrid, Blockchain Audit, Regulatory Gap Analysis"
        url="/services"
        schema={servicesSchema}
      />
      {/* Hero Section */}
      <div className="text-center mb-12 md:mb-16 fade-in-up">
        <Badge variant="outline" className="mb-4 md:mb-6 text-sm px-4 py-2 border-primary/20 text-primary bg-primary/5">
          Services
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 text-primary tracking-tight">
          Professional Services
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Specialized consulting services in financial crime compliance, regulatory frameworks,
          and blockchain technology for organizations seeking to enhance their compliance posture.
        </p>
      </div>

      {/* Services Grid */}
      <section className="mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                className="glass-panel border-white/5 hover:border-primary/20 hover:shadow-premium transition-all duration-500 hover:scale-[1.01] group cursor-pointer"
                style={{ '--i': index } as any}
                onClick={() => trackEvent(ANALYTICS_EVENTS.SERVICE_CLICK, { service_id: service.id, service_title: service.title })}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl md:text-2xl font-playfair font-bold mb-2">
                        {service.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-white/80">
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
