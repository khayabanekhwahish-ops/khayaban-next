import Link from 'next/link'
import { getFounder, getGallery, getTeamMembers, urlFor } from '@/lib/sanity'

export const metadata = {
  title: 'About Khayaban-e-Khwahish | Mission, Vision & Team',
  description:
    'Learn about Khayaban-e-Khwahish, Founder Murtaza Saquib, its mission, values, team and authentic humanitarian work in Pakistan.',
  openGraph: {
    title: 'About Khayaban-e-Khwahish | Mission, Vision & Team',
    description:
      'Learn about Khayaban-e-Khwahish, Founder Murtaza Saquib, its mission, values, team and authentic humanitarian work in Pakistan.',
  },
}

export default async function AboutPage() {
  const [founder, miniGallery, teamMembers] = await Promise.all([
    getFounder(),
    getGallery('about-mini'),
    getTeamMembers(),
  ])

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="reveal">
            <span className="kicker">About Khayaban-e-Khwahish</span>
            <h1>An avenue where generosity meets opportunity.</h1>
            <p className="lead">We empower lives through humanitarian initiatives, community development and youth-led volunteerism across Pakistan.</p>
          </div>
          <div className="page-hero-card reveal">
            <h3>Our vision</h3>
            <p>A Pakistan where every individual has access to basic needs, opportunities and a dignified life.</p>
            <ul>
              <li>✓ Community-led solutions</li>
              <li>✓ Transparent use of support</li>
              <li>✓ Youth leadership and service</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-copy-grid">
          <article className="prose reveal">
            <span className="section-label">Our story</span>
            <h2>Founded with belief in the power of small acts.</h2>
            <p>Founded on 16 January 2025, Khayaban-e-Khwahish is a student-led, nonprofit organization dedicated to creating meaningful social impact by supporting underprivileged communities across Pakistan.</p>
            <p>Our mission is to empower lives through humanitarian initiatives, community development and youth-led volunteerism. Since its inception, the team has organized food distribution drives, Ramadan Iftar campaigns, ration assistance programs and community welfare projects.</p>
            <p>At Khayaban-e-Khwahish, we strive to build a future where generosity meets opportunity, ensuring that every contribution brings hope, dignity and a better tomorrow.</p>
          </article>
          <aside className="quote-card reveal">
            <blockquote>&ldquo;Together, we create change. We deliver hope. We build a better tomorrow.&rdquo;</blockquote>
            <cite>— Khayaban-e-Khwahish</cite>
          </aside>
        </div>
      </section>

      {founder && (
        <section className="section founder-section">
          <div className="container founder-feature">
            <div className="founder-photo reveal">
              {founder.photo && (
                <img src={urlFor(founder.photo).width(1100).height(670).url()} alt={`${founder.name}, Founder of Khayaban-e-Khwahish`} />
              )}
            </div>
            <article className="founder-copy reveal">
              <span className="section-label">Founder &amp; leadership</span>
              <h2>{founder.name}</h2>
              <p className="founder-role">{founder.role}</p>
              {(founder.bio || []).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <div className="founder-qualities" aria-label="Leadership qualities">
                {(founder.qualities || []).map((q) => (
                  <span key={q}>{q}</span>
                ))}
              </div>
            </article>
          </div>
        </section>
      )}

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading reveal">
            <div><span className="section-label">Our values</span><h2>The principles behind every project.</h2></div>
          </div>
          <div className="values-large-grid">
            <div className="value-large reveal"><span>♥</span><strong>Compassion</strong><small>Serve with empathy.</small></div>
            <div className="value-large reveal"><span>✓</span><strong>Transparency</strong><small>Show how support is used.</small></div>
            <div className="value-large reveal"><span>⚖</span><strong>Integrity</strong><small>Act responsibly.</small></div>
            <div className="value-large reveal"><span>●●</span><strong>Community</strong><small>Work side by side.</small></div>
            <div className="value-large reveal"><span>↑</span><strong>Youth leadership</strong><small>Create future changemakers.</small></div>
            <div className="value-large reveal"><span>♧</span><strong>Sustainable impact</strong><small>Build beyond one moment.</small></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container team-feature">
          <img className="reveal" src="/assets/img/team-who-we-are.jpg" alt="Khayaban-e-Khwahish team photo" />
          <div className="prose reveal">
            <span className="section-label">Our team</span>
            <h2>Volunteer-powered and purpose-driven.</h2>
            <p>More than 20 active volunteers support planning, fundraising, field operations, media and community engagement. The team combines youthful energy with a strong desire to serve communities with sincerity and responsibility.</p>
            <ul className="check-list">
              <li>✓ <span>Community-led service mindset</span></li>
              <li>✓ <span>Hands-on field participation</span></li>
              <li>✓ <span>Authentic storytelling from real projects</span></li>
            </ul>
            <div className="team-mini-gallery">
              {(miniGallery.length ? miniGallery : []).map((g, i) => (
                <img key={i} src={urlFor(g.image).width(340).height(340).url()} alt={g.alt} />
              ))}
            </div>
            <div className="button-row"><Link className="button" href="/volunteer">Join the team</Link></div>
          </div>
        </div>
      </section>

      {teamMembers.length > 0 && (
        <section className="section section-soft">
          <div className="container">
            <div className="section-heading reveal">
              <div><span className="section-label">Meet the team</span><h2>The people behind the projects.</h2></div>
            </div>
            <div className="team-roster-grid">
              {teamMembers.map((member, i) => (
                <div className="team-roster-card reveal" key={i}>
                  {member.photo && (
                    <img
                      className="team-roster-photo"
                      src={urlFor(member.photo).width(176).height(176).url()}
                      alt={member.name}
                    />
                  )}
                  <strong>{member.name}</strong>
                  {member.role && <span className="team-roster-role">{member.role}</span>}
                  {member.bio && <p>{member.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div><span className="section-label light">Our work in action</span><h2>See the projects that turned ambition into impact.</h2></div>
          <Link className="button button-light" href="/projects">Explore projects →</Link>
        </div>
      </section>
    </>
  )
}
