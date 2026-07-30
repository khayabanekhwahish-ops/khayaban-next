export const metadata = {
  title: 'Volunteer | Khayaban-e-Khwahish',
  description: 'Join Khayaban-e-Khwahish as a volunteer and support community projects across Pakistan.',
  openGraph: {
    title: 'Volunteer | Khayaban-e-Khwahish',
    description: 'Join Khayaban-e-Khwahish as a volunteer and support community projects across Pakistan.',
  },
}

const OPPORTUNITIES = [
  {
    id: 'food-distribution',
    title: 'Food Distribution Volunteer',
    location: 'Lahore / project location',
    commitment: 'Event-based shifts',
    skills: 'Coordination, teamwork, field support',
    capacity: 20,
    filled: 11,
  },
  {
    id: 'media-storytelling',
    title: 'Media & Storytelling Volunteer',
    location: 'Hybrid',
    commitment: '4–6 hours monthly',
    skills: 'Photography, writing or design',
    capacity: 10,
    filled: 4,
  },
  {
    id: 'fundraising-support',
    title: 'Fundraising Support Volunteer',
    location: 'Remote / Lahore',
    commitment: 'Flexible',
    skills: 'Outreach, communication, event support',
    capacity: 15,
    filled: 8,
  },
]

export default function VolunteerPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="reveal">
            <span className="kicker">Volunteer with us</span>
            <h1>Bring your skills. Build your service record. Create change.</h1>
            <p className="lead">Find an opportunity that matches your availability and help organize respectful and effective community action.</p>
            <div className="button-row">
              <a className="button" href="#opportunities">View opportunities</a>
              <a className="button button-ghost" href="#volunteer-form-section">Open volunteer form</a>
            </div>
          </div>
          <div className="page-hero-card reveal">
            <h3>Volunteer pathway</h3>
            <p>Complete the official Google Form below. Registration does not automatically confirm placement; the team can review capacity and project requirements.</p>
            <ul>
              <li>✓ Share your details</li>
              <li>✓ Select skills and availability</li>
              <li>✓ Wait for official follow-up</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="opportunities">
        <div className="container">
          <div className="section-heading reveal">
            <div><span className="section-label">Volunteer opportunities</span><h2>Choose a role that fits your time and strengths.</h2></div>
            <p>Volunteer needs can change according to upcoming projects and field requirements.</p>
          </div>
          <div className="opportunity-grid">
            {OPPORTUNITIES.map((o) => {
              const pct = Math.round((o.filled / o.capacity) * 100)
              return (
                <article className="opportunity-card" key={o.id}>
                  <div className="opportunity-top"><span className="tag">Open</span><span>{o.capacity - o.filled} places left</span></div>
                  <h3>{o.title}</h3>
                  <p>{o.location}</p>
                  <dl>
                    <div><dt>Commitment</dt><dd>{o.commitment}</dd></div>
                    <div><dt>Useful skills</dt><dd>{o.skills}</dd></div>
                  </dl>
                  <div className="capacity">
                    <div><span>Capacity</span><strong>{o.filled}/{o.capacity}</strong></div>
                    <div className="progress"><span style={{ width: `${pct}%` }}></span></div>
                  </div>
                  <a className="text-button" href="#volunteer-form-section">Choose opportunity →</a>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section-soft" id="volunteer-form-section">
        <div className="container volunteer-form-layout">
          <aside className="donation-info reveal">
            <span className="section-label">Official volunteer form</span>
            <h2>Apply through the supplied Google Form.</h2>
            <p>The Google Form provided by Khayaban-e-Khwahish is used on the volunteer page only.</p>
            <div className="security-card">
              <span>✓</span>
              <div><strong>Before submitting</strong><p>Enter accurate contact information so the team can follow up about suitable opportunities.</p></div>
            </div>
            <div className="button-row">
              <a className="button" href="https://docs.google.com/forms/d/e/1FAIpQLSeWtNJU8OTsiTV1NwodWSnk75QeGAPbg_FMp9Eu-c9WudHRXA/viewform" target="_blank" rel="noopener noreferrer">Open form in a new tab</a>
            </div>
          </aside>
          <div className="google-form-embed reveal">
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeWtNJU8OTsiTV1NwodWSnk75QeGAPbg_FMp9Eu-c9WudHRXA/viewform?embedded=true" title="Khayaban-e-Khwahish volunteer form">Loading…</iframe>
            <div className="embed-note">If the form does not display, use the button to open it directly.</div>
          </div>
        </div>
      </section>
    </>
  )
}
