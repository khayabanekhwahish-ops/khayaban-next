import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import MetricsGrid from '@/components/MetricsGrid'
import { getProjects, getSettings } from '@/lib/sanity'

export const metadata = {
  title: 'Khayaban-e-Khwahish | NGO in Pakistan | Donate, Volunteer & Support Communities',
  description:
    'Khayaban-e-Khwahish is a student-led nonprofit in Pakistan. Explore authentic projects, support fundraising, volunteer and suggest community needs.',
  openGraph: {
    title: 'Khayaban-e-Khwahish | NGO in Pakistan | Donate, Volunteer & Support Communities',
    description:
      'Khayaban-e-Khwahish is a student-led nonprofit in Pakistan. Explore authentic projects, support fundraising, volunteer and suggest community needs.',
  },
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const [projects, settings] = await Promise.all([getProjects(), getSettings()])
  const featured = projects.slice(0, 4)
  const metrics = settings?.metrics || []

  return (
    <>
      <section className="metric-strip" aria-label="Impact at a glance">
        <div className="container"><MetricsGrid metrics={metrics} /></div>
      </section>

      <section className="section">
        <div className="container story-grid">
          <div className="story-image reveal"><img src="/assets/img/team-who-we-are.jpg" alt="Khayaban-e-Khwahish volunteer team" /></div>
          <div className="story-copy reveal">
            <span className="section-label">Who we are</span>
            <h2>Young people turning compassion into practical action.</h2>
            <p>Founded on 16 January 2025, Khayaban-e-Khwahish is dedicated to creating meaningful social impact. We believe small acts of kindness can create lasting change when driven by compassion, transparency and collective effort.</p>
            <div className="values-grid">
              <div className="value-card"><span>♥</span><strong>Compassion</strong><small>Human dignity comes first.</small></div>
              <div className="value-card"><span>✓</span><strong>Transparency</strong><small>Clear evidence and reporting.</small></div>
              <div className="value-card"><span>◎</span><strong>Community</strong><small>Solutions built together.</small></div>
            </div>
            <div className="button-row"><Link className="text-link" href="/about">Read our story →</Link></div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading reveal">
            <div><span className="section-label">Our projects</span><h2>Real needs. Responsible action. Visible results.</h2></div>
            <Link className="text-link" href="/projects">View every project →</Link>
          </div>
          <div className="project-grid">
            {featured.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading reveal">
            <div><span className="section-label">Project suggestions</span><h2>Tell us what your area needs.</h2></div>
            <p>Community members can share a problem from their city, town or area so Khayaban-e-Khwahish can review it for a possible future initiative.</p>
          </div>
          <div className="suggestion-highlight reveal">
            <div>
              <h3>Share a local welfare need</h3>
              <p>Submit the location, the problem, who is affected and what kind of support may be required. Official contact information is also available on the Suggestions page.</p>
            </div>
            <Link className="button" href="/suggestions">Open Suggestions & Contact</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container trust-panel reveal">
          <div>
            <span className="section-label light">Transparency by design</span>
            <h2>Trust is not a slogan. It is a system.</h2>
            <p>Every public figure on the website should connect back to a documented project, approved record or authentic field result.</p>
            <div className="button-row"><Link className="button button-light" href="/impact">View impact and reports</Link></div>
          </div>
          <div className="trust-list">
            <div className="trust-item"><span>✓</span><div><strong>Verified figures</strong><small>Authentic statistics based on the supplied NGO profile.</small></div></div>
            <div className="trust-item"><span>▤</span><div><strong>Project evidence</strong><small>Approved photographs and documented outputs.</small></div></div>
            <div className="trust-item"><span>↻</span><div><strong>Clear updates</strong><small>Organized content for donors, volunteers and partners.</small></div></div>
            <div className="trust-item"><span>⚿</span><div><strong>Respectful presentation</strong><small>No unrelated stock images or invented stories.</small></div></div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band-inner reveal">
          <div><span className="section-label light">Join the movement</span><h2>Your support can help create the next success story.</h2></div>
          <div className="button-row"><Link className="button button-light" href="/volunteer">Become a volunteer</Link><Link className="button button-gold" href="/donate">Donate now</Link></div>
        </div>
      </section>
    </>
  )
}
