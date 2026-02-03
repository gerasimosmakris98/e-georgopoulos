import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Save, GripVertical } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string | null;
  order_index: number;
  visible: boolean;
}

const SkillsEditor: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const categories = ['Technical', 'Tools', 'Soft Skills', 'Compliance', 'Languages'];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast({ title: 'Error', description: 'Failed to load skills', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: `temp-${Date.now()}`,
      name: '',
      category: 'Technical',
      proficiency: 80,
      icon: null,
      order_index: skills.length,
      visible: true
    };
    setSkills([...skills, newSkill]);
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    setSkills(skills.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const deleteSkill = async (id: string) => {
    if (id.startsWith('temp-')) {
      setSkills(skills.filter(s => s.id !== id));
      return;
    }

    try {
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) throw error;
      setSkills(skills.filter(s => s.id !== id));
      toast({ title: 'Success', description: 'Skill deleted' });
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({ title: 'Error', description: 'Failed to delete skill', variant: 'destructive' });
    }
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      for (const skill of skills) {
        const skillData = {
          name: skill.name,
          category: skill.category,
          proficiency: skill.proficiency,
          icon: skill.icon,
          order_index: skill.order_index,
          visible: skill.visible
        };

        if (skill.id.startsWith('temp-')) {
          const { error } = await supabase.from('skills').insert(skillData);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('skills').update(skillData).eq('id', skill.id);
          if (error) throw error;
        }
      }
      toast({ title: 'Success', description: 'Skills saved successfully' });
      fetchSkills();
    } catch (error) {
      console.error('Error saving skills:', error);
      toast({ title: 'Error', description: 'Failed to save skills', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading skills...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Skills</h3>
        <div className="flex gap-2">
          <Button onClick={addSkill} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" /> Add Skill
          </Button>
          <Button onClick={saveAll} disabled={saving} size="sm">
            <Save className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Save All'}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <Card key={skill.id} className="glass-effect">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                  <Input
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    placeholder="Skill name"
                  />
                </div>

                <Select
                  value={skill.category}
                  onValueChange={(value) => updateSkill(skill.id, 'category', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Proficiency</span>
                    <span>{skill.proficiency}%</span>
                  </div>
                  <Slider
                    value={[skill.proficiency]}
                    onValueChange={([value]) => updateSkill(skill.id, 'proficiency', value)}
                    max={100}
                    step={5}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={skill.visible}
                      onCheckedChange={(checked) => updateSkill(skill.id, 'visible', checked)}
                    />
                    <Label className="text-sm">Visible</Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteSkill(skill.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {skills.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No skills added yet. Click "Add Skill" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsEditor;
