import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

interface LegalContent {
  title: string;
  content: string;
  updated_at: string;
}

const Terms = () => {
  const [legalContent, setLegalContent] = useState<LegalContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('legal_content')
          .select('*')
          .eq('type', 'terms')
          .maybeSingle();

        if (data) {
          setLegalContent(data);
        }
      } catch (error) {
        console.error('Error fetching terms content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const defaultContent = `# Terms of Service

Last updated: February 2025

## 1. Acceptance of Terms

By accessing this website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this website.

## 2. Use of Content

All content on this website, including text, images, and design, is the property of Efstathios Georgopoulos and is protected by copyright laws. You may view and download content for personal, non-commercial use only.

## 3. Blog Articles

The articles and opinions expressed on this website are my own and do not represent the views of any current or former employer. The information provided is for educational purposes only and should not be considered legal or financial advice.

## 4. External Links

This website may contain links to external websites. I am not responsible for the content or privacy practices of these external sites.

## 5. Limitation of Liability

This website is provided "as is" without any warranties. I shall not be liable for any damages arising from the use of this website.

## 6. Governing Law

These terms shall be governed by and construed in accordance with the laws of Spain and the European Union.

## 7. Changes to Terms

I reserve the right to modify these terms at any time. Changes will be posted on this page with an updated date.

## 8. Contact

For questions about these terms, please use the [contact form](/contact) or connect via [LinkedIn](https://www.linkedin.com/in/efstathios-georgopoulos/).`;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 fade-in-up">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-full bg-primary/10 backdrop-blur">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">
            {legalContent?.title || 'Terms of Service'}
          </h1>
        </div>

        <Card className="glass-effect">
          <CardContent className="p-6 md:p-8">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground mb-6">
                  Last updated: {legalContent?.updated_at 
                    ? format(new Date(legalContent.updated_at), 'MMMM yyyy')
                    : 'February 2025'
                  }
                </p>
                <div className="prose prose-invert max-w-none prose-headings:font-playfair prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary prose-strong:text-foreground">
                  <ReactMarkdown>
                    {legalContent?.content || defaultContent}
                  </ReactMarkdown>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
