'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const API_BASE = 'https://satisfied-growth-production-5050.up.railway.app'
const POLL_MS = 2500
const MAX_FILE_SIZE = 10 * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const COUNTRIES = [
  { value: 'us', label: 'United States', flag: '🇺🇸', size: '2×2 in (51×51mm)' },
  { value: 'india', label: 'India', flag: '🇮🇳', size: '35×45mm' },
  { value: 'uk', label: 'United Kingdom', flag: '🇬🇧', size: '35×45mm' },
  { value: 'germany', label: 'Germany', flag: '🇩🇪', size: '35×45mm' },
  { value: 'france', label: 'France', flag: '🇫🇷', size: '35×45mm' },
  { value: 'australia', label: 'Australia', flag: '🇦🇺', size: '35×45mm' },
  { value: 'canada', label: 'Canada', flag: '🇨🇦', size: '50×70mm' },
  { value: 'china', label: 'China', flag: '🇨🇳', size: '33×48mm' },
  { value: 'singapore', label: 'Singapore', flag: '🇸🇬', size: '35×45mm' },
  { value: 'russia', label: 'Russia', flag: '🇷🇺', size: '35×45mm' },
  { value: 'south_africa', label: 'South Africa', flag: '🇿🇦', size: '35×45mm' },
  { value: 'middle_east', label: 'Middle East', flag: '🌍', size: '40×60mm' },
  { value: 'greece', label: 'Greece', flag: '🇬🇷', size: '40×60mm' },
  { value: 'hong_kong', label: 'Hong Kong', flag: '🇭🇰', size: '40×50mm' },
  { value: 'europe', label: 'Europe (Schengen)', flag: '🇪🇺', size: '35×45mm' },
]

const PASSPORT_TIPS = [
  { emoji: '👁️', tip: 'Look directly at the camera with your eyes fully open — no squinting.' },
  { emoji: '😐', tip: 'Keep a neutral expression. Most countries no longer accept smiling photos.' },
  { emoji: '💡', tip: 'Even lighting matters most. Face the light source — shadows on your face cause rejections.' },
  { emoji: '🔲', tip: 'A plain white or off-white wall makes the best background. Patterned backgrounds get rejected.' },
  { emoji: '👓', tip: 'No glasses — most countries banned them in passport photos since 2018.' },
  { emoji: '🎩', tip: 'Remove hats and head coverings (exceptions apply for religious reasons).' },
  { emoji: '📐', tip: 'Your face should fill 70–80% of the frame from chin to crown.' },
  { emoji: '📱', tip: 'A good phone camera in natural daylight is enough — no studio needed.' },
]

const PROCESS_STEPS = [
  { label: 'Uploading photo', icon: '📤' },
  { label: 'In queue — starting shortly', icon: '⏳' },
  { label: 'Removing background', icon: '✂️' },
  { label: 'Generating passport photo', icon: '🪪' },
  { label: 'Finalising output', icon: '✅' },
]

const PHASE_DONE_COUNT = { uploading: 1, queued: 1, processing: 2 }
const PHASE_HEADLINE = {
  uploading: 'Uploading your photo…',
  queued: 'In queue — AI will start shortly…',
  processing: 'AI is generating your passport photo…',
}

// ── Sheet generation ──────────────────────────────────────────────────────────

const SHEET_LAYOUTS = [
  {
    id: 'a4',
    label: 'A4 Sheet',
    copies: '8 copies',
    grid: '2 × 4',
    desc: 'Standard A4 print sheet',
    cols: 2,
    rows: 4,
    canvasW: 2480,
    canvasH: 3508,
    margin: 120,
    gap: 60,
  },
  {
    id: '4x6',
    label: '4×6 Print Sheet',
    copies: '4 copies',
    grid: '2 × 2',
    desc: 'Standard 4×6 inch print',
    cols: 2,
    rows: 2,
    canvasW: 1800,
    canvasH: 1200,
    margin: 80,
    gap: 40,
  },
]

function drawImageContain(ctx, img, x, y, w, h) {
  const scale = Math.min(w / img.naturalWidth, h / img.naturalHeight)
  const sw = img.naturalWidth * scale
  const sh = img.naturalHeight * scale
  const ox = x + (w - sw) / 2
  const oy = y + (h - sh) / 2
  ctx.drawImage(img, ox, oy, sw, sh)
}

