"use client"

import { useState, useEffect, useCallback } from "react"
import type { LogEntry, LogFilter } from "@/types/log"
import { api } from "@/lib/api"
import { useSocket } from "./useSocket"

export function useLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<LogFilter>({})

  const socket = useSocket()

  const fetchLogs = useCallback(
    async (currentFilters: LogFilter = filters) => {
      setLoading(true)
      setError(null)

      try {
        const filterParams = Object.entries(currentFilters).reduce(
          (acc, [key, value]) => {
            if (value) acc[key] = value
            return acc
          },
          {} as Record<string, string>,
        )

        const data = await api.logs.getAll(filterParams)
        setLogs(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch logs")
      } finally {
        setLoading(false)
      }
    },
    [filters],
  )

  const updateFilters = useCallback(
    (newFilters: Partial<LogFilter>) => {
      const updatedFilters = { ...filters, ...newFilters }
      setFilters(updatedFilters)
      fetchLogs(updatedFilters)
    },
    [filters, fetchLogs],
  )

  const clearFilters = useCallback(() => {
    const clearedFilters = {}
    setFilters(clearedFilters)
    fetchLogs(clearedFilters)
  }, [fetchLogs])

  // Real-time updates
  useEffect(() => {
    if (socket) {
      socket.on("newLog", (newLog: LogEntry) => {
        setLogs((prevLogs) => [newLog, ...prevLogs])
      })

      return () => {
        socket.off("newLog")
      }
    }
  }, [socket])

  // Initial fetch
  useEffect(() => {
    fetchLogs()
  }, [])

  return {
    logs,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    refetch: fetchLogs,
  }
}
