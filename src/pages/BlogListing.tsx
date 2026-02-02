import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ExternalLink, Linkedin, ArrowRight } from "lucide-react";
import { useData } from "@/contexts/DataContext";

const BlogListing = () => {
  const { articles, personalInfo } = useData();
  
  const visibleArticles = articles
    .filter(article => article.visible)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const featuredArticle = visibleArticles.find(a => a.featured);
  const regularArticles = visibleArticles.filter(a => !a.featured);

  return (
    <div className="min-h-screen bg-background py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 fade-in-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold mb-4 md:mb-6 text-foreground">
            Publications & Articles
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights and analysis on financial compliance, blockchain technology, and regulatory developments
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="mb-12 md:mb-16 fade-in-up" style={{ animationDelay: '100ms' }}>
            <Card className="glass-effect border-border/50 hover:border-primary/30 transition-all duration-300 group overflow-hidden">
              <div className="md:flex">
                <div className="p-6 md:p-8 flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-primary/20 text-primary border-0">Featured</Badge>
                    {featuredArticle.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                    {featuredArticle.title}
                  </h2>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(featuredArticle.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredArticle.readTime || "5 min read"}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed text-base md:text-lg">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <Button asChild className="rounded-xl group/btn">
                    <a href={featuredArticle.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      Read on LinkedIn
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Articles Grid */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {regularArticles.map((article, index) => (
            <Card 
              key={index} 
              className="glass-effect border-border/50 hover:border-primary/30 transition-all duration-300 group fade-in-up"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h2 className="text-xl md:text-2xl font-playfair font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h2>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(article.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {article.readTime || "5 min read"}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm md:text-base line-clamp-3">
                  {article.excerpt}
                </p>
                
                <Button 
                  variant="outline" 
                  asChild 
                  className="rounded-xl w-full sm:w-auto glass-effect border-border/50 hover:border-primary/50 group/btn"
                >
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    Read Article
                    <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center fade-in-up" style={{ animationDelay: '400ms' }}>
          <Card className="glass-effect border-border/50 max-w-2xl mx-auto">
            <CardContent className="p-8 md:p-10">
              <Linkedin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-playfair font-semibold mb-4 text-foreground">
                Stay Connected
              </h3>
              <p className="text-muted-foreground mb-6">
                Follow me on LinkedIn for the latest insights on financial compliance, blockchain technology, and regulatory developments.
              </p>
              <Button size="lg" asChild className="rounded-xl h-14 px-8 shadow-premium">
                <a 
                  href={personalInfo.linkedInLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  Follow on LinkedIn
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogListing;
