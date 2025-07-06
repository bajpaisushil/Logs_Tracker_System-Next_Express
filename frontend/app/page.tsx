"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { LogFilters } from "@/components/LogFilters"
import { LogList } from "@/components/LogList"
import { Analytics } from "@/components/Analytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLogs } from "@/hooks/useLogs"
import { useAnalytics } from "@/hooks/useAnalytics"
import { useSocket } from "@/hooks/useSocket"
import { BarChart3, FileText } from "lucide-react"

export default function Home() {
  const { logs, loading, error, filters, updateFilters, clearFilters, refetch } = useLogs()
  const { analytics, loading: analyticsLoading, error: analyticsError } = useAnalytics(filters)
  const [activeTab, setActiveTab] = useState("logs")
  const socket = useSocket()

  const isConnected = socket?.connected || false

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header onRefresh={refetch} isLoading={loading} totalLogs={logs.length} isConnected={isConnected} />

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Filters */}
        <LogFilters filters={filters} onFiltersChange={updateFilters} onClearFilters={clearFilters} />

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/50 p-1">
              <TabsTrigger
                value="logs"
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <FileText className="h-4 w-4" />
                Logs
                {logs.length > 0 && (
                  <span className="ml-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                    {logs.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="logs" className="space-y-6 animate-fade-in">
            <LogList logs={logs} loading={loading} error={error} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 animate-fade-in">
            <Analytics analytics={analytics} loading={analyticsLoading} error={analyticsError} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
