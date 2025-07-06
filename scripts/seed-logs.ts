
const API_URL = "http://localhost:8000"

const sampleLogs = [
  {
    level: "error",
    message: "Database connection failed: Connection timeout after 30 seconds",
    resourceId: "server-prod-01",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    traceId: "trace-001-error",
    spanId: "span-db-connect",
    commit: "a1b2c3d4",
    metadata: {
      database: "postgresql",
      host: "db.example.com",
      port: 5432,
      retryAttempts: 3,
    },
  },
  {
    level: "warn",
    message: "High memory usage detected: 85% of available memory in use",
    resourceId: "server-prod-02",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    traceId: "trace-002-warn",
    spanId: "span-memory-check",
    commit: "e5f6g7h8",
    metadata: {
      memoryUsage: "85%",
      availableMemory: "16GB",
      usedMemory: "13.6GB",
      threshold: "80%",
    },
  },
  {
    level: "info",
    message: "User authentication successful",
    resourceId: "auth-service-01",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    traceId: "trace-003-info",
    spanId: "span-auth-login",
    commit: "i9j0k1l2",
    metadata: {
      userId: "user-12345",
      email: "john.doe@example.com",
      loginMethod: "oauth",
      provider: "google",
    },
  },
  {
    level: "debug",
    message: "Cache hit for user profile data",
    resourceId: "cache-service-01",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 minutes ago
    traceId: "trace-004-debug",
    spanId: "span-cache-get",
    commit: "m3n4o5p6",
    metadata: {
      cacheKey: "user:profile:12345",
      ttl: 3600,
      hitRate: "92%",
    },
  },
  {
    level: "error",
    message: "Payment processing failed: Invalid credit card number",
    resourceId: "payment-service-01",
    timestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString(), // 1 minute ago
    traceId: "trace-005-error",
    spanId: "span-payment-process",
    commit: "q7r8s9t0",
    metadata: {
      orderId: "order-67890",
      amount: 99.99,
      currency: "USD",
      errorCode: "INVALID_CARD",
    },
  },
]

async function seedLogs() {
  console.log("Seeding sample logs...")

  for (const log of sampleLogs) {
    try {
      const response = await fetch(`${API_URL}/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(log),
      })

      if (response.ok) {
        console.log(`✓ Added ${log.level} log: ${log.message.substring(0, 50)}...`)
      } else {
        console.error(`✗ Failed to add log: ${response.statusText}`)
      }
    } catch (error) {
      console.error(`✗ Error adding log: ${error.message}`)
    }

    // Small delay between requests
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  console.log("Seeding completed!")
}

if (require.main === module) {
  seedLogs()
}

module.exports = { seedLogs, sampleLogs }
