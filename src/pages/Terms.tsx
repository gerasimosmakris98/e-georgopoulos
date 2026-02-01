import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-full bg-primary/10 backdrop-blur">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">Terms of Service</h1>
        </div>

        <Card className="glass-effect">
          <CardContent className="p-6 md:p-8 prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">Last updated: February 2025</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing this website, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use this website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">2. Use of Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including text, images, and design, is the property 
                of Efstathios Georgopoulos and is protected by copyright laws. You may view and 
                download content for personal, non-commercial use only.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">3. Blog Articles</h2>
              <p className="text-muted-foreground leading-relaxed">
                The articles and opinions expressed on this website are my own and do not 
                represent the views of any current or former employer. The information provided 
                is for educational purposes only and should not be considered legal or financial advice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">4. External Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                This website may contain links to external websites. I am not responsible for 
                the content or privacy practices of these external sites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">5. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                This website is provided "as is" without any warranties. I shall not be liable 
                for any damages arising from the use of this website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">6. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of Spain 
                and the European Union.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">7. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                I reserve the right to modify these terms at any time. Changes will be posted on 
                this page with an updated date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">8. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these terms, please contact{' '}
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

export default Terms;
