import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Terminal, Cpu, CheckCircle2, XCircle, Sparkles, Layers,
    Code, Keyboard, Monitor, ChevronRight, HelpCircle, Info
} from 'lucide-react';
import clsx from 'clsx';
export const VisualizerContext = React.createContext(null);

// ─── Shared hook: step through an array of frames ────────────────────────────
function useSteps(count, playing, msPerStep) {
    const ctx = React.useContext(VisualizerContext);
    const [localStep, setLocalStep] = React.useState(0);

    const step = ctx ? ctx.step : localStep;
    const setStep = ctx ? ctx.setStep : setLocalStep;

    React.useEffect(() => {
        // When VisualizerContext is provided, the parent owns step advancement
        // (narration-driven or its own timer). We only self-advance for
        // standalone usage (no context).
        if (!playing || ctx) return;
        const id = setInterval(() => {
            setStep(s => (s + 1) % count);
        }, msPerStep);
        return () => clearInterval(id);
    }, [playing, msPerStep, count, setStep, !!ctx]);

    // reset local step only if not controlled
    React.useEffect(() => {
        if (!ctx) {
            setLocalStep(0);
        }
    }, [count, !!ctx]);

    return [step, setStep] ;
}

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
        <div className={clsx('w-full', 'max-w-md', 'flex', 'flex-col', 'items-center', 'gap-6', 'select-none', 'font-mono')}>
            <div className={clsx('flex', 'gap-4', 'items-center', 'justify-center', 'w-full', 'relative', 'min-h-[170px]', 'py-4', 'bg-slate-950/20', 'border', 'border-slate-900', 'rounded-2xl', 'px-3')}>

                {/* Flowchart Decision Diamond Symbol */}
                <motion.div
                    animate={{
                        borderColor: step >= 1 ? '#3B82F6' : 'rgba(255,255,255,0.06)',
                        backgroundColor: step >= 1 ? 'rgba(59,130,246,0.1)' : '#020617',
                        boxShadow: step === 1 ? '0 0 25px rgba(59,130,246,0.3)' : 'none'
                    }}
                    className={clsx('w-20', 'h-20', 'border-2', 'rounded', 'flex', 'flex-col', 'items-center', 'justify-center', 'text-xs', 'relative', 'rotate-45')}
                >
                    <div className={clsx('-rotate-45', 'flex', 'flex-col', 'items-center', 'text-[10px]')}>
                        <span className={clsx('text-[7.5px]', 'text-slate-400', 'font-extrabold', 'uppercase', 'mb-0.5')}>CHECK:</span>
                        <span className={clsx('font-extrabold', 'text-slate-100', 'text-xs')}>n = -5</span>
                    </div>
                </motion.div>

                {/* connecting flowline */}
                <div className={clsx('w-10', 'h-0.5', 'relative')}>
                    <div className={clsx('absolute', 'inset-0', 'bg-[#1E293B]')} />
                    {step >= 1 && (
                        <motion.div
                            initial={{ x: '-100%' }} animate={{ x: '100%' }}
                            transition={{ repeat: Infinity, duration: 1 / speed, ease: 'linear' }}
                            className={clsx('absolute', 'inset-y-0', 'w-3', 'bg-brand-500')}
                        />
                    )}
                </div>

                {/* Branches blocks */}
                <div className={clsx('flex', 'flex-col', 'gap-3', 'text-[10px]')}>
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
                                className={clsx('px-3.5', 'py-2', 'border-2', 'rounded-xl', 'flex', 'gap-5', 'items-center', 'justify-between', 'min-w-[170px]', 'relative', 'overflow-hidden', 'bg-[#020617]')}
                            >
                                {isChecking && (
                                    <motion.div
                                        animate={{ x: [-150, 150] }}
                                        transition={{ repeat: Infinity, duration: 1.5 / speed }}
                                        className={clsx('absolute', 'inset-y-0', 'w-16', 'bg-gradient-to-r', 'from-transparent', 'via-brand-500/20', 'to-transparent', 'pointer-events-none')}
                                    />
                                )}

                                <div className={clsx('flex', 'flex-col', 'gap-0.5')}>
                                    <span className={clsx('font-extrabold', 'text-slate-200')}>{b.cond}</span>
                                    <span className={clsx('text-[7.5px]', 'text-[#475569]', 'uppercase', 'font-bold')}>Branch</span>
                                </div>

                                {/* evaluation badges */}
                                <span
                                    className={`px-1.5 py-0.5 rounded text-[8.5px] font-black border flex items-center justify-center min-w-[20px] ${isTaken
                                            ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                                            : isSkipped
                                                ? 'bg-rose-950 border-rose-500/30 text-rose-500'
                                                : isChecking
                                                    ? 'bg-slate-900 border-brand-500 text-brand-400 animate-ping'
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
                    className={clsx('px-4', 'py-2', 'border', 'border-emerald-500/30', 'bg-emerald-950/20', 'text-emerald-400', 'text-xs', 'font-bold', 'rounded-2xl', 'flex', 'items-center', 'gap-2', 'shadow-lg')}
                >
                    <CheckCircle2 className={clsx('w-4', 'h-4', 'text-emerald-400')} /> Output Console: "Negative"
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className={clsx('text-xs', 'text-center', 'text-slate-300', 'bg-slate-900/60', 'border', 'border-brand-500/10', 'px-4', 'py-2.5', 'rounded-2xl', 'max-w-sm', 'backdrop-blur-sm')}
                >
                    {cur.label}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. LoopVis (Loop iterations) — Progress ring & timeline track
// ─────────────────────────────────────────────────────────────────────────────
export const LoopVis = ({ playing, speed, onStepChange }) => {
    const frames = [
        { label: 'Loops let us repeat code without writing it multiple times.', i: '?', condition: 'Ready', out: [] },
        { label: 'A for loop has three parts: initialization, condition, and update.', i: '?', condition: 'Ready', out: [] },
        { label: 'We start with i equals 2. This is our initialization.', i: 2, condition: 'Initialized', out: [] },
        { label: 'The condition checks: is i less than or equal to n? If yes, we enter the loop body.', i: 2, condition: '2 <= 10 ? True', out: [] },
        { label: 'We print the value of i, which is 2. The update step adds 2 to i. Now i is 4.', i: 4, condition: '4 <= 10 ? True', out: [2] },
        { label: 'We check again: is 4 <= 10? Yes! Print 4. Update: i becomes 6.', i: 6, condition: '6 <= 10 ? True', out: [2, 4] },
        { label: 'This continues: print 6, 8, and 10. When i becomes 12, the condition checks as False.', i: 12, condition: '12 <= 10 ? False', out: [2, 4, 6, 8, 10] },
        { label: 'Condition checked as False. The loop terminates.', i: 12, condition: 'End of Loop', out: [2, 4, 6, 8, 10] },
        { label: 'The loop ran 5 times, printing all even numbers from 2 to 10.', i: 12, condition: 'Finished', out: [2, 4, 6, 8, 10] },
    ];
    const [step] = useSteps(frames.length, playing, Math.round(2000 / speed));
    const cur = frames[step] || frames[0];

    useEffect(() => {
        onStepChange?.(step);
    }, [step, onStepChange]);

    const iterationCount = cur.out.length;
    const progressPercent = Math.min(100, (iterationCount / 5) * 100);
    const radius = 32;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

    return (
        <div className={clsx('w-full', 'max-w-md', 'flex', 'flex-col', 'items-center', 'gap-5', 'select-none', 'font-mono')}>

            {/* Loop progress trace timeline header */}
            <div className={clsx('flex', 'justify-between', 'w-full', 'max-w-sm', 'px-2', 'text-[8px]', 'text-slate-500', 'border-b', 'border-slate-900', 'pb-2')}>
                <span className={clsx('font-extrabold', 'uppercase')}>LOOP EXECUTION STAGES:</span>
                <div className={clsx('flex', 'gap-1.5', 'items-center')}>
                    {Array.from({ length: 5 }).map((_, idx) => {
                        const active = idx < iterationCount;
                        const isCurrent = idx === iterationCount && step >= 3 && step < 6;
                        return (
                            <motion.span
                                key={idx}
                                animate={{
                                    scale: isCurrent ? 1.3 : 1,
                                    backgroundColor: active ? '#10B981' : isCurrent ? '#3B82F6' : '#1E293B',
                                    boxShadow: active ? '0 0 8px #10b981' : 'none'
                                }}
                                className={clsx('w-2.5', 'h-2.5', 'rounded-full')}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Loop Variable & Conditions */}
            <div className={clsx('flex', 'gap-4', 'w-full', 'max-w-sm')}>

                {/* Loop Variable Card */}
                <div className={clsx('border-2', 'border-brand-500/20', 'bg-[#020617]', 'p-3', 'rounded-2xl', 'flex', 'flex-col', 'items-center', 'flex-1', 'relative', 'overflow-hidden', 'shadow-lg')}>
                    <span className={clsx('text-[8px]', 'text-[#475569]', 'uppercase', 'font-bold')}>Counter (i)</span>
                    <motion.span
                        key={cur.i}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={clsx('text-4xl', 'font-black', 'text-slate-100', 'my-1', 'font-mono')}
                    >
                        {cur.i}
                    </motion.span>
                    <span className={clsx('text-[7.5px]', 'font-black', 'text-brand-400', 'bg-brand-950', 'px-1.5', 'py-0.5', 'rounded', 'border', 'border-brand-500/10')}>VARIABLE</span>
                </div>

                {/* Iteration circle radial progress */}
                <div className={clsx('border-2', 'border-slate-800', 'bg-[#020617]', 'p-3', 'rounded-2xl', 'flex', 'flex-col', 'items-center', 'flex-1', 'justify-center', 'relative', 'shadow-lg')}>
                    <svg className={clsx('w-16', 'h-16', 'transform', '-rotate-90')}>
                        <circle cx="32" cy="32" r={radius} stroke="#1e293b" strokeWidth="4" fill="transparent" />
                        <motion.circle
                            cx="32" cy="32" r={radius} stroke="#10b981" strokeWidth="4" fill="transparent"
                            strokeDasharray={circumference}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 0.4 }}
                        />
                    </svg>
                    <span className={clsx('absolute', 'text-[10px]', 'font-extrabold', 'text-slate-200')}>
                        {iterationCount}/5
                    </span>
                    <span className={clsx('text-[7px]', 'text-[#475569]', 'uppercase', 'font-bold', 'mt-1')}>Iter Scale</span>
                </div>

                {/* Condition Card */}
                <motion.div
                    animate={{
                        borderColor: cur.condition.includes('True') ? '#10B981' : cur.condition.includes('False') ? '#EF4444' : '#F59E0B20'
                    }}
                    className={clsx('border-2', 'bg-[#020617]', 'p-3', 'rounded-2xl', 'flex', 'flex-col', 'items-center', 'flex-1', 'shadow-lg')}
                >
                    <span className={clsx('text-[8px]', 'text-[#475569]', 'uppercase', 'font-bold')}>i &lt;= 10</span>
                    <motion.span
                        key={cur.condition}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-[9px] font-black mt-3.5 px-2 py-0.5 rounded border ${cur.condition.includes('True')
                                ? 'bg-emerald-950 border-emerald-500/50 text-emerald-400'
                                : cur.condition.includes('False')
                                    ? 'bg-rose-950 border-rose-500/50 text-rose-500'
                                    : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                    >
                        {cur.condition}
                    </motion.span>
                </motion.div>
            </div>

            {/* Loop iteration states history table */}
            {step >= 2 && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className={clsx('w-full', 'max-w-sm', 'border', 'border-slate-900', 'bg-slate-950/60', 'p-3', 'rounded-2xl', 'flex', 'flex-col', 'gap-1', 'text-[9px]', 'text-slate-500')}
                >
                    <span className={clsx('font-extrabold', 'text-slate-400', 'uppercase', 'block', 'mb-1')}>Iteration Stack Trace:</span>
                    <div className={clsx('flex', 'flex-col', 'gap-1')}>
                        <div className={clsx('flex', 'justify-between', 'border-b', 'border-slate-900/60', 'pb-0.5', 'font-bold')}>
                            <span>Step Counter</span>
                            <span>Condition</span>
                            <span>Operation</span>
                        </div>
                        {Array.from({ length: iterationCount + (step >= 3 && step < 6 ? 1 : 0) }).map((_, idx) => {
                            const isNew = idx === iterationCount;
                            const val = (idx + 1) * 2;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={isNew ? { opacity: 0, x: -5 } : undefined}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex justify-between leading-normal ${isNew ? 'text-brand-400 font-bold' : ''}`}
                                >
                                    <span>i = {val}</span>
                                    <span>{val} &lt;= 10 ? True</span>
                                    <span>Print({val})</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            )}

            {/* Console output display */}
            <div className={clsx('w-full', 'max-w-sm', 'bg-[#020617]', 'border', 'border-slate-900', 'rounded-2xl', 'p-4', 'flex', 'flex-col', 'gap-1.5', 'min-h-[64px]', 'shadow-inner', 'relative')}>
                <div className={clsx('flex', 'justify-between', 'items-center', 'border-b', 'border-slate-900', 'pb-1.5')}>
                    <span className={clsx('text-[8px]', 'text-[#475569]', 'uppercase', 'font-bold', 'flex', 'items-center', 'gap-1')}>
                        <Terminal className={clsx('w-3', 'h-3', 'text-slate-500')} /> Console stdout
                    </span>
                    {iterationCount > 0 && (
                        <span className={clsx('text-[7.5px]', 'text-emerald-500', 'font-black', 'bg-emerald-950', 'border', 'border-emerald-500/20', 'px-2', 'py-0.5', 'rounded')}>
                            {iterationCount} EVENS PRINTED
                        </span>
                    )}
                </div>
                <div className={clsx('flex', 'gap-2.5', 'text-sm', 'font-extrabold', 'text-emerald-400', 'items-center', 'pl-1')}>
                    {cur.out.map((val, idx) => (
                        <motion.span
                            key={idx}
                            initial={{ scale: 0, y: 10 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className={clsx('bg-emerald-950/20', 'border', 'border-emerald-500/20', 'px-2.5', 'py-0.5', 'rounded', 'text-xs')}
                        >
                            {val}
                        </motion.span>
                    ))}
                    {playing && step < frames.length - 1 && (
                        <span className={clsx('w-1.5', 'h-3.5', 'bg-emerald-400', 'animate-pulse', 'inline-block')} />
                    )}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.p key={step} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className={clsx('text-xs', 'text-center', 'text-slate-300', 'bg-slate-900/60', 'border', 'border-brand-500/10', 'px-4', 'py-2.5', 'rounded-2xl', 'max-w-sm', 'backdrop-blur-sm')}>
                    {cur.label}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. ArrayVis (Max element linear scan) — Pointer carets & Gold Crown
// ─────────────────────────────────────────────────────────────────────────────
const ArrayVis = ({ playing, speed, onStepChange }) => {
    const arr = [3, 1, 4, 1, 5];
    const frames = [
        { label: 'An array stores multiple values of the same type in consecutive memory locations.', curIdx: -1, max: 3 },
        { label: 'We declare an array of integers. Each element lives next to the other in memory.', curIdx: -1, max: 3 },
        { label: 'We read 5 values: 3, 1, 4, 1, 5. They go into indices 0 through 4.', curIdx: -1, max: 3 },
        { label: 'To find the maximum, we start by assuming the first element is the largest (max = 3).', curIdx: 0, max: 3 },
        { label: 'Compare elements: arr[1] (1) < 3 (no change). arr[2] (4) > 3 → Update max to 4!', curIdx: 2, max: 4 },
        { label: 'Compare elements: arr[3] (1) < 4 (no change). arr[4] (5) > 4 → Update max to 5!', curIdx: 4, max: 5 },
        { label: 'We have scanned the entire array. The maximum value is 5.', curIdx: -1, max: 5 },
        { label: 'Array random access is O(1). Finding the max element requires O(n) linear scan.', curIdx: -1, max: 5 },
    ];
    const [step] = useSteps(frames.length, playing, Math.round(2100 / speed));
    const cur = frames[step] || frames[0];

    useEffect(() => {
        onStepChange?.(step);
    }, [step, onStepChange]);

    return (
        <div className={clsx('w-full', 'max-w-md', 'flex', 'flex-col', 'items-center', 'gap-6', 'select-none', 'font-mono')}>
            {/* Array contiguous blocks */}
            <div className={clsx('flex', 'gap-2', 'relative', 'pt-8', 'pb-3', 'min-h-[90px]', 'w-full', 'justify-center', 'bg-slate-950/20', 'px-2', 'py-4', 'border', 'border-slate-900', 'rounded-2xl', 'shadow-inner')}>
                {arr.map((val, idx) => {
                    const isScanning = cur.curIdx === idx;
                    const isMax = cur.max === val && step >= 3;
                    const isScanned = step >= 3 && idx < cur.curIdx;

                    return (
                        <div key={idx} className={clsx('flex', 'flex-col', 'items-center', 'gap-1.5', 'relative')}>
                            {/* Scanning cursor pointing down */}
                            {isScanning && (
                                <motion.div
                                    layoutId="arrayScanPointer"
                                    className={clsx('absolute', '-top-7', 'text-xs', 'font-black', 'text-amber-500', 'animate-bounce')}
                                >
                                    ▼
                                </motion.div>
                            )}

                            <motion.div
                                animate={{
                                    y: isScanning ? -8 : 0,
                                    borderColor: isScanning ? '#F59E0B' : isMax ? '#10B981' : 'rgba(255,255,255,0.06)',
                                    backgroundColor: isScanning ? 'rgba(245,158,11,0.1)' : isMax ? 'rgba(16,185,129,0.1)' : '#020617',
                                    scale: isScanning ? 1.08 : 1,
                                    opacity: isScanned ? 0.45 : 1
                                }}
                                className={clsx('w-12', 'h-12', 'border-2', 'rounded-xl', 'flex', 'flex-col', 'items-center', 'justify-center', 'text-xs', 'relative', 'overflow-hidden', 'group', 'shadow')}
                            >
                                {/* Byte Offset */}
                                <span className={clsx('text-[6px]', 'text-slate-500', 'absolute', 'top-0.5', 'font-bold')}>+{idx * 4}B</span>

                                <span className={clsx('font-extrabold', 'mt-1.5')} style={{ color: isScanning ? '#F59E0B' : isMax ? '#10B981' : '#94A3B8' }}>{val}</span>

                                {/* Gold Crown Badge 👑 on active max cell */}
                                {isMax && (
                                    <motion.span
                                        initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }}
                                        className={clsx('absolute', 'top-0.5', 'right-0.5', 'text-[8px]')}
                                    >
                                        👑
                                    </motion.span>
                                )}
                            </motion.div>
                            <span className={clsx('text-[8px]', 'text-[#475569]', 'font-bold')}>idx [{idx}]</span>
                            <span className={clsx('text-[7px]', 'text-brand-500/60', 'font-semibold')}>0x20{idx * 4}</span>
                        </div>
                    );
                })}
            </div>

            {/* comparison status traces */}
            <div className={clsx('flex', 'gap-4', 'items-center')}>
                {/* Max tracker card */}
                <motion.div
                    animate={{
                        borderColor: step >= 3 ? '#10B981' : 'rgba(255,255,255,0.06)'
                    }}
                    className={clsx('px-4', 'py-2', 'border-2', 'bg-[#020617]', 'rounded-2xl', 'flex', 'flex-col', 'items-center', 'shadow-lg', 'min-w-[120px]')}
                >
                    <span className={clsx('text-[8px]', 'text-[#475569]', 'uppercase', 'font-bold')}>Current Max</span>
                    <div className={clsx('flex', 'gap-1', 'items-baseline')}>
                        <motion.span
                            key={cur.max}
                            initial={{ scale: 0.6 }} animate={{ scale: 1 }}
                            className={clsx('font-extrabold', 'text-2xl', 'text-emerald-400')}
                        >
                            {step >= 3 ? cur.max : '?'}
                        </motion.span>
                        {step >= 3 && <Sparkles className={clsx('w-3.5', 'h-3.5', 'text-emerald-500', 'animate-pulse', 'shrink-0')} />}
                    </div>
                </motion.div>

                {/* Code statement execution bubble (understanding booster!) */}
                {cur.curIdx !== -1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                        className={clsx('bg-[#0c1325]', 'border-2', 'border-brand-500/20', 'p-2.5', 'rounded-xl', 'text-[10px]', 'text-slate-300', 'max-w-[200px]')}
                    >
                        <span className={clsx('text-brand-400', 'font-extrabold', 'uppercase', 'block', 'mb-1')}>REAL-TIME CODE TRACE:</span>
                        <div className={clsx('font-bold', 'flex', 'items-center', 'gap-1.5', 'leading-normal', 'bg-slate-950', 'p-1.5', 'rounded', 'border', 'border-slate-900', 'text-[9.5px]')}>
                            <code>if ({arr[cur.curIdx]} &gt; {cur.max})</code>
                        </div>
                        <div className={clsx('text-[9px]', 'mt-1.5', 'text-slate-400', 'font-semibold')}>
                            {arr[cur.curIdx] > cur.max ? (
                                <span className={clsx('text-emerald-400', 'font-extrabold')}>Evaluates to TRUE! Update Max ✓</span>
                            ) : (
                                <span className="text-slate-500">Evaluates to FALSE. Keep Max ✗</span>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>

            <AnimatePresence mode="wait">
                <motion.p key={step} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className={clsx('text-xs', 'text-center', 'text-slate-300', 'bg-slate-900/60', 'border', 'border-brand-500/10', 'px-4', 'py-2.5', 'rounded-2xl', 'max-w-sm', 'backdrop-blur-sm')}>
                    {cur.label}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. StringVis (Palindrome check) — Mirror line & matching pointers
// ─────────────────────────────────────────────────────────────────────────────
const StringVis = ({ playing, speed, onStepChange }) => {
    const text = 'racecar';
    const frames = [
        { label: 'String "racecar" as char array ending with "\\0".', left: -1, right: -1, match: true },
        { label: 'Compare index 0 ("r") and index 6 ("r"). Match!', left: 0, right: 6, match: true },
        { label: 'Compare index 1 ("a") and index 5 ("a"). Match!', left: 1, right: 5, match: true },
        { label: 'Compare index 2 ("c") and index 4 ("c"). Match!', left: 2, right: 4, match: true },
        { label: 'Pointers meet at index 3 ("e"). Loop complete.', left: 3, right: 3, match: true },
        { label: 'Confirmed! "racecar" is a Palindrome.', left: -1, right: -1, match: true, final: true },
    ];
    const [step] = useSteps(frames.length, playing, Math.round(2100 / speed));
    const cur = frames[step];

    useEffect(() => {
        onStepChange?.(step);
    }, [step, onStepChange]);

    return (
        <div className={clsx('w-full', 'max-w-md', 'flex', 'flex-col', 'items-center', 'gap-6', 'select-none', 'font-mono')}>
            {/* Palindrome array board */}
            <div className={clsx('flex', 'gap-2', 'items-end', 'justify-center', 'relative', 'p-5', 'bg-slate-950/20', 'border', 'border-slate-900', 'rounded-2xl', 'shadow-inner', 'min-h-[100px]', 'w-full')}>

                {/* Mirror indicator line in step >= 1 */}
                {step >= 1 && step < 5 && (
                    <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 0.35, scaleY: 1 }}
                        className={clsx('absolute', 'inset-y-2', 'left-[46.5%]', 'w-0.5', 'bg-gradient-to-b', 'from-brand-500', 'via-emerald-500', 'to-transparent', 'pointer-events-none')}
                    />
                )}

                {Array.from(text).map((char, idx) => {
                    const isL = cur.left === idx;
                    const isR = cur.right === idx;
                    const active = isL || isR;
                    const matchedPair = step >= 2 && (idx < cur.left || idx > cur.right || cur.left === -1);

                    return (
                        <div key={idx} className={clsx('flex', 'flex-col', 'items-center', 'gap-1.5', 'relative')}>
                            {/* Pointer arrows pointing down */}
                            <span className={clsx('text-[9px]', 'text-[#475569]', 'font-black', 'h-4', 'flex', 'items-center')}>
                                {isL && isR ? (
                                    <motion.span animate={{ y: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} className={clsx('text-amber-500', 'font-extrabold')}>L=R</motion.span>
                                ) : isL ? (
                                    <motion.span animate={{ y: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} className={clsx('text-brand-400', 'font-extrabold')}>L➔</motion.span>
                                ) : isR ? (
                                    <motion.span animate={{ y: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} className={clsx('text-brand-400', 'font-extrabold')}>➔R</motion.span>
                                ) : '·'}
                            </span>

                            <motion.div
                                animate={{
                                    borderColor: active ? '#3B82F6' : matchedPair ? '#10B981' : 'rgba(255,255,255,0.06)',
                                    backgroundColor: active ? 'rgba(59,130,246,0.1)' : matchedPair ? 'rgba(16,185,129,0.05)' : '#020617',
                                    scale: active ? 1.06 : 1,
                                }}
                                className={`w-10 h-10 border-2 rounded-xl flex items-center justify-center text-xs font-black relative`}
                                style={{
                                    boxShadow: cur.final ? '0 0 18px -3px #10b981' : 'none'
                                }}
                            >
                                <span className={active ? 'text-slate-100' : matchedPair ? 'text-emerald-400' : 'text-slate-500'}>{char}</span>
                                {matchedPair && (
                                    <span className={clsx('absolute', 'bottom-0.5', 'right-0.5', 'text-[6px]', 'text-emerald-500')}>✓</span>
                                )}
                            </motion.div>
                            <span className={clsx('text-[7px]', 'text-[#475569]', 'font-bold')}>[{idx}]</span>
                        </div>
                    );
                })}

                {/* Null terminator */}
                <div className={clsx('flex', 'flex-col', 'items-center', 'gap-1.5', 'opacity-35', 'relative')}>
                    <span className={clsx('text-[9px]', 'text-transparent', 'h-4')}>·</span>
                    <div className={clsx('w-10', 'h-10', 'border', 'border-dashed', 'border-slate-800', 'rounded-xl', 'flex', 'items-center', 'justify-center', 'text-[10px]', 'text-slate-600', 'bg-slate-950', 'shadow-sm', 'font-semibold')}>
                        \0
                    </div>
                    <span className={clsx('text-[7px]', 'text-[#475569]', 'font-bold')}>[7]</span>
                </div>
            </div>

            {/* Connecting indices matching tracer */}
            {step >= 1 && step < 5 && cur.left !== -1 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={clsx('text-[9px]', 'text-[#475569]', 'uppercase', 'font-bold', 'flex', 'gap-4', 'border', 'border-slate-900', 'bg-slate-950/40', 'p-2.5', 'rounded-2xl', 'items-center', 'shadow-inner')}
                >
                    <div className={clsx('flex', 'items-center', 'gap-1', 'text-slate-300')}>
                        <span className={clsx('bg-slate-900', 'border', 'border-slate-800', 'w-5', 'h-5', 'rounded', 'flex', 'items-center', 'justify-center', 'text-[10px]', 'font-black', 'text-brand-400')}>"{text[cur.left]}"</span>
                        <span>at L[{cur.left}]</span>
                    </div>
                    <span className={clsx('text-emerald-500', 'font-black')}>==</span>
                    <div className={clsx('flex', 'items-center', 'gap-1', 'text-slate-300')}>
                        <span className={clsx('bg-slate-900', 'border', 'border-slate-800', 'w-5', 'h-5', 'rounded', 'flex', 'items-center', 'justify-center', 'text-[10px]', 'font-black', 'text-brand-400')}>"{text[cur.right]}"</span>
                        <span>at R[{cur.right}]</span>
                    </div>
                    <span className={clsx('bg-emerald-950', 'text-emerald-400', 'px-1.5', 'py-0.5', 'rounded', 'border', 'border-emerald-500/20', 'text-[8px]', 'font-black')}>EQUAL ✓</span>
                </motion.div>
            )}

            {/* complete banner */}
            {cur.final && (
                <motion.div
                    initial={{ scale: 0.8, rotate: -2, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    className={clsx('px-4', 'py-2.5', 'border-2', 'border-emerald-500', 'bg-emerald-950/20', 'text-emerald-400', 'text-xs', 'font-bold', 'rounded-2xl', 'flex', 'items-center', 'gap-2', 'shadow-lg')}
                >
                    <CheckCircle2 className={clsx('w-4', 'h-4', 'text-emerald-400', 'animate-bounce')} /> Confirmed Palindrome! "racecar"
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                <motion.p key={step} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className={clsx('text-xs', 'text-center', 'text-slate-300', 'bg-slate-900/60', 'border', 'border-brand-500/10', 'px-4', 'py-2.5', 'rounded-2xl', 'max-w-sm', 'backdrop-blur-sm')}>
                    {cur.label}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// 11. PointerVis (Pointer dereferencing) — Value beams & byte layouts
// ─────────────────────────────────────────────────────────────────────────────
const PointerVis = ({ playing, speed, onStepChange }) => {
    const frames = [
        { label: 'Pointers store memory addresses of other variables.', active: '', xVal: 5, pVal: 'nullptr' },
        { label: 'Integer variable x allocated at memory address 0x7ffd04.', active: 'x', xVal: 5, pVal: 'nullptr' },
        { label: 'Pointer variable p declared at address 0x7ffd80.', active: 'p', xVal: 5, pVal: 'nullptr' },
        { label: 'Initialize p = &x. p now holds address 0x7ffd04.', active: 'link', xVal: 5, pVal: '0x7ffd04' },
        { label: 'Accessing *p dereferences it, reading the value inside x (5).', active: 'deref', xVal: 5, pVal: '0x7ffd04' },
        { label: 'Execute: *p = 10. Modifies the value inside x through the pointer!', active: 'write', xVal: 10, pVal: '0x7ffd04' },
        { label: 'Complete! Dereferenced write successful.', active: '', xVal: 10, pVal: '0x7ffd04' },
    ];
    const [step] = useSteps(frames.length, playing, Math.round(2100 / speed));
    const cur = frames[step];

    useEffect(() => {
        onStepChange?.(step);
    }, [step, onStepChange]);

    const isLinked = cur.pVal !== 'nullptr';
    const isDeref = cur.active === 'deref';
    const isWrite = cur.active === 'write';

    return (
        <div className={clsx('w-full', 'max-w-md', 'flex', 'flex-col', 'items-center', 'gap-6', 'select-none', 'font-mono')}>

            {/* Pointer RAM simulation space */}
            <div className={clsx('flex', 'gap-12', 'items-center', 'justify-center', 'relative', 'w-full', 'px-5', 'py-8', 'bg-slate-950/20', 'border', 'border-slate-900', 'rounded-2xl', 'shadow-inner', 'min-h-[140px]')}>

                {/* Pointer Card p */}
                <motion.div
                    animate={{
                        borderColor: cur.active === 'p' || cur.active === 'link' ? '#3B82F6' : 'rgba(255,255,255,0.06)',
                        backgroundColor: cur.active === 'p' || cur.active === 'link' ? 'rgba(59,130,246,0.1)' : '#020617',
                        scale: cur.active === 'p' || cur.active === 'link' ? 1.04 : 1
                    }}
                    className={clsx('border-2', 'p-3.5', 'rounded-2xl', 'flex', 'flex-col', 'items-center', 'min-w-[110px]', 'shadow-lg', 'relative', 'z-10')}
                >
                    <span className={clsx('text-[7px]', 'text-[#475569]', 'font-bold')}>ADDRESS: 0x7ffd80</span>
                    <span className={clsx('text-[10px]', 'font-extrabold', 'text-brand-400', 'mt-0.5')}>p (int*)</span>

                    {/* Monospace pointer value cells */}
                    <motion.div
                        key={cur.pVal}
                        initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                        className={clsx('text-[10px]', 'font-bold', 'text-slate-100', 'bg-slate-950', 'px-2', 'py-1', 'rounded', 'border', 'border-slate-900/60', 'mt-2', 'flex', 'items-center', 'gap-1', 'shadow-inner', 'font-mono')}
                    >
                        {cur.pVal}
                    </motion.div>
                    <span className={clsx('text-[7px]', 'text-slate-500', 'font-extrabold', 'mt-1.5', 'uppercase')}>4-Byte Pointer</span>
                </motion.div>

                {/* Animated connecting dashed SVG line */}
                {isLinked && (
                    <svg className={clsx('absolute', 'inset-0', 'w-full', 'h-full', 'pointer-events-none', 'z-0')}>
                        <defs>
                            <marker id="ptrArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
                            </marker>
                        </defs>
                        <motion.line
                            x1="145" y1="50%"
                            x2="245" y2="50%"
                            stroke="#10B981"
                            strokeWidth={2}
                            markerEnd="url(#ptrArrow)"
                            animate={{
                                strokeDasharray: isDeref || isWrite ? '4,4' : '0,0',
                                opacity: isLinked ? 1 : 0.2
                            }}
                        />
                        {/* Flow particle value beam */}
                        {(isDeref || isWrite) && (
                            <motion.circle
                                r="4"
                                fill={isWrite ? '#EF4444' : '#10B981'}
                                animate={{
                                    cx: isWrite ? [245, 145] : [145, 245],
                                    cy: ['50%', '50%'],
                                    opacity: [0.2, 1, 0.2]
                                }}
                                transition={{ repeat: Infinity, duration: 1.2 / speed, ease: 'easeInOut' }}
                            />
                        )}
                    </svg>
                )}

                {/* Target Variable Card x */}
                <motion.div
                    animate={{
                        borderColor: cur.active === 'x' || isWrite ? '#10B981' : 'rgba(255,255,255,0.06)',
                        backgroundColor: cur.active === 'x' || isWrite ? 'rgba(16,185,129,0.1)' : '#020617',
                        scale: cur.active === 'x' || isWrite ? 1.04 : 1
                    }}
                    className={clsx('border-2', 'p-3.5', 'rounded-2xl', 'flex', 'flex-col', 'items-center', 'min-w-[110px]', 'shadow-lg', 'relative', 'z-10')}
                >
                    <span className={clsx('text-[7px]', 'text-[#475569]', 'font-bold')}>ADDRESS: 0x7ffd04</span>
                    <span className={clsx('text-[10px]', 'font-extrabold', 'text-emerald-400', 'mt-0.5')}>x (int)</span>

                    {/* Monospace value cell */}
                    <motion.div
                        key={cur.xVal}
                        initial={{ scale: 0.5 }} animate={{ scale: 1 }}
                        className={clsx('text-2xl', 'font-black', 'text-slate-100', 'bg-slate-950/80', 'border', 'border-slate-900/60', 'px-3', 'py-0.5', 'rounded', 'shadow-inner', 'mt-1', 'text-center', 'font-mono')}
                    >
                        {cur.xVal}
                    </motion.div>

                    <div className={clsx('flex', 'gap-0.5', 'mt-2')}>
                        {Array.from({ length: 4 }).map((_, bIdx) => (
                            <span key={bIdx} className={clsx('w-1.5', 'h-1.5', 'rounded', 'bg-slate-800')} />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Dereferencing pointer explainer card (understanding booster!) */}
            {(isDeref || isWrite) && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`px-3 py-2.5 border rounded-xl text-[10px] font-semibold flex items-start gap-2 shadow-md ${isWrite
                            ? 'bg-rose-950/30 border-rose-500/30 text-rose-400'
                            : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400'
                        }`}
                >
                    <Info className={clsx('w-4', 'h-4', 'shrink-0', 'mt-0.5')} />
                    <div>
                        <span className={clsx('font-bold', 'block', 'uppercase', 'text-[9.5px]')}>
                            {isWrite ? 'DEREFERENCE WRITE (*p = 10)' : 'DEREFERENCE READ (*p)'}
                        </span>
                        <span>
                            {isWrite
                                ? 'Compiler accesses address 0x7ffd04 inside pointer variable p, then overwrites x from 5 to 10.'
                                : 'Compiler opens address 0x7ffd04 stored in p and retrieves its physical integer content.'}
                        </span>
                    </div>
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                <motion.p key={step} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className={clsx('text-xs', 'text-center', 'text-slate-300', 'bg-slate-900/60', 'border', 'border-brand-500/10', 'px-4', 'py-2.5', 'rounded-2xl', 'max-w-sm', 'backdrop-blur-sm')}>
                    {cur.label}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// 12. RefValueVis (Pass by Value vs Pass by Reference Swap) — Stack frames
// ─────────────────────────────────────────────────────────────────────────────
const RefValueVis = ({ playing, speed, onStepChange }) => {
    const frames = [
        { label: 'There are two ways to pass arguments to a function: by value and by reference.', mode: 'intro', valL: [3, 7], valR: [3, 7] },
        { label: 'By value: the function receives a COPY. We call swapByValue with a=3 and b=7.', mode: 'copy-value', valL: [3, 7], valR: [3, 7] },
        { label: 'Inside the function, the clones/copies are swapped inside its stack frame.', mode: 'swapping-value', valL: [7, 3], valR: [3, 7] },
        { label: 'Function ends, clones deleted. Original Main values remain completely unchanged!', mode: 'fail-value', valL: [3, 7], valR: [3, 7] },
        { label: 'By reference: the function receives the ORIGINAL variables using references (int&).', mode: 'copy-ref', valL: [3, 7], valR: [3, 7] },
        { label: 'Inside the function, we swap the actual values directly in the original locations.', mode: 'swapping-ref', valL: [3, 7], valR: [7, 3] },
        { label: 'The swap succeeds! Back in main, a is now 7 and b is now 3.', mode: 'success-ref', valL: [3, 7], valR: [7, 3] },
        { label: 'Use pass-by-reference when functions need to modify arguments or to avoid copying large objects.', mode: 'success-ref', valL: [3, 7], valR: [7, 3] },
    ];
    const [step] = useSteps(frames.length, playing, Math.round(2300 / speed));
    const cur = frames[step] || frames[0];

    useEffect(() => {
        onStepChange?.(step);
    }, [step, onStepChange]);

    const isByValue = step >= 1 && step <= 3;
    const isByRef = step >= 4;

    return (
        <div className={clsx('w-full', 'max-w-lg', 'flex', 'flex-col', 'items-center', 'gap-5', 'select-none', 'font-mono')}>
            {/* Visual panels separated by VS Divider */}
            <div className={clsx('flex', 'gap-4', 'w-full', 'relative')}>

                {/* Left Panel: By Value */}
                <motion.div
                    animate={{
                        borderColor: isByValue ? '#3B82F6' : 'rgba(255,255,255,0.06)',
                        boxShadow: isByValue ? '0 0 30px -10px rgba(59,130,246,0.15)' : 'none'
                    }}
                    className={clsx('flex-1', 'border-2', 'bg-slate-950/40', 'rounded-2xl', 'p-4', 'flex', 'flex-col', 'items-center', 'relative', 'gap-3.5', 'transition-all')}
                >
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${isByValue ? 'bg-brand-950 border-brand-500 text-brand-400' : 'bg-slate-900 border-slate-800 text-[#475569]'
                        }`}>
                        PASS BY VALUE
                    </span>

                    {/* Main frame values */}
                    <div className={clsx('flex', 'flex-col', 'gap-1', 'w-full', 'bg-[#020617]', 'border', 'border-slate-900', 'rounded-xl', 'p-2.5', 'items-center')}>
                        <span className={clsx('text-[7px]', 'text-slate-500', 'font-extrabold', 'mb-1')}>main() STACK FRAME</span>
                        <div className={clsx('flex', 'gap-3', 'justify-center', 'w-full')}>
                            <div className={clsx('flex', 'flex-col', 'items-center', 'flex-1')}>
                                <span className={clsx('text-[7px]', 'text-[#475569]', 'font-bold')}>int a</span>
                                <div className={clsx('w-9', 'h-9', 'border', 'border-slate-800', 'rounded-lg', 'flex', 'items-center', 'justify-center', 'text-xs', 'font-bold', 'text-slate-300', 'bg-slate-950')}>
                                    3
                                </div>
                            </div>
                            <div className={clsx('flex', 'flex-col', 'items-center', 'flex-1')}>
                                <span className={clsx('text-[7px]', 'text-[#475569]', 'font-bold')}>int b</span>
                                <div className={clsx('w-9', 'h-9', 'border', 'border-slate-800', 'rounded-lg', 'flex', 'items-center', 'justify-center', 'text-xs', 'font-bold', 'text-slate-300', 'bg-slate-950')}>
                                    7
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Function scope helper frame */}
                    <AnimatePresence>
                        {(cur.mode === 'copy-value' || cur.mode === 'swapping-value') && (
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                                className={clsx('border', 'border-brand-500/20', 'bg-brand-500/5', 'p-3', 'rounded-xl', 'w-full', 'flex', 'flex-col', 'items-center', 'relative')}
                            >
                                {cur.mode === 'copy-value' && (
                                    <div className={clsx('absolute', 'top-[-10px]', 'text-[7px]', 'bg-brand-500', 'text-[#020617]', 'px-1', 'py-0.5', 'rounded', 'font-black', 'shadow-md')}>
                                        CLONING COPIES
                                    </div>
                                )}

                                <span className={clsx('text-[8px]', 'text-brand-400', 'font-extrabold', 'uppercase', 'mb-2')}>swap(int x, int y)</span>

                                <div className={clsx('flex', 'gap-4')}>
                                    <div className={clsx('flex', 'flex-col', 'items-center')}>
                                        <span className={clsx('text-[7px]', 'text-slate-500')}>copy x</span>
                                        <motion.div
                                            animate={{ x: cur.mode === 'swapping-value' ? 18 : 0 }}
                                            className={clsx('w-8', 'h-8', 'border', 'border-brand-500/40', 'rounded-lg', 'flex', 'items-center', 'justify-center', 'text-[10px]', 'font-bold', 'text-brand-400', 'bg-slate-950')}
                                        >
                                            {cur.valL[0]}
                                        </motion.div>
                                    </div>
                                    <div className={clsx('flex', 'flex-col', 'items-center')}>
                                        <span className={clsx('text-[7px]', 'text-slate-500')}>copy y</span>
                                        <motion.div
                                            animate={{ x: cur.mode === 'swapping-value' ? -18 : 0 }}
                                            className={clsx('w-8', 'h-8', 'border', 'border-brand-500/40', 'rounded-lg', 'flex', 'items-center', 'justify-center', 'text-[10px]', 'font-bold', 'text-brand-400', 'bg-slate-950')}
                                        >
                                            {cur.valL[1]}
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {cur.mode === 'fail-value' && (
                        <motion.div
                            initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                            className={clsx('text-[9px]', 'text-rose-500', 'bg-rose-950/20', 'border', 'border-rose-500/30', 'px-2', 'py-0.5', 'rounded-lg', 'font-bold', 'flex', 'items-center', 'gap-1.5', 'shadow')}
                        >
                            <XCircle className={clsx('w-3.5', 'h-3.5', 'text-rose-500')} /> Copies Swapped, main UNCHANGED
                        </motion.div>
                    )}
                </motion.div>

                {/* Right Panel: By Reference */}
                <motion.div
                    animate={{
                        borderColor: isByRef ? '#10B981' : 'rgba(255,255,255,0.06)',
                        boxShadow: isByRef ? '0 0 30px -10px rgba(16,185,129,0.15)' : 'none'
                    }}
                    className={clsx('flex-1', 'border-2', 'bg-slate-950/40', 'rounded-2xl', 'p-4', 'flex', 'flex-col', 'items-center', 'relative', 'gap-3.5', 'transition-all')}
                >
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${isByRef ? 'bg-emerald-950 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-800 text-[#475569]'
                        }`}>
                        PASS BY REFERENCE
                    </span>

                    {/* Main original values */}
                    <div className={clsx('flex', 'flex-col', 'gap-1', 'w-full', 'bg-[#020617]', 'border', 'border-slate-900', 'rounded-xl', 'p-2.5', 'items-center', 'relative')}>
                        <span className={clsx('text-[7px]', 'text-slate-500', 'font-extrabold', 'mb-1')}>main() STACK FRAME</span>
                        <div className={clsx('flex', 'gap-3', 'justify-center', 'w-full')}>
                            <div className={clsx('flex', 'flex-col', 'items-center', 'flex-1')}>
                                <span className={clsx('text-[7px]', 'text-[#475569]', 'font-bold')}>int a</span>
                                <motion.div
                                    animate={{ borderColor: cur.mode.includes('ref') ? '#10B981' : '#1e293b' }}
                                    className={clsx('w-9', 'h-9', 'border', 'rounded-lg', 'flex', 'items-center', 'justify-center', 'text-xs', 'font-bold', 'text-slate-100', 'bg-slate-950')}
                                >
                                    <motion.span key={cur.valR[0]} initial={{ scale: 0.6 }} animate={{ scale: 1 }}>{cur.valR[0]}</motion.span>
                                </motion.div>
                            </div>
                            <div className={clsx('flex', 'flex-col', 'items-center', 'flex-1')}>
                                <span className={clsx('text-[7px]', 'text-[#475569]', 'font-bold')}>int b</span>
                                <motion.div
                                    animate={{ borderColor: cur.mode.includes('ref') ? '#10B981' : '#1e293b' }}
                                    className={clsx('w-9', 'h-9', 'border', 'rounded-lg', 'flex', 'items-center', 'justify-center', 'text-xs', 'font-bold', 'text-slate-100', 'bg-slate-950')}
                                >
                                    <motion.span key={cur.valR[1]} initial={{ scale: 0.6 }} animate={{ scale: 1 }}>{cur.valR[1]}</motion.span>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Function scope referencing */}
                    <AnimatePresence>
                        {(cur.mode === 'copy-ref' || cur.mode === 'swapping-ref') && (
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                                className={clsx('border', 'border-emerald-500/20', 'bg-emerald-500/5', 'p-3', 'rounded-xl', 'w-full', 'flex', 'flex-col', 'items-center', 'relative')}
                            >
                                <div className={clsx('absolute', 'top-[-10px]', 'text-[7px]', 'bg-emerald-500', 'text-[#020617]', 'px-1', 'py-0.5', 'rounded', 'font-black', 'shadow-md')}>
                                    DIRECT ADDRESS ALIASES
                                </div>

                                <span className={clsx('text-[8px]', 'text-emerald-400', 'font-extrabold', 'uppercase', 'mb-1')}>swap(int&amp; x, int&amp; y)</span>
                                <span className={clsx('text-[7px]', 'text-slate-500', 'text-center', 'leading-normal')}>(references original main variables directly)</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {cur.mode.includes('success') && (
                        <motion.div
                            initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                            className={clsx('text-[9px]', 'text-emerald-400', 'bg-emerald-950/20', 'border', 'border-emerald-500/30', 'px-2', 'py-0.5', 'rounded-lg', 'font-bold', 'flex', 'items-center', 'gap-1.5', 'shadow')}
                        >
                            <CheckCircle2 className={clsx('w-3.5', 'h-3.5', 'text-emerald-400')} /> Swap succeeds directly!
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Pass by Value vs Reference comparison scale table */}
            <div className={clsx('w-full', 'border', 'border-slate-900', 'bg-slate-950/60', 'p-3', 'rounded-2xl', 'flex', 'flex-col', 'gap-1.5', 'text-[9px]', 'text-slate-500')}>
                <span className={clsx('font-extrabold', 'text-slate-400', 'uppercase')}>SWAP LOGIC COMPARISON SUMMARY:</span>
                <div className={clsx('flex', 'gap-4')}>
                    <span className={clsx('flex', 'items-center', 'gap-1')}>🔴 Value copies swap inside isolated helper local function, originals unedited.</span>
                    <span className={clsx('flex', 'items-center', 'gap-1')}>🟢 Reference (int&) operates on original memory slot addresses, swap succeeds.</span>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.p key={step} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className={clsx('text-xs', 'text-center', 'text-slate-300', 'bg-slate-900/60', 'border', 'border-brand-500/10', 'px-4', 'py-2.5', 'rounded-2xl', 'max-w-sm', 'backdrop-blur-sm')}>
                    {cur.label}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// 13. StructVis (Structure memory template) — Alignment margins & blueprints
// ─────────────────────────────────────────────────────────────────────────────
const StructVis = ({ playing, speed, onStepChange }) => {
    const frames = [
        { label: 'A Struct groups related variables of different types under one custom name.', active: 'blueprint', values: ['', '', ''] },
        { label: 'Define a Student struct with three members: name, age, and grade.', active: 'blueprint', values: ['', '', ''] },
        { label: 'Think of a struct as a blueprint. It describes the format, but does not allocate memory yet.', active: 'blueprint', values: ['', '', ''] },
        { label: 'Instantiate Student s. The compiler allocates contiguous stacked segments in memory.', active: 'alloc', values: ['(garbage)', '(garbage)', '(garbage)'] },
        { label: 'Use the dot operator to assign values: s.name = "Alice", s.age = 20, s.grade = \'A\'.', active: 'done', values: ['"Alice"', '20', "'A'"] },
        { label: 'The dot operator writes each member at its fixed offset from the base address (+0, +32, +36).', active: 'done', values: ['"Alice"', '20', "'A'"] },
        { label: 'Structs are the foundation of compound datatypes and object-oriented programming classes.', active: 'done', values: ['"Alice"', '20', "'A'"] },
    ];
    const [step] = useSteps(frames.length, playing, Math.round(2200 / speed));
    const cur = frames[step] || frames[0];

    useEffect(() => {
        onStepChange?.(step);
    }, [step, onStepChange]);

    const isBlueprint = step <= 2;
    const isAllocated = step >= 3;

    return (
        <div className={clsx('w-full', 'max-w-md', 'flex', 'flex-col', 'items-center', 'gap-5', 'select-none', 'font-mono')}>

            {/* Memory blueprint template space */}
            <div className={clsx('border-2', 'border-brand-500/10', 'bg-[#020617]', 'rounded-2xl', 'w-full', 'p-4.5', 'flex', 'flex-col', 'relative', 'gap-3.5', 'shadow-2xl')}>

                {/* Blueprint vs Allocation status labels */}
                <div className={clsx('flex', 'items-center', 'justify-between', 'border-b', 'border-slate-900', 'pb-2')}>
                    <span className={clsx('text-[10px]', 'text-brand-400', 'font-extrabold', 'uppercase')}>
                        struct Student s;
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black border ${isBlueprint
                            ? 'bg-slate-950 border-slate-800 text-slate-500'
                            : 'bg-emerald-950 border-emerald-500/30 text-emerald-400'
                        }`}>
                        {isBlueprint ? 'BLUEPRINT ONLY (0 BYTES)' : 'ALLOCATED IN RAM (40B TOTAL)'}
                    </span>
                </div>

                <div className={clsx('flex', 'flex-col', 'gap-3')}>
                    {[
                        { label: 's.name', offset: '+0 Bytes', type: 'string (32B)', color: '#60A5FA', valIdx: 0 },
                        { label: 's.age', offset: '+32 Bytes', type: 'int (4B)', color: '#F59E0B', valIdx: 1 },
                        { label: 's.grade', offset: '+36 Bytes', type: 'char (1B)', color: '#10B981', valIdx: 2 }
                    ].map((member, index) => {
                        const cellVal = cur.values[member.valIdx];
                        const isGarbage = cellVal === '(garbage)';

                        return (
                            <motion.div
                                key={member.label}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    borderColor: isBlueprint ? 'rgba(255,255,255,0.06)' : member.color,
                                    backgroundColor: isBlueprint ? '#020617' : `${member.color}08`,
                                    borderStyle: isBlueprint ? 'dashed' : 'solid'
                                }}
                                transition={{ delay: index * 0.1 }}
                                className={clsx('border-2', 'rounded-xl', 'px-4', 'py-2.5', 'flex', 'items-center', 'justify-between', 'text-xs', 'relative', 'overflow-hidden', 'group', 'bg-[#020617]')}
                            >
                                {/* Write sweep beam on allocation/writing values */}
                                {step === 4 && (
                                    <motion.div
                                        initial={{ x: '-100%' }} animate={{ x: '150%' }}
                                        transition={{ duration: 0.6, delay: index * 0.15 }}
                                        className={clsx('absolute', 'inset-y-0', 'w-16', 'bg-gradient-to-r', 'from-transparent', 'via-white/10', 'to-transparent', 'skew-x-12')}
                                    />
                                )}

                                <div className={clsx('flex', 'flex-col', 'gap-0.5')}>
                                    <span className={clsx('font-extrabold', 'text-slate-100')}>{member.label}</span>
                                    <span className={clsx('text-[8px]', 'text-[#475569]', 'uppercase', 'font-bold')}>{member.type} · offset: {member.offset}</span>
                                </div>

                                <AnimatePresence mode="wait">
                                    {isAllocated && (
                                        <motion.span
                                            key={cellVal}
                                            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                            className={`font-bold px-2 py-0.5 rounded bg-slate-950 border ${isGarbage
                                                    ? 'text-slate-600 border-slate-900 italic'
                                                    : 'border-slate-800 shadow-inner'
                                                }`}
                                            style={{ color: isGarbage ? undefined : member.color }}
                                        >
                                            {cellVal}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}

                    {/* Visual Padding Alignment margin representation */}
                    {isAllocated && (
                        <motion.div
                            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                            className={clsx('border-2', 'border-dashed', 'border-amber-500/20', 'bg-amber-500/5', 'rounded-xl', 'px-4', 'py-1.5', 'flex', 'items-center', 'justify-between', 'text-[10px]', 'text-amber-500/60')}
                        >
                            <span>Alignment padding gap</span>
                            <span className={clsx('bg-slate-900', 'border', 'border-slate-850', 'px-1.5', 'py-0.5', 'rounded', 'text-[8px]', 'font-bold', 'text-slate-500', 'uppercase')}>3 BYTES PADDING</span>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Struct memory layout block diagram for alignment explaining */}
            {isAllocated && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className={clsx('w-full', 'border', 'border-slate-900', 'bg-slate-950/60', 'p-3', 'rounded-2xl', 'flex', 'flex-col', 'gap-1.5', 'text-[9px]', 'text-slate-500', 'leading-normal')}
                >
                    <span className={clsx('font-extrabold', 'text-slate-400', 'uppercase')}>STRUCT RAM BOUNDARY ALIGNMENT:</span>
                    <span>Most 32-bit/64-bit CPUs read memory in 4-byte packages. To maximize speed, the compiler pads the <strong>char (1B)</strong> with 3 unused bytes, aligning the struct size to a fast 40-byte grid boundary.</span>
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                <motion.p key={step} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className={clsx('text-xs', 'text-center', 'text-slate-300', 'bg-slate-900/60', 'border', 'border-brand-500/10', 'px-4', 'py-2.5', 'rounded-2xl', 'max-w-sm', 'backdrop-blur-sm')}>
                    {cur.label}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// 14. STLComplexityVis (STL containers & Big-O curves) — Push/pop & capacity
// ─────────────────────────────────────────────────────────────────────────────
const STLComplexityVis = ({ playing, speed, onStepChange }) => {
    const [activeTab, setActiveTab] = useState < 'stl' | 'complexity' > ('stl');
    const [subTab, setSubTab] = useState < 'vector' | 'stack' | 'queue' | 'map' > ('vector');

    // Auto toggle tabs if playing is on
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
            setActiveTab(cur.tab );
            if (cur.tab === 'stl') {
                setSubTab(cur.activeSub );
            }
        }
    }, [step, cur]);

    // Vector capacity simulation
    const vectorCapacity = subTab === 'vector' && step >= 2 ? 4 : 2;
    const vectorElements = [10, 20, 30];

    return (
        <div className={clsx('w-full', 'max-w-md', 'flex', 'flex-col', 'items-center', 'gap-5', 'select-none', 'font-mono')}>
            {/* Header selector tab */}
            <div className={clsx('flex', 'bg-slate-900/60', 'p-1', 'border', 'border-brand-500/10', 'rounded-full', 'text-[10px]', 'w-fit', 'shadow-lg', 'backdrop-blur-sm')}>
                <button
                    onClick={() => setActiveTab('stl')}
                    className={`px-4 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-all ${activeTab === 'stl' ? 'bg-brand-500 text-[#020617] shadow-md' : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    <Layers className={clsx('w-3.5', 'h-3.5')} />
                    STL Containers
                </button>
                <button
                    onClick={() => setActiveTab('complexity')}
                    className={`px-4 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-all ${activeTab === 'complexity' ? 'bg-brand-500 text-[#020617] shadow-md' : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    <Cpu className={clsx('w-3.5', 'h-3.5')} />
                    Big-O Curves
                </button>
            </div>

            {/* Main Interactive Display Panel */}
            <div className={clsx('w-full', 'h-48', 'bg-[#020617]', 'border', 'border-brand-500/10', 'rounded-2xl', 'p-4', 'flex', 'flex-col', 'justify-center', 'relative', 'overflow-hidden', 'shadow-2xl')}>
                <div className={clsx('absolute', 'inset-0', 'pointer-events-none', 'bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.02),transparent_70%)]')} />

                {activeTab === 'stl' ? (
                    <div className={clsx('flex', 'flex-col', 'gap-4', 'items-center')}>
                        <div className={clsx('flex', 'gap-2.5', 'text-[9px]', 'border-b', 'border-slate-900', 'pb-2', 'w-full', 'justify-center')}>
                            {(['vector', 'stack', 'queue', 'map'] ).map(t => (
                                <span
                                    key={t}
                                    className={`px-2 py-0.5 rounded border transition-colors ${subTab === t
                                            ? 'text-brand-300 font-extrabold bg-brand-950 border-brand-500/30'
                                            : 'text-[#475569] border-transparent'
                                        }`}
                                >
                                    {t.toUpperCase()}
                                </span>
                            ))}
                        </div>

                        {/* Tab displays */}
                        {subTab === 'vector' && (
                            <div className={clsx('flex', 'flex-col', 'gap-2', 'items-center')}>
                                <div className={clsx('flex', 'gap-2')}>
                                    {Array.from({ length: vectorCapacity }).map((_, idx) => {
                                        const filled = idx < vectorElements.length;
                                        return (
                                            <motion.div
                                                key={idx}
                                                animate={{
                                                    borderColor: filled ? '#3B82F6' : '#1E293B',
                                                    scale: filled ? [0.9, 1.05, 1] : 1
                                                }}
                                                className={clsx('w-10', 'h-10', 'border-2', 'rounded-xl', 'flex', 'items-center', 'justify-center', 'text-xs', 'font-black', 'bg-[#020617]/50', 'shadow')}
                                            >
                                                {filled ? vectorElements[idx] : ''}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                                <span className={clsx('text-[8px]', 'text-[#475569]', 'font-bold', 'uppercase', 'mt-1')}>
                                    Size: 3 / Capacity: {vectorCapacity} (Double capacity triggers dynamic allocations)
                                </span>
                            </div>
                        )}
                        {subTab === 'stack' && (
                            <div className={clsx('flex', 'flex-col', 'gap-1', 'w-24', 'border-b-4', 'border-x-4', 'border-pink-500/80', 'rounded-b', 'px-2', 'py-1.5', 'items-center', 'h-28', 'justify-end', 'bg-pink-500/5')}>
                                {[30, 20, 10].map((v, i) => (
                                    <motion.div
                                        key={v}
                                        initial={{ y: -60, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.15, type: 'spring' }}
                                        className={clsx('w-full', 'text-center', 'py-1', 'border', 'border-pink-500/30', 'bg-pink-950/20', 'rounded-lg', 'text-[9px]', 'font-black', 'text-pink-400')}
                                    >
                                        {v}
                                    </motion.div>
                                ))}
                            </div>
                        )}
                        {subTab === 'queue' && (
                            <div className={clsx('flex', 'gap-2', 'items-center', 'h-20')}>
                                <span className={clsx('text-[8px]', 'text-[#475569]', 'font-black')}>FRONT</span>
                                <div className={clsx('flex', 'border-y-2', 'border-emerald-500/80', 'p-2', 'rounded-xl', 'gap-2', 'bg-emerald-500/5')}>
                                    {[10, 20, 30].map((v, i) => (
                                        <motion.div
                                            key={v}
                                            initial={{ x: 30, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            className={clsx('w-8', 'h-8', 'rounded-lg', 'border', 'border-emerald-500/30', 'flex', 'items-center', 'justify-center', 'text-[10px]', 'text-emerald-400', 'font-extrabold', 'bg-[#020617]', 'shadow-sm')}
                                        >
                                            {v}
                                        </motion.div>
                                    ))}
                                </div>
                                <span className={clsx('text-[8px]', 'text-[#475569]', 'font-black')}>REAR</span>
                            </div>
                        )}
                        {subTab === 'map' && (
                            <div className={clsx('flex', 'flex-col', 'items-center', 'gap-1.5')}>
                                <div className={clsx('flex', 'gap-3')}>
                                    {[{ k: 'a', v: '1' }, { k: 'b', v: '2' }].map((node) => (
                                        <motion.div
                                            key={node.k}
                                            initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                                            className={clsx('border-2', 'border-brand-500/20', 'bg-brand-950/10', 'px-3', 'py-2', 'rounded-xl', 'flex', 'flex-col', 'items-center', 'text-[10px]')}
                                        >
                                            <span className={clsx('text-brand-300', 'font-black')}>Key: "{node.k}"</span>
                                            <span className="text-slate-400">Val: {node.v}</span>
                                        </motion.div>
                                    ))}
                                </div>
                                <span className={clsx('text-[8px]', 'text-[#475569]', 'font-bold', 'uppercase', 'mt-1')}>
                                    Tree Balanced Indexes | Search complexity: O(log N)
                                </span>
                            </div>
                        )}
                    </div>
                ) : (
                    // Complexity Charts Grid drawing using stroke dash arrays
                    <div className={clsx('w-full', 'h-full', 'relative', 'flex', 'items-center', 'justify-center', 'bg-slate-950/20')}>
                        <svg className={clsx('w-full', 'h-full', 'text-slate-800')}>
                            <line x1="10%" y1="10%" x2="10%" y2="85%" stroke="#1e293b" strokeWidth={1.5} />
                            <line x1="10%" y1="85%" x2="95%" y2="85%" stroke="#1e293b" strokeWidth={1.5} />

                            {/* O(1) */}
                            <motion.line
                                x1="10%" y1="75%" x2="90%" y2="75%" stroke="#10B981" strokeWidth={2} strokeDasharray="3,3"
                                initial={{ strokeDashoffset: 50 }} animate={{ strokeDashoffset: 0 }}
                                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                            />
                            <text x="91%" y="76%" fill="#10B981" className={clsx('text-[8px]', 'font-black')}>O(1)</text>

                            {/* O(log N) */}
                            <motion.path
                                d="M 40 120 Q 120 100 360 90" fill="none" stroke="#F59E0B" strokeWidth={2}
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5 }}
                            />
                            <text x="91%" y="64%" fill="#F59E0B" className={clsx('text-[8px]', 'font-black')}>O(log N)</text>

                            {/* O(N) */}
                            <motion.line
                                x1="10%" y1="85%" x2="90%" y2="35%" stroke="#3B82F6" strokeWidth={2}
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5 }}
                            />
                            <text x="91%" y="37%" fill="#3B82F6" className={clsx('text-[8px]', 'font-black')}>O(N)</text>

                            {/* O(N^2) */}
                            <motion.path
                                d="M 40 135 Q 150 120 220 15" fill="none" stroke="#EF4444" strokeWidth={2.5}
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5 }}
                            />
                            <text x="52%" y="15%" fill="#EF4444" className={clsx('text-[8px]', 'font-black')}>O(N²)</text>
                        </svg>
                    </div>
                )}
            </div>

            {/* Big-O Cheat Sheet (understanding booster!) */}
            {activeTab === 'complexity' && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className={clsx('w-full', 'border', 'border-slate-900', 'bg-slate-950/60', 'p-3', 'rounded-2xl', 'flex', 'flex-col', 'gap-1.5', 'text-[9px]', 'text-slate-500', 'leading-normal')}
                >
                    <span className={clsx('font-extrabold', 'text-slate-400', 'uppercase')}>Complexity Cheat Sheet:</span>
                    <div className={clsx('grid', 'grid-cols-2', 'gap-1.5')}>
                        <span className={clsx('text-emerald-400', 'font-bold')}>O(1): Constant (Instant speed)</span>
                        <span className={clsx('text-amber-500', 'font-bold')}>O(log N): Logarithmic (Fast search)</span>
                        <span className={clsx('text-blue-400', 'font-bold')}>O(N): Linear scan (Moderate)</span>
                        <span className={clsx('text-rose-500', 'font-bold')}>O(N²): Quadratic (Slow loops)</span>
                    </div>
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                <motion.p key={step} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className={clsx('text-xs', 'text-center', 'text-slate-300', 'bg-slate-900/60', 'border', 'border-brand-500/10', 'px-4', 'py-2.5', 'rounded-2xl', 'max-w-sm', 'backdrop-blur-sm')}>
                    {cur.label}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// 15. Default & Router
// ─────────────────────────────────────────────────────────────────────────────
const DefaultVis = ({ topicTitle }) => (
    <div className={clsx('flex', 'flex-col', 'items-center', 'justify-center', 'gap-4', 'text-center', 'px-6', 'font-mono')}>
        <div className={clsx('w-16', 'h-16', 'rounded-2xl', 'bg-brand-700/20', 'border', 'border-brand-500/30', 'flex', 'items-center', 'justify-center', 'text-2xl', 'font-mono', 'text-brand-300', 'shadow-xl', 'animate-pulse')}>
            {'</'}
        </div>
        <p className={clsx('text-sm', 'font-bold', 'text-text-1')}>{topicTitle}</p>
        <p className={clsx('text-xs', 'text-text-2', 'leading-relaxed', 'max-w-[220px]')}>
            Press ▶ Play to animate, or write your solution and click Run Code.
        </p>
    </div>
);




export const TopicVisualizer = ({ playing, speed, topicId, topicTitle, onStepChange }) => {
  if (topicId === 'control-statements') return <ConditionalsVis playing={playing} speed={speed} onStepChange={onStepChange} />
  if (topicId === 'loops')              return <LoopVis          playing={playing} speed={speed} onStepChange={onStepChange} />
  if (topicId === 'arrays')             return <ArrayVis         playing={playing} speed={speed} onStepChange={onStepChange} />
  if (topicId === 'stl-complexity')     return <STLComplexityVis playing={playing} speed={speed} onStepChange={onStepChange} />
  return <DefaultVis topicTitle={topicTitle} />
}
