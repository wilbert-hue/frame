/**
 * Converts Excel (rows 1–5) + demo data (rows 6–50) → JSON.
 * Run: npm run convert:aluminium
 */
const fs = require('fs')
const path = require('path')
const XLSX = require('xlsx')

const EXCEL_FILE = path.join(__dirname, '..', 'Project tracking Database_Aluminium Frame Market.xlsx')
const OUT_FILE = path.join(__dirname, '..', 'public', 'data', 'aluminium-frame-projects.json')

const DEMO_PROJECTS = [
  { name: 'Riyadh Metro Lines', owner: 'Royal Commission for Riyadh City', type: 'Rail & Metro', region: 'Riyadh Region', city: 'Riyadh', value: '22+ Bn' },
  { name: 'Jeddah Central Project', owner: 'Jeddah Central Development Company', type: 'Mixed-Use Commercial', region: 'Makkah Region', city: 'Jeddah', value: '20+ Bn' },
  { name: 'King Abdullah Economic City', owner: 'Emaar, The Economic City', type: 'Industrial City', region: 'Makkah Region', city: 'Rabigh', value: '100+ Bn' },
  { name: 'ROSHN Sedra Communities', owner: 'ROSHN Group', type: 'Residential Mega Development', region: 'Riyadh Region', city: 'Riyadh', value: '15+ Bn' },
  { name: 'AlUla Development', owner: 'Royal Commission for AlUla', type: 'Heritage, Tourism & Mixed Use', region: 'Madinah Region', city: 'AlUla', value: '15+ Bn' },
  { name: 'Wa\'ad Al Shamal Phosphate', owner: 'Ma\'aden', type: 'Oil & Gas Infrastructure', region: 'Northern Borders', city: 'Wa\'ad Al Shamal', value: '8+ Bn' },
  { name: 'Jazan Economic City', owner: 'Jazan Economic City Company', type: 'Industrial City', region: 'Jazan Region', city: 'Jazan', value: '5+ Bn' },
  { name: 'King Salman Energy Park', owner: 'SPARK', type: 'Industrial City', region: 'Eastern Province', city: 'Dammam', value: '6+ Bn' },
  { name: 'Riyadh Sports Boulevard', owner: 'Riyadh Sports Boulevard Company', type: 'Stadium & Events', region: 'Riyadh Region', city: 'Riyadh', value: '23+ Bn' },
  { name: 'New Murabba', owner: 'New Murabba Development Company', type: 'Smart City / Giga Project', region: 'Riyadh Region', city: 'Riyadh', value: '50+ Bn' },
  { name: 'Saudi Downtown Company', owner: 'Public Investment Fund', type: 'Mixed-Use Commercial', region: 'Riyadh Region', city: 'Riyadh', value: '12+ Bn' },
  { name: 'King Faisal Medical City', owner: 'Ministry of Health', type: 'Healthcare Campus', region: 'Riyadh Region', city: 'Riyadh', value: '4+ Bn' },
  { name: 'Riyadh Airports Expansion', owner: 'Riyadh Airports Company', type: 'Airport Infrastructure', region: 'Riyadh Region', city: 'Riyadh', value: '8+ Bn' },
  { name: 'Jubail Industrial City II', owner: 'Royal Commission for Jubail', type: 'Industrial City', region: 'Eastern Province', city: 'Jubail', value: '10+ Bn' },
  { name: 'Yanbu Industrial Expansion', owner: 'Royal Commission for Yanbu', type: 'Industrial City', region: 'Madinah Region', city: 'Yanbu', value: '7+ Bn' },
  { name: 'Hail Industrial Valley', owner: 'MODON', type: 'Logistics & Warehousing', region: 'Hail Region', city: 'Hail', value: '2+ Bn' },
  { name: 'Tabuk Industrial City', owner: 'MODON', type: 'Logistics & Warehousing', region: 'Tabuk', city: 'Tabuk', value: '1.5+ Bn' },
  { name: 'Abha Tourism Cluster', owner: 'Asir Development Authority', type: 'Tourism & Hospitality Development', region: 'Asir Region', city: 'Abha', value: '3+ Bn' },
  { name: 'Eastern Province Logistics Hub', owner: 'Saudi Logistics Services', type: 'Logistics & Warehousing', region: 'Eastern Province', city: 'Dammam', value: '2.5+ Bn' },
  { name: 'Makkah Hospitality Expansion', owner: 'Hajj & Umrah Ministry', type: 'Tourism & Hospitality Development', region: 'Makkah Region', city: 'Makkah', value: '5+ Bn' },
  { name: 'Madinah Knowledge Economic City', owner: 'KEC Holdings', type: 'Education Campus', region: 'Madinah Region', city: 'Madinah', value: '7+ Bn' },
  { name: 'Najran Border Logistics', owner: 'Najran Development Authority', type: 'Logistics & Warehousing', region: 'Najran Region', city: 'Najran', value: '1+ Bn' },
  { name: 'Northern Borders Housing', owner: 'Ministry of Housing', type: 'Residential Mega Development', region: 'Northern Borders', city: 'Arar', value: '2+ Bn' },
  { name: 'Qassim Commercial District', owner: 'Qassim Investment Company', type: 'Mixed-Use Commercial', region: 'Qassim Region', city: 'Buraydah', value: '1.2+ Bn' },
  { name: 'Eastern Ring Road Commercial', owner: 'Riyadh Municipality', type: 'Mixed-Use Commercial', region: 'Riyadh Region', city: 'Riyadh', value: '3+ Bn' },
  { name: 'Port of Dammam Expansion', owner: 'Saudi Ports Authority', type: 'Port & Maritime', region: 'Eastern Province', city: 'Dammam', value: '4+ Bn' },
  { name: 'Jeddah Islamic Port Upgrade', owner: 'Saudi Ports Authority', type: 'Port & Maritime', region: 'Makkah Region', city: 'Jeddah', value: '3.5+ Bn' },
  { name: 'Ras Al-Khair Mining', owner: 'Ma\'aden', type: 'Oil & Gas Infrastructure', region: 'Eastern Province', city: 'Ras Al-Khair', value: '9+ Bn' },
  { name: 'Sharma Resort Development', owner: 'NEOM Company', type: 'Tourism & Hospitality Development', region: 'Tabuk', city: 'Sharma', value: '2+ Bn' },
  { name: 'Oxagon Industrial City', owner: 'NEOM Company', type: 'Industrial City', region: 'Tabuk', city: 'NEOM', value: '8+ Bn' },
  { name: 'Trojena Mountain Resort', owner: 'NEOM Company', type: 'Entertainment & Sports City', region: 'Tabuk', city: 'NEOM', value: '5+ Bn' },
  { name: 'Sindalah Island', owner: 'NEOM Company', type: 'Tourism & Hospitality Development', region: 'Tabuk', city: 'NEOM', value: '4+ Bn' },
  { name: 'Riyadh Green Riyadh', owner: 'Royal Commission for Riyadh City', type: 'Residential Mega Development', region: 'Riyadh Region', city: 'Riyadh', value: '11+ Bn' },
  { name: 'KAFD Phase II', owner: 'King Abdullah Financial District', type: 'Mixed-Use Commercial', region: 'Riyadh Region', city: 'Riyadh', value: '6+ Bn' },
  { name: 'SABIC Technology Valley', owner: 'SABIC', type: 'Industrial City', region: 'Eastern Province', city: 'Jubail', value: '3+ Bn' },
  { name: 'Aramco Tanajib Gas Plant', owner: 'Saudi Aramco', type: 'Oil & Gas Infrastructure', region: 'Eastern Province', city: 'Tanajib', value: '12+ Bn' },
  { name: 'Riyadh World Expo Site', owner: 'Riyadh Expo 2030 Company', type: 'Stadium & Events', region: 'Riyadh Region', city: 'Riyadh', value: '7+ Bn' },
  { name: 'Eastern Province Stadium', owner: 'Ministry of Sport', type: 'Stadium & Events', region: 'Eastern Province', city: 'Dammam', value: '1.5+ Bn' },
  { name: 'Taif Mountain Tourism', owner: 'Taif Development Authority', type: 'Tourism & Hospitality Development', region: 'Makkah Region', city: 'Taif', value: '2+ Bn' },
  { name: 'Baha Eco Tourism', owner: 'Al-Baha Development Authority', type: 'Tourism & Hospitality Development', region: 'Al-Baha Region', city: 'Al-Baha', value: '800+ Mn' },
  { name: 'Jouf Agricultural Industrial', owner: 'MODON', type: 'Industrial City', region: 'Al-Jouf Region', city: 'Sakaka', value: '900+ Mn' },
  { name: 'Riyadh Data Center Campus', owner: 'stc / hyperscalers', type: 'Logistics & Warehousing', region: 'Riyadh Region', city: 'Riyadh', value: '2+ Bn' },
  { name: 'Western Region Warehousing', owner: 'LogiPoint', type: 'Logistics & Warehousing', region: 'Makkah Region', city: 'Jeddah', value: '1+ Bn' },
  { name: 'Clear-Span Expo Jeddah', owner: 'Jeddah Events Company', type: 'Stadium & Events', region: 'Makkah Region', city: 'Jeddah', value: '600+ Mn' },
  { name: 'Workforce Housing NEOM', owner: 'NEOM Company', type: 'Residential Mega Development', region: 'Tabuk', city: 'NEOM', value: '3+ Bn' },
]

