'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

const API_BASE = 'https://satisfied-growth-production-5050.up.railway.app'
const POLL_MS = 2500
const MAX_FILE_SIZE = 10 * 1024 * 1024

const CHECKER = {
  backgroundImage:
    'repeating-conic-gradient(#e2e8f0 0% 25%, #f8fafc 0% 50%)',
  backgroundSize: '14px 14px',
}

const TOOL_CONFIG = {
  'remove-background': {
    emoji: '✂️',
    dotCls: 'bg-violet-400',
    pingCls: 'bg-violet-100',
    ringCls: 'border-violet-200 border-t-violet-500',
    activeCls: 'bg-violet-50',
    bounceCls: 'bg-violet-400',
    progressFrom: 'from-violet-400',
    progressTo: 'to-violet-600',
    badge: 'AI is removing background…',
    phaseHeadline: {
      uploading: 'Uploading your image…',
      processing: 'AI is removing the background…',
    },
    steps: [
      { label: 'Uploading image', icon: '📤' },
      { label: 'In queue — starting shortly', icon: '⏳' },
      { label: 'Removing background', icon: '✂️' },
      { label: 'Generating transparent PNG', icon: '🖼️' },
      { label: 'Finalising output', icon: '✅' },
    ],
  },
  'make-image-transparent': {
    emoji: '✨',
    dotCls: 'bg-teal-400',
    pingCls: 'bg-teal-100',
    ringCls: 'border-teal-200 border-t-teal-500',
    activeCls: 'bg-teal-50',
    bounceCls: 'bg-teal-400',
    progressFrom: 'from-teal-400',
    progressTo: 'to-teal-600',
    badge: 'Making image transparent…',
    phaseHeadline: {
      uploading: 'Uploading your image…',
      processing: 'AI is making image transparent…',
    },
    steps: [
      { label: 'Uploading image', icon: '📤' },
      { label: 'In queue — starting shortly', icon: '⏳' },
      { label: 'Making image transparent', icon: '✨' },
      { label: 'Exporting transparent PNG', icon: '📥' },
      { label: 'Finalising output', icon: '✅' },
    ],
  },
  'remove-logo-background': {
    emoji: '🎯',
    dotCls: 'bg-orange-400',
    pingCls: 'bg-orange-100',
    ringCls: 'border-orange-200 border-t-orange-500',
    activeCls: 'bg-orange-50',
    bounceCls: 'bg-orange-400',
    progressFrom: 'from-orange-400',
    progressTo: 'to-orange-600',
    badge: 'Removing logo background…',
    phaseHeadline: {
      uploading: 'Uploading your logo…',
      processing: 'AI is removing the logo background…',
    },
    steps: [
      { label: 'Uploading logo', icon: '📤' },
      { label: 'In queue — starting shortly', icon: '⏳' },
      { label: 'Removing logo background', icon: '✂️' },
      { label: 'Exporting transparent PNG', icon: '📥' },
      { label: 'Finalising output', icon: '✅' },
    ],
  },
  'signature-background-remover': {
    emoji: '✍️',
    dotCls: 'bg-slate-500',
    pingCls: 'bg-slate-200',
    ringCls: 'border-slate-200 border-t-slate-600',
    activeCls: 'bg-slate-100',
    bounceCls: 'bg-slate-500',
    progressFrom: 'from-slate-400',
    progressTo: 'to-slate-600',
    badge: 'Extracting signature…',
    phaseHeadline: {
      uploading: 'Uploading your signature…',
      processing: 'AI is extracting your signature…',
    },
    steps: [
      { label: 'Uploading signature', icon: '📤' },
      { label: 'In queue — starting shortly', icon: '⏳' },
      { label: 'Extracting signature', icon: '✍️' },
      { label: 'Exporting transparent PNG', icon: '📥' },
      { label: 'Finalising output', icon: '✅' },
    ],
  },
}

function ShimmerOverlay() {
  return (
    <div
      className="absolute inset-0 rounded-xl"
      style={{
        background:
          'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.32) 50%, transparent 65%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.8s 0s infinite linear',
      }}
    />
  )
}

