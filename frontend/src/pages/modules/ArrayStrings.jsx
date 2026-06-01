import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Code2, CheckCircle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import ModuleLayout from '../../components/layout/ModuleLayout';
import CodingArenaOverlay from '../../components/visualizers/CodingArenaOverlay';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import './PrereqModules.css';

export default function ArrayStrings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [practiceProblems, setPracticeProblems] = useState([]);
  const [activePracticeProblem, setActivePracticeProblem] = useState(null);
  const [completedProblems, setCompletedProblems] = useState([]);

  useEffect(() => {
    async function fetchProblems() {
      const { data } = await supabase.from('practice_problems').select('*').eq('module_id', 'array-string').order('title');
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
    // Custom back button logic (overrides the dashboard back button to go to /beginner)
    const backBtn = document.getElementById('beginner-back-btn');
    if (backBtn) {
      backBtn.onclick = (e) => {
        e.preventDefault();
        navigate('/beginner');
      };
    }
  }, [navigate]);

  return (
    <ModuleLayout title="Arrays & Strings" moduleId={4}>
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
          <a class="nav-item active" href="#hero"><span class="nav-dot"></span>Overview</a>
          <a class="nav-item" href="#arrays"><span class="nav-dot"></span>Arrays Theory</a>
          <a class="nav-item" href="#strings"><span class="nav-dot"></span>Strings Theory</a>
          <a class="nav-item" href="#code"><span class="nav-dot"></span>Code Examples</a>
          <a class="nav-item" href="#practice"><span class="nav-dot"></span>Practice</a>
          <a class="nav-item" href="#summary"><span class="nav-dot"></span>Summary</a>
        ` }} />

        <div className="main">
          {/* HERO */}
          <div className="hero" id="hero" dangerouslySetInnerHTML={{ __html: `
            <div class="hero-visual">MEM</div>
            <div class="hero-inner">
              <div class="hero-badges">
                <span class="badge badge-purple">⚡ Beginner</span>
                <span class="badge badge-blue">⏱ 35 min read</span>
              </div>
              <h1 class="hero-title">Basic Representation<br>& Indexing</h1>
              <p class="hero-sub">Learn how arrays and strings are stored in memory, how indexing works, and how to access and manipulate elements efficiently — the building blocks of every algorithm.</p>
              <div class="hero-meta">
                <div class="hero-meta-item">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5v5l3 3"/>
                  </svg>~35 min
                </div>
                <div class="hero-meta-item">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>4 Languages
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
              
              <div class="cards-grid">
                <div class="card">
                  <div class="card-icon" style="background:rgba(6,182,212,.15)">📌</div>
                  <div class="card-title">What is it?</div>
                  <div class="card-desc">Arrays store a collection of elements of the same data type in contiguous memory locations. Strings are sequences of characters terminated by a null character <code>'\\0'</code>.</div>
                </div>

                <div class="card">
                  <div class="card-icon" style="background:rgba(139,92,246,.15)">⚡</div>
                  <div class="card-title">Why does it matter?</div>
                  <div class="card-desc">Arrays and strings are the most fundamental data structures. Nearly every algorithm — sorting, searching, parsing — works on arrays or strings. Mastering them is the first step in DSA.</div>
                </div>

                <div class="card" style="grid-column: span 2">
                  <div class="card-icon" style="background:rgba(16,185,129,.15)">🌍</div>
                  <div class="card-title">Real-world use</div>
                  <div class="card-desc">Storing student marks, pixel data in images, text in editors, DNA sequences, database records, game boards, and even the stack and heap in OS memory management.</div>
                </div>
              </div>
            </section>

            <!-- ARRAYS THEORY -->
            <section id="arrays">
              <div class="section-label">02 / Theory</div>
              <div class="section-title">Arrays — Theory</div>
              <p class="section-desc">An array is a collection of elements of the same data type stored in contiguous memory locations. It allows efficient access using a numeric index, starting from 0.</p>

              <div class="info-box">
                <strong>💡 KEY INSIGHT:</strong> Because all elements are stored consecutively in memory, the CPU can compute the address of any element in constant time using:<br>
                <code style="background:rgba(255,255,255,0.08); padding:2px 6px; border-radius:4px;">address = base + index × size_of_type</code>
              </div>

              <h3 style="font-size:16px; margin: 24px 0 12px; color: var(--accent2);">Characteristics of Arrays</h3>
              <ul style="color:var(--text2); line-height:1.8; padding-left:20px; margin-bottom:24px;">
                <li>Stores multiple values of the same type</li>
                <li>Elements stored sequentially in memory</li>
                <li>Accessed using integer indexes</li>
                <li>Indexing starts from 0 (zero-indexed)</li>
                <li>Supports direct (random) access — O(1)</li>
                <li>Fixed size once declared</li>
              </ul>

              <h3 style="font-size:16px; margin: 24px 0 12px; color: var(--accent2);">Declaration Syntax</h3>
              <div class="card" style="padding:16px; margin-bottom:24px; border-left: 3px solid var(--accent3); background: var(--card);">
                <strong>Syntax:</strong><br>
                <code style="color: var(--accent3);">data_type array_name[size];</code><br><br>
                <strong>Example:</strong><br>
                <code>int marks[5];</code><br><br>
                <strong>With initialization:</strong><br>
                <code>int marks[5] = {90, 85, 78, 92, 88};</code>
              </div>

              <h3 style="font-size:16px; margin: 24px 0 12px; color: var(--accent2);">Types of Arrays</h3>
              <div class="cards-grid">
                <div class="card">
                  <div class="card-icon" style="background:rgba(139,92,246,.15)">1D</div>
                  <div class="card-title">1D Array</div>
                  <div class="card-desc">
                    Stores elements in a single linear sequence. Access with one index: <code>arr[i]</code>.<br>
                    <code style="display:block; margin-top:8px;">int numbers[3] = {1, 2, 3};</code>
                  </div>
                </div>

                <div class="card">
                  <div class="card-icon" style="background:rgba(6,182,212,.15)">2D</div>
                  <div class="card-title">2D Array</div>
                  <div class="card-desc">
                    Stores data in rows and columns like a matrix. Access with two indexes: <code>arr[row][col]</code>.<br>
                    <code style="display:block; margin-top:8px;">int matrix[2][2] = {{1,2},{3,4}};</code>
                  </div>
                </div>
              </div>
            </section>

            <!-- STRINGS THEORY -->
            <section id="strings">
              <div class="section-label">03 / Theory</div>
              <div class="section-title">Strings — Theory</div>
              <p class="section-desc">A string is a collection of characters stored in a character array, terminated by a null character (<code>'\\0'</code>). This null terminator tells the program where the string ends.</p>

              <div class="warn-box">
                <strong>⚠️ COMMON MISTAKE:</strong> When declaring a character array for a string of length <em>n</em>, always declare size <strong>n+1</strong> to accommodate the null terminator.<br>
                <code>char name[7] = "Atharv";</code> (6 characters + 1 for <code>'\\0'</code>)
              </div>

              <h3 style="font-size:16px; margin: 24px 0 12px; color: var(--accent2);">Declaration Syntax</h3>
              <div class="card" style="padding:16px; margin-bottom:24px; border-left: 3px solid var(--accent); background: var(--card);">
                <strong>Syntax:</strong><br>
                <code style="color: var(--accent);">char string_name[size];</code><br><br>
                <strong>With initialization:</strong><br>
                <code>char name[20] = "Atharv";</code><br><br>
                <strong>Compiler computes size automatically:</strong><br>
                <code>char name[] = "Programming";</code> (size = 12: 11 characters + <code>'\\0'</code>)
              </div>

              <h3 style="font-size:16px; margin: 24px 0 12px; color: var(--accent2);">Common String Operations</h3>
              <div class="cards-grid">
                <div class="card">
                  <div class="card-title">📥 Input/Output</div>
                  <div class="card-desc">Using standard library functions like <code>scanf()</code> / <code>printf()</code> or <code>gets()</code> / <code>puts()</code>.</div>
                </div>
                <div class="card">
                  <div class="card-title">📏 Length</div>
                  <div class="card-desc">Returns the number of characters in the string using <code>strlen()</code>.</div>
                </div>
                <div class="card">
                  <div class="card-title">📋 Copy</div>
                  <div class="card-desc">Copies source string to destination using <code>strcpy()</code>.</div>
                </div>
                <div class="card">
                  <div class="card-title">🔗 Concatenation</div>
                  <div class="card-desc">Appends one string to another using <code>strcat()</code>.</div>
                </div>
                <div class="card" style="grid-column: span 2">
                  <div class="card-title">⚖️ Comparison</div>
                  <div class="card-desc">Compares two strings lexicographically using <code>strcmp()</code>. Returns 0 if equal.</div>
                </div>
              </div>
            </section>

            <!-- CODE EXAMPLES -->
            <section id="code">
              <div class="section-label">04 / Code Examples</div>
              
              <div class="section-title">Pseudocode Implementation</div>
              <p class="section-desc">Observe the logic and standard operations of arrays and strings using language-independent pseudocode.</p>

              <div class="code-block-wrapper" style="margin-bottom:32px;">
                <div class="code-header">
                  <div class="code-header-left">
                    <div class="code-tabs">
                      <div class="code-tab active" data-target="arr-pseudo-panel">1 — Array Traversal</div>
                      <div class="code-tab" data-target="str-pseudo-panel">2 — String Concatenation</div>
                    </div>
                  </div>
                  <button class="copy-btn" onclick="navigator.clipboard.writeText(document.querySelector('.code-panel.active pre').innerText)">Copy</button>
                </div>
                
                <div id="pseudo-blocks">
                  <!-- ARRAY TRAVERSAL PSEUDO -->
                  <div class="code-panel active" id="arr-pseudo-panel">
                    <pre><span class="cmt"># 1. Array Declaration & Traversal</span>
<span class="kw">initialize</span> <span class="var">array</span> <span class="var">marks</span> <span class="kw">with</span> {<span class="num">90</span>, <span class="num">85</span>, <span class="num">78</span>, <span class="num">92</span>, <span class="num">88</span>}

<span class="cmt"># Access elements</span>
<span class="var">first_element</span> <span class="op">=</span> <span class="var">marks</span>[<span class="num">0</span>]   <span class="cmt"># 90</span>
<span class="var">third_element</span> <span class="op">=</span> <span class="var">marks</span>[<span class="num">2</span>]   <span class="cmt"># 78</span>

<span class="cmt"># Traverse all elements</span>
<span class="kw">for</span> <span class="var">i</span> <span class="kw">from</span> <span class="num">0</span> <span class="kw">to</span> <span class="num">4</span> <span class="kw">do</span>:
    <span class="fn">print</span> <span class="var">marks</span>[<span class="var">i</span>]
<span class="kw">end for</span></pre>
                  </div>

                  <!-- STRING CONCATENATION PSEUDO -->
                  <div class="code-panel" id="str-pseudo-panel">
                    <pre><span class="cmt"># 2. String Concatenation</span>
<span class="kw">initialize</span> <span class="var">string</span> <span class="var">str1</span> <span class="op">=</span> <span class="str">"Data"</span>
<span class="kw">initialize</span> <span class="var">string</span> <span class="var">str2</span> <span class="op">=</span> <span class="str">"Structure"</span>

<span class="cmt"># Access individual characters</span>
<span class="var">first_char</span> <span class="op">=</span> <span class="var">str1</span>[<span class="num">0</span>]      <span class="cmt"># 'D'</span>

<span class="cmt"># Concatenation</span>
<span class="var">result</span> <span class="op">=</span> <span class="var">str1</span> <span class="op">+</span> <span class="var">str2</span>     <span class="cmt"># "DataStructure"</span>
<span class="fn">print</span> <span class="var">result</span></pre>
                  </div>
                </div>
              </div>

              <div class="section-title">Multi-Language Implementations</div>
              <p class="section-desc">Select a language to view the implementation of arrays, strings, and common operations.</p>

              <!-- ARRAY -->
              <h3 style="margin: 24px 0 12px; font-size: 18px; color: var(--text);">▸ Array — Declaration, Initialization & Indexing</h3>
              <div class="code-block-wrapper" style="margin-bottom:32px;">
                <div class="code-header">
                  <div class="code-header-left">
                    <div class="code-tabs">
                      <div class="code-tab active" data-target="array-c">C</div>
                      <div class="code-tab" data-target="array-cpp">C++</div>
                      <div class="code-tab" data-target="array-java">Java</div>
                      <div class="code-tab" data-target="array-py">Python</div>
                    </div>
                  </div>
                  <button class="copy-btn" onclick="navigator.clipboard.writeText(document.querySelector('.code-panel.active pre').innerText)">Copy</button>
                </div>
                <div id="array-content-blocks">
                  <div class="code-panel active" id="array-c">
                    <pre><span class="cmt">// Array: Declaration, Initialization & Indexing in C</span>
<span class="pre">#include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="cmt">/* Declare and initialize an integer array */</span>
    <span class="kw">int</span> <span class="var">marks</span>[<span class="num">5</span>] <span class="op">=</span> {<span class="num">90</span>, <span class="num">85</span>, <span class="num">78</span>, <span class="num">92</span>, <span class="num">88</span>}<span class="punc">;</span>

    <span class="cmt">/* Access elements using index */</span>
    <span class="fn">printf</span>(<span class="str">"First Element  = %d\\n"</span>, <span class="var">marks</span>[<span class="num">0</span>])<span class="punc">;</span> <span class="cmt">// 90</span>
    <span class="fn">printf</span>(<span class="str">"Third Element  = %d\\n"</span>, <span class="var">marks</span>[<span class="num">2</span>])<span class="punc">;</span> <span class="cmt">// 78</span>

    <span class="cmt">/* Traverse all elements using a loop */</span>
    <span class="kw">for</span> (<span class="kw">int</span> <span class="var">i</span> <span class="op">=</span> <span class="num">0</span><span class="punc">;</span> <span class="var">i</span> <span class="op">&lt;</span> <span class="num">5</span><span class="punc">;</span> <span class="var">i</span><span class="op">++</span>) {
        <span class="fn">printf</span>(<span class="str">"%d\\n"</span>, <span class="var">marks</span>[<span class="var">i</span>])<span class="punc">;</span>
    }

    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                  </div>

                  <div class="code-panel" id="array-cpp">
                    <pre><span class="cmt">// Array: Declaration, Initialization & Indexing in C++</span>
<span class="pre">#include</span> <span class="str">&lt;iostream&gt;</span>
<span class="kw">using namespace</span> <span class="var">std</span><span class="punc">;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> <span class="var">marks</span>[<span class="num">5</span>] <span class="op">=</span> {<span class="num">90</span>, <span class="num">85</span>, <span class="num">78</span>, <span class="num">92</span>, <span class="num">88</span>}<span class="punc">;</span>
    
    <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"First Element  = "</span> <span class="op">&lt;&lt;</span> <span class="var">marks</span>[<span class="num">0</span>] <span class="op">&lt;&lt;</span> <span class="var">endl</span><span class="punc">;</span> <span class="cmt">// 90</span>
    <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"Third Element  = "</span> <span class="op">&lt;&lt;</span> <span class="var">marks</span>[<span class="num">2</span>] <span class="op">&lt;&lt;</span> <span class="var">endl</span><span class="punc">;</span> <span class="cmt">// 78</span>
    
    <span class="kw">for</span> (<span class="kw">int</span> <span class="var">i</span> <span class="op">=</span> <span class="num">0</span><span class="punc">;</span> <span class="var">i</span> <span class="op">&lt;</span> <span class="num">5</span><span class="punc">;</span> <span class="var">i</span><span class="op">++</span>) {
        <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="var">marks</span>[<span class="var">i</span>] <span class="op">&lt;&lt;</span> <span class="var">endl</span><span class="punc">;</span>
    }
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                  </div>

                  <div class="code-panel" id="array-java">
                    <pre><span class="cmt">// Array: Declaration, Initialization & Indexing in Java</span>
<span class="kw">public class</span> <span class="fn">Main</span> {
    <span class="kw">public static void</span> <span class="fn">main</span>(<span class="tp">String</span>[] <span class="var">args</span>) {
        <span class="kw">int</span>[] <span class="var">marks</span> <span class="op">=</span> {<span class="num">90</span>, <span class="num">85</span>, <span class="num">78</span>, <span class="num">92</span>, <span class="num">88</span>}<span class="punc">;</span>
        
        <span class="var">System</span>.<span class="var">out</span>.<span class="fn">println</span>(<span class="str">"First Element  = "</span> <span class="op">+</span> <span class="var">marks</span>[<span class="num">0</span>])<span class="punc">;</span> <span class="cmt">// 90</span>
        <span class="var">System</span>.<span class="var">out</span>.<span class="fn">println</span>(<span class="str">"Third Element  = "</span> <span class="op">+</span> <span class="var">marks</span>[<span class="num">2</span>])<span class="punc">;</span> <span class="cmt">// 78</span>
        
        <span class="kw">for</span> (<span class="kw">int</span> <span class="var">i</span> <span class="op">=</span> <span class="num">0</span><span class="punc">;</span> <span class="var">i</span> <span class="op">&lt;</span> <span class="var">marks</span>.<span class="var">length</span><span class="punc">;</span> <span class="var">i</span><span class="op">++</span>) {
            <span class="var">System</span>.<span class="var">out</span>.<span class="fn">println</span>(<span class="var">marks</span>[<span class="var">i</span>])<span class="punc">;</span>
        }
    }
}</pre>
                  </div>

                  <div class="code-panel" id="array-py">
                    <pre><span class="cmt"># Array: Declaration, Initialization & Indexing in Python</span>
<span class="var">marks</span> <span class="op">=</span> [<span class="num">90</span>, <span class="num">85</span>, <span class="num">78</span>, <span class="num">92</span>, <span class="num">88</span>]

<span class="fn">print</span>(<span class="str">"First Element  ="</span>, <span class="var">marks</span>[<span class="num">0</span>]) <span class="cmt"># 90</span>
<span class="fn">print</span>(<span class="str">"Third Element  ="</span>, <span class="var">marks</span>[<span class="num">2</span>]) <span class="cmt"># 78</span>

<span class="kw">for</span> <span class="var">mark</span> <span class="kw">in</span> <span class="var">marks</span>:
    <span class="fn">print</span>(<span class="var">mark</span>)</pre>
                  </div>
                </div>
              </div>

              <!-- STRING -->
              <h3 style="margin: 24px 0 12px; font-size: 18px; color: var(--text);">▸ String — Declaration, Indexing & Concatenation</h3>
              <div class="code-block-wrapper" style="margin-bottom:32px;">
                <div class="code-header">
                  <div class="code-header-left">
                    <div class="code-tabs">
                      <div class="code-tab active" data-target="string-c">C</div>
                      <div class="code-tab" data-target="string-cpp">C++</div>
                      <div class="code-tab" data-target="string-java">Java</div>
                      <div class="code-tab" data-target="string-py">Python</div>
                    </div>
                  </div>
                  <button class="copy-btn" onclick="navigator.clipboard.writeText(document.querySelector('.code-panel.active pre').innerText)">Copy</button>
                </div>
                <div id="string-content-blocks">
                  <div class="code-panel active" id="string-c">
                    <pre><span class="cmt">// Strings: Declaration, Indexing & Concatenation in C</span>
<span class="pre">#include</span> <span class="str">&lt;stdio.h&gt;</span>
<span class="pre">#include</span> <span class="str">&lt;string.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="cmt">/* Declare and initialize strings */</span>
    <span class="kw">char</span> <span class="var">name</span>[] <span class="op">=</span> <span class="str">"Hello"</span><span class="punc">;</span>
    <span class="kw">char</span> <span class="var">str1</span>[<span class="num">20</span>] <span class="op">=</span> <span class="str">"Data"</span><span class="punc">;</span>
    <span class="kw">char</span> <span class="var">str2</span>[] <span class="op">=</span> <span class="str">"Structure"</span><span class="punc">;</span>

    <span class="cmt">/* Print individual characters using indexing */</span>
    <span class="fn">printf</span>(<span class="str">"%c\\n"</span>, <span class="var">name</span>[<span class="num">0</span>])<span class="punc">;</span> <span class="cmt">// H</span>
    <span class="fn">printf</span>(<span class="str">"%c\\n"</span>, <span class="var">name</span>[<span class="num">4</span>])<span class="punc">;</span> <span class="cmt">// o</span>

    <span class="cmt">/* Concatenation using strcat() */</span>
    <span class="fn">strcat</span>(<span class="var">str1</span>, <span class="var">str2</span>)<span class="punc">;</span>
    <span class="fn">printf</span>(<span class="str">"%s\\n"</span>, <span class="var">str1</span>)<span class="punc">;</span> <span class="cmt">// DataStructure</span>

    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                  </div>

                  <div class="code-panel" id="string-cpp">
                    <pre><span class="cmt">// Strings: Declaration, Indexing & Concatenation in C++</span>
<span class="pre">#include</span> <span class="str">&lt;iostream&gt;</span>
<span class="pre">#include</span> <span class="str">&lt;string&gt;</span>
<span class="kw">using namespace</span> <span class="var">std</span><span class="punc">;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="var">string</span> <span class="var">name</span> <span class="op">=</span> <span class="str">"Hello"</span><span class="punc">;</span>
    <span class="var">string</span> <span class="var">str1</span> <span class="op">=</span> <span class="str">"Data"</span><span class="punc">;</span>
    <span class="var">string</span> <span class="var">str2</span> <span class="op">=</span> <span class="str">"Structure"</span><span class="punc">;</span>

    <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="var">name</span>[<span class="num">0</span>] <span class="op">&lt;&lt;</span> <span class="var">endl</span><span class="punc">;</span> <span class="cmt">// H</span>
    <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="var">name</span>[<span class="num">4</span>] <span class="op">&lt;&lt;</span> <span class="var">endl</span><span class="punc">;</span> <span class="cmt">// o</span>

    <span class="var">string</span> <span class="var">result</span> <span class="op">=</span> <span class="var">str1</span> <span class="op">+</span> <span class="var">str2</span><span class="punc">;</span>
    <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="var">result</span> <span class="op">&lt;&lt;</span> <span class="var">endl</span><span class="punc">;</span> <span class="cmt">// DataStructure</span>
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                  </div>

                  <div class="code-panel" id="string-java">
                    <pre><span class="cmt">// Strings: Declaration, Indexing & Concatenation in Java</span>
<span class="kw">public class</span> <span class="fn">Main</span> {
    <span class="kw">public static void</span> <span class="fn">main</span>(<span class="tp">String</span>[] <span class="var">args</span>) {
        <span class="tp">String</span> <span class="var">name</span> <span class="op">=</span> <span class="str">"Hello"</span><span class="punc">;</span>
        <span class="tp">String</span> <span class="var">str1</span> <span class="op">=</span> <span class="str">"Data"</span><span class="punc">;</span>
        <span class="tp">String</span> <span class="var">str2</span> <span class="op">=</span> <span class="str">"Structure"</span><span class="punc">;</span>

        <span class="var">System</span>.<span class="var">out</span>.<span class="fn">println</span>(<span class="var">name</span>.<span class="fn">charAt</span>(<span class="num">0</span>))<span class="punc">;</span> <span class="cmt">// H</span>
        <span class="var">System</span>.<span class="var">out</span>.<span class="fn">println</span>(<span class="var">name</span>.<span class="fn">charAt</span>(<span class="num">4</span>))<span class="punc">;</span> <span class="cmt">// o</span>

        <span class="tp">String</span> <span class="var">result</span> <span class="op">=</span> <span class="var">str1</span> <span class="op">+</span> <span class="var">str2</span><span class="punc">;</span>
        <span class="var">System</span>.<span class="var">out</span>.<span class="fn">println</span>(<span class="var">result</span>)<span class="punc">;</span> <span class="cmt">// DataStructure</span>
    }
}</pre>
                  </div>

                  <div class="code-panel" id="string-py">
                    <pre><span class="cmt"># Strings: Declaration, Indexing & Concatenation in Python</span>
<span class="var">name</span> <span class="op">=</span> <span class="str">"Hello"</span>
<span class="var">str1</span> <span class="op">=</span> <span class="str">"Data"</span>
<span class="var">str2</span> <span class="op">=</span> <span class="str">"Structure"</span>

<span class="fn">print</span>(<span class="var">name</span>[<span class="num">0</span>]) <span class="cmt"># H</span>
<span class="fn">print</span>(<span class="var">name</span>[<span class="num">4</span>]) <span class="cmt"># o</span>

<span class="var">result</span> <span class="op">=</span> <span class="var">str1</span> <span class="op">+</span> <span class="var">str2</span>
<span class="fn">print</span>(<span class="var">result</span>) <span class="cmt"># DataStructure</span></pre>
                  </div>
                </div>
              </div>
            </section>
            ` }} />

            {/* PRACTICE (Dynamic) */}
            <section id="practice">
              <div className="section-label">05 / Practice</div>
              <div className="section-title">Practice Challenges</div>
              <p className="section-desc">Try writing programs for these common scenarios using arrays and strings:</p>

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
              <div class="section-label">06 / Summary</div>
              <div class="section-title">Quick Review</div>
              <div class="summary-grid">
                <div class="summary-card">
                  <div class="s-num">01</div>
                  <div class="s-title">Arrays</div>
                  <div class="s-text">Contiguous memory, same data type. Compute addresses instantly in O(1) time.</div>
                </div>
                <div class="summary-card">
                  <div class="s-num">02</div>
                  <div class="s-title">Strings</div>
                  <div class="s-text">Character arrays terminated with standard null character <code>'\\0'</code>.</div>
                </div>
                <div class="summary-card">
                  <div class="s-num">03</div>
                  <div class="s-title">Memory +1</div>
                  <div class="s-text">Always allocate size <strong>n + 1</strong> when working with strings to store the null terminator.</div>
                </div>
                <div class="summary-card">
                  <div class="s-num">04</div>
                  <div class="s-title">Traversal</div>
                  <div class="s-text">Walk sequentially through arrays and strings using indexes from 0 to N-1.</div>
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
