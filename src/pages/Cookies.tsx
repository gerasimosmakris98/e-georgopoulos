import { Card, CardContent } from '@/components/ui/card';
import { Cookie } from 'lucide-react';

const Cookies = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-full bg-primary/10 backdrop-blur">
            <Cookie className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">Cookie Policy</h1>
        </div>

        <Card className="glass-effect">
          <CardContent className="p-6 md:p-8 prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">Last updated: February 2025</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">1. What Are Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files stored on your device when you visit a website. 
                They help websites remember your preferences and understand how you use the site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">2. Cookies We Use</h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-background/50 border border-border">
                  <h3 className="font-medium text-foreground mb-2">Essential Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Required for the website to function properly. These cannot be disabled.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border border-border">
                  <h3 className="font-medium text-foreground mb-2">Analytics Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how visitors interact with the website. This data is anonymized 
                    and used to improve the user experience.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border border-border">
                  <h3 className="font-medium text-foreground mb-2">Preference Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Remember your cookie consent choice and theme preferences.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">3. Managing Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                You can control cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>View cookies stored on your device</li>
                <li>Delete all or specific cookies</li>
                <li>Block cookies from specific or all websites</li>
                <li>Set preferences for third-party cookies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">4. Third-Party Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Links to external websites (such as LinkedIn) may set their own cookies. 
                We have no control over these third-party cookies. Please refer to their 
                respective privacy policies for more information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">5. Cookie Consent</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you first visit this website, you will be shown a cookie consent banner. 
                You can choose to accept or reject non-essential cookies. Your choice will be 
                remembered for future visits.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">6. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about our cookie policy, please contact{' '}
                <a href="mailto:stgeorgo141@gmail.com" className="text-primary hover:underline">
                  stgeorgo141@gmail.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cookies;
