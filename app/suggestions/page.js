import Link from 'next/link'
import SuggestionForm from '@/components/SuggestionForm'
import FaqAccordion from '@/components/FaqAccordion'

export const metadata = {
  title: 'Project Suggestions | Khayaban-e-Khwahish',
  description:
    'Share a local problem or community need with Khayaban-e-Khwahish through the project suggestion form.',
  openGraph: {
    title: 'Project Suggestions | Khayaban-e-Khwahish',
    description:
      'Share a local problem or community need with Khayaban-e-Khwahish through the project suggestion form.',
  },
}

export default function SuggestionsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="reveal">
            <span className="kicker">Suggestions & contact</span>
            <h1>Share the needs your community is facing.</h1>
            <p className="lead">Tell Khayaban-e-Khwahish about a problem in your city, town or area, or use the official contact details for partnerships, donations and general inquiries.</p>
          </div>
          <div className="page-hero-card reveal">
            <h3>What to include</h3>
            <p>Clear information helps the team understand and review a suggestion responsibly.</p>
            <ul>
              <li>✓ What the problem is</li>
              <li>✓ Which area is affected</li>
              <li>✓ Who is impacted</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="reveal">
            <span className="section-label">Official contact</span>
            <h2 style={{ margin: '12px 0 20px' }}>Contact Khayaban-e-Khwahish.</h2>
            <p className="lead">These are the official contact channels provided for the organization.</p>
            <div className="contact-cards">
              <div className="contact-card"><span>✉</span><div><strong>Official email</strong><small><a href="mailto:khayabanekhwahish@gmail.com">khayabanekhwahish@gmail.com</a></small></div></div>
              <div className="contact-card"><span>◎</span><div><strong>Instagram</strong><small><a href="https://instagram.com/khayabanekhwahish" target="_blank" rel="noopener noreferrer">@khayabanekhwahish</a></small></div></div>
              <div className="contact-card"><span>♥</span><div><strong>Donation support</strong><small><Link href="/donate">Visit the donation page</Link></small></div></div>
              <div className="contact-card"><span>●●</span><div><strong>Volunteer applications</strong><small><Link href="/volunteer">Use the volunteer Google Form</Link></small></div></div>
            </div>
            <div className="info-panel" style={{ marginTop: 18 }}>
              <h3>Partnerships and general inquiries</h3>
              <p>Companies, donors, community representatives and media contacts can use the official email or Instagram account above.</p>
            </div>
          </div>
          <div>
            <SuggestionForm />
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading reveal">
            <div><span className="section-label">Helpful information</span><h2>Before you contact the team.</h2></div>
          </div>
          <FaqAccordion />
        </div>
      </section>
    </>
  )
}
