import { sql } from '@vercel/postgres'
import { hash, verify } from '@node-rs/argon2'

export interface SuperAdminRow {
  id: number
  full_name: string
  organization: string
  email: string
  password_hash: string
  created_at: Date
  updated_at: Date
}

export interface SuperAdminAccountResponse {
  id: number
  fullName: string
  organization: string
  email: string
  createdAt: string
  updatedAt: string
}

let tableReady: Promise<void> | null = null

function mapRow(row: SuperAdminRow): SuperAdminAccountResponse {
  return {
    id: row.id,
    fullName: row.full_name,
    organization: row.organization,
    email: row.email,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  }
}

export async function ensureSuperAdminTable() {
  if (!tableReady) {
    tableReady = sql`
      CREATE TABLE IF NOT EXISTS super_admin_accounts (
        id SERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        organization TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `.then(() => undefined)
  }
  return tableReady
}

export async function fetchSuperAdmin() {
  await ensureSuperAdminTable()
  const result = await sql<SuperAdminRow>`SELECT * FROM super_admin_accounts LIMIT 1`
  if (result.rowCount === 0) return null
  return mapRow(result.rows[0])
}

export async function createOrUpdateSuperAdmin(data: {
  fullName: string
  organization: string
  email: string
  password: string
}) {
  await ensureSuperAdminTable()
  const passwordHash = await hash(data.password)
  const result = await sql<SuperAdminRow>`
    INSERT INTO super_admin_accounts (full_name, organization, email, password_hash)
    VALUES (${data.fullName}, ${data.organization}, ${data.email}, ${passwordHash})
    ON CONFLICT (email) DO UPDATE SET
      full_name = EXCLUDED.full_name,
      organization = EXCLUDED.organization,
      password_hash = EXCLUDED.password_hash,
      updated_at = NOW()
    RETURNING *;
  `
  return mapRow(result.rows[0])
}

export async function verifySuperAdminCredentials(email: string, password: string) {
  await ensureSuperAdminTable()
  const result = await sql<SuperAdminRow>`SELECT * FROM super_admin_accounts WHERE email = ${email} LIMIT 1`
  if (result.rowCount === 0) return null
  const row = result.rows[0]
  const valid = await verify(row.password_hash, password)
  if (!valid) return null
  return mapRow(row)
}