function ProcessingView({ phase, previewUrl, config }) {
  const doneCount = phase === 'uploading' ? 0 : 2
  const activeIndex = doneCount

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const DURATION = 60000
    const MAX_PROGRESS = 92
    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(MAX_PROGRESS, (elapsed / DURATION) * MAX_PROGRESS)
      setProgress(p)
      if (p < MAX_PROGRESS) requestAnimationFrame(tick)
    }
    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="flex flex-col items-center gap-8 py-10">
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>

      {/* Uploaded photo with shimmer */}
      {previewUrl && (
        <div className="relative inline-flex w-full max-w-xs justify-center">
          <div
            className="relative overflow-hidden rounded-xl border border-slate-200 shadow-sm"
            style={{ maxWidth: '220px' }}
          >
            <img
              src={previewUrl}
              alt=""
              className="block h-auto w-full rounded-xl"
            />
            <ShimmerOverlay />
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.02) 60%, rgba(0,0,0,0.32) 100%)',
              }}
            />
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${config.dotCls}`}
                  style={{ animation: 'pulse 1s infinite' }}
                />
                {config.badge}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Spinner */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div
          className={`absolute inset-0 animate-ping rounded-full ${config.pingCls} opacity-60`}
        />
        <div
          className={`absolute inset-2 animate-spin rounded-full border-4 ${config.ringCls}`}
        />
        <span className="relative text-2xl">{config.emoji}</span>
      </div>

      {/* Headline */}
      <div className="text-center">
        <p className="font-display text-xl text-slate-900">
          {config.phaseHeadline[phase] ?? 'Processing…'}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Usually takes 15–60 seconds
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm">
        <div className="mb-1.5 flex justify-between text-xs text-slate-400">
          <span>Processing</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full bg-linear-to-r ${config.progressFrom} ${config.progressTo} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step tracker */}
      <div className="w-full max-w-xs space-y-2.5">
        {config.steps.map(({ label, icon }, i) => {
          const done = i < doneCount
          const active = i === activeIndex
          return (
            <div
              key={label}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-colors ${active ? config.activeCls : ''}`}
            >
              <span className="text-base leading-none">
                {done ? '✅' : active ? icon : '⬜'}
              </span>
              <span
                className={`text-sm ${
                  done
                    ? 'text-slate-400 line-through'
                    : active
                      ? 'font-semibold text-slate-900'
                      : 'text-slate-400'
                }`}
              >
                {label}
              </span>
              {active && (
                <span className="ml-auto flex gap-0.5">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className={`inline-block h-1.5 w-1.5 animate-bounce rounded-full ${config.bounceCls}`}
                      style={{ animationDelay: `${d * 150}ms` }}
                    />
                  ))}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function BgRemoverTool({ tool, buttonLabel = 'Remove Background' }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [status, setStatus] = useState('idle')
  const [resultUrl, setResultUrl] = useState(null)
  const [error, setError] = useState(null)
  const pollRef = useRef(null)

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [])

  useEffect(() => () => stopPolling(), [stopPolling])

  const handleFile = useCallback(
    (f) => {
      if (!f) return
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) {
        setError('Please upload a JPG, PNG, or WebP image.')
        return
      }
      if (f.size > MAX_FILE_SIZE) {
        setError('File must be under 10MB.')
        return
      }
      setFile(f)
      setPreview(URL.createObjectURL(f))
      setError(null)
      setStatus('idle')
      setResultUrl(null)
    },
    [],
  )

  const submit = async () => {
    if (!file) return
    setStatus('uploading')
    setError(null)
    try {
      const form = new FormData()
      form.append('image', file)
      form.append('tool', tool)
      const res = await fetch(`${API_BASE}/v1/bg-remover`, {
        method: 'POST',
        body: form,
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Upload failed (${res.status})`)
      }
      const { task_id } = await res.json()
      setStatus('processing')
      pollRef.current = setInterval(async () => {
        try {
          const poll = await fetch(
            `${API_BASE}/v1/bg-remover-tasks/${task_id}`,
          )
          const data = await poll.json()
          if (data.status === 'done') {
            stopPolling()
            setResultUrl(data.result_url)
            setStatus('done')
          } else if (data.status === 'failed') {
            stopPolling()
            setError(data.error || 'Processing failed. Please try again.')
            setStatus('error')
          }
        } catch {}
      }, POLL_MS)
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  const reset = () => {
    stopPolling()
    setFile(null)
    setPreview(null)
    setStatus('idle')
    setResultUrl(null)
    setError(null)
  }

  const download = async () => {
    try {
      const blob = await fetch(resultUrl).then((r) => r.blob())
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `renderly-${tool}.png`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      window.open(resultUrl, '_blank')
    }
  }

  if (status === 'done' && resultUrl) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          <div className="grid grid-cols-2 divide-x divide-slate-100">
            <div className="p-5 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Original
              </p>
              <img
                src={preview}
                alt="Original"
                className="mx-auto max-h-56 w-full rounded-lg object-contain"
              />
            </div>
            <div className="p-5 text-center" style={CHECKER}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Result
              </p>
              <img
                src={resultUrl}
                alt="Result"
                className="mx-auto max-h-56 w-full rounded-lg object-contain"
              />
            </div>
          </div>
          <div className="flex justify-center gap-3 border-t border-slate-100 p-4">
            <button
              onClick={download}
              className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              Download PNG
            </button>
            <button
              onClick={reset}
              className="rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Try Another
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'processing' || status === 'uploading') {
    const config = TOOL_CONFIG[tool] ?? TOOL_CONFIG['remove-background']
    return (
      <div className="mx-auto max-w-sm">
        <ProcessingView phase={status} previewUrl={preview} config={config} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md">
      <div
        onDrop={(e) => {
          e.preventDefault()
          handleFile(e.dataTransfer.files[0])
        }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById(`bgr-${tool}`).click()}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center transition hover:border-red-400 hover:bg-red-50/30"
      >
        <input
          id={`bgr-${tool}`}
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        {preview ? (
          <div className="space-y-3">
            <img
              src={preview}
              alt="Preview"
              className="mx-auto max-h-44 rounded-xl object-contain shadow-sm"
            />
            <p className="text-sm text-slate-500">{file?.name}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 16 12 12 8 16" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
            </div>
            <p className="font-semibold text-slate-700">
              Drop your image here or click to upload
            </p>
            <p className="text-sm text-slate-400">JPG, PNG, WebP · Max 10MB</p>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-3 text-center text-sm text-red-600">{error}</p>
      )}
      <button
        onClick={submit}
        disabled={!file}
        className="mt-4 w-full rounded-full bg-red-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {buttonLabel}
      </button>
      <p className="mt-2 text-center text-xs text-slate-400">
        Free · No sign-up required
      </p>
    </div>
  )
}
