import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { X, Play, CheckCircle, Lock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { runCode, submitCode } from '../../services/compiler';
import UpcurveLogoDark from '../../assets/Upcurve_logo_dark.png';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const LANGUAGES = [
    { name: "Python", editorLanguage: "python", judge0Id: 71 },
    { name: "JavaScript", editorLanguage: "javascript", judge0Id: 63 },
    { name: "Java", editorLanguage: "java", judge0Id: 62 },
    { name: "C++", editorLanguage: "cpp", judge0Id: 54 },
    { name: "C", editorLanguage: "c", judge0Id: 50 }
];

export default function CodingArenaOverlay({ problemId, onClose }) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [problem, setProblem] = useState(null);
    const [testcases, setTestcases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
    const [code, setCode] = useState("");
    
    const [customInput, setCustomInput] = useState("");
    const [output, setOutput] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);
    
    const [verdict, setVerdict] = useState(null);

    useEffect(() => {
        if (!problemId) return;

        async function fetchData() {
            setIsLoading(true);
            const { data: pData } = await supabase.from("practice_problems").select("*").eq("id", problemId).single();
            if (pData) {
                setProblem(pData);
                const cacheKey = `practice_code_${problemId}_${selectedLanguage.editorLanguage}`;
                const cachedCode = localStorage.getItem(cacheKey);
                
                if (cachedCode) {
                    setCode(cachedCode);
                } else {
                    const starterCode = pData.starter_code || {};
                    setCode(starterCode[selectedLanguage.editorLanguage] || "");
                }
            }

            const { data: tData } = await supabase.from("testcases").select("*").eq("problem_id", problemId).eq("is_public", true);
            if (tData) {
                setTestcases(tData);
                if (tData.length > 0) {
                    setCustomInput(tData[0].input ? tData[0].input.replace(/\\n/g, '\n') : '');
                }
            }
            setIsLoading(false);
        }
        fetchData();
    }, [problemId]);

    const handleLanguageChange = (e) => {
        const lang = LANGUAGES.find(l => l.name === e.target.value) || LANGUAGES[0];
        setSelectedLanguage(lang);
        if (problem) {
            const cacheKey = `practice_code_${problemId}_${lang.editorLanguage}`;
            const cachedCode = localStorage.getItem(cacheKey);
            if (cachedCode) {
                setCode(cachedCode);
            } else {
                setCode(problem.starter_code ? problem.starter_code[lang.editorLanguage] || "" : "");
            }
        }
    };

    const handleCodeChange = (value) => {
        const newCode = value || "";
        setCode(newCode);
        const cacheKey = `practice_code_${problemId}_${selectedLanguage.editorLanguage}`;
        localStorage.setItem(cacheKey, newCode);
    };

    const handleRunCode = async () => {
        setIsExecuting(true);
        setOutput("Running Custom Input...");
        setVerdict(null);
        try {
            const data = await runCode(code, customInput, selectedLanguage.judge0Id);
            
            let resultText = "";
            if (data.compile_output) resultText += `Compilation Error:\n${data.compile_output}\n`;
            if (data.stderr) resultText += `Runtime Error:\n${data.stderr}\n`;
            if (data.stdout) resultText += `Output:\n${data.stdout}\n`;
            setOutput(resultText.trim() || "Executed without output");
        } catch (error) {
            setOutput("Failed to run code.");
        } finally {
            setIsExecuting(false);
        }
    };

    const handleSubmit = async () => {
        setIsExecuting(true);
        setOutput("Submitting code to Judge0 for all testcases...");
        setVerdict(null);
        try {
            const data = await submitCode(code, problemId, selectedLanguage.judge0Id);
            setVerdict(data);
            setOutput(`Submission Completed! Verdict: ${data.verdict}`);

            if (data.verdict === 'Accepted' && user) {
                const { error: subError } = await supabase.from('submissions').insert([{
                    user_id: user.id,
                    problem_id: problemId,
                    status: 'Completed'
                }]);
                if (subError) console.error('Error saving submission', subError);
            }
        } catch (error) {
            setOutput("Failed to submit code.");
        } finally {
            setIsExecuting(false);
        }
    };

    // Body scroll lock
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[9999] flex flex-col bg-[#0f0f11] text-gray-300 font-sans"
        >
            {/* Top Navbar */}
            <nav className="h-14 bg-[#18181b] border-b border-[#27272a] flex items-center justify-between px-6 shrink-0 shadow-sm">
                <div className="flex items-center gap-4">
                    <img src={UpcurveLogoDark} alt="Upcurve" className="h-6 w-auto opacity-90" />
                    <div className="h-4 w-px bg-[#27272a]"></div>
                    <span className="text-white font-bold text-lg tracking-wide">Practice Arena</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-xs text-gray-500 hidden md:flex items-center gap-2">
                        <span className="bg-[#27272a] px-2 py-1 rounded text-gray-400 border border-[#3f3f46]">Ctrl</span>
                        <span>+</span>
                        <span className="bg-[#27272a] px-2 py-1 rounded text-gray-400 border border-[#3f3f46]">&crarr;</span>
                        <span className="ml-1 mr-4">Run</span>
                    </div>
                    
                    <button 
                        onClick={onClose}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-all rounded border border-red-500/30 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20"
                    >
                        <X size={16} />
                        <span className="font-medium text-xs uppercase tracking-wider">Close</span>
                    </button>
                </div>
            </nav>

            {isLoading || !problem ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="flex-1 flex overflow-hidden">
                    {/* Left Panel: Problem Statement */}
                    <div className="w-[45%] flex flex-col border-r border-[#27272a] overflow-y-auto bg-[#18181b] custom-scrollbar">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-4 bg-yellow-500 rounded-full"></div>
                                <h1 className="text-[11px] font-bold text-gray-500 tracking-widest uppercase">Problem</h1>
                            </div>
                            
                            <h2 className="text-xl font-bold text-gray-100 mb-6">{problem.title}</h2>
                            
                            <div className="mb-10">
                                <ReactMarkdown 
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        h3: ({node, ...props}) => <h3 className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mt-8 mb-4" {...props} />,
                                        p: ({node, ...props}) => <p className="text-[13px] text-gray-300 mb-4 leading-relaxed" {...props} />,
                                        ul: ({node, ...props}) => <ul className="bg-[#202024] p-5 rounded-lg border border-[#27272a] list-disc list-inside mb-6 text-[13px] text-gray-300 space-y-2" {...props} />,
                                        li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                                        code: ({node, ...props}) => <code className="text-blue-300 bg-blue-500/10 px-1.5 py-0.5 rounded font-mono text-[12px]" {...props} />,
                                        pre: ({node, ...props}) => <pre className="block bg-[#0f0f11] p-4 rounded font-mono text-[12px] text-gray-300 overflow-x-auto mb-6 border border-[#27272a]" {...props} />
                                    }}
                                >
                                    {problem.description ? problem.description.replace(/\\n/g, '\n') : ''}
                                </ReactMarkdown>
                            </div>
                            
                            <h3 className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mt-10 mb-4">Examples</h3>
                            
                            {testcases.map((tc, idx) => (
                                <div key={tc.id} className="mb-6 bg-[#202024] rounded-lg border border-[#27272a] overflow-hidden">
                                    <div className="bg-[#27272a] px-4 py-2 border-b border-[#3f3f46]">
                                        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Example {idx + 1}</span>
                                    </div>
                                    <div className="p-4 font-mono text-[13px] text-gray-300">
                                        <p className="mb-2"><span className="text-gray-500">Input:</span> {tc.input ? tc.input.replace(/\\n/g, '\n') : ''}</p>
                                        <p><span className="text-gray-500">Output:</span> <span className="text-green-400">{tc.expected_output ? tc.expected_output.replace(/\\n/g, '\n') : ''}</span></p>
                                    </div>
                                </div>
                            ))}

                            {problem.constraints && (
                                <>
                                    <h3 className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mt-8 mb-4">Constraints</h3>
                                    <div className="bg-[#202024] p-5 rounded-lg border border-[#27272a]">
                                        <ReactMarkdown 
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                p: ({node, ...props}) => <p className="text-[12px] text-gray-400 mb-2 leading-relaxed" {...props} />,
                                                ul: ({node, ...props}) => <ul className="list-disc list-inside text-[12px] text-gray-400 space-y-1" {...props} />,
                                                li: ({node, ...props}) => <li className="" {...props} />,
                                                code: ({node, ...props}) => <code className="text-blue-300 bg-blue-500/10 px-1.5 py-0.5 rounded font-mono text-[11px]" {...props} />,
                                                pre: ({node, ...props}) => <pre className="block bg-[#0f0f11] p-3 rounded font-mono text-[11px] text-gray-300 overflow-x-auto mb-2 border border-[#27272a]" {...props} />
                                            }}
                                        >
                                            {problem.constraints ? problem.constraints.replace(/\\n/g, '\n') : ''}
                                        </ReactMarkdown>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Panel: Editor and Output */}
                    <div className="w-[55%] flex flex-col bg-[#0f0f11]">
                        {/* Editor Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-[#27272a]">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                                <span className="text-[11px] font-bold text-gray-500 tracking-widest uppercase">Editor</span>
                                
                                <select
                                    value={selectedLanguage.name}
                                    onChange={handleLanguageChange}
                                    className="bg-[#27272a] hover:bg-[#3f3f46] border border-[#3f3f46] text-gray-300 text-xs rounded px-3 py-1 outline-none transition-colors ml-2 cursor-pointer font-medium"
                                >
                                    {LANGUAGES.map(lang => (
                                        <option key={lang.name} value={lang.name}>{lang.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={handleRunCode} disabled={isExecuting} className="flex items-center gap-2 px-4 py-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-gray-300 hover:text-white text-xs font-medium rounded transition-colors disabled:opacity-50 border border-[#3f3f46]">
                                    <Play size={14} /> Run Code
                                </button>
                                <button onClick={handleSubmit} disabled={isExecuting} className="flex items-center gap-2 px-5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded transition-colors disabled:opacity-50 shadow-lg shadow-blue-900/20">
                                    <CheckCircle size={14} /> {isExecuting ? 'Executing...' : 'Submit'}
                                </button>
                            </div>
                        </div>

                        {/* Editor Container */}
                        <div className="flex-1 relative">
                            {!user && (
                                <div className="absolute inset-0 z-10 bg-[#0f0f11]/90 backdrop-blur-sm flex flex-col items-center justify-center">
                                    <Lock size={48} className="text-gray-500 mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">Authentication Required</h3>
                                    <p className="text-gray-400 mb-6 max-w-md text-center text-sm">You must be signed in to access interactive coding challenges and save your progress.</p>
                                    <button 
                                        onClick={() => { onClose(); navigate('/login'); }} 
                                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded transition-colors shadow-lg shadow-blue-900/20"
                                    >
                                        Sign In to Code
                                    </button>
                                </div>
                            )}
                            <Editor
                                height="100%"
                                theme="vs-dark"
                                language={selectedLanguage.editorLanguage}
                                value={code}
                                onChange={handleCodeChange}
                                options={{ 
                                    minimap: { enabled: false }, 
                                    fontSize: 14, 
                                    padding: { top: 16 },
                                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                    scrollBeyondLastLine: false,
                                    lineNumbersMinChars: 3,
                                    readOnly: !user
                                }}
                                className="bg-[#0f0f11]"
                            />
                        </div>

                        {/* Bottom Panel: Terminal Input / Output */}
                        <div className="h-72 flex flex-col bg-[#18181b] border-t border-[#27272a]">
                            <div className="flex items-center px-4 py-2 border-b border-[#27272a] bg-[#121214]">
                                {/* Mac Window Controls */}
                                <div className="flex gap-1.5 mr-6">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                                </div>
                                <span className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mr-4">Console</span>
                                
                                {verdict && (
                                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${verdict.verdict === 'Accepted' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                        {verdict.verdict}
                                    </span>
                                )}
                            </div>
                            
                            <div className="flex flex-1 overflow-hidden">
                                <div className="w-[45%] p-4 border-r border-[#27272a] flex flex-col bg-[#0a0a0c]">
                                    <label className="text-[10px] text-gray-600 mb-2 uppercase tracking-widest font-bold">STDIN</label>
                                    <textarea
                                        value={customInput}
                                        onChange={(e) => setCustomInput(e.target.value)}
                                        className="flex-1 bg-transparent text-gray-400 outline-none resize-none font-mono text-[13px]"
                                        spellCheck={false}
                                        placeholder="Enter custom input here..."
                                    />
                                </div>
                                <div className="w-[55%] p-4 flex flex-col overflow-auto bg-[#0a0a0c] custom-scrollbar">
                                    <label className="text-[10px] text-gray-600 mb-2 uppercase tracking-widest font-bold">STDOUT / RESULT</label>
                                    {verdict ? (
                                        <div className="font-mono text-[13px] text-gray-300">
                                            <p className="text-blue-500 mb-4 opacity-80">compiler@ds-project:~$ ./solution</p>
                                            <p className="text-gray-400 mb-4">Passed {verdict.passed} / {verdict.total} testcases.</p>
                                            
                                            {verdict.details && verdict.details.length > 0 && (
                                                <div className="bg-[#18181b] p-4 rounded border border-[#27272a] text-red-400">
                                                    {verdict.details[0].error ? verdict.details[0].error : (
                                                        <>
                                                            <p className="mb-2"><span className="text-gray-500">Input:</span><br/>{verdict.details[0].input ? verdict.details[0].input.replace(/\\n/g, '\n') : ''}</p>
                                                            <p className="mb-2"><span className="text-gray-500">Expected:</span><br/>{verdict.details[0].expected ? verdict.details[0].expected.replace(/\\n/g, '\n') : ''}</p>
                                                            <p><span className="text-gray-500">Actual:</span><br/>{verdict.details[0].actual ? verdict.details[0].actual.replace(/\\n/g, '\n') : ''}</p>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                            
                                            {verdict.verdict === 'Accepted' && (
                                                <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                                                    <span>Status: <span className="text-green-400">Accepted</span></span>
                                                    <span>Runtime: <span className="text-gray-300">{verdict.runtime}</span></span>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex-1 font-mono text-[13px] text-gray-300 whitespace-pre-wrap">
                                            {output && <p className="text-blue-500 mb-4 opacity-80">compiler@ds-project:~$ ./solution</p>}
                                            <span className={output.includes('Error') ? 'text-red-400' : 'text-gray-400'}>
                                                {output || 'Run your code to see output here...'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
