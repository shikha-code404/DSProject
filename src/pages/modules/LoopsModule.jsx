import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import ModuleLayout from '../../components/layout/ModuleLayout';
import './PrereqModules.css';

export default function LoopsModule() {
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
    <ModuleLayout title="Loops" moduleId={3}>
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
          <a class="nav-item" href="#components"><span class="nav-dot"></span>Core Components</a>
          <a class="nav-item" href="#types"><span class="nav-dot"></span>Loop Types</a>
          <a class="nav-item" href="#code"><span class="nav-dot"></span>Code Examples</a>
          <a class="nav-item" href="#practice"><span class="nav-dot"></span>Practice</a>
          <a class="nav-item" href="#summary"><span class="nav-dot"></span>Summary</a>
        </aside>

        <div class="main">
          <!-- HERO -->
          <div class="hero" id="hero">
            <div class="hero-visual">LOOP</div>
            <div class="hero-inner">
              <div class="hero-badges">
                <span class="badge badge-purple">⚡ Beginner</span>
                <span class="badge badge-blue">⏱ 40 min read</span>
              </div>
              <h1 class="hero-title">Mastering Loops:<br>Automation & Repetition</h1>
              <p class="hero-sub">Learn how to control program execution paths by repeating instructions cleanly. Explore for, while, do-while, and nested structures.</p>
              <div class="hero-meta">
                <div class="hero-meta-item">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5v5l3 3"/>
                  </svg>~40 min
                </div>
                <div class="hero-meta-item">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>Interactive Guide
                </div>
              </div>
            </div>
          </div>

          <div class="content">
            <!-- OVERVIEW -->
            <section id="overview">
              <div class="section-label">01 / Overview</div>
              <div class="section-title">What are Loops?</div>
              <p class="section-desc">A loop is a programming construct that repeats a block of instructions multiple times until a specific condition is met. Instead of writing the same code repeatedly, loops allow programmers to automate repetitive tasks efficiently.</p>
              
              <div class="info-box">
                <strong>💡 KEY INSIGHT:</strong> Computers excel at repetitive operations. Loops enable us to run code millions of times efficiently with minimal instruction syntax, complying with the DRY (Don't Repeat Yourself) principle.
              </div>

              <div class="section-title" style="margin-top: 32px;">Why Loops Matter</div>
              <div class="cards-grid">
                <div class="card">
                  <div class="card-icon" style="background:rgba(139,92,246,.15)">✨</div>
                  <div class="card-title">Eliminate Redundancy</div>
                  <div class="card-desc">Reduce code repetition and save massive development time. Make programs shorter and cleaner.</div>
                </div>

                <div class="card">
                  <div class="card-icon" style="background:rgba(6,182,212,.15)">📖</div>
                  <div class="card-title">Better Maintainability</div>
                  <div class="card-desc">Make programs shorter, readable, and easier to maintain by centralizing iterative logic.</div>
                </div>

                <div class="card">
                  <div class="card-icon" style="background:rgba(16,185,129,.15)">⚙️</div>
                  <div class="card-title">Automation Engine</div>
                  <div class="card-desc">Automate repetitive tasks like extensive data processing, complex calculations, and collections traversal.</div>
                </div>

                <div class="card">
                  <div class="card-icon" style="background:rgba(236,72,153,.15)">🏆</div>
                  <div class="card-title">Essential Algorithm Base</div>
                  <div class="card-desc">Crucial for pattern generation, matrix manipulation, multi-dimensional search, and continuous game rendering loops.</div>
                </div>
              </div>

              <div class="section-title" style="margin-top: 32px;">Real-World Applications</div>
              <div class="cards-grid">
                <div class="card">
                  <div class="card-title">📊 Processing Collections</div>
                  <div class="card-desc">Iterating sequentially through lists, arrays, maps, and databases to filter, map, or aggregate items.</div>
                </div>
                <div class="card">
                  <div class="card-title">🎨 Grids & Visuals</div>
                  <div class="card-desc">Generating structured mathematical tables, visual star patterns, pixel buffers, and coordinate system grids.</div>
                </div>
              </div>
            </section>

            <!-- CORE COMPONENTS -->
            <section id="components">
              <div class="section-label">02 / Theory</div>
              <div class="section-title">3 Core Components of Every Loop</div>
              <p class="section-desc">To function correctly and avoid running indefinitely, every standard loop relies on three essential control components:</p>

              <div class="cards-grid">
                <div class="card" style="border-top: 3px solid var(--accent);">
                  <div class="card-icon" style="background:rgba(59,130,246,.15)">1</div>
                  <div class="card-title">Initialization</div>
                  <div class="card-desc">Assigns a starting value to the loop control variable. Runs exactly once before the loop cycles start.</div>
                </div>

                <div class="card" style="border-top: 3px solid var(--yellow);">
                  <div class="card-icon" style="background:rgba(245,158,11,.15)">2</div>
                  <div class="card-title">Condition</div>
                  <div class="card-desc">A logical/boolean test evaluated before or after each iteration. If true, the loop continues; if false, it terminates.</div>
                </div>

                <div class="card" style="border-top: 3px solid var(--green);">
                  <div class="card-icon" style="background:rgba(16,185,129,.15)">3</div>
                  <div class="card-title">Update</div>
                  <div class="card-desc">Modifies the loop control variable at the end of each iteration, ensuring the condition eventually becomes false.</div>
                </div>
              </div>
            </section>

            <!-- LOOP TYPES -->
            <section id="types">
              <div class="section-label">03 / loop types</div>
              <div class="section-title">The Four Main Loop Types</div>
              <p class="section-desc">Depending on the problem context, choose the optimal loop syntax from these options:</p>

              <div class="cards-grid">
                <div class="card">
                  <div class="card-icon" style="background:rgba(139,92,246,.15)">🔄</div>
                  <div class="card-title">while Loop</div>
                  <div class="card-desc">Condition is checked <strong>before</strong> the body executes. If false initially, the block is never run. Perfect for situations where the number of iterations is unknown in advance.</div>
                </div>

                <div class="card">
                  <div class="card-icon" style="background:rgba(6,182,212,.15)">🔁</div>
                  <div class="card-title">do-while Loop</div>
                  <div class="card-desc">Body executes <strong>at least once</strong> before evaluating the condition. Ideal for prompt inputs, reading user inputs, menu programs, and verification loops.</div>
                </div>

                <div class="card">
                  <div class="card-icon" style="background:rgba(16,185,129,.15)">⚡</div>
                  <div class="card-title">for Loop</div>
                  <div class="card-desc">Combines initialization, condition, and update into <strong>one compact line</strong>. The absolute best fit when the number of iterations is predetermined. Most popular and widely used loop.</div>
                </div>

                <div class="card">
                  <div class="card-icon" style="background:rgba(236,72,153,.15)">🔲</div>
                  <div class="card-title">Nested Loops</div>
                  <div class="card-desc">A loop placed inside the body of another loop. The inner loop runs completely for every single iteration of the outer loop. Essential for 2D matrices, grids, and patterns.</div>
                </div>
              </div>
            </section>

            <!-- CODE EXAMPLES -->
            <section id="code">
              <div class="section-label">04 / Code Examples</div>
              <div class="section-title">Code Implementations</div>
              <p class="section-desc">Observe the clean implementation structures of the loop types in action.</p>

              <div class="code-block-wrapper" style="margin-bottom:24px;">
                <div class="code-header">
                  <div class="code-header-left">
                    <div class="code-tabs">
                      <div class="code-tab active" data-target="for-loop-panel">1 — for Loop</div>
                      <div class="code-tab" data-target="while-loop-panel">2 — while Loop</div>
                      <div class="code-tab" data-target="do-while-loop-panel">3 — do-while Loop</div>
                      <div class="code-tab" data-target="nested-loop-panel">4 — Nested Loops</div>
                    </div>
                  </div>
                  <button class="copy-btn" onclick="navigator.clipboard.writeText(document.querySelector('.code-panel.active pre').innerText)">Copy</button>
                </div>
                
                <div id="code-content-blocks">
                  <!-- FOR LOOP -->
                  <div class="code-panel active" id="for-loop-panel">
                    <pre><span class="cmt">// printing_numbers_for.c</span>
<span class="kw">#include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="cmt">// Best when iteration count is known in advance</span>
    <span class="kw">for</span>(<span class="kw">int</span> <span class="var">i</span> <span class="op">=</span> <span class="num">1</span><span class="punc">;</span> <span class="var">i</span> <span class="op">&lt;=</span> <span class="num">5</span><span class="punc">;</span> <span class="var">i</span><span class="op">++</span>) {
        <span class="fn">printf</span>(<span class="str">"Iteration: %d\\n"</span><span class="punc">,</span> <span class="var">i</span>)<span class="punc">;</span>
    }
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                  </div>

                  <!-- WHILE LOOP -->
                  <div class="code-panel" id="while-loop-panel">
                    <pre><span class="cmt">// countdown_while.c</span>
<span class="kw">#include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> <span class="var">count</span> <span class="op">=</span> <span class="num">5</span><span class="punc">;</span> <span class="cmt">// Initialization</span>
    
    <span class="kw">while</span>(<span class="var">count</span> <span class="op">&gt;</span> <span class="num">0</span>) { <span class="cmt">// Condition checked first</span>
        <span class="fn">printf</span>(<span class="str">"Count: %d\\n"</span><span class="punc">,</span> <span class="var">count</span>)<span class="punc">;</span>
        <span class="var">count</span><span class="op">--</span><span class="punc">;</span>       <span class="cmt">// Update variable</span>
    }
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                  </div>

                  <!-- DO WHILE LOOP -->
                  <div class="code-panel" id="do-while-loop-panel">
                    <pre><span class="cmt">// prompt_do_while.c</span>
<span class="kw">#include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> <span class="var">number</span><span class="punc">;</span>
    
    <span class="kw">do</span> {
        <span class="fn">printf</span>(<span class="str">"Enter a positive number to exit: "</span>)<span class="punc">;</span>
        <span class="fn">scanf</span>(<span class="str">"%d"</span><span class="punc">,</span> <span class="op">&amp;</span><span class="var">number</span>)<span class="punc">;</span>
    } <span class="kw">while</span>(<span class="var">number</span> <span class="op">&lt;=</span> <span class="num">0</span>)<span class="punc">;</span> <span class="cmt">// Checked after running once</span>
    
    <span class="fn">printf</span>(<span class="str">"Thank you! You entered: %d\\n"</span><span class="punc">,</span> <span class="var">number</span>)<span class="punc">;</span>
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                  </div>

                  <!-- NESTED LOOP -->
                  <div class="code-panel" id="nested-loop-panel">
                    <pre><span class="cmt">// grid_nested_loops.c</span>
<span class="kw">#include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="cmt">// Outer loop controls the rows</span>
    <span class="kw">for</span>(<span class="kw">int</span> <span class="var">row</span> <span class="op">=</span> <span class="num">1</span><span class="punc">;</span> <span class="var">row</span> <span class="op">&lt;=</span> <span class="num">3</span><span class="punc">;</span> <span class="var">row</span><span class="op">++</span>) {
        <span class="cmt">// Inner loop controls the columns</span>
        <span class="kw">for</span>(<span class="kw">int</span> <span class="var">col</span> <span class="op">=</span> <span class="num">1</span><span class="punc">;</span> <span class="var">col</span> <span class="op">&lt;=</span> <span class="num">3</span><span class="punc">;</span> <span class="var">col</span><span class="op">++</span>) {
            <span class="fn">printf</span>(<span class="str">"(%d,%d) "</span><span class="punc">,</span> <span class="var">row</span><span class="punc">,</span> <span class="var">col</span>)<span class="punc">;</span>
        }
        <span class="fn">printf</span>(<span class="str">"\\n"</span>)<span class="punc">;</span>
    }
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                  </div>
                </div>
              </div>
            </section>

            <!-- PRACTICE -->
            <section id="practice">
              <div class="section-label">05 / Practice</div>
              <div class="section-title">Practice Challenges</div>
              <p class="section-desc">Try writing small programs for these scenarios to build strong practical loops skills:</p>

              <div class="cards-grid">
                <div class="card" style="border-top:2px solid var(--green)">
                  <div class="card-title">1. Sum of first N Numbers</div>
                  <div class="card-desc">Write a <code>for</code> loop that sums numbers from 1 to N (e.g. 1 + 2 + 3 + ... + N) and prints the cumulative result.</div>
                </div>
                <div class="card" style="border-top:2px solid var(--accent3)">
                  <div class="card-title">2. Star Pattern Grid</div>
                  <div class="card-desc">Use nested loops to print a 5x5 grid of asterisks (<code>*</code>). Ensure columns are separated by spaces, and rows by newlines.</div>
                </div>
              </div>
            </section>

            <!-- SUMMARY -->
            <section id="summary">
              <div class="section-label">06 / Summary</div>
              <div class="section-title">Quick Review</div>
              <div class="summary-grid">
                <div class="summary-card">
                  <div class="s-num">01</div>
                  <div class="s-title">Initialization</div>
                  <div class="s-text">Sets the starting value for the loop control variable. Runs exactly once before loop cycles.</div>
                </div>
                <div class="summary-card">
                  <div class="s-num">02</div>
                  <div class="s-title">Condition</div>
                  <div class="s-text">Evaluated at every iteration to check if execution must continue. Loop stops once it evaluates to false.</div>
                </div>
                <div class="summary-card">
                  <div class="s-num">03</div>
                  <div class="s-title">Update</div>
                  <div class="s-text">Modifies the loop control variable inside or at the end of the loop, moving towards making the condition false.</div>
                </div>
                <div class="summary-card">
                  <div class="s-num">04</div>
                  <div class="s-title">Types</div>
                  <div class="s-text">Use <code>for</code> for counted tasks, <code>while</code> when counts are unknown, and <code>do-while</code> when body must execute once.</div>
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
