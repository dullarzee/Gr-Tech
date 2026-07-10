'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // This would call your backend API
      // await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email })
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Reset Password</h1>
          <p className="text-zinc-400">
            {submitted ? 'Check your email for instructions' : 'We&apos;ll send you a link to reset your password'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-2xl p-8 backdrop-blur-md">
          {submitted ? (
            <div className="space-y-6">
              {/* Success Message */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
              </div>

              <div className="text-center space-y-3">
                <p className="text-zinc-300">
                  We&apos;ve sent a password reset link to:
                </p>
                <p className="font-semibold text-amber-400 break-all">{email}</p>
                <p className="text-sm text-zinc-400">
                  Click the link in the email to reset your password. If you don&apos;t see it, check your spam folder.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setSubmitted(false)
                    setEmail('')
                  }}
                  className="w-full bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold py-3 rounded-lg"
                >
                  Try Another Email
                </Button>
                <Link href="/auth/login" className="block">
                  <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-lg">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-amber-400/60" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-zinc-700/50 rounded-lg focus:border-amber-400/50 focus:outline-none transition-colors text-white placeholder-zinc-500"
                    required
                  />
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                  Enter the email address associated with your account
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </Button>
            </form>
          )}

          {/* Divider */}
          {!submitted && (
            <>
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-zinc-700/30"></div>
                <span className="text-xs text-zinc-500">or</span>
                <div className="flex-1 h-px bg-zinc-700/30"></div>
              </div>

              {/* Back to Sign In */}
              <p className="text-center text-sm text-zinc-400">
                Remember your password?{' '}
                <Link href="/auth/login" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>

        {/* Help Text */}
        {!submitted && (
          <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm text-blue-300">
              💡 <strong>Tip:</strong> You can also contact our support team if you need help recovering your account.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
