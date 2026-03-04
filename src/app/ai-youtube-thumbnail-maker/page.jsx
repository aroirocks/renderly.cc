'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const API_BASE = 'https://satisfied-growth-production-5050.up.railway.app'
const POLL_MS = 2500
const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

// ── Icons ─────────────────────────────────────────────────────────────────────

function UploadCloudIcon() {
  return (
    <svg
      width="28"
      height="28"
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
  )
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
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
  )
}

// ── File slot preview ─────────────────────────────────────────────────────────

function FileSlot({ file, index, onRemove }) {
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (!file) { setPreview(null); return }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  return (
    <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
      {preview ? (
        <>
          <img src={preview} alt="" className="h-full w-full object-cover" />
          <button
            onClick={() => onRemove(index)}
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/70 text-xs text-white hover:bg-slate-900"
          >
            ✕
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-slate-900/60 px-2 py-1">
            <p className="truncate text-xs text-white">{file.name}</p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span className="text-xs">
            Image {index + 1}
            {index === 1 && (
              <span className="ml-1 text-slate-300">(optional)</span>
            )}
          </span>
        </div>
      )}
    </div>
  )
}

// ── Processing image overlay ──────────────────────────────────────────────────

function ShimmerOverlay({ delay = 0 }) {
  return (
    <div
      className="absolute inset-0 rounded-xl"
      style={{
        background:
          'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.32) 50%, transparent 65%)',
        backgroundSize: '200% 100%',
        animation: `shimmer 1.8s ${delay}s infinite linear`,
      }}
    />
  )
}

function ImageOverlay({ previews }) {
  if (!previews || previews.length === 0) return null

  const isSingle = previews.length === 1
  const badgeText = isSingle ? 'AI is working on your image…' : 'AI is combining your images…'

  return (
    <div className="mb-6">
      {isSingle ? (
        /* Single image — contain full image, no cropping */
        <div className="relative inline-flex w-full justify-center">
          <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm" style={{ maxWidth: '320px' }}>
            <img
              src={previews[0]}
              alt=""
              className="block w-full h-auto rounded-xl"
            />
            <ShimmerOverlay />
            <div
              className="absolute inset-0 rounded-xl"
              style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.04) 60%, rgba(0,0,0,0.36) 100%)' }}
            />
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm whitespace-nowrap">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" style={{ animation: 'pulse 1s infinite' }} />
                {badgeText}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Two images side by side — each fully visible, no cropping */
        <div className="flex flex-col items-center gap-3">
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
            {previews.map((src, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <img
                  src={src}
                  alt=""
                  className="block w-full h-auto rounded-xl"
                />
                <ShimmerOverlay delay={i * 0.4} />
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.04) 60%, rgba(0,0,0,0.32) 100%)' }}
                />
              </div>
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm whitespace-nowrap">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" style={{ animation: 'pulse 1s infinite' }} />
            {badgeText}
          </span>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </div>
  )
}

// ── Processing steps ──────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  { label: 'Uploading images', icon: '📤' },
  { label: 'In queue — starting shortly', icon: '⏳' },
  { label: 'AI analysing composition', icon: '🔍' },
  { label: 'Generating your thumbnail', icon: '✨' },
  { label: 'Finalising output', icon: '🎨' },
]

const PHASE_DONE_COUNT = { uploading: 1, queued: 1, processing: 2 }
const PHASE_HEADLINE = {
  uploading: 'Uploading your images…',
  queued: 'In queue — AI will start shortly…',
  processing: 'AI is crafting your thumbnail…',
}

const THUMBNAIL_TIPS = [
  { emoji: '👀', tip: 'Thumbnails with a human face get up to 38% more clicks on average.' },
  { emoji: '⚡', tip: 'High contrast between subject and background is the #1 factor at small display sizes.' },
  { emoji: '🎯', tip: 'One clear focal point beats a busy layout — viewers decide in under a second.' },
  { emoji: '📱', tip: 'YouTube thumbnails display at ~120×68px on mobile. Contrast matters more than color.' },
  { emoji: '🔬', tip: 'Channels that A/B test thumbnails see 2–4× CTR improvement within a week.' },
  { emoji: '😮', tip: 'Surprised or intense expressions outperform neutral smiles in click-through rate.' },
  { emoji: '🖼️', tip: 'Two images almost always outperform one — face + context gives viewers more to respond to.' },
  { emoji: '📊', tip: 'CTR (click-through rate) is the single most important signal YouTube uses for distribution.' },
  { emoji: '🎮', tip: 'Gaming thumbnails: face reactions + game screenshot consistently outperform text-only designs.' },
  { emoji: '🚀', tip: 'The first 48 hours of a video are critical — a strong thumbnail maximises early momentum.' },
]

