'use client'

import { useState } from 'react'
import Icon from './Icon'

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

function reference() {
  return `IDEA-${new Date().getFullYear()}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`
}

export default function SuggestionForm() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [ref, setRef] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    setStatus('submitting')
    setError('')
    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'suggestion', ...data }),
      })
      if (!res.ok) throw new Error('Could not submit suggestion.')
      setRef(reference())
      setStatus('success')
      form.reset()
    } catch (err) {
      setError(err.message || 'Could not submit suggestion. Please try again.')
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <div className="success-panel">
        <Icon name="check" size={32} />
        <h3>Suggestion received</h3>
        <p>Thank you for sharing a community need. Your reference is <strong>{ref}</strong>.</p>
        <button className="button button-small" type="button" onClick={() => setStatus('idle')}>Submit another</button>
      </div>
    )
  }

  return (
    <form
      className="form-card reveal"
      name="suggestion"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="suggestion" />
      <p className="sr-only">
        <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
      </p>
      <h2>Project suggestion form</h2>
      <p>Use this form to share a local problem or welfare need.</p>
      <div className="field-grid">
        <div className="field"><label htmlFor="suggestion-name">Your name *</label><input id="suggestion-name" name="name" required autoComplete="name" /></div>
        <div className="field"><label htmlFor="suggestion-email">Email *</label><input id="suggestion-email" name="email" type="email" required autoComplete="email" /></div>
        <div className="field"><label htmlFor="suggestion-phone">Phone</label><input id="suggestion-phone" name="phone" type="tel" autoComplete="tel" /></div>
        <div className="field"><label htmlFor="suggestion-location">City, town or area *</label><input id="suggestion-location" name="location" required /></div>
        <div className="field full">
          <label htmlFor="suggestion-type">Type of issue *</label>
          <select id="suggestion-type" name="issueType" required defaultValue="">
            <option value="">Select</option>
            <option>Food or ration need</option>
            <option>Emergency relief</option>
            <option>Community facility issue</option>
            <option>Child or family support</option>
            <option>Other welfare need</option>
          </select>
        </div>
        <div className="field full"><label htmlFor="suggestion-problem">Describe the problem *</label><textarea id="suggestion-problem" name="problem" required placeholder="Explain what is happening and why support may be needed."></textarea></div>
        <div className="field full"><label htmlFor="suggestion-impact">Who is affected and approximately how many people?</label><textarea id="suggestion-impact" name="peopleAffected" placeholder="Share any useful details you know."></textarea></div>
        <div className="field full">
          <label className="checkbox-row"><input type="checkbox" name="consent" required /><span>I agree that Khayaban-e-Khwahish may use this information to review and follow up on the suggestion. *</span></label>
        </div>
      </div>
      {error && <p className="admin-error">{error}</p>}
      <button className="button" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting…' : <>Submit project suggestion → </>}
      </button>
    </form>
  )
}
