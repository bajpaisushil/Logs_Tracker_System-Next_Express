import Joi from "joi"
import type { LogEntry } from "../types/log"

export const logEntrySchema = Joi.object<LogEntry>({
  level: Joi.string().valid("error", "warn", "info", "debug").required(),
  message: Joi.string().min(1).required(),
  resourceId: Joi.string().min(1).required(),
  timestamp: Joi.string().isoDate().required(),
  traceId: Joi.string().min(1).required(),
  spanId: Joi.string().min(1).required(),
  commit: Joi.string().min(1).required(),
  metadata: Joi.object().required(),
})

export const validateLogEntry = (data: any): { error?: string; value?: LogEntry } => {
  const { error, value } = logEntrySchema.validate(data)
  if (error) {
    return { error: error.details[0].message }
  }
  return { value }
}
