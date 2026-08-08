'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Icon from './Icon'

const NAV = [
  ['home', 'Home', '/', 'home'],
  ['about', 'About', '/about', 'users'],
  ['projects', 'Projects', '/projects', 'file'],
  ['impact', 'Impact', '/impact', 'chart'],
  ['volunteer', 'Volunteer', '/volunteer', 'users'],
  ['suggestions', 'Suggestions', '/suggestions', 'idea'],
]

function currentKey(pathname) {
  const entry = NAV.find(([, , href]) => (href === '/' ? pathname === '/' : pathname.startsWith(href)))
  return entry ? entry[0] : 'home'
}

export default function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  // `scrolled` drives the opacity fade only (no layout impact, so it can
  // animate continuously during scroll with zero risk of feedback jank).
  // `heightCollapsed` drives the actual space-reclaiming layout change, and
  // only flips *after* the fade has already finished making it invisible —
  // that turns 300 frames of layout recalculation into a single instant one,
  // which is what actually caused the scroll position to shake/fight itself.
  const [scrolled, setScrolled] = useState(false)
  const [heightCollapsed, setHeightCollapsed] = useState(false)
  const active = currentKey(pathname)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        // Hysteresis (different enter/exit thresholds) so hovering right at one
        // scroll position can't flip the collapsed state back and forth, which
        // is what caused the shaking/jitter.
        setScrolled((prev) => {
          if (prev) return window.scrollY > 70
          return window.scrollY > 130
        })
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (scrolled) {
      const t = setTimeout(() => setHeightCollapsed(true), 300)
      return () => clearTimeout(t)
    }
    setHeightCollapsed(false)
  }, [scrolled])

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`} id="site-header">
        <div className={`announcement-collapsible${heightCollapsed ? ' is-collapsed' : ''}`}>
          <div className={`announcement-collapsible-inner${scrolled ? ' is-faded' : ''}`}>
            <div className="header-top-banner">
              <Link href="/" aria-label="Khayaban-e-Khwahish home">
                <img
                  className="header-top-banner-image"
                  src="/assets/img/header-banner.png"
                  alt="Khayaban-e-Khwahish, An Avenue to Ambition"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="header-nav-bar">
          <div className="container header-nav-wrap">
            <button
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="primary-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? 'x' : 'menu'} />
            </button>
            <nav id="primary-nav" className={`primary-nav${open ? ' open' : ''}`} aria-label="Primary navigation">
              {NAV.map(([key, label, href, iconName]) => (
                <Link key={key} className={`nav-tab${active === key ? ' active' : ''}`} href={href}>
                  <span className="nav-tab-icon"><Icon name={iconName} size={22} /></span>
                  <span>{label}</span>
                </Link>
              ))}
              <Link className="button button-small button-donate" href="/donate">
                <Icon name="heart" size={17} /> Donate
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
