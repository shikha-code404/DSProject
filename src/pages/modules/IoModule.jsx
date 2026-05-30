import React, { useEffect } from 'react';
import ModuleLayout from '../../components/layout/ModuleLayout';
import ModuleNavigation from '../../components/layout/ModuleNavigation';
import './PrereqModules.css';

export default function IoModule() {
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
    <ModuleLayout title="Input / Output" moduleId={2}>
      <div 
        className="module-content" 
        dangerouslySetInnerHTML={{ __html: `



<!-- THEME TOGGLE -->


<!-- SIDEBAR -->
<aside class="sidebar">
  <div style="padding: 0 20px 24px; margin-bottom: 16px;"><a id="sidebar-back-btn" href="/prerequisite" class="nav-btn" style="border: none; padding: 8px 0;"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>Back to Dashboard</a></div>
  <div class="progress-bar"><div class="progress-fill" id="progressFill" style="width: 35%;"></div></div>
  <div class="progress-label" id="progressLabel">35% complete</div>

  <div class="nav-section">Contents</div>
  <a class="nav-item active" href="#hero" onclick="scrollToSection('hero', event)"><span class="nav-dot"></span>Overview</a>
  <a class="nav-item" href="#concept" onclick="scrollToSection('concept', event)"><span class="nav-dot"></span>Core Concept</a>
  <a class="nav-item" href="#flow" onclick="scrollToSection('flow', event)"><span class="nav-dot"></span>I/O Flow Diagram</a>
  <a class="nav-item" href="#code" onclick="scrollToSection('code', event)"><span class="nav-dot"></span>Examples</a>
</aside>

<div class="main">
<div class="hero" id="hero">
  <div class="hero-visual">I/O</div>
  <div class="hero-inner">
    
    <div class="hero-badges">
      <span class="badge badge-purple">🌱 Basics</span>
      <span class="badge badge-blue">⏱ 20 min read</span>
    </div>
    <h1 class="hero-title">Input & Output<br>Operations</h1>
    <p class="hero-sub">Understand the foundational concept of how programs communicate with users — accepting data and displaying results.</p>
    <div class="hero-meta">
      <div class="hero-meta-item"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5v5l3 3"/></svg>~20 min</div>
      <div class="hero-meta-item"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>Conceptual Overview</div>
    </div>
  </div>
</div>

<div class="content">

<section id="concept">
  <div class="section-label">Module Overview</div>
  <div class="section-title">Topic Overview</div>
  <div class="section-desc">Input and Output operations are one of the most foundational concepts in programming. A program becomes truly interactive only when it can accept data from the user (Input) and display results (Output). These operations are the bridge between the user and the computer program.</div>
  
  <div class="cards-grid">
    <div class="card fade-up">
      <div class="card-icon" style="background:rgba(6,182,212,.15)">⌨️</div>
      <div class="card-title">Input</div>
      <div class="card-desc">Data given to the program by the user. Examples: entering age, typing a name, providing numbers for calculations.</div>
    </div>
    <div class="card fade-up">
      <div class="card-icon" style="background:rgba(16,185,129,.15)">🖥️</div>
      <div class="card-title">Output</div>
      <div class="card-desc">Information displayed after processing. Examples: result of addition, user details, printed messages.</div>
    </div>
  </div>

  <div class="info-box" style="margin-top:24px;">
    <strong>Why It Matters:</strong> I/O operations make programs interactive, help process user data, enable calculations and decision-making, and are essential for every real-world application — from web apps to system software.
  </div>
</section>

<section id="flow">
  <div class="section-label">Core Concept</div>
  <div class="section-title">I/O Flow Diagram</div>
  <p class="section-desc">The standard flow of data from the user, through the program, and back to the screen.</p>
  
  <div style="display:flex;justify-content:center;margin-top:20px;">
    <!-- Flow Diagram Box -->
    <div class="card" style="display:flex;flex-direction:column;align-items:center;padding:24px;border-color:var(--border2);width:100%;max-width:500px;">
      <div style="font-weight:600;font-size:14px;color:var(--text3);margin-bottom:16px;text-transform:uppercase;letter-spacing:1px;">Data Flow</div>
      <div class="card" style="width:200px;text-align:center;padding:12px;border-color:var(--accent3);">
        <div style="font-weight:600;color:var(--text);">User / Keyboard</div>
      </div>
      
      <div style="color:var(--text3);font-size:20px;line-height:1;margin:8px 0;">↓</div>
      <div style="font-size:11px;color:var(--text2);text-transform:uppercase;letter-spacing:1px;">Input Function</div>
      <div style="color:var(--text3);font-size:20px;line-height:1;margin:8px 0;">↓</div>
      
      <div class="card" style="width:200px;text-align:center;padding:12px;border-color:var(--accent);">
        <div style="font-weight:600;color:var(--text);">Program Processing</div>
      </div>
      
      <div style="color:var(--text3);font-size:20px;line-height:1;margin:8px 0;">↓</div>
      <div style="font-size:11px;color:var(--text2);text-transform:uppercase;letter-spacing:1px;">Output Function</div>
      <div style="color:var(--text3);font-size:20px;line-height:1;margin:8px 0;">↓</div>
      
      <div class="card" style="width:200px;text-align:center;padding:12px;border-color:var(--green);">
        <div style="font-weight:600;color:var(--text);">Screen / Console</div>
      </div>
    </div>
  </div>
</section>

<section id="code">
  <div class="section-label">Examples</div>
  <div class="section-title">Basic I/O Syntax</div>
  <p class="section-desc">See how to perform basic input and output operations across different programming languages.</p>

  <div style="margin-bottom:32px">
    <div class="code-block-wrapper">
      <div class="code-header">
        <div class="code-header-left">
          <div class="code-tabs">
            <div class="code-tab active" onclick="switchTab(this,'io-block','c')">C</div>
            <div class="code-tab" onclick="switchTab(this,'io-block','cpp')">C++</div>
            <div class="code-tab" onclick="switchTab(this,'io-block','java')">Java</div>
            <div class="code-tab" onclick="switchTab(this,'io-block','py')">Python</div>
          </div>
        </div>
        <button class="copy-btn" onclick="copyCode('io-block', event)">Copy</button>
      </div>
      <div id="io-block">
        <div class="code-panel active" data-lang="c"><pre><span class="cmt">// ─── C: Input & Output ──────────────────────────</span>
<span class="pre">#include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> <span class="var">age</span><span class="punc">;</span>

    <span class="cmt">// Input</span>
    <span class="fn">printf</span>(<span class="str">"Enter age: "</span>)<span class="punc">;</span>
    <span class="fn">scanf</span>(<span class="str">"%d"</span>, <span class="op">&amp;</span><span class="var">age</span>)<span class="punc">;</span>  <span class="cmt">// & is required</span>

    <span class="cmt">// Output</span>
    <span class="fn">printf</span>(<span class="str">"You entered: %d\\n"</span>, <span class="var">age</span>)<span class="punc">;</span>
    
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre></div>
        <div class="code-panel" data-lang="cpp"><pre><span class="cmt">// ─── C++: Input & Output ────────────────────────</span>
<span class="pre">#include</span> <span class="str">&lt;iostream&gt;</span>
<span class="kw">using namespace</span> <span class="var">std</span><span class="punc">;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> <span class="var">age</span><span class="punc">;</span>

    <span class="cmt">// Input</span>
    <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"Enter age: "</span><span class="punc">;</span>
    <span class="var">cin</span> <span class="op">&gt;&gt;</span> <span class="var">age</span><span class="punc">;</span>

    <span class="cmt">// Output</span>
    <span class="var">cout</span> <span class="op">&lt;&lt;</span> <span class="str">"You entered: "</span> <span class="op">&lt;&lt;</span> <span class="var">age</span> <span class="op">&lt;&lt;</span> <span class="var">endl</span><span class="punc">;</span>
    
    <span class="kw">return</span> <span class="num">0</span><span class="punc">;</span>
}</pre></div>
        <div class="code-panel" data-lang="java"><pre><span class="cmt">// ─── Java: Input & Output ───────────────────────</span>
<span class="kw">import</span> <span class="var">java.util.Scanner</span><span class="punc">;</span>

<span class="kw">public class</span> <span class="tp">Main</span> {
    <span class="kw">public static void</span> <span class="fn">main</span>(<span class="tp">String</span>[] <span class="var">args</span>) {
        <span class="tp">Scanner</span> <span class="var">sc</span> <span class="op">=</span> <span class="kw">new</span> <span class="tp">Scanner</span>(<span class="var">System</span>.<span class="var">in</span>)<span class="punc">;</span>
        <span class="kw">int</span> <span class="var">age</span><span class="punc">;</span>

        <span class="cmt">// Input</span>
        <span class="var">System</span>.<span class="var">out</span>.<span class="fn">print</span>(<span class="str">"Enter age: "</span>)<span class="punc">;</span>
        <span class="var">age</span> <span class="op">=</span> <span class="var">sc</span>.<span class="fn">nextInt</span>()<span class="punc">;</span>

        <span class="cmt">// Output</span>
        <span class="var">System</span>.<span class="var">out</span>.<span class="fn">println</span>(<span class="str">"You entered: "</span> <span class="op">+</span> <span class="var">age</span>)<span class="punc">;</span>
    }
}</pre></div>
        <div class="code-panel" data-lang="py"><pre><span class="cmt"># ─── Python: Input & Output ──────────────────────</span>

<span class="cmt"># Input (always returns a string, so we convert to int)</span>
<span class="var">age</span> <span class="op">=</span> <span class="kw">int</span>(<span class="fn">input</span>(<span class="str">"Enter age: "</span>))

<span class="cmt"># Output</span>
<span class="fn">print</span>(<span class="str">f"You entered: {age}"</span>)</pre></div>
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
          <ModuleNavigation moduleId={2} />
        </div>
      </div>
    </ModuleLayout>
  );
}
