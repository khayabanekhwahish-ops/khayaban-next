'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Icon from './Icon'

const CAMPAIGNS = [
  ['', 'Select a campaign'],
  ['general', 'Where most needed'],
  ['rashan-2026', 'Rashan Project 2026'],
  ['ramadan-iftar-2026', 'Ramadan Iftar Drive 2026'],
  ['flood-relief-2025', 'Flood Relief Project'],
  ['masjid-depalpur-2025', 'Masjid Project'],
  ['helping-hands-2025', 'Project Helping Hands'],
]

const AMOUNTS = [1000, 5000, 10000, 25000]

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

function reference() {
  return `KK-${new Date().getFullYear()}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`
}

export default function DonationForm() {
  const searchParams = useSearchParams()
  const initialCampaign = searchParams.get('campaign') || ''
  const [amount, setAmount] = useState('')
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [paymentTab, setPaymentTab] = useState('bank')
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
        body: encode({ 'form-name': 'donation', ...data }),
      })
      if (!res.ok) throw new Error('Could not submit donation confirmation.')
      setRef(reference())
      setStatus('success')
    } catch (err) {
      setError(err.message || 'Could not submit donation confirmation. Please try again.')
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <div className="success-panel">
        <Icon name="check" size={32} />
        <h3>Confirmation submitted</h3>
        <p>Your reference is <strong>{ref}</strong>. A finance team member must verify the transfer before an official acknowledgement is issued.</p>
        <button className="button button-small" type="button" onClick={() => setStatus('idle')}>Submit another</button>
      </div>
    )
  }

  return (
    <form
      className="form-card reveal"
      name="donation"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="donation" />
      <p className="sr-only">
        <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
      </p>
      <h2>Donation confirmation</h2>
      <p>Fields marked with an asterisk are required.</p>

      <div className="form-section">
        <div className="form-section-title"><span className="step-number">1</span>Choose where your support goes</div>
        <div className="field-grid">
          <div className="field full">
            <label htmlFor="campaign">Campaign *</label>
            <select id="campaign" name="campaign" defaultValue={initialCampaign} required>
              {CAMPAIGNS.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-title"><span className="step-number">2</span>Enter the donation amount</div>
        <div className="amount-grid">
          {AMOUNTS.map((a) => (
            <button
              type="button"
              key={a}
              className={`amount-option${selectedAmount === a ? ' selected' : ''}`}
              onClick={() => { setSelectedAmount(a); setAmount(String(a)) }}
            >
              PKR {a.toLocaleString()}
            </button>
          ))}
        </div>
        <div className="field">
          <label htmlFor="amount">Amount in PKR *</label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="1"
            step="1"
            required
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => { setAmount(e.target.value); setSelectedAmount(null) }}
          />
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-title"><span className="step-number">3</span>Use an approved payment method</div>
        <div className="payment-tabs" role="tablist">
          {[['bank', 'Bank transfer'], ['qr', 'QR payment'], ['gateway', 'Online gateway']].map(([key, label]) => (
            <button
              type="button"
              key={key}
              className={`payment-tab${paymentTab === key ? ' active' : ''}`}
              onClick={() => setPaymentTab(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="payment-panel" hidden={paymentTab !== 'bank'}>
          <h4>Official NGO bank account</h4>
          <p>Account title, bank name and IBAN can be added here once officially provided by Khayaban-e-Khwahish.</p>
          <span className="placeholder-code">DETAILS TO BE ADDED</span>
        </div>
        <div className="payment-panel" hidden={paymentTab !== 'qr'}>
          <h4>Verified QR code</h4>
          <p>The approved QR code should be inserted here after it is verified by the organization.</p>
          <span className="placeholder-code">QR NOT YET ADDED</span>
        </div>
        <div className="payment-panel" hidden={paymentTab !== 'gateway'}>
          <h4>Online payment gateway</h4>
          <p>This space can be used later for a secure approved provider if the NGO chooses to integrate one.</p>
          <span className="placeholder-code">GATEWAY NOT CONNECTED</span>
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-title"><span className="step-number">4</span>Submit transfer details</div>
        <div className="field-grid">
          <div className="field"><label htmlFor="donor-name">Name *</label><input id="donor-name" name="name" required autoComplete="name" /></div>
          <div className="field"><label htmlFor="donor-email">Email *</label><input id="donor-email" name="email" type="email" required autoComplete="email" /></div>
          <div className="field"><label htmlFor="donor-phone">Phone</label><input id="donor-phone" name="phone" type="tel" autoComplete="tel" /></div>
          <div className="field">
            <label htmlFor="method">Transfer method *</label>
            <select id="method" name="method" required defaultValue="">
              <option value="">Select</option>
              <option>Bank transfer</option>
              <option>QR payment</option>
              <option>Online gateway</option>
              <option>Other approved method</option>
            </select>
          </div>
          <div className="field"><label htmlFor="transfer-date">Transfer date *</label><input id="transfer-date" name="transferDate" type="date" required /></div>
          <div className="field"><label htmlFor="transfer-ref">Transaction / transfer reference *</label><input id="transfer-ref" name="transferReference" required placeholder="Reference shown by your bank" /></div>
          <div className="field full"><label htmlFor="note">Message or dedication</label><textarea id="note" name="note" placeholder="Optional"></textarea></div>
        </div>
      </div>

      <div className="form-section">
        <label className="checkbox-row"><input type="checkbox" name="receiptRequested" value="yes" /><span>I would like an official acknowledgement or receipt after verification.</span></label>
        <label className="checkbox-row"><input type="checkbox" name="consent" required /><span>I confirm the details are accurate and agree that the NGO may use them to verify this donation. *</span></label>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <button className="button button-donate" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting…' : 'Donate / Submit confirmation'}
      </button>
    </form>
  )
}