async function downloadSheet(resultUrl, layout) {
  const response = await fetch(resultUrl)
  const blob = await response.blob()
  const blobUrl = URL.createObjectURL(blob)

  const img = new Image()
  img.src = blobUrl
  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
  })

  const { cols, rows, canvasW, canvasH, margin, gap } = layout
  const canvas = document.createElement('canvas')
  canvas.width = canvasW
  canvas.height = canvasH
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvasW, canvasH)

  const cellW = (canvasW - 2 * margin - (cols - 1) * gap) / cols
  const cellH = (canvasH - 2 * margin - (rows - 1) * gap) / rows

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = margin + col * (cellW + gap)
      const y = margin + row * (cellH + gap)

      // Light grey cell background
      ctx.fillStyle = '#f8f8f8'
      ctx.fillRect(x, y, cellW, cellH)

      drawImageContain(ctx, img, x, y, cellW, cellH)

      // Cut guide border
      ctx.strokeStyle = '#dddddd'
      ctx.lineWidth = 2
      ctx.setLineDash([8, 6])
      ctx.strokeRect(x, y, cellW, cellH)
      ctx.setLineDash([])
    }
  }

  URL.revokeObjectURL(blobUrl)

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (outBlob) => {
        if (!outBlob) { reject(new Error('Canvas export failed')); return }
        const url = URL.createObjectURL(outBlob)
        const a = document.createElement('a')
        a.href = url
        a.download = `passport-photo-sheet-${layout.id}.png`
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
        resolve()
      },
      'image/png',
    )
  })
}

// ── Shimmer animation ─────────────────────────────────────────────────────────

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

// ── Processing view ───────────────────────────────────────────────────────────