const STAGES = [
  'Planning & Development',
  'Active Development',
  'Construction',
  'Pre-Construction',
  'EPC Award Pending',
  'Tender Preparation',
  'Development & Construction',
]
const PROCUREMENT = [
  'Direct Procurement + EPC Packages',
  'Vendor Registration + Contractor Procurement',
  'Contractor-led Procurement',
  'EPC Procurement',
  'Framework Agreement',
  'Public Tender Portal',
]
const RATINGS = ['High', 'Medium-High', 'Medium', 'Low', 'Emerging']
const STATUSES = [
  'Active Procurement',
  'Active Development',
  'Under Evaluation',
  'Pre-qualification Open',
  'Rolling Procurement',
  'Tender Preparation',
]
const TENDER_DATES = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', 'H1 2027', 'Ongoing', 'Rolling Procurement']
const PERIODS = [2025, 2026, 2026, 2026, 2027]
const CONTRACTORS = [
  'ACCIONA, Al-Bawani, Nesma & Partners',
  'Bechtel, Samsung C&T',
  'Larsen & Toubro, Shapoorji Pallonji',
  'China State Construction, CRCC',
  'Local Saudi JV (awarded packages)',
  'To be awarded by package',
]
const CONSULTANTS = ['Parsons, AECOM', 'Jacobs, Mace', 'WSP, Arup', 'Multiple consultants by package', 'Turner & Townsend']
const EPC_REMARKS = [
  'Strong demand for aluminium frame structures, clear-span warehouses and workforce camps.',
  'Temporary facilities and modular structures opportunity for façade and framing suppliers.',
  'Vendor registration recommended; package tenders expected through portal.',
  'Pre-qualification for structural aluminium and curtain wall systems underway.',
  'Logistics hubs and industrial sheds — high potential for frame suppliers.',
]

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function pick(rand, arr) {
  return arr[Math.floor(rand() * arr.length)]
}

