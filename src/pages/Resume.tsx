import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Download, Mail, MapPin, Linkedin, Briefcase, GraduationCap,
  Award, Globe, ArrowRight, ExternalLink
} from 'lucide-react';
import { useUI } from '@/contexts/UIContext';
import { SEO } from "@/components/SEO";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

const Resume: React.FC = () => {
  const { openLiveCV, openContact } = useUI();
  // Static Resume Data
  const personalInfo = {
    name: "Efstathios Georgopoulos",
    title: "Financial Crime Compliance Specialist",
    location: "Madrid, Spain",
    summary: "Multilingual Compliance & Blockchain Specialist with deep expertise in AML/CFT, fraud detection, and forensic financial analysis. Demonstrated success across banking and fintech sectors in Europe, blending regulatory insight with hands-on skills in data analytics and blockchain compliance. Proven ability to lead KYC/CDD operations and conduct complex investigations. Experience with regulators such as BoG (Greece), FinCEN (USA), SEPBLAC (Spain), CSSF (Luxembourg), BaFin (Germany), FIU-IND (India), SHCP (Mexico)."
  };

  const experience = [
    {
      id: "1",
      title: "Financial Crime Compliance Quality Assurance Analyst",
      company: "Ebury",
      period: "May 2025 – November 2025",
      location: "Madrid, Spain",
      description: [
        "Conducted independent Level 3 QA reviews across the client lifecycle, including onboarding, reassessments, screening (payment and transaction monitoring), ensuring adherence to AML and financial crime regulations for low, medium, and high-risk clients.",
        "Led thematic reviews and deep dives to identify systemic issues, managed staff feedback loops, tracked remedial actions, and ensured monthly QA targets were consistently met.",
        "Collaborated cross-functionally with Onboarding, Screening, and Reassessment teams to deliver targeted training, address policy non-compliance, and support global compliance deliverables through calibration forums and KYC refresh initiatives."
      ]
    },
    {
      id: "2",
      title: "Compliance Assistant",
      company: "American Express",
      period: "September 2024 – May 2025",
      location: "Madrid, Spain",
      description: [
        "Performed meticulous investigations into potential money laundering and suspicious financial activities using various research and analytical tools including Excel and in-house tools.",
        "Produced detailed reports on suspicious activities, ensuring regulatory compliance and transactional integrity.",
        "Built relationships with strategic partners across the FIU, maintained knowledge of the EMEA financial crime environment, and managed KYC procedures using in-house tools."
      ]
    },
    {
      id: "3",
      title: "Compliance Ops Process Owner (Internship)",
      company: "Decubate",
      period: "June 2024 – September 2024",
      location: "Madrid, Spain",
      description: [
        "Implemented robust compliance systems aligned with regulations, using blockchain analysis to strengthen security and legal safeguards.",
        "Created clear compliance workflows and analyst training for fast, effective execution.",
        "Used tools like Chainalysis for AML/CFT and fraud prevention; automated processes to boost accuracy and efficiency."
      ]
    },
    {
      id: "4",
      title: "Transaction Monitoring Office – Financial Crime Unit",
      company: "Eurobank",
      period: "August 2023 – June 2024",
      location: "Athens, Greece",
      description: [
        "Managed transaction surveillance across sectors using Excel and PowerBI for clear, actionable reporting.",
        "Handled KYC with Jira and Chainalysis to support AML/CFT oversight.",
        "Quickly flagged and escalated suspicious activity to maintain compliance and integrity."
      ]
    },
    {
      id: "5",
      title: "Fraud and AML/CFT Investigator",
      company: "National Bank of Greece",
      period: "January 2023 – August 2023",
      location: "Athens, Greece",
      description: [
        "Led detailed probes into potential money laundering using Excel and internal tools.",
        "Delivered thorough reports to support compliance and uphold transaction integrity."
      ]
    },
    {
      id: "6",
      title: "Operations Specialist",
      company: "Piraeus Bank",
      period: "July 2020 – August 2022",
      location: "Athens, Greece",
      description: [
        "Provided helpline support to customers and bank branches and led fraud investigations, ensuring timely resolution.",
        "Assisted private, corporate, and SME clients with dispute and chargeback management.",
        "Participated in internal audits, streamlined operational procedures, and managed the Pay-All Payroll System."
      ]
    }
  ];

  const education = [
    {
      id: "1",
      degree: "MBA in FinTech & Blockchain",
      school: "ENEB & Universidad Isabel I",
      year: "",
      description: ""
    },
    {
      id: "2",
      degree: "BA in Spanish Language & Literature",
      school: "National and Kapodistrian University of Athens",
      year: "",
      description: ""
    }
  ];

  const certifications = [
    "AML Certifications (Financial Crime Academy and ACAMS)",
    "Fintech & Digital Transformation (University of Athens)",
    "Blockchain Certification (University of Athens)",
    "GDPR (Professional Certification)",
    "Crypto Compliance (Professional Certification)",
    "KYC/CDD (Professional Certification)",
    "Secure Payments (Professional Certification)",
    "Data Analytics (Professional Certification)"
  ];

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative">
      <SEO
        title="Professional Experience"
        description="Detailed resume of Efstathios Georgopoulos - QA Analyst at Ebury and Blockchain specialist."
        keywords="Efstathios Georgopoulos Resume, Compliance Officer Experience, QA Analyst Ebury"
        url="/resume"
      />
      {/* Header / Intro */}
      <div className="text-center mb-12 fade-in-up">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-bold text-primary mb-2 tracking-tight">Resume</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6">{personalInfo.title} • {personalInfo.location}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={() => {
                  trackEvent(ANALYTICS_EVENTS.VIEW_CV, { location: 'resume_header' });
                  openLiveCV();
                }} className="border-primary/20 hover:bg-primary/10">
                  <ExternalLink className="mr-2 w-4 h-4" /> View Live CV
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Opens interactive CV in Notion</p>
              </TooltipContent>
            </Tooltip>

            <Button onClick={() => {
              trackEvent(ANALYTICS_EVENTS.CONTACT_SUBMIT, { location: 'resume_header' });
              openContact();
            }} className="shadow-premium">
              <Mail className="mr-2 w-4 h-4" /> Contact Me
            </Button>
          </TooltipProvider>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

        {/* Left Column: Experience & Education */}
        <div className="lg:col-span-2 space-y-12">

          {/* Experience Section */}
          <section className="fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-playfair font-bold">Professional Experience</h2>
            </div>

            <div className="space-y-8 border-l border-white/10 ml-5 pl-8 relative">
              {experience.map((job, index) => (
                <div key={job.id} className="relative group">
                  {/* Timeline dot */}
                  <span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary transition-transform group-hover:scale-125 duration-300" />

                  <div className="mb-2">
                    <h3 className="text-xl md:text-2xl font-semibold">{job.title}</h3>
                    <div className="text-primary font-medium text-lg">{job.company}</div>
                    <div className="text-sm text-muted-foreground flex gap-3 mt-1">
                      <span>{job.period}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <ul className="list-disc list-outside ml-4 space-y-1 text-muted-foreground/90">
                    {job.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-playfair font-bold">Education</h2>
            </div>

            <div className="space-y-8 border-l border-white/10 ml-5 pl-8 relative">
              {education.map((edu, index) => (
                <div key={edu.id} className="relative group">
                  <span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary transition-transform group-hover:scale-125 duration-300" />

                  <div className="mb-2">
                    <h3 className="text-xl md:text-2xl font-semibold">{edu.degree}</h3>
                    <div className="text-primary font-medium text-lg">{edu.school}</div>
                    <div className="text-sm text-muted-foreground mt-1">{edu.year}</div>
                  </div>
                  <p className="text-muted-foreground">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Skills, Languages, Certifications */}
        <div className="space-y-8">

          {/* Summary */}
          <Card className="glass-panel border-white/5 hover:border-primary/20 transition-all duration-300 fade-in-up" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> About
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {personalInfo.summary}
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
                <a
                  href="https://www.linkedin.com/in/efstathios-georgopoulos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                  onClick={() => trackEvent(ANALYTICS_EVENTS.LINKEDIN_CLICK, { location: 'resume_sidebar' })}
                >
                  <Linkedin className="w-4 h-4" /> linkedin.com/in/efstathios-georgopoulos
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="glass-panel border-white/5 hover:border-primary/20 transition-all duration-300 fade-in-up" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Certifications</h3>
              </div>
              <ul className="space-y-3">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="mt-0.5 min-w-[6px] min-h-[6px] p-0 rounded-full bg-primary" />
                    {cert}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Skills Preview */}
          <Card className="glass-panel border-white/5 hover:border-primary/20 transition-all duration-300 fade-in-up" style={{ animationDelay: '0.5s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Key Skills</h3>
                </div>
                <Button variant="ghost" size="sm" asChild className="h-8 text-xs hover:text-primary hover:bg-primary/10">
                  <Link to="/skills">View All</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {['AML/CFT', 'KYC/CDD', 'Blockchain', 'Fraud Prevention', 'Risk Assessment', 'Quality Assurance'].map((skill) => (
                  <Badge key={skill} variant="outline" className="bg-white/5 border-white/10 hover:border-primary/30 transition-colors">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <p className="text-muted-foreground mb-4">Looking for a comprehensive overview of my capabilities?</p>
        <Button asChild size="lg" className="gap-2">
          <Link to="/skills">
            Explore Full Skills Matrix <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Resume;
