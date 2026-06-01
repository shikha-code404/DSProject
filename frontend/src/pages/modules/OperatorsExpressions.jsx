import React, { useEffect } from 'react';
import ModuleLayout from '../../components/layout/ModuleLayout';
import ModuleNavigation from '../../components/layout/ModuleNavigation';
import './PrereqModules.css';

export default function OperatorsExpressions() {
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
    <ModuleLayout title="Operators & Expressions" moduleId={3}>
      <div 
        className="module-content" 
        dangerouslySetInnerHTML={{ __html: `



<!-- THEME TOGGLE -->


<!-- SIDEBAR -->
<aside class="sidebar">
  <div style="padding: 0 20px 24px; margin-bottom: 16px;"><a id="sidebar-back-btn" href="/prerequisite" class="nav-btn" style="border: none; padding: 8px 0;"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>Back to Dashboard</a></div>
  <div class="progress-bar"><div class="progress-fill" id="progressFill" style="width: 45%;"></div></div>
  <div class="progress-label" id="progressLabel">45% complete</div>

  <div class="nav-section">Contents</div>
  <a class="nav-item active" href="#hero" onclick="scrollToSection('hero', event)"><span class="nav-dot"></span>Overview</a>
    <a class="nav-item" href="#theory" onclick="scrollToSection('theory', event)"><span class="nav-dot"></span>Core Theory</a>
  <a class="nav-item" href="#bitwise" onclick="scrollToSection('bitwise', event)"><span class="nav-dot"></span>Bitwise Visual</a>
  <a class="nav-item" href="#code" onclick="scrollToSection('code', event)"><span class="nav-dot"></span>Examples</a>
        <a class="nav-item" href="#summary" onclick="scrollToSection('summary', event)"><span class="nav-dot"></span>Summary</a>
</aside>

<div class="main">
<div class="hero" id="hero">
  <div class="hero-visual">OPS</div>
  <div class="hero-inner">
    
    <div class="hero-badges">
      <span class="badge badge-purple">🌱 Basics</span>
      <span class="badge badge-blue">⏱ 45 min read</span>
    </div>
    <h1 class="hero-title">Operators &<br>Expressions</h1>
    <p class="hero-sub">Master the building blocks of every program &mdash; operators are the verbs of programming. Learn how to perform calculations, compare values, combine logic, assign data, and manipulate bits.</p>
    <div class="hero-meta">
      <div class="hero-meta-item"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5v5l3 3"/></svg>~45 min</div>
      <div class="hero-meta-item"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>Comprehensive Guide</div>
    </div>
  </div>
</div>

<div class="content">

<section id="overview">
  <div class="section-label">Module Overview</div>
  <div class="section-title">Topic Overview</div>
  <div class="section-desc">Operators are symbols that perform operations on variables and values. An <strong>Expression</strong> is a combination of variables, constants, and operators that produces a result &mdash; e.g. <code>a + b</code> where <code>a</code> &amp; <code>b</code> are operands and <code>+</code> is the operator.</div>
  
  <div class="cards-grid">
    <div class="card fade-up">
      <div class="card-icon" style="background:rgba(6,182,212,.15)">📌</div>
      <div class="card-title">Why Important</div>
      <div class="card-desc">Used in every single program &mdash; from simple addition to complex bit manipulation in OS kernels.</div>
    </div>
    <div class="card fade-up">
      <div class="card-icon" style="background:rgba(16,185,129,.15)">🌐</div>
      <div class="card-title">Real-World Use</div>
      <div class="card-desc">Banking apps, calculators, login systems, networking, encryption, game engines, and more.</div>
    </div>
    <div class="card fade-up">
      <div class="card-icon" style="background:rgba(139,92,246,.15)">📚</div>
      <div class="card-title">5 Types Covered</div>
      <div class="card-desc">Arithmetic, Relational, Logical, Assignment, and Bitwise &mdash; each with distinct purpose and syntax.</div>
    </div>
  </div>
</section>


<section id="theory">
  <div class="section-label">Core Theory</div>
  <div class="section-title">Operator Tables</div>
  <div class="section-desc">A comprehensive breakdown of all operators across languages.</div>
  
  <div class="info-box">
    <strong>Key Terms:</strong> An <strong>Operand</strong> is a value an operator acts on. An <strong>Operator</strong> is a symbol performing an action. An <strong>Expression</strong> is an operand-operator combination that evaluates to a result.
  </div>

  <h3 style="font-size:16px; margin: 32px 0 16px; color: var(--accent2);">1. Arithmetic Operators</h3>
  <table class="lit-table">
    <tr><th>Operator</th><th>Meaning</th><th>Example (a=10, b=5)</th><th>Result</th></tr>
    <tr><td><code>+</code></td><td>Addition</td><td><code>a + b</code></td><td>15</td></tr>
    <tr><td><code>-</code></td><td>Subtraction</td><td><code>a - b</code></td><td>5</td></tr>
    <tr><td><code>*</code></td><td>Multiplication</td><td><code>a * b</code></td><td>50</td></tr>
    <tr><td><code>/</code></td><td>Division</td><td><code>a / b</code></td><td>2</td></tr>
    <tr><td><code>%</code></td><td>Modulus (Remainder)</td><td><code>a % b</code></td><td>0</td></tr>
  </table>

  <h3 style="font-size:16px; margin: 32px 0 16px; color: var(--accent2);">2. Relational Operators</h3>
  <table class="lit-table">
    <tr><th>Operator</th><th>Meaning</th><th>Example (a=10, b=20)</th><th>Result</th></tr>
    <tr><td><code>==</code></td><td>Equal to</td><td><code>a == b</code></td><td>False</td></tr>
    <tr><td><code>!=</code></td><td>Not equal to</td><td><code>a != b</code></td><td>True</td></tr>
    <tr><td><code>&gt;</code></td><td>Greater than</td><td><code>a &gt; b</code></td><td>False</td></tr>
    <tr><td><code>&lt;</code></td><td>Less than</td><td><code>a &lt; b</code></td><td>True</td></tr>
    <tr><td><code>&gt;=</code></td><td>Greater than or equal</td><td><code>a &gt;= b</code></td><td>False</td></tr>
    <tr><td><code>&lt;=</code></td><td>Less than or equal</td><td><code>a &lt;= b</code></td><td>True</td></tr>
  </table>

  <h3 style="font-size:16px; margin: 32px 0 16px; color: var(--accent2);">3. Logical Operators</h3>
  <table class="lit-table">
    <tr><th>C/C++/Java</th><th>Python</th><th>Meaning</th><th>Returns True when...</th></tr>
    <tr><td><code>&amp;&amp;</code></td><td><code>and</code></td><td>Logical AND</td><td>Both conditions are true</td></tr>
    <tr><td><code>||</code></td><td><code>or</code></td><td>Logical OR</td><td>At least one condition is true</td></tr>
    <tr><td><code>!</code></td><td><code>not</code></td><td>Logical NOT</td><td>Condition is false (inverts result)</td></tr>
  </table>

  <h3 style="font-size:16px; margin: 32px 0 16px; color: var(--accent2);">4. Assignment Operators</h3>
  <table class="lit-table">
    <tr><th>Operator</th><th>Meaning</th><th>Equivalent to</th></tr>
    <tr><td><code>=</code></td><td>Assign value</td><td><code>a = 10</code></td></tr>
    <tr><td><code>+=</code></td><td>Add and assign</td><td><code>a = a + 5</code></td></tr>
    <tr><td><code>-=</code></td><td>Subtract and assign</td><td><code>a = a - 2</code></td></tr>
    <tr><td><code>*=</code></td><td>Multiply and assign</td><td><code>a = a * 3</code></td></tr>
    <tr><td><code>/=</code></td><td>Divide and assign</td><td><code>a = a / 2</code></td></tr>
    <tr><td><code>%=</code></td><td>Modulus and assign</td><td><code>a = a % 3</code></td></tr>
  </table>

  <h3 style="font-size:16px; margin: 32px 0 16px; color: var(--accent2);">5. Bitwise Operators</h3>
  <table class="lit-table">
    <tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result</th></tr>
    <tr><td><code>&amp;</code></td><td>Bitwise AND</td><td><code>5 &amp; 3</code></td><td>1</td></tr>
    <tr><td><code>|</code></td><td>Bitwise OR</td><td><code>5 | 3</code></td><td>7</td></tr>
    <tr><td><code>^</code></td><td>XOR</td><td><code>5 ^ 3</code></td><td>6</td></tr>
    <tr><td><code>~</code></td><td>Complement</td><td><code>~5</code></td><td>-6</td></tr>
    <tr><td><code>&lt;&lt;</code></td><td>Left Shift</td><td><code>5 &lt;&lt; 1</code></td><td>10</td></tr>
    <tr><td><code>&gt;&gt;</code></td><td>Right Shift</td><td><code>5 &gt;&gt; 1</code></td><td>2</td></tr>
  </table>
</section>

<section id="bitwise">
  <div class="section-label">Deep Dive</div>
  <div class="section-title">Bitwise Visual Diagram</div>
  <div class="section-desc">5 AND 3 = 1 explained in binary, using the memory-cell visualization.</div>
  
  <div class="info-box">
    Computers store data as binary (0s and 1s). Bitwise operators work on each bit individually. Here's <code>5 &amp; 3</code> step by step:
  </div>

  <div class="mem-diagram" style="margin-top: 24px;">
    <div class="mem-title">Binary AND Operation</div>
    
    <div class="mem-row">
      <div class="mem-label">5 (101)</div>
      <div class="mem-cell"><span class="addr">bit 2</span><span class="val">1</span></div>
      <div class="mem-cell"><span class="addr">bit 1</span><span style="color:var(--text3)">0</span></div>
      <div class="mem-cell"><span class="addr">bit 0</span><span class="val">1</span></div>
    </div>
    
    <div class="mem-row">
      <div class="mem-label" style="font-size: 16px; color: var(--text3);">&amp;</div>
    </div>
    
    <div class="mem-row">
      <div class="mem-label">3 (011)</div>
      <div class="mem-cell"><span class="addr">bit 2</span><span style="color:var(--text3)">0</span></div>
      <div class="mem-cell"><span class="addr">bit 1</span><span class="val">1</span></div>
      <div class="mem-cell"><span class="addr">bit 0</span><span class="val">1</span></div>
    </div>
    
    <div class="mem-row">
      <div class="mem-label" style="font-size: 16px; color: var(--accent4);">==</div>
    </div>
    
    <div class="mem-row">
      <div class="mem-label">1 (001)</div>
      <div class="mem-cell"><span class="addr">0 &amp; 0</span><span style="color:var(--text3)">0</span></div>
      <div class="mem-cell"><span class="addr">0 &amp; 1</span><span style="color:var(--text3)">0</span></div>
      <div class="mem-cell" style="border-color: var(--accent3); background: rgba(6,182,212,0.1);"><span class="addr" style="color:var(--accent3);">1 &amp; 1</span><span class="val" style="color:var(--accent3);">1</span></div>
    </div>
  </div>

  <div class="warn-box">
    <strong>AND Rule:</strong> Result bit = 1 only when <em>both</em> bits are 1. Otherwise 0. That's why only the last bit (bit 0) gives 1.
  </div>
</section>

<section id="code">
  <div class="section-label">Examples</div>
  <div class="section-title">Code Implementation</div>
  <div class="section-desc">All 5 operator types across different languages.</div>
  
  <div class="code-block-wrapper">
    <div class="code-header">
      <div class="code-header-left">
        <div class="code-tabs">
          <div class="code-tab active" onclick="switchTab(this,'ops-block','c')">C</div>
          <div class="code-tab" onclick="switchTab(this,'ops-block','cpp')">C++</div>
          <div class="code-tab" onclick="switchTab(this,'ops-block','java')">Java</div>
          <div class="code-tab" onclick="switchTab(this,'ops-block','py')">Python</div>
        </div>
      </div>
      <button class="copy-btn" onclick="copyCode('ops-block', event)">Copy</button>
    </div>
    <div id="ops-block">
      <div class="code-panel active" data-lang="c">
        <pre><span class="cmt">// ─── C: Operators ───────────────────────────────</span>
<span class="pre">#include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> <span class="var">a</span> <span class="op">=</span> <span class="num">10</span>, <span class="var">b</span> <span class="op">=</span> <span class="num">5</span><span class="punc">;</span>

    <span class="cmt">// 1. Arithmetic</span>
    <span class="fn">printf</span>(<span class="str">"a + b = %d\\n"</span>, <span class="var">a</span> <span class="op">+</span> <span class="var">b</span>)<span class="punc">;</span>    <span class="cmt">// 15</span>
    <span class="fn">printf</span>(<span class="str">"a %% b = %d\\n"</span>, <span class="var">a</span> <span class="op">%</span> <span class="var">b</span>)<span class="punc">;</span>   <span class="cmt">// 0</span>

    <span class="cmt">// 2. Relational</span>
    <span class="fn">printf</span>(<span class="str">"a &gt; b: %d\\n"</span>,  <span class="var">a</span> <span class="op">&gt;</span> <span class="var">b</span>)<span class="punc">;</span>    <span class="cmt">// 1 (true)</span>
    <span class="fn">printf</span>(<span class="str">"a != b: %d\\n"</span>, <span class="var">a</span> <span class="op">!=</span> <span class="var">b</span>)<span class="punc">;</span>   <span class="cmt">// 1 (true)</span>

    <span class="cmt">// 3. Logical</span>
    <span class="fn">printf</span>(<span class="str">"a&gt;0 &amp;&amp; b&gt;0: %d\\n"</span>, (<span class="var">a</span><span class="op">&gt;</span><span class="num">0</span> <span class="op">&amp;&amp;</span> <span class="var">b</span><span class="op">&gt;</span><span class="num">0</span>))<span class="punc">;</span> <span class="cmt">// 1</span>

    <span class="cmt">// 4. Assignment</span>
    <span class="var">a</span> <span class="op">+=</span> <span class="num">5</span><span class="punc">;</span>                        <span class="cmt">// a is now 15</span>
    <span class="var">a</span> <span class="op">-=</span> <span class="num">3</span><span class="punc">;</span>                        <span class="cmt">// a is now 12</span>

    <span class="cmt">// 5. Bitwise</span>
    <span class="kw">int</span> <span class="var">x</span> <span class="op">=</span> <span class="num">5</span>, <span class="var">y</span> <span class="op">=</span> <span class="num">3</span><span class="punc">;</span>              <span class="cmt">// 101, 011</span>
    <span class="fn">printf</span>(<span class="str">"x &amp; y = %d\\n"</span>, <span class="var">x</span> <span class="op">&amp;</span> <span class="var">y</span>)<span class="punc">;</span>    <span class="cmt">// 1</span>
    <span class="fn">printf</span>(<span class="str">"x | y = %d\\n"</span>, <span class="var">x</span> <span class="op">|</span> <span class="var">y</span>)<span class="punc">;</span>    <span class="cmt">// 7</span>
    
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
      </div>
      <div class="code-panel" data-lang="cpp">
        <pre><span class="cmt">// ─── C++: Operators ─────────────────────────────</span>
<span class="pre">#include</span> <span class="str">&lt;iostream&gt;</span>
<span class="kw">using namespace</span> <span class="var">std</span><span class="punc">;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> <span class="var">a</span> <span class="op">=</span> <span class="num">10</span>, <span class="var">b</span> <span class="op">=</span> <span class="num">5</span><span class="punc">;</span>

    <span class="cmt">// Arithmetic</span>
    <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"a + b = "</span> <span class="op">&lt;&lt;</span> (<span class="var">a</span><span class="op">+</span><span class="var">b</span>) <span class="op">&lt;&lt;</span> <span class="var">endl</span><span class="punc">;</span>   <span class="cmt">// 15</span>

    <span class="cmt">// Relational</span>
    <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"a &gt; b: "</span>  <span class="op">&lt;&lt;</span> (<span class="var">a</span><span class="op">&gt;</span><span class="var">b</span>)  <span class="op">&lt;&lt;</span> <span class="var">endl</span><span class="punc">;</span>   <span class="cmt">// 1</span>

    <span class="cmt">// Logical</span>
    <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"a&gt;0 &amp;&amp; b&gt;0: "</span> <span class="op">&lt;&lt;</span> (<span class="var">a</span><span class="op">&gt;</span><span class="num">0</span> <span class="op">&amp;&amp;</span> <span class="var">b</span><span class="op">&gt;</span><span class="num">0</span>) <span class="op">&lt;&lt;</span> <span class="var">endl</span><span class="punc">;</span> <span class="cmt">// 1</span>

    <span class="cmt">// Assignment</span>
    <span class="var">a</span> <span class="op">+=</span> <span class="num">5</span><span class="punc">;</span> <span class="var">a</span> <span class="op">-=</span> <span class="num">3</span><span class="punc">;</span>                        <span class="cmt">// a = 12</span>

    <span class="cmt">// Bitwise</span>
    <span class="kw">int</span> <span class="var">x</span> <span class="op">=</span> <span class="num">5</span>, <span class="var">y</span> <span class="op">=</span> <span class="num">3</span><span class="punc">;</span>                      <span class="cmt">// 101, 011</span>
    <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"x &amp; y = "</span> <span class="op">&lt;&lt;</span> (<span class="var">x</span><span class="op">&amp;</span><span class="var">y</span>) <span class="op">&lt;&lt;</span> <span class="var">endl</span><span class="punc">;</span>   <span class="cmt">// 1</span>

    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre>
      </div>
      <div class="code-panel" data-lang="java">
        <pre><span class="cmt">// ─── Java: Operators ────────────────────────────</span>
<span class="kw">public class</span> <span class="tp">Main</span> {
    <span class="kw">public static void</span> <span class="fn">main</span>(<span class="tp">String</span>[] <span class="var">args</span>) {
        <span class="kw">int</span> <span class="var">a</span> <span class="op">=</span> <span class="num">10</span>, <span class="var">b</span> <span class="op">=</span> <span class="num">5</span><span class="punc">;</span>

        <span class="cmt">// Arithmetic</span>
        <span class="var">System</span>.<span class="var">out</span>.<span class="fn">println</span>(<span class="str">"a + b = "</span> <span class="op">+</span> (<span class="var">a</span><span class="op">+</span><span class="var">b</span>))<span class="punc">;</span> <span class="cmt">// 15</span>

        <span class="cmt">// Relational</span>
        <span class="var">System</span>.<span class="var">out</span>.<span class="fn">println</span>(<span class="str">"a &gt; b: "</span> <span class="op">+</span> (<span class="var">a</span><span class="op">&gt;</span><span class="var">b</span>))<span class="punc">;</span>  <span class="cmt">// true</span>

        <span class="cmt">// Logical</span>
        <span class="var">System</span>.<span class="var">out</span>.<span class="fn">println</span>(<span class="str">"a&gt;0 &amp;&amp; b&gt;0: "</span><span class="op">+</span>(<span class="var">a</span><span class="op">&gt;</span><span class="num">0</span> <span class="op">&amp;&amp;</span> <span class="var">b</span><span class="op">&gt;</span><span class="num">0</span>))<span class="punc">;</span> <span class="cmt">// true</span>

        <span class="cmt">// Assignment</span>
        <span class="var">a</span> <span class="op">+=</span> <span class="num">5</span><span class="punc">;</span> <span class="var">a</span> <span class="op">-=</span> <span class="num">3</span><span class="punc">;</span>                       <span class="cmt">// a = 12</span>

        <span class="cmt">// Bitwise</span>
        <span class="kw">int</span> <span class="var">x</span> <span class="op">=</span> <span class="num">5</span>, <span class="var">y</span> <span class="op">=</span> <span class="num">3</span><span class="punc">;</span>
        <span class="var">System</span>.<span class="var">out</span>.<span class="fn">println</span>(<span class="str">"x &amp; y = "</span><span class="op">+</span>(<span class="var">x</span><span class="op">&amp;</span><span class="var">y</span>))<span class="punc">;</span> <span class="cmt">// 1</span>
    }
}</pre>
      </div>
      <div class="code-panel" data-lang="py">
        <pre><span class="cmt"># ─── Python: Operators ───────────────────────────</span>
<span class="var">a</span>, <span class="var">b</span> <span class="op">=</span> <span class="num">10</span>, <span class="num">5</span>

<span class="cmt"># Arithmetic</span>
<span class="fn">print</span>(<span class="str">"a + b ="</span>, <span class="var">a</span> <span class="op">+</span> <span class="var">b</span>)    <span class="cmt"># 15</span>

<span class="cmt"># Relational</span>
<span class="fn">print</span>(<span class="str">"a &gt; b:"</span>, <span class="var">a</span> <span class="op">&gt;</span> <span class="var">b</span>)     <span class="cmt"># True</span>

<span class="cmt"># Logical (Python uses words)</span>
<span class="fn">print</span>(<span class="str">"a&gt;0 and b&gt;0:"</span>, <span class="var">a</span><span class="op">&gt;</span><span class="num">0</span> <span class="kw">and</span> <span class="var">b</span><span class="op">&gt;</span><span class="num">0</span>)  <span class="cmt"># True</span>

<span class="cmt"># Assignment</span>
<span class="var">a</span> <span class="op">+=</span> <span class="num">5</span>                     <span class="cmt"># a = 15</span>
<span class="var">a</span> <span class="op">-=</span> <span class="num">3</span>                     <span class="cmt"># a = 12</span>

<span class="cmt"># Bitwise</span>
<span class="var">x</span>, <span class="var">y</span> <span class="op">=</span> <span class="num">5</span>, <span class="num">3</span>                <span class="cmt"># 101, 011</span>
<span class="fn">print</span>(<span class="str">"x &amp; y ="</span>, <span class="var">x</span> <span class="op">&amp;</span> <span class="var">y</span>)    <span class="cmt"># 1</span></pre>
      </div>
    </div>
  </div>
</section>




<section id="summary">
  <div class="section-label">Wrap Up</div>
  <div class="section-title">Quick Summary</div>
  <div class="section-desc">Key takeaways for revision.</div>
  
  <div class="summary-grid">
    <div class="summary-card">
      <div class="s-num">01</div>
      <div class="s-title">Arithmetic</div>
      <div class="s-text">+, -, *, /, % for math operations.</div>
    </div>
    <div class="summary-card">
      <div class="s-num">02</div>
      <div class="s-title">Relational</div>
      <div class="s-text">==, !=, &gt;, &lt;, &gt;=, &lt;=. Returns true or false.</div>
    </div>
    <div class="summary-card">
      <div class="s-num">03</div>
      <div class="s-title">Logical</div>
      <div class="s-text">&amp;&amp;, ||, !. Combines conditions for complex logic.</div>
    </div>
    <div class="summary-card">
      <div class="s-num">04</div>
      <div class="s-title">Assignment</div>
      <div class="s-text">=, +=, -=. Shorthand variable updates.</div>
    </div>
    <div class="summary-card">
      <div class="s-num">05</div>
      <div class="s-title">Bitwise</div>
      <div class="s-text">&amp;, |, ^, ~, &lt;&lt;, &gt;&gt;. Binary manipulation.</div>
    </div>
  </div>
</section>



</div><!-- .content -->
</div><!-- .main -->


` }} 
      />
      <div className="w-full">
        <div className="max-w-[980px] mx-auto">
          <ModuleNavigation moduleId={3} />
        </div>
      </div>
    </ModuleLayout>
  );
}
