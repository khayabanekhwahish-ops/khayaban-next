// One-time import of the site's existing content (from the old assets/js/data.js
// and about.html founder copy) into Sanity, so nothing has to be re-typed by hand.
//
// Usage:
//   node --env-file=.env.local scripts/migrate-to-sanity.mjs
//
// Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and
// SANITY_WRITE_TOKEN (an Editor-permission token from sanity.io/manage) to be set.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMG_DIR = path.join(__dirname, '..', 'public', 'assets', 'img')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId || projectId === 'placeholder' || !token) {
  console.error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID and/or SANITY_WRITE_TOKEN.\n' +
      'Create a free project at https://www.sanity.io/manage, fill in .env.local, then re-run this script.'
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2025-06-01',
  useCdn: false,
})

const uploadedAssets = new Map()

async function uploadImage(filename) {
  if (uploadedAssets.has(filename)) return uploadedAssets.get(filename)
  const filePath = path.join(IMG_DIR, filename)
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), { filename })
  const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  uploadedAssets.set(filename, ref)
  console.log(`Uploaded ${filename}`)
  return ref
}

const projects = [
  {
    id: 'rashan-2026',
    title: 'Rashan Project 2026',
    category: 'Food Support',
    categoryKey: 'food',
    status: 'Completed',
    location: 'Pakistan',
    date: '2026',
    year: '2026',
    image: 'rashan.jpg',
    gallery: ['rashan.jpg', 'gallery15.jpg', 'gallery12.jpg'],
    summary:
      'A large-scale ration distribution initiative supporting underprivileged families with essential groceries.',
    objective: 'Reduce food insecurity by providing essential groceries to deserving households.',
    impact: [
      '150 Rashan bags distributed',
      'Over PKR 1 Million raised',
      'Each package included 20 kg Atta, 3 kg Sugar and 3 kg Meezan Ghee',
    ],
    metrics: [
      { label: 'Rashan bags', value: '150' },
      { label: 'Funds raised', value: 'PKR 1M+' },
      { label: 'Status', value: 'Completed' },
    ],
    story:
      'The Rashan Project 2026 became one of Khayaban-e-Khwahish’s largest humanitarian initiatives. The team conducted fundraising, procured supplies, verified beneficiaries and organized responsible distribution so families received relief with dignity.',
    funding: 'Over PKR 1 Million raised',
  },
  {
    id: 'ramadan-iftar-2026',
    title: 'Ramadan Iftar Drive 2026',
    category: 'Food Support',
    categoryKey: 'food',
    status: 'Completed',
    location: 'Kasur Road, near SAGE College, Lahore',
    date: 'Ramadan 2026',
    year: '2026',
    image: 'iftar_2026.jpg',
    gallery: ['iftar_2026.jpg', 'gallery05.jpg', 'gallery09.jpg'],
    summary:
      'Freshly cooked Iftar meals were served during the final ten days of Ramadan to laborers, travelers and underprivileged community members.',
    objective:
      'Provide high-quality Iftar meals to laborers, travelers and underprivileged members of the community.',
    impact: [
      '2,500 Iftar meals distributed',
      '250–300 people served daily',
      'Successfully completed a 10-day Ramadan campaign',
    ],
    metrics: [
      { label: 'Meals served', value: '2,500' },
      { label: 'Daily reach', value: '250–300' },
      { label: 'Campaign length', value: '10 days' },
    ],
    story:
      'Building on the success of the previous year, the 2026 Ramadan Iftar Drive expanded community outreach and brought together volunteers, donors and beneficiaries in the true spirit of Ramadan.',
    funding: 'Community-supported Ramadan campaign',
  },
  {
    id: 'flood-relief-2025',
    title: 'Flood Relief Project',
    category: 'Emergency Relief',
    categoryKey: 'emergency',
    status: 'Completed',
    location: 'Mohnal Wal, near Thokar Niaz Baig, Lahore',
    date: '18 September 2025',
    year: '2025',
    image: 'flood-relief-new.jpg',
    gallery: ['flood-relief-new.jpg', 'gallery10.jpg', 'gallery11.jpg', 'gallery12.jpg'],
    summary:
      'Emergency relief support for flood-affected households through food assistance, essential supplies and follow-up visits.',
    objective: 'Provide immediate food assistance and relief supplies to flood-affected households.',
    impact: [
      '40 relief packages distributed',
      '20 kg per package',
      'Food and essential non-food items included',
      'Total project cost: PKR 350,000',
    ],
    metrics: [
      { label: 'Relief packages', value: '40' },
      { label: 'Package weight', value: '20 kg' },
      { label: 'Project cost', value: 'PKR 350k' },
    ],
    story:
      'Following severe flooding on the outskirts of Lahore, the team conducted field assessments, prepared relief packages and made follow-up visits to assess ongoing community needs.',
    funding: 'Total project cost: PKR 350,000',
  },
  {
    id: 'fundraising-event-2025',
    title: 'First Fundraising Event',
    category: 'Fundraising',
    categoryKey: 'fundraising',
    status: 'Completed',
    location: '21K Padel Court, Model Town',
    date: '13 August 2025',
    year: '2025',
    image: 'fundraising-event-new.jpg',
    gallery: ['fundraising-event-new.jpg', 'gallery08.jpg', 'gallery02.jpg', 'gallery01.jpg'],
    summary:
      'A public fundraising event designed to strengthen community engagement and generate support for future humanitarian initiatives.',
    objective: 'Generate financial support for future welfare projects and increase community engagement.',
    impact: ['Hosted a public fundraising event', 'Engaged donors and supporters', 'PKR 100,000 raised'],
    metrics: [
      { label: 'Amount raised', value: 'PKR 100,000' },
      { label: 'Venue', value: '21K Padel Court' },
      { label: 'Status', value: 'Completed' },
    ],
    story:
      'The first fundraising event marked a significant milestone in building donor trust and establishing a more sustainable culture of community support within the organization.',
    funding: 'PKR 100,000 raised',
  },
  {
    id: 'orphanage-ramadan-visit-2025',
    title: 'Al-Wasiyo Orphanage Ramadan Visit',
    category: 'Child Welfare',
    categoryKey: 'child',
    status: 'Completed',
    location: 'Al-Wasiyo Orphanage, Model Town',
    date: 'Ramadan 2025',
    year: '2025',
    image: 'gallery03.jpg',
    gallery: ['gallery03.jpg', 'gallery04.jpg', 'gallery06.jpg'],
    summary: 'A special Ramadan visit focused on food, gifts and companionship for orphaned children.',
    objective: 'Create a memorable Ramadan experience for orphaned children through food, gifts and companionship.',
    impact: ['100 orphaned children benefited', 'Complete Iftar meal served', 'Goody bags distributed to every child'],
    metrics: [
      { label: 'Children reached', value: '100' },
      { label: 'Visit type', value: 'Ramadan outreach' },
      { label: 'Status', value: 'Completed' },
    ],
    story:
      'The team spent time with children at Al-Wasiyo Orphanage, hosted an Iftar gathering, served food and shared goody bags—strengthening the values of compassion and community service.',
    funding: 'Community-supported Ramadan outreach',
  },
  {
    id: 'ramadan-iftar-2025',
    title: 'Ramadan Iftar Drive 2025',
    category: 'Food Support',
    categoryKey: 'food',
    status: 'Completed',
    location: 'Kalma Chowk Pump, Lahore',
    date: 'Ramadan 2025',
    year: '2025',
    image: 'gallery05.jpg',
    gallery: ['gallery05.jpg', 'gallery09.jpg', 'gallery02.jpg'],
    summary:
      'The first month-long Iftar drive serving workers, staff members and nearby residents with freshly prepared meals every evening.',
    objective: 'Provide nutritious Iftar meals to fasting individuals while promoting compassion and community service.',
    impact: [
      'Approximately 2,100 Iftar meals distributed',
      '50–60 people served daily',
      'Successfully completed a 30-day Ramadan campaign',
    ],
    metrics: [
      { label: 'Meals served', value: '2,100' },
      { label: 'Daily reach', value: '50–60' },
      { label: 'Campaign length', value: '30 days' },
    ],
    story:
      'The 2025 Ramadan Iftar Drive demonstrated the organization’s ability to organize a long-term service campaign, coordinate volunteers and sustain daily meal preparation over 30 consecutive days.',
    funding: 'Volunteer and donor supported',
  },
  {
    id: 'helping-hands-2025',
    title: 'Project Helping Hands',
    category: 'Child Welfare',
    categoryKey: 'child',
    status: 'Completed',
    location: 'Al-Wasiyo Orphanage, Model Town',
    date: 'Early 2025',
    year: '2025',
    image: 'gallery01.jpg',
    gallery: ['gallery01.jpg', 'gallery03.jpg'],
    summary: 'Direct financial assistance for orphaned children through a partnership with Al-Wasiyo Orphanage.',
    objective: 'Support orphaned children by contributing toward their education, care and everyday needs.',
    impact: [
      'PKR 50,000 donated',
      'Supported welfare of children at Al-Wasiyo Orphanage',
      'Established the NGO’s first institutional partnership',
    ],
    metrics: [
      { label: 'Donation', value: 'PKR 50,000' },
      { label: 'Partner', value: 'Al-Wasiyo' },
      { label: 'Status', value: 'Completed' },
    ],
    story:
      'Project Helping Hands reflected the organization’s commitment to supporting vulnerable children and laid the foundation for future humanitarian partnerships.',
    funding: 'PKR 50,000 donated',
  },
  {
    id: 'masjid-depalpur-2025',
    title: 'Masjid Project (Depalpur)',
    category: 'Community Welfare',
    categoryKey: 'community',
    status: 'Completed',
    location: 'Depalpur',
    date: 'January 2025',
    year: '2025',
    image: 'masjid.jpg',
    gallery: ['masjid.jpg', 'wudu.jpg'],
    summary: 'The first community welfare initiative focused on improving local mosque facilities and comfort for worshippers.',
    objective: 'Improve the mosque’s facilities and provide better amenities for the local community.',
    impact: ['18 ceiling fans installed', 'Complete Wudu Khana renovation', 'Improved comfort for hundreds of daily worshippers'],
    metrics: [
      { label: 'Ceiling fans', value: '18' },
      { label: 'Facility upgrade', value: 'Wudu Khana' },
      { label: 'Status', value: 'Completed' },
    ],
    story:
      'Recognizing the need to improve local religious facilities, the team worked closely with the community to identify essential improvements and deliver practical upgrades.',
    funding: 'Community welfare initiative',
  },
]

