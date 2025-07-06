import type { LogEntry as LogEntryType } from "@/types/log"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { AlertCircle, AlertTriangle, Info, Bug, Copy, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from "react"

interface LogEntryProps {
  log: LogEntryType
}

const levelConfig = {
  error: {
    icon: AlertCircle,
    className: "log-entry-error",
    badgeClassName: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    iconColor: "text-red-600 dark:text-red-400",
  },
  warn: {
    icon: AlertTriangle,
    className: "log-entry-warn",
    badgeClassName: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  info: {
    icon: Info,
    className: "log-entry-info",
    badgeClassName: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  debug: {
    icon: Bug,
    className: "log-entry-debug",
    badgeClassName: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    iconColor: "text-gray-600 dark:text-gray-400",
  },
}

export function LogEntry({ log }: LogEntryProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const config = levelConfig[log.level]
  const Icon = config.icon

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const hasMetadata = Object.keys(log.metadata).length > 0

  return (
    <Card className={`${config.className} transition-all duration-200 hover:shadow-md animate-fade-in group`}>
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 mt-1 ${config.iconColor}`}>
              <Icon className="h-5 w-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <Badge className={`${config.badgeClassName} font-medium px-2 py-1`}>
                  {log.level.toUpperCase()}
                </Badge>
                <span className="text-sm text-muted-foreground font-mono">
                  {format(new Date(log.timestamp), "MMM dd, HH:mm:ss.SSS")}
                </span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(JSON.stringify(log, null, 2))}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium leading-relaxed break-words text-foreground">
                  {log.message}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="flex flex-col">
                  <span className="text-muted-foreground font-medium mb-1">Resource</span>
                  <code className="bg-muted/50 px-2 py-1 rounded text-foreground font-mono">
                    {log.resourceId}
                  </code>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground font-medium mb-1">Trace ID</span>
                  <code className="bg-muted/50 px-2 py-1 rounded text-foreground font-mono truncate">
                    {log.traceId}
                  </code>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground font-medium mb-1">Span ID</span>
                  <code className="bg-muted/50 px-2 py-1 rounded text-foreground font-mono truncate">
                    {log.spanId}
                  </code>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground font-medium mb-1">Commit</span>
                  <code className="bg-muted/50 px-2 py-1 rounded text-foreground font-mono">
                    {log.commit}
                  </code>
                </div>
              </div>
            </div>
          </div>

          {hasMetadata && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground p-0 h-auto"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">Metadata</span>
                <Badge variant="secondary" className="ml-2 text-xs">
                  {Object.keys(log.metadata).length} fields
                </Badge>
              </Button>
              
              {isExpanded && (
                <div className="mt-3 p-3 bg-muted/30 rounded-lg border">
                  <pre className="text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(log.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
