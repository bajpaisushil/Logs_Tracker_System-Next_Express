"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, Filter, Calendar, Server, GitCommit, Layers, Hash } from 'lucide-react'
import type { LogFilter } from "@/types/log"

interface LogFiltersProps {
  filters: LogFilter
  onFiltersChange: (filters: Partial<LogFilter>) => void
  onClearFilters: () => void
}

export function LogFilters({ filters, onFiltersChange, onClearFilters }: LogFiltersProps) {
  const [localFilters, setLocalFilters] = useState<LogFilter>(filters)

  const handleInputChange = useCallback(
    (field: keyof LogFilter, value: string) => {
      const newFilters = { ...localFilters, [field]: value }
      setLocalFilters(newFilters)

      // Debounce the API call for text inputs
      if (
        field === "message" ||
        field === "resourceId" ||
        field === "traceId" ||
        field === "spanId" ||
        field === "commit"
      ) {
        const timeoutId = setTimeout(() => {
          onFiltersChange({ [field]: value })
        }, 300)

        return () => clearTimeout(timeoutId)
      } else {
        onFiltersChange({ [field]: value })
      }
    },
    [localFilters, onFiltersChange],
  )

  const handleClear = () => {
    setLocalFilters({})
    onClearFilters()
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length
  const hasActiveFilters = activeFilterCount > 0

  return (
    <Card className="glass-effect border-0 shadow-lg animate-slide-up">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Filter className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Filters</h3>
              <p className="text-sm text-muted-foreground">Refine your log search</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {activeFilterCount} active
              </Badge>
            )}
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={handleClear} className="h-8 px-3">
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Message Search */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
              <Search className="h-3 w-3" />
              Search Message
            </Label>
            <div className="relative">
              <Input
                id="message"
                placeholder="Search logs..."
                value={localFilters.message || ""}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="pl-4 h-10 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 transition-all"
              />
            </div>
          </div>

          {/* Level Filter */}
          <div className="space-y-2">
            <Label htmlFor="level" className="text-sm font-medium flex items-center gap-2">
              <Layers className="h-3 w-3" />
              Log Level
            </Label>
            <Select value={localFilters.level || ""} onValueChange={(value) => handleInputChange("level", value === "all" ? "" : value)}>
              <SelectTrigger className="h-10 w-full bg-background/50 border-border/50 focus:bg-background focus:border-primary/50">
                <SelectValue placeholder="All levels" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All levels</SelectItem>
                <SelectItem value="error">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    Error
                  </div>
                </SelectItem>
                <SelectItem value="warn">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    Warning
                  </div>
                </SelectItem>
                <SelectItem value="info">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    Info
                  </div>
                </SelectItem>
                <SelectItem value="debug">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-500" />
                    Debug
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Resource ID */}
          <div className="space-y-2">
            <Label htmlFor="resourceId" className="text-sm font-medium flex items-center gap-2">
              <Server className="h-3 w-3" />
              Resource ID
            </Label>
            <Input
              id="resourceId"
              placeholder="server-01, api-gateway..."
              value={localFilters.resourceId || ""}
              onChange={(e) => handleInputChange("resourceId", e.target.value)}
              className="h-10 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 transition-all"
            />
          </div>

          {/* Trace ID */}
          <div className="space-y-2">
            <Label htmlFor="traceId" className="text-sm font-medium flex items-center gap-2">
              <Hash className="h-3 w-3" />
              Trace ID
            </Label>
            <Input
              id="traceId"
              placeholder="trace-abc123..."
              value={localFilters.traceId || ""}
              onChange={(e) => handleInputChange("traceId", e.target.value)}
              className="h-10 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 transition-all"
            />
          </div>

          {/* Start Timestamp */}
          <div className="space-y-2">
            <Label htmlFor="timestamp_start" className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              Start Time
            </Label>
            <Input
              id="timestamp_start"
              type="datetime-local"
              value={localFilters.timestamp_start || ""}
              onChange={(e) => handleInputChange("timestamp_start", e.target.value)}
              className="h-10 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 transition-all"
            />
          </div>

          {/* End Timestamp */}
          <div className="space-y-2">
            <Label htmlFor="timestamp_end" className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              End Time
            </Label>
            <Input
              id="timestamp_end"
              type="datetime-local"
              value={localFilters.timestamp_end || ""}
              onChange={(e) => handleInputChange("timestamp_end", e.target.value)}
              className="h-10 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 transition-all"
            />
          </div>

          {/* Span ID */}
          <div className="space-y-2">
            <Label htmlFor="spanId" className="text-sm font-medium flex items-center gap-2">
              <Hash className="h-3 w-3" />
              Span ID
            </Label>
            <Input
              id="spanId"
              placeholder="span-456..."
              value={localFilters.spanId || ""}
              onChange={(e) => handleInputChange("spanId", e.target.value)}
              className="h-10 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 transition-all"
            />
          </div>

          {/* Commit */}
          <div className="space-y-2">
            <Label htmlFor="commit" className="text-sm font-medium flex items-center gap-2">
              <GitCommit className="h-3 w-3" />
              Commit
            </Label>
            <Input
              id="commit"
              placeholder="a1b2c3d..."
              value={localFilters.commit || ""}
              onChange={(e) => handleInputChange("commit", e.target.value)}
              className="h-10 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 transition-all"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