function fixRedSeaRow(row) {
  if (row['Project Name'] !== 'Red Sea Global') return row
  return {
    ...row,
    'Project Developer / Owner': 'Red Sea Global',
    'Project Type': 'Tourism & Hospitality Development',
    'Region / Zone': 'Western Region',
    City: 'Red Sea Coast',
    'Project Value (USD)': '20+ Bn',
    'Project Stage': 'Construction',
    'Procurement Channel': 'Supplier Registration + Main Contractor Procurement',
    'EPC / Main Contractor': 'ACCIONA, Al-Bawani, Nesma & Partners (selected packages)',
    'PMC / Consultant': 'Multiple consultants by package',
    'Key Decision Maker': 'Supply Chain & Vendor Registration Team',
    Designation: 'Supplier Registration',
    'Contact Number': 'Official Corporate Contact',
    'Email ID': 'Vendor Registration Channel',
    'Vendor Registration Portal': 'Red Sea Global Vendor Registration',
    'Prequalification Requirements':
      'Supplier Registration, Sustainability Compliance, Technical Qualification',
    'Tender / RFQ Reference': 'Project-specific procurement',
    'Expected Tender Date': 'Ongoing',
    'Current Status': 'Active Procurement',
    'Opportunity Rating': 'High',
    Remarks:
      'Significant demand for temporary hospitality support structures and warehousing. (redseaglobal.com)',
  }
}

