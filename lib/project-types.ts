export interface ProjectRecord {
  id: string
  _hasData: boolean
  _isDemo?: boolean
  'Project No.': string
  'Tracking Period'?: number
  'Project Name'?: string
  'Project Developer / Owner'?: string
  'Project Type'?: string
  'Region / Zone'?: string
  City?: string
  'Project Value (USD)'?: string
  'Project Stage'?: string
  'Procurement Channel'?: string
  'EPC / Main Contractor'?: string
  'PMC / Consultant'?: string
  'Key Decision Maker'?: string
  Designation?: string
  'Contact Number'?: string
  'Email ID'?: string
  'Vendor Registration Portal'?: string
  'Prequalification Requirements'?: string
  'Tender / RFQ Reference'?: string
  'Structure Requirement'?: string
  'Expected Tender Date'?: string
  'Current Status'?: string
  'Opportunity Rating'?: string
  Remarks?: string
}

export interface ProjectDatasetMeta {
  marketTitle: string
  dashboardTitle: string
  sourceFile: string
  sheetName: string
  exportedAt: string
  totalRows: number
  activeProjects: number
  demoRows?: number
  columns?: string[]
}

export interface ProjectDataset {
  meta: ProjectDatasetMeta
  projects: ProjectRecord[]
}

export interface ProjectFilters {
  search: string
  trackingPeriods: string[]
  regions: string[]
  projectTypes: string[]
  projectStages: string[]
  opportunityRatings: string[]
  currentStatuses: string[]
}

export const DEFAULT_PROJECT_FILTERS: ProjectFilters = {
  search: '',
  trackingPeriods: [],
  regions: [],
  projectTypes: [],
  projectStages: [],
  opportunityRatings: [],
  currentStatuses: [],
}

/** All Excel columns in sheet order */
export const TABLE_COLUMNS: { key: keyof ProjectRecord | string; label: string }[] = [
  { key: 'Project No.', label: 'Project No.' },
  { key: 'Tracking Period', label: 'Tracking Period' },
  { key: 'Project Name', label: 'Project Name' },
  { key: 'Project Developer / Owner', label: 'Project Developer / Owner' },
  { key: 'Project Type', label: 'Project Type' },
  { key: 'Region / Zone', label: 'Region / Zone' },
  { key: 'City', label: 'City' },
  { key: 'Project Value (USD)', label: 'Project Value (USD)' },
  { key: 'Project Stage', label: 'Project Stage' },
  { key: 'Procurement Channel', label: 'Procurement Channel' },
  { key: 'EPC / Main Contractor', label: 'EPC / Main Contractor' },
  { key: 'PMC / Consultant', label: 'PMC / Consultant' },
  { key: 'Key Decision Maker', label: 'Key Decision Maker' },
  { key: 'Designation', label: 'Designation' },
  { key: 'Contact Number', label: 'Contact Number' },
  { key: 'Email ID', label: 'Email ID' },
  { key: 'Vendor Registration Portal', label: 'Vendor Registration Portal' },
  { key: 'Prequalification Requirements', label: 'Prequalification Requirements' },
  { key: 'Tender / RFQ Reference', label: 'Tender / RFQ Reference' },
  { key: 'Structure Requirement', label: 'Structure Requirement' },
  { key: 'Expected Tender Date', label: 'Expected Tender Date' },
  { key: 'Current Status', label: 'Current Status' },
  { key: 'Opportunity Rating', label: 'Opportunity Rating' },
  { key: 'Remarks', label: 'Remarks' },
]
