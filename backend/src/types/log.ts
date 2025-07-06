export interface LogEntry {
  level: "error" | "warn" | "info" | "debug"
  message: string
  resourceId: string
  timestamp: string
  traceId: string
  spanId: string
  commit: string
  metadata: Record<string, any>
}

export interface LogFilter {
  level?: string
  message?: string
  resourceId?: string
  timestamp_start?: string
  timestamp_end?: string
  traceId?: string
  spanId?: string
  commit?: string
}

export interface LogAnalytics {
  totalLogs: number
  logsByLevel: Record<string, number>
  logsByHour: Array<{ hour: string; count: number }>
  topResources: Array<{ resourceId: string; count: number }>
}
