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
  const [scrolled, setScrolled] = useState(false)
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
        setScrolled(window.scrollY > 100)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <div className={`announcement-collapsible${scrolled ? ' is-collapsed' : ''}`}>
        <div className="announcement-collapsible-inner">
          <div className="announcement">
            <div className="container announcement-inner">
              <span>Student-led. Transparent. Community-powered.</span>
              <Link href="/suggestions">Share a community need <Icon name="idea" size={16} /></Link>
            </div>
          </div>
        </div>
      </div>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`} id="site-header">
        <div className={`header-brand-row container${scrolled ? ' is-compact' : ''}`}>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'x' : 'menu'} />
          </button>
          <div className="brand-collapsible">
            <Link className="brand brand-centered" href="/" aria-label="Khayaban-e-Khwahish home">
              <span className="brand-logo-frame">
                <img src="/assets/img/logo-clean-transparent.png" alt="Khayaban-e-Khwahish logo" />
              </span>
              <span className="brand-title">
                <strong>Khayaban-e-Khwahish</strong>
                <small>An Avenue to Ambition</small>
              </span>
            </Link>
          </div>
          <span className="header-spacer" aria-hidden="true"></span>
        </div>
        <div className="header-nav-bar">
          <div className="container header-nav-wrap">
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
