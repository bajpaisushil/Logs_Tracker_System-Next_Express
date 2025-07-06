import type { LogAnalytics } from "@/types/log"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, Activity, Server, AlertCircle, Clock, Zap } from "lucide-react"

interface AnalyticsProps {
  analytics: LogAnalytics | null
  loading: boolean
  error: string | null
}

const LEVEL_COLORS = {
  error: "#ef4444",
  warn: "#f59e0b",
  info: "#3b82f6",
  debug: "#6b7280",
}

export function Analytics({ analytics, loading, error }: AnalyticsProps) {
  if (loading || !analytics) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="glass-effect border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-4 bg-muted rounded w-20"></div>
                    <div className="h-8 w-8 bg-muted rounded-lg"></div>
                  </div>
                  <div className="h-8 bg-muted rounded w-16 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-24"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="glass-effect border-0 shadow-lg border-destructive/20">
        <CardContent className="p-8">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Analytics Unavailable</h3>
            <p className="text-sm text-muted-foreground">Failed to load analytics: {error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const levelData = Object.entries(analytics.logsByLevel).map(([level, count]) => ({
    level: level.charAt(0).toUpperCase() + level.slice(1),
    count,
    color: LEVEL_COLORS[level as keyof typeof LEVEL_COLORS] || "#6b7280",
  }))

  const hourlyData = analytics.logsByHour.map((item) => ({
    ...item,
    hour: new Date(item.hour).getHours(),
    time: new Date(item.hour).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
  }))

  const totalErrors = analytics.logsByLevel.error || 0
  const totalWarnings = analytics.logsByLevel.warn || 0
  const errorRate = analytics.totalLogs > 0 ? ((totalErrors / analytics.totalLogs) * 100).toFixed(1) : "0"
  const peakHour = hourlyData.reduce((max, item) => (item.count > max.count ? item : max), hourlyData[0])

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-effect border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Logs</p>
                <p className="text-3xl font-bold text-foreground">{analytics.totalLogs.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">All time</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Error Rate</p>
                <p className="text-3xl font-bold text-red-600">{errorRate}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant="destructive" className="text-xs px-2 py-0">
                    {totalErrors} errors
                  </Badge>
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Active Resources</p>
                <p className="text-3xl font-bold text-foreground">{analytics.topResources.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Unique sources</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                <Server className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Peak Hour</p>
                <p className="text-3xl font-bold text-foreground">{peakHour?.time || "N/A"}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant="secondary" className="text-xs px-2 py-0">
                    {peakHour?.count || 0} logs
                  </Badge>
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logs by Level */}
        <Card className="glass-effect border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-primary" />
              Log Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={levelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ level, count, percent }) => `${level}: ${(percent! * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {levelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [value, name]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Logs by Hour */}
        <Card className="glass-effect border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              Activity Timeline (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  formatter={(value) => [value, "Logs"]}
                  labelFormatter={(hour) => `${hour}:00`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Resources */}
      {analytics.topResources.length > 0 && (
        <Card className="glass-effect border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Server className="h-5 w-5 text-primary" />
              Top Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topResources.slice(0, 8).map((resource, index) => {
                const percentage = ((resource.count / analytics.totalLogs) * 100).toFixed(1)
                return (
                  <div
                    key={resource.resourceId}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{resource.resourceId}</p>
                        <p className="text-sm text-muted-foreground">{percentage}% of total logs</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="font-mono">
                      {resource.count.toLocaleString()}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
