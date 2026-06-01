import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Code2, CheckCircle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import ModuleLayout from '../../components/layout/ModuleLayout';
import { InteractiveVisualizer } from '../../components/visualizers/InteractiveVisualizer';
import CodingArenaOverlay from '../../components/visualizers/CodingArenaOverlay';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import './PrereqModules.css';

export default function ControlStatements() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [practiceProblems, setPracticeProblems] = useState([]);
  const [activePracticeProblem, setActivePracticeProblem] = useState(null);
  const [completedProblems, setCompletedProblems] = useState([]);

  useEffect(() => {
    async function fetchProblems() {
      const { data } = await supabase.from('practice_problems').select('*').eq('module_id', 'control-statements').order('title');
      if (data) setPracticeProblems(data);
    }
    fetchProblems();
  }, []);

  useEffect(() => {
    if (!user) return;
    async function fetchSubmissions() {
      const { data } = await supabase.from('submissions').select('problem_id').eq('user_id', user.id).eq('status', 'Completed');
      if (data) setCompletedProblems(data.map(s => s.problem_id));
    }
    fetchSubmissions();
  }, [user, activePracticeProblem]);

  const allCompleted = practiceProblems.length > 0 && practiceProblems.every(p => completedProblems.includes(p.id));
  const completedPct = practiceProblems.length > 0 ? Math.round((completedProblems.length / practiceProblems.length) * 100) : 0;

  useEffect(() => {
    // Tab switching logic for code examples
    const tabs = document.querySelectorAll('.code-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target');
        const parent = tab.closest('.code-block-wrapper');
        if (!parent) return;
        parent.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
        parent.querySelectorAll('.code-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = parent.querySelector('#' + target);
        if (panel) panel.classList.add('active');
      });
    });

    // Custom back button logic (overrides the dashboard back button to go to /beginner)
    const backBtn = document.getElementById('beginner-back-btn');
    if (backBtn) {
      backBtn.onclick = (e) => {
        e.preventDefault();
        navigate('/beginner');
      };
    }

    // Scroll spy for contents
    const navItems = Array.from(document.querySelectorAll('.sidebar a.nav-item'));
    if (navItems.length === 0) return;

    navItems.forEach(item => {
      item.onclick = (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            const y = targetEl.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }
      };
    });
  }, [navigate]);

  return (
    <ModuleLayout title="Control Statements" moduleId={2}>
      <div className="module-content">
        
        {/* SIDEBAR */}
        <aside className="sidebar" dangerouslySetInnerHTML={{ __html: `
          <div style="padding: 0 20px 24px; margin-bottom: 16px;">
            <a id="beginner-back-btn" href="/beginner" class="nav-btn" style="border: none; padding: 8px 0;">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" />
              </svg>Back to Dashboard
            </a>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width: ${completedPct}%;"></div></div>
          <div class="progress-label">${completedPct}% complete</div>

          <div class="nav-section">Contents</div>
          <a class="nav-item" href="#hero"><span class="nav-dot"></span>Overview</a>
          <a class="nav-item" href="#theory"><span class="nav-dot"></span>Theory</a>
          <a class="nav-item" href="#flowchart"><span class="nav-dot"></span>Decision Flow</a>
          <a class="nav-item" href="#section-simulation"><span class="nav-dot"></span>Simulation</a>
          <a class="nav-item" href="#code"><span class="nav-dot"></span>Code Examples</a>
          <a class="nav-item" href="#complexity"><span class="nav-dot"></span>Complexity</a>
          <a class="nav-item" href="#practice"><span class="nav-dot"></span>Practice</a>
          <a class="nav-item" href="#summary"><span class="nav-dot"></span>Summary</a>
        ` }} />

        <div className="main">
          {/* HERO */}
          <div className="hero" id="hero" dangerouslySetInnerHTML={{ __html: `
            <div class="hero-visual">FLOW</div>
            <div class="hero-inner">
              <div class="hero-badges">
                <span class="badge badge-purple">⚡ Beginner</span>
                <span class="badge badge-blue">⏱ 35 min read</span>
              </div>
              <h1 class="hero-title">Control Flow:<br>if, else & switch</h1>
              <p class="hero-sub">Master the decision-making backbone of C programming. Learn how programs evaluate conditions and branch into different execution paths.</p>
              <div class="hero-meta">
                <div class="hero-meta-item">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5v5l3 3"/>
                  </svg>~35 min
                </div>
                <div class="hero-meta-item">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>Comprehensive Guide
                </div>
              </div>
            </div>
          ` }} />

          <div className="content">
            <div dangerouslySetInnerHTML={{ __html: `
            <!-- OVERVIEW -->
            <section id="overview">
              <div class="section-label">01 / Overview</div>
              <div class="section-title">Topic Overview</div>
              <p class="section-desc">Control flow statements determine the order in which a program's statements execute. Decision-making constructs like <code>if</code>, <code>else</code>, and <code>switch</code> allow a program to evaluate a condition and choose which block of code to run.</p>
              
              <div class="info-box">
                <strong>💡 KEY INSIGHT:</strong> Without control flow, every program would execute top-to-bottom with no ability to react to data. Decision-making turns a static script into dynamic, intelligent software.
              </div>
            </section>

            <!-- THEORY -->
            <section id="theory">
              <div class="section-label">02 / Theory</div>
              <div class="section-title">Core Concepts</div>
              <p class="section-desc">A deep dive into C's main conditional constructs.</p>

              <div class="cards-grid">
                <div class="card">
                  <div class="card-icon" style="background:rgba(139,92,246,.15)">01</div>
                  <div class="card-title">if statement</div>
                  <div class="card-desc">Executes a block only when the condition is true (non-zero). If false, the block is skipped entirely and execution resumes after the closing brace.</div>
                </div>

                <div class="card">
                  <div class="card-icon" style="background:rgba(6,182,212,.15)">02</div>
                  <div class="card-title">if-else statement</div>
                  <div class="card-desc">Exactly two possible paths. If condition is true, first block runs. If false, the else block runs. One of the two blocks always executes.</div>
                </div>

                <div class="card">
                  <div class="card-icon" style="background:rgba(16,185,129,.15)">03</div>
                  <div class="card-title">else-if chain</div>
                  <div class="card-desc">Handles more than two outcomes. Conditions are checked in order — the first true one executes and the rest are skipped. Always use braces to avoid dangling else.</div>
                </div>

                <div class="card">
                  <div class="card-icon" style="background:rgba(236,72,153,.15)">04</div>
                  <div class="card-title">switch statement</div>
                  <div class="card-desc">When one variable is compared against many constant values. The program jumps directly to the matching case. Without break, execution falls through to the next case.</div>
                </div>
              </div>
            </section>

            <!-- FLOWCHART -->
            <section id="flowchart">
              <div class="section-label">03 / Flowchart</div>
              <div class="section-title">Decision Flow Diagram</div>
              <p class="section-desc">Visualizing the execution path in an <code>if / else-if / else</code> chain.</p>

              <div style="display:flex; justify-content:center; margin-top:20px;">
                <div class="card" style="display:flex; flex-direction:column; align-items:center; padding:24px; border-color:var(--border2); width:100%; max-width:550px; background:var(--card);">
                  <div style="font-weight:600; font-size:14px; color:var(--text3); margin-bottom:16px; text-transform:uppercase; letter-spacing:1px;">Decision Path</div>
                  
                  <div style="display:flex; align-items:center; gap:12px; width:100%; justify-content:center;">
                    <div class="card" style="width:130px; text-align:center; padding:8px; border-color:var(--accent);">
                      <div style="font-weight:600; color:var(--text); font-size:13px;">START</div>
                    </div>
                    <div style="color:var(--text3); font-size:16px;">➔</div>
                    <div class="card" style="width:160px; text-align:center; padding:8px; border-color:var(--yellow);">
                      <div style="font-weight:600; color:var(--text); font-size:13px;">Condition 1</div>
                    </div>
                    <div style="color:var(--green); font-size:12px; font-weight:700;">TRUE ➔</div>
                    <div class="card" style="width:130px; text-align:center; padding:8px; border-color:var(--green);">
                      <div style="font-weight:600; color:var(--text); font-size:13px;">Block 1 runs</div>
                    </div>
                  </div>

                  <div style="color:var(--text3); font-size:16px; margin:4px 0; text-align:left; width:60%; padding-left:14px;">↓ <span style="font-size:10px; color:var(--red); font-weight:700; margin-left:8px;">NO</span></div>

                  <div style="display:flex; align-items:center; gap:12px; width:100%; justify-content:center;">
                    <div style="width:130px;"></div>
                    <div style="color:var(--text3); font-size:16px; visibility:hidden;">➔</div>
                    <div class="card" style="width:160px; text-align:center; padding:8px; border-color:var(--yellow);">
                      <div style="font-weight:600; color:var(--text); font-size:13px;">Condition 2</div>
                    </div>
                    <div style="color:var(--green); font-size:12px; font-weight:700;">TRUE ➔</div>
                    <div class="card" style="width:130px; text-align:center; padding:8px; border-color:var(--green);">
                      <div style="font-weight:600; color:var(--text); font-size:13px;">Block 2 runs</div>
                    </div>
                  </div>

                  <div style="color:var(--text3); font-size:16px; margin:4px 0; text-align:left; width:60%; padding-left:14px;">↓ <span style="font-size:10px; color:var(--red); font-weight:700; margin-left:8px;">NO</span></div>

                  <div style="display:flex; align-items:center; gap:12px; width:100%; justify-content:center;">
                    <div style="width:130px;"></div>
                    <div style="color:var(--text3); font-size:16px; visibility:hidden;">➔</div>
                    <div class="card" style="width:160px; text-align:center; padding:8px; border-color:var(--red);">
                      <div style="font-weight:600; color:var(--text); font-size:13px;">else block</div>
                    </div>
                    <div style="color:var(--accent3); font-size:12px; font-weight:700;">FALLBACK ➔</div>
                    <div class="card" style="width:130px; text-align:center; padding:8px; border-color:var(--accent3);">
                      <div style="font-weight:600; color:var(--text); font-size:13px;">Fallback runs</div>
                    </div>
                  </div>

                  <div style="color:var(--text3); font-size:20px; margin-top:12px;">↓</div>
                  <div class="card" style="width:130px; text-align:center; padding:8px; border-color:var(--accent2);">
                    <div style="font-weight:600; color:var(--text); font-size:13px;">END</div>
                  </div>
                </div>
              </div>

              <div class="cards-grid" style="margin-top:24px;">
                <div class="card" style="border-left: 3px solid var(--accent3);">
                  <div style="font-size:12px; letter-spacing:1px; color:var(--accent3); text-transform:uppercase; margin-bottom:8px; font-weight:600;">When to use switch</div>
                  <ul style="color:var(--text2); line-height:1.6; padding-left:14px; margin:0; font-size:13px; list-style-type:circle;">
                    <li>Comparing one variable to fixed int/char constants</li>
                    <li>Menu selections, day-of-week, state machines</li>
                    <li>4+ integer cases (compiler optimizes to O(1))</li>
                  </ul>
                </div>
                <div class="card" style="border-left: 3px solid var(--accent);">
                  <div style="font-size:12px; letter-spacing:1px; color:var(--accent); text-transform:uppercase; margin-bottom:8px; font-weight:600;">When to use if-else</div>
                  <ul style="color:var(--text2); line-height:1.6; padding-left:14px; margin:0; font-size:13px; list-style-type:circle;">
                    <li>Checking ranges or float comparisons</li>
                    <li>Complex boolean expressions</li>
                    <li>Multiple variables in one condition</li>
                  </ul>
                </div>
              </div>
            </section>
            ` }} />

            <InteractiveVisualizer />

            <div dangerouslySetInnerHTML={{ __html: `
            <!-- CODE -->
            <section id="code">
              <div class="section-label">04 / Code Examples</div>
              <div class="section-title">Pseudocode Implementation</div>
              <p class="section-desc">Observe the logic and structure of conditional control statements using language-independent pseudocode.</p>

              <div class="code-block-wrapper" style="margin-bottom:32px;">
                <div class="code-header">
                  <div class="code-header-left">
                    <div class="code-tabs">
                      <div class="code-tab active" data-target="if-pseudo-panel">1 — The if statement</div>
                      <div class="code-tab" data-target="ifelse-pseudo-panel">2 — The if-else statement</div>
                      <div class="code-tab" data-target="switch-pseudo-panel">3 — The switch statement</div>
                    </div>
                  </div>
                  <button class="copy-btn" onclick="navigator.clipboard.writeText(document.querySelector('.code-panel.active pre').innerText)">Copy</button>
                </div>
                
                <div id="pseudo-blocks">
                  <!-- IF BASIC PSEUDO -->
                  <div class="code-panel active" id="if-pseudo-panel">
                    <pre><span class="cmt"># 1. Basic If</span>
<span class="kw">if</span> <span class="var">condition</span> <span class="kw">then</span>
    <span class="cmt">// code to execute if condition is true</span>
<span class="kw">end if</span></pre>
                  </div>

                  <!-- IF ELSE PSEUDO -->
                  <div class="code-panel" id="ifelse-pseudo-panel">
                    <pre><span class="cmt"># 2. If-Else</span>
<span class="kw">if</span> <span class="var">condition</span> <span class="kw">then</span>
    <span class="cmt">// code to execute if condition is true</span>
<span class="kw">else</span>
    <span class="cmt">// code to execute if condition is false</span>
<span class="kw">end if</span></pre>
                  </div>

                  <!-- SWITCH PSEUDO -->
                  <div class="code-panel" id="switch-pseudo-panel">
                    <pre><span class="cmt"># 3. Switch Case</span>
<span class="kw">switch</span> <span class="var">expression</span>
    <span class="kw">case</span> <span class="num">value1</span>:
        <span class="cmt">// execute if expression equals value1</span>
    <span class="kw">case</span> <span class="num">value2</span>:
        <span class="cmt">// execute if expression equals value2</span>
    <span class="kw">default</span>:
        <span class="cmt">// execute if no case matches</span>
<span class="kw">end switch</span></pre>
                  </div>
                </div>
              </div>

              <div class="section-title">Language Syntax</div>
              <p class="section-desc">See how these pseudocode concepts translate into proper syntax across popular programming languages.</p>

              <div class="code-block-wrapper" style="margin-bottom:24px;">
                <div class="code-header">
                  <div class="code-header-left">
                    <div class="code-tabs">
                      <div class="code-tab active" data-target="c-panel">C</div>
                      <div class="code-tab" data-target="cpp-panel">C++</div>
                      <div class="code-tab" data-target="java-panel">Java</div>
                      <div class="code-tab" data-target="py-panel">Python</div>
                    </div>
                  </div>
                  <button class="copy-btn" onclick="navigator.clipboard.writeText(document.querySelector('.code-panel.active pre').innerText)">Copy</button>
                </div>
                
                <div id="lang-blocks">
                  <!-- C -->
                  <div class="code-panel active" id="c-panel">
                    <pre><span class="cmt">// 1. Basic If</span>
<span class="kw">if</span>(<span class="var">num</span> <span class="op">&gt;</span> <span class="num">0</span>) {
    <span class="fn">printf</span>(<span class="str">"Positive\\n"</span>)<span class="punc">;</span>
}

<span class="cmt">// 2. If-Else</span>
<span class="kw">if</span>(<span class="var">num</span> <span class="op">%</span> <span class="num">2</span> <span class="op">==</span> <span class="num">0</span>) {
    <span class="fn">printf</span>(<span class="str">"Even\\n"</span>)<span class="punc">;</span>
} <span class="kw">else</span> {
    <span class="fn">printf</span>(<span class="str">"Odd\\n"</span>)<span class="punc">;</span>
}

<span class="cmt">// 3. Switch</span>
<span class="kw">switch</span>(<span class="var">day</span>) {
    <span class="kw">case</span> <span class="num">1</span>: <span class="fn">printf</span>(<span class="str">"Monday\\n"</span>)<span class="punc">;</span> <span class="kw">break</span><span class="punc">;</span>
    <span class="kw">case</span> <span class="num">2</span>: <span class="fn">printf</span>(<span class="str">"Tuesday\\n"</span>)<span class="punc">;</span> <span class="kw">break</span><span class="punc">;</span>
    <span class="kw">default</span>: <span class="fn">printf</span>(<span class="str">"Invalid\\n"</span>)<span class="punc">;</span>
}</pre>
                  </div>

                  <!-- C++ -->
                  <div class="code-panel" id="cpp-panel">
                    <pre><span class="cmt">// 1. Basic If</span>
<span class="kw">if</span>(<span class="var">num</span> <span class="op">&gt;</span> <span class="num">0</span>) {
    <span class="fn">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"Positive\\n"</span><span class="punc">;</span>
}

<span class="cmt">// 2. If-Else</span>
<span class="kw">if</span>(<span class="var">num</span> <span class="op">%</span> <span class="num">2</span> <span class="op">==</span> <span class="num">0</span>) {
    <span class="fn">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"Even\\n"</span><span class="punc">;</span>
} <span class="kw">else</span> {
    <span class="fn">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"Odd\\n"</span><span class="punc">;</span>
}

<span class="cmt">// 3. Switch</span>
<span class="kw">switch</span>(<span class="var">day</span>) {
    <span class="kw">case</span> <span class="num">1</span>: <span class="fn">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"Monday\\n"</span><span class="punc">;</span> <span class="kw">break</span><span class="punc">;</span>
    <span class="kw">case</span> <span class="num">2</span>: <span class="fn">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"Tuesday\\n"</span><span class="punc">;</span> <span class="kw">break</span><span class="punc">;</span>
    <span class="kw">default</span>: <span class="fn">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"Invalid\\n"</span><span class="punc">;</span>
}</pre>
                  </div>

                  <!-- JAVA -->
                  <div class="code-panel" id="java-panel">
                    <pre><span class="cmt">// 1. Basic If</span>
<span class="kw">if</span>(<span class="var">num</span> <span class="op">&gt;</span> <span class="num">0</span>) {
    <span class="fn">System.out.println</span>(<span class="str">"Positive"</span>)<span class="punc">;</span>
}

<span class="cmt">// 2. If-Else</span>
<span class="kw">if</span>(<span class="var">num</span> <span class="op">%</span> <span class="num">2</span> <span class="op">==</span> <span class="num">0</span>) {
    <span class="fn">System.out.println</span>(<span class="str">"Even"</span>)<span class="punc">;</span>
} <span class="kw">else</span> {
    <span class="fn">System.out.println</span>(<span class="str">"Odd"</span>)<span class="punc">;</span>
}

<span class="cmt">// 3. Switch</span>
<span class="kw">switch</span>(<span class="var">day</span>) {
    <span class="kw">case</span> <span class="num">1</span>: <span class="fn">System.out.println</span>(<span class="str">"Monday"</span>)<span class="punc">;</span> <span class="kw">break</span><span class="punc">;</span>
    <span class="kw">case</span> <span class="num">2</span>: <span class="fn">System.out.println</span>(<span class="str">"Tuesday"</span>)<span class="punc">;</span> <span class="kw">break</span><span class="punc">;</span>
    <span class="kw">default</span>: <span class="fn">System.out.println</span>(<span class="str">"Invalid"</span>)<span class="punc">;</span>
}</pre>
                  </div>

                  <!-- PYTHON -->
                  <div class="code-panel" id="py-panel">
                    <pre><span class="cmt"># 1. Basic If</span>
<span class="kw">if</span> <span class="var">num</span> <span class="op">&gt;</span> <span class="num">0</span>:
    <span class="fn">print</span>(<span class="str">"Positive"</span>)

<span class="cmt"># 2. If-Else</span>
<span class="kw">if</span> <span class="var">num</span> <span class="op">%</span> <span class="num">2</span> <span class="op">==</span> <span class="num">0</span>:
    <span class="fn">print</span>(<span class="str">"Even"</span>)
<span class="kw">else</span>:
    <span class="fn">print</span>(<span class="str">"Odd"</span>)

<span class="cmt"># 3. Match-Case (Python 3.10+)</span>
<span class="kw">match</span> <span class="var">day</span>:
    <span class="kw">case</span> <span class="num">1</span>:
        <span class="fn">print</span>(<span class="str">"Monday"</span>)
    <span class="kw">case</span> <span class="num">2</span>:
        <span class="fn">print</span>(<span class="str">"Tuesday"</span>)
    <span class="kw">case _</span>:
        <span class="fn">print</span>(<span class="str">"Invalid"</span>)</pre>
                  </div>
                </div>
              </div>
            </section>
            <!-- COMPLEXITY -->
            <section id="complexity">
              <div class="section-label">05 / Complexity</div>
              <div class="section-title">Complexity Analysis</div>
              <p class="section-desc">Comparing the runtime characteristics of decision statement constructs.</p>

              <table class="lit-table">
                <tr>
                  <th>Metric / Construct</th>
                  <th>Best Case</th>
                  <th>Average Case</th>
                  <th>Worst Case</th>
                  <th>Space Complexity</th>
                </tr>
                <tr>
                  <td><strong>if-else chain</strong></td>
                  <td>O(1)</td>
                  <td>O(n/2)</td>
                  <td>O(n)</td>
                  <td>O(1)</td>
                </tr>
                <tr>
                  <td><strong>switch statement</strong></td>
                  <td>O(1)</td>
                  <td>O(1)</td>
                  <td>O(1)</td>
                  <td>O(1)</td>
                </tr>
              </table>

              <div class="success-box" style="margin-top:20px;">
                <strong>⚡ SWITCH ADVANTAGE:</strong> The compiler can optimize a switch into a <strong>jump table</strong>, achieving O(1) lookup regardless of how many cases exist.
              </div>
            </section>

            </section>
            ` }} />

            {/* PRACTICE (Dynamic) */}
            <section id="practice">
              <div className="section-label">06 / Practice</div>
              <div className="section-title">Practice Challenges</div>
              <p className="section-desc">Try writing programs for these common scenarios using control statements:</p>

              <div className="cards-grid">
                {practiceProblems.length === 0 ? (
                  <div className="text-gray-400 text-sm">Loading challenges...</div>
                ) : (
                  practiceProblems.map((p, idx) => {
                    const isCompleted = completedProblems.includes(p.id);
                    return (
                    <div 
                      key={p.id} 
                      className="card cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 bg-[#1e1e24]" 
                      style={{ borderTop: `3px solid ${isCompleted ? 'var(--green)' : idx % 2 === 0 ? 'var(--accent)' : 'var(--accent3)'}` }}
                      onClick={() => setActivePracticeProblem(p.id)}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                          {isCompleted ? <CheckCircle size={18} /> : <Code2 size={18} />}
                        </div>
                        <div className="card-title m-0 text-lg">{idx + 1}. {p.title}</div>
                      </div>
                      <div className="card-desc text-gray-400 text-sm mb-6" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {p.description.split('\n')[0].replace(/`/g, '')}
                      </div>
                      <div className="flex items-center justify-between">
                        {isCompleted ? (
                          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                            <Check size={14} /> Completed
                          </span>
                        ) : (
                          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded shadow-lg shadow-blue-900/20 transition-colors">
                            Solve Challenge
                          </button>
                        )}
                      </div>
                    </div>
                  )})
                )}
              </div>
            </section>

            {/* SUMMARY */}
            <div dangerouslySetInnerHTML={{ __html: `
            <section id="summary">
              <div class="section-label">07 / Summary</div>
              <div class="section-title">Quick Review</div>
              <div class="summary-grid">
                <div class="summary-card">
                  <div class="s-num">01</div>
                  <div class="s-title">if</div>
                  <div class="s-text">Conditional single-path statement. Runs code only if statement is true.</div>
                </div>
                <div class="summary-card">
                  <div class="s-num">02</div>
                  <div class="s-title">if-else</div>
                  <div class="s-text">Two-path decision statement. Exactly one block is guaranteed to run.</div>
                </div>
                <div class="summary-card">
                  <div class="s-num">03</div>
                  <div class="s-title">switch</div>
                  <div class="s-text">Direct branching using integer/char constants. Uses break to prevent fall-through.</div>
                </div>
                <div class="summary-card">
                  <div class="s-num">04</div>
                  <div class="s-title">Complexity</div>
                  <div class="s-text">Switch optimizes to O(1) jump tables, while else-if is O(n) average-case scan.</div>
                </div>
              </div>
            </section>
            ` }} />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full">
        <div className="max-w-[980px] mx-auto">
          <div className="module-nav flex items-center justify-between mt-12 pt-6 border-t border-slate-200 dark:border-white/10 mb-20 px-10">
            <button 
              onClick={() => navigate('/beginner')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-accent-cyan hover:shadow-lg hover:shadow-primary-500/25 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Hub
            </button>

            <button 
              onClick={() => navigate('/beginner')}
              disabled={!allCompleted}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all ${
                allCompleted 
                  ? 'bg-gradient-to-r from-primary-500 to-accent-cyan hover:shadow-lg hover:shadow-primary-500/25' 
                  : 'bg-gray-600 opacity-50 cursor-not-allowed'
              }`}
              title={!allCompleted ? "Solve all challenges to unlock" : ""}
            >
              {allCompleted ? "Finish Lesson" : "Complete Challenges to Finish"}
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activePracticeProblem && (
          <CodingArenaOverlay 
            problemId={activePracticeProblem} 
            onClose={() => setActivePracticeProblem(null)} 
          />
        )}
      </AnimatePresence>
    </ModuleLayout>
  );
}
