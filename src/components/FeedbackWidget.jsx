'use client'

import { useState } from 'react'

const API_BASE = 'https://satisfied-growth-production-5050.up.railway.app'

export async function sendFeedback(payload) {
  try {
    await fetch(`${API_BASE}/v1/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {}
}

export function FeedbackWidget({ feature, taskId }) {
  const [satisfied, setSatisfied] = useState(null)
  const [comment, setComment] = useState('')
  const [done, setDone] = useState(false)

  if (!taskId) return null

  const handleVote = (value) => {
    setSatisfied(value)
    sendFeedback({ feature, task_id: taskId, satisfied: value })
  }

  const handleSubmit = () => {
    if (comment.trim()) {
      sendFeedback({ feature, task_id: taskId, comment: comment.trim() })
    }
    setDone(true)
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-center">
        <p className="text-sm text-slate-500">Thanks for the feedback 🙏</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-6 py-5">
      {satisfied === null ? (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-medium text-slate-700">
            Did this turn out how you expected?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleVote(true)}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700"
            >
              👍 Yes
            </button>
            <button
              onClick={() => handleVote(false)}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              👎 Not quite
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">
            {satisfied ? '👍 Glad it worked out.' : '👎 Sorry to hear that.'}{' '}
            Got a second? Tell us more:
          </p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What could be better? (optional)"
            rows={2}
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setDone(true)}
              className="rounded-full px-4 py-1.5 text-xs text-slate-400 hover:text-slate-600"
            >
              Skip
            </button>
            <button
              onClick={handleSubmit}
              className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-slate-700"
            >
              Send feedback
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
