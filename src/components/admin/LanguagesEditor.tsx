import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Save, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Language {
  id: string;
  name: string;
  proficiency: string;
  level: number;
  order_index: number;
  visible: boolean;
}

const LanguagesEditor: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const proficiencyLevels = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'];

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setLanguages(data || []);
    } catch (error) {
      console.error('Error fetching languages:', error);
      toast({ title: 'Error', description: 'Failed to load languages', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const addLanguage = () => {
    const newLanguage: Language = {
      id: `temp-${Date.now()}`,
      name: '',
      proficiency: 'Intermediate',
      level: 3,
      order_index: languages.length,
      visible: true
    };
    setLanguages([...languages, newLanguage]);
  };

  const updateLanguage = (id: string, field: keyof Language, value: any) => {
    setLanguages(languages.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const deleteLanguage = async (id: string) => {
    if (id.startsWith('temp-')) {
      setLanguages(languages.filter(l => l.id !== id));
      return;
    }

    try {
      const { error } = await supabase.from('languages').delete().eq('id', id);
      if (error) throw error;
      setLanguages(languages.filter(l => l.id !== id));
      toast({ title: 'Success', description: 'Language deleted' });
    } catch (error) {
      console.error('Error deleting language:', error);
      toast({ title: 'Error', description: 'Failed to delete language', variant: 'destructive' });
    }
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      for (const lang of languages) {
        const langData = {
          name: lang.name,
          proficiency: lang.proficiency,
          level: lang.level,
          order_index: lang.order_index,
          visible: lang.visible
        };

        if (lang.id.startsWith('temp-')) {
          const { error } = await supabase.from('languages').insert(langData);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('languages').update(langData).eq('id', lang.id);
          if (error) throw error;
        }
      }
      toast({ title: 'Success', description: 'Languages saved successfully' });
      fetchLanguages();
    } catch (error) {
      console.error('Error saving languages:', error);
      toast({ title: 'Error', description: 'Failed to save languages', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const renderStars = (level: number, onChange: (newLevel: number) => void) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="focus:outline-none"
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              star <= level ? 'fill-primary text-primary' : 'text-muted-foreground'
            }`}
          />
        </button>
      ))}
    </div>
  );

  if (loading) {
    return <div className="text-center py-8">Loading languages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Languages</h3>
        <div className="flex gap-2">
          <Button onClick={addLanguage} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" /> Add Language
          </Button>
          <Button onClick={saveAll} disabled={saving} size="sm">
            <Save className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Save All'}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {languages.map((lang) => (
          <Card key={lang.id} className="glass-effect">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <Input
                  value={lang.name}
                  onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                  placeholder="Language name"
                />

                <Select
                  value={lang.proficiency}
                  onValueChange={(value) => updateLanguage(lang.id, 'proficiency', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {proficiencyLevels.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">Level</Label>
                  {renderStars(lang.level, (newLevel) => updateLanguage(lang.id, 'level', newLevel))}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={lang.visible}
                      onCheckedChange={(checked) => updateLanguage(lang.id, 'visible', checked)}
                    />
                    <Label className="text-sm">Visible</Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteLanguage(lang.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {languages.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No languages added yet. Click "Add Language" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguagesEditor;
