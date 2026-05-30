import React, { useEffect } from 'react';
import ModuleLayout from '../../components/layout/ModuleLayout';
import ModuleNavigation from '../../components/layout/ModuleNavigation';
import './PrereqModules.css';

export default function DataTypesVariables() {
  useEffect(() => {
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
  }, []);

  return (
    <ModuleLayout title="Variables & Data Types" moduleId={1}>
      <div 
        className="module-content" 
        dangerouslySetInnerHTML={{ __html: `

  

  <!-- THEME TOGGLE -->
  

  <!-- SIDEBAR -->
  <aside class="sidebar">
    <div style="padding: 0 20px 24px; margin-bottom: 16px;"><a id="sidebar-back-btn" href="/prerequisite" class="nav-btn" style="border: none; padding: 8px 0;"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>Back to Dashboard</a></div>
    <div class="progress-bar">
      <div class="progress-fill" id="progressFill" style="width: 30%;"></div>
    </div>
    <div class="progress-label" id="progressLabel">30% complete</div>

    <div class="nav-section">Contents</div>
    <a class="nav-item active" href="#hero" onclick="scrollToSection('hero', event)"><span
        class="nav-dot"></span>Overview</a>
    <a class="nav-item" href="#primitive" onclick="scrollToSection('primitive', event)"><span
        class="nav-dot"></span>Primitive Types</a>
    <a class="nav-item" href="#code" onclick="scrollToSection('code', event)"><span class="nav-dot"></span>Data Type
      Examples</a>
    <a class="nav-item" href="#variables" onclick="scrollToSection('variables', event)"><span
        class="nav-dot"></span>Variables & Constants</a>
    <a class="nav-item" href="#identifiers" onclick="scrollToSection('identifiers', event)"><span
        class="nav-dot"></span>Identifiers</a>
    <a class="nav-item" href="#var-code" onclick="scrollToSection('var-code', event)"><span
        class="nav-dot"></span>Variable Examples</a>
  </aside>

  <div class="main">
    <div class="hero" id="hero">
      <div class="hero-visual">TYPE</div>
      <div class="hero-inner">
        
        <div class="hero-badges">
          <span class="badge badge-purple">🌱 Basics</span>
          <span class="badge badge-blue">⏱ 20 min read</span>
        </div>
        <h1 class="hero-title">Data Types &<br>Variables</h1>
        <p class="hero-sub">Understand the different types of data that can be stored in variables and how they define
          memory allocation.</p>
        <div class="hero-meta">
          <div class="hero-meta-item"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5v5l3 3" />
            </svg>~20 min</div>
          <div class="hero-meta-item"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <path
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>Conceptual Overview</div>
        </div>
      </div>
    </div>

    <div class="content">

      <section id="overview">
        <div class="section-title" style="display:flex;align-items:center;gap:12px;"><span
            style="background:var(--card2);padding:6px;border-radius:8px;display:flex;font-size:18px;">📖</span> Topic
          Overview</div>

        <div class="cards-grid" style="margin-top:24px;">
          <div class="card fade-up">
            <div
              style="font-size:12px;letter-spacing:1px;color:var(--accent3);text-transform:uppercase;margin-bottom:12px;font-weight:600;">
              What Are Data Types?</div>
            <div class="card-desc" style="color:var(--text2);line-height:1.7;">
              Data types define the <strong>nature of data</strong> a variable can hold, the amount of
              <strong>memory</strong> allocated to it, and the valid operations that can be performed. They are built
              directly into the language and map to underlying hardware execution units.
            </div>
          </div>
          <div class="card fade-up">
            <div
              style="font-size:12px;letter-spacing:1px;color:var(--accent2);text-transform:uppercase;margin-bottom:12px;font-weight:600;">
              Why It Matters</div>
            <ul
              style="color:var(--text2);line-height:1.8;padding-left:18px;margin:0;font-size:13px;list-style-type:'▸ ';">
              <li style="margin-bottom:10px;padding-left:4px;">Prevents memory waste and overflow bugs</li>
              <li style="margin-bottom:10px;padding-left:4px;">Enables compiler optimizations</li>
              <li style="margin-bottom:10px;padding-left:4px;">Guarantees type safety in operations</li>
              <li style="margin-bottom:10px;padding-left:4px;">Foundation for all data structures & algorithms</li>
              <li style="padding-left:4px;">Critical for embedded and system programming</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="primitive">
        <div class="section-label">Core Concepts</div>
        <div class="section-title">Primitive Data Types</div>

        <div class="cards-grid">
          <div class="card fade-up">
            <div class="card-icon" style="background:rgba(6,182,212,.15)">🔢</div>
            <div class="card-title">Integer</div>
            <div class="card-desc">Used to store whole numbers without decimals.<br>Examples: <code>-5</code>,
              <code>0</code>, <code>42</code>.</div>
          </div>
          <div class="card fade-up">
            <div class="card-icon" style="background:rgba(139,92,246,.15)">📏</div>
            <div class="card-title">Floating Point</div>
            <div class="card-desc">Used to store numbers with a fractional or decimal part.<br>Examples:
              <code>3.14</code>, <code>-0.001</code>.</div>
          </div>
          <div class="card fade-up">
            <div class="card-icon" style="background:rgba(16,185,129,.15)">🔤</div>
            <div class="card-title">Character</div>
            <div class="card-desc">Used to store a single letter, number, or symbol.<br>Examples: <code>'A'</code>,
              <code>'#'</code>, <code>'7'</code>.</div>
          </div>
          <div class="card fade-up">
            <div class="card-icon" style="background:rgba(239,68,68,.15)">⚖️</div>
            <div class="card-title">Boolean</div>
            <div class="card-desc">Used to store a logical value representing true or false.<br>Examples:
              <code>true</code>, <code>false</code>.</div>
          </div>
        </div>


      </section>

      <section id="code">
        <div class="section-label">Examples</div>
        <div class="section-title">Using Data Types</div>
        <p class="section-desc">Here is how primitive data types are used across different languages.</p>

        <div style="margin-bottom:32px">
          <div class="code-block-wrapper">
            <div class="code-header">
              <div class="code-header-left">
                <div class="code-tabs">
                  <div class="code-tab active" onclick="switchTab(this,'dt-block','c')">C</div>
                  <div class="code-tab" onclick="switchTab(this,'dt-block','cpp')">C++</div>
                  <div class="code-tab" onclick="switchTab(this,'dt-block','java')">Java</div>
                  <div class="code-tab" onclick="switchTab(this,'dt-block','py')">Python</div>
                </div>
              </div>
              <button class="copy-btn" onclick="copyCode('dt-block', event)">Copy</button>
            </div>
            <div id="dt-block">
              <div class="code-panel active" data-lang="c">
                <pre><span class="kw">int</span> <span class="var">age</span> <span class="op">=</span> <span class="num">25</span><span class="punc">;</span>            <span class="cmt">// Integer</span>
<span class="kw">float</span> <span class="var">price</span> <span class="op">=</span> <span class="num">19.99f</span><span class="punc">;</span>    <span class="cmt">// Float</span>
<span class="kw">char</span> <span class="var">grade</span> <span class="op">=</span> <span class="str">'A'</span><span class="punc">;</span>        <span class="cmt">// Character</span>
<span class="kw">int</span> <span class="var">is_logged_in</span> <span class="op">=</span> <span class="num">1</span><span class="punc">;</span>    <span class="cmt">// Boolean (0 or 1 in C)</span></pre>
              </div>
              <div class="code-panel" data-lang="cpp">
                <pre><span class="kw">int</span> <span class="var">age</span> <span class="op">=</span> <span class="num">25</span><span class="punc">;</span>            <span class="cmt">// Integer</span>
<span class="kw">float</span> <span class="var">price</span> <span class="op">=</span> <span class="num">19.99f</span><span class="punc">;</span>    <span class="cmt">// Float</span>
<span class="kw">char</span> <span class="var">grade</span> <span class="op">=</span> <span class="str">'A'</span><span class="punc">;</span>        <span class="cmt">// Character</span>
<span class="kw">bool</span> <span class="var">is_logged_in</span> <span class="op">=</span> <span class="kw">true</span><span class="punc">;</span> <span class="cmt">// Boolean</span></pre>
              </div>
              <div class="code-panel" data-lang="java">
                <pre><span class="kw">int</span> <span class="var">age</span> <span class="op">=</span> <span class="num">25</span><span class="punc">;</span>            <span class="cmt">// Integer</span>
<span class="kw">float</span> <span class="var">price</span> <span class="op">=</span> <span class="num">19.99f</span><span class="punc">;</span>    <span class="cmt">// Float</span>
<span class="kw">char</span> <span class="var">grade</span> <span class="op">=</span> <span class="str">'A'</span><span class="punc">;</span>        <span class="cmt">// Character</span>
<span class="kw">boolean</span> <span class="var">isLoggedIn</span> <span class="op">=</span> <span class="kw">true</span><span class="punc">;</span> <span class="cmt">// Boolean</span></pre>
              </div>
              <div class="code-panel" data-lang="py">
                <pre><span class="var">age</span> <span class="op">=</span> <span class="num">25</span>                 <span class="cmt"># Integer</span>
<span class="var">price</span> <span class="op">=</span> <span class="num">19.99</span>            <span class="cmt"># Float</span>
<span class="var">grade</span> <span class="op">=</span> <span class="str">'A'</span>              <span class="cmt"># String (Python uses strings for text)</span>
<span class="var">is_logged_in</span> <span class="op">=</span> <span class="kw">True</span>      <span class="cmt"># Boolean</span></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="variables">
        <div class="section-label">Core Concept 01</div>
        <div class="section-title">Variables</div>
        <div class="section-desc">A <strong>variable</strong> is a named storage location in the computer's memory (RAM) that holds a value. It associates a human-readable identifier with a specific memory address and a fixed number of bytes.</div>

        <div class="def-block">
          <strong>Definition:</strong> A variable links a name (identifier) &rarr; a memory address &rarr; a stored value. The value can be read, overwritten, and manipulated during program execution.
        </div>

        <div class="accord-item">
          <div class="accord-header" onclick="this.parentElement.classList.toggle('open')">
            <span style="display:flex;align-items:center;gap:12px;"><span style="color:#3b82f6;font-size:16px;">🔵</span> Variable Types in C</span>
            <span class="accord-arrow">▼</span>
          </div>
          <div class="accord-body">
            <p style="margin-bottom:12px;">C variables are governed by <em>storage classes</em>:</p>
            <ul style="list-style:none;padding:0;margin:0 0 16px 0;line-height:1.8;">
              <li><strong>Local (Automatic)</strong> &mdash; allocated on the stack when a function is called, destroyed on exit.</li>
              <li><strong>Global</strong> &mdash; allocated in the fixed data segment; accessible throughout the entire application.</li>
              <li><strong>Static</strong> &mdash; retains its value across function calls; scoped locally or file-wide.</li>
            </ul>
            <p>Variables must be declared at the beginning of a block (prior to C99), or before first use in C99+.</p>
          </div>
        </div>

        <div class="accord-item">
          <div class="accord-header" onclick="this.parentElement.classList.toggle('open')">
            <span style="display:flex;align-items:center;gap:12px;"><span style="color:#a855f7;font-size:16px;">🟣</span> Variable Types in C++</span>
            <span class="accord-arrow">▼</span>
          </div>
          <div class="accord-body">
            <p style="margin-bottom:12px;">C++ inherits C's scoping rules and introduces object-oriented instances. Variables can be declared anywhere in the code.</p>
            <p>C++ adds <strong>references (&amp;)</strong> &mdash; aliases to existing variables that share the same memory address without creating a copy.</p>
          </div>
        </div>

        <div class="accord-item">
          <div class="accord-header" onclick="this.parentElement.classList.toggle('open')">
            <span style="display:flex;align-items:center;gap:12px;"><span style="font-size:16px;">☕</span> Variable Types in Java</span>
            <span class="accord-arrow">▼</span>
          </div>
          <div class="accord-body">
            <p style="margin-bottom:12px;">Java is strongly, statically typed. Every variable must have a declared type. Three categories:</p>
            <ul style="list-style:none;padding:0;margin:0;line-height:1.8;">
              <li><strong>Instance Variables</strong> &mdash; declared inside a class, outside methods; tied to an object instance.</li>
              <li><strong>Class Variables (Static)</strong> &mdash; declared with <code>static</code>; one copy per class, shared by all instances.</li>
              <li><strong>Local Variables</strong> &mdash; declared inside methods; destroyed upon exit. Java has <em>no global variables</em>.</li>
            </ul>
          </div>
        </div>

        <div class="accord-item">
          <div class="accord-header" onclick="this.parentElement.classList.toggle('open')">
            <span style="display:flex;align-items:center;gap:12px;"><span style="color:#f59e0b;font-size:16px;">🐍</span> Variable Types in Python</span>
            <span class="accord-arrow">▼</span>
          </div>
          <div class="accord-body">
            <p style="margin-bottom:12px;">Python is dynamically typed. Variables are created the moment you first assign a value to them, without needing explicit declaration.</p>
            <ul style="list-style:none;padding:0;margin:0;line-height:1.8;">
              <li><strong>Local Variables</strong> &mdash; defined inside a function; accessible only within that function.</li>
              <li><strong>Global Variables</strong> &mdash; defined outside any function; accessible anywhere (using the <code>global</code> keyword to modify).</li>
              <li><strong>Nonlocal Variables</strong> &mdash; used in nested functions to modify variables in the outer, non-global scope (using the <code>nonlocal</code> keyword).</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="identifiers">
        <div class="section-label">Rules</div>
        <div class="section-title">Identifiers</div>
        <div class="section-desc">Identifiers are the names you give to variables, functions, and classes. All
          programming languages have specific rules for what constitutes a valid identifier name.</div>

        <div class="rules-grid">
          <div class="rule-card rule-valid">
            <div class="rule-header">Valid Identifiers</div>
            <ul style="list-style:none;margin-top:8px;font-size:13px;line-height:1.8;">
              <li>✅ Can contain letters (a-z, A-Z)</li>
              <li>✅ Can contain digits (0-9)</li>
              <li>✅ Can contain underscores (_)</li>
              <li>✅ Must start with a letter or underscore</li>
            </ul>
          </div>
          <div class="rule-card rule-invalid">
            <div class="rule-header">Invalid Identifiers</div>
            <ul style="list-style:none;margin-top:8px;font-size:13px;line-height:1.8;">
              <li>❌ Cannot start with a digit</li>
              <li>❌ Cannot contain spaces</li>
              <li>❌ Cannot contain special symbols like @, #, %</li>
              <li>❌ Cannot be a reserved keyword (e.g., <code>if</code>, <code>while</code>)</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="var-code">
        <div class="section-label">Examples</div>
        <div class="section-title">Variable Declarations</div>
        <p class="section-desc">Here is how variables and constants are declared across different languages.</p>

        <div style="margin-bottom:32px">
          <div class="code-block-wrapper">
            <div class="code-header">
              <div class="code-header-left">
                <div class="code-tabs">
                  <div class="code-tab active" onclick="switchTab(this,'var-block','c')">C</div>
                  <div class="code-tab" onclick="switchTab(this,'var-block','cpp')">C++</div>
                  <div class="code-tab" onclick="switchTab(this,'var-block','java')">Java</div>
                  <div class="code-tab" onclick="switchTab(this,'var-block','py')">Python</div>
                </div>
              </div>
              <button class="copy-btn" onclick="copyCode('var-block', event)">Copy</button>
            </div>
            <div id="var-block">
              <div class="code-panel active" data-lang="c">
                <pre><span class="cmt">// Variables</span>
<span class="kw">int</span> <span class="var">score</span> <span class="op">=</span> <span class="num">100</span><span class="punc">;</span>
<span class="var">score</span> <span class="op">=</span> <span class="num">105</span><span class="punc">;</span>              <span class="cmt">// Value can change after initialization</span>

<span class="cmt">// Constants</span>
<span class="kw">const int</span> <span class="var">MAX_SPEED</span> <span class="op">=</span> <span class="num">120</span><span class="punc">;</span> <span class="cmt">// Cannot be changed once assigned</span>
<span class="cmt">// MAX_SPEED = 150;       // Error: assignment of read-only variable</span>

<span class="cmt">// Identifiers (Naming Rules)</span>
<span class="kw">int</span> <span class="var">valid_name</span> <span class="op">=</span> <span class="num">1</span><span class="punc">;</span>       <span class="cmt">// Valid: letters and underscores</span>
<span class="kw">int</span> <span class="var">ValidName</span>  <span class="op">=</span> <span class="num">2</span><span class="punc">;</span>       <span class="cmt">// Valid: case-sensitive</span>
<span class="cmt">// int 1invalid = 3;      // Error: cannot start with a digit</span>
<span class="cmt">// int my name = 4;       // Error: cannot contain spaces</span></pre>
              </div>
              <div class="code-panel" data-lang="cpp">
                <pre><span class="cmt">// Variables</span>
<span class="kw">int</span> <span class="var">score</span> <span class="op">=</span> <span class="num">100</span><span class="punc">;</span>
<span class="var">score</span> <span class="op">=</span> <span class="num">105</span><span class="punc">;</span>              <span class="cmt">// Value can change after initialization</span>

<span class="cmt">// Constants</span>
<span class="kw">const int</span> <span class="var">MAX_SPEED</span> <span class="op">=</span> <span class="num">120</span><span class="punc">;</span> <span class="cmt">// Cannot be changed once assigned</span>
<span class="cmt">// MAX_SPEED = 150;       // Error: assignment of read-only variable</span>

<span class="cmt">// Identifiers (Naming Rules)</span>
<span class="kw">int</span> <span class="var">valid_name</span> <span class="op">=</span> <span class="num">1</span><span class="punc">;</span>       <span class="cmt">// Valid: letters and underscores</span>
<span class="kw">int</span> <span class="var">ValidName</span>  <span class="op">=</span> <span class="num">2</span><span class="punc">;</span>       <span class="cmt">// Valid: case-sensitive</span>
<span class="cmt">// int 1invalid = 3;      // Error: cannot start with a digit</span>
<span class="cmt">// int my name = 4;       // Error: cannot contain spaces</span></pre>
              </div>
              <div class="code-panel" data-lang="java">
                <pre><span class="cmt">// Variables</span>
<span class="kw">int</span> <span class="var">score</span> <span class="op">=</span> <span class="num">100</span><span class="punc">;</span>
<span class="var">score</span> <span class="op">=</span> <span class="num">105</span><span class="punc">;</span>              <span class="cmt">// Value can change after initialization</span>

<span class="cmt">// Constants</span>
<span class="kw">final int</span> <span class="var">MAX_SPEED</span> <span class="op">=</span> <span class="num">120</span><span class="punc">;</span> <span class="cmt">// Cannot be changed once assigned</span>
<span class="cmt">// MAX_SPEED = 150;       // Error: final variable cannot be reassigned</span>

<span class="cmt">// Identifiers (Naming Rules)</span>
<span class="kw">int</span> <span class="var">valid_name</span> <span class="op">=</span> <span class="num">1</span><span class="punc">;</span>       <span class="cmt">// Valid: letters and underscores</span>
<span class="kw">int</span> <span class="var">ValidName</span>  <span class="op">=</span> <span class="num">2</span><span class="punc">;</span>       <span class="cmt">// Valid: case-sensitive</span>
<span class="cmt">// int 1invalid = 3;      // Error: cannot start with a digit</span>
<span class="cmt">// int my name = 4;       // Error: cannot contain spaces</span></pre>
              </div>
              <div class="code-panel" data-lang="py">
                <pre><span class="cmt"># Variables</span>
<span class="var">score</span> <span class="op">=</span> <span class="num">100</span>
<span class="var">score</span> <span class="op">=</span> <span class="num">105</span>               <span class="cmt"># Value can change after initialization</span>

<span class="cmt"># Constants</span>
<span class="var">MAX_SPEED</span> <span class="op">=</span> <span class="num">120</span>           <span class="cmt"># Python lacks strict constants, UPPERCASE is convention</span>

<span class="cmt"># Identifiers (Naming Rules)</span>
<span class="var">valid_name</span> <span class="op">=</span> <span class="num">1</span>            <span class="cmt"># Valid: letters and underscores</span>
<span class="var">ValidName</span>  <span class="op">=</span> <span class="num">2</span>            <span class="cmt"># Valid: case-sensitive</span>
<span class="cmt"># 1invalid = 3            # Error: cannot start with a digit</span>
<span class="cmt"># my name = 4             # Error: cannot contain spaces</span></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      

    </div>
  </div>
  
` }} 
      />
      <div className="w-full">
        <div className="max-w-[980px] mx-auto">
          <ModuleNavigation moduleId={1} />
        </div>
      </div>
    </ModuleLayout>
  );
}
