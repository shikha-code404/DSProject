import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Activity, Play, Pause, FastForward, SkipForward, Rewind, SkipBack, BookOpen, Layers, Cpu 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNarration } from '../../hooks/useNarration';
import { NarrationControls } from './NarrationControls';
import { getIndianNarration } from '../../lib/hinglishTranslator';

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
// STLComplexityVis (STL containers & Big-O curves) — Push/pop & capacity
// ─────────────────────────────────────────────────────────────────────────────
const STLComplexityVis = ({ playing, speed, onStepChange }) => {
    const [activeTab, setActiveTab] = useState('stl');
    const [subTab, setSubTab] = useState('vector');
    
    const frames = [
        { label: 'The STL provides ready-made data containers so you do not need to build them from scratch.', activeSub: 'vector', tab: 'stl' },
        { label: 'A vector is a dynamic array. We push_back 10, 20, and 30. It grows and doubles capacity when full.', activeSub: 'vector', tab: 'stl' },
        { label: 'Vector access by index is O(1), and push_back is amortized O(1). Very efficient!', activeSub: 'vector', tab: 'stl' },
        { label: 'A map stores key-value pairs sorted by key. We insert a maps to 1, and b maps to 2.', activeSub: 'map', tab: 'stl' },
        { label: 'Map operations like insert and lookup take O(log N) because it uses a balanced red-black tree internally.', activeSub: 'map', tab: 'stl' },
        { label: 'For faster lookups, use unordered_map which uses hashing for O(1) average time.', activeSub: 'map', tab: 'complexity' },
        { label: 'STL containers all share common methods: size(), empty(), begin(), end(). Learn one, and patterns apply to all.', activeSub: 'vector', tab: 'complexity' }
    ];
    
    const [step] = useSteps(frames.length, playing, Math.round(2400 / speed));
    const cur = frames[step] || frames[0];

    useEffect(() => {
        onStepChange?.(step);
    }, [step, onStepChange]);

    useEffect(() => {
        if (cur) {
            setActiveTab(cur.tab);
            if (cur.tab === 'stl') {
                setSubTab(cur.activeSub);
            }
        }
    }, [step, cur]);

    // Vector capacity simulation
    const vectorCapacity = subTab === 'vector' && step >= 2 ? 4 : 2;
    const vectorElements = [10, 20, 30];

    return (
        <div className="w-full max-w-md flex flex-col items-center gap-5 select-none font-mono">
            {/* Header selector tab */}
            <div className="flex bg-slate-900/60 p-1 border border-primary-500/10 rounded-full text-[10px] w-fit shadow-lg backdrop-blur-sm">
                <button
                    onClick={() => setActiveTab('stl')}
                    className={`px-4 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-all ${
                        activeTab === 'stl' ? 'bg-primary-500 text-[#020617] shadow-md' : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                    <Layers className="w-3.5 h-3.5" />
                    STL Containers
                </button>
                <button
                    onClick={() => setActiveTab('complexity')}
                    className={`px-4 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-all ${
                        activeTab === 'complexity' ? 'bg-primary-500 text-[#020617] shadow-md' : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                    <Cpu className="w-3.5 h-3.5" />
                    Big-O Curves
                </button>
            </div>

            {/* Main Interactive Display Panel */}
            <div className="w-full h-48 bg-[#020617] border border-primary-500/10 rounded-2xl p-4 flex flex-col justify-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.04),transparent_70%)]" />
                
                {activeTab === 'stl' ? (
                    <div className="flex flex-col gap-4 items-center">
                        <div className="flex gap-2.5 text-[9px] border-b border-slate-900 pb-2 w-full justify-center">
                            {['vector', 'stack', 'queue', 'map'].map(t => (
                                <span 
                                    key={t} 
                                    className={`px-2 py-0.5 rounded border transition-colors ${
                                        subTab === t 
                                            ? 'text-primary-300 font-extrabold bg-primary-950 border-primary-500/30' 
                                            : 'text-[#475569] border-transparent'
                                    }`}
                                >
                                    {t.toUpperCase()}
                                </span>
                            ))}
                        </div>
                        
                        {/* Tab displays */}
                        {subTab === 'vector' && (
                            <div className="flex flex-col gap-2 items-center">
                                <div className="flex gap-2">
                                    {Array.from({ length: vectorCapacity }).map((_, idx) => {
                                        const filled = idx < vectorElements.length;
                                        return (
                                            <motion.div
                                                key={idx}
                                                animate={{ 
                                                    borderColor: filled ? '#8B5CF6' : '#1E293B',
                                                    scale: filled ? [0.9, 1.05, 1] : 1
                                                }}
                                                className="w-10 h-10 border-2 rounded-xl flex items-center justify-center text-xs font-black bg-[#020617]/50 shadow"
                                            >
                                                {filled ? vectorElements[idx] : ''}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                                <span className="text-[8px] text-[#475569] font-bold uppercase mt-1">
                                    Size: 3 / Capacity: {vectorCapacity} (Double capacity triggers dynamic allocations)
                                </span>
                            </div>
                        )}
                        {subTab === 'stack' && (
                            <div className="flex flex-col gap-1 w-24 border-b-4 border-x-4 border-pink-500/80 rounded-b px-2 py-1.5 items-center h-28 justify-end bg-pink-500/5">
                                {[30, 20, 10].map((v, i) => (
                                    <motion.div
                                        key={v}
                                        initial={{ y: -60, opacity: 0 }} 
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.15, type: 'spring' }}
                                        className="w-full text-center py-1 border border-pink-500/30 bg-pink-950/20 rounded-lg text-[9px] font-black text-pink-400"
                                    >
                                        {v}
                                    </motion.div>
                                ))}
                            </div>
                        )}
                        {subTab === 'queue' && (
                            <div className="flex gap-2 items-center h-20">
                                <span className="text-[8px] text-[#475569] font-black">FRONT</span>
                                <div className="flex border-y-2 border-emerald-500/80 p-2 rounded-xl gap-2 bg-emerald-500/5">
                                    {[10, 20, 30].map((v, i) => (
                                        <motion.div 
                                            key={v} 
                                            initial={{ x: 30, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="w-8 h-8 rounded-lg border border-emerald-500/30 flex items-center justify-center text-[10px] text-emerald-400 font-extrabold bg-[#020617] shadow-sm"
                                        >
                                            {v}
                                        </motion.div>
                                    ))}
                                </div>
                                <span className="text-[8px] text-[#475569] font-black">REAR</span>
                            </div>
                        )}
                        {subTab === 'map' && (
                            <div className="flex flex-col items-center gap-1.5">
                                <div className="flex gap-3">
                                    {[{ k: 'a', v: '1' }, { k: 'b', v: '2' }].map((node) => (
                                        <motion.div 
                                            key={node.k} 
                                            initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                                            className="border-2 border-primary-500/20 bg-primary-950/10 px-3 py-2 rounded-xl flex flex-col items-center text-[10px]"
                                        >
                                            <span className="text-primary-300 font-black">Key: "{node.k}"</span>
                                            <span className="text-slate-400">Val: {node.v}</span>
                                        </motion.div>
                                    ))}
                                </div>
                                <span className="text-[8px] text-[#475569] font-bold uppercase mt-1">
                                    Tree Balanced Indexes | Search complexity: O(log N)
                                </span>
                            </div>
                        )}
                    </div>
                ) : (
                    // Complexity Charts Grid
                    <div className="w-full h-full relative flex items-center justify-center bg-slate-950/20">
                        <svg className="w-full h-full text-slate-800">
                            <line x1="10%" y1="10%" x2="10%" y2="85%" stroke="#1e293b" strokeWidth={1.5} />
                            <line x1="10%" y1="85%" x2="95%" y2="85%" stroke="#1e293b" strokeWidth={1.5} />
                            
                            {/* O(1) */}
                            <motion.line 
                                x1="10%" y1="75%" x2="90%" y2="75%" stroke="#10B981" strokeWidth={2} strokeDasharray="3,3"
                                initial={{ strokeDashoffset: 50 }} animate={{ strokeDashoffset: 0 }}
                                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                            />
                            <text x="91%" y="76%" fill="#10B981" className="text-[8px] font-black">O(1)</text>

                            {/* O(log N) */}
                            <motion.path 
                                d="M 40 120 Q 120 100 360 90" fill="none" stroke="#F59E0B" strokeWidth={2}
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5 }}
                            />
                            <text x="91%" y="64%" fill="#F59E0B" className="text-[8px] font-black">O(log N)</text>

                            {/* O(N) */}
                            <motion.line 
                                x1="10%" y1="85%" x2="90%" y2="35%" stroke="#3B82F6" strokeWidth={2}
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5 }}
                            />
                            <text x="91%" y="37%" fill="#3B82F6" className="text-[8px] font-black">O(N)</text>

                            {/* O(N^2) */}
                            <motion.path 
                                d="M 40 135 Q 150 120 220 15" fill="none" stroke="#EF4444" strokeWidth={2.5}
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5 }}
                            />
                            <text x="52%" y="15%" fill="#EF4444" className="text-[8px] font-black">O(N²)</text>
                        </svg>
                    </div>
                )}
            </div>

            {/* Big-O Cheat Sheet (understanding booster!) */}
            {activeTab === 'complexity' && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="w-full border border-slate-900 bg-slate-950/60 p-3 rounded-2xl flex flex-col gap-1.5 text-[9px] text-slate-500 leading-normal"
                >
                    <span className="font-extrabold text-slate-400 uppercase">Complexity Cheat Sheet:</span>
                    <div className="grid grid-cols-2 gap-1.5">
                        <span className="text-emerald-400 font-bold">O(1): Constant (Instant speed)</span>
                        <span className="text-amber-500 font-bold">O(log N): Logarithmic (Fast search)</span>
                        <span className="text-blue-400 font-bold">O(N): Linear scan (Moderate)</span>
                        <span className="text-rose-500 font-bold">O(N²): Quadratic (Slow loops)</span>
                    </div>
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                <motion.p key={step} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-xs text-center text-slate-300 bg-slate-900/60 border border-primary-500/10 px-4 py-2.5 rounded-2xl max-w-sm backdrop-blur-sm">
                    {cur.label}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Visualizer Layout Wrapper
// ─────────────────────────────────────────────────────────────────────────────
export const STLInteractiveVisualizer = () => {
    const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
    
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

    // Narration Steps hardcoded for STL
    const narrationSteps = [
        'The STL provides ready-made data containers so you do not need to build them from scratch.',
        'A vector is a dynamic array. We push_back 10, 20, and 30. It grows and doubles capacity when full.',
        'Vector access by index is O(1), and push_back is amortized O(1). Very efficient!',
        'A map stores key-value pairs sorted by key. We insert a maps to 1, and b maps to 2.',
        'Map operations like insert and lookup take O(log N) because it uses a balanced red-black tree internally.',
        'For faster lookups, use unordered_map which uses hashing for O(1) average time.',
        'STL containers all share common methods: size(), empty(), begin(), end(). Learn one, and patterns apply to all.'
    ];
    const totalSteps = narrationSteps.length;

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
                <h3 className="text-2xl font-bold tracking-tight text-slate-100">Interactive Visualizer</h3>
                <p className="text-sm text-slate-400 max-w-2xl">
                    Step through the algorithm visualizer in real-time. Turn on voice narration to hear explanations synced perfectly with the animation steps.
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
                                    STL & Complexity Simulation
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
                                    <VisualizerContext.Provider value={{ step: activeStep, setStep: setActiveStep }}>
                                        <STLComplexityVis
                                            playing={visPlaying}
                                            speed={speedNum}
                                            onStepChange={(s) => setActiveStep(s)}
                                        />
                                    </VisualizerContext.Provider>
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
                                    Interactive
                                </span>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                                {narrationSteps.map((stepText, idx) => {
                                    const isActive = activeStep === idx;
                                    const isHinglish = narrationVoice === 'hinglish-classroom';
                                    const stepDisplay = isHinglish
                                        ? getIndianNarration('stl', idx, stepText)
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
