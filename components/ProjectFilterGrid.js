'use client'

import { useState } from 'react'
import ProjectCard from './ProjectCard'

const FILTERS = [
  ['all', 'All projects'],
  ['food', 'Food support'],
  ['community', 'Community welfare'],
  ['child', 'Child welfare'],
  ['fundraising', 'Fundraising'],
  ['emergency', 'Emergency relief'],
]

export default function ProjectFilterGrid({ projects }) {
  const [filter, setFilter] = useState('all')
  const visible = filter === 'all' ? projects : projects.filter((p) => p.categoryKey === filter)

  return (
    <>
      <div className="filter-bar" aria-label="Filter projects">
        {FILTERS.map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`filter-button${filter === key ? ' active' : ''}`}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {visible.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </>
  )
}
