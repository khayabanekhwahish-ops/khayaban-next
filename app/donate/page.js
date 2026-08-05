import { Suspense } from 'react'
import DonationForm from '@/components/DonationForm'

export const metadata = {
  title: 'Donate | Khayaban-e-Khwahish',
  description:
    'Support Khayaban-e-Khwahish projects and submit a donation confirmation for finance follow-up.',
  openGraph: {
    title: 'Donate | Khayaban-e-Khwahish',
    description:
      'Support Khayaban-e-Khwahish projects and submit a donation confirmation for finance follow-up.',
  },
  alternates: { canonical: '/donate' },
}

export default function DonatePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="reveal">
            <span className="kicker">Support our work</span>
            <h1>Turn generosity into visible impact.</h1>
            <p className="lead">Support food assistance, relief work and community welfare initiatives. The donation page has been designed to feel warm, trustworthy and action-oriented.</p>
          </div>
          <div className="page-hero-card reveal">
            <h3>Donate with confidence</h3>
            <p>Support should feel simple and meaningful. Public bank or payment details can be added here once officially approved by the organization.</p>
            <ul>
              <li>✓ Warm, visible donation call-to-action</li>
              <li>✓ Project-based giving options</li>
              <li>✓ Organized confirmation process</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container donate-layout">
          <aside className="donation-info reveal">
            <span className="section-label">Donation journey</span>
            <h2>Appealing for donors. Controlled for the NGO.</h2>
            <p>1. Choose a campaign and amount.<br />2. Transfer through an approved channel.<br />3. Submit the reference details.<br />4. The NGO verifies the transaction.<br />5. A response or receipt can be issued.</p>
            <div className="security-card">
              <span>💛</span>
              <div><strong>Every contribution matters</strong><p>Use the page to guide donors with clarity, trust and emotional connection while keeping the process professional.</p></div>
            </div>
            <div className="donation-campaigns">
              <div className="campaign-mini"><img src="/assets/img/rashan.jpg" alt="Rashan project" /><div><strong>Food assistance</strong><small>Support deserving families</small></div></div>
              <div className="campaign-mini"><img src="/assets/img/iftar_2026.jpg" alt="Ramadan Iftar" /><div><strong>Ramadan meals</strong><small>Help serve Iftar</small></div></div>
              <div className="campaign-mini"><img src="/assets/img/flood-relief-new.jpg" alt="Flood relief" /><div><strong>Emergency relief</strong><small>Support disaster response</small></div></div>
              <div className="campaign-mini"><img src="/assets/img/masjid.jpg" alt="Community welfare" /><div><strong>Community welfare</strong><small>Support local improvement</small></div></div>
            </div>
          </aside>
          <div>
            <Suspense fallback={null}>
              <DonationForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  )
}
