import Link from 'next/link'
import Icon from './Icon'
import { urlFor } from '@/lib/sanity'

export default function ProjectCard({ project }) {
  const imgUrl = project.image ? urlFor(project.image).width(760).height(490).url() : null
  return (
    <article className="project-card" data-category={project.categoryKey}>
      <Link className="project-image" href={`/projects/${project.slug}`} aria-label={`View ${project.title}`}>
        {imgUrl && <img src={imgUrl} alt={project.title} loading="lazy" />}
        <span className="status-chip">{project.status}</span>
      </Link>
      <div className="project-card-body">
        <div className="eyebrow-row"><span>{project.category}</span><span>{project.year}</span></div>
        <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
        <p>{project.summary}</p>
        <div className="project-card-foot">
          <span><Icon name="map" size={16} /> {project.location}</span>
          <Link href={`/projects/${project.slug}`}>View project <Icon name="arrow" size={17} /></Link>
        </div>
      </div>
    </article>
  )
}
