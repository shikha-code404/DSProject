import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import ModuleLayout from '../../components/layout/ModuleLayout';
import './PrereqModules.css';

export default function ControlStatements() {
  const navigate = useNavigate();

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
      <div 
        className="module-content" 
        dangerouslySetInnerHTML={{ __html: `
        
        <!-- SIDEBAR -->
        <aside class="sidebar">
          <div style="padding: 0 20px 24px; margin-bottom: 16px;">
            <a id="beginner-back-btn" href="/beginner" class="nav-btn" style="border: none; padding: 8px 0;">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" />
              </svg>Back to Beginner Hub
            </a>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width: 100%;"></div></div>
          <div class="progress-label">Active Lesson</div>

          <div class="nav-section">Contents</div>
          <a class="nav-item active" href="#hero"><span class="nav-dot"></span>Overview</a>
          <a class="nav-item" href="#theory"><span class="nav-dot"></span>Theory</a>
          <a class="nav-item" href="#flowchart"><span class="nav-dot"></span>Decision Flow</a>
          <a class="nav-item" href="#code"><span class="nav-dot"></span>Code Examples</a>
          <a class="nav-item" href="#complexity"><span class="nav-dot"></span>Complexity</a>
          <a class="nav-item" href="#practice"><span class="nav-dot"></span>Practice</a>
          <a class="nav-item" href="#summary"><span class="nav-dot"></span>Summary</a>
        </aside>

        <div class="main">
          <!-- HERO -->
          <div class="hero" id="hero">
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
          </div>

          <div class="content">
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

            <!-- CODE -->
            <section id="code">
              <div class="section-label">04 / Code Examples</div>
              <div class="section-title">Code Implementation</div>
              <p class="section-desc">Observe the syntax and structure of conditional control statements.</p>

              <div class="code-block-wrapper" style="margin-bottom:24px;">
                <div class="code-header">
                  <div class="code-header-left">
                    <div class="code-tabs">
                      <div class="code-tab active" data-target="if-basic-panel">1 — The if statement</div>
                      <div class="code-tab" data-target="if-else-panel">2 — The if-else statement</div>
                      <div class="code-tab" data-target="switch-panel">3 — The switch statement</div>
                    </div>
                  </div>
                  <button class="copy-btn" onclick="navigator.clipboard.writeText(document.querySelector('.code-panel.active pre').innerText)">Copy</button>
                </div>
                
                <div id="code-content-blocks">
                  <!-- IF BASIC -->
                  <div class="code-panel active" id="if-basic-panel">
                    <pre><span class="cmt">// if_basic.c</span>
<span class="kw">#include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> <span class="var">num</span> <span class="op">=</span> <span class="num">10</span><span class="punc">;</span>
    <span class="kw">if</span>(<span class="var">num</span> <span class="op">&gt;</span> <span class="num">0</span>) {
        <span class="fn">printf</span>(<span class="str">"Number is positive\\n"</span>)<span class="punc">;</span>
    }
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                  </div>

                  <!-- IF ELSE -->
                  <div class="code-panel" id="if-else-panel">
                    <pre><span class="cmt">// if_else.c</span>
<span class="kw">#include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> <span class="var">num</span> <span class="op">=</span> <span class="num">5</span><span class="punc">;</span>
    <span class="kw">if</span>(<span class="var">num</span> <span class="op">%</span> <span class="num">2</span> <span class="op">==</span> <span class="num">0</span>)
        <span class="fn">printf</span>(<span class="str">"Even number\\n"</span>)<span class="punc">;</span>
    <span class="kw">else</span>
        <span class="fn">printf</span>(<span class="str">"Odd number\\n"</span>)<span class="punc">;</span>
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                  </div>

                  <!-- SWITCH -->
                  <div class="code-panel" id="switch-panel">
                    <pre><span class="cmt">// switch_day.c</span>
<span class="kw">#include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> <span class="var">day</span> <span class="op">=</span> <span class="num">2</span><span class="punc">;</span>
    <span class="kw">switch</span>(<span class="var">day</span>) {
        <span class="kw">case</span> <span class="num">1</span>: <span class="fn">printf</span>(<span class="str">"Monday\\n"</span>)<span class="punc">;</span>    <span class="kw">break</span><span class="punc">;</span>
        <span class="kw">case</span> <span class="num">2</span>: <span class="fn">printf</span>(<span class="str">"Tuesday\\n"</span>)<span class="punc">;</span>   <span class="kw">break</span><span class="punc">;</span>
        <span class="kw">case</span> <span class="num">3</span>: <span class="fn">printf</span>(<span class="str">"Wednesday\\n"</span>)<span class="punc">;</span> <span class="kw">break</span><span class="punc">;</span>
        <span class="kw">default</span>: <span class="fn">printf</span>(<span class="str">"Invalid day\\n"</span>)<span class="punc">;</span>
    }
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
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

            <!-- PRACTICE -->
            <section id="practice">
              <div class="section-label">06 / Practice</div>
              <div class="section-title">Practice Challenges</div>
              <p class="section-desc">Try writing programs for these common scenarios using control statements:</p>

              <div class="cards-grid">
                <div class="card" style="border-top:2px solid var(--green)">
                  <div class="card-title">1. Leap Year Checker</div>
                  <div class="card-desc">Write an if-else condition to check if a given year is a leap year. Rules: divisible by 4, but not by 100 unless also divisible by 400.</div>
                </div>
                <div class="card" style="border-top:2px solid var(--accent3)">
                  <div class="card-title">2. Grade Calculator</div>
                  <div class="card-desc">Use a structured else-if chain to accept a score (0-100) and output the corresponding grade: A (>=90), B (>=80), C (>=70), else F.</div>
                </div>
              </div>
            </section>

            <!-- SUMMARY -->
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
          </div>
        </div>
        ` }} 
      />

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
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-accent-cyan hover:shadow-lg hover:shadow-primary-500/25 transition-all"
            >
              Finish Lesson
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