function ProcessingView({ phase, previews }) {
  const doneCount = PHASE_DONE_COUNT[phase] ?? 1
  const activeIndex = doneCount

  // Smooth progress bar over 60s
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

  // Rotating tips
  const [tipIndex, setTipIndex] = useState(0)
  const [tipVisible, setTipVisible] = useState(true)
  useEffect(() => {
    const interval = setInterval(() => {
      setTipVisible(false)
      setTimeout(() => {
        setTipIndex((i) => (i + 1) % THUMBNAIL_TIPS.length)
        setTipVisible(true)
      }, 400)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const tip = THUMBNAIL_TIPS[tipIndex]

  return (
    <div className="flex flex-col items-center gap-8 py-12">

      {/* ── Uploaded image overlay ── */}
      <div className="w-full">
        <ImageOverlay previews={previews} />
      </div>

      {/* Animated icon */}
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-red-100 opacity-60" />
        <div className="absolute inset-2 animate-spin rounded-full border-4 border-red-200 border-t-red-500" />
        <span className="relative text-3xl">🎨</span>
      </div>

      {/* Headline */}
      <div className="text-center">
        <p className="font-display text-xl text-slate-900">
          {PHASE_HEADLINE[phase] ?? 'Processing…'}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Usually takes 30–60 seconds — AI is working hard on your thumbnail
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
              className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-colors ${
                active ? 'bg-red-50' : ''
              }`}
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

      {/* Rotating tips */}
      <div
        className="w-full max-w-sm rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-opacity duration-300"
        style={{ opacity: tipVisible ? 1 : 0 }}
      >
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Did you know?
        </p>
        <p className="text-sm leading-relaxed text-slate-700">
          <span className="mr-1.5 text-base">{tip.emoji}</span>
          {tip.tip}
        </p>
      </div>

    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function UploadPage() {
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([]) // object URLs for processing overlay
  const [text, setText] = useState('')
  // 'idle' | 'uploading' | 'queued' | 'processing' | 'done' | 'error'
  const [status, setStatus] = useState('idle')
  const [resultUrl, setResultUrl] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)

  const pollRef = useRef(null)
  const fileInputRef = useRef(null)
  // Track whether processing is finished so the beforeunload handler knows
  const processingDoneRef = useRef(false)

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [])

  useEffect(() => () => stopPolling(), [stopPolling])

  // ── Tab-close / navigation alert ─────────────────────────────────────────
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (status === 'uploading' || status === 'queued' || status === 'processing') {
        // Standard browser "are you sure?" prompt while processing
        e.preventDefault()
        e.returnValue = 'Your thumbnail is still being generated. Are you sure you want to leave?'
        return e.returnValue
      }
      if (status === 'done') {
        // Custom alert after processing is complete
        // Note: browsers don't allow custom messages in beforeunload anymore,
        // so we use a visually distinct message via returnValue where supported.
        e.preventDefault()
        e.returnValue = '✅ Your thumbnail is ready! Make sure to download it before leaving.'
        return e.returnValue
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [status])

  const pollTask = useCallback(
    async (id) => {
      try {
        const res = await fetch(`${API_BASE}/v1/thumbnail-tasks/${id}`)
        if (!res.ok) return
        const data = await res.json()
        if (data.status === 'done') {
          stopPolling()
          processingDoneRef.current = true
          setResultUrl(data.preview_url)
          setStatus('done')
        } else if (data.status === 'failed') {
          stopPolling()
          setErrorMsg(data.error || 'Generation failed. Please try again.')
          setStatus('error')
        } else if (data.status === 'waiting_ai') {
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

  const addFiles = useCallback((incoming) => {
    const valid = Array.from(incoming).filter(
      (f) => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE,
    )
    setFiles((prev) => [...prev, ...valid].slice(0, 2))
  }, [])

  const removeFile = useCallback((index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragOver(false)
      addFiles(e.dataTransfer.files)
    },
    [addFiles],
  )

  const handleGenerate = async () => {
    if (files.length === 0) return

    // Snapshot object URLs for the processing overlay before upload starts
    const snapshotUrls = files.map((f) => URL.createObjectURL(f))
    setPreviews(snapshotUrls)

    processingDoneRef.current = false
    setStatus('uploading')
    setErrorMsg('')

    const fd = new FormData()
    files.forEach((f) => fd.append('images', f))
    if (text.trim()) fd.append('text', text.trim())

    try {
      const res = await fetch(`${API_BASE}/v1/thumbnail`, {
        method: 'POST',
        body: fd,
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(
          err.message || err.error || `Server error ${res.status}`,
        )
      }

      const data = await res.json()
      const id = data.task_id
      if (!id) throw new Error('No task ID returned from server.')

      setStatus('processing')
      pollRef.current = setInterval(() => pollTask(id), POLL_MS)
    } catch (err) {
      setErrorMsg(err.message || 'Upload failed. Please try again.')
      setStatus('error')
      // Revoke preview URLs on error
      snapshotUrls.forEach((u) => URL.revokeObjectURL(u))
      setPreviews([])
    }
  }

  const handleReset = () => {
    stopPolling()
    // Revoke preview object URLs
    previews.forEach((u) => URL.revokeObjectURL(u))
    setPreviews([])
    setFiles([])
    setText('')
    setStatus('idle')
    setResultUrl(null)
    setErrorMsg('')
    processingDoneRef.current = false
  }

  const handleDownload = async () => {
    try {
      const res = await fetch(resultUrl)
      const blob = await res.blob()

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'youtube-thumbnail.png'
      document.body.appendChild(a)
      a.click()

      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error('Download failed', e)
    }
  }

  const isProcessing = status === 'uploading' || status === 'queued' || status === 'processing'
  const hasFiles = files.length > 0

  return (
    <>
      <Header />
      <main className="flex-1 bg-white py-12 sm:py-20">
        <Container>
          {/* Page heading */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
              ✨ Free · No sign-up needed
            </span>
            <h1 className="mt-4 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
              AI YouTube Thumbnail Maker
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              Upload 1–2 images and let AI generate a{' '}
              <span className="font-semibold text-slate-900">
                1280×720 click-optimised thumbnail
              </span>{' '}
              in about a minute.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            {/* ── IDLE: upload form ───────────────────────────────────────── */}
            {status === 'idle' && (
              <div className="space-y-5">
                {/* Drop zone */}
                <div
                  className={`cursor-pointer rounded-3xl border-2 border-dashed p-4 sm:p-8 transition-colors ${
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
                  onClick={() =>
                    files.length < 2 && fileInputRef.current?.click()
                  }
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className="hidden"
                    onChange={(e) => addFiles(e.target.files)}
                  />

                  {!hasFiles ? (
                    /* Empty state */
                    <div className="flex flex-col items-center gap-3 py-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-500">
                        <UploadCloudIcon />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-slate-900">
                          Drag & drop your images here
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          or click to browse · PNG, JPG, WEBP · max 5MB each ·
                          up to 2 images
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* File previews */
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        {[0, 1].map((i) => (
                          <FileSlot
                            key={i}
                            file={files[i] ?? null}
                            index={i}
                            onRemove={removeFile}
                          />
                        ))}
                      </div>
                      {files.length < 2 && (
                        <button
                          className="w-full rounded-xl border border-dashed border-slate-300 py-2 text-sm text-slate-500 hover:border-slate-400 hover:text-slate-700"
                          onClick={(e) => {
                            e.stopPropagation()
                            fileInputRef.current?.click()
                          }}
                        >
                          + Add a second image (optional — improves results)
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Text prompt */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Video title or topic{' '}
                    <span className="font-normal text-slate-400">
                      (optional — helps AI nail the composition)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={500}
                    placeholder="e.g. I went from 0 to 100k subscribers in 6 months"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/20"
                  />
                </div>

                {/* Generate CTA */}
                <div className="flex flex-col items-center gap-3 pt-1">
                  <button
                    onClick={handleGenerate}
                    disabled={!hasFiles}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600 active:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:px-10"
                  >
                    <UploadCloudIcon />
                    Generate My Thumbnail
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    Thumbnails with AI-optimised layouts get{' '}
                    <span className="font-semibold text-slate-600">
                      3× more clicks
                    </span>{' '}
                    on average · Free · No account needed
                  </p>
                </div>
              </div>
            )}

            {/* ── PROCESSING ─────────────────────────────────────────────── */}
            {isProcessing && <ProcessingView phase={status} previews={previews} />}

            {/* ── ERROR ──────────────────────────────────────────────────── */}
            {status === 'error' && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
                <p className="font-semibold text-red-700">
                  Something went wrong
                </p>
                <p className="mt-1 text-sm text-red-600">{errorMsg}</p>
                <button
                  onClick={handleReset}
                  className="mt-5 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* ── DONE ───────────────────────────────────────────────────── */}
            {status === 'done' && resultUrl && (
              <div className="space-y-6">
                {/* Result image */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl">
                  <img
                    src={resultUrl}
                    alt="AI-generated YouTube thumbnail"
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col items-center gap-4 text-center">
                  <p className="text-sm text-slate-500">
                    1280×720 · 16:9 · YouTube-ready · AI-optimised for CTR
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                   <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 rounded-full bg-red-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 hover:bg-red-600"
                  >
                      <DownloadIcon />
                      Download Thumbnail
                    </button>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Generate Another
                    </button>
                  </div>
                </div>

                {/* CTR tip */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                  <p className="text-sm font-semibold text-slate-900">
                    💡 Pro tip — A/B test your thumbnail
                  </p>
                  <p className="mt-1.5 text-sm text-slate-500">
                    Upload a different image combination and compare both
                    versions in YouTube Studio. Creators who test thumbnails see
                    a 2–4× improvement in click-through rate within 48 hours.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}