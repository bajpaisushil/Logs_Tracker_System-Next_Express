import type { LogEntry as LogEntryType } from "@/types/log"
import { LogEntry } from "./LogEntry"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, FileText, AlertCircle, TrendingUp } from 'lucide-react'

interface LogListProps {
  logs: LogEntryType[]
  loading: boolean
  error: string | null
}

export function LogList({ logs, loading, error }: LogListProps) {
  if (loading) {
    return (
      <Card className="glass-effect border-0 shadow-lg">
        <CardContent className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <div className="absolute inset-0 h-8 w-8 animate-ping rounded-full bg-primary/20" />
            </div>
            <div>
              <p className="font-medium text-foreground">Loading logs...</p>
              <p className="text-sm text-muted-foreground">Fetching the latest data</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="glass-effect border-0 shadow-lg border-destructive/20">
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center max-w-md">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load logs</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (logs.length === 0) {
    return (
      <Card className="glass-effect border-0 shadow-lg">
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center max-w-md">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No logs found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your filters or check back later for new logs
            </p>
            <Badge variant="secondary" className="text-xs">
              Real-time monitoring active
            </Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  const errorCount = logs.filter(log => log.level === 'error').length
  const warnCount = logs.filter(log => log.level === 'warn').length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              Showing {logs.length.toLocaleString()} log{logs.length !== 1 ? "s" : ""}
            </span>
          </div>
          
          {errorCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {errorCount} errors
            </Badge>
          )}
          
          {warnCount > 0 && (
            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 text-xs">
              {warnCount} warnings
            </Badge>
          )}
        </div>
        
        <Badge variant="outline" className="text-xs">
          Most recent first
        </Badge>
      </div>
      
      <div className="space-y-3">
        {logs.map((log, index) => (
          <LogEntry key={`${log.timestamp}-${index}`} log={log} />
        ))}
      </div>
    </div>
  )
}
