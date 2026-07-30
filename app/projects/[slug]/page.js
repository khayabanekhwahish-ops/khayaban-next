import Link from 'next/link'
import { notFound } from 'next/navigation'
import Icon from '@/components/Icon'
import LightboxItem from '@/components/LightboxItem'
import { getProjectBySlug, getProjectSlugs, urlFor } from '@/lib/sanity'

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.length ? slugs.map((s) => ({ slug: s.slug })) : [{ slug: '_placeholder' }]
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} | Khayaban-e-Khwahish`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Khayaban-e-Khwahish`,
      description: project.summary,
    },
  }
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const coverUrl = project.image ? urlFor(project.image).width(1100).height(1050).url() : null

  return (
    <>
      <section className="project-detail-hero section-top">
        <div className="container detail-hero-grid">
          <div>
            <Link className="back-link" href="/projects">← All projects</Link>
            <span className="kicker">{project.category} · {project.status}</span>
            <h1>{project.title}</h1>
            <p className="lead">{project.summary}</p>
            <div className="detail-meta">
              <span><Icon name="map" size={18} /> {project.location}</span>
              <span><Icon name="calendar" size={18} /> {project.date}</span>
            </div>
            <div className="button-row">
              <Link className="button button-donate" href={`/donate?campaign=${project.slug}`}><Icon name="heart" size={18} /> Support this work</Link>
              <a className="button button-ghost" href="#results">See impact</a>
            </div>
          </div>
          <div className="detail-cover">
            {coverUrl && <img src={coverUrl} alt={project.title} />}
            <div className="cover-label"><span>Funding / support</span><strong>{project.funding}</strong></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detail-content-grid">
          <article className="prose">
            <span className="section-label">Project story</span>
            <h2>Responding with practical support</h2>
            <p>{project.story}</p>
            <h3>Objective</h3>
            <p>{project.objective}</p>
            <h3>What was achieved</h3>
            <ul className="check-list">
              {(project.impact || []).map((line, i) => (
                <li key={i}><Icon name="check" size={18} /><span>{line}</span></li>
              ))}
            </ul>
          </article>
          <aside className="detail-side" id="results">
            <h3>Impact snapshot</h3>
            {(project.metrics || []).map((m, i) => (
              <div className="side-metric" key={i}><strong>{m.value}</strong><span>{m.label}</span></div>
            ))}
            <div className="verification-note">
              <Icon name="shield" size={21} />
              <div><strong>Transparency note</strong><p>Figures shown on this page are based on the supplied NGO profile and project portfolio.</p></div>
            </div>
          </aside>
        </div>
      </section>

      {project.gallery?.length > 0 && (
        <section className="section section-soft">
          <div className="container">
            <div className="section-heading">
              <div><span className="section-label">Project gallery</span><h2>Evidence from the field</h2></div>
            </div>
            <div className="gallery-grid">
              {project.gallery.map((img, i) => {
                const url = urlFor(img).width(900).height(610).url()
                return (
                  <LightboxItem key={i} src={url} alt={`${project.title} image ${i + 1}`}>
                    <img src={url} alt={`${project.title} image ${i + 1}`} loading="lazy" />
                  </LightboxItem>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div><span className="section-label light">Help create the next result</span><h2>Support transparent, community-led action.</h2></div>
          <Link className="button button-light" href={`/donate?campaign=${project.slug}`}>Donate now <Icon name="arrow" size={18} /></Link>
        </div>
      </section>
    </>
  )
}
