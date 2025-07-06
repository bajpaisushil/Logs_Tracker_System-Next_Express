import fs from "fs/promises"
import path from "path"
import type { LogEntry, LogFilter, LogAnalytics } from "../types/log"

export class LogService {
  private readonly dataPath: string

  constructor() {
    this.dataPath = path.join(__dirname, "../../data/logs.json")
    this.ensureDataDirectory()
  }

  private async ensureDataDirectory(): Promise<void> {
    const dataDir = path.dirname(this.dataPath)
    try {
      await fs.access(dataDir)
    } catch {
      await fs.mkdir(dataDir, { recursive: true })
    }

    try {
      await fs.access(this.dataPath)
    } catch {
      await fs.writeFile(this.dataPath, JSON.stringify([], null, 2))
    }
  }

  async getAllLogs(): Promise<LogEntry[]> {
    try {
      const data = await fs.readFile(this.dataPath, "utf-8")
      return JSON.parse(data) as LogEntry[]
    } catch (error) {
      console.error("Error reading logs:", error)
      return []
    }
  }

  async addLog(log: LogEntry): Promise<LogEntry> {
    try {
      const logs = await this.getAllLogs()
      logs.push(log)
      await fs.writeFile(this.dataPath, JSON.stringify(logs, null, 2))
      return log
    } catch (error) {
      console.error("Error adding log:", error)
      throw new Error("Failed to save log")
    }
  }

  async getFilteredLogs(filters: LogFilter): Promise<LogEntry[]> {
    const logs = await this.getAllLogs()

    return logs
      .filter((log) => this.matchesFilters(log, filters))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  private matchesFilters(log: LogEntry, filters: LogFilter): boolean {
    // Level filter
    if (filters.level && log.level !== filters.level) {
      return false
    }

    // Message search (case-insensitive)
    if (filters.message && !log.message.toLowerCase().includes(filters.message.toLowerCase())) {
      return false
    }

    // ResourceId filter
    if (filters.resourceId && !log.resourceId.includes(filters.resourceId)) {
      return false
    }

    // Timestamp range filter
    if (filters.timestamp_start || filters.timestamp_end) {
      const logTime = new Date(log.timestamp).getTime()

      if (filters.timestamp_start) {
        const startTime = new Date(filters.timestamp_start).getTime()
        if (logTime < startTime) return false
      }

      if (filters.timestamp_end) {
        const endTime = new Date(filters.timestamp_end).getTime()
        if (logTime > endTime) return false
      }
    }

    // TraceId filter
    if (filters.traceId && !log.traceId.includes(filters.traceId)) {
      return false
    }

    // SpanId filter
    if (filters.spanId && !log.spanId.includes(filters.spanId)) {
      return false
    }

    // Commit filter
    if (filters.commit && !log.commit.includes(filters.commit)) {
      return false
    }

    return true
  }

  async getAnalytics(filters: LogFilter = {}): Promise<LogAnalytics> {
    const logs = await this.getFilteredLogs(filters)

    // Count by level
    const logsByLevel = logs.reduce(
      (acc, log) => {
        acc[log.level] = (acc[log.level] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Count by hour (last 24 hours)
    const now = new Date()
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    const logsByHour = Array.from({ length: 24 }, (_, i) => {
      const hour = new Date(last24Hours.getTime() + i * 60 * 60 * 1000)
      const hourStr = hour.toISOString().slice(0, 13) + ":00:00.000Z"
      const count = logs.filter((log) => {
        const logHour = new Date(log.timestamp)
        return logHour >= hour && logHour < new Date(hour.getTime() + 60 * 60 * 1000)
      }).length

      return { hour: hourStr, count }
    })

    // Top resources
    const resourceCounts = logs.reduce(
      (acc, log) => {
        acc[log.resourceId] = (acc[log.resourceId] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const topResources = Object.entries(resourceCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([resourceId, count]) => ({ resourceId, count }))

    return {
      totalLogs: logs.length,
      logsByLevel,
      logsByHour,
      topResources,
    }
  }
}
