import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, MapPin, Award, Download, User, Languages, Wrench, GraduationCap, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useData } from "@/contexts/DataContext";

const Resume = () => {
  const { personalInfo, experiences, education, certifications } = useData();

  const visibleExperiences = experiences.filter(exp => exp.visible);
  const visibleEducation = education.filter(edu => edu.visible);
  const visibleCertifications = certifications.filter(cert => cert.visible);

  const languages = [
    { language: "Greek", level: "Native" },
    { language: "English", level: "Fluent" },
    { language: "Spanish", level: "Fluent" }
  ];

  const tools = {
    "Data Analysis & Reporting": ["Excel", "PowerBI"],
    "Compliance & Investigation Platforms": ["Jira", "Oracle", "Siron", "Riskshield", "Chainalysis", "Microsoft Dynamics", "Veriff"],
    "AI & Productivity Tools": ["ChatGPT", "Gemini", "Napier", "Copilot"]
  };

  return (
    <div className="min-h-screen bg-background py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 fade-in-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold mb-4 md:mb-6 text-foreground">
            Resume & Experience
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Multilingual Compliance & Blockchain Specialist with deep expertise in AML/CFT, fraud detection, and forensic financial analysis
          </p>
          <Button variant="default" size="lg" asChild className="rounded-xl h-14 px-8 shadow-premium">
            <a href={personalInfo.cvLink} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 w-5 h-5" />
              Download PDF Resume
            </a>
          </Button>
        </div>

        {/* Professional Summary */}
        <section className="mb-12 md:mb-16 fade-in-up" style={{ animationDelay: '100ms' }}>
          <Card className="glass-effect border-border/50">
            <CardHeader>
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-xl bg-primary/10 mr-4">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-foreground">Professional Summary</h2>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                {personalInfo.description}
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                Proven ability to lead KYC/CDD operations and conduct complex investigations. Fluent in Greek, English, Spanish.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Experience with regulators: <strong className="text-foreground">BoG (Greece)</strong>, <strong className="text-foreground">FinCEN (USA)</strong>, <strong className="text-foreground">SEPBLAC (Spain)</strong>,{' '}
                <strong className="text-foreground">CSSF (Luxembourg)</strong>, <strong className="text-foreground">BaFin (Germany)</strong>, <strong className="text-foreground">FIU-IND (India)</strong>, <strong className="text-foreground">SHCP (Mexico)</strong>.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Professional Experience */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-6 md:mb-8 text-foreground fade-in-up">
            Relevant Employment History
          </h2>
          <div className="space-y-6 md:space-y-8">
            {visibleExperiences.map((exp, index) => (
              <Card 
                key={index} 
                className="glass-effect border-border/50 hover:border-primary/30 transition-all duration-300 fade-in-up"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-playfair font-bold mb-4 text-foreground">
                        {exp.title}
                      </h3>
                      
                      <div className="flex items-center text-foreground mb-3">
                        <Building2 className="w-5 h-5 mr-3 text-primary" />
                        <span className="font-semibold text-lg">{exp.company}</span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="font-medium">{exp.period}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{exp.location}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {exp.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-base md:text-lg">
                    {exp.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Key Responsibilities:</h4>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start text-muted-foreground text-sm">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-12 md:mb-16 fade-in-up">
          <div className="flex items-center mb-6 md:mb-8">
            <div className="p-3 rounded-xl bg-primary/10 mr-4">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-foreground">Education</h2>
          </div>
          <div className="grid gap-4 md:gap-6">
            {visibleEducation.map((edu, index) => (
              <Card key={index} className="glass-effect border-border/50 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg md:text-xl font-semibold text-foreground">{edu.degree}</h3>
                    {edu.status === "In Progress" && (
                      <Badge variant="outline" className="text-xs bg-primary/10 border-primary/30">
                        <Star className="w-3 h-3 mr-1" />
                        {edu.status}
                      </Badge>
                    )}
                  </div>
                  <p className="text-base md:text-lg text-muted-foreground">{edu.institution}</p>
                  {edu.period && (
                    <p className="text-sm text-muted-foreground mt-1">{edu.period}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-12 md:mb-16 fade-in-up">
          <div className="flex items-center mb-6 md:mb-8">
            <div className="p-3 rounded-xl bg-primary/10 mr-4">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-foreground">Certifications</h2>
          </div>
          <Card className="glass-effect border-border/50">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleCertifications.map((cert, index) => (
                  <div 
                    key={index} 
                    className="flex items-start p-3 rounded-xl hover:bg-primary/5 transition-colors group"
                  >
                    <Award className="w-5 h-5 mr-3 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {cert.name}
                      </span>
                      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                      {cert.date && (
                        <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                      )}
                    </div>
                    {cert.credentialUrl && (
                      <a 
                        href={cert.credentialUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Languages & Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Languages */}
          <section className="fade-in-up">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-xl bg-primary/10 mr-4">
                <Languages className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-foreground">Languages</h2>
            </div>
            <Card className="glass-effect border-border/50">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {languages.map((lang, index) => (
                    <div key={index} className="text-center p-4 rounded-xl hover:bg-primary/5 transition-colors">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{lang.language}</h3>
                      <Badge variant="secondary" className="text-xs">{lang.level}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Tools */}
          <section className="fade-in-up">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-xl bg-primary/10 mr-4">
                <Wrench className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-foreground">Tools & Tech</h2>
            </div>
            <Card className="glass-effect border-border/50">
              <CardContent className="p-6 space-y-4">
                {Object.entries(tools).map(([category, toolList], index) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {toolList.map((tool) => (
                        <Badge key={tool} variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resume;