function ProcessingView({ phase, previewUrl }) {
  const doneCount = PHASE_DONE_COUNT[phase] ?? 1
  const activeIndex = doneCount

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const DURATION = 90000
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

  const [tipIndex, setTipIndex] = useState(0)
  const [tipVisible, setTipVisible] = useState(true)
  useEffect(() => {
    const interval = setInterval(() => {
      setTipVisible(false)
      setTimeout(() => {
        setTipIndex((i) => (i + 1) % PASSPORT_TIPS.length)
        setTipVisible(true)
      }, 400)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const tip = PASSPORT_TIPS[tipIndex]

  return (
    <div className="flex flex-col items-center gap-8 py-10">
      {/* Uploaded photo with shimmer */}
      {previewUrl && (
        <div className="relative inline-flex w-full max-w-xs justify-center">
          <div className="relative overflow-hidden rounded-xl border border-slate-200 shadow-sm" style={{ maxWidth: '220px' }}>
            <img src={previewUrl} alt="" className="block h-auto w-full rounded-xl" />
            <ShimmerOverlay />
            <div
              className="absolute inset-0 rounded-xl"
              style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.02) 60%, rgba(0,0,0,0.32) 100%)' }}
            />
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400" style={{ animation: 'pulse 1s infinite' }} />
                AI is processing…
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Spinner */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-blue-100 opacity-60" />
        <div className="absolute inset-2 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500" />
        <span className="relative text-2xl">🪪</span>
      </div>

      {/* Headline */}
      <div className="text-center">
        <p className="font-display text-xl text-slate-900">
          {PHASE_HEADLINE[phase] ?? 'Processing…'}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Usually takes 30–90 seconds — removing background and generating your photo
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
            className="h-full rounded-full bg-linear-to-r from-blue-400 to-blue-600 transition-all duration-500"
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
              className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-colors ${active ? 'bg-blue-50' : ''}`}
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
                      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400"
                      style={{ animationDelay: `${d * 150}ms` }}
                    />
                  ))}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Rotating tips */}
      <div
        className="w-full max-w-sm rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-opacity duration-300"
        style={{ opacity: tipVisible ? 1 : 0 }}
      >
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Passport photo tip
        </p>
        <p className="text-sm leading-relaxed text-slate-700">
          <span className="mr-1.5 text-base">{tip.emoji}</span>
          {tip.tip}
        </p>
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

// ── Result + sheet download ───────────────────────────────────────────────────

function ResultView({ resultUrl, onReset }) {
  const [downloading, setDownloading] = useState(null)

  const handleDownloadPhoto = async () => {
    try {
      const res = await fetch(resultUrl)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'passport-photo.png'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error('Download failed', e)
    }
  }

  const handleDownloadSheet = async (layout) => {
    setDownloading(layout.id)
    try {
      await downloadSheet(resultUrl, layout)
    } catch (e) {
      console.error('Sheet generation failed', e)
    } finally {
      setDownloading(null)
    }
  }

  return (
    <div className="space-y-8">
      {/* Result photo */}
      <div className="mx-auto max-w-xs overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <img src={resultUrl} alt="AI-generated passport photo" className="w-full" />
      </div>

      {/* Single photo download */}
      <div className="text-center">
        <button
          onClick={handleDownloadPhoto}
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Passport Photo
        </button>
        <p className="mt-2 text-xs text-slate-400">Biometric · White background · Country-compliant</p>
      </div>

      {/* Sheet section */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="mb-4 text-center">
          <p className="font-semibold text-slate-900">Want a print sheet?</p>
          <p className="mt-1 text-sm text-slate-500">
            Generate a ready-to-print sheet with multiple copies of your passport photo.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {SHEET_LAYOUTS.map((layout) => (
            <button
              key={layout.id}
              onClick={() => handleDownloadSheet(layout)}
              disabled={downloading === layout.id}
              className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-center transition hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {/* Mini sheet preview */}
              <div
                className="flex flex-col gap-0.5 rounded-sm border border-slate-200 bg-white p-1.5 shadow-sm"
                style={{ width: layout.id === 'a4' ? '36px' : '44px', aspectRatio: layout.id === 'a4' ? '1/1.414' : '1.5/1' }}
              >
                {Array.from({ length: layout.rows }).map((_, r) => (
                  <div key={r} className="flex flex-1 gap-0.5">
                    {Array.from({ length: layout.cols }).map((_, c) => (
                      <div key={c} className="flex-1 rounded-sm bg-slate-200" />
                    ))}
                  </div>
                ))}
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">{layout.label}</p>
                <p className="text-xs text-slate-500">{layout.copies} · {layout.grid} grid</p>
              </div>

              {downloading === layout.id ? (
                <span className="text-xs text-blue-600">Generating…</span>
              ) : (
                <span className="text-xs font-medium text-blue-600">Download PNG →</span>
              )}
            </button>
          ))}
        </div>

        <p className="mt-3 text-center text-xs text-slate-400">
          Cut guides included · Print at any photo lab or at home
        </p>
      </div>

      {/* Make another */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Make Another Photo
        </button>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function PassportPageClient() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [country, setCountry] = useState('us')
  const [status, setStatus] = useState('idle')
  const [resultUrl, setResultUrl] = useState(null)
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

  // Revoke preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  useEffect(() => {
    const handler = (e) => {
      if (status === 'uploading' || status === 'queued' || status === 'processing') {
        e.preventDefault()
        e.returnValue = 'Your passport photo is still being generated. Sure you want to leave?'
        return e.returnValue
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [status])

  const pollTask = useCallback(
    async (id) => {
      try {
        const res = await fetch(`${API_BASE}/v1/passport-tasks/${id}`)
        if (!res.ok) return
        const data = await res.json()
        if (data.status === 'done') {
          stopPolling()
          setResultUrl(data.result_url)
          setStatus('done')
        } else if (data.status === 'failed') {
          stopPolling()
          setErrorMsg(data.error || 'Generation failed. Please try again.')
          setStatus('error')
        } else if (data.status === 'queued' || data.status === 'pending') {
          setStatus('queued')
        } else if (data.status === 'processing') {
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

  const handleGenerate = async () => {
    if (!file) return

    setStatus('uploading')
    setErrorMsg('')

    const fd = new FormData()
    fd.append('image', file)
    fd.append('country', country)

    try {
      const res = await fetch(`${API_BASE}/v1/passport`, {
        method: 'POST',
        body: fd,
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || err.error || `Server error ${res.status}`)
      }

      const data = await res.json()
      const id = data.task_id
      if (!id) throw new Error('No task ID returned from server.')

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
    setCountry('us')
    setStatus('idle')
    setResultUrl(null)
    setErrorMsg('')
  }

  const isProcessing = status === 'uploading' || status === 'queued' || status === 'processing'
  const selectedCountry = COUNTRIES.find((c) => c.value === country)

  return (
    <>
      <Header />
      <main className="flex-1 bg-white py-12 sm:py-20">
        <Container>
          {/* Page heading */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs text-blue-700">
              🪪 Free · No sign-up needed · 15 countries
            </span>
            <h1 className="mt-4 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
              Passport Size Photo Maker
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              Upload any photo and get a{' '}
              <span className="font-semibold text-slate-900">biometric passport photo</span> with
              a white background — ready to print or download.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-xl">
            {/* ── IDLE: upload form ─────────────────────────────────────────── */}
            {status === 'idle' && (
              <div className="space-y-5">
                {/* Drop zone */}
                <div
                  className={`cursor-pointer rounded-3xl border-2 border-dashed p-6 sm:p-10 transition-colors ${
                    isDragOver
                      ? 'border-blue-400 bg-blue-50'
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
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="16 16 12 12 8 16" />
                          <line x1="12" y1="12" x2="12" y2="21" />
                          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-slate-900">Drag & drop your photo here</p>
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
                          alt="Your photo"
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

                {/* Country selector */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Country / Passport type
                  </label>
                  <div className="relative">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.flag} {c.label} — {c.size}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  {selectedCountry && (
                    <p className="mt-1.5 text-xs text-slate-400">
                      {selectedCountry.flag} {selectedCountry.label} standard: {selectedCountry.size} · white background · biometric
                    </p>
                  )}
                </div>

                {/* Tips */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    For best results
                  </p>
                  <ul className="space-y-1.5 text-sm text-slate-600">
                    <li className="flex items-start gap-2"><span>👤</span> Face the camera directly with both eyes open</li>
                    <li className="flex items-start gap-2"><span>💡</span> Use even lighting — no harsh shadows</li>
                    <li className="flex items-start gap-2"><span>😐</span> Neutral expression, mouth closed</li>
                    <li className="flex items-start gap-2"><span>👓</span> Remove glasses if possible</li>
                  </ul>
                </div>

                {/* Generate CTA */}
                <div className="flex flex-col items-center gap-3 pt-1">
                  <button
                    onClick={handleGenerate}
                    disabled={!file}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:px-10"
                  >
                    🪪 Generate Passport Photo
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    Free · No account needed · Result in under 2 minutes
                  </p>
                </div>
              </div>
            )}

            {/* ── PROCESSING ──────────────────────────────────────────────── */}
            {isProcessing && <ProcessingView phase={status} previewUrl={previewUrl} />}

            {/* ── ERROR ───────────────────────────────────────────────────── */}
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

            {/* ── DONE ────────────────────────────────────────────────────── */}
            {status === 'done' && resultUrl && (
              <ResultView resultUrl={resultUrl} onReset={handleReset} />
            )}
          </div>

          {/* ── Below-fold: keyword-rich content block ───────────────────── */}
          {status === 'idle' && (
            <div className="mx-auto mt-24 max-w-2xl">
              <div className="space-y-10 text-sm leading-relaxed text-slate-600">
                <div>
                  <h2 className="mb-3 font-display text-xl text-slate-900">
                    Convert any picture to passport size — in seconds
                  </h2>
                  <p>
                    Most people need a passport photo once every few years and don&apos;t want to visit a
                    photo booth or pay for a full print session. This tool lets you convert any
                    clear front-facing photo into a properly sized, white-background biometric photo
                    — from your phone or computer, without any editing skills.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 font-display text-xl text-slate-900">
                    What counts as a valid passport photo
                  </h2>
                  <p>
                    Every country has slightly different requirements, but the core rules are shared:
                    plain white or off-white background, face directly facing the camera with eyes
                    open, neutral expression, no glasses, and correct photo dimensions. Our AI
                    handles the background removal and compositing automatically — you just need a
                    decent front-facing photo.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 font-display text-xl text-slate-900">
                    Print-ready A4 and 4×6 passport photo sheets
                  </h2>
                  <p>
                    Once your passport photo is generated, you can download a print sheet with
                    multiple copies arranged for standard paper sizes. The A4 sheet includes 8
                    copies in a 2×4 grid — take the file to any print shop and ask for an A4
                    colour print. The 4×6 sheet is sized for standard photo paper with 4 copies, ideal
                    for home printing or photo kiosks.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 font-display text-xl text-slate-900">
                    Supported countries
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {COUNTRIES.map((c) => (
                      <span
                        key={c.value}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
                      >
                        {c.flag} {c.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  )
}
