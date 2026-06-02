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

export const TABLE_COLUMNS: { key: keyof ProjectRecord | string; label: string; defaultVisible?: boolean }[] = [
  { key: 'Project No.', label: 'Project No.', defaultVisible: true },
  { key: 'Tracking Period', label: 'Tracking Period', defaultVisible: true },
  { key: 'Project Name', label: 'Project Name', defaultVisible: true },
  { key: 'Project Developer / Owner', label: 'Developer / Owner', defaultVisible: true },
  { key: 'Project Type', label: 'Project Type', defaultVisible: true },
  { key: 'Region / Zone', label: 'Region / Zone', defaultVisible: true },
  { key: 'City', label: 'City', defaultVisible: true },
  { key: 'Project Value (USD)', label: 'Project Value (USD)', defaultVisible: true },
  { key: 'Project Stage', label: 'Project Stage', defaultVisible: true },
  { key: 'Procurement Channel', label: 'Procurement Channel', defaultVisible: false },
  { key: 'EPC / Main Contractor', label: 'EPC / Main Contractor', defaultVisible: true },
  { key: 'PMC / Consultant', label: 'PMC / Consultant', defaultVisible: false },
  { key: 'Key Decision Maker', label: 'Key Decision Maker', defaultVisible: false },
  { key: 'Designation', label: 'Designation', defaultVisible: false },
  { key: 'Contact Number', label: 'Contact Number', defaultVisible: false },
  { key: 'Email ID', label: 'Email ID', defaultVisible: false },
  { key: 'Vendor Registration Portal', label: 'Vendor Portal', defaultVisible: false },
  { key: 'Prequalification Requirements', label: 'Prequalification', defaultVisible: false },
  { key: 'Tender / RFQ Reference', label: 'Tender / RFQ', defaultVisible: false },
  { key: 'Expected Tender Date', label: 'Expected Tender Date', defaultVisible: true },
  { key: 'Current Status', label: 'Current Status', defaultVisible: true },
  { key: 'Opportunity Rating', label: 'Opportunity Rating', defaultVisible: true },
  { key: 'Remarks', label: 'Remarks', defaultVisible: true },
]
