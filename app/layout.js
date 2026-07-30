import './globals.css'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import ScrollReveal from '@/components/ScrollReveal'
import NetlifyFormsRegistry from '@/components/NetlifyFormsRegistry'

export const metadata = {
  metadataBase: new URL('https://www.khayabanekhwahish.org'),
  title: {
    default: 'Khayaban-e-Khwahish | NGO in Pakistan | Donate, Volunteer & Support Communities',
    template: '%s | Khayaban-e-Khwahish',
  },
  description:
    'Khayaban-e-Khwahish is a student-led nonprofit in Pakistan. Explore authentic projects, support fundraising, volunteer and suggest community needs.',
  keywords: [
    'Khayaban-e-Khwahish',
    'NGO Pakistan',
    'donate',
    'volunteer',
    'community welfare',
    'food support',
    'relief projects',
    'fundraising',
  ],
  authors: [{ name: 'Khayaban-e-Khwahish' }],
  icons: { icon: '/assets/img/logo-clean-transparent.png' },
  openGraph: {
    siteName: 'Khayaban-e-Khwahish',
    type: 'website',
    images: ['/assets/img/team-who-we-are.jpg'],
  },
  twitter: { card: 'summary_large_image' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Khayaban-e-Khwahish',
  alternateName: 'An Avenue to Ambition',
  description:
    'Student-led nonprofit organization creating meaningful social impact in Pakistan through humanitarian initiatives, food support and youth-led volunteerism.',
  email: 'khayabanekhwahish@gmail.com',
  sameAs: ['https://instagram.com/khayabanekhwahish'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ScrollReveal />
        <NetlifyFormsRegistry />
      </body>
    </html>
  )
}
