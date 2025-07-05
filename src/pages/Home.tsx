
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";

const Home = () => {
  const { personalInfo } = useData();
  return (
    <section className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 min-h-screen flex items-center">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-playfair font-bold mb-4 md:mb-6 leading-tight text-foreground">
            {personalInfo.name}
          </h1>
          
          {/* Status Badges - Under the name */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8 px-2">
            {personalInfo.badges.map((badge, index) => (
              <Badge key={index} variant="secondary" className="text-xs md:text-sm px-3 md:px-4 py-1 md:py-2">
                {badge}
              </Badge>
            ))}
          </div>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl font-medium text-muted-foreground mb-2 md:mb-4 px-2">
            {personalInfo.title}
          </p>
          
          {/* Current Position */}
          <p className="text-base sm:text-lg text-muted-foreground mb-4 md:mb-6 px-2 font-semibold">
            {personalInfo.currentPosition}
          </p>
          
          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            {personalInfo.description}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16 px-4">
            <Button 
              variant="default" 
              size="lg"
              asChild
              className="w-full sm:w-auto min-w-[180px] md:min-w-[200px] text-sm md:text-lg h-12 md:h-14"
            >
              <Link to="/contact">
                <Mail className="mr-2 md:mr-3 w-4 md:w-5 h-4 md:h-5" />
                Get In Touch
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              asChild
              className="w-full sm:w-auto min-w-[180px] md:min-w-[200px] text-sm md:text-lg h-12 md:h-14"
            >
              <a href={personalInfo.linkedInLink} target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 md:mr-3 w-4 md:w-5 h-4 md:h-5" />
                LinkedIn Profile
              </a>
            </Button>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16 px-2">
            <Link to="/resume" className="minimal-card p-4 md:p-6 hover:shadow-lg transition-all group">
              <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Resume & Experience</h3>
              <p className="text-sm md:text-base text-muted-foreground">Professional journey across Ebury, American Express, and major European banks</p>
            </Link>
            
            <Link to="/blog" className="minimal-card p-4 md:p-6 hover:shadow-lg transition-all group">
              <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Blog & Articles</h3>
              <p className="text-sm md:text-base text-muted-foreground">Insights on AML/CFT, blockchain compliance, and financial crime prevention</p>
            </Link>
            
            <Link to="/contact" className="minimal-card p-4 md:p-6 hover:shadow-lg transition-all group">
              <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Contact</h3>
              <p className="text-sm md:text-base text-muted-foreground">Get in touch for collaboration and consulting opportunities</p>
            </Link>
          </div>

          {/* Location */}
          <div className="text-center px-4">
            <div className="flex items-center justify-center text-muted-foreground text-sm md:text-lg">
              <MapPin className="w-4 md:w-5 h-4 md:h-5 mr-2 flex-shrink-0" />
              <span className="text-center">{personalInfo.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
