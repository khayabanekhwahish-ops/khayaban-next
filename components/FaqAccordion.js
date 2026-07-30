'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'Does submitting a suggestion guarantee a project?',
    a: 'No. The team can review urgency, location, available resources, safety and whether the issue fits the organization’s mission.',
  },
  {
    q: 'How do I volunteer?',
    a: 'Use the official Google Form embedded on the Volunteer page.',
  },
  {
    q: 'How can an organization partner with the NGO?',
    a: 'Use the official email or Instagram account to discuss sponsorship, collaboration, in-kind support or community partnerships.',
  },
  {
    q: 'Where can I ask about donations?',
    a: 'Visit the Donate page and use the official email for any required clarification.',
  },
]

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="faq-list">
      {FAQS.map((item, i) => (
        <div className={`faq-item${openIndex === i ? ' open' : ''}`} key={item.q}>
          <button
            className="faq-question"
            aria-expanded={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {item.q}
          </button>
          <div className="faq-answer">{item.a}</div>
        </div>
      ))}
    </div>
  )
}
