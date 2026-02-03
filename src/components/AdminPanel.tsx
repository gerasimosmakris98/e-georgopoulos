import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Settings, User, Briefcase, GraduationCap, Award, BookOpen, Mail, BarChart3, LogOut, Zap, Globe, FileText, MessageSquare } from 'lucide-react';
import PersonalInfoEditor from './admin/PersonalInfoEditor';
import ExperienceEditor from './admin/ExperienceEditor';
import EducationEditor from './admin/EducationEditor';
import CertificationEditor from './admin/CertificationEditor';
import ArticleEditor from './admin/ArticleEditor';
import ContactEditor from './admin/ContactEditor';
import AnalyticsEditor from './admin/AnalyticsEditor';
import SkillsEditor from './admin/SkillsEditor';
import LanguagesEditor from './admin/LanguagesEditor';
import ServicesEditor from './admin/ServicesEditor';
import MessagesEditor from './admin/MessagesEditor';
import LegalEditor from './admin/LegalEditor';

const AdminPanel: React.FC = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Settings className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-playfair font-bold">Admin Panel</h1>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-2xl font-playfair">Content Management</CardTitle>
              <p className="text-muted-foreground">
                Manage your portfolio content, update information, and control visibility
              </p>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="flex flex-wrap h-auto p-1 gap-1">
                  <TabsTrigger value="personal" className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Personal</span>
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="flex items-center space-x-1">
                    <Briefcase className="w-4 h-4" />
                    <span className="hidden sm:inline">Experience</span>
                  </TabsTrigger>
                  <TabsTrigger value="education" className="flex items-center space-x-1">
                    <GraduationCap className="w-4 h-4" />
                    <span className="hidden sm:inline">Education</span>
                  </TabsTrigger>
                  <TabsTrigger value="certifications" className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span className="hidden sm:inline">Certs</span>
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="flex items-center space-x-1">
                    <Zap className="w-4 h-4" />
                    <span className="hidden sm:inline">Skills</span>
                  </TabsTrigger>
                  <TabsTrigger value="languages" className="flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span className="hidden sm:inline">Languages</span>
                  </TabsTrigger>
                  <TabsTrigger value="services" className="flex items-center space-x-1">
                    <Briefcase className="w-4 h-4" />
                    <span className="hidden sm:inline">Services</span>
                  </TabsTrigger>
                  <TabsTrigger value="articles" className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span className="hidden sm:inline">Articles</span>
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span className="hidden sm:inline">Messages</span>
                  </TabsTrigger>
                  <TabsTrigger value="contact" className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span className="hidden sm:inline">Contact</span>
                  </TabsTrigger>
                  <TabsTrigger value="legal" className="flex items-center space-x-1">
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">Legal</span>
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center space-x-1">
                    <BarChart3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Analytics</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="mt-6">
                  <PersonalInfoEditor />
                </TabsContent>

                <TabsContent value="experience" className="mt-6">
                  <ExperienceEditor />
                </TabsContent>

                <TabsContent value="education" className="mt-6">
                  <EducationEditor />
                </TabsContent>

                <TabsContent value="certifications" className="mt-6">
                  <CertificationEditor />
                </TabsContent>

                <TabsContent value="skills" className="mt-6">
                  <SkillsEditor />
                </TabsContent>

                <TabsContent value="languages" className="mt-6">
                  <LanguagesEditor />
                </TabsContent>

                <TabsContent value="services" className="mt-6">
                  <ServicesEditor />
                </TabsContent>

                <TabsContent value="articles" className="mt-6">
                  <ArticleEditor />
                </TabsContent>

                <TabsContent value="messages" className="mt-6">
                  <MessagesEditor />
                </TabsContent>

                <TabsContent value="contact" className="mt-6">
                  <ContactEditor />
                </TabsContent>

                <TabsContent value="legal" className="mt-6">
                  <LegalEditor />
                </TabsContent>

                <TabsContent value="analytics" className="mt-6">
                  <AnalyticsEditor />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;