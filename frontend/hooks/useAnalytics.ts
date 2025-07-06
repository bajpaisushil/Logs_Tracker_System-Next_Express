"use client"

import { useState, useEffect } from "react"
import type { LogAnalytics, LogFilter } from "@/types/log"
import { api } from "@/lib/api"

export function useAnalytics(filters: LogFilter) {
  const [analytics, setAnalytics] = useState<LogAnalytics | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      setError(null)

      try {
        const filterParams = Object.entries(filters).reduce(
          (acc, [key, value]) => {
            if (value) acc[key] = value
            return acc
          },
          {} as Record<string, string>,
        )

        const data = await api.logs.getAnalytics(filterParams)
        setAnalytics(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch analytics")
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [filters])

  return { analytics, loading, error }
}
