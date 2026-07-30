import Link from 'next/link'
import MetricsGrid from '@/components/MetricsGrid'
import { getSettings } from '@/lib/sanity'

export const metadata = {
  title: 'Impact & Transparency | Khayaban-e-Khwahish',
  description:
    'View impact figures, project outcomes and transparency commitments from Khayaban-e-Khwahish.',
  openGraph: {
    title: 'Impact & Transparency | Khayaban-e-Khwahish',
    description:
      'View impact figures, project outcomes and transparency commitments from Khayaban-e-Khwahish.',
  },
}

export default async function ImpactPage() {
  const settings = await getSettings()
  const metrics = settings?.metrics || []
  const heroMini = metrics.slice(0, 4)
  const barMetrics = metrics.filter((m) => m.barPercent != null)

  return (
    <>
      <section className="page-hero impact-hero">
        <div className="container page-hero-grid">
          <div className="reveal">
            <span className="kicker">Impact & transparency</span>
            <h1>Clear results build lasting trust.</h1>
            <p className="lead">We aim to show what was delivered, where it happened and which figures were documented before publication.</p>
          </div>
          <div className="impact-hero-card reveal">
            {heroMini.map((m) => (
              <div className="impact-mini" key={m.label}><strong>{m.value}</strong><span>{m.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="metric-strip" aria-label="Impact metrics">
        <div className="container"><MetricsGrid metrics={metrics} compact /></div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading reveal">
            <div><span className="section-label">Impact by activity</span><h2>A practical view of what has been delivered.</h2></div>
            <p>These figures are based on the supplied NGO portfolio and supporting materials.</p>
          </div>
          <div className="impact-detail-grid">
            <div className="impact-chart reveal">
              <h3>Outputs delivered</h3>
              {barMetrics.map((m) => (
                <div className="bar-row" key={m.label}>
                  <div><span>{m.label}</span><strong>{m.value}</strong></div>
                  <div className="bar"><span style={{ width: `${m.barPercent}%` }}></span></div>
                </div>
              ))}
            </div>
            <div className="impact-chart reveal">
              <h3>Transparency commitments</h3>
              <ul className="check-list">
                <li>✓ <span>Use only approved organizational text and visuals.</span></li>
                <li>✓ <span>Keep project information traceable to the portfolio and records.</span></li>
                <li>✓ <span>Maintain clear contact information for official communication.</span></li>
                <li>✓ <span>Display honest placeholders where information is not yet published.</span></li>
                <li>✓ <span>Present donors and community members with a trustworthy digital presence.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading reveal">
            <div><span className="section-label">Reports & documents</span><h2>A single place for public accountability.</h2></div>
            <p>Buttons are kept simple until final files are approved for publication.</p>
          </div>
          <div className="report-list">
            <div className="report-item reveal">
              <div><span>▤</span><div><strong>Project Portfolio</strong><small>Authentic project summaries and outcomes</small></div></div>
              <button type="button">Available on request</button>
            </div>
            <div className="report-item reveal">
              <div><span>▤</span><div><strong>Annual Impact Report</strong><small>Optional future public report</small></div></div>
              <button type="button">Coming soon</button>
            </div>
            <div className="report-item reveal">
              <div><span>▤</span><div><strong>Financial Summary</strong><small>Donor and project summary after approval</small></div></div>
              <button type="button">Coming soon</button>
            </div>
            <div className="report-item reveal">
              <div><span>▤</span><div><strong>Registration & legal documents</strong><small>Add once officially approved for public display</small></div></div>
              <button type="button">Pending approval</button>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div><span className="section-label light">See the evidence</span><h2>Explore the projects behind these results.</h2></div>
          <Link className="button button-light" href="/projects">View projects →</Link>
        </div>
      </section>
    </>
  )
}
