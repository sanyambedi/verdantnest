
"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Stethoscope, 
  Loader2, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  Camera,
  X
} from 'lucide-react';
import { diagnosePlantHealth, DiagnosePlantHealthOutput } from '@/ai/flows/diagnose-plant';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function AiDoctorPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [plantName, setPlantName] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosePlantHealthOutput | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please upload an image smaller than 2MB.'
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoDataUri(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDiagnose = async () => {
    if (!symptoms) {
      toast({
        variant: 'destructive',
        title: 'Missing info',
        description: 'Please describe the symptoms your plant is experiencing.'
      });
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const diagnosis = await diagnosePlantHealth({
        plantName,
        symptoms,
        photoDataUri: photoDataUri || undefined
      });
      setResult(diagnosis);
      toast({
        title: 'Diagnosis complete',
        description: 'The AI Doctor has analyzed your plant.'
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Analysis failed',
        description: 'The AI Doctor encountered an error. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const severityColors = {
    low: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    high: 'bg-orange-100 text-orange-700 border-orange-200',
    critical: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
            <Stethoscope className="w-4 h-4" />
            AI Diagnostic Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">AI Plant Doctor</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload a photo or describe symptoms to receive a professional botanical diagnosis and recovery plan.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle>Symptom Reporter</CardTitle>
              <CardDescription>Tell us what's wrong with your green friend.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary">Plant Name (Optional)</label>
                    <Input 
                      placeholder="e.g. Monstera, Fiddle Leaf Fig" 
                      value={plantName}
                      onChange={(e) => setPlantName(e.target.value)}
                      className="bg-white border-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary">Describe Symptoms</label>
                    <Textarea 
                      placeholder="e.g. The bottom leaves are turning yellow and mushy, and I see small white spots on the stems..." 
                      className="min-h-[150px] bg-white border-primary/20"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-primary block">Upload Photo (Optional)</label>
                  <div className={cn(
                    "relative aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden",
                    photoDataUri ? "border-primary" : "border-primary/20 hover:border-primary/40 bg-primary/5"
                  )}>
                    {photoDataUri ? (
                      <>
                        <Image src={photoDataUri} alt="Preview" fill className="object-cover" />
                        <Button 
                          size="icon" 
                          variant="destructive" 
                          className="absolute top-2 right-2 rounded-full h-8 w-8"
                          onClick={() => setPhotoDataUri(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <label className="flex flex-col items-center gap-3 cursor-pointer p-8 text-center">
                        <div className="p-4 rounded-full bg-white shadow-sm text-primary">
                          <Camera className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-primary">Click to upload image</p>
                          <p className="text-xs text-muted-foreground">High-res photos help improve accuracy</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleDiagnose} 
                disabled={loading || !symptoms}
                className="w-full py-8 text-lg font-bold rounded-2xl gap-3 shadow-lg shadow-primary/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Analyzing Botanical Data...
                  </>
                ) : (
                  <>
                    <Stethoscope className="w-6 h-6" />
                    Get AI Diagnosis
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none shadow-lg overflow-hidden">
                  <CardHeader className="bg-primary/5 border-b">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-headline text-primary">Diagnosis Report</CardTitle>
                      <Badge variant="outline" className={cn("px-4 py-1 rounded-full border font-bold capitalize", severityColors[result.severity])}>
                        {result.severity} Severity
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="flex gap-4 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                      <Info className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg mb-1">Observation</h3>
                        <p className="text-muted-foreground leading-relaxed">{result.diagnosis}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-xl flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        Recovery Plan
                      </h3>
                      <ul className="grid grid-cols-1 gap-3">
                        {result.recommendations.map((step, i) => (
                          <li key={i} className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl text-sm font-medium">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs shrink-0">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="border-none shadow-lg bg-emerald-50/50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Loader2 className="w-4 h-4 text-emerald-600" />
                        Prognosis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm italic text-emerald-800/80 leading-relaxed">
                        {result.prognosis}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-primary">
                        <AlertTriangle className="w-4 h-4" />
                        Prevention Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {result.preventionTips.map((tip, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex gap-2">
                            <span className="text-primary mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
