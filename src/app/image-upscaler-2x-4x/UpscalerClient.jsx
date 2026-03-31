'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { FeedbackWidget, sendFeedback } from '@/components/FeedbackWidget'

const API_BASE = 'https://satisfied-growth-production-5050.up.railway.app'
const POLL_MS = 2500
const MAX_FILE_SIZE = 10 * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const ERROR_MESSAGES = {
  FREE_PROCESSING_PAUSED: 'Service is paused for maintenance. Please try again later.',
  DAILY_LIMIT_REACHED: 'Daily limit reached. Please try again tomorrow.',
  RATE_LIMITED: 'Too many requests. Please wait an hour and try again.',
  CONCURRENT_TASK: 'You already have an image processing. Please wait for it to finish.',
  MONTHLY_LIMIT_REACHED: 'Monthly limit of 50 upscales reached.',
  INVALID_FACTOR: 'Invalid scale factor. Must be 2 or 4.',
  INVALID_IMAGE_TYPE: 'Unsupported image type. Please upload a JPEG, PNG, or WebP.',
  INVALID_OUTPUT_FORMAT: 'Invalid output format. Choose PNG, JPG, or WEBP.',
  INVALID_OUTPUT_QUALITY: 'Invalid quality value. Must be between 20 and 99.',
}

const PROCESS_STEPS = [
  { label: 'Uploading image', icon: '📤' },
  { label: 'In queue — starting shortly', icon: '⏳' },
  { label: 'Upscaling image', icon: '✨' },
  { label: 'Enhancing resolution', icon: '🔍' },
  { label: 'Finalising output', icon: '✅' },
]

const PHASE_DONE_COUNT = { uploading: 0, processing: 2 }
const PHASE_HEADLINE = {
  uploading: 'Uploading your image…',
  processing: 'AI is upscaling your image…',
}

// ── Processing view ───────────────────────────────────────────────────────────

