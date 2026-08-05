import Link from 'next/link'
import ProjectFilterGrid from '@/components/ProjectFilterGrid'
import LightboxItem from '@/components/LightboxItem'
import { getProjects, getGallery, urlFor } from '@/lib/sanity'

export const metadata = {
  title: 'Projects | Khayaban-e-Khwahish',
  description:
    'Explore Khayaban-e-Khwahish projects including food support, community welfare, child welfare, fundraising and emergency relief initiatives.',
  openGraph: {
    title: 'Projects | Khayaban-e-Khwahish',
    description:
      'Explore Khayaban-e-Khwahish projects including food support, community welfare, child welfare, fundraising and emergency relief initiatives.',
  },
  alternates: { canonical: '/projects' },
}

export default async function ProjectsPage() {
  const [projects, fieldPhotos] = await Promise.all([getProjects(), getGallery('projects-field')])

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div>
            <span className="kicker">Our projects</span>
            <h1>From urgent relief to lasting community improvements.</h1>
            <p className="lead">Browse documented work, review the results and understand how each project responded to a defined need.</p>
          </div>
          <div className="page-hero-card">
            <h3>Project publishing standard</h3>
            <p>Every public project page should include an objective, location, date, documented outputs and authentic visual evidence.</p>
            <ul>
              <li>✓ Approved project story</li>
              <li>✓ Organization-supplied photographs</li>
              <li>✓ Verified output figures</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ProjectFilterGrid projects={projects} />
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading reveal">
            <div><span className="section-label">Field photographs</span><h2>Our work and volunteers in the field.</h2></div>
            <p>These larger photographs are displayed within the Projects section instead of as small images at the bottom of the home page.</p>
          </div>
          <div className="project-field-gallery">
            {fieldPhotos.map((photo, i) => {
              const url = urlFor(photo.image).width(1200).height(i < 2 ? 760 : 900).url()
              return (
                <LightboxItem
                  key={i}
                  src={url}
                  alt={photo.alt}
                  className={`field-photo${i < 2 ? ' field-photo-wide' : ''}`}
                >
                  <img src={url} alt={photo.alt} loading="lazy" />
                </LightboxItem>
              )
            })}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div><span className="section-label light">Support the next project</span><h2>Help us respond faster and serve with dignity.</h2></div>
          <Link className="button button-light" href="/donate">Donate now →</Link>
        </div>
      </section>
    </>
  )
}
