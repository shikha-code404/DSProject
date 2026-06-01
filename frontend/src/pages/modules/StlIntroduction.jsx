import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Code2, CheckCircle } from 'lucide-react';
import ModuleLayout from '../../components/layout/ModuleLayout';
import CodingArenaOverlay from '../../components/visualizers/CodingArenaOverlay';
import { STLInteractiveVisualizer } from '../../components/visualizers/STLVisualizer';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import './PrereqModules.css';

export default function StlIntroduction() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [practiceProblems, setPracticeProblems] = useState([]);
  const [activePracticeProblem, setActivePracticeProblem] = useState(null);
  const [completedProblems, setCompletedProblems] = useState([]);

  useEffect(() => {
    async function fetchProblems() {
      const { data } = await supabase.from('practice_problems').select('*').eq('module_id', 'stl').order('title');
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
    <ModuleLayout title="STL Introduction" moduleId={8}>
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
          <a class="nav-item" href="#architecture"><span class="nav-dot"></span>Architecture</a>
          <a class="nav-item" href="#components"><span class="nav-dot"></span>Core Components</a>
          <a class="nav-item" href="#section-simulation"><span class="nav-dot"></span>Simulation</a>
          <a class="nav-item" href="#code"><span class="nav-dot"></span>Code Implementation</a>
          <a class="nav-item" href="#complexity"><span class="nav-dot"></span>Complexity</a>
          <a class="nav-item" href="#practice"><span class="nav-dot"></span>Practice</a>
          <a class="nav-item" href="#summary"><span class="nav-dot"></span>Summary</a>
        ` }} />

        <div className="main">
          {/* HERO */}
          <div className="hero" id="hero" dangerouslySetInnerHTML={{ __html: `
            <div class="hero-visual">STL</div>
            <div class="hero-inner">
              <div class="hero-badges">
                <span class="badge badge-purple">⚡ Intermediate</span>
                <span class="badge badge-blue">⏱ 45 min read</span>
              </div>
              <h1 class="hero-title">Standard Template Library<br>(STL) Introduction</h1>
              <p class="hero-sub">A powerful library providing reusable, high-performance data structures and algorithms, eliminating the need to write boilerplate container logic.</p>
              <div class="hero-meta">
                <div class="hero-meta-item">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5v5l3 3"/>
                  </svg>~45 min
                </div>
                <div class="hero-meta-item">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>Generic Programming
                </div>
              </div>
            </div>
          </div>
          ` }} />

          <div className="content">
            {/* OVERVIEW */}
            <div dangerouslySetInnerHTML={{ __html: `
            <section id="overview">
              <div class="section-label">01 / Overview</div>
              <div class="section-title">Topic Overview</div>
              <p class="section-desc">The Standard Template Library (STL) is a powerful library that provides reusable and efficient data structures and algorithms. It is a fundamental part of competitive programming and professional software engineering — helping developers write efficient, reusable code with minimal effort.</p>
              
              <div class="cards-grid">
                <div class="card">
                  <div class="card-icon" style="background:rgba(139,92,246,.15)">⚡</div>
                  <div class="card-title">Why STL?</div>
                  <div class="card-desc">Eliminates manual implementation of common data structures; battle-tested for performance, safety, and runtime correctness.</div>
                </div>

                <div class="card">
                  <div class="card-icon" style="background:rgba(6,182,212,.15)">🌍</div>
                  <div class="card-title">Real-world Use</div>
                  <div class="card-desc">Used in databases, operating systems, game engines, compilers, and virtually every large-scale system software codebase.</div>
                </div>
              </div>
            </section>

            <!-- ARCHITECTURE -->
            <section id="architecture">
              <div class="section-label">02 / Architecture</div>
              <div class="section-title">Architecture Pillars</div>
              <p class="section-desc">The library is built on four interoperating pillars that together provide a complete toolkit for algorithm design and data management:</p>

              <div class="cards-grid">
                <div class="card">
                  <div class="card-icon" style="background:rgba(139,92,246,.15)">📦</div>
                  <div class="card-title">Containers</div>
                  <div class="card-desc">Data structures that hold collections of objects: vector, list, map, set, stack, queue, etc. Divided into sequential and associative categories.</div>
                </div>

                <div class="card">
                  <div class="card-icon" style="background:rgba(6,182,212,.15)">🔁</div>
                  <div class="card-title">Iterators</div>
                  <div class="card-desc">Pointer-like traversal objects providing uniform access to elements across different containers without exposing their memory structures.</div>
                </div>

                <div class="card">
                  <div class="card-icon" style="background:rgba(16,185,129,.15)">⚙️</div>
                  <div class="card-title">Algorithms</div>
                  <div class="card-desc">Generic functions for processing collections: sort(), find(), count(), reverse(), binary_search(), and 100+ template operations.</div>
                </div>

                <div class="card">
                  <div class="card-icon" style="background:rgba(245,158,11,.15)">🔧</div>
                  <div class="card-title">Function Objects (Functors)</div>
                  <div class="card-desc">Objects that behave like functions by overloading the call operator; commonly used as custom comparators and predicates.</div>
                </div>
              </div>

              <div class="info-box" style="margin-top:20px;">
                <strong>💡 DESIGN PRINCIPLE:</strong> Components are designed to be interchangeable — any algorithm can work with any container via iterators. This is the core power of generic programming.
              </div>
            </section>

            <!-- CORE COMPONENTS -->
            <section id="components">
              <div class="section-label">03 / Core Components</div>
              <div class="section-title">Core Containers and Adaptors</div>
              <p class="section-desc">Explore the primary containers that form the backbone of modern template libraries.</p>

              <div class="cards-grid">
                <div class="card" style="grid-column: span 2">
                  <div class="card-title"><span style="color:var(--accent2); margin-right:8px; font-weight:900;">V</span> Vector (Dynamic Array)</div>
                  <div class="card-desc" style="margin-top:4px;">
                    A dynamic array that automatically resizes itself when elements are added or removed. It is the most commonly used sequence container.
                    <div class="success-box" style="padding:10px 14px; margin:12px 0 0; font-size:13.5px;">
                      <strong>Key Traits:</strong> Contiguous Memory • O(1) Random Access • Amortized O(1) Push Back
                    </div>
                    <div style="font-size:13px; color:var(--text3); margin-top:8px;">
                      <strong>Common Methods:</strong> push_back(), pop_back(), size(), at(), front(), back(), begin(), end(), empty(), clear()
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-title"><span style="color:var(--accent3); margin-right:8px; font-weight:900;">P</span> Pair</div>
                  <div class="card-desc">
                    Stores two values together as a single unit (can be same or different types). Accessed via .first and .second.
                    <div style="font-size:13px; color:var(--text3); margin-top:10px;">
                      <strong>Use Cases:</strong> Coordinate bundles (x,y), key-value mapping, graph edge representation.
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-title"><span style="color:var(--green); margin-right:8px; font-weight:900;">A</span> Array</div>
                  <div class="card-desc">
                    A fixed-size sequence container that wraps C-style array with member functions and doesn't decay to pointers.
                    <div style="font-size:13px; color:var(--text3); margin-top:10px;">
                      <strong>Constraints:</strong> Size must be known at compile-time and cannot change. No heap allocation.
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-title"><span style="color:var(--yellow); margin-right:8px; font-weight:900;">S</span> Stack</div>
                  <div class="card-desc">
                    LIFO (Last In First Out) adaptor container. Insertions and deletions occur only at the top limit.
                    <div style="font-size:13px; color:var(--text3); margin-top:10px;">
                      <strong>Core API:</strong> push() (insert), pop() (delete), top() (peek), empty()
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-title"><span style="color:var(--red); margin-right:8px; font-weight:900;">Q</span> Queue</div>
                  <div class="card-desc">
                    FIFO (First In First Out) adaptor container. Insertions at rear (push) and removals at front (pop).
                    <div style="font-size:13px; color:var(--text3); margin-top:10px;">
                      <strong>Core API:</strong> push() (enqueue), pop() (dequeue), front() (peek), back()
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-title"><span style="color:var(--accent4); margin-right:8px; font-weight:900;">M</span> Map</div>
                  <div class="card-desc">
                    Stores sorted key-value pairs with unique keys. Implemented as a Red-Black Tree ensuring O(log n) access time.
                    <div style="font-size:13px; color:var(--text3); margin-top:10px;">
                      <strong>Alternative:</strong> unordered_map offers O(1) average lookup using hash tables.
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-title"><span style="color:var(--accent); margin-right:8px; font-weight:900;">S</span> Set</div>
                  <div class="card-desc">
                    Stores unique elements in sorted order. Duplicate entries are automatically ignored.
                    <div style="font-size:13px; color:var(--text3); margin-top:10px;">
                      <strong>Alternatives:</strong> unordered_set (unsorted O(1) avg), multiset (allows duplicates, sorted).
                    </div>
                  </div>
                </div>

                <div class="card" style="grid-column: span 2">
                  <div class="card-title"><span style="color:var(--accent2); margin-right:8px; font-weight:900;">It</span> Iterators</div>
                  <div class="card-desc">
                    Universal traversal objects acting as glue between containers and algorithms. They allow uniform iteration.
                    <div class="info-box" style="padding:10px 14px; margin:12px 0 0; font-size:13.5px;">
                      <strong>Core Iterators:</strong> begin() (points to first element) • end() (points to element past-the-end) • ++ (advance) • * (dereference)
                    </div>
                    <div style="font-size:13px; color:var(--text3); margin-top:8px;">
                      <strong>Modern standard:</strong> Range-based for loops (<code>for (auto x : container)</code>) act as clean syntactic sugar over classic iterators.
                    </div>
                  </div>
                </div>
              </div>
            </section>
            ` }} />

            <STLInteractiveVisualizer />

            <div dangerouslySetInnerHTML={{ __html: `
            <!-- CODE IMPLEMENTATION -->
            <section id="code">
              <div class="section-label">04 / Code Examples</div>
              
              <div class="section-title">Pseudocode Implementation</div>
              <p class="section-desc">Observe the logic and standard operations of core data structures using language-independent pseudocode.</p>

              <div class="code-block-wrapper" style="margin-bottom:32px;">
                <div class="code-header">
                  <div class="code-header-left">
                    <div class="code-tabs">
                      <div class="code-tab active" data-target="vector-pseudo-panel">1 — Vector</div>
                      <div class="code-tab" data-target="stack-pseudo-panel">2 — Stack</div>
                      <div class="code-tab" data-target="map-pseudo-panel">3 — Map</div>
                      <div class="code-tab" data-target="iterator-pseudo-panel">4 — Iterators</div>
                    </div>
                  </div>
                  <button class="copy-btn" onclick="navigator.clipboard.writeText(document.querySelector('.code-panel.active pre').innerText)">Copy</button>
                </div>
                
                <div id="pseudo-blocks">
                  <!-- VECTOR PSEUDO -->
                  <div class="code-panel active" id="vector-pseudo-panel">
                    <pre><span class="cmt"># 1. Vector (Dynamic Array)</span>
<span class="kw">initialize</span> <span class="var">vector</span> <span class="var">V</span>
<span class="var">V</span>.<span class="fn">push_back</span>(<span class="num">10</span>)      <span class="cmt"># Append 10 to vector</span>
<span class="var">V</span>.<span class="fn">push_back</span>(<span class="num">20</span>)      <span class="cmt"># Append 20 to vector</span>
<span class="var">V</span>.<span class="fn">push_back</span>(<span class="num">30</span>)      <span class="cmt"># Append 30 to vector</span>

<span class="cmt"># Traverse vector</span>
<span class="kw">for each</span> element <span class="var">x</span> <span class="kw">in</span> <span class="var">V</span> <span class="kw">do</span>:
    <span class="fn">print</span> <span class="var">x</span>
<span class="kw">end for</span>

<span class="fn">print</span> <span class="var">V</span>.<span class="fn">size</span>()       <span class="cmt"># Output: 3</span></pre>
                  </div>

                  <!-- STACK PSEUDO -->
                  <div class="code-panel" id="stack-pseudo-panel">
                    <pre><span class="cmt"># 2. Stack (LIFO - Last In First Out)</span>
<span class="kw">initialize</span> <span class="var">stack</span> <span class="var">S</span>
<span class="var">S</span>.<span class="fn">push</span>(<span class="num">10</span>)           <span class="cmt"># Push 10 onto stack</span>
<span class="var">S</span>.<span class="fn">push</span>(<span class="num">20</span>)           <span class="cmt"># Push 20 onto stack</span>

<span class="fn">print</span> <span class="var">S</span>.<span class="fn">top</span>()        <span class="cmt"># Get top element (Output: 20)</span>
<span class="var">S</span>.<span class="fn">pop</span>()              <span class="cmt"># Remove top element (20)</span>

<span class="fn">print</span> <span class="var">S</span>.<span class="fn">top</span>()        <span class="cmt"># Get top element (Output: 10)</span></pre>
                  </div>

                  <!-- MAP PSEUDO -->
                  <div class="code-panel" id="map-pseudo-panel">
                    <pre><span class="cmt"># 3. Map (Key-Value Dictionary)</span>
<span class="kw">initialize</span> <span class="var">map</span> <span class="var">M</span>
<span class="var">M</span>[<span class="num">1</span>] <span class="op">=</span> <span class="str">"One"</span>         <span class="cmt"># Associate key 1 with "One"</span>
<span class="var">M</span>[<span class="num">2</span>] <span class="op">=</span> <span class="str">"Two"</span>         <span class="cmt"># Associate key 2 with "Two"</span>
<span class="var">M</span>[<span class="num">3</span>] <span class="op">=</span> <span class="str">"Three"</span>       <span class="cmt"># Associate key 3 with "Three"</span>

<span class="cmt"># Traverse map</span>
<span class="kw">for each</span> key-value pair <span class="var">P</span> <span class="kw">in</span> <span class="var">M</span> <span class="kw">do</span>:
    <span class="fn">print</span> <span class="var">P</span>.<span class="var">key</span> <span class="op">+</span> <span class="str">": "</span> <span class="op">+</span> <span class="var">P</span>.<span class="var">value</span>
<span class="kw">end for</span>

<span class="kw">if</span> <span class="var">M</span>.<span class="fn">contains</span>(<span class="num">2</span>) <span class="kw">then</span>
    <span class="fn">print</span> <span class="str">"Key 2 found!"</span>
<span class="kw">end if</span></pre>
                  </div>

                  <!-- ITERATOR PSEUDO -->
                  <div class="code-panel" id="iterator-pseudo-panel">
                    <pre><span class="cmt"># 4. Iterators (Universal Traversal)</span>
<span class="kw">initialize</span> <span class="var">vector</span> <span class="var">V</span> <span class="kw">with</span> {<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>}

<span class="cmt"># Create iterator pointing to start</span>
<span class="var">it</span> <span class="op">=</span> <span class="var">V</span>.<span class="fn">begin</span>()       

<span class="kw">while</span> <span class="var">it</span> <span class="op">!=</span> <span class="var">V</span>.<span class="fn">end</span>() <span class="kw">do</span>:
    <span class="fn">print</span> <span class="op">*</span><span class="var">it</span>        <span class="cmt"># Dereference iterator to get value</span>
    <span class="var">it</span> <span class="op">=</span> <span class="var">it</span> <span class="op">+</span> <span class="num">1</span>      <span class="cmt"># Advance iterator to next position</span>
<span class="kw">end while</span></pre>
                  </div>
                </div>
              </div>

              <div class="section-title">Multi-Language Implementations</div>
              <p class="section-desc">Observe and compare implementations of standard data structure operations across languages.</p>

              <!-- VECTOR -->
              <h3 style="margin: 24px 0 12px; font-size: 18px; color: var(--text);">▸ Vector (Dynamic Array)</h3>
              <div class="code-block-wrapper" style="margin-bottom:32px;">
                <div class="code-header">
                  <div class="code-header-left">
                    <div class="code-tabs">
                      <div class="code-tab active" data-target="vector-cpp">C++</div>
                      <div class="code-tab" data-target="vector-c">C</div>
                      <div class="code-tab" data-target="vector-java">Java</div>
                      <div class="code-tab" data-target="vector-py">Python</div>
                    </div>
                  </div>
                  <button class="copy-btn" onclick="navigator.clipboard.writeText(document.querySelector('.code-panel.active pre').innerText)">Copy</button>
                </div>
                <div id="vector-content-blocks">
                  <div class="code-panel active" id="vector-cpp">
                    <pre><span class="cmt">// vector_demo.cpp</span>
<span class="kw">#include</span> <span class="str">&lt;iostream&gt;</span>
<span class="kw">#include</span> <span class="str">&lt;vector&gt;</span>
<span class="kw">using namespace</span> <span class="var">std</span><span class="punc">;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="var">vector</span>&lt;<span class="kw">int</span>&gt; <span class="var">v</span> <span class="op">=</span> {<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>}<span class="punc">;</span>
    <span class="var">v</span><span class="punc">.</span><span class="fn">push_back</span>(<span class="num">40</span>)<span class="punc">;</span>       <span class="cmt">// Append 40</span>
    
    <span class="cmt">// Range-based for loop</span>
    <span class="kw">for</span> (<span class="kw">int</span> <span class="var">x</span> : <span class="var">v</span>)
        <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="var">x</span> <span class="op">&lt;&lt;</span> <span class="str">" "</span><span class="punc">;</span>
    
    <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"\\nSize: "</span> <span class="op">&lt;&lt;</span> <span class="var">v</span><span class="punc">.</span><span class="fn">size</span>()<span class="punc">;</span>
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                    <div class="output-box" style="margin:0;"><div class="output-label">Output</div><code>10 20 30 40<br>Size: 4</code></div>
                  </div>

                  <div class="code-panel" id="vector-c">
                    <pre><span class="cmt">// vector_demo.c</span>
<span class="kw">#include</span> <span class="str">&lt;stdio.h&gt;</span>
<span class="kw">#include</span> <span class="str">&lt;stdlib.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> <span class="var">size</span> <span class="op">=</span> <span class="num">3</span><span class="punc">;</span>
    <span class="kw">int</span>* <span class="var">v</span> <span class="op">=</span> (<span class="kw">int</span>*)<span class="fn">malloc</span>(<span class="var">size</span> * <span class="kw">sizeof</span>(<span class="kw">int</span>))<span class="punc">;</span>
    <span class="var">v</span>[<span class="num">0</span>] <span class="op">=</span> <span class="num">10</span><span class="punc">;</span> <span class="var">v</span>[<span class="num">1</span>] <span class="op">=</span> <span class="num">20</span><span class="punc">;</span> <span class="var">v</span>[<span class="num">2</span>] <span class="op">=</span> <span class="num">30</span><span class="punc">;</span>
    
    <span class="cmt">// Simulating dynamic reallocation (push_back)</span>
    <span class="var">size</span> <span class="op">=</span> <span class="num">4</span><span class="punc">;</span>
    <span class="var">v</span> <span class="op">=</span> (<span class="kw">int</span>*)<span class="fn">realloc</span>(<span class="var">v</span>, <span class="var">size</span> * <span class="kw">sizeof</span>(<span class="kw">int</span>))<span class="punc">;</span>
    <span class="var">v</span>[<span class="num">3</span>] <span class="op">=</span> <span class="num">40</span><span class="punc">;</span>
    
    <span class="kw">for</span> (<span class="kw">int</span> <span class="var">i</span> <span class="op">=</span> <span class="num">0</span><span class="punc">;</span> <span class="var">i</span> <span class="op">&lt;</span> <span class="var">size</span><span class="punc">;</span> <span class="var">i</span><span class="op">++</span>)
        <span class="fn">printf</span>(<span class="str">"%d "</span>, <span class="var">v</span>[<span class="var">i</span>])<span class="punc">;</span>
        
    <span class="fn">printf</span>(<span class="str">"\\nSize: %d"</span>, <span class="var">size</span>)<span class="punc">;</span>
    <span class="fn">free</span>(<span class="var">v</span>)<span class="punc">;</span>
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                    <div class="output-box" style="margin:0;"><div class="output-label">Output</div><code>10 20 30 40<br>Size: 4</code></div>
                  </div>

                  <div class="code-panel" id="vector-java">
                    <pre><span class="cmt">// VectorDemo.java</span>
<span class="kw">import</span> <span class="str">java.util.ArrayList</span><span class="punc">;</span>

<span class="kw">public class</span> <span class="fn">VectorDemo</span> {
    <span class="kw">public static void</span> <span class="fn">main</span>(<span class="var">String</span>[] <span class="var">args</span>) {
        <span class="var">ArrayList</span>&lt;<span class="var">Integer</span>&gt; <span class="var">v</span> <span class="op">=</span> <span class="kw">new</span> <span class="var">ArrayList</span>&lt;&gt;()<span class="punc">;</span>
        <span class="var">v</span><span class="punc">.</span><span class="fn">add</span>(<span class="num">10</span>)<span class="punc">;</span>
        <span class="var">v</span><span class="punc">.</span><span class="fn">add</span>(<span class="num">20</span>)<span class="punc">;</span>
        <span class="var">v</span><span class="punc">.</span><span class="fn">add</span>(<span class="num">30</span>)<span class="punc">;</span>
        <span class="var">v</span><span class="punc">.</span><span class="fn">add</span>(<span class="num">40</span>)<span class="punc">;</span>
        
        <span class="kw">for</span> (<span class="kw">int</span> <span class="var">x</span> : <span class="var">v</span>)
            <span class="var">System</span><span class="punc">.</span><span class="var">out</span><span class="punc">.</span><span class="fn">print</span>(<span class="var">x</span> <span class="op">+</span> <span class="str">" "</span>)<span class="punc">;</span>
            
        <span class="var">System</span><span class="punc">.</span><span class="var">out</span><span class="punc">.</span><span class="fn">println</span>(<span class="str">"\\nSize: "</span> <span class="op">+</span> <span class="var">v</span><span class="punc">.</span><span class="fn">size</span>())<span class="punc">;</span>
    }
}</pre>
                    <div class="output-box" style="margin:0;"><div class="output-label">Output</div><code>10 20 30 40<br>Size: 4</code></div>
                  </div>

                  <div class="code-panel" id="vector-py">
                    <pre><span class="cmt"># vector_demo.py</span>
<span class="cmt"># Lists serve as dynamic arrays in Python</span>
<span class="var">v</span> <span class="op">=</span> [<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>]
<span class="var">v</span><span class="punc">.</span><span class="fn">append</span>(<span class="num">40</span>)

<span class="kw">for</span> <span class="var">x</span> <span class="kw">in</span> <span class="var">v</span>:
    <span class="fn">print</span>(<span class="var">x</span>, <span class="var">end</span><span class="op">=</span><span class="str">" "</span>)

<span class="fn">print</span>(<span class="str">f"\\nSize: {len(v)}"</span>)</pre>
                    <div class="output-box" style="margin:0;"><div class="output-label">Output</div><code>10 20 30 40<br>Size: 4</code></div>
                  </div>
                </div>
              </div>

              <!-- STACK -->
              <h3 style="margin: 24px 0 12px; font-size: 18px; color: var(--text);">▸ Stack</h3>
              <div class="code-block-wrapper" style="margin-bottom:32px;">
                <div class="code-header">
                  <div class="code-header-left">
                    <div class="code-tabs">
                      <div class="code-tab active" data-target="stack-cpp">C++</div>
                      <div class="code-tab" data-target="stack-c">C</div>
                      <div class="code-tab" data-target="stack-java">Java</div>
                      <div class="code-tab" data-target="stack-py">Python</div>
                    </div>
                  </div>
                  <button class="copy-btn" onclick="navigator.clipboard.writeText(document.querySelector('.code-panel.active pre').innerText)">Copy</button>
                </div>
                <div id="stack-content-blocks">
                  <div class="code-panel active" id="stack-cpp">
                    <pre><span class="cmt">// stack_demo.cpp</span>
<span class="kw">#include</span> <span class="str">&lt;stack&gt;</span>
<span class="kw">#include</span> <span class="str">&lt;iostream&gt;</span>
<span class="kw">using namespace</span> <span class="var">std</span><span class="punc">;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="var">stack</span>&lt;<span class="kw">int</span>&gt; <span class="var">s</span><span class="punc">;</span>
    <span class="var">s</span><span class="punc">.</span><span class="fn">push</span>(<span class="num">10</span>)<span class="punc">;</span>          <span class="cmt">// Stack: [10]</span>
    <span class="var">s</span><span class="punc">.</span><span class="fn">push</span>(<span class="num">20</span>)<span class="punc">;</span>          <span class="cmt">// Stack: [10, 20]</span>
    
    <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"Top: "</span> <span class="op">&lt;&lt;</span> <span class="var">s</span><span class="punc">.</span><span class="fn">top</span>()<span class="punc">;</span>  <span class="cmt">// 20</span>
    <span class="var">s</span><span class="punc">.</span><span class="fn">pop</span>()<span class="punc">;</span>               <span class="cmt">// Remove 20</span>
    <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"\\nTop after pop: "</span> <span class="op">&lt;&lt;</span> <span class="var">s</span><span class="punc">.</span><span class="fn">top</span>()<span class="punc">;</span>
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                    <div class="output-box" style="margin:0;"><div class="output-label">Output</div><code>Top: 20<br>Top after pop: 10</code></div>
                  </div>

                  <div class="code-panel" id="stack-c">
                    <pre><span class="cmt">// stack_demo.c</span>
<span class="kw">#include</span> <span class="str">&lt;stdio.h&gt;</span>
<span class="kw">#define</span> <span class="var">MAX</span> <span class="num">100</span>

<span class="kw">int</span> <span class="var">stack</span>[<span class="var">MAX</span>]<span class="punc">;</span>
<span class="kw">int</span> <span class="var">top</span> <span class="op">=</span> <span class="op">-</span><span class="num">1</span><span class="punc">;</span>

<span class="kw">void</span> <span class="fn">push</span>(<span class="kw">int</span> <span class="var">x</span>) { <span class="var">stack</span>[<span class="op">++</span><span class="var">top</span>] <span class="op">=</span> <span class="var">x</span><span class="punc">;</span> }
<span class="kw">void</span> <span class="fn">pop</span>() { <span class="kw">if</span> (<span class="var">top</span> <span class="op">&gt;=</span> <span class="num">0</span>) <span class="var">top</span><span class="op">--</span><span class="punc">;</span> }
<span class="kw">int</span> <span class="fn">get_top</span>() { <span class="kw">return</span> <span class="var">stack</span>[<span class="var">top</span>]<span class="punc">;</span> }

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="fn">push</span>(<span class="num">10</span>)<span class="punc">;</span>
    <span class="fn">push</span>(<span class="num">20</span>)<span class="punc">;</span>
    <span class="fn">printf</span>(<span class="str">"Top: %d"</span>, <span class="fn">get_top</span>())<span class="punc">;</span>
    <span class="fn">pop</span>()<span class="punc">;</span>
    <span class="fn">printf</span>(<span class="str">"\\nTop after pop: %d"</span>, <span class="fn">get_top</span>())<span class="punc">;</span>
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                    <div class="output-box" style="margin:0;"><div class="output-label">Output</div><code>Top: 20<br>Top after pop: 10</code></div>
                  </div>

                  <div class="code-panel" id="stack-java">
                    <pre><span class="cmt">// StackDemo.java</span>
<span class="kw">import</span> <span class="str">java.util.Stack</span><span class="punc">;</span>

<span class="kw">public class</span> <span class="fn">StackDemo</span> {
    <span class="kw">public static void</span> <span class="fn">main</span>(<span class="var">String</span>[] <span class="var">args</span>) {
        <span class="var">Stack</span>&lt;<span class="var">Integer</span>&gt; <span class="var">s</span> <span class="op">=</span> <span class="kw">new</span> <span class="var">Stack</span>&lt;&gt;()<span class="punc">;</span>
        <span class="var">s</span><span class="punc">.</span><span class="fn">push</span>(<span class="num">10</span>)<span class="punc">;</span>
        <span class="var">s</span><span class="punc">.</span><span class="fn">push</span>(<span class="num">20</span>)<span class="punc">;</span>
        
        <span class="var">System</span><span class="punc">.</span><span class="var">out</span><span class="punc">.</span><span class="fn">print</span>(<span class="str">"Top: "</span> <span class="op">+</span> <span class="var">s</span><span class="punc">.</span><span class="fn">peek</span>())<span class="punc">;</span>
        <span class="var">s</span><span class="punc">.</span><span class="fn">pop</span>()<span class="punc">;</span>
        <span class="var">System</span><span class="punc">.</span><span class="var">out</span><span class="punc">.</span><span class="fn">println</span>(<span class="str">"\\nTop after pop: "</span> <span class="op">+</span> <span class="var">s</span><span class="punc">.</span><span class="fn">peek</span>())<span class="punc">;</span>
    }
}</pre>
                    <div class="output-box" style="margin:0;"><div class="output-label">Output</div><code>Top: 20<br>Top after pop: 10</code></div>
                  </div>

                  <div class="code-panel" id="stack-py">
                    <pre><span class="cmt"># stack_demo.py</span>
<span class="var">s</span> <span class="op">=</span> []
<span class="var">s</span><span class="punc">.</span><span class="fn">append</span>(<span class="num">10</span>)
<span class="var">s</span><span class="punc">.</span><span class="fn">append</span>(<span class="num">20</span>)

<span class="fn">print</span>(<span class="str">"Top:"</span>, <span class="var">s</span>[<span class="op">-</span><span class="num">1</span>])
<span class="var">s</span><span class="punc">.</span><span class="fn">pop</span>()
<span class="fn">print</span>(<span class="str">"Top after pop:"</span>, <span class="var">s</span>[<span class="op">-</span><span class="num">1</span>])</pre>
                    <div class="output-box" style="margin:0;"><div class="output-label">Output</div><code>Top: 20<br>Top after pop: 10</code></div>
                  </div>
                </div>
              </div>

              <!-- MAP -->
              <h3 style="margin: 24px 0 12px; font-size: 18px; color: var(--text);">▸ Map</h3>
              <div class="code-block-wrapper" style="margin-bottom:32px;">
                <div class="code-header">
                  <div class="code-header-left">
                    <div class="code-tabs">
                      <div class="code-tab active" data-target="map-cpp">C++</div>
                      <div class="code-tab" data-target="map-c">C</div>
                      <div class="code-tab" data-target="map-java">Java</div>
                      <div class="code-tab" data-target="map-py">Python</div>
                    </div>
                  </div>
                  <button class="copy-btn" onclick="navigator.clipboard.writeText(document.querySelector('.code-panel.active pre').innerText)">Copy</button>
                </div>
                <div id="map-content-blocks">
                  <div class="code-panel active" id="map-cpp">
                    <pre><span class="cmt">// map_demo.cpp</span>
<span class="kw">#include</span> <span class="str">&lt;map&gt;</span>
<span class="kw">#include</span> <span class="str">&lt;iostream&gt;</span>
<span class="kw">using namespace</span> <span class="var">std</span><span class="punc">;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="var">map</span>&lt;<span class="kw">int</span>, <span class="var">string</span>&gt; <span class="var">m</span><span class="punc">;</span>
    <span class="var">m</span>[<span class="num">1</span>] <span class="op">=</span> <span class="str">"One"</span><span class="punc">;</span>
    <span class="var">m</span>[<span class="num">2</span>] <span class="op">=</span> <span class="str">"Two"</span><span class="punc">;</span>
    <span class="var">m</span>[<span class="num">3</span>] <span class="op">=</span> <span class="str">"Three"</span><span class="punc">;</span>
    
    <span class="kw">for</span> (<span class="kw">auto</span>&amp; <span class="var">p</span> : <span class="var">m</span>)
        <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="var">p</span><span class="punc">.</span><span class="var">first</span> <span class="op">&lt;&lt;</span> <span class="str">": "</span> <span class="op">&lt;&lt;</span> <span class="var">p</span><span class="punc">.</span><span class="var">second</span> <span class="op">&lt;&lt;</span> <span class="str">"\\n"</span><span class="punc">;</span>
    
    <span class="kw">if</span> (<span class="var">m</span><span class="punc">.</span><span class="fn">find</span>(<span class="num">2</span>) <span class="op">!=</span> <span class="var">m</span><span class="punc">.</span><span class="fn">end</span>())
        <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"Key 2 found!"</span><span class="punc">;</span>
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                    <div class="output-box" style="margin:0;"><div class="output-label">Output</div><code>1: One<br>2: Two<br>3: Three<br>Key 2 found!</code></div>
                  </div>

                  <div class="code-panel" id="map-c">
                    <pre><span class="cmt">// map_demo.c</span>
<span class="kw">#include</span> <span class="str">&lt;stdio.h&gt;</span>
<span class="kw">#include</span> <span class="str">&lt;string.h&gt;</span>

<span class="kw">struct</span> <span class="var">Pair</span> {
    <span class="kw">int</span> <span class="var">key</span><span class="punc">;</span>
    <span class="kw">char</span> <span class="var">value</span>[<span class="num">10</span>]<span class="punc">;</span>
};

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">struct</span> <span class="var">Pair</span> <span class="var">m</span>[<span class="num">3</span>]<span class="punc">;</span>
    <span class="var">m</span>[<span class="num">0</span>].<span class="var">key</span> <span class="op">=</span> <span class="num">1</span><span class="punc">;</span> <span class="fn">strcpy</span>(<span class="var">m</span>[<span class="num">0</span>].<span class="var">value</span>, <span class="str">"One"</span>)<span class="punc">;</span>
    <span class="var">m</span>[<span class="num">1</span>].<span class="var">key</span> <span class="op">=</span> <span class="num">2</span><span class="punc">;</span> <span class="fn">strcpy</span>(<span class="var">m</span>[<span class="num">1</span>].<span class="var">value</span>, <span class="str">"Two"</span>)<span class="punc">;</span>
    <span class="var">m</span>[<span class="num">2</span>].<span class="var">key</span> <span class="op">=</span> <span class="num">3</span><span class="punc">;</span> <span class="fn">strcpy</span>(<span class="var">m</span>[<span class="num">2</span>].<span class="var">value</span>, <span class="str">"Three"</span>)<span class="punc">;</span>
    
    <span class="kw">for</span> (<span class="kw">int</span> <span class="var">i</span> <span class="op">=</span> <span class="num">0</span><span class="punc">;</span> <span class="var">i</span> <span class="op">&lt;</span> <span class="num">3</span><span class="punc">;</span> <span class="var">i</span><span class="op">++</span>)
        <span class="fn">printf</span>(<span class="str">"%d: %s\\n"</span>, <span class="var">m</span>[<span class="var">i</span>].<span class="var">key</span>, <span class="var">m</span>[<span class="var">i</span>].<span class="var">value</span>)<span class="punc">;</span>
        
    <span class="kw">int</span> <span class="var">found</span> <span class="op">=</span> <span class="num">0</span><span class="punc">;</span>
    <span class="kw">for</span> (<span class="kw">int</span> <span class="var">i</span> <span class="op">=</span> <span class="num">0</span><span class="punc">;</span> <span class="var">i</span> <span class="op">&lt;</span> <span class="num">3</span><span class="punc">;</span> <span class="var">i</span><span class="op">++</span>) {
        <span class="kw">if</span> (<span class="var">m</span>[<span class="var">i</span>].<span class="var">key</span> <span class="op">==</span> <span class="num">2</span>) { <span class="var">found</span> <span class="op">=</span> <span class="num">1</span><span class="punc">;</span> <span class="kw">break</span><span class="punc">;</span> }
    }
    <span class="kw">if</span> (<span class="var">found</span>) <span class="fn">printf</span>(<span class="str">"Key 2 found!"</span>)<span class="punc">;</span>
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                    <div class="output-box" style="margin:0;"><div class="output-label">Output</div><code>1: One<br>2: Two<br>3: Three<br>Key 2 found!</code></div>
                  </div>

                  <div class="code-panel" id="map-java">
                    <pre><span class="cmt">// MapDemo.java</span>
<span class="kw">import</span> <span class="str">java.util.TreeMap</span><span class="punc">;</span>

<span class="kw">public class</span> <span class="fn">MapDemo</span> {
    <span class="kw">public static void</span> <span class="fn">main</span>(<span class="var">String</span>[] <span class="var">args</span>) {
        <span class="var">TreeMap</span>&lt;<span class="var">Integer</span>, <span class="var">String</span>&gt; <span class="var">m</span> <span class="op">=</span> <span class="kw">new</span> <span class="var">TreeMap</span>&lt;&gt;()<span class="punc">;</span>
        <span class="var">m</span><span class="punc">.</span><span class="fn">put</span>(<span class="num">1</span>, <span class="str">"One"</span>)<span class="punc">;</span>
        <span class="var">m</span><span class="punc">.</span><span class="fn">put</span>(<span class="num">2</span>, <span class="str">"Two"</span>)<span class="punc">;</span>
        <span class="var">m</span><span class="punc">.</span><span class="fn">put</span>(<span class="num">3</span>, <span class="str">"Three"</span>)<span class="punc">;</span>
        
        <span class="kw">for</span> (<span class="kw">var</span> <span class="var">entry</span> : <span class="var">m</span><span class="punc">.</span><span class="fn">entrySet</span>())
            <span class="var">System</span><span class="punc">.</span><span class="var">out</span><span class="punc">.</span><span class="fn">println</span>(<span class="var">entry</span><span class="punc">.</span><span class="fn">getKey</span>() <span class="op">+</span> <span class="str">": "</span> <span class="op">+</span> <span class="var">entry</span><span class="punc">.</span><span class="fn">getValue</span>())<span class="punc">;</span>
            
        <span class="kw">if</span> (<span class="var">m</span><span class="punc">.</span><span class="fn">containsKey</span>(<span class="num">2</span>))
            <span class="var">System</span><span class="punc">.</span><span class="var">out</span><span class="punc">.</span><span class="fn">println</span>(<span class="str">"Key 2 found!"</span>)<span class="punc">;</span>
    }
}</pre>
                    <div class="output-box" style="margin:0;"><div class="output-label">Output</div><code>1: One<br>2: Two<br>3: Three<br>Key 2 found!</code></div>
                  </div>

                  <div class="code-panel" id="map-py">
                    <pre><span class="cmt"># map_demo.py</span>
<span class="var">m</span> <span class="op">=</span> {<span class="num">1</span>: <span class="str">"One"</span>, <span class="num">2</span>: <span class="str">"Two"</span>, <span class="num">3</span>: <span class="str">"Three"</span>}

<span class="kw">for</span> <span class="var">key</span> <span class="kw">in</span> <span class="fn">sorted</span>(<span class="var">m</span><span class="punc">.</span><span class="fn">keys</span>()):
    <span class="fn">print</span>(<span class="str">f"{key}: {m[key]}"</span>)

<span class="kw">if</span> <span class="num">2</span> <span class="kw">in</span> <span class="var">m</span>:
    <span class="fn">print</span>(<span class="str">"Key 2 found!"</span>)</pre>
                    <div class="output-box" style="margin:0;"><div class="output-label">Output</div><code>1: One<br>2: Two<br>3: Three<br>Key 2 found!</code></div>
                  </div>
                </div>
              </div>

              <!-- ITERATORS -->
              <h3 style="margin: 24px 0 12px; font-size: 18px; color: var(--text);">▸ Iterators</h3>
              <div class="code-block-wrapper" style="margin-bottom:32px;">
                <div class="code-header">
                  <div class="code-header-left">
                    <div class="code-tabs">
                      <div class="code-tab active" data-target="it-cpp">C++</div>
                      <div class="code-tab" data-target="it-c">C</div>
                      <div class="code-tab" data-target="it-java">Java</div>
                      <div class="code-tab" data-target="it-py">Python</div>
                    </div>
                  </div>
                  <button class="copy-btn" onclick="navigator.clipboard.writeText(document.querySelector('.code-panel.active pre').innerText)">Copy</button>
                </div>
                <div id="it-content-blocks">
                  <div class="code-panel active" id="it-cpp">
                    <pre><span class="cmt">// iterator_demo.cpp</span>
<span class="kw">#include</span> <span class="str">&lt;vector&gt;</span>
<span class="kw">#include</span> <span class="str">&lt;iostream&gt;</span>
<span class="kw">using namespace</span> <span class="var">std</span><span class="punc">;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="var">vector</span>&lt;<span class="kw">int</span>&gt; <span class="var">v</span> <span class="op">=</span> {<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>}<span class="punc">;</span>
    
    <span class="cmt">// Classic iterator</span>
    <span class="var">vector</span>&lt;<span class="kw">int</span>&gt;::<span class="var">iterator</span> <span class="var">it</span><span class="punc">;</span>
    <span class="kw">for</span> (<span class="var">it</span> <span class="op">=</span> <span class="var">v</span><span class="punc">.</span><span class="fn">begin</span>()<span class="punc">;</span> <span class="var">it</span> <span class="op">!=</span> <span class="var">v</span><span class="punc">.</span><span class="fn">end</span>()<span class="punc">;</span> <span class="op">++</span><span class="var">it</span>)
        <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="op">*</span><span class="var">it</span> <span class="op">&lt;&lt;</span> <span class="str">" "</span><span class="punc">;</span>
    
    <span class="cmt">// Modern iterator: auto</span>
    <span class="kw">for</span> (<span class="kw">auto</span> <span class="var">it2</span> <span class="op">=</span> <span class="var">v</span><span class="punc">.</span><span class="fn">begin</span>()<span class="punc">;</span> <span class="var">it2</span> <span class="op">!=</span> <span class="var">v</span><span class="punc">.</span><span class="fn">end</span>()<span class="punc">;</span> <span class="op">++</span><span class="var">it2</span>)
        <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="op">*</span><span class="var">it2</span> <span class="op">&lt;&lt;</span> <span class="str">" "</span><span class="punc">;</span>
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                    <div class="output-box" style="margin:0;"><div class="output-label">Output</div><code>10 20 30  10 20 30</code></div>
                  </div>

                  <div class="code-panel" id="it-c">
                    <pre><span class="cmt">// iterator_demo.c</span>
<span class="kw">#include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> <span class="var">v</span>[] <span class="op">=</span> {<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>}<span class="punc">;</span>
    <span class="kw">int</span> <span class="var">size</span> <span class="op">=</span> <span class="num">3</span><span class="punc">;</span>
    
    <span class="cmt">// Traversal using pointer increment</span>
    <span class="kw">int</span>* <span class="var">it</span><span class="punc">;</span>
    <span class="kw">for</span> (<span class="var">it</span> <span class="op">=</span> <span class="var">v</span><span class="punc">;</span> <span class="var">it</span> <span class="op">!=</span> <span class="var">v</span> <span class="op">+</span> <span class="var">size</span><span class="punc">;</span> <span class="op">++</span><span class="var">it</span>) {
        <span class="fn">printf</span>(<span class="str">"%d "</span>, <span class="op">*</span><span class="var">it</span>)<span class="punc">;</span>
    }
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
                    <div class="output-box" style="margin:0;"><div class="output-label">Output</div><code>10 20 30</code></div>
                  </div>

                  <div class="code-panel" id="it-java">
                    <pre><span class="cmt">// IteratorDemo.java</span>
<span class="kw">import</span> <span class="str">java.util.ArrayList</span><span class="punc">;</span>
<span class="kw">import</span> <span class="str">java.util.Iterator</span><span class="punc">;</span>

<span class="kw">public class</span> <span class="fn">IteratorDemo</span> {
    <span class="kw">public static void</span> <span class="fn">main</span>(<span class="var">String</span>[] <span class="var">args</span>) {
        <span class="var">ArrayList</span>&lt;<span class="var">Integer</span>&gt; <span class="var">v</span> <span class="op">=</span> <span class="kw">new</span> <span class="var">ArrayList</span>&lt;&gt;()<span class="punc">;</span>
        <span class="var">v</span><span class="punc">.</span><span class="fn">add</span>(<span class="num">10</span>)<span class="punc">;</span> <span class="var">v</span><span class="punc">.</span><span class="fn">add</span>(<span class="num">20</span>)<span class="punc">;</span> <span class="var">v</span><span class="punc">.</span><span class="fn">add</span>(<span class="num">30</span>)<span class="punc">;</span>
        
        <span class="var">Iterator</span>&lt;<span class="var">Integer</span>&gt; <span class="var">it</span> <span class="op">=</span> <span class="var">v</span><span class="punc">.</span><span class="fn">iterator</span>()<span class="punc">;</span>
        <span class="kw">while</span> (<span class="var">it</span><span class="punc">.</span><span class="fn">hasNext</span>())
            <span class="var">System</span><span class="punc">.</span><span class="var">out</span><span class="punc">.</span><span class="fn">print</span>(<span class="var">it</span><span class="punc">.</span><span class="fn">next</span>() <span class="op">+</span> <span class="str">" "</span>)<span class="punc">;</span>
    }
}</pre>
                    <div class="output-box" style="margin:0;"><div class="output-label">Output</div><code>10 20 30</code></div>
                  </div>

                  <div class="code-panel" id="it-py">
                    <pre><span class="cmt"># iterator_demo.py</span>
<span class="var">v</span> <span class="op">=</span> [<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>]

<span class="cmt"># Traversal using built-in iter() and next()</span>
<span class="var">it</span> <span class="op">=</span> <span class="fn">iter</span>(<span class="var">v</span>)
<span class="kw">while True</span>:
    <span class="kw">try</span>:
        <span class="fn">print</span>(<span class="fn">next</span>(<span class="var">it</span>), <span class="var">end</span><span class="op">=</span><span class="str">" "</span>)
    <span class="kw">except</span> <span class="var">StopIteration</span>:
        <span class="kw">break</span></pre>
                    <div class="output-box" style="margin:0;"><div class="output-label">Output</div><code>10 20 30</code></div>
                  </div>
                </div>
              </div>
            </section>

            <!-- COMPLEXITY -->
            <section id="complexity">
              <div class="section-label">05 / Complexity</div>
              <div class="section-title">Complexity Analysis</div>
              <p class="section-desc">Comparing time and space complexities of standard container operations:</p>

              <table class="lit-table" style="margin-bottom: 24px;">
                <tr>
                  <th>Container</th>
                  <th>Access</th>
                  <th>Search</th>
                  <th>Insert</th>
                  <th>Delete</th>
                  <th>Space</th>
                </tr>
                <tr>
                  <td><strong>vector</strong></td>
                  <td>O(1)</td>
                  <td>O(n)</td>
                  <td>O(1)*</td>
                  <td>O(n)</td>
                  <td>O(n)</td>
                </tr>
                <tr>
                  <td><strong>array</strong></td>
                  <td>O(1)</td>
                  <td>O(n)</td>
                  <td>N/A</td>
                  <td>N/A</td>
                  <td>O(n)</td>
                </tr>
                <tr>
                  <td><strong>stack</strong></td>
                  <td>O(1)</td>
                  <td>O(n)</td>
                  <td>O(1)</td>
                  <td>O(1)</td>
                  <td>O(n)</td>
                </tr>
                <tr>
                  <td><strong>queue</strong></td>
                  <td>O(1)</td>
                  <td>O(n)</td>
                  <td>O(1)</td>
                  <td>O(1)</td>
                  <td>O(n)</td>
                </tr>
                <tr>
                  <td><strong>map</strong></td>
                  <td>O(log n)</td>
                  <td>O(log n)</td>
                  <td>O(log n)</td>
                  <td>O(log n)</td>
                  <td>O(n)</td>
                </tr>
                <tr>
                  <td><strong>set</strong></td>
                  <td>N/A</td>
                  <td>O(log n)</td>
                  <td>O(log n)</td>
                  <td>O(log n)</td>
                  <td>O(n)</td>
                </tr>
              </table>

              <div class="info-box">
                <strong>⚡ COMPLEXITY NOTES:</strong><br>
                * Amortized O(1) for push_back in vector (if capacity is exceeded, array is reallocated which is O(n), but this occurs infrequently).<br>
                * Random access is not applicable (N/A) for sets/maps because elements are sorted and referenced dynamically by keys/values.
              </div>
            </section>
            ` }} />

            {/* PRACTICE SECTION */}
            <section id="practice" className="my-16 scroll-mt-20">
              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-400 mb-2">
                  <Code2 className="w-4 h-4 text-primary-400" />
                  Practice Area
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-100">Coding Challenges</h3>
                <p className="text-sm text-slate-400 max-w-2xl mt-2">
                  Apply what you've learned. Solve these standard template library challenges to complete this module.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {practiceProblems.map((prob, idx) => {
                  const isCompleted = completedProblems.includes(prob.id);
                  return (
                    <button
                      key={prob.id}
                      onClick={() => setActivePracticeProblem(prob)}
                      className="w-full bg-[#080C10]/80 border border-slate-800 rounded-2xl p-5 hover:bg-slate-900/80 transition-all text-left flex items-center justify-between group relative overflow-hidden"
                      style={{ borderTop: `3px solid ${isCompleted ? 'var(--green)' : idx % 2 === 0 ? 'var(--accent)' : 'var(--accent3)'}` }}
                    >
                      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Code2 className="w-24 h-24 rotate-12" />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-700 uppercase">
                            Challenge {idx + 1}
                          </span>
                          {isCompleted && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded uppercase">
                              <CheckCircle className="w-3 h-3" /> Solved
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-bold text-slate-200 group-hover:text-primary-300 transition-colors">{prob.title}</h4>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all shrink-0 z-10">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <div dangerouslySetInnerHTML={{ __html: `
            <!-- SUMMARY -->
            <section id="summary">
              <div class="section-label">06 / Summary</div>
              <div class="section-title">Quick Review</div>
              <div class="summary-grid">
                <div class="summary-card">
                  <div class="s-num">01</div>
                  <div class="s-title">Standard Containers</div>
                  <div class="s-text">Vector, Map, and Set form the workhorse storage components of standard template libraries.</div>
                </div>
                <div class="summary-card">
                  <div class="s-num">02</div>
                  <div class="s-title">Pillars</div>
                  <div class="s-text">Designed symmetrically with Containers holding data, Algorithms processing data, and Iterators serving as the interface.</div>
                </div>
                <div class="summary-card">
                  <div class="s-num">03</div>
                  <div class="s-title">Optimization</div>
                  <div class="s-text">Containers like map (Red-Black Tree) achieve O(log n) performance for storage insertion and retrieval.</div>
                </div>
                <div class="summary-card">
                  <div class="s-num">04</div>
                  <div class="s-title">Clean Traversal</div>
                  <div class="s-text">Range-based loops simplify iteration using implicit begin/end methods.</div>
                </div>
              </div>
            </section>
            ` }} />
          </div>
        </div>
      </div>

      {activePracticeProblem && (
        <CodingArenaOverlay
          problem={activePracticeProblem}
          onClose={() => setActivePracticeProblem(null)}
          onSuccess={() => {
            if (!completedProblems.includes(activePracticeProblem.id)) {
              setCompletedProblems([...completedProblems, activePracticeProblem.id]);
            }
          }}
        />
      )}

      {/* Navigation Buttons */}
      <div className="w-full">
        <div className="max-w-[1260px] mx-auto">
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
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                allCompleted 
                  ? 'text-white bg-gradient-to-r from-emerald-500 to-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25' 
                  : 'text-slate-400 bg-slate-800 cursor-not-allowed opacity-50'
              }`}
            >
              {allCompleted ? 'Finish Module' : 'Complete Challenges to Finish'}
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