const settings = {
  orgName: 'Khayaban-e-Khwahish',
  tagline: 'An Avenue to Ambition',
  email: 'khayabanekhwahish@gmail.com',
  instagram: '@khayabanekhwahish',
  instagramUrl: 'https://instagram.com/khayabanekhwahish',
  metrics: [
    { label: 'Documented projects', value: '8' },
    { label: 'Active volunteers', value: '20+' },
    { label: 'Iftar meals distributed', value: '4,600', barPercent: 100 },
    { label: 'Rashan bags delivered', value: '150', barPercent: 70 },
    { label: 'Flood relief packages', value: '40', barPercent: 38 },
    { label: 'Masjid fans installed', value: '18', barPercent: 24 },
  ],
}

const founder = {
  name: 'Murtaza Saquib',
  role: 'Founder of Khayaban-e-Khwahish',
  photo: 'murtaza-saquib.jpg',
  bio: [
    'Murtaza Saquib is the official Founder of Khayaban-e-Khwahish. The idea of creating a youth-led NGO first drew his attention as an opportunity to turn compassion into practical service. He later transformed that idea into an active organization with the support of his friends and volunteers.',
    'As a central force within the management team, Murtaza is known as a dependable and hands-on leader. He contributes to planning, coordination and project execution, and his commitment can be seen across the organization’s community welfare, food assistance, fundraising and emergency-relief initiatives.',
    'His confidence, versatility and willingness to invest his time, energy and personal resources give the organization a strong sense of direction. He is determined to help Khayaban-e-Khwahish grow into one of Lahore’s most trusted and impactful youth-led NGOs.',
    'His dedication to swimming also reflects qualities he brings to leadership: discipline, endurance, focus and the ability to remain composed under pressure. The organization is proud to have him as its Founder and looks forward to the vision, responsibility and ambition he continues to bring to its future.',
  ],
  qualities: ['Dependable', 'Hands-on', 'Versatile', 'Committed'],
}

