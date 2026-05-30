const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Atharva\\JSPM\\DSProject\\final_modules_prereq';
const destDir = 'C:\\Atharva\\JSPM\\DSProject\\DSProject\\src\\pages\\modules';
const cssDest = path.join(destDir, 'PrereqModules.css');

const files = [
  { file: 'data_types_variables.html', component: 'DataTypesVariables', title: 'Variables & Data Types', id: 1 },
  { file: 'io_module.html', component: 'IoModule', title: 'Input / Output', id: 2 },
  { file: 'operators_expressions_dsa_module.html', component: 'OperatorsExpressions', title: 'Operators & Expressions', id: 3 },
];

let commonCss = '';

files.forEach(({ file, component, title, id }) => {
  const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');

  const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
  if (styleMatch) {
    if (!commonCss) {
      commonCss = styleMatch[1];
      // Adjust sidebar for Navbar (80px height)
      commonCss = commonCss.replace(/top:\s*0;/, 'top: 80px;');
      commonCss = commonCss.replace(/height:\s*100vh;/, 'height: calc(100vh - 80px);');
      // Fix Light Mode to map to Tailwind's dark mode toggle logic
      commonCss = commonCss.replace(/html\.light/g, 'html:not(.dark)');
      // Remove double padding since Layout handles the offset globally
      commonCss += '\n      .main { margin-left: 0 !important; }';
    }
  }

  let bodyContent = '';
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  if (bodyMatch) {
    bodyContent = bodyMatch[1];
  } else {
    bodyContent = content;
  }

  // Keep the sidebar!
  // Replace sidebar logo with a Back to Hub button
  bodyContent = bodyContent.replace(/<div class="sidebar-logo"[^>]*>[\s\S]*?<\/div>/g,
    '<div style="padding: 0 20px 24px; margin-bottom: 16px;">' +
      '<a id="sidebar-back-btn" href="/prerequisite" class="nav-btn" style="border: none; padding: 8px 0;">' +
        '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>' +
        'Back to Dashboard' +
      '</a>' +
    '</div>'
  );
  // Remove breadcrumb
  bodyContent = bodyContent.replace(/<div class="hero-breadcrumb"[^>]*>[\s\S]*?<\/div>/g, '');
  // Remove theme toggle
  bodyContent = bodyContent.replace(/<button class="theme-toggle"[^>]*>[\s\S]*?<\/button>/g, '');
  // Remove mobile toggle
  bodyContent = bodyContent.replace(/<button class="mob-toggle"[^>]*>[\s\S]*?<\/button>/g, '');
  // Remove scripts
  bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  // Remove bottom navigation accurately
  bodyContent = bodyContent.replace(/<div class="module-nav"[^>]*>[\s\S]*?<\/a>\s*<\/div>/g, '');

  const escapedHtml = bodyContent.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');

  const componentCode = `import React, { useEffect } from 'react';
import ModuleLayout from '../../components/layout/ModuleLayout';
import ModuleNavigation from '../../components/layout/ModuleNavigation';
import './PrereqModules.css';

export default function ${component}() {
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
    <ModuleLayout title="${title}" moduleId={${id}}>
      <div 
        className="module-content" 
        dangerouslySetInnerHTML={{ __html: \`${escapedHtml}\` }} 
      />
      <div className="w-full">
        <div className="max-w-[980px] mx-auto">
          <ModuleNavigation moduleId={${id}} />
        </div>
      </div>
    </ModuleLayout>
  );
}
`;

  fs.writeFileSync(path.join(destDir, `${component}.jsx`), componentCode);
  console.log(`Created ${component}.jsx`);
});

fs.writeFileSync(cssDest, commonCss);
console.log('Created PrereqModules.css');

