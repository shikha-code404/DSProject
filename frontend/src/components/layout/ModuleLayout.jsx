import { useEffect } from 'react'
import Layout from './Layout'
import { usePrereqProgress } from '../../hooks/usePrereqProgress'

import { useNavigate } from 'react-router-dom'

export default function ModuleLayout({ children, title, moduleId }) {
  const { pct } = usePrereqProgress()
  const navigate = useNavigate()

  useEffect(() => {
    // Sync the sidebar progress bar that is inside the dangerouslySetInnerHTML
    const fill = document.getElementById('progressFill')
    const label = document.getElementById('progressLabel')
    
    if (fill) fill.style.width = `${pct}%`
    if (label) label.innerText = `${pct}% complete`
  }, [pct])

  useEffect(() => {
    const backBtn = document.getElementById('sidebar-back-btn')
    if (backBtn) {
      backBtn.onclick = (e) => {
        e.preventDefault()
        navigate('/prerequisite')
      }
    }
  }, [navigate])

  useEffect(() => {
    // 1. Define global helpers for Style B modules (inline switchTab / copyCode)
    window.switchTab = (element, blockId, lang) => {
      const tabsContainer = element.closest('.code-tabs');
      if (tabsContainer) {
        tabsContainer.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
      }
      element.classList.add('active');

      const block = document.getElementById(blockId);
      if (block) {
        block.querySelectorAll('.code-panel').forEach(p => {
          if (p.getAttribute('data-lang') === lang) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
      }
    };

    window.copyCode = (blockId, event) => {
      const block = document.getElementById(blockId);
      if (!block) return;
      const activePanel = block.querySelector('.code-panel.active pre');
      if (activePanel) {
        navigator.clipboard.writeText(activePanel.innerText);
        const btn = event.target;
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        setTimeout(() => {
          btn.innerText = originalText;
        }, 2000);
      }
    };

    // 2. Event delegation for Style A modules (using data-target)
    const handleTabClick = (e) => {
      const tab = e.target.closest('.code-tab');
      if (!tab) return;
      
      const target = tab.getAttribute('data-target');
      if (!target) return; // Skip Style B tabs using inline onclick

      const parent = tab.closest('.code-block-wrapper');
      if (!parent) return;
      
      parent.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
      parent.querySelectorAll('.code-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = parent.querySelector('#' + target);
      if (panel) panel.classList.add('active');
    };

    document.addEventListener('click', handleTabClick);

    return () => {
      document.removeEventListener('click', handleTabClick);
      delete window.switchTab;
      delete window.copyCode;
    };
  }, [])

  useEffect(() => {
    const navItems = Array.from(document.querySelectorAll('a.nav-item'))
    if (navItems.length === 0) return

    // 1. Smooth scroll on click
    navItems.forEach(item => {
      item.onclick = (e) => {
        e.preventDefault()
        const targetId = item.getAttribute('href')?.substring(1)
        if (targetId) {
          const targetEl = document.getElementById(targetId)
          if (targetEl) {
            const y = targetEl.getBoundingClientRect().top + window.scrollY - 100
            window.scrollTo({ top: y, behavior: 'smooth' })
          }
        }
      }
    })

    // 2. Scrollspy tracking
    const sectionIds = navItems.map(item => item.getAttribute('href')?.substring(1)).filter(Boolean)
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll('a.nav-item').forEach(nav => nav.classList.remove('active'))
            const activeNav = document.querySelector(`a.nav-item[href="#${entry.target.id}"]`)
            if (activeNav) activeNav.classList.add('active')
          }
        })
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
    )

    sections.forEach(sec => observer.observe(sec))

    return () => {
      sections.forEach(sec => observer.unobserve(sec))
      navItems.forEach(item => { item.onclick = null })
    }
  }, [moduleId])

  return (
    <Layout fullWidth withSidebar>
      <div className="flex-1 w-full relative">
        {children}
      </div>
    </Layout>
  )
}
