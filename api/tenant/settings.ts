import type { VercelRequest, VercelResponse } from '@vercel/node'

interface TenantSettingsPayload {
  schoolName: string
  schoolAddress: string
  schoolEmail: string
  schoolPhone: string
  currentSession: string
  currentTerm: string
  enableSMS: boolean
  enableEmail: boolean
  enableBiometric: boolean
  enableOnlinePayment: boolean
  autoBackup: boolean
  twoFactorAuth: boolean
  maintenanceMode: boolean
  logoUrl?: string | null
}

interface TenantSettingsResponse extends TenantSettingsPayload {
  updatedAt: string
}

const defaultSettings: TenantSettingsResponse = {
  schoolName: 'Excellence Academy',
  schoolAddress: '123 Education Road, Lagos, Nigeria',
  schoolEmail: 'info@excellenceacademy.edu.ng',
  schoolPhone: '+234-801-234-5678',
  currentSession: '2025/2026',
  currentTerm: 'First Term',
  enableSMS: true,
  enableEmail: true,
  enableBiometric: false,
  enableOnlinePayment: true,
  autoBackup: true,
  twoFactorAuth: false,
  maintenanceMode: false,
  logoUrl: null,
  updatedAt: new Date().toISOString(),
}

let cachedSettings: TenantSettingsResponse = { ...defaultSettings }

function methodNotAllowed(res: VercelResponse) {
  res.setHeader('Allow', 'GET,PUT')
  return res.status(405).json({ error: 'Method not allowed' })
}

function parseBody(req: VercelRequest) {
  if (!req.body) return null
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as Partial<TenantSettingsPayload>
    } catch (error) {
      console.error('Failed to parse tenant settings payload', error)
      return null
    }
  }
  return req.body as Partial<TenantSettingsPayload>
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ settings: cachedSettings })
  }

  if (req.method === 'PUT') {
    const body = parseBody(req)
    if (!body) {
      return res.status(400).json({ error: 'A JSON body is required.' })
    }

    const nextSettings: TenantSettingsResponse = {
      ...cachedSettings,
      ...body,
      updatedAt: new Date().toISOString(),
    }

    cachedSettings = nextSettings
    return res.status(200).json({ settings: cachedSettings })
  }

  return methodNotAllowed(res)
}
