import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Activity, Play, Pause, FastForward, SkipForward, Rewind, SkipBack, BookOpen, CheckCircle2 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNarration } from '../../hooks/useNarration';
import { NarrationControls } from './NarrationControls';
import { getIndianNarration } from '../../lib/hinglishTranslator';
import { LoopVis, VisualizerContext as TopicVisualizerContext } from './TopicVisualizer';

// ─── Shared Context and Hook ────────────────────────────
const VisualizerContext = React.createContext(null);

function useSteps(count, playing, msPerStep) {
    const ctx = useContext(VisualizerContext);
    const [localStep, setLocalStep] = useState(0);
    
    const step = ctx ? ctx.step : localStep;
    const setStep = ctx ? ctx.setStep : setLocalStep;

    useEffect(() => {
        if (!playing || ctx) return;
        const id = setInterval(() => {
            setStep(s => (s + 1) % count);
        }, msPerStep);
        return () => clearInterval(id);
    }, [playing, msPerStep, count, setStep, !!ctx]);

    useEffect(() => {
        if (!ctx) {
            setLocalStep(0);
        }
    }, [count, !!ctx]);

    return [step, setStep];
}

// ─────────────────────────────────────────────────────────────────────────────
// ConditionalsVis (Flowchart branches) — Flow decision diamond
// ─────────────────────────────────────────────────────────────────────────────
const ConditionalsVis = ({ playing, speed, onStepChange }) => {
    const frames = [
        { label: 'Conditionals: program decides action path via criteria check.', active: 'intro' },
        { label: 'We read an integer from the user. Let\'s evaluate n = -5.', active: 'check' },
        { label: 'Evaluating first branch: is -5 > 0 ? (No → Skip branch)', active: 'pos' },
        { label: 'Evaluating second branch: is -5 < 0 ? (Yes → Enter branch)', active: 'neg' },
        { label: 'Execute branch block: print "Negative" and bypass all remaining options.', active: 'exec' },
        { label: 'Execution complete: program selected exactly one path through the branches.', active: 'out' },
    ];
    const [step] = useSteps(frames.length, playing, Math.round(2200 / speed));
    const cur = frames[step] || frames[0];

    useEffect(() => {
        onStepChange?.(step);
    }, [step, onStepChange]);

    const branches = [
        { cond: 'n > 0', label: 'Positive', color: '#10B981', stepIdx: 2, success: false },
        { cond: 'n < 0', label: 'Negative', color: '#EF4444', stepIdx: 3, success: true },
        { cond: 'else', label: 'Zero', color: '#F59E0B', stepIdx: 4, success: false }
    ];

    return (
        <div className="w-full max-w-md flex flex-col items-center gap-6 select-none font-mono">
            <div className="flex gap-4 items-center justify-center w-full relative min-h-[170px] py-4 bg-slate-950/20 border border-slate-900 rounded-2xl px-3">
                
                {/* Flowchart Decision Diamond Symbol */}
                <motion.div 
                    animate={{
                        borderColor: step >= 1 ? '#3B82F6' : 'rgba(255,255,255,0.06)',
                        backgroundColor: step >= 1 ? 'rgba(59,130,246,0.1)' : '#020617',
                        boxShadow: step === 1 ? '0 0 25px rgba(59,130,246,0.3)' : 'none'
                    }}
                    className="w-20 h-20 border-2 rounded flex flex-col items-center justify-center text-xs relative rotate-45"
                >
                    <div className="-rotate-45 flex flex-col items-center text-[10px]">
                        <span className="text-[7.5px] text-slate-400 font-extrabold uppercase mb-0.5">CHECK:</span>
                        <span className="font-extrabold text-slate-100 text-xs">n = -5</span>
                    </div>
                </motion.div>
                
                {/* connecting flowline */}
                <div className="w-10 h-0.5 relative">
                    <div className="absolute inset-0 bg-[#1E293B]" />
                    {step >= 1 && (
                        <motion.div 
                            initial={{ x: '-100%' }} animate={{ x: '100%' }}
                            transition={{ repeat: Infinity, duration: 1 / speed, ease: 'linear' }}
                            className="absolute inset-y-0 w-3 bg-primary-500"
                        />
                    )}
                </div>
                
                {/* Branches blocks */}
                <div className="flex flex-col gap-3 text-[10px]">
                    {branches.map(b => {
                        const isChecking = step === b.stepIdx;
                        const isTaken = b.success && step >= 3;
                        const isSkipped = !b.success && step >= b.stepIdx;
                        
                        return (
                            <motion.div
                                key={b.label}
                                animate={{
                                    borderColor: isChecking ? '#3b82f6' : isTaken ? '#10B981' : isSkipped ? '#334155' : '#1E293B',
                                    backgroundColor: isChecking ? 'rgba(59,130,246,0.06)' : isTaken ? 'rgba(16,185,129,0.08)' : '#020617',
                                    opacity: isChecking || isTaken ? 1 : 0.3,
                                    scale: isChecking || isTaken ? 1.03 : 1
                                }}
                                className="px-3.5 py-2 border-2 rounded-xl flex gap-5 items-center justify-between min-w-[170px] relative overflow-hidden bg-[#020617]"
                            >
                                {isChecking && (
                                    <motion.div 
                                        animate={{ x: [-150, 150] }}
                                        transition={{ repeat: Infinity, duration: 1.5 / speed }}
                                        className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-primary-500/20 to-transparent pointer-events-none"
                                    />
                                )}
                                
                                <div className="flex flex-col gap-0.5">
                                    <span className="font-extrabold text-slate-200">{b.cond}</span>
                                    <span className="text-[7.5px] text-[#475569] uppercase font-bold">Branch</span>
                                </div>
                                
                                {/* evaluation badges */}
                                <span 
                                    className={`px-1.5 py-0.5 rounded text-[8.5px] font-black border flex items-center justify-center min-w-[20px] ${
                                        isTaken 
                                            ? 'bg-emerald-950 border-emerald-500 text-emerald-400' 
                                            : isSkipped 
                                                ? 'bg-rose-950 border-rose-500/30 text-rose-500' 
                                                : isChecking 
                                                    ? 'bg-slate-900 border-primary-500 text-primary-400 animate-ping'
                                                    : 'bg-slate-950 border-slate-900 text-slate-700'
                                    }`}
                                >
                                    {isTaken ? 'TRUE' : isSkipped ? 'FALSE' : isChecking ? '?' : '·'}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            
            {/* Output console alert */}
            {step >= 4 && (
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    className="px-4 py-2 border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-xs font-bold rounded-2xl flex items-center gap-2 shadow-lg"
                >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Output Console: "Negative"
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-xs text-center text-slate-300 bg-slate-900/60 border border-primary-500/10 px-4 py-2.5 rounded-2xl max-w-sm backdrop-blur-sm"
                >
                    {cur.label}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Visualizer Layout Wrapper
// ─────────────────────────────────────────────────────────────────────────────
export const InteractiveVisualizer = ({ topic = 'control-statements' }) => {
    const SPEEDS = [0.5, 1, 1.5, 2];
    const isLoops = topic === 'loops';
    
    // States
    const [activeStep, setActiveStep] = useState(0);
    const [visPlaying, setVisPlaying] = useState(false);
    const [speedNum, setSpeed] = useState(1);
    
    // Narration States
    const [narrationEnabled, setNarrationEnabled] = useState(false);
    const [narrationVoice, setNarrationVoice] = useState('hinglish-classroom');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setNarrationEnabled(localStorage.getItem('narration_enabled') === 'true');
            setNarrationVoice(localStorage.getItem('narration_voice') || 'hinglish-classroom');
        }
    }, []);

    // Narration Steps dynamically resolved based on the topic
    const loopsNarrationSteps = [
        'Loops let us repeat code without writing it multiple times.',
        'A for loop has three parts: initialization, condition, and update.',
        'We start with i equals 2. This is our initialization.',
        'The condition checks: is i less than or equal to n? If yes, we enter the loop body.',
        'We print the value of i, which is 2. The update step adds 2 to i. Now i is 4.',
        'We check again: is 4 <= 10? Yes! Print 4. Update: i becomes 6.',
        'This continues: print 6, 8, and 10. When i becomes 12, the condition checks as False.',
        'Condition checked as False. The loop terminates.',
        'The loop ran 5 times, printing all even numbers from 2 to 10.'
    ];

    const conditionalsNarrationSteps = [
        'Conditionals: program decides action path via criteria check.',
        'We read an integer from the user. Let\'s evaluate n = -5.',
        'Evaluating first branch: is -5 > 0 ? (No → Skip branch)',
        'Evaluating second branch: is -5 < 0 ? (Yes → Enter branch)',
        'Execute branch block: print "Negative" and bypass all remaining options.',
        'Execution complete: program selected exactly one path through the branches.'
    ];

    const narrationSteps = isLoops ? loopsNarrationSteps : conditionalsNarrationSteps;
    const totalSteps = narrationSteps.length;

    // Reset step when topic changes
    useEffect(() => {
        setActiveStep(0);
        setVisPlaying(false);
    }, [topic]);

    const currentText = narrationSteps[activeStep] || '';
    const { isSpeaking, isSupported } = useNarration(
        currentText, 
        visPlaying, 
        speedNum, 
        narrationEnabled, 
        narrationVoice,
        () => {
            // Auto advance on narration end if playing
            if (visPlaying) {
                if (activeStep < totalSteps - 1) {
                    setActiveStep(s => s + 1);
                } else {
                    setVisPlaying(false);
                }
            }
        }
    );

    return (
        <section id="section-simulation" className="space-y-8 relative my-16">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-400">
                    <Activity className="w-4 h-4 text-primary-400" />
                    Interactive Simulation
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-100">
                    {isLoops ? "Loops Interactive Visualizer" : "Interactive Visualizer"}
                </h3>
                <p className="text-sm text-slate-400 max-w-2xl">
                    {isLoops 
                        ? "Watch how loops repeat execution by tracking counter updates, checking iteration conditions, and examining console standard output in real-time."
                        : "Step through the algorithm visualizer in real-time. Turn on voice narration to hear explanations synced perfectly with the animation steps."
                    }
                </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden min-h-[400px]">
                <div className="transition-all duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* Left Panel: Simulation Canvas */}
                        <div className="lg:col-span-2 flex flex-col rounded-3xl overflow-hidden relative group border border-slate-800 bg-[#080C10]/90">
                            {/* Accent lights */}
                            <div className="absolute -top-[150px] -left-[150px] w-[300px] h-[300px] rounded-full bg-primary-500/20 blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
                            <div className="absolute -bottom-[150px] -right-[150px] w-[300px] h-[300px] rounded-full bg-cyan-500/20 blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
                            
                            <div className="absolute inset-0 pointer-events-none opacity-[0.15] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
                            
                            <div className="flex items-center justify-between px-6 py-4 border-b border-primary-500/15 bg-gradient-to-r from-primary-950/80 via-slate-900/80 to-[#1b1935]/80">
                                <h4 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-cyan-300 to-primary-200">
                                    {isLoops ? "Loops Simulation" : "Conditionals Simulation"}
                                </h4>
                                <span className="text-[10px] font-mono text-cyan-300 bg-primary-950 px-2 py-0.5 rounded border border-primary-500/20 shadow-md">
                                    Step {activeStep + 1} of {totalSteps}
                                </span>
                            </div>

                            <div className="min-h-[350px] flex-1 flex items-center justify-center relative p-8">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/10 via-[#1b1935]/20 to-[#4c1d95]/10 animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />
                                <div className="absolute w-[280px] h-[280px] rounded-full bg-cyan-500/20 blur-[130px] pointer-events-none" style={{ animationDuration: '5s' }} />
                                <div className="absolute w-[240px] h-[240px] rounded-full bg-primary-500/15 blur-[100px] pointer-events-none" style={{ animationDuration: '7s' }} />
                                
                                <div className="relative z-10 w-full flex justify-center">
                                    {isLoops ? (
                                        <TopicVisualizerContext.Provider value={{ step: activeStep, setStep: setActiveStep }}>
                                            <LoopVis
                                                playing={visPlaying}
                                                speed={speedNum}
                                                onStepChange={(s) => setActiveStep(s)}
                                            />
                                        </TopicVisualizerContext.Provider>
                                    ) : (
                                        <VisualizerContext.Provider value={{ step: activeStep, setStep: setActiveStep }}>
                                            <ConditionalsVis
                                                playing={visPlaying}
                                                speed={speedNum}
                                                onStepChange={(s) => setActiveStep(s)}
                                            />
                                        </VisualizerContext.Provider>
                                    )}
                                </div>
                            </div>

                            {/* Control Bar */}
                            <div className="px-6 py-4 border-t border-slate-800 bg-primary-950/40 flex flex-wrap items-center justify-between gap-4 mt-auto">
                                <div className="flex items-center gap-1.5 bg-primary-950/60 px-3 py-1 rounded-full border border-slate-800">
                                    <button onClick={() => setActiveStep(0)} className="text-slate-400 hover:text-slate-100 p-1 rounded transition-colors active:scale-95">
                                        <SkipBack className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => setActiveStep(s => Math.max(0, s - 1))} className="text-slate-400 hover:text-slate-100 p-1 rounded transition-colors active:scale-95">
                                        <Rewind className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setVisPlaying(p => {
                                                const next = !p;
                                                if (next && activeStep >= totalSteps - 1) {
                                                    setActiveStep(0);
                                                }
                                                return next;
                                            });
                                        }}
                                        className="text-white bg-primary-600 hover:bg-primary-500 p-1.5 rounded-full transition-all active:scale-90 mx-1 flex items-center justify-center shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                                    >
                                        {visPlaying
                                            ? <Pause className="w-3.5 h-3.5 fill-white text-white" />
                                            : <Play className="w-3.5 h-3.5 fill-white text-white" />
                                        }
                                    </button>
                                    <button onClick={() => setActiveStep(s => Math.min(totalSteps - 1, s + 1))} className="text-slate-400 hover:text-slate-100 p-1 rounded transition-colors active:scale-95">
                                        <FastForward className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => setActiveStep(totalSteps - 1)} className="text-slate-400 hover:text-slate-100 p-1 rounded transition-colors active:scale-95">
                                        <SkipForward className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                <div className="flex items-center gap-3">
                                    <NarrationControls
                                        isSpeaking={isSpeaking}
                                        isSupported={isSupported}
                                        enabled={narrationEnabled}
                                        onToggle={() => setNarrationEnabled(prev => {
                                            localStorage.setItem('narration_enabled', String(!prev));
                                            return !prev;
                                        })}
                                        voiceProfile={narrationVoice}
                                        onVoiceChange={(voice) => {
                                            localStorage.setItem('narration_voice', voice);
                                            setNarrationVoice(voice);
                                        }}
                                    />
                                </div>

                                <div className="flex bg-primary-950/60 rounded-full p-0.5 border border-slate-800 relative">
                                    {SPEEDS.map(s => (
                                        <button key={s} onClick={() => setSpeed(s)} className={cn("px-2.5 py-1 text-[10px] font-bold rounded-full relative z-10 transition-colors", speedNum === s ? "text-slate-100" : "text-slate-400 hover:text-slate-100")}>
                                            {speedNum === s && <motion.div layoutId="speed-pill" className="absolute inset-0 bg-primary-700/80 rounded-full -z-10" />}
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Panel: Narration & Lesson Steps */}
                        <div className="border border-slate-800 rounded-3xl bg-[#080C10]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[500px] lg:h-auto max-h-[600px]">
                            <div className="px-6 py-4 border-b border-slate-800 bg-primary-950/20 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-primary-400" />
                                    <h4 className="text-sm font-bold text-primary-300">Explanation Steps</h4>
                                </div>
                                <span className="text-[9px] uppercase font-mono bg-primary-900/60 border border-primary-500/10 px-2 py-0.5 rounded text-primary-400">
                                    {isLoops ? "Loops" : "Conditionals"}
                                </span>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                                {narrationSteps.map((stepText, idx) => {
                                    const isActive = activeStep === idx;
                                    const isHinglish = narrationVoice === 'hinglish-classroom';
                                    const stepDisplay = isHinglish
                                        ? getIndianNarration(isLoops ? 'loops' : 'control-statements', idx, stepText)
                                        : stepText;

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setActiveStep(idx);
                                                if (!visPlaying) setVisPlaying(true);
                                            }}
                                            className={cn(
                                                "w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex gap-3 group relative overflow-hidden",
                                                isActive
                                                    ? "bg-primary-500/10 border-primary-500/30 shadow-[0_0_20px_rgba(139,92,246,0.08)]"
                                                    : "bg-transparent border-slate-800/50 hover:border-primary-500/20 hover:bg-primary-950/10"
                                            )}
                                        >
                                            {isActive && (
                                                <motion.div 
                                                    layoutId="active-indicator"
                                                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-cyan-500 rounded-r-full"
                                                />
                                            )}
                                            
                                            <div className={cn(
                                                "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 border transition-all",
                                                isActive
                                                    ? "bg-primary-500/20 border-primary-500 text-primary-300"
                                                    : "bg-primary-950/60 border-slate-800 text-slate-400 group-hover:border-primary-500/40 group-hover:text-primary-300"
                                            )}>
                                                {idx + 1}
                                            </div>

                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className={cn(
                                                        "text-[10px] uppercase font-mono tracking-wider font-bold transition-colors",
                                                        isActive ? "text-primary-400" : "text-slate-500 group-hover:text-primary-400/60"
                                                    )}>
                                                        Step {idx + 1}
                                                    </span>
                                                    
                                                    {isActive && isSpeaking && narrationEnabled && (
                                                        <div className="flex items-center gap-0.5 h-3 shrink-0" title="Narrator is speaking">
                                                            <span className="w-0.5 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                                            <span className="w-0.5 h-3 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                                            <span className="w-0.5 h-1.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                                                        </div>
                                                    )}
                                                </div>
                                                <p className={cn(
                                                    "text-xs leading-relaxed transition-colors",
                                                    isActive ? "text-slate-100 font-medium" : "text-slate-400 group-hover:text-slate-100"
                                                )}>
                                                    {stepDisplay}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    );
};
