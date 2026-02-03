import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  features: string[];
  order_index: number;
  visible: boolean;
}

const ServicesEditor: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newFeature, setNewFeature] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({ title: 'Error', description: 'Failed to load services', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const addService = () => {
    const newService: Service = {
      id: `temp-${Date.now()}`,
      title: '',
      description: '',
      icon: 'Briefcase',
      features: [],
      order_index: services.length,
      visible: true
    };
    setServices([...services, newService]);
  };

  const updateService = (id: string, field: keyof Service, value: any) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addFeature = (serviceId: string) => {
    const feature = newFeature[serviceId]?.trim();
    if (!feature) return;

    setServices(services.map(s => 
      s.id === serviceId 
        ? { ...s, features: [...s.features, feature] } 
        : s
    ));
    setNewFeature({ ...newFeature, [serviceId]: '' });
  };

  const removeFeature = (serviceId: string, index: number) => {
    setServices(services.map(s => 
      s.id === serviceId 
        ? { ...s, features: s.features.filter((_, i) => i !== index) } 
        : s
    ));
  };

  const deleteService = async (id: string) => {
    if (id.startsWith('temp-')) {
      setServices(services.filter(s => s.id !== id));
      return;
    }

    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      setServices(services.filter(s => s.id !== id));
      toast({ title: 'Success', description: 'Service deleted' });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({ title: 'Error', description: 'Failed to delete service', variant: 'destructive' });
    }
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      for (const service of services) {
        const serviceData = {
          title: service.title,
          description: service.description,
          icon: service.icon,
          features: service.features,
          order_index: service.order_index,
          visible: service.visible
        };

        if (service.id.startsWith('temp-')) {
          const { error } = await supabase.from('services').insert(serviceData);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('services').update(serviceData).eq('id', service.id);
          if (error) throw error;
        }
      }
      toast({ title: 'Success', description: 'Services saved successfully' });
      fetchServices();
    } catch (error) {
      console.error('Error saving services:', error);
      toast({ title: 'Error', description: 'Failed to save services', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading services...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Services</h3>
        <div className="flex gap-2">
          <Button onClick={addService} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" /> Add Service
          </Button>
          <Button onClick={saveAll} disabled={saving} size="sm">
            <Save className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Save All'}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {services.map((service) => (
          <Card key={service.id} className="glass-effect">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={service.title}
                      onChange={(e) => updateService(service.id, 'title', e.target.value)}
                      placeholder="Service title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Icon (Lucide icon name)</Label>
                    <Input
                      value={service.icon || ''}
                      onChange={(e) => updateService(service.id, 'icon', e.target.value)}
                      placeholder="e.g., Shield, TrendingUp, Search"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={service.visible}
                      onCheckedChange={(checked) => updateService(service.id, 'visible', checked)}
                    />
                    <Label className="text-sm">Visible</Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteService(service.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={service.description || ''}
                  onChange={(e) => updateService(service.id, 'description', e.target.value)}
                  placeholder="Service description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Features</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {service.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {feature}
                      <button
                        onClick={() => removeFeature(service.id, index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newFeature[service.id] || ''}
                    onChange={(e) => setNewFeature({ ...newFeature, [service.id]: e.target.value })}
                    placeholder="Add a feature"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature(service.id))}
                  />
                  <Button type="button" variant="outline" onClick={() => addFeature(service.id)}>
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {services.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No services added yet. Click "Add Service" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesEditor;