function ProcessingView({ phase, previewUrl }) {
  const doneCount = PHASE_DONE_COUNT[phase] ?? 0
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
      {/* Uploaded image with shimmer */}
      {previewUrl && (
        <div className="relative inline-flex w-full max-w-xs justify-center">
          <div
            className="relative overflow-hidden rounded-xl border border-slate-200 shadow-sm"
            style={{ maxWidth: '220px' }}
          >
            <img src={previewUrl} alt="" className="block h-auto w-full rounded-xl" />
            {/* Shimmer overlay */}
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                background:
                  'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.32) 50%, transparent 65%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.8s 0s infinite linear',
              }}
            />
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
                  className="inline-block h-1.5 w-1.5 rounded-full bg-red-400"
                  style={{ animation: 'pulse 1s infinite' }}
                />
                AI is upscaling…
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Spinner */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-red-100 opacity-60" />
        <div className="absolute inset-2 animate-spin rounded-full border-4 border-red-200 border-t-red-500" />
        <span className="relative text-2xl">✨</span>
      </div>

      {/* Headline */}
      <div className="text-center">
        <p className="font-display text-xl text-slate-900">
          {PHASE_HEADLINE[phase] ?? 'Processing…'}
        </p>
        <p className="mt-1 text-sm text-slate-500">Usually takes 15–60 seconds</p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm">
        <div className="mb-1.5 flex justify-between text-xs text-slate-400">
          <span>Processing</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-linear-to-r from-red-400 to-red-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step tracker */}
      <div className="w-full max-w-xs space-y-2.5">
        {PROCESS_STEPS.map(({ label, icon }, i) => {
          const done = i < doneCount
          const active = i === activeIndex
          return (
            <div
              key={label}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-colors ${active ? 'bg-red-50' : ''}`}
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
                      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-red-400"
                      style={{ animationDelay: `${d * 150}ms` }}
                    />
                  ))}
                </span>
              )}
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function UpscalerClient() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [status, setStatus] = useState('idle')
  const [factor, setFactor] = useState('2x')
  const [quality, setQuality] = useState(90)
  const [outputFormat, setOutputFormat] = useState('PNG')
  const [resultUrl, setResultUrl] = useState(null)
  const [taskId, setTaskId] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)

  const pollRef = useRef(null)
  const fileInputRef = useRef(null)

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [])

  useEffect(() => () => stopPolling(), [stopPolling])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  useEffect(() => {
    const handler = (e) => {
      if (status === 'uploading' || status === 'processing') {
        e.preventDefault()
        e.returnValue = 'Your image is still being upscaled. Sure you want to leave?'
        return e.returnValue
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [status])

  const pollTask = useCallback(
    async (id) => {
      try {
        const res = await fetch(`${API_BASE}/v1/upscale-tasks/${id}`)
        if (!res.ok) return
        const data = await res.json()
        if (data.status === 'done') {
          stopPolling()
          setResultUrl(data.result_url)
          setStatus('done')
        } else if (data.status === 'failed') {
          stopPolling()
          const code = data.error
          setErrorMsg(ERROR_MESSAGES[code] || code || 'Upscaling failed. Please try again.')
          setStatus('error')
        } else if (data.status === 'queued' || data.status === 'pending' || data.status === 'processing') {
          setStatus('processing')
        }
      } catch {
        // transient network error — keep polling
      }
    },
    [stopPolling],
  )

  const handleFileSelect = useCallback((incoming) => {
    const f = Array.from(incoming).find(
      (f) => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE,
    )
    if (!f) return
    setFile(f)
    const url = URL.createObjectURL(f)
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return url
    })
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragOver(false)
      handleFileSelect(e.dataTransfer.files)
    },
    [handleFileSelect],
  )

  const removeFile = useCallback(() => {
    setFile(null)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
  }, [previewUrl])

  const handleUpscale = async () => {
    if (!file) return

    setStatus('uploading')
    setErrorMsg('')

    const fd = new FormData()
    fd.append('image', file)
    fd.append('factor', factor === '2x' ? '2' : '4')
    fd.append('outputFormat', outputFormat)
    fd.append('outputQuality', String(Math.max(20, Math.min(99, quality))))

    try {
      const res = await fetch(`${API_BASE}/v1/upscale`, {
        method: 'POST',
        body: fd,
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        const code = err.error || err.code
        throw new Error(ERROR_MESSAGES[code] || err.message || `Server error ${res.status}`)
      }

      const data = await res.json()
      const id = data.task_id
      if (!id) throw new Error('No task ID returned from server.')

      setTaskId(id)
      setStatus('processing')
      pollRef.current = setInterval(() => pollTask(id), POLL_MS)
    } catch (err) {
      setErrorMsg(err.message || 'Upload failed. Please try again.')
      setStatus('error')
    }
  }

  const handleReset = () => {
    stopPolling()
    setFile(null)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setStatus('idle')
    setResultUrl(null)
    setTaskId(null)
    setErrorMsg('')
  }

  const handleDownload = async () => {
    try {
      const res = await fetch(resultUrl)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const ext = outputFormat.toLowerCase()
      const a = document.createElement('a')
      a.href = url
      a.download = `renderly-upscaled-${factor}.${ext}`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      sendFeedback({ feature: `upscale_${factor}`, task_id: taskId, downloaded: true })
    } catch (e) {
      console.error('Download failed', e)
    }
  }

  const isProcessing = status === 'uploading' || status === 'processing'

  return (
    <div className="mx-auto max-w-xl">
      {/* ── IDLE: upload form ──────────────────────────────────────────────── */}
      {status === 'idle' && (
        <div className="space-y-5">
          {/* Factor toggle */}
          <div className="flex gap-3">
            {['2x', '4x'].map((f) => (
              <button
                key={f}
                onClick={() => setFactor(f)}
                className={`flex-1 rounded-full border-2 py-3 text-base font-semibold transition ${
                  factor === f
                    ? 'border-red-600 bg-red-600 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                {f === '2x' ? '2× Upscale' : '4× Upscale'}
              </button>
            ))}
          </div>

          {/* Drop zone */}
          <div
            className={`cursor-pointer rounded-3xl border-2 border-dashed p-6 transition-colors sm:p-10 ${
              isDragOver
                ? 'border-red-400 bg-red-50'
                : 'border-slate-200 bg-slate-50 hover:border-slate-300'
            }`}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragOver(true)
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />

            {!file ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 16 12 12 8 16" />
                    <line x1="12" y1="12" x2="12" y2="21" />
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-slate-900">Drag & drop your image here</p>
                  <p className="mt-1 text-sm text-slate-500">
                    or click to browse · JPEG, PNG, WEBP · max 10MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="relative" style={{ maxWidth: '200px' }}>
                  <img
                    src={previewUrl}
                    alt="Your image"
                    className="h-auto w-full rounded-xl border border-slate-200 object-cover shadow"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile()
                    }}
                    className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/70 text-xs text-white hover:bg-slate-900"
                  >
                    ✕
                  </button>
                </div>
                <p className="max-w-[200px] truncate text-xs text-slate-500">{file.name}</p>
              </div>
            )}
          </div>

          {/* Settings row */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Output format */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Output Format
              </p>
              <div className="flex gap-2">
                {['PNG', 'JPG', 'WEBP'].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setOutputFormat(fmt)}
                    className={`flex-1 rounded-lg border py-1.5 text-xs font-semibold transition ${
                      outputFormat === fmt
                        ? 'border-red-300 bg-red-50 text-red-700'
                        : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality slider */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Quality: {quality}%
              </p>
              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-red-600"
              />
              <div className="mt-1 flex justify-between text-xs text-slate-400">
                <span>Smaller file</span>
                <span>Best quality</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3 pt-1">
            <button
              onClick={handleUpscale}
              disabled={!file}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 active:bg-red-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ✨ Upscale Image
            </button>
            <p className="text-center text-xs text-slate-400">Free · No account needed</p>
          </div>
        </div>
      )}

      {/* ── PROCESSING ──────────────────────────────────────────────────── */}
      {isProcessing && <ProcessingView phase={status} previewUrl={previewUrl} />}

      {/* ── ERROR ───────────────────────────────────────────────────────── */}
      {status === 'error' && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="font-semibold text-red-700">Something went wrong</p>
          <p className="mt-1 text-sm text-red-600">{errorMsg}</p>
          <button
            onClick={handleReset}
            className="mt-5 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* ── DONE ────────────────────────────────────────────────────────── */}
      {status === 'done' && resultUrl && (
        <div className="space-y-8">
          {/* Result image */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <img src={resultUrl} alt="Upscaled image" className="w-full" />
          </div>

          {/* Info bar */}
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            Upscaled {factor} · {outputFormat} · AI enhanced
          </div>

          {/* Download */}
          <div className="text-center">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Upscaled Image
            </button>
          </div>

          <FeedbackWidget feature={`upscale_${factor}`} taskId={taskId} />

          {/* Try another */}
          <div className="text-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Try Another
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
