
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield,
    Search,
    AlertTriangle,
    CheckCircle,
    Lock,
    Activity,
    ChevronRight,
    Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface RiskResult {
    score: number;
    level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    flags: string[];
    entity: string;
}

const RiskCalculator = () => {
    const [input, setInput] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<RiskResult | null>(null);

    const handleAnalyze = () => {
        if (!input) return;

        setIsAnalyzing(true);
        setResult(null);

        // Mock Analysis Logic
        setTimeout(() => {
            const mockScore = Math.floor(Math.random() * 100);
            let level: RiskResult['level'] = 'LOW';
            let flags: string[] = [];

            if (mockScore > 80) {
                level = 'CRITICAL';
                flags = ['Sanctioned Entity Match', 'Darknet Market Interaction', 'Mixer/Tumbler Usage'];
            } else if (mockScore > 50) {
                level = 'HIGH';
                flags = ['High-Risk Jurisdiction', 'Gambling Service Interaction'];
            } else if (mockScore > 20) {
                level = 'MEDIUM';
                flags = ['Unregulated Exchange', 'P2P Exchange Activity'];
            } else {
                level = 'LOW';
                flags = ['No High-Risk Flags'];
            }

            setResult({
                score: mockScore,
                level,
                flags,
                entity: input.length > 20 ? `${input.substring(0, 8)}...${input.substring(input.length - 6)}` : input
            });
            setIsAnalyzing(false);
        }, 2000); // 2 second mock delay
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'CRITICAL': return 'text-red-500';
            case 'HIGH': return 'text-orange-500';
            case 'MEDIUM': return 'text-yellow-500';
            case 'LOW': return 'text-green-500';
            default: return 'text-gray-500';
        }
    };

    const getScoreColor = (score: number) => {
        if (score > 80) return 'bg-red-500';
        if (score > 50) return 'bg-orange-500';
        if (score > 20) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">
                            <Activity className="w-3 h-3 mr-2 animate-pulse" />
                            Alpha V0.1
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
                            Real-Time Compliance <span className="text-gradient">Risk Protocol</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Test my compliance logic algorithms. Enter a wallet address or transaction hash to simulate a real-time AML risk assessment.
                        </p>
                    </div>

                    <Card className="border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />

                        <CardContent className="p-8 md:p-12">
                            <div className="flex flex-col md:flex-row gap-4 mb-8">
                                <div className="flex-1 relative group">
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <Input
                                        placeholder="Enter ETH Address (0x...) or Tx Hash"
                                        className="pl-10 h-14 bg-white/5 border-white/10 focus:border-primary/50 text-lg font-mono rounded-xl transition-all"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                                    />
                                </div>
                                <Button
                                    size="lg"
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing || !input}
                                    className="h-14 px-8 rounded-xl text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <Activity className="mr-2 h-5 w-5 animate-spin" />
                                            Scanning...
                                        </>
                                    ) : (
                                        <>
                                            Run Analysis
                                            <ChevronRight className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </Button>
                            </div>

                            <AnimatePresence mode="wait">
                                {isAnalyzing && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm text-muted-foreground">
                                                <span>Analyzing Blockchain Data...</span>
                                                <span>Searching Sanctions Lists...</span>
                                            </div>
                                            <Progress value={66} className="h-2 rounded-full" />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="h-24 rounded-xl bg-white/5 animate-pulse" />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {!isAnalyzing && result && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="border-t border-white/10 pt-8"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Score Panel */}
                                            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                                                <div className="mb-2 text-sm text-muted-foreground">Target Entity</div>
                                                <div className="font-mono text-xs mb-6 px-3 py-1 rounded bg-black/50 text-muted-foreground border border-white/5">{result.entity}</div>

                                                <div className={`text-6xl font-bold mb-2 ${getLevelColor(result.level)}`}>
                                                    {result.score}<span className="text-2xl text-muted-foreground">/100</span>
                                                </div>
                                                <div className={`text-xl font-bold tracking-widest ${getLevelColor(result.level)}`}>
                                                    {result.level} RISK
                                                </div>
                                                <div className="mt-4 w-full h-3 bg-white/10 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${getScoreColor(result.score)}`}
                                                        style={{ width: `${result.score}%` }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Details Panel */}
                                            <div className="space-y-4">
                                                <h4 className="flex items-center text-lg font-semibold">
                                                    <Shield className="w-5 h-5 mr-2 text-primary" />
                                                    Compliance Report
                                                </h4>

                                                <div className="space-y-3">
                                                    {result.flags.map((flag, idx) => (
                                                        <div key={idx} className="flex items-center p-3 rounded-lg bg-white/5 border border-white/5">
                                                            {result.level === 'LOW' ? (
                                                                <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                                                            ) : (
                                                                <AlertTriangle className="w-5 h-5 mr-3 text-yellow-500" />
                                                            )}
                                                            <span className="text-sm font-medium">{flag}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                                    <div className="flex items-start gap-3">
                                                        <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                                        <div className="text-xs text-blue-200/80 leading-relaxed">
                                                            <strong>Simulator Mode:</strong> This tool uses mock data for demonstration purposes.
                                                            In a production environment, this would connect to Chainalysis/Elliptic APIs and cross-reference OFAC/EU sanctions lists.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default RiskCalculator;