const galleryImages = [
  { file: 'team-who-we-are.jpg', alt: 'Khayaban-e-Khwahish volunteer team', section: 'projects-field', order: 0 },
  { file: 'flood-relief-new.jpg', alt: 'Flood relief project team and community members', section: 'projects-field', order: 1 },
  { file: 'gallery05.jpg', alt: 'Community Iftar activity', section: 'projects-field', order: 2 },
  { file: 'rashan.jpg', alt: 'Rashan project supplies', section: 'projects-field', order: 3 },
  { file: 'gallery16.jpg', alt: 'Volunteer selfie', section: 'about-mini', order: 0 },
  { file: 'gallery17.jpg', alt: 'Two volunteers', section: 'about-mini', order: 1 },
  { file: 'gallery18.jpg', alt: 'Volunteer group', section: 'about-mini', order: 2 },
]

async function migrateProjects() {
  for (const p of projects) {
    const image = await uploadImage(p.image)
    const gallery = await Promise.all(p.gallery.map(uploadImage))
    const doc = {
      _id: `project-${p.id}`,
      _type: 'project',
      title: p.title,
      slug: { _type: 'slug', current: p.id },
      category: p.category,
      categoryKey: p.categoryKey,
      status: p.status,
      location: p.location,
      date: p.date,
      year: p.year,
      image,
      gallery,
      summary: p.summary,
      objective: p.objective,
      impact: p.impact,
      metrics: p.metrics,
      story: p.story,
      funding: p.funding,
    }
    await client.createOrReplace(doc)
    console.log(`Migrated project: ${p.title}`)
  }
}

async function migrateSettings() {
  await client.createOrReplace({ _id: 'siteSettings', _type: 'siteSettings', ...settings })
  console.log('Migrated site settings')
}

async function migrateFounder() {
  const photo = await uploadImage(founder.photo)
  await client.createOrReplace({ _id: 'founder', _type: 'founder', ...founder, photo })
  console.log('Migrated founder')
}

async function migrateGallery() {
  for (const g of galleryImages) {
    const image = await uploadImage(g.file)
    await client.createOrReplace({
      _id: `galleryImage-${g.section}-${g.order}`,
      _type: 'galleryImage',
      image,
      alt: g.alt,
      section: g.section,
      order: g.order,
    })
  }
  console.log('Migrated gallery images')
}

async function main() {
  await migrateProjects()
  await migrateSettings()
  await migrateFounder()
  await migrateGallery()
  console.log('\nDone. Open /studio on your site (or run `npm run dev` and visit localhost:3000/studio) to see the content.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
