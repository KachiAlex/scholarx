import React, { useEffect, useMemo, useState } from 'react'
import { ShieldCheck, Building2, Eye, EyeOff, AlertTriangle } from 'lucide-react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import { CreateSuperAdminAccountDialog, SuperAdminAccountFormData } from './CreateSuperAdminAccountDialog'
import {
  fetchSuperAdminAccount,
  SuperAdminAccount,
  upsertSuperAdminAccount,
  verifySuperAdminAccount,
} from '../../lib/superAdminClient'

export type LoginRole = 'tenant-admin' | 'super-admin'

interface LoginPanelProps {
  onLogin: (role: LoginRole) => void
}

const STORAGE_KEY = 'scholix.superAdminAccount'

export function LoginPanel({ onLogin }: LoginPanelProps) {
  const [role, setRole] = useState<LoginRole>('tenant-admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [storedAccount, setStoredAccount] = useState<SuperAdminAccount | null>(null)
  const [isAccountLoading, setIsAccountLoading] = useState(true)
  const [accountLoadError, setAccountLoadError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function loadAccount() {
      setIsAccountLoading(true)
      setAccountLoadError('')
      try {
        const account = await fetchSuperAdminAccount()
        if (cancelled) return
        setStoredAccount(account)
        if (account && !email) {
          setEmail(account.email)
        }
      } catch (loadError) {
        if (cancelled) return
        const message =
          loadError instanceof Error
            ? loadError.message
            : 'Unable to reach Scholix cloud right now. Please retry later.'
        setAccountLoadError(message)
      } finally {
        if (!cancelled) {
          setIsAccountLoading(false)
        }
      }
    }

    loadAccount()
    return () => {
      cancelled = true
    }
  }, [email])

  const roleDescription = useMemo(() => {
    if (role === 'super-admin') {
      return 'Enter the credentials configured for your Scholix super admin account.'
    }
    return 'Use your school workspace email to continue.'
  }, [role])

  const handleAccountCreated = async (account: SuperAdminAccountFormData) => {
    const savedAccount = await upsertSuperAdminAccount(account)
    setStoredAccount(savedAccount)
    setRole('super-admin')
    setEmail(savedAccount.email)
    setPassword('')
    setAccountLoadError('')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (role === 'super-admin') {
      if (!storedAccount) {
        setError('No super admin account is provisioned in the Scholix cloud yet.')
        return
      }

      const normalizedInput = email.trim().toLowerCase()
      const normalizedStored = storedAccount.email.trim().toLowerCase()
      if (normalizedInput !== normalizedStored) {
        setError('Email must match the registered super admin account.')
        return
      }

      try {
        setIsVerifying(true)
        const verifiedAccount = await verifySuperAdminAccount(normalizedInput, password)
        setStoredAccount(verifiedAccount)
        onLogin('super-admin')
        return
      } catch (verifyError) {
        const message =
          verifyError instanceof Error ? verifyError.message : 'Unable to verify credentials. Please try again.'
        setError(message)
        return
      } finally {
        setIsVerifying(false)
      }
    }

    onLogin(role)
  }

  return (
    <div className="rounded-2xl border border-white/60 bg-white/90 shadow-2xl backdrop-blur-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-2 text-blue-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Secure Access</p>
            <h3 className="text-lg font-semibold text-gray-900">Sign in to Scholix Console</h3>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
        <div className="flex gap-2 rounded-2xl bg-gray-100 p-1 text-sm font-medium">
          <button
            type="button"
            onClick={() => setRole('tenant-admin')}
            className={`flex-1 rounded-xl px-4 py-2 transition ${
              role === 'tenant-admin' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
            }`}
          >
            School Admin
          </button>
          <button
            type="button"
            onClick={() => setRole('super-admin')}
            className={`flex-1 rounded-xl px-4 py-2 transition ${
              role === 'super-admin' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
            }`}
          >
            Super Admin
          </button>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Work Email</label>
          <Input
            type="email"
            placeholder={role === 'super-admin' ? 'you@scholix.cloud' : 'principal@school.edu'}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <label className="font-medium text-gray-700">Password</label>
            <button
              type="button"
              className="text-blue-600 hover:text-blue-700"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <div className="absolute inset-y-0 right-3 flex items-center text-gray-400">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500">{roleDescription}</p>

        {accountLoadError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            {accountLoadError}
          </div>
        )}

        {role === 'super-admin' && !storedAccount && !isAccountLoading && !accountLoadError && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4" />
              <p>No super admin account detected in the Scholix cloud. Create one below to unlock the portal.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <Switch checked={remember} onCheckedChange={(value) => setRemember(Boolean(value))} />
            Remember me
          </label>
          <button type="button" className="font-medium text-blue-600 hover:text-blue-700">
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={role === 'super-admin' && isVerifying}
        >
          {role === 'super-admin'
            ? isVerifying
              ? 'Verifying credentials...'
              : 'Enter Super Admin Portal'
            : 'Access School Dashboard'}
        </Button>

        <div className="rounded-xl bg-blue-50 p-3 text-xs text-blue-800 space-y-3">
          <div className="flex items-start gap-2">
            <Building2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <p>
              Need help onboarding a new tenant?{' '}
              <span className="font-semibold">Contact the Scholix partnerships team</span> to fast-track deployment.
            </p>
          </div>
          <CreateSuperAdminAccountDialog
            existingAccount={
              storedAccount
                ? {
                    fullName: storedAccount.fullName,
                    organization: storedAccount.organization,
                    email: storedAccount.email,
                  }
                : null
            }
            onAccountCreated={handleAccountCreated}
          />
        </div>
      </form>
    </div>
  )
}