function buildDemoProject(index, template) {
  const rand = seededRandom(index * 9973)
  const projectNo = `Project ${index}`

  return {
    id: projectNo,
    'Project No.': projectNo,
    'Tracking Period': pick(rand, PERIODS),
    'Project Name': template.name,
    'Project Developer / Owner': template.owner,
    'Project Type': template.type,
    'Region / Zone': template.region,
    City: template.city,
    'Project Value (USD)': template.value,
    'Project Stage': pick(rand, STAGES),
    'Procurement Channel': pick(rand, PROCUREMENT),
    'EPC / Main Contractor': pick(rand, CONTRACTORS),
    'PMC / Consultant': pick(rand, CONSULTANTS),
    'Key Decision Maker': `${template.name} Procurement`,
    Designation: 'Vendor Registration & Procurement',
    'Contact Number': 'Official Corporate Contact',
    'Email ID': 'procurement@developer.sa',
    'Vendor Registration Portal': `${template.name} Supplier Portal`,
    'Prequalification Requirements':
      'Company Profile, CR, VAT, Financials, HSE, Technical Capability',
    'Tender / RFQ Reference': 'Package-specific contractor tenders',
    'Expected Tender Date': pick(rand, TENDER_DATES),
    'Current Status': pick(rand, STATUSES),
    'Opportunity Rating': pick(rand, RATINGS),
    Remarks: pick(rand, EPC_REMARKS),
    _hasData: true,
    _isDemo: true,
  }
}

const wb = XLSX.readFile(EXCEL_FILE)
const rows = XLSX.utils.sheet_to_json(wb.Sheets['Project Tracker'])

const projects = []
for (let i = 0; i < 50; i++) {
  const row = rows[i]
  const projectNo = `Project ${i + 1}`

  if (row && row['Project Name']?.toString().trim()) {
    const fixed = fixRedSeaRow({ ...row })
    projects.push({
      id: projectNo,
      'Project No.': row['Project No.'] || projectNo,
      ...fixed,
      _hasData: true,
      _isDemo: false,
    })
  } else {
    const template = DEMO_PROJECTS[(i - 5) % DEMO_PROJECTS.length]
    projects.push(buildDemoProject(i + 1, template))
  }
}

const meta = {
  marketTitle: 'Global Aluminium Frame Market',
  dashboardTitle: 'Project Tracking Database',
  sourceFile: 'Project tracking Database_Aluminium Frame Market.xlsx',
  sheetName: 'Project Tracker',
  exportedAt: new Date().toISOString(),
  totalRows: 50,
  activeProjects: projects.length,
  demoRows: projects.filter((p) => p._isDemo).length,
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
fs.writeFileSync(OUT_FILE, JSON.stringify({ meta, projects }, null, 2))
console.log(`Wrote 50 rows (${meta.demoRows} demo, ${50 - meta.demoRows} from Excel) → ${OUT_FILE}`)
