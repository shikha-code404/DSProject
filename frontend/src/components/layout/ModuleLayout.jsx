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
