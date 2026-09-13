import React, { useState, useEffect } from 'react'
import { ShieldAlert, KeyRound, ArrowRight, Lock, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react'

interface SecretGateProps {
  children: React.ReactNode
}

const MASTER_SECRET_CODE = 'ADMIN9988'
const STORAGE_KEY = 'nexwhat_master_unlocked'

export const SecretGate: React.FC<SecretGateProps> = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false)
  const [passcode, setPasscode] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState<boolean>(false)
  const [successAnim, setSuccessAnim] = useState<boolean>(false)

  useEffect(() => {
    // Check if previously unlocked in this browser session
    const unlocked = sessionStorage.getItem(STORAGE_KEY) === 'true'
    if (unlocked) {
      setIsUnlocked(true)
      return
    }

    // Check if query parameter code is provided (e.g. /master-portal?code=ADMIN9988)
    const params = new URLSearchParams(window.location.search)
    const codeParam = params.get('code')
    if (codeParam && codeParam.trim().toUpperCase() === MASTER_SECRET_CODE) {
      sessionStorage.setItem(STORAGE_KEY, 'true')
      setIsUnlocked(true)
      // Clean up the URL query parameter
      const cleanUrl = window.location.pathname
      window.history.replaceState({}, document.title, cleanUrl)
    }
  }, [])

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsVerifying(true)

    setTimeout(() => {
      if (passcode.trim().toUpperCase() === MASTER_SECRET_CODE) {
        setSuccessAnim(true)
        setTimeout(() => {
          sessionStorage.setItem(STORAGE_KEY, 'true')
          setIsUnlocked(true)
          setIsVerifying(false)
        }, 600)
      } else {
        setIsVerifying(false)
        setError('ACCESS DENIED: Invalid Master Security Code')
        setPasscode('')
      }
    }, 400)
  }

  if (isUnlocked) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#050608] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden select-none font-sans">
      {/* Dynamic Background Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Security Header */}
        <div className="text-center mb-6">
          <div className="relative inline-flex items-center justify-center h-20 w-20 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/25 border border-emerald-500/40 mb-4 p-0.5 bg-gradient-to-tr from-emerald-500/40 via-teal-400/30 to-cyan-400/40 group">
            <img 
              src="/logo.jpg" 
              alt="NexWhat Luxury Logo" 
              className="h-full w-full object-cover rounded-[22px] transform transition-transform duration-500 group-hover:scale-110" 
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-semibold tracking-wider uppercase mb-2">
            <Lock className="h-3 w-3" />
            Classified Master Portal
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            NexWhat Security Perimeter
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            Authorized Personnel Only. Enter the confidential access code to initialize Master Admin session.
          </p>
        </div>

        {/* Security Card */}
        <div className="relative rounded-3xl bg-[#090c13]/90 border border-white/[0.08] p-7 shadow-2xl backdrop-blur-xl">
          {/* Subtle perimeter neon highlight */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2.5 animate-bounce">
              <ShieldAlert className="h-4 w-4 shrink-0 text-rose-400" />
              <span className="font-mono text-[11px] font-semibold">{error}</span>
            </div>
          )}

          {successAnim && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 animate-spin" />
              <span className="font-mono text-[11px] font-semibold">ACCESS GRANTED • DECRYPTING SESSION...</span>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <KeyRound className="h-3.5 w-3.5 text-emerald-400" />
                  Master Access Code
                </label>
                <span className="text-[10px] font-mono text-slate-400">RESTRICTED</span>
              </div>

              <div className="relative">
                <input
                  type="password"
                  autoFocus
                  required
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value)
                    if (error) setError(null)
                  }}
                  placeholder="Enter secret code..."
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-2xl text-sm font-mono text-emerald-400 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 focus:bg-emerald-500/[0.02] tracking-widest transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isVerifying || !passcode.trim()}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Unlock Master Portal</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Security footnote */}
          <div className="mt-5 pt-4 border-t border-white/[0.05] text-center">
            <span className="text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3 text-emerald-400" />
              256-Bit Hardware Encrypted Gateway
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
