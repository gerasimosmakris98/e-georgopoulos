import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-full bg-primary/10 backdrop-blur">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">Privacy Policy</h1>
        </div>

        <Card className="glass-effect">
          <CardContent className="p-6 md:p-8 prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">Last updated: February 2025</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Policy explains how Efstathios Georgopoulos ("I", "me", or "my") collects, 
                uses, and protects your personal information when you visit my professional portfolio website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Usage Data:</strong> Pages visited, time spent, referral sources</li>
                <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
                <li><strong>Contact Information:</strong> When you voluntarily contact me via email or forms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">3. How We Use Information</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>To understand how visitors interact with the website</li>
                <li>To improve website performance and user experience</li>
                <li>To respond to inquiries and communications</li>
                <li>To ensure website security and prevent abuse</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">4. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                This website uses cookies to enhance your experience. For more details, please see our{' '}
                <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">5. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                Analytics data is retained for a period of 12 months. Contact information is retained 
                only as long as necessary to respond to your inquiry.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">6. Your Rights (GDPR)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Under GDPR, you have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">7. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For privacy-related inquiries, please contact me at{' '}
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

export default Privacy;
