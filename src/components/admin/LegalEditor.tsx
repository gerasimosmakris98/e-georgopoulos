import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Eye, FileText, Shield, Cookie } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

interface LegalContent {
  id: string;
  type: string;
  title: string;
  content: string;
  updated_at: string;
}

const LegalEditor: React.FC = () => {
  const [legalContent, setLegalContent] = useState<{ [key: string]: LegalContent }>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('privacy');
  const { toast } = useToast();

  const legalTypes = [
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'cookies', label: 'Cookie Policy', icon: Cookie }
  ];

  useEffect(() => {
    fetchLegalContent();
  }, []);

  const fetchLegalContent = async () => {
    try {
      const { data, error } = await supabase
        .from('legal_content')
        .select('*');

      if (error) throw error;

      const contentMap: { [key: string]: LegalContent } = {};
      data?.forEach(item => {
        contentMap[item.type] = item;
      });

      // Initialize default content for missing types
      legalTypes.forEach(type => {
        if (!contentMap[type.id]) {
          contentMap[type.id] = {
            id: '',
            type: type.id,
            title: type.label,
            content: getDefaultContent(type.id),
            updated_at: new Date().toISOString()
          };
        }
      });

      setLegalContent(contentMap);
    } catch (error) {
      console.error('Error fetching legal content:', error);
      toast({ title: 'Error', description: 'Failed to load legal content', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const getDefaultContent = (type: string): string => {
    const defaults: { [key: string]: string } = {
      privacy: `# Privacy Policy

Last updated: ${format(new Date(), 'MMMM yyyy')}

## 1. Introduction

This Privacy Policy explains how we collect, use, and protect your personal information.

## 2. Information We Collect

- Usage Data
- Device Information
- Contact Information (when voluntarily provided)

## 3. Your Rights

Under GDPR, you have the right to access, rectify, and delete your data.`,

      terms: `# Terms of Service

Last updated: ${format(new Date(), 'MMMM yyyy')}

## 1. Acceptance of Terms

By accessing this website, you agree to these Terms of Service.

## 2. Use of Content

All content is protected by copyright. Personal, non-commercial use only.

## 3. Limitation of Liability

This website is provided "as is" without warranties.`,

      cookies: `# Cookie Policy

Last updated: ${format(new Date(), 'MMMM yyyy')}

## 1. What Are Cookies?

Cookies are small text files stored on your device.

## 2. Types of Cookies We Use

- **Essential Cookies**: Required for website functionality
- **Analytics Cookies**: Help us understand visitor behavior
- **Preference Cookies**: Remember your settings`
    };

    return defaults[type] || '';
  };

  const updateContent = (type: string, field: 'title' | 'content', value: string) => {
    setLegalContent(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };

  const saveContent = async (type: string) => {
    setSaving(type);
    try {
      const content = legalContent[type];
      const contentData = {
        type,
        title: content.title,
        content: content.content,
        updated_at: new Date().toISOString()
      };

      if (content.id) {
        const { error } = await supabase
          .from('legal_content')
          .update(contentData)
          .eq('id', content.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('legal_content')
          .insert(contentData)
          .select()
          .single();
        if (error) throw error;
        if (data) {
          setLegalContent(prev => ({
            ...prev,
            [type]: { ...prev[type], id: data.id }
          }));
        }
      }

      toast({ title: 'Success', description: `${content.title} saved successfully` });
    } catch (error) {
      console.error('Error saving legal content:', error);
      toast({ title: 'Error', description: 'Failed to save content', variant: 'destructive' });
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading legal content...</div>;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Legal Content Management</h3>
      <p className="text-sm text-muted-foreground">
        Edit your Privacy Policy, Terms of Service, and Cookie Policy. Content supports Markdown formatting.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          {legalTypes.map(type => (
            <TabsTrigger key={type.id} value={type.id} className="flex items-center gap-2">
              <type.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{type.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {legalTypes.map(type => (
          <TabsContent key={type.id} value={type.id}>
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{type.label}</span>
                  {legalContent[type.id]?.updated_at && (
                    <span className="text-sm font-normal text-muted-foreground">
                      Last updated: {format(new Date(legalContent[type.id].updated_at), 'PPP')}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input
                    value={legalContent[type.id]?.title || ''}
                    onChange={(e) => updateContent(type.id, 'title', e.target.value)}
                    placeholder="Page title"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Content (Markdown supported)</Label>
                  <Textarea
                    value={legalContent[type.id]?.content || ''}
                    onChange={(e) => updateContent(type.id, 'content', e.target.value)}
                    placeholder="Enter content using Markdown..."
                    rows={15}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => saveContent(type.id)}
                    disabled={saving === type.id}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving === type.id ? 'Saving...' : 'Save'}
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" /> Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{legalContent[type.id]?.title}</DialogTitle>
                      </DialogHeader>
                      <div className="prose prose-invert max-w-none">
                        <ReactMarkdown>{legalContent[type.id]?.content || ''}</ReactMarkdown>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default LegalEditor;
