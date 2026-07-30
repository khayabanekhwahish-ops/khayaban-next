import Link from 'next/link'
import Icon from './Icon'
import { getSettings } from '@/lib/sanity'

export default async function SiteFooter() {
  const settings = (await getSettings()) || {}
  const orgName = settings.orgName || 'Khayaban-e-Khwahish'
  const tagline = settings.tagline || 'An Avenue to Ambition'
  const email = settings.email || 'khayabanekhwahish@gmail.com'
  const instagram = settings.instagram || '@khayabanekhwahish'
  const instagramUrl = settings.instagramUrl || 'https://instagram.com/khayabanekhwahish'
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand brand-footer">
            <span className="footer-logo-frame">
              <img src="/assets/img/logo-clean-transparent.png" alt="Khayaban-e-Khwahish logo" />
            </span>
            <span><strong>{orgName}</strong><small>{tagline}</small></span>
          </div>
          <p>Building impact, creating hope and supporting underprivileged communities across Pakistan through authentic, community-led initiatives.</p>
          <div className="trust-note">
            <Icon name="shield" size={18} />
            <span>Project stories and public figures are based on the supplied NGO portfolio and approved content.</span>
          </div>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/about">About us</Link>
          <Link href="/projects">Our projects</Link>
          <Link href="/impact">Impact & transparency</Link>
          <Link href="/suggestions">Suggestions & contact</Link>
        </div>
        <div>
          <h3>Get involved</h3>
          <Link href="/donate">Donate</Link>
          <Link href="/volunteer">Volunteer</Link>
          <Link href="/suggestions">Suggest a project</Link>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <div className="footer-links">
          <h3>Official contact</h3>
          <a className="social-link" href={`mailto:${email}`}><Icon name="mail" size={18} /> {email}</a>
          <a className="social-link" href={instagramUrl} target="_blank" rel="noopener noreferrer"><Icon name="instagram" size={18} /> {instagram}</a>
          <small>Project suggestions, partnerships and general inquiries can be submitted from the Suggestions page.</small>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© <span>{year}</span> {orgName}.</span>
        <span><Link href="/impact">Transparency</Link> · <Link href="/suggestions">Suggestions & contact</Link></span>
      </div>
    </footer>
  )
}
