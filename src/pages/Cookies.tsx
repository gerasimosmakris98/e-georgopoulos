import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

interface LegalContent {
  title: string;
  content: string;
  updated_at: string;
}

const Cookies = () => {
  const [legalContent, setLegalContent] = useState<LegalContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('legal_content')
          .select('*')
          .eq('type', 'cookies')
          .maybeSingle();

        if (data) {
          setLegalContent(data);
        }
      } catch (error) {
        console.error('Error fetching cookies content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const defaultContent = `# Cookie Policy

Last updated: February 2025

## 1. What Are Cookies?

Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and understand how you use the site.

## 2. Cookies We Use

### Essential Cookies

Required for the website to function properly. These cannot be disabled.

### Analytics Cookies

Help us understand how visitors interact with the website. This data is anonymized and used to improve the user experience.

### Preference Cookies

Remember your cookie consent choice and theme preferences.

## 3. Managing Cookies

You can control cookies through your browser settings. Most browsers allow you to:

- View cookies stored on your device
- Delete all or specific cookies
- Block cookies from specific or all websites
- Set preferences for third-party cookies

## 4. Third-Party Cookies

Links to external websites (such as LinkedIn) may set their own cookies. We have no control over these third-party cookies. Please refer to their respective privacy policies for more information.

## 5. Cookie Consent

When you first visit this website, you will be shown a cookie consent banner. You can choose to accept or reject non-essential cookies. Your choice will be remembered for future visits.

## 6. Contact

For questions about our cookie policy, please use the [contact form](/contact) or connect via [LinkedIn](https://www.linkedin.com/in/efstathios-georgopoulos/).`;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 fade-in-up">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-full bg-primary/10 backdrop-blur">
            <Cookie className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">
            {legalContent?.title || 'Cookie Policy'}
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

export default Cookies;
