import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

interface LegalContent {
  title: string;
  content: string;
  updated_at: string;
}

const Privacy = () => {
  const [legalContent, setLegalContent] = useState<LegalContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('legal_content')
          .select('*')
          .eq('type', 'privacy')
          .maybeSingle();

        if (data) {
          setLegalContent(data);
        }
      } catch (error) {
        console.error('Error fetching privacy content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const defaultContent = `# Privacy Policy

Last updated: February 2025

## 1. Introduction

This Privacy Policy explains how Efstathios Georgopoulos ("I", "me", or "my") collects, uses, and protects your personal information when you visit my professional portfolio website.

## 2. Information We Collect

We may collect the following types of information:

- **Usage Data:** Pages visited, time spent, referral sources
- **Device Information:** Browser type, operating system, device type
- **Contact Information:** When you voluntarily contact me via forms

## 3. How We Use Information

- To understand how visitors interact with the website
- To improve website performance and user experience
- To respond to inquiries and communications
- To ensure website security and prevent abuse

## 4. Cookies

This website uses cookies to enhance your experience. For more details, please see our [Cookie Policy](/cookies).

## 5. Data Retention

Analytics data is retained for a period of 12 months. Contact information is retained only as long as necessary to respond to your inquiry.

## 6. Your Rights (GDPR)

Under GDPR, you have the right to:

- Access your personal data
- Rectify inaccurate data
- Request deletion of your data
- Object to processing of your data
- Data portability

## 7. Contact

For privacy-related inquiries, please use the [contact form](/contact) or connect via [LinkedIn](https://www.linkedin.com/in/efstathios-georgopoulos/).`;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 fade-in-up">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-full bg-primary/10 backdrop-blur">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">
            {legalContent?.title || 'Privacy Policy'}
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

export default Privacy;
