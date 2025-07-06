import { Router, type Request, type Response } from "express"
import type { LogService } from "../services/logService"
import { validateLogEntry } from "../validation/logValidation"
import type { LogFilter } from "../types/log"

export const createLogRoutes = (logService: LogService, io: any) => {
  const router = Router()

  // POST /logs - Ingest a single log entry
  router.post("/", async (req: Request, res: Response) => {
    try {
      const { error, value } = validateLogEntry(req.body)

      if (error) {
        return res.status(400).json({ error })
      }

      const savedLog = await logService.addLog(value!)

      // Emit real-time update to all connected clients
      io.emit("newLog", savedLog)

      res.status(201).json(savedLog)
    } catch (error) {
      console.error("Error ingesting log:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  })

  // GET /logs - Retrieve filtered logs
  router.get("/", async (req: Request, res: Response) => {
    try {
      const filters: LogFilter = {
        level: req.query.level as string,
        message: req.query.message as string,
        resourceId: req.query.resourceId as string,
        timestamp_start: req.query.timestamp_start as string,
        timestamp_end: req.query.timestamp_end as string,
        traceId: req.query.traceId as string,
        spanId: req.query.spanId as string,
        commit: req.query.commit as string,
      }

      // Remove undefined values
      Object.keys(filters).forEach((key) => {
        if (filters[key as keyof LogFilter] === undefined) {
          delete filters[key as keyof LogFilter]
        }
      })

      const logs = await logService.getFilteredLogs(filters)
      res.json(logs)
    } catch (error) {
      console.error("Error retrieving logs:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  })

  // GET /logs/analytics - Get analytics data
  router.get("/analytics", async (req: Request, res: Response) => {
    try {
      const filters: LogFilter = {
        level: req.query.level as string,
        message: req.query.message as string,
        resourceId: req.query.resourceId as string,
        timestamp_start: req.query.timestamp_start as string,
        timestamp_end: req.query.timestamp_end as string,
        traceId: req.query.traceId as string,
        spanId: req.query.spanId as string,
        commit: req.query.commit as string,
      }

      // Remove undefined values
      Object.keys(filters).forEach((key) => {
        if (filters[key as keyof LogFilter] === undefined) {
          delete filters[key as keyof LogFilter]
        }
      })

      const analytics = await logService.getAnalytics(filters)
      res.json(analytics)
    } catch (error) {
      console.error("Error retrieving analytics:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  })

  return router
}
